---
category: Component
---

# useScrollTo

Scroll to an element

## Usage

```js
import { useScrollTo } from '@kriszu/hooks'

const [start] = useScrollTo({
  el: '.waa',
  to: 'body',
  duration: 1000,
})
start()
```
