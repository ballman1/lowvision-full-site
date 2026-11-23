/**
 * Cloudflare Pages Functions entry for the assistant: serves POST /api/chat
 * when the site is deployed as a Pages project. (The Workers deployment uses
 * worker/index.ts instead.) The logic lives in server/chat/handler.ts.
 *
 * Set OPENAI_API_KEY as a secret in Cloudflare → Workers & Pages →
 * lowvision-full-site (Pages) → Settings → Variables and Secrets.
 */
import { handleChat, type ChatEnv } from '../../server/chat/handler';

interface PagesContext {
  request: Request;
  env: ChatEnv;
}

export const onRequestPost = (context: PagesContext) => handleChat(context.request, context.env);
