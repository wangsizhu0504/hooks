import type { InjectionKey, ShallowUnwrapRef } from 'vue-demi'
import { inject, provide, reactive, readonly } from 'vue-demi'

interface CreateContextOptions {
  /**
   * @description Whether the injected variable is writable or not
   * @default false
   */
  writeable?: boolean
  /**
   * @description Does the data need to be responsive
   * @default true
   */
  reactiveable?: boolean
}

function createContext<T>(
  key: InjectionKey<T> = Symbol('InjectionKey'),
  context: any,
  options: CreateContextOptions = {},
) {
  const { writeable = false, reactiveable = true } = options

  const reactiveContext = reactive(context)
  let provideData: T
  if (!reactiveable)
    provideData = context
  else
    provideData = !writeable ? readonly(reactiveContext) : reactiveContext

  provide(key, provideData)
}

function useContext<T>(key: InjectionKey<T>, native?: boolean): T
function useContext<T>(key: InjectionKey<T> = Symbol('InjectionKey'), defaultValue?: any): ShallowUnwrapRef<T> {
  return inject(key, defaultValue || {})
}

export { createContext, type CreateContextOptions, useContext }
