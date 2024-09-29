import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';
// const PORT = 5000
const TARGET_LINK = "https://comp229-groupproject-be.onrender.com"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 10000,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        //target: `http://localhost:${PORT}`,
        target: TARGET_LINK,
        changeOrigin: true,
      },
      '/auth': {
        //target: `http://localhost:${PORT}`,
        target: TARGET_LINK,
        changeOrigin: true,
      },
      '/users': {
        //target: `http://localhost:${PORT}`,
        target: TARGET_LINK,
        changeOrigin: true,
      },
    },
  },
})
