import type { HookFunction } from '../type'

export function getCategories(functions: HookFunction[]): string[] {
  return uniq(
    functions
      .filter(i => !i.internal)
      .map(i => i.category)
      .filter(Boolean),
  ).sort((a, b) => a.localeCompare(b))
}
export function uniq<T extends any[]>(a: T) {
  return Array.from(new Set(a))
}
