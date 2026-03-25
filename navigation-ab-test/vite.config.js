import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    {
      name: 'copy-files',
      closeBundle() {
        copyFileSync('.nojekyll', 'dist/.nojekyll')
        copyFileSync('404.html', 'dist/404.html')
      }
    }
  ],
  base: mode === 'production' ? '/FSDmodugno-testing/navigation-ab-test/' : '/',
  build: {
    outDir: 'dist'
  }
}))
