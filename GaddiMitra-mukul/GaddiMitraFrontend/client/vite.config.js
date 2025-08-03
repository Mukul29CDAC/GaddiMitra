import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../dist/public',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': resolve(process.cwd(), 'client/src'),
      '@shared': resolve(process.cwd(), 'shared'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
    fs: {
      allow: ['..'],
    },
  },
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (
        !req.url.startsWith('/api') &&
        !req.url.includes('.') &&
        req.method === 'GET'
      ) {
        req.url = '/';
      }
      next();
    });
  },
});