import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// base './' keeps asset paths relative, so the build works on GitHub Pages,
// Netlify, Vercel or any sub-folder without changes.
export default defineConfig({
  base: './',
  plugins: [react()],
})
