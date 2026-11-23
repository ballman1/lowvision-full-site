/**
 * Floating "Ask the Assistant" button plus the chat dialog.
 *
 * Uses the native <dialog> element with showModal(), which gives a real
 * modal for assistive technology: the rest of the page becomes inert, focus
 * moves into the dialog, and Escape closes it. Focus returns to the button
 * that opened it. On small screens the dialog fills the viewport.
 */

import { useEffect, useRef, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { MessageCircle, X, Maximize2 } from 'lucide-react';
import { ChatPanel } from './ChatPanel';
import { OPEN_CHAT_EVENT } from './openChat';

export function ChatLauncher() {
  const { pathname } = useLocation();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const escapeRef = useRef<(() => boolean) | null>(null);
  const [open, setOpen] = useState(false);
  const [focusSignal, setFocusSignal] = useState(0);

  const onAssistantPage = pathname === '/assistant';

  const show = () => {
    const d = dialogRef.current;
    if (!d) return;
    openerRef.current = document.activeElement as HTMLElement | null;
    if (!d.open) d.showModal();
    setOpen(true);
    setFocusSignal((n) => n + 1);
  };

  const close = () => dialogRef.current?.close();

  useEffect(() => {
    const handler = () => {
      if (window.location.pathname === '/assistant') {
        document.getElementById('assistant-question')?.focus();
        return;
      }
      show();
    };
    window.addEventListener(OPEN_CHAT_EVENT, handler);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, handler);
  }, []);

  // Close when navigating to the full assistant page.
  useEffect(() => {
    if (onAssistantPage && dialogRef.current?.open) close();
  }, [onAssistantPage]);

  if (onAssistantPage) return null;

  return (
    <>
      {!open && (
        <button type="button" className="chat-launcher" onClick={show} aria-haspopup="dialog">
          <MessageCircle aria-hidden="true" className="w-6 h-6 shrink-0" />
          <span>Ask the Assistant</span>
        </button>
      )}

      <dialog
        ref={dialogRef}
        className="chat-dialog"
        aria-labelledby="chat-dialog-title"
        aria-describedby="chat-dialog-desc"
        onCancel={(e) => {
          // First Escape stops speech or listening; the next one closes.
          if (escapeRef.current?.()) e.preventDefault();
        }}
        onClose={() => {
          setOpen(false);
          window.speechSynthesis?.cancel();
          openerRef.current?.focus?.();
        }}
        onClick={(e) => {
          // A click on the backdrop (outside the dialog box) closes it.
          if (e.target === dialogRef.current) close();
        }}
      >
        {open && (
          <div className="chat-dialog-inner">
            <div className="chat-dialog-header">
              <div>
                <h2 id="chat-dialog-title" className="chat-dialog-title">
                  Low Vision Navigator Assistant
                </h2>
                <p id="chat-dialog-desc" className="sr-only">
                  Ask questions by typing or speaking. Answers can be read aloud. Press Escape to close.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link to="/assistant" className="chat-icon-btn" onClick={close}>
                  <Maximize2 aria-hidden="true" className="w-5 h-5" />
                  <span className="sr-only">Open the assistant in a full page</span>
                </Link>
                <button type="button" className="chat-icon-btn" onClick={close}>
                  <X aria-hidden="true" className="w-6 h-6" />
                  <span className="sr-only">Close assistant</span>
                </button>
              </div>
            </div>
            <ChatPanel messageHeadingLevel={3} onNavigate={close} escapeRef={escapeRef} focusSignal={focusSignal} />
          </div>
        )}
      </dialog>
    </>
  );
}
