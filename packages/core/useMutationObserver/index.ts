import { computed, watch } from 'vue-demi'
import { tryOnScopeDispose } from '../utils'
import type { MaybeElementRef } from '../unrefElement'
import { unrefElement } from '../unrefElement'
import { isClient } from '../utils/is'

export const defaultWindow = isClient ? window : undefined
export interface ConfigurableWindow {
  /*
   * Specify a custom `window` instance, e.g. working with iframes or in testing environments.
   */
  window?: Window
}
export interface UseMutationObserverOptions extends MutationObserverInit, ConfigurableWindow { }

/**
 * Watch for changes being made to the DOM tree.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver MutationObserver MDN
 * @param target
 * @param callback
 * @param options
 */
export function useMutationObserver(
  target: MaybeElementRef,
  callback: MutationCallback,
  options: UseMutationObserverOptions = {},
) {
  const { window = defaultWindow, ...mutationOptions } = options
  let observer: MutationObserver | undefined
  const isSupported = computed(() => Boolean(() => window && 'MutationObserver' in window))

  const cleanup = () => {
    if (observer) {
      observer.disconnect()
      observer = undefined
    }
  }

  const stopWatch = watch(
    () => unrefElement(target),
    (el) => {
      cleanup()

      if (isSupported.value && window && el) {
        observer = new MutationObserver(callback)
        observer!.observe(el, mutationOptions)
      }
    },
    { immediate: true },
  )

  const stop = () => {
    cleanup()
    stopWatch()
  }

  tryOnScopeDispose(stop)

  return {
    isSupported,
    stop,
  }
}

export type UseMutationObserverReturn = ReturnType<typeof useMutationObserver>
