import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify('https://paydeya.test-try.crazedns.ru')
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://paydeya.test-try.crazedns.ru',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})