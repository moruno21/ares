/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import { join } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import svgr from 'vite-plugin-svgr'
import viteTsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '../../',
  //    }),
  //  ],
  // },

  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/index.ts',
      fileName: 'index',
      // Change this to the formats you want to support.
      // Don't forgot to update your package.json as well.
      formats: ['es', 'cjs'],
      name: 'ui',
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
  },

  cacheDir: '../../node_modules/.vite/ui',

  plugins: [
    dts({
      entryRoot: './',
      skipDiagnostics: true,
      tsConfigFilePath: join(__dirname, 'tsconfig.lib.json'),
    }),
    react(),
    svgr(),
    viteTsConfigPaths({
      root: '../../',
    }),
  ],
})
