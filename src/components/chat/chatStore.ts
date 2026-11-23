/**
 * Shared state for the assistant, used by both the floating chat dialog and
 * the full /assistant page so a conversation carries over between them.
 *
 * The conversation is kept in sessionStorage (cleared when the tab closes);
 * preferences such as read-aloud are kept in localStorage.
 */

import { useSyncExternalStore } from 'react';

export interface ChatSource {
  url: string;
  title: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: ChatSource[];
  error?: boolean;
  /** True while the answer is still streaming in. */
  pending?: boolean;
}

export interface ChatPreferences {
  /** Speak answers with the browser's text-to-speech voice. */
  readAloud: boolean;
  /** Speech rate, 0.6–1.6. */
  speechRate: number;
  /** Name of the chosen speech voice ('' = browser default). */
  voiceName: string;
  /** Send automatically after voice input finishes. */
  autoSendVoice: boolean;
  /** Ask for shorter answers. */
  brief: boolean;
  /** Have screen readers announce each complete answer automatically. */
  announceReplies: boolean;
}

interface ChatState {
  messages: ChatMessage[];
  busy: boolean;
  status: string;
  prefs: ChatPreferences;
}

const MESSAGES_KEY = 'lv-chat-messages';
const PREFS_KEY = 'lv-chat-prefs';

const DEFAULT_PREFS: ChatPreferences = {
  readAloud: false,
  speechRate: 1,
  voiceName: '',
  autoSendVoice: true,
  brief: false,
  announceReplies: true,
};

function load<T>(storage: 'local' | 'session', key: string, fallback: T): T {
  try {
    if (typeof window === 'undefined') return fallback;
    const store = storage === 'local' ? window.localStorage : window.sessionStorage;
    const raw = store.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save(storage: 'local' | 'session', key: string, value: unknown) {
  try {
    const store = storage === 'local' ? window.localStorage : window.sessionStorage;
    store.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable (private mode, blocked) — the chat still works */
  }
}

let state: ChatState = {
  messages: load<ChatMessage[]>('session', MESSAGES_KEY, []).filter((m) => !m.pending),
  busy: false,
  status: '',
  prefs: { ...DEFAULT_PREFS, ...load<Partial<ChatPreferences>>('local', PREFS_KEY, {}) },
};

const SERVER_STATE: ChatState = { messages: [], busy: false, status: '', prefs: DEFAULT_PREFS };

const listeners = new Set<() => void>();

function setState(patch: Partial<ChatState>) {
  state = { ...state, ...patch };
  if (patch.messages) save('session', MESSAGES_KEY, state.messages.filter((m) => !m.pending));
  if (patch.prefs) save('local', PREFS_KEY, state.prefs);
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useChatState(): ChatState {
  return useSyncExternalStore(subscribe, () => state, () => SERVER_STATE);
}

export function setPrefs(patch: Partial<ChatPreferences>) {
  setState({ prefs: { ...state.prefs, ...patch } });
}

export function clearConversation() {
  abortController?.abort();
  setState({ messages: [], busy: false, status: '' });
}

let abortController: AbortController | null = null;

export function stopAnswer() {
  abortController?.abort();
}

function newId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function updateMessage(id: string, patch: Partial<ChatMessage>) {
  setState({ messages: state.messages.map((m) => (m.id === id ? { ...m, ...patch } : m)) });
}

export interface SendCallbacks {
  /** Called with the full answer text so far, each time more arrives. */
  onText?: (fullText: string) => void;
  /** Called once the answer is complete (or failed). */
  onDone?: (message: ChatMessage) => void;
}

export async function sendMessage(text: string, callbacks: SendCallbacks = {}) {
  const content = text.trim();
  if (!content || state.busy) return;

  const userMsg: ChatMessage = { id: newId(), role: 'user', content };
  const reply: ChatMessage = { id: newId(), role: 'assistant', content: '', pending: true };
  const history = [...state.messages.filter((m) => !m.error), userMsg];

  setState({ messages: [...state.messages, userMsg, reply], busy: true, status: 'Thinking…' });

  abortController = new AbortController();
  let answer = '';
  let sources: ChatSource[] | undefined;
  let error: string | null = null;

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: abortController.signal,
      body: JSON.stringify({
        messages: history.map((m) => ({ role: m.role, content: m.content })),
        pagePath: typeof window !== 'undefined' ? window.location.pathname : undefined,
        preferences: { brief: state.prefs.brief },
      }),
    });

    if (!res.ok || !res.body) {
      let msg = 'The assistant is unavailable right now. Please try again later.';
      try {
        const data = (await res.json()) as { error?: string };
        if (data.error) msg = data.error;
      } catch {
        /* not JSON */
      }
      throw new Error(msg);
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      let newline: number;
      while ((newline = buffer.indexOf('\n')) >= 0) {
        const line = buffer.slice(0, newline).trim();
        buffer = buffer.slice(newline + 1);
        if (!line) continue;
        let event: { type: string; text?: string; message?: string; sources?: ChatSource[] };
        try {
          event = JSON.parse(line);
        } catch {
          continue;
        }
        if (event.type === 'text' && event.text) {
          answer += event.text;
          updateMessage(reply.id, { content: answer });
          if (state.status) setState({ status: '' });
          callbacks.onText?.(answer);
        } else if (event.type === 'status' && event.message) {
          setState({ status: event.message });
        } else if (event.type === 'sources' && event.sources) {
          sources = event.sources;
        } else if (event.type === 'error') {
          error = event.message ?? 'Something went wrong. Please try again.';
        }
      }
    }
  } catch (err) {
    if ((err as Error).name === 'AbortError') {
      if (!answer) answer = 'Answer stopped.';
      else answer += '\n\n(Answer stopped.)';
    } else {
      error = (err as Error).message || 'Could not reach the assistant. Check your connection and try again.';
    }
  } finally {
    abortController = null;
  }

  const final: ChatMessage = {
    ...reply,
    pending: false,
    content: error ? (answer ? `${answer}\n\n${error}` : error) : answer,
    sources,
    error: !!error && !answer,
  };
  // The conversation may have been cleared while the answer was streaming.
  if (state.messages.some((m) => m.id === reply.id)) {
    setState({ messages: state.messages.map((m) => (m.id === reply.id ? final : m)), busy: false, status: '' });
  } else {
    setState({ busy: false, status: '' });
  }
  callbacks.onDone?.(final);
}
