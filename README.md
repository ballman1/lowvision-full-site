# Low Vision Navigator

Resource hub for people with low vision, their families, and professionals,
with an accessible AI assistant (OpenAI GPT-6 Luna) at `/assistant`.

## Develop

```sh
npm install
npm run dev          # site only (the assistant needs one of the servers below)
npm run build        # site → dist/, assistant knowledge → server/chat/site-pages.json,
                     # Node server → dist-node/server.mjs
npm start            # serve dist/ + /api/chat on $PORT (default 3000)
```

## Deploy

All hosts run the same assistant code (`server/chat/handler.ts`) and need the
secret `OPENAI_API_KEY`. Optional: `CHAT_MODEL` (default `gpt-6-luna`),
`CHAT_EFFORT` (`low` | `medium` | `high`, default `medium`).

### Railway

1. In the Railway service, connect this GitHub repository and branch.
   Railway detects Node.js and runs `npm run build`, then `npm start`.
2. **Variables**: add `OPENAI_API_KEY`. (`PORT` is provided by Railway.)
3. **Settings → Deploy → Healthcheck Path**: `/healthz`.
4. **Settings → Networking → Public Networking**: generate a Railway domain to
   test, then add the custom domain `lowvisionnavigator.org` (and `www.` if
   wanted). Railway shows the DNS record to create.
5. In **Cloudflare DNS**, create the CNAME record Railway shows for
   `lowvisionnavigator.org` (and `www`). Remove the domain from the Cloudflare
   Pages/Workers project first, or the old deployment keeps answering.
6. Optional: once the domain works, set `CANONICAL_HOST=lowvisionnavigator.org`
   to redirect `www.` and the `*.up.railway.app` address to it.

`*.railway.internal` is Railway's private network address. Only other
services inside the same Railway project can reach it, so it can't be used
as the target of a public DNS record.

### Cloudflare Workers

`wrangler.jsonc` builds the site and serves `/api/chat` from `worker/index.ts`.
Set the secret with `npx wrangler secret put OPENAI_API_KEY`.

### Cloudflare Pages / Netlify

`functions/api/chat.ts` and `netlify/functions/chat.mts` serve the same
endpoint. Add `OPENAI_API_KEY` in the project's environment variables.
