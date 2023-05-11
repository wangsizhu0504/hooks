import type { InjectionKey, Ref } from 'vue'
import { createContext, useContext } from '.'

export interface PageContextProps {
  count: Ref<number>
  increment: () => Promise<void>
}

const key: InjectionKey<PageContextProps> = Symbol('PageContextInjectionKey')

export function createPageContext(context: PageContextProps) {
  return createContext<PageContextProps>(key, context)
}

export function usePageContext() {
  return useContext<PageContextProps>(key)
}
