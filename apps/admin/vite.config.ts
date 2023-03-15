/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import viteTsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  cacheDir: '../../node_modules/.vite/admin',

  plugins: [
    react(),
    viteTsConfigPaths({
      root: '../../',
    }),
  ],

  preview: {
    host: 'localhost',
    port: 4300,
  },

  server: {
    host: 'localhost',
    port: 4200,
  },
})
