import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import { VitePWA as PWA } from 'vite-plugin-pwa'
import UnoCSS from 'unocss/vite'
import Inspect from 'vite-plugin-inspect'
import { MarkdownTransform } from './.vitepress/plugins/markdown'

export default defineConfig(async () => {
  return {
    server: {
      hmr: {
        overlay: false,
      },
      fs: {
        allow: [
          resolve(__dirname, '..'),
        ],
      },
    },
    plugins: [
      // custom
      MarkdownTransform(),

      // plugins
      Components({
        dirs: resolve(__dirname, '.vitepress/theme/components'),
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [
          IconsResolver({
            componentPrefix: '',
          }),
        ],
        dts: './.vitepress/components.d.ts',
        transformer: 'vue3',
      }),
      Icons({
        compiler: 'vue3',
        defaultStyle: 'display: inline-block',
      }),
      PWA({
        outDir: '.vitepress/dist',
        manifest: {
          name: 'VueUse',
          short_name: 'VueUse',
          theme_color: '#ffffff',
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
      }),
      UnoCSS(),
      Inspect(),
    ],
    resolve: {
      alias: {
        '@kriszu/hooks': resolve(__dirname, '../packages/core/index.ts'),
      },
      dedupe: [
        'vue',
        'vue-demi',
        '@vue/runtime-core',
      ],
    },
    optimizeDeps: {
      exclude: [
        'vue-demi',
        '@kriszu/hooks',
      ],
      include: [
        'fuse.js',
      ],
    },
  }
})
