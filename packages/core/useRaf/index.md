---
category: Animation
---

# useRaf

Call function on every `requestAnimationFrame`. With controls of pausing and resuming.

## Usage

```js
import { ref } from 'vue'
import { useRaf } from '@kriszu/hooks'

const count = ref(0)

const { pause, resume } = useRaf(() => {
  count.value++
  console.log(count.value)
})
```
