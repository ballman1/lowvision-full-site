import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ContentPageLayout } from '../components/ui/ContentPageLayout';
import { ChatPanel } from '../components/chat/ChatPanel';

/**
 * Full-page version of the assistant. Some visitors (screen magnifier users
 * especially) find a full page easier than a dialog; the conversation is
 * shared with the floating chat.
 */
export function AssistantPage() {
  const escapeRef = useRef<(() => boolean) | null>(null);

  return (
    <ContentPageLayout
      title="Ask the Low Vision Navigator Assistant"
      subtitle="Get plain-language answers about low vision, blindness, caregiving, devices, benefits, and local services. Type or speak your question, and have answers read aloud if you like."
      description="A free AI assistant that answers questions about low vision, blindness, caregiving, devices, coverage, and local services using Low Vision Navigator and trusted outside sources. Works with screen readers and supports voice input and spoken answers."
      breadcrumbs={[{ label: 'Assistant' }]}
    >
      <section
        aria-labelledby="assistant-heading"
        className="chat-page"
        onKeyDown={(e) => {
          if (e.key === 'Escape' && escapeRef.current?.()) e.preventDefault();
        }}
      >
        <h2 id="assistant-heading" className="sr-only">
          Conversation with the assistant
        </h2>
        <ChatPanel messageHeadingLevel={3} escapeRef={escapeRef} inputId="assistant-question" />
      </section>

      <section aria-labelledby="assistant-tips" className="mt-10 max-w-3xl">
        <h2 id="assistant-tips" className="text-2xl font-bold text-gray-900 mb-4">
          Tips for using the assistant
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-800 text-lg leading-relaxed">
          <li>
            <strong>Screen reader users:</strong> each message starts with a heading, "You said" or "Assistant said", so you
            can move between messages with your heading key (H in most screen readers). New answers are announced when
            complete; you can turn that off under Voice and reading options.
          </li>
          <li>
            <strong>Voice input:</strong> select Speak, ask your question, and it sends when you stop talking. Your browser
            will ask permission to use the microphone the first time. Voice input works in Chrome, Edge, and Safari.
          </li>
          <li>
            <strong>Spoken answers:</strong> turn on Read answers aloud and choose a speaking speed and voice. Press Escape or
            Stop speaking at any time.
          </li>
          <li>
            <strong>Larger text and higher contrast:</strong> use the text size and High Contrast controls at the top of every
            page; the assistant follows them.
          </li>
          <li>
            For a personalized plan you can print, try the <Link to="/intake/start" className="text-blue-800 underline font-medium">intake questionnaire</Link>.
            To browse services yourself, use <Link to="/resources" className="text-blue-800 underline font-medium">Find Local Resources</Link>.
          </li>
        </ul>
        <p className="mt-6 text-gray-800">
          Your questions, and the address of the page you are on, are sent to our AI provider, OpenAI, to generate answers.
          Please don't include personal details. On this device the conversation is kept only in this browser tab and is
          erased when you close it. See our{' '}
          <Link to="/about/privacy" className="text-blue-800 underline font-medium">privacy policy</Link>.
        </p>
      </section>
    </ContentPageLayout>
  );
}
