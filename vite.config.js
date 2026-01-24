import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import eslint from 'vite-plugin-eslint'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const createAlias = dirName => path.resolve(__dirname, `src/${dirName}`)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      fastRefresh: true,
    }),
    eslint(),
    tailwindcss(),
    svgr(),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': createAlias(''), // src/
      '@components': createAlias('components'), // src/components/
      '~img': createAlias('assets/images'),
      '#types': createAlias('types'),
    },
  },
})
