import type { PackageIndexes } from './types'

// @ts-expect-error
import _metadata, { categories as _categories, functions as _functions, packages as _packages } from './index.json'

const categoriesOrder = [
  'State',
  'Elements',
  'Browser',
  'Time',
  'Utilities',
]

export const metadata = _metadata as PackageIndexes
export const functions = _functions as PackageIndexes['functions']
export const packages = _packages as PackageIndexes['packages']
export const categories = _categories as PackageIndexes['categories']

export const functionNames = functions.map(f => f.name)

export const categoryNames = Array.from(categories)
  .sort((a, b) => categoriesOrder.indexOf(a) - categoriesOrder.indexOf(b))

export function getFunction(name: string) {
  return metadata.functions.find(f => f.name === name)
}
