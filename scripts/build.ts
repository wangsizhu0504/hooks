import assert from 'node:assert'
import { execSync as exec } from 'node:child_process'
import { consola } from 'consola'

const watch = process.argv.includes('--watch')

assert(process.cwd() !== __dirname)

async function build() {
  consola.info('Clean up')
  exec('pnpm run clean', { stdio: 'inherit' })

  consola.info('Rollup')
  exec(`pnpm run build:rollup${watch ? ' -- --watch' : ''}`, { stdio: 'inherit' })

  consola.info('Fix types')
  exec('pnpm run types:fix', { stdio: 'inherit' })
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
