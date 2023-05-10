import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@kriszu/hooks': resolve(__dirname, 'packages/core/index.ts'),
    },
    dedupe: [
      'vue',
      'vue-demi',
      '@vue/runtime-core',
    ],
  },
  define: {
    __VUE_OPTIONS_API__: 'true',
    __VUE_PROD_DEVTOOLS__: 'false',
  },
  test: {
    environment: 'jsdom',
    reporters: 'dot',
  },
  ssr: {
    noExternal: [
      /@kriszu\/.*/,
    ],
  },
})
