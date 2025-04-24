import { dirname, resolve } from 'node:path'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    nodePolyfills(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.js'),
      name: 'tsconsole',
      // the proper extensions will be added
      fileName: 'tsconsole',
    },
  },
})