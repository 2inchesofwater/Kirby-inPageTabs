import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { defineConfig } from 'kirbyup/config'

const currentDir = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  alias: {
    // Custom aliases
  },
  vite: {
    // Custom Vite options to be merged with the default config
      root: 'src',
      build: {
        outDir: '../build',
        emptyOutDir: true, // also necessary
      }
  }
})
