import type { ComputedRef, Ref } from 'vue-demi'
import { toValue, watch } from 'vue-demi'
import type { MaybeRef, MaybeRefOrGetter, ReadonlyRefOrGetter } from '../types'
import { useMutationObserver } from '../useMutationObserver'
import { isClient } from '../utils'
import { toRef } from '../toRef'

const defaultDocument = isClient ? window.document : undefined

export type UseTitleOptionsBase =
  {
    /**
     * Observe `document.title` changes using MutationObserve
     * Cannot be used together with `titleTemplate` option.
     *
     * @default false
     */
    observe?: boolean
  }
  | {
    /**
     * The template string to parse the title (e.g., '%s | My Website')
     * Cannot be used together with `observe` option.
     *
     * @default '%s'
     */
    titleTemplate?: MaybeRef<string> | ((title: string) => string)
  }

export type UseTitleOptions = {
  /*
   * Specify a custom `document` instance, e.g. working with iframes or in testing environments.
   */
  document?: Document
} & UseTitleOptionsBase

export function useTitle(
  newTitle: ReadonlyRefOrGetter<string | null | undefined>,
  options?: UseTitleOptions,
): ComputedRef<string | null | undefined>

export function useTitle(
  newTitle?: MaybeRef<string | null | undefined>,
  options?: UseTitleOptions,
): Ref<string | null | undefined>

/**
 * Reactive document title.
 *
 * @param newTitle
 * @param options
 */
export function useTitle(
  newTitle: MaybeRefOrGetter<string | null | undefined> = null,
  options: UseTitleOptions = {},
) {
  /*
    `titleTemplate` that returns the modified input string will make
    the `document.title` to be different from the `title.value`,
    causing the title to update infinitely if `observe` is set to `true`.
  */
  const {
    document = defaultDocument,
  } = options

  const title: Ref<string | null | undefined> = toRef(newTitle ?? document?.title ?? null)
  const isReadonly = newTitle && typeof newTitle === 'function'

  function format(t: string) {
    if (!('titleTemplate' in options))
      return t
    const template = options.titleTemplate || '%s'
    return typeof template === 'function'
      ? template(t)
      : toValue(template).replace(/%s/g, t)
  }

  watch(
    title,
    (t, o) => {
      if (t !== o && document)
        document.title = format(typeof t === 'string' ? t : '')
    },
    { immediate: true },
  )

  if ((options as any).observe && !(options as any).titleTemplate && document && !isReadonly) {
    useMutationObserver(
      document.head?.querySelector('title'),
      () => {
        if (document && document.title !== title.value)
          title.value = format(document.title)
      },
      { childList: true },
    )
  }

  return title
}

export type UseTitleReturn = ReturnType<typeof useTitle>
