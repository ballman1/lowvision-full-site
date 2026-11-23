/**
 * Standalone Node.js server for hosts that run a long-lived process
 * (Railway, Render, Fly.io, a VPS, Docker…).
 *
 *   npm run build   # builds the site into dist/ and this server into dist-node/
 *   npm start       # node dist-node/server.mjs
 *
 * It serves:
 *   POST /api/chat  → the AI assistant (server/chat/handler.ts)
 *   GET  /healthz   → "ok" (for the host's health check)
 *   everything else → the prerendered site in dist/, with the same security
 *                     and cache headers as public/_headers, and index.html as
 *                     the fallback for client-side routes.
 *
 * Environment: PORT (set by Railway), OPENAI_API_KEY (required for the
 * assistant), CHAT_MODEL, CHAT_EFFORT, OPENAI_BASE_URL (optional),
 * CANONICAL_HOST (optional, e.g. lowvisionnavigator.org: other hostnames
 * such as www. are redirected there; health checks are exempt).
 */

import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { Readable } from 'node:stream';
import { fileURLToPath } from 'node:url';
import { handleChat } from './chat/handler.ts';

const PORT = Number(process.env.PORT) || 3000;
const CANONICAL_HOST = process.env.CANONICAL_HOST?.trim().toLowerCase() || '';

// dist-node/server.mjs → ../dist
const DIST = resolve(fileURLToPath(new URL('.', import.meta.url)), '..', 'dist');

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.webmanifest': 'application/manifest+json',
  '.map': 'application/json; charset=utf-8',
};

/** Same values as public/_headers (used by Cloudflare) and netlify.toml. */
const SECURITY_HEADERS: Record<string, string> = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(self), geolocation=()',
  'Content-Security-Policy':
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.supabase.co; frame-ancestors 'none';",
  'Strict-Transport-Security': 'max-age=31536000',
};

function cacheControl(urlPath: string): string {
  if (urlPath.startsWith('/assets/')) return 'public, max-age=31536000, immutable';
  if (urlPath === '/robots.txt' || urlPath === '/sitemap.xml') return 'public, max-age=3600';
  return 'public, max-age=0, must-revalidate';
}

/** Hidden files such as _headers and _redirects are host config, not content. */
function isHidden(urlPath: string): boolean {
  return urlPath.split('/').some((seg) => seg.startsWith('.') || seg.startsWith('_'));
}

async function fileAt(path: string): Promise<{ path: string; size: number; mtime: Date } | null> {
  try {
    const s = await stat(path);
    return s.isFile() ? { path, size: s.size, mtime: s.mtime } : null;
  } catch {
    return null;
  }
}

/** Map a URL path to a file in dist/, refusing anything outside it. */
function safeJoin(urlPath: string): string | null {
  const full = normalize(join(DIST, urlPath));
  return full === DIST || full.startsWith(DIST + sep) ? full : null;
}

async function serveStatic(req: IncomingMessage, res: ServerResponse, url: URL) {
  let urlPath: string;
  try {
    urlPath = decodeURIComponent(url.pathname);
  } catch {
    res.writeHead(400).end('Bad request');
    return;
  }

  const base = safeJoin(urlPath);
  let file = null;
  if (base && !isHidden(urlPath)) {
    file = await fileAt(base);
    if (!file) {
      // Prerendered pages live at /route/index.html. Redirect /route → /route/
      // so relative URLs behave the same as on Cloudflare.
      const indexFile = await fileAt(join(base, 'index.html'));
      if (indexFile && !urlPath.endsWith('/')) {
        res.writeHead(308, { Location: `${url.pathname}/${url.search}`, ...SECURITY_HEADERS }).end();
        return;
      }
      file = indexFile;
    }
  }

  if (!file) {
    // Missing files under /assets/ are real 404s; anything else is a
    // client-side route, so send the app shell.
    if (urlPath.startsWith('/assets/') || extname(urlPath)) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8', ...SECURITY_HEADERS }).end('Not found');
      return;
    }
    file = await fileAt(join(DIST, 'index.html'));
    if (!file) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Site not built. Run `npm run build`.');
      return;
    }
  }

  const etag = `W/"${file.size.toString(16)}-${file.mtime.getTime().toString(16)}"`;
  const headers: Record<string, string> = {
    ...SECURITY_HEADERS,
    'Content-Type': MIME[extname(file.path).toLowerCase()] ?? 'application/octet-stream',
    'Cache-Control': cacheControl(urlPath),
    ETag: etag,
    'Last-Modified': file.mtime.toUTCString(),
  };

  if (req.headers['if-none-match'] === etag) {
    res.writeHead(304, headers).end();
    return;
  }

  headers['Content-Length'] = String(file.size);
  res.writeHead(200, headers);
  if (req.method === 'HEAD') {
    res.end();
    return;
  }
  createReadStream(file.path).pipe(res);
}

/** Bridge Node's request to a web Request, and a web Response back. */
async function serveChat(req: IncomingMessage, res: ServerResponse, url: URL) {
  const controller = new AbortController();
  // 'close' on the response fires when the visitor disconnects (or we finish).
  res.on('close', () => controller.abort());

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (typeof value === 'string') headers.set(key, value);
    else if (Array.isArray(value)) headers.set(key, value.join(', '));
  }

  const hasBody = req.method !== 'GET' && req.method !== 'HEAD';
  const request = new Request(url, {
    method: req.method,
    headers,
    body: hasBody ? (Readable.toWeb(req) as ReadableStream<Uint8Array>) : undefined,
    signal: controller.signal,
    // Required by Node's fetch implementation when streaming a request body.
    ...(hasBody ? { duplex: 'half' } : {}),
  } as RequestInit);

  const response = await handleChat(request, {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OPENAI_BASE_URL: process.env.OPENAI_BASE_URL,
    CHAT_MODEL: process.env.CHAT_MODEL,
    CHAT_EFFORT: process.env.CHAT_EFFORT,
  });

  const out: Record<string, string> = { ...SECURITY_HEADERS };
  response.headers.forEach((value, key) => {
    out[key] = value;
  });
  res.writeHead(response.status, out);
  res.flushHeaders();

  if (!response.body) {
    res.end();
    return;
  }
  const reader = response.body.getReader();
  try {
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      res.write(value);
    }
  } catch {
    /* visitor disconnected */
  } finally {
    res.end();
  }
}

/** The visitor's real host, as forwarded by Railway's or Cloudflare's proxy. */
function requestHost(req: IncomingMessage): string {
  const forwarded = req.headers['x-forwarded-host'];
  const host = (Array.isArray(forwarded) ? forwarded[0] : forwarded) || req.headers.host || 'localhost';
  return host.split(',')[0].trim().toLowerCase();
}

const server = createServer(async (req, res) => {
  try {
    const host = requestHost(req);
    const proto = String(req.headers['x-forwarded-proto'] || 'http').split(',')[0].trim();
    const url = new URL(req.url || '/', `${proto}://${host}`);

    if (url.pathname === '/healthz') {
      res.writeHead(200, { 'Content-Type': 'text/plain', 'Cache-Control': 'no-store' }).end('ok');
      return;
    }

    // Optional: send www. (or the raw railway.app address) to the main domain.
    const hostname = host.replace(/:\d+$/, '');
    if (CANONICAL_HOST && hostname !== CANONICAL_HOST && !hostname.endsWith('.railway.internal')) {
      res.writeHead(301, { Location: `https://${CANONICAL_HOST}${url.pathname}${url.search}` }).end();
      return;
    }

    if (url.pathname === '/api/chat') {
      await serveChat(req, res, url);
      return;
    }
    if (url.pathname.startsWith('/api/')) {
      res.writeHead(404, { 'Content-Type': 'application/json', ...SECURITY_HEADERS }).end('{"error":"Not found"}');
      return;
    }
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.writeHead(405, { Allow: 'GET, HEAD', ...SECURITY_HEADERS }).end('Method not allowed');
      return;
    }
    await serveStatic(req, res, url);
  } catch (err) {
    console.error('Request failed', err);
    if (!res.headersSent) res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal server error');
  }
});

// Listen on IPv6 "::" — on Linux this also accepts IPv4, and Railway's
// private network (*.railway.internal) is IPv6-only. Hosts without IPv6 fall
// back to IPv4. Set HOST to override.
server.on('listening', () => {
  const addr = server.address();
  const where = typeof addr === 'object' && addr ? `${addr.address} port ${addr.port}` : String(addr);
  console.log(`Low Vision Navigator listening on ${where} (serving ${DIST})`);
  if (!process.env.OPENAI_API_KEY) {
    console.warn('OPENAI_API_KEY is not set: the assistant will report that it is not configured.');
  }
});

function listen(host: string) {
  server.once('error', (err: NodeJS.ErrnoException) => {
    if (!process.env.HOST && host === '::' && (err.code === 'EAFNOSUPPORT' || err.code === 'EADDRNOTAVAIL')) {
      console.warn('IPv6 is not available here; listening on IPv4 only.');
      listen('0.0.0.0');
      return;
    }
    throw err;
  });
  server.listen(PORT, host);
}
listen(process.env.HOST || '::');

for (const signal of ['SIGTERM', 'SIGINT'] as const) {
  process.on(signal, () => {
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(0), 5000).unref();
  });
}
