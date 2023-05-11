import { join, relative, resolve } from 'node:path'
import fs from 'fs-extra'
import matter from 'gray-matter'
import fg from 'fast-glob'
import Git from 'simple-git'
import type { HookFunction, HookPackage, PackageIndexes } from '../type'
import { getCategories } from './utils'
import { packages } from './packages'

export const DIR_PACKAGE = resolve(__dirname, '../meta')
export const DIR_ROOT = resolve(__dirname, '../')
export const DIR_SRC = resolve(DIR_ROOT, 'packages')
export const DIR_TYPES = resolve(DIR_ROOT, 'types/packages')

export const git = Git(DIR_ROOT)

export async function listFunctions(dir: string, ignore: string[] = []) {
  const files = await fg('*', {
    onlyDirectories: true,
    cwd: dir,
    ignore: [
      '_*',
      'dist',
      'node_modules',
      ...ignore,
    ],
  })
  files.sort()
  return files
}

export async function readMetadata() {
  const indexes: PackageIndexes = {
    packages: {},
    categories: [],
    functions: [],
  }

  for (const pkgName of packages) {
    const dir = join(DIR_SRC, pkgName)

    const functions = await listFunctions(dir)

    const pkg: HookPackage = {
      name: pkgName,
      display: pkgName,
      dir: relative(DIR_ROOT, dir).replace(/\\/g, '/'),
      docs: undefined,
    }

    indexes.packages[pkgName] = pkg

    await Promise.all(functions.map(async (fnName) => {
      const mdPath = join(dir, fnName, 'index.md')
      const tsPath = join(dir, fnName, 'index.ts')

      const fn: HookFunction = {
        name: fnName,
        package: pkg.name,
        lastUpdated: +await git.raw(['log', '-1', '--format=%at', tsPath]) * 1000,
      }

      if (fs.existsSync(join(dir, fnName, 'component.ts')))
        fn.component = true
      if (fs.existsSync(join(dir, fnName, 'directive.ts')))
        fn.directive = true

      if (!fs.existsSync(mdPath)) {
        fn.internal = true
        indexes.functions.push(fn)
        return
      }

      const mdRaw = await fs.readFile(mdPath, 'utf-8')

      const { content: md, data: frontmatter } = matter(mdRaw)
      const category = frontmatter.category

      let description = (md
        .replace(/\r\n/g, '\n')
        .match(/# \w+[\s\n]+(.+?)(?:, |\. |\n|\.\n)/m) || []
      )[1] || ''

      description = description.trim()
      description = description.charAt(0).toLowerCase() + description.slice(1)

      fn.category = category
      fn.description = description

      indexes.functions.push(fn)
    }))
  }

  indexes.functions.sort((a, b) => a.name.localeCompare(b.name))
  indexes.categories = getCategories(indexes.functions)

  return indexes
}

async function run() {
  const indexes = await readMetadata()
  await fs.writeJSON(join(DIR_PACKAGE, 'index.json'), indexes, { spaces: 2 })
}

run()
