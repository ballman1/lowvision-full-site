/**
 * Cloudflare Worker entry point (configured in wrangler.jsonc).
 *
 * Static files (the prerendered site in dist/) are served directly by
 * Cloudflare's asset handling. Only requests matching `run_worker_first`
 * (/api/*) reach this code; anything else here falls through to the assets.
 *
 * Secrets: OPENAI_API_KEY — set with `npx wrangler secret put OPENAI_API_KEY`
 * or in the dashboard: Workers & Pages → lowvision-full-site → Settings →
 * Variables and Secrets.
 */
import { handleChat, type ChatEnv } from '../server/chat/handler';

interface Env extends ChatEnv {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === '/api/chat') return handleChat(request, env);
    if (pathname.startsWith('/api/')) return Response.json({ error: 'Not found' }, { status: 404 });

    return env.ASSETS.fetch(request);
  },
};
