import type { ComponentPublicInstance } from 'vue-demi'
import { unref } from 'vue-demi'
import type { MaybeRef, MaybeRefOrGetter } from '../types'

export type VueInstance = ComponentPublicInstance
export type MaybeElementRef<T extends MaybeElement = MaybeElement> = MaybeRef<T>
export type MaybeComputedElementRef<T extends MaybeElement = MaybeElement> = MaybeRefOrGetter<T>
export type MaybeElement = HTMLElement | SVGElement | VueInstance | undefined | null

export type UnRefElementReturn<T extends MaybeElement = MaybeElement> = T extends VueInstance ? Exclude<MaybeElement, VueInstance> : T | undefined

/**
 * Get the dom element of a ref of element or Vue component instance
 *
 * @param elRef
 */
export function unrefElement<T extends MaybeElement>(elRef: MaybeComputedElementRef<T>): UnRefElementReturn<T> {
  const plain = unref(elRef)
  return (plain as VueInstance)?.$el ?? plain
}
