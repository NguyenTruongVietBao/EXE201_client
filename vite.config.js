import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/', // Có thể thay đổi thành '/your-app-name/' nếu deploy vào subdirectory
  build: {
    outDir: 'dist',
    sourcemap: false, // Tắt sourcemap cho production
    chunkSizeWarningLimit: 1000, // Tăng limit warning lên 1000KB
    rollupOptions: {
      output: {
        manualChunks: {
          // React core
          vendor: ['react', 'react-dom'],
          // Routing
          router: ['react-router'],
          // UI libraries
          ui: [
            'lucide-react',
            'react-hot-toast',
            'react-hook-form',
            'react-otp-input',
          ],
          // Editor
          editor: ['react-quill'],
          // Charts
          charts: ['recharts'],
          // Socket & HTTP
          socket: ['socket.io-client'],
          http: ['axios'],
          // Form & validation
          store: ['zustand'],
        },
      },
    },
  },
  preview: {
    port: 4173,
    host: true,
  },
});
