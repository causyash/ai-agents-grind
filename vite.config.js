import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: ['enneadic-gurglingly-karis.ngrok-free.dev'],
    hmr: { clientPort: 443 }
  }
})
