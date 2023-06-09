import { isRef } from 'vue-demi'
import type { Ref } from 'vue-demi'
import { isClient } from './'

type TargetValue<T> = T | undefined | null

type TargetType = HTMLElement | Element | Window | Document

export type BasicTarget<T extends TargetType = Element> =
  | (() => TargetValue<T>)
  | TargetValue<T>
  | Ref<TargetValue<T>>

export function getTargetElement<T extends TargetType>(target: BasicTarget<T>, defaultElement?: T) {
  if (!isClient)
    return undefined

  if (!target)
    return defaultElement

  let targetElement: TargetValue<T>
  if (typeof target === 'function')
    targetElement = target()
  else if (isRef(target))
    targetElement = target.value
  else
    targetElement = target

  return targetElement
}
