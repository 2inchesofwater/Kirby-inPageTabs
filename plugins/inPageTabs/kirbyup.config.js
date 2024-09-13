
import { defineConfig } from 'kirbyup/config'

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