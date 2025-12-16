import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync } from 'fs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-404',
      closeBundle() {
        copyFileSync('404.html', 'dist/404.html');
      }
    }
  ],
  base: '/FSDmodugno-testing/',
  publicDir: 'assets',
  build: {
    outDir: 'dist'
  }
});
