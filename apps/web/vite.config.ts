/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import viteTsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  cacheDir: '../../node_modules/.vite/web',

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

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '../../',
  //    }),
  //  ],
  // },

  test: {
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
})
