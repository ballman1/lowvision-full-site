/** Netlify Functions entry for the assistant. The logic lives in server/chat/handler.ts. */
import type { Config } from '@netlify/functions';
import { handleChat } from '../../server/chat/handler.ts';

export default (req: Request) =>
  handleChat(req, {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OPENAI_BASE_URL: process.env.OPENAI_BASE_URL,
    CHAT_MODEL: process.env.CHAT_MODEL,
    CHAT_EFFORT: process.env.CHAT_EFFORT,
  });

export const config: Config = {
  path: '/api/chat',
  method: 'POST',
};
