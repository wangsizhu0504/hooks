import assert from 'node:assert'
import path from 'node:path'

import { execSync as exec } from 'node:child_process'
import fs from 'fs-extra'
import fg from 'fast-glob'

import { consola } from 'consola'
import { packages } from './packages'

const watch = process.argv.includes('--watch')
const rootDir = path.resolve(__dirname, '..')
assert(process.cwd() !== __dirname)
const FILES_COPY_ROOT = [
  'LICENSE',
  'README.md',
]
const FILES_COPY_LOCAL = [
  'index.json',
  '*.cjs',
  '*.mjs',
  '*.d.ts',
  'package.json',
]

async function coptFile() {
  for (const pkgName of packages) {
    const packageRoot = path.resolve(rootDir, 'packages', pkgName)
    const packageDist = path.resolve(packageRoot, 'dist')

    for (const file of FILES_COPY_ROOT)
      await fs.copyFile(path.join(rootDir, file), path.join(packageDist, file))

    const files = await fg(FILES_COPY_LOCAL, { cwd: packageRoot })
    for (const file of files)
      await fs.copyFile(path.join(packageRoot, file), path.join(packageDist, file))
  }
}
async function build() {
  consola.info('Clean up')
  exec('pnpm run clean', { stdio: 'inherit' })

  consola.info('Rollup')
  exec(`pnpm run build:rollup${watch ? ' -- --watch' : ''}`, { stdio: 'inherit' })

  consola.info('Fix types')
  exec('pnpm run types:fix', { stdio: 'inherit' })

  coptFile()
}

async function cli() {
  try {
    await build()
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

export {
  build,
}

if (require.main === module)
  cli()
