import { defineConfig } from 'vite';

export default defineConfig({
  base: '/bookstore/',
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html',
    },
  },
});
