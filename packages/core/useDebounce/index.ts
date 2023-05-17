import type { FunctionArgs, MaybeRefOrGetter, PromisifyFn } from '../types'
import type { DebounceFilterOptions } from '../types/filters'
import { createFilterWrapper, debounceFilter } from '../utils'

/**
 * Debounce execution of a function.
 *
 * @param  fn          A function to be executed after delay milliseconds debounced.
 * @param  ms          A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param  opts        options
 *
 * @return A new, debounce, function.
 */
export function useDebounce<T extends FunctionArgs>(
  fn: T,
  ms: MaybeRefOrGetter<number> = 200,
  options: DebounceFilterOptions = {},
): PromisifyFn<T> {
  return createFilterWrapper(
    debounceFilter(ms, options),
    fn,
  )
}
