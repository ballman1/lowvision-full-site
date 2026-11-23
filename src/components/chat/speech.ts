/**
 * Voice input (Web Speech API speech recognition) and voice output
 * (speechSynthesis) for the assistant.
 *
 * Both are progressive enhancements: when a browser lacks support, the
 * controls explain that instead of disappearing silently.
 */

import { useCallback, useEffect, useRef, useState } from 'react';

// ── Speech recognition (voice input) ──────────────────────────────────────

interface SpeechRecognitionAlternativeLike {
  transcript: string;
}
interface SpeechRecognitionResultLike {
  isFinal: boolean;
  0: SpeechRecognitionAlternativeLike;
}
interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: ArrayLike<SpeechRecognitionResultLike>;
}
interface SpeechRecognitionErrorEventLike {
  error: string;
}
interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((e: SpeechRecognitionEventLike) => void) | null;
  onerror: ((e: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}
type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

function getRecognitionCtor(): SpeechRecognitionCtor | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as { SpeechRecognition?: SpeechRecognitionCtor; webkitSpeechRecognition?: SpeechRecognitionCtor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

const RECOGNITION_ERRORS: Record<string, string> = {
  'not-allowed': 'Microphone access was blocked. Allow microphone access for this site in your browser settings, then try again.',
  'service-not-allowed': 'Voice input is not allowed in this browser. You can type your question instead.',
  'no-speech': "I didn't hear anything. Select Speak and try again.",
  'audio-capture': 'No microphone was found. Check that a microphone is connected.',
  network: 'Voice input needs an internet connection. Please check your connection.',
};

export function useVoiceInput(onFinal: (text: string) => void) {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState('');
  const [error, setError] = useState('');
  const recRef = useRef<SpeechRecognitionLike | null>(null);
  const finalRef = useRef('');
  const onFinalRef = useRef(onFinal);
  onFinalRef.current = onFinal;

  useEffect(() => {
    setSupported(!!getRecognitionCtor());
    return () => recRef.current?.abort();
  }, []);

  const start = useCallback(() => {
    const Ctor = getRecognitionCtor();
    if (!Ctor) return;
    recRef.current?.abort();
    const rec = new Ctor();
    rec.lang = document.documentElement.lang || navigator.language || 'en-US';
    rec.continuous = false;
    rec.interimResults = true;
    finalRef.current = '';
    setInterim('');
    setError('');

    rec.onresult = (e) => {
      let interimText = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) finalRef.current += r[0].transcript;
        else interimText += r[0].transcript;
      }
      setInterim((finalRef.current + interimText).trim());
    };
    rec.onerror = (e) => {
      if (e.error !== 'aborted') setError(RECOGNITION_ERRORS[e.error] ?? 'Voice input stopped unexpectedly. Please try again.');
    };
    rec.onend = () => {
      setListening(false);
      const text = finalRef.current.trim();
      setInterim('');
      if (text) onFinalRef.current(text);
    };

    try {
      rec.start();
      recRef.current = rec;
      setListening(true);
    } catch {
      setError('Voice input could not start. Please try again.');
    }
  }, []);

  const stop = useCallback(() => recRef.current?.stop(), []);

  return { supported, listening, interim, error, start, stop };
}

// ── Speech synthesis (voice output) ───────────────────────────────────────

/** Turn the assistant's Markdown into text that sounds natural when spoken. */
export function markdownToSpeech(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/https?:\/\/\S+/g, 'a link')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*(\d+)[.)]\s+/gm, '$1. ')
    .replace(/(\*\*|__|\*|_|`)/g, '')
    .replace(/\s*\n+\s*/g, (m) => (m.includes('\n\n') ? '. ' : ', '))
    .replace(/([.!?:;,])\s*[.,]\s/g, '$1 ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/** Split text into utterances short enough that browsers don't cut them off. */
function chunk(text: string, max = 220): string[] {
  const sentences = text.match(/[^.!?]+[.!?]+["')\]]*\s*|[^.!?]+$/g) ?? [text];
  const out: string[] = [];
  let cur = '';
  for (const s of sentences) {
    if ((cur + s).length > max && cur) {
      out.push(cur.trim());
      cur = '';
    }
    if (s.length > max) {
      for (const part of s.split(/(?<=[,;:])\s+/)) {
        if ((cur + part).length > max && cur) {
          out.push(cur.trim());
          cur = '';
        }
        cur += part + ' ';
      }
    } else {
      cur += s;
    }
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

export function useSpeechOutput(rate: number, voiceName: string) {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const pendingRef = useRef(0);
  const settingsRef = useRef({ rate, voiceName });
  settingsRef.current = { rate, voiceName };
  /** Raw Markdown characters already queued for the streaming answer. */
  const streamPosRef = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    setSupported(true);
    const update = () => {
      const lang = (document.documentElement.lang || 'en').slice(0, 2);
      const all = window.speechSynthesis.getVoices();
      const matching = all.filter((v) => v.lang.toLowerCase().startsWith(lang));
      setVoices(matching.length ? matching : all);
    };
    update();
    window.speechSynthesis.addEventListener('voiceschanged', update);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', update);
      window.speechSynthesis.cancel();
    };
  }, []);

  const enqueue = useCallback((plain: string) => {
    if (!plain.trim() || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const { rate: r, voiceName: vn } = settingsRef.current;
    const voice = vn ? window.speechSynthesis.getVoices().find((v) => v.name === vn) : undefined;
    for (const part of chunk(plain)) {
      const u = new SpeechSynthesisUtterance(part);
      u.rate = r;
      if (voice) {
        u.voice = voice;
        u.lang = voice.lang;
      } else {
        u.lang = document.documentElement.lang || 'en-US';
      }
      pendingRef.current++;
      setSpeaking(true);
      const finish = () => {
        pendingRef.current = Math.max(0, pendingRef.current - 1);
        if (pendingRef.current === 0) setSpeaking(false);
      };
      u.onend = finish;
      u.onerror = finish;
      window.speechSynthesis.speak(u);
    }
  }, []);

  const cancel = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    pendingRef.current = 0;
    streamPosRef.current = Number.MAX_SAFE_INTEGER; // stop speaking the rest of a streaming answer
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  /** Speak a complete Markdown answer from the start. */
  const speak = useCallback(
    (markdown: string) => {
      cancel();
      streamPosRef.current = 0;
      enqueue(markdownToSpeech(markdown));
    },
    [cancel, enqueue],
  );

  /** Begin speaking a new streaming answer (call before the first text arrives). */
  const beginStream = useCallback(() => {
    cancel();
    streamPosRef.current = 0;
  }, [cancel]);

  /**
   * Speak finished sentences of a streaming answer as they arrive, so
   * listeners don't wait for the whole answer. Only text up to the last
   * paragraph or sentence break is spoken; pass done=true for the rest.
   */
  const speakStream = useCallback(
    (fullMarkdown: string, done: boolean) => {
      const pos = streamPosRef.current;
      if (pos >= fullMarkdown.length) return;
      const rest = fullMarkdown.slice(pos);
      let cut = rest.length;
      if (!done) {
        const para = rest.lastIndexOf('\n');
        const sentence = Math.max(rest.lastIndexOf('. '), rest.lastIndexOf('? '), rest.lastIndexOf('! '));
        cut = Math.max(para, sentence >= 0 ? sentence + 1 : -1);
        // Don't break in the middle of a Markdown link.
        const openLink = rest.lastIndexOf('[', cut);
        if (openLink > rest.lastIndexOf(')', cut)) cut = openLink;
        if (cut <= 0) return;
      }
      streamPosRef.current = pos + cut;
      enqueue(markdownToSpeech(rest.slice(0, cut)));
    },
    [enqueue],
  );

  return { supported, speaking, voices, speak, cancel, beginStream, speakStream };
}
