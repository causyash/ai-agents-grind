# Run on Different Wi‑Fi (Public Access)

## Overview
- Goal: Open your local app from any device on any network
- Recommended: Use a tunnel (ngrok or Cloudflare) for quick sharing
- Best long-term: Deploy to a public host (Netlify/Vercel)

## 1) Prerequisites
- Node.js and npm
- Your NewsAPI key
- Tunnel tool (choose one):
  - ngrok: `brew install ngrok` or download from ngrok.com
  - Cloudflare Tunnel: `brew install cloudflared`

## 2) Prepare environment
```bash
cd news-summarizer
npm install
```
- Set your key in `.env`:
```bash
echo "NEWS_API_KEY=YOUR_NEWSAPI_KEY" >> .env
# optional if already set:
# echo "VITE_NEWS_API_KEY=YOUR_NEWSAPI_KEY" >> .env
```
- Ensure the app calls the local API route and proxy is configured:
  - `src/api/newsApi.js` should request `/api/news?...`
  - `vite.config.js` should proxy `/api` to `http://localhost:3000`
  - Add your tunnel hostname to `server.allowedHosts` before running (example shown in step 4)

## 3) Start the app locally
- Start React dev server and Node API server together:
```bash
npm run dev:host:full
```
- If you don’t have the combined script:
```bash
npm run dev:host   # React
node server.js     # Node API
```

## 4) Create a public tunnel
### Option A: ngrok
- Authenticate once (ngrok dashboard → authtoken)
```bash
ngrok config add-authtoken <YOUR_NGROK_TOKEN>
```
- Tunnel the React dev server port:
```bash
ngrok http 5173
```
- Copy the HTTPS URL, e.g. `https://<subdomain>.ngrok.app`
- Allow this host in `vite.config.js`:
```js
server: {
  allowedHosts: [
    '<subdomain>.ngrok.app',
    'ngrok.app',
    'ngrok-free.dev'
  ],
  proxy: { '/api': { target: 'http://localhost:3000', changeOrigin: true } }
}
```
- Restart the dev server after editing `vite.config.js`

### Option B: Cloudflare Tunnel
```bash
cloudflared tunnel --url http://localhost:5173
```
- Copy the `https://*.trycloudflare.com` URL
- Add that hostname to `server.allowedHosts` similarly, then restart

## 5) Open from any device
- Use the tunnel URL on your phone/laptop from any network
- Example: `https://<subdomain>.ngrok.app`

## 6) Troubleshooting
- “Blocked request. This host is not allowed.”
  - Add the current tunnel hostname to `server.allowedHosts` in `vite.config.js` and restart
- “Failed to fetch news”
  - Ensure the Node API is running (`node server.js`)
  - Verify `.env` contains `NEWS_API_KEY` and it’s valid
  - Confirm the client uses `/api/news` (not calls NewsAPI directly)
- Tunnel disconnects
  - Keep the terminal open; free tiers can rotate URLs or have session limits

## 7) Optional: Production preview via tunnel
```bash
npm run build
npm run preview -- --host
# ngrok or cloudflared can point to 4173
ngrok http 4173
```
- Share `https://<subdomain>.ngrok.app` (or `trycloudflare.com`) for the preview server

## 8) Deploy (best for stable access)
### Netlify
```bash
npm i -g netlify-cli
netlify env:set NEWS_API_KEY YOUR_NEWSAPI_KEY
netlify deploy --build --prod
```
- Netlify provides a public URL; use server-side calls (or functions) to keep the key private

### Vercel
```bash
npm i -g vercel
vercel
vercel env add NEWS_API_KEY production
```
- Vercel outputs a public URL; ensure server-side API usage to avoid exposing the key

## Notes
- Adding tunnel hostnames to `allowedHosts` is required due to dev server host checks
- For security, prefer using the server (`server.js`) to call NewsAPI; avoid embedding keys client-side