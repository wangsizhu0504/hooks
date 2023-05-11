---
category: state
---

# useContext

Component passing using inject

## Usage

In Provider Component

```ts
// usePageContext.ts
import type { ComputedRef, InjectionKey } from 'vue'
import { createContext, useContext } from '.'

export interface PageContextProps {
  count: ComputedRef<number>
  increment: (count: number) => Promise<void>
}

const key: InjectionKey<PageContextProps> = Symbol('PageContextInjectionKey')

export function createPageContext(context: PageContextProps) {
  return createContext<PageContextProps>(key, context)
}

export function usePageContext() {
  return useContext<PageContextProps>(key)
}
```

```vue
<!-- RootComponent.vue -->
<script setup lang="ts">
import { createPageContext } from './usePageContext'

const count = ref(1)
const increment = async () => {
  count.value++
}
createPageContext({
  count,
  increment,
})
</script>

<template>
  <div>
    <slot />
  </div>
</template>
```

```vue
<!-- CountComponent.vue -->
<script setup lang="ts">
import { usePageContext } from './usePageContext'

const { count } = usePageContext()
</script>

<template>
  <ul>
    <li>
      count: {{ count }}
    </li>
  </ul>
</template>
```

```vue
<!-- ButtonComponent.vue -->
<script setup lang="ts">
import { usePageContext } from './usePageContext'

const { increment } = usePageContext()!
</script>

<template>
  <button @click="increment">
    +
  </button>
</template>
```
