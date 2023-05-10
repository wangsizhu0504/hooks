import fs from 'node:fs'
import path from 'node:path'
import type { Options as ESBuildOptions } from 'rollup-plugin-esbuild'
import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'
import json from '@rollup/plugin-json'
import { PluginPure as pure } from 'rollup-plugin-pure'
import type { OutputOptions, Plugin, RollupOptions } from 'rollup'

const VUE_DEMI_IIFE = fs.readFileSync(require.resolve('vue-demi/lib/index.iife.js'), 'utf-8')
const configs: RollupOptions[] = []
const packages = fs
  .readdirSync(path.resolve(__dirname, '../packages'))
  .filter(p => !p.endsWith('.ts') && !p.startsWith('.'))

const injectVueDemi: Plugin = {
  name: 'inject-vue-demi',
  renderChunk(code) {
    return `${VUE_DEMI_IIFE};\n;${code}`
  },
}

const pluginEsbuild = esbuild()
const pluginDts = dts()
const pluginPure = pure({
  functions: ['defineComponent'],
})

const external = [
  'vue-demi',
]

function esbuildMinifer(options: ESBuildOptions) {
  const { renderChunk } = esbuild(options)

  return {
    name: 'esbuild-minifer',
    renderChunk,
  }
}

for (const pkgName of packages) {
  const iifeGlobals = {
    'vue-demi': 'VueDemi',
  }
  const input = `packages/${pkgName}/index.ts`

  const output: OutputOptions[] = [
    {
      file: `packages/${pkgName}/dist/index.cjs`,
      format: 'cjs',
    },
    {
      file: `packages/${pkgName}/dist/index.mjs`,
      format: 'es',
    },
    {
      file: `packages/${pkgName}/dist/index.iife.js`,
      format: 'iife',
      extend: true,
      globals: iifeGlobals,
      plugins: [
        injectVueDemi,
      ],
    },
    {
      file: `packages/${pkgName}/dist/index.iife.min.js`,
      format: 'iife',
      extend: true,
      globals: iifeGlobals,
      plugins: [
        injectVueDemi,
        esbuildMinifer({
          minify: true,
        }),
      ],
    },
  ]
  configs.push({
    input,
    output,
    plugins: [
      pluginEsbuild,
      json(),
      pluginPure,
    ],
    external,
  })

  configs.push({
    input,
    output: {
      file: `packages/${pkgName}/dist/index.d.ts`,
      format: 'es',
    },
    plugins: [
      pluginDts,
    ],
    external,
  })
}

export default configs
