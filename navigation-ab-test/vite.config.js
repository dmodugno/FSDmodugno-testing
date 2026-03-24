import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    {
      name: 'copy-nojekyll',
      closeBundle() {
        copyFileSync('.nojekyll', 'dist/.nojekyll')
      }
    }
  ],
  base: mode === 'production' ? '/FSDmodugno-testing/navigation-ab-test/' : '/',
  build: {
    outDir: 'dist'
  }
}))
