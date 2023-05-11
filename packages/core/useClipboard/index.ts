import type { ComputedRef, Ref } from 'vue-demi'
import { computed, ref } from 'vue-demi'
import { useTimeout } from '../useTimeout'
import { toValue } from '../utils'
import type { MaybeRefOrGetter } from '../types'
import type { WindowEventName } from '../useEventListener'
import { useEventListener } from '../useEventListener'
import { defaultNavigator } from '../_configurable'

export interface UseClipboardOptions<Source> {
  /*
   * Specify a custom `navigator` instance, e.g. working with iframes or in testing environments.
   */
  navigator?: Navigator
  /**
   * Enabled reading for clipboard
   *
   * @default false
   */
  read?: boolean

  /**
   * Copy source
   */
  source?: Source

  /**
   * Milliseconds to reset state of `copied` ref
   *
   * @default 1500
   */
  copiedDuring?: number

  /**
   * Whether fallback to document.execCommand('copy') if clipboard is undefined.
   *
   * @default false
   */
  legacy?: boolean
}

export interface UseClipboardReturn<Optional> {
  isSupported: Ref<boolean>
  text: ComputedRef<string>
  copied: ComputedRef<boolean>
  copy: Optional extends true ? (text?: string) => Promise<void> : (text: string) => Promise<void>
}

/**
 * Reactive Clipboard API.
 *
 * @param options
 */
export function useClipboard(options?: UseClipboardOptions<undefined>): UseClipboardReturn<false>
export function useClipboard(options: UseClipboardOptions<MaybeRefOrGetter<string>>): UseClipboardReturn<true>
export function useClipboard(options: UseClipboardOptions<MaybeRefOrGetter<string> | undefined> = {}): UseClipboardReturn<boolean> {
  const {
    navigator = defaultNavigator,
    read = false,
    source,
    copiedDuring = 1500,
    legacy = false,
  } = options

  const events = ['copy', 'cut']
  const isClipboardApiSupported = computed(() => Boolean(navigator && 'clipboard' in navigator))
  const isSupported = computed(() => isClipboardApiSupported.value || legacy)
  const text = ref('')
  const copied = ref(false)
  const { start } = useTimeout(() => copied.value = false, copiedDuring)

  function updateText() {
    if (isClipboardApiSupported.value) {
      navigator!.clipboard.readText().then((value) => {
        text.value = value
      })
    } else {
      text.value = legacyRead()
    }
  }

  if (isSupported.value && read) {
    for (const event of events)
      useEventListener(event as WindowEventName, updateText)
  }

  async function copy(value = toValue(source)) {
    if (isSupported.value && value != null) {
      if (isClipboardApiSupported.value)
        await navigator!.clipboard.writeText(value)
      else
        legacyCopy(value)

      text.value = value
      copied.value = true
      start()
    }
  }

  function legacyCopy(value: string) {
    const ta = document.createElement('textarea')
    ta.value = value ?? ''
    ta.style.position = 'absolute'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    ta.remove()
  }

  function legacyRead() {
    return document?.getSelection?.()?.toString() ?? ''
  }

  return {
    isSupported,
    text: text as ComputedRef<string>,
    copied: copied as ComputedRef<boolean>,
    copy,
  }
}
