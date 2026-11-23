/**
 * The assistant's conversation UI, shared by the chat dialog and the
 * /assistant page.
 *
 * Accessibility notes:
 *  - Every message has a heading ("You said" / "Assistant said") so screen
 *    reader users can jump between messages with heading navigation.
 *  - Streaming text is NOT placed in a live region (that would read every
 *    fragment). Instead, progress ("Searching this site…") goes to a polite
 *    status region and each complete answer is announced once.
 *  - Voice input and read-aloud are optional and remembered per browser.
 *  - All colors meet WCAG AAA (7:1) contrast for text; see .chat-* in index.css.
 */

import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent, type MutableRefObject } from 'react';
import { Mic, MicOff, Send, Square, Volume2, VolumeX, Copy, Trash2, Settings } from 'lucide-react';
import { ChatMarkdown } from './ChatMarkdown';
import { useChatState, sendMessage, stopAnswer, clearConversation, setPrefs, type ChatMessage } from './chatStore';
import { useVoiceInput, useSpeechOutput, markdownToSpeech } from './speech';

const STARTERS: { group: string; questions: string[] }[] = [
  {
    group: 'For people with low vision',
    questions: [
      'I was just diagnosed with macular degeneration. What should I do first?',
      'What devices can help me read again?',
      'Does Medicare pay for a low vision exam or magnifiers?',
    ],
  },
  {
    group: 'For family and caregivers',
    questions: [
      'How can I help my parent who is losing their vision stay safe at home?',
      'What support is there for caregivers of someone who is blind?',
      'How do I find low vision services near me?',
    ],
  },
];

const SPEECH_RATES = [
  { value: 0.75, label: 'Slow' },
  { value: 1, label: 'Normal' },
  { value: 1.25, label: 'Fast' },
  { value: 1.5, label: 'Very fast' },
];

interface ChatPanelProps {
  /** Heading level for each message heading (answer headings go one deeper). */
  messageHeadingLevel?: 2 | 3;
  /** Called when the visitor follows a link to another page on this site. */
  onNavigate?: () => void;
  /** Set by the panel: returns true if Escape was used to stop speech or listening. */
  escapeRef?: MutableRefObject<(() => boolean) | null>;
  /** Focus the question box when the panel mounts. */
  autoFocus?: boolean;
  /** Incremented by the parent to request focus on the question box. */
  focusSignal?: number;
  /** Fixed id for the question box (so other controls can focus it). */
  inputId?: string;
}

export function ChatPanel({ messageHeadingLevel = 3, onNavigate, escapeRef, autoFocus, focusSignal, inputId: fixedInputId }: ChatPanelProps) {
  const { messages, busy, status, prefs } = useChatState();
  const [draft, setDraft] = useState('');
  const [announcement, setAnnouncement] = useState('');
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const logRef = useRef<HTMLOListElement>(null);
  const stickToBottom = useRef(true);
  const ids = useId();
  const inputId = fixedInputId ?? `${ids}-input`;
  const hintId = `${ids}-hint`;
  const voiceStatusId = `${ids}-voice`;

  const speech = useSpeechOutput(prefs.speechRate, prefs.voiceName);

  const announce = (text: string) => {
    // Clear first so repeating the same text is announced again.
    setAnnouncement('');
    window.setTimeout(() => setAnnouncement(text), 60);
  };

  const submit = (text: string) => {
    const q = text.trim();
    if (!q || busy) return;
    setDraft('');
    stickToBottom.current = true;
    announce('Question sent. The assistant is working on an answer.');
    if (prefs.readAloud) speech.beginStream();
    void sendMessage(q, {
      onText: (full) => {
        if (prefs.readAloud) speech.speakStream(full, false);
      },
      onDone: (msg) => {
        if (msg.error) {
          announce(msg.content);
        } else if (prefs.readAloud) {
          // Speech is already playing; a screen reader announcement would talk over it.
          speech.speakStream(msg.content, true);
        } else {
          announce(prefs.announceReplies ? `Assistant said: ${markdownToSpeech(msg.content)}` : 'Answer complete.');
        }
      },
    });
  };

  const voice = useVoiceInput((text) => {
    if (prefs.autoSendVoice) {
      submit(text);
    } else {
      setDraft((d) => (d ? `${d} ${text}` : text));
      inputRef.current?.focus();
      announce(`Heard: ${text}. Review it, then press Enter to send.`);
    }
  });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (autoFocus || focusSignal) inputRef.current?.focus();
  }, [autoFocus, focusSignal]);

  // Keep the newest message in view unless the visitor scrolled up to read.
  useEffect(() => {
    const el = logRef.current?.parentElement;
    if (el && stickToBottom.current) el.scrollTop = el.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (!escapeRef) return;
    escapeRef.current = () => {
      if (voice.listening) {
        voice.stop();
        return true;
      }
      if (speech.speaking) {
        speech.cancel();
        announce('Stopped speaking.');
        return true;
      }
      return false;
    };
    return () => {
      escapeRef.current = null;
    };
  });

  useEffect(() => {
    if (voice.listening) {
      speech.cancel();
      announce('Listening. Speak your question now.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voice.listening]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) {
      inputRef.current?.focus();
      announce('Type or speak a question first.');
      return;
    }
    submit(draft);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      submit(draft);
    }
  };

  const copy = async (m: ChatMessage) => {
    try {
      await navigator.clipboard.writeText(m.content);
      announce('Answer copied to clipboard.');
    } catch {
      announce('Copying is not available in this browser.');
    }
  };

  const toggleReadAloud = () => {
    const next = !prefs.readAloud;
    setPrefs({ readAloud: next });
    if (!next) speech.cancel();
    announce(next ? 'Answers will be read aloud.' : 'Read aloud is off.');
  };

  const H = `h${messageHeadingLevel}` as 'h2' | 'h3';
  const answerHeadingLevel = (messageHeadingLevel + 1) as 3 | 4;
  const voiceUnsupported = mounted && !voice.supported;
  const ttsUnsupported = mounted && !speech.supported;

  return (
    <div className="chat-panel">
      {/* Screen reader announcements: progress is in the visible status line below. */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      <div
        className="chat-scroll"
        onScroll={(e) => {
          const el = e.currentTarget;
          stickToBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
        }}
      >
        {messages.length === 0 ? (
          <div className="chat-empty">
            <p className="chat-intro">
              Ask anything about low vision, blindness, caregiving, devices, rehabilitation, coverage, benefits, or finding
              services near you. Answers draw on this website first, then trusted outside sources like government agencies
              and national blindness organizations.
            </p>
            <p className="chat-intro">
              The assistant gives general information, not medical, legal, or financial advice, and it can make mistakes.
              Please don't share personal details such as your Social Security number.
            </p>
            {STARTERS.map((s) => (
              <div key={s.group} className="chat-starters" role="group" aria-label={`Example questions ${s.group.toLowerCase()}`}>
                <p className="chat-starters-heading">{s.group}</p>
                <ul>
                  {s.questions.map((q) => (
                    <li key={q}>
                      <button type="button" className="chat-starter" onClick={() => submit(q)} disabled={busy}>
                        {q}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <ol ref={logRef} className="chat-log" aria-label="Conversation">
            {messages.map((m) => (
              <li key={m.id} className={`chat-msg chat-msg-${m.role}${m.error ? ' chat-msg-error' : ''}`}>
                <H className="sr-only">{m.role === 'user' ? 'You said' : 'Assistant said'}</H>
                <div className="chat-bubble" aria-busy={m.pending ? 'true' : undefined}>
                  {m.role === 'user' ? (
                    <p className="whitespace-pre-wrap">{m.content}</p>
                  ) : m.pending && !m.content ? (
                    <p className="chat-thinking">{status || 'Thinking…'}</p>
                  ) : (
                    <ChatMarkdown text={m.content} headingLevel={answerHeadingLevel} onInternalLink={onNavigate} />
                  )}
                  {m.sources && m.sources.length > 0 && (
                    <div className="chat-sources">
                      <p className="chat-sources-heading">Outside sources</p>
                      <ul>
                        {m.sources.map((s) => (
                          <li key={s.url}>
                            <a href={s.url} target="_blank" rel="noopener noreferrer" className="chat-link">
                              {s.title}
                              <span className="sr-only"> (opens in a new tab)</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                {m.role === 'assistant' && !m.pending && !m.error && (
                  <div className="chat-msg-actions">
                    {speech.supported && (
                      <button type="button" className="chat-btn-small" onClick={() => speech.speak(m.content)}>
                        <Volume2 aria-hidden="true" className="w-4 h-4" />
                        Read aloud
                      </button>
                    )}
                    <button type="button" className="chat-btn-small" onClick={() => copy(m)}>
                      <Copy aria-hidden="true" className="w-4 h-4" />
                      Copy
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ol>
        )}
      </div>

      {/* Visible progress line, also announced politely by screen readers. */}
      <p className="chat-status" role="status">
        {busy ? status || 'Thinking…' : speech.speaking ? 'Reading the answer aloud. Press Escape or Stop speaking to stop.' : ''}
      </p>

      <form className="chat-composer" onSubmit={onSubmit}>
        <label htmlFor={inputId} className="chat-label">
          Your question
        </label>
        <textarea
          id={inputId}
          ref={inputRef}
          className="chat-input"
          rows={2}
          value={voice.listening && voice.interim ? voice.interim : draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          aria-describedby={`${hintId} ${voiceStatusId}`}
          maxLength={4000}
          readOnly={voice.listening}
          autoComplete="off"
        />
        <p id={hintId} className="chat-hint">
          Press Enter to send, Shift and Enter for a new line.
        </p>
        <p id={voiceStatusId} className="chat-voice-status" role={voice.error ? 'alert' : undefined}>
          {voice.listening ? 'Listening… speak now. Select Stop listening when you are done.' : voice.error}
        </p>

        <div className="chat-actions">
          {voice.supported && (
            <button
              type="button"
              className={`chat-btn ${voice.listening ? 'chat-btn-active' : 'chat-btn-secondary'}`}
              onClick={voice.listening ? voice.stop : voice.start}
              aria-pressed={voice.listening}
              disabled={busy && !voice.listening}
            >
              {voice.listening ? <MicOff aria-hidden="true" className="w-5 h-5" /> : <Mic aria-hidden="true" className="w-5 h-5" />}
              {voice.listening ? 'Stop listening' : 'Speak'}
            </button>
          )}
          {speech.speaking && (
            <button type="button" className="chat-btn chat-btn-secondary" onClick={speech.cancel}>
              <VolumeX aria-hidden="true" className="w-5 h-5" />
              Stop speaking
            </button>
          )}
          {busy ? (
            <button type="button" className="chat-btn chat-btn-primary" onClick={stopAnswer}>
              <Square aria-hidden="true" className="w-5 h-5" />
              Stop answer
            </button>
          ) : (
            <button type="submit" className="chat-btn chat-btn-primary">
              <Send aria-hidden="true" className="w-5 h-5" />
              Send
            </button>
          )}
        </div>
      </form>

      <details className="chat-settings">
        <summary>
          <Settings aria-hidden="true" className="w-4 h-4 inline-block mr-1.5 -mt-0.5" />
          Voice and reading options
        </summary>
        <fieldset className="chat-settings-body">
          <legend className="sr-only">Voice and reading options</legend>

          <label className="chat-check">
            <input type="checkbox" checked={prefs.readAloud} onChange={toggleReadAloud} disabled={ttsUnsupported} />
            <span>
              Read answers aloud
              {ttsUnsupported && <span className="chat-check-note"> (not supported in this browser)</span>}
            </span>
          </label>

          <div className="chat-field">
            <label htmlFor={`${ids}-rate`}>Speaking speed</label>
            <select
              id={`${ids}-rate`}
              value={prefs.speechRate}
              onChange={(e) => setPrefs({ speechRate: Number(e.target.value) })}
              disabled={ttsUnsupported}
            >
              {SPEECH_RATES.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          {speech.voices.length > 1 && (
            <div className="chat-field">
              <label htmlFor={`${ids}-voice`}>Voice</label>
              <select id={`${ids}-voice`} value={prefs.voiceName} onChange={(e) => setPrefs({ voiceName: e.target.value })}>
                <option value="">Browser default</option>
                {speech.voices.map((v) => (
                  <option key={v.name} value={v.name}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <label className="chat-check">
            <input
              type="checkbox"
              checked={prefs.autoSendVoice}
              onChange={(e) => setPrefs({ autoSendVoice: e.target.checked })}
              disabled={voiceUnsupported}
            />
            <span>
              Send my question as soon as I finish speaking
              {voiceUnsupported && (
                <span className="chat-check-note"> (voice input is not supported in this browser; try Chrome, Edge, or Safari)</span>
              )}
            </span>
          </label>

          <label className="chat-check">
            <input type="checkbox" checked={prefs.brief} onChange={(e) => setPrefs({ brief: e.target.checked })} />
            <span>Give shorter answers</span>
          </label>

          <label className="chat-check">
            <input
              type="checkbox"
              checked={prefs.announceReplies}
              onChange={(e) => setPrefs({ announceReplies: e.target.checked })}
            />
            <span>Have my screen reader announce each new answer automatically</span>
          </label>
        </fieldset>
      </details>

      <div className="chat-footer">
        <p>General information only, not medical advice. For sudden vision changes, call 911.</p>
        {messages.length > 0 && (
          <button
            type="button"
            className="chat-btn-small"
            onClick={() => {
              speech.cancel();
              clearConversation();
              announce('Conversation cleared.');
              inputRef.current?.focus();
            }}
          >
            <Trash2 aria-hidden="true" className="w-4 h-4" />
            Clear conversation
          </button>
        )}
      </div>
    </div>
  );
}
