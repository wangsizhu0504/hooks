import fs from 'fs-extra'
import { functions } from '../packages/meta'

async function buildRedirects() {
  const redirects = functions
    .filter(f => f.docs && !f.internal)
    .flatMap(f => ([f.name]).map(n => `/${n}\t${f.docs}\t302`))
    .join('\n')

  await fs.writeFile('packages/.vitepress/dist/_redirects', redirects, 'utf-8')
}

buildRedirects()
