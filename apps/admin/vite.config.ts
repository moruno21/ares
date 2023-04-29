import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  cacheDir: '../../node_modules/.vite/admin',
  plugins: [react(), tsconfigPaths()],
  server: {
    host: 'localhost',
    port: 4200,
  },
})
