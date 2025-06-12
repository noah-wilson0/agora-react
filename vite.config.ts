import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  define: {
    global: 'globalThis', 
  },
  plugins: [react()],
  server: {
    proxy: {
      '/boards': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});