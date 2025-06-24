import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/EXE201_client/', // GitHub Pages base path (tên repository)
  build: {
    outDir: 'dist',
    sourcemap: false, // Tắt sourcemap cho production
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router'],
          ui: ['lucide-react', 'react-hot-toast', 'react-hook-form'],
          socket: ['socket.io-client'],
        },
      },
    },
  },
  preview: {
    port: 4173,
    host: true,
  },
});
