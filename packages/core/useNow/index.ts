import type { Ref } from 'vue-demi'
import { ref } from 'vue-demi'
import { useInterval } from '../useInterval'
import type { Pausable } from '../types'
import { useRaf } from '../useRaf'

export interface UseNowOptions<Controls extends boolean> {
  /**
   * Expose more controls
   *
   * @default false
   */
  controls?: Controls

  /**
   * Update interval, or use requestAnimationFrame
   *
   * @default requestAnimationFrame
   */
  interval?: 'requestAnimationFrame' | number
}

/**
 * Reactive current Date instance.
 *
 * @param options
 */
export function useNow(options?: UseNowOptions<false>): Ref<Date>
export function useNow(options: UseNowOptions<true>): { now: Ref<Date> } & Pausable
export function useNow(options: UseNowOptions<boolean> = {}) {
  const {
    controls: exposeControls = false,
    interval = 'requestAnimationFrame',
  } = options

  const now = ref(new Date())

  const update = () => now.value = new Date()

  const controls: Pausable = interval === 'requestAnimationFrame'
    ? useRaf(update, { immediate: true })
    : useInterval(update, interval, { immediate: true })

  if (exposeControls) {
    return {
      now,
      ...controls,
    }
  } else {
    return now
  }
}

export type UseNowReturn = ReturnType<typeof useNow>
