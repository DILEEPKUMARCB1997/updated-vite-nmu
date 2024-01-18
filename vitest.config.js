import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills()
    // AutoImport({
    //   imports: ['vitest'],
    //   djs: true // generate TypeScript declaration
    // })
  ],

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/renderer/setupTests.js'
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    // css: true
  }
})
