import { readonly, ref, toValue } from 'vue-demi'
import type { AnyFn, MaybeRefOrGetter, Stoppable } from '../types'

import { isClient, tryOnScopeDispose } from '../utils'

export interface UseTimeoutOptions {
  /**
   * Start the timer immediate after calling this function
   *
   * @default true
   */
  immediate?: boolean
}

/**
 * Wrapper for `setTimeout` with controls.
 *
 * @param cb
 * @param interval
 * @param options
 */
export function useTimeout<CallbackFn extends AnyFn>(
  cb: CallbackFn,
  interval: MaybeRefOrGetter<number>,
  options: UseTimeoutOptions = {},
): Stoppable<Parameters<CallbackFn> | []> {
  const {
    immediate = true,
  } = options

  const isPending = ref(false)

  let timer: ReturnType<typeof setTimeout> | null = null

  function clear() {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  function stop() {
    isPending.value = false
    clear()
  }

  function start(...args: Parameters<CallbackFn> | []) {
    clear()
    isPending.value = true
    timer = setTimeout(() => {
      isPending.value = false
      timer = null

      cb(...args)
    }, toValue(interval))
  }

  if (immediate) {
    isPending.value = true
    if (isClient)
      start()
  }

  tryOnScopeDispose(stop)

  return {
    isPending: readonly(isPending),
    start,
    stop,
  }
}
