---
category: Animation
---

# useRafFn

Call function on every `requestAnimationFrame`. With controls of pausing and resuming.

## Usage

```js
import { ref } from 'vue'
import { useRafFn } from '@kriszu/hooks'

const count = ref(0)

const { pause, resume } = useRafFn(() => {
  count.value++
  console.log(count.value)
})
```
