import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost', // Ensure this matches your development environment
    port: 5173,        // Default Vite port, ensure it's not blocked
    open: true,        // Automatically open the browser on server start
    hmr: {
      protocol: 'ws',  // Use 'wss' if you're using HTTPS
      host: 'localhost',
      port: 5173,
    },
    proxy: {
      // Add the proxy configuration here
      '/api': {
        target: 'http://localhost:8080', // Replace with your backend API URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});