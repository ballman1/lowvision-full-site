/**
 * Builds the chat assistant's site knowledge base.
 *
 * Runs after `scripts/prerender.mjs`. Reads every prerendered page in dist/,
 * keeps only the <main> content, converts it to plain text (keeping headings,
 * list items and outbound link URLs), splits it into heading-based sections,
 * and writes server/chat/site-pages.json, which the chat function
 * bundles and searches at request time.
 *
 * The output is committed so the function also works in local development
 * without a full build; every production build regenerates it.
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { resolve, dirname, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const distDir = resolve(root, 'dist');
const outFile = resolve(root, 'server/chat/site-pages.json');

const MAX_SECTION_CHARS = 2500;

function findPages(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = resolve(dir, name);
    if (name === 'assets') continue;
    if (statSync(full).isDirectory()) out.push(...findPages(full));
    else if (name === 'index.html') out.push(full);
  }
  return out;
}

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', '#39': "'", '#x27': "'", mdash: '—', ndash: '–', hellip: '…', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“', middot: '·', bull: '•', copy: '©' };

function decode(text) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+\d*);/gi, (m, code) => {
    if (code[0] === '#') {
      const n = code[1].toLowerCase() === 'x' ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isFinite(n) ? String.fromCodePoint(n) : m;
    }
    return ENTITIES[code.toLowerCase()] ?? m;
  });
}

/** Convert the <main> HTML into lightweight Markdown-ish text. */
function htmlToText(html) {
  let s = html;
  s = s.replace(/<(script|style|svg|noscript|form|button)[\s\S]*?<\/\1>/gi, ' ');
  s = s.replace(/<!--[\s\S]*?-->/g, '');
  // Outbound links keep their URL so the assistant can cite them; internal links keep their path.
  s = s.replace(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (_m, href, inner) => {
    const label = inner.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (!label) return ' ';
    if (/^(https?:|tel:|mailto:)/i.test(href) || href.startsWith('/')) {
      if (href.startsWith('tel:') || href.startsWith('mailto:')) return ` ${label} `;
      return ` ${label} (${href}) `;
    }
    return ` ${label} `;
  });
  s = s.replace(/<h([1-4])\b[^>]*>([\s\S]*?)<\/h\1>/gi, (_m, level, inner) => {
    const t = inner.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    return t ? `\n\n${'#'.repeat(Number(level))} ${t}\n` : '\n';
  });
  s = s.replace(/<li\b[^>]*>/gi, '\n- ');
  s = s.replace(/[→►▸•]\s*/g, '');
  s = s.replace(/<(br|hr)\b[^>]*\/?>/gi, '\n');
  s = s.replace(/<\/(p|div|section|article|ul|ol|li|tr|table|header|footer|aside|nav|dd|dt|summary|details|blockquote)>/gi, '\n');
  s = s.replace(/<(td|th)\b[^>]*>/gi, ' | ');
  s = s.replace(/<[^>]+>/g, ' ');
  s = decode(s);
  s = s
    .split('\n')
    .map((line) => line.replace(/[ \t ]+/g, ' ').trim())
    .filter((line, i, arr) => line !== '' || (arr[i - 1] ?? '') !== '')
    .filter((line) => line !== '-')
    .join('\n');
  return s.replace(/\n{3,}/g, '\n\n').trim();
}

function splitSections(text, pageTitle) {
  const lines = text.split('\n');
  const sections = [];
  let heading = pageTitle;
  let buf = [];

  const flush = () => {
    const body = buf.join('\n').trim();
    buf = [];
    if (body.length < 40) return;
    // Long sections are cut on paragraph boundaries so search hits stay focused.
    let chunk = '';
    for (const para of body.split(/\n\n+/)) {
      if (chunk && chunk.length + para.length > MAX_SECTION_CHARS) {
        sections.push({ heading, text: chunk.trim() });
        chunk = '';
      }
      chunk += para + '\n\n';
    }
    if (chunk.trim()) sections.push({ heading, text: chunk.trim() });
  };

  for (const line of lines) {
    const m = /^(#{1,4}) (.+)$/.exec(line);
    if (m && m[1].length <= 3) {
      flush();
      heading = m[2];
    } else {
      buf.push(line);
    }
  }
  flush();
  return sections;
}

function main() {
  if (!existsSync(distDir)) {
    console.error('dist/ not found. Run `vite build` and the prerender step first.');
    process.exit(1);
  }

  const pages = [];
  for (const file of findPages(distDir)) {
    const html = readFileSync(file, 'utf-8');
    const mainMatch = /<main\b[^>]*>([\s\S]*)<\/main>/i.exec(html);
    if (!mainMatch) continue;

    const rel = relative(distDir, dirname(file)).split(sep).join('/');
    const path = rel ? `/${rel}` : '/';
    const rawTitle = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1] ?? '';
    const title = decode(rawTitle).replace(/\s*[|–-]\s*Low Vision Navigator\s*$/i, '').trim() || path;
    const description = decode(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i.exec(html)?.[1] ?? '').trim();

    const text = htmlToText(mainMatch[1]);
    if (text.length < 100) continue;

    pages.push({ path, title, description, sections: splitSections(text, title) });
  }

  pages.sort((a, b) => a.path.localeCompare(b.path));
  writeFileSync(outFile, JSON.stringify({ generatedAt: new Date().toISOString(), pages }, null, 1) + '\n');

  const sectionCount = pages.reduce((n, p) => n + p.sections.length, 0);
  console.log(`Chat knowledge: ${pages.length} pages, ${sectionCount} sections → ${relative(root, outFile)}`);
  if (pages.length === 0) process.exit(1);
}

main();
