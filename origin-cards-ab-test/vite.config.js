import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync } from 'fs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-files',
      closeBundle() {
        copyFileSync('404.html', 'dist/404.html');
        copyFileSync('.nojekyll', 'dist/.nojekyll');
      }
    }
  ],
  base: '/FSDmodugno-testing/',
  publicDir: 'assets',
  build: {
    outDir: 'dist'
  }
});
