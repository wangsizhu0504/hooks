import { ref, watchEffect } from 'vue-demi'
import { toRef } from '../toRef'
import { tryOnScopeDispose } from '../utils'
import type { MaybeRefOrGetter } from '../types'
import type { ConfigurableWindow } from '../_configurable'
import { defaultWindow } from '../_configurable'

/**
 * Reactive Media Query.
 *
 * @param query
 * @param options
 */
export function useMediaQuery(query: MaybeRefOrGetter<string>, options: ConfigurableWindow = {}) {
  const { window = defaultWindow } = options
  const isSupported = window && 'matchMedia' in window && typeof window.matchMedia === 'function'

  let mediaQuery: MediaQueryList | undefined
  const matches = ref(false)

  const cleanup = () => {
    if (!mediaQuery)
      return
    if ('removeEventListener' in mediaQuery)
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      mediaQuery.removeEventListener('change', update)
    else
      // @ts-expect-error deprecated API
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      mediaQuery.removeListener(update)
  }

  const update = () => {
    if (!isSupported)
      return

    cleanup()

    mediaQuery = window!.matchMedia(toRef(query).value)
    matches.value = !!mediaQuery?.matches

    if (!mediaQuery)
      return

    if ('addEventListener' in mediaQuery)
      mediaQuery.addEventListener('change', update)
    else
      // @ts-expect-error deprecated API
      mediaQuery.addListener(update)
  }
  watchEffect(update)

  tryOnScopeDispose(() => cleanup())

  return matches
}
