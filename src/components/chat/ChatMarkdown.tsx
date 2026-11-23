/**
 * Minimal, safe Markdown renderer for assistant answers.
 *
 * Builds React elements directly (no innerHTML), so model output can never
 * inject markup. Supports what the assistant is instructed to use:
 * paragraphs, ## headings, bulleted and numbered lists, **bold**, *italic*,
 * `code` and [links](url). Headings render one level below the message
 * heading so the page outline stays correct for screen readers.
 */

import { Fragment, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  text: string;
  /** Heading level for "##" headings inside the answer (message headings sit one level above). */
  headingLevel?: 3 | 4 | 5;
  onInternalLink?: () => void;
}

type Block =
  | { kind: 'p'; text: string }
  | { kind: 'h'; text: string }
  | { kind: 'ul' | 'ol'; items: string[]; start: number };

function parseBlocks(md: string): Block[] {
  const blocks: Block[] = [];
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  let para: string[] = [];

  const flushPara = () => {
    if (para.length) blocks.push({ kind: 'p', text: para.join(' ') });
    para = [];
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const heading = /^#{1,6}\s+(.*)$/.exec(line);
    const bullet = /^\s*[-*+•]\s+(.*)$/.exec(line);
    const numbered = /^\s*(\d+)[.)]\s+(.*)$/.exec(line);

    if (!line.trim()) {
      flushPara();
    } else if (/^\s*(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
      flushPara();
    } else if (heading) {
      flushPara();
      blocks.push({ kind: 'h', text: heading[1].replace(/[#*]+$/g, '').trim() });
    } else if (bullet || numbered) {
      flushPara();
      const kind = bullet ? 'ul' : 'ol';
      const itemText = bullet ? bullet[1] : numbered![2];
      const last = blocks[blocks.length - 1];
      if (last && last.kind === kind) last.items.push(itemText);
      else blocks.push({ kind, items: [itemText], start: numbered ? Number(numbered[1]) : 1 });
    } else {
      // A line indented under a list item continues that item.
      const last = blocks[blocks.length - 1];
      if (para.length === 0 && /^\s{2,}/.test(raw) && last && (last.kind === 'ul' || last.kind === 'ol')) {
        last.items[last.items.length - 1] += ' ' + line.trim();
      } else {
        para.push(line.trim());
      }
    }
  }
  flushPara();
  return blocks;
}

const INLINE = /(\[([^\]]+)\]\(([^)\s]+)\))|(\*\*([^*]+)\*\*)|(__([^_]+)__)|(`([^`]+)`)|(\*([^*\s][^*]*)\*)|(https?:\/\/[^\s)]+[^\s).,;:!?])/g;

function safeHref(href: string): string | null {
  if (href.startsWith('/') && !href.startsWith('//')) return href;
  try {
    const u = new URL(href);
    if (u.protocol === 'https:' || u.protocol === 'http:' || u.protocol === 'mailto:' || u.protocol === 'tel:') return u.href;
  } catch {
    /* invalid */
  }
  return null;
}

function renderInline(text: string, onInternalLink?: () => void): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const m of text.matchAll(INLINE)) {
    const idx = m.index ?? 0;
    if (idx > last) out.push(text.slice(last, idx));
    if (m[1]) {
      out.push(renderLink(m[2], m[3], key++, onInternalLink));
    } else if (m[4] || m[6]) {
      out.push(<strong key={key++}>{renderInline(m[5] ?? m[7], onInternalLink)}</strong>);
    } else if (m[8]) {
      out.push(<code key={key++} className="chat-code">{m[9]}</code>);
    } else if (m[10]) {
      out.push(<em key={key++}>{m[11]}</em>);
    } else if (m[12]) {
      out.push(renderLink(hostLabel(m[12]), m[12], key++, onInternalLink));
    }
    last = idx + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function hostLabel(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

function renderLink(label: string, rawHref: string, key: number, onInternalLink?: () => void): ReactNode {
  const href = safeHref(rawHref);
  if (!href) return <Fragment key={key}>{label}</Fragment>;
  if (href.startsWith('/')) {
    return (
      <Link key={key} to={href} className="chat-link" onClick={onInternalLink}>
        {label}
      </Link>
    );
  }
  const external = href.startsWith('http');
  return (
    <a
      key={key}
      href={href}
      className="chat-link"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {label}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}

export function ChatMarkdown({ text, headingLevel = 4, onInternalLink }: Props) {
  const blocks = parseBlocks(text);
  const H = `h${headingLevel}` as 'h3' | 'h4' | 'h5';
  return (
    <>
      {blocks.map((b, i) => {
        if (b.kind === 'h') return <H key={i} className="chat-md-heading">{renderInline(b.text, onInternalLink)}</H>;
        if (b.kind === 'p') return <p key={i}>{renderInline(b.text, onInternalLink)}</p>;
        if (b.kind === 'ul') {
          return (
            <ul key={i} className="chat-md-list list-disc">
              {b.items.map((it, j) => <li key={j}>{renderInline(it, onInternalLink)}</li>)}
            </ul>
          );
        }
        return (
          <ol key={i} start={b.start} className="chat-md-list list-decimal">
            {b.items.map((it, j) => <li key={j}>{renderInline(it, onInternalLink)}</li>)}
          </ol>
        );
      })}
    </>
  );
}
