# Run on a Different Wi‑Fi Device

These steps let you run the agent locally and open it from another device on the same network (phone, tablet, another laptop).

## 1) Install dependencies
```bash
cd news-summarizer
npm install
```

## 2) Set your NewsAPI key
- Create a `.env` file in the project root:
```bash
echo "VITE_NEWS_API_KEY=YOUR_NEWSAPI_KEY" > .env
```
- Replace `YOUR_NEWSAPI_KEY` with your actual key.
- Example (do NOT commit secrets):
```bash
VITE_NEWS_API_KEY=992f2ee0286644d5ae992bef0ef6a474
```

## 3) Start the dev server accessible on LAN
```bash
npm run dev:host
```
- This binds the server to your machine’s IP, e.g. `http://192.168.1.23:5173/`.

## 4) Find your machine’s LAN IP
- macOS:
```bash
ipconfig getifaddr en0
```
  - If `en0` returns nothing, try `en1`.

## 5) Open from another device
- Ensure both devices are on the same Wi‑Fi.
- On the second device, open a browser and visit:
```
http://<YOUR_IP>:5173/
```
  - Replace `<YOUR_IP>` with the IP from step 4.

## 6) Common issues
- Firewall blocks: allow Node/Vite to accept incoming connections.
- VPNs: disconnect or ensure LAN traffic is allowed.
- Different networks: both devices must share the same subnet.

## Production build (optional)
```bash
npm run build
npm run preview -- --host
```
- Then open `http://<YOUR_IP>:4173/` from another device.