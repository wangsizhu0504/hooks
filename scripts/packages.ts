import path from 'node:path'

import fs from 'fs-extra'
export const packages = fs
  .readdirSync(path.resolve(__dirname, '../packages'))
  .filter(p => !p.endsWith('.ts') && !p.endsWith('.json') && !p.endsWith('.md') && !p.startsWith('.'))

