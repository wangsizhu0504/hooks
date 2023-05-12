---
category: Animation
---

# useInterval

Wrapper for `setInterval` with controls

## Usage

```js
import { useInterval } from '@kriszu/hooks'

const { pause, resume, isActive } = useInterval(() => {
  /* your function */
}, 1000)
```
