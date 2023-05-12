import type { ComputedRef, Ref, WatchSource } from 'vue-demi'

export type Arrayable<T> = T[] | T

/**
 * Maybe it's a ref, or a plain value
 *
 * ```ts
 * type MaybeRef<T> = T | Ref<T>
 * ```
 */
export type MaybeRef<T> = T | Ref<T>

/**
 * Maybe it's a ref, or a plain value, or a getter function
 *
 * ```ts
 * type MaybeRefOrGetter<T> = (() => T) | T | Ref<T> | ComputedRef<T>
 * ```
 */
export type MaybeRefOrGetter<T> = MaybeRef<T> | (() => T)

/**
 * Maybe it's a computed ref, or a readonly value, or a getter function
 */
export type ReadonlyRefOrGetter<T> = ComputedRef<T> | (() => T)

/**
 * Void function
 */
export type Fn = () => void

/**
 * Any function
 */
export type AnyFn = (...args: any[]) => any

export interface Stoppable<StartFnArgs extends any[] = any[]> {
  /**
   * A ref indicate whether a stoppable instance is executing
   */
  isPending: Readonly<Ref<boolean>>

  /**
   * Stop the effect from executing
   */
  stop: Fn

  /**
   * Start the effects
   */
  start: (...args: StartFnArgs) => void
}

export interface Pausable {
  /**
   * A ref indicate whether a pausable instance is active
   */
  isActive: Readonly<Ref<boolean>>

  /**
   * Temporary pause the effect from executing
   */
  pause: Fn

  /**
   * Resume the effects
   */
  resume: Fn
}

export type ArgumentsType<T> = T extends (...args: infer U) => any ? U : never

// Internal Types
export type MultiWatchSources = (WatchSource<unknown> | object)[]

export type MapSources<T> = {
  [K in keyof T]: T[K] extends WatchSource<infer V> ? V : never;
}
export type MapOldSources<T, Immediate> = {
  [K in keyof T]: T[K] extends WatchSource<infer V> ? Immediate extends true ? V | undefined : V : never;
}

export type Mutable<T> = { -readonly [P in keyof T]: T[P] }

export type FunctionArgs<Args extends any[] = any[], Return = void> = (...args: Args) => Return

export interface FunctionWrapperOptions<Args extends any[] = any[], This = any> {
  fn: FunctionArgs<Args, This>
  args: Args
  thisArg: This
}
export type EventFilter<Args extends any[] = any[], This = any, Invoke extends AnyFn = AnyFn> = (
  invoke: Invoke,
  options: FunctionWrapperOptions<Args, This>
) => ReturnType<Invoke> | Promise<ReturnType<Invoke>>

export interface ConfigurableEventFilter {
  /**
   * Filter for if events should to be received.
   *
   */
  eventFilter?: EventFilter
}
