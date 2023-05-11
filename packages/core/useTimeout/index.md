---
category: Time
---

# useTimeoutFn

Wrapper for `setTimeout` with controls.

## Usage

```js
import { useTimeout } from '@kriszu/hooks'

const { isPending, start, stop } = useTimeout(() => {
  /* ... */
}, 3000)
```
