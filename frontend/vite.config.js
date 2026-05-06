import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Updated server configuration to match the port the user is accessing (5174)
  server: {
    // Use the default Vite port (5173) which is typically free
    port: 5173,
    strictPort: false, // allow Vite to pick a different free port if 5173 is taken
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Laravel backend port
        changeOrigin: true,
      },
    },
  },
})
