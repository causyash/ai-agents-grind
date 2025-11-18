# Gen‑Z Neon Portfolio

Creative, hyper‑aesthetic personal portfolio focused on neon‑pastel gradients, glassmorphism, minimal black‑white contrasts, and bold cyber‑punk highlights. Built with React + GSAP.

## Highlights
- Hero name animates letter‑by‑letter with elastic easing
- Background shows giant colorful words with smoke‑like typewriter transitions per section
- Tagline loops through “Designer • Coder • Creator • Innovator” with a blinking caret
- GSAP ScrollTrigger for kinetic typography phases (thin → bold → italic → wide)
- Magnetic button hover with touch support on mobile
- Intro overlay: full‑screen neon typewriter sequence on first load
- Mobile optimizations: responsive sizes, reduced motion support

## Creator
- Created by Yash — Instagram: https://www.instagram.com/yash.cxe?igsh=MWd2eWo2anc0eXpsaQ%3D%3D&utm_source=

## Run (Portfolio)
- Install: `npm install`
- Dev: `npm run dev`
- Preview build: `npm run build && npm run preview -- --host`

## Run Portfolio + News Summarizer Together
- Terminal A (Portfolio):
  - `cd ~/Desktop/agents/portfolio`
  - `CHOKIDAR_USEPOLLING=1 npm run dev`
- Terminal B (News Summarizer server):
  - `cd ~/Desktop/agents/ai-agents-grind/news-summarizer`
  - `npm install`
  - `npm run serve`
- Terminal C (News Summarizer dev on 5174):
  - `cd ~/Desktop/agents/ai-agents-grind/news-summarizer`
  - `CHOKIDAR_USEPOLLING=1 npm run dev -- --port 5174`
- Open:
  - Portfolio: `http://localhost:5173`
  - Summarizer: `http://localhost:5174`

## Sharing via ngrok (optional)
- Portfolio: `ngrok http --host-header=rewrite 5173`
- Summarizer: `ngrok http --host-header=rewrite 5174`
- In `vite.config.js`, allow your ngrok host and enable HMR over HTTPS:
  - `server.host: true`
  - `server.allowedHosts: ['<your-ngrok-host>']` (or `true`)
  - `server.hmr.clientPort: 443`

## Design System
- Neon‑pastel accents: purple, teal, pink, cyber‑yellow
- Glassy cards + blurred background glow
- Gen‑Z typography: Poppins, Space Grotesk
- Smooth micro‑interactions and cinematic spacing

## Tech Stack
- React + Vite
- GSAP + ScrollTrigger + TextPlugin
- CSS keyframes for `liquidMorph`, `neonPulse`, `gradientShift`, `textSlideUp`, `hologramShine`

## Notes
- Respects `prefers-reduced-motion` for accessibility
- Touch gestures supported on interactive elements (magnetic button)
