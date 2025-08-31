import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // ← ここを好きなポート番号に変更！
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },  
})
