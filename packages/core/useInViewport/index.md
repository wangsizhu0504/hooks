---
category: Brower
---

# useInViewport

Observe whether the element is in the visible area, and the visible area ratio of the element. More information refer to [Intersection Observer API](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API)。


### Usage

```ts
import { useInViewport } from '@kriszu/hooks'

const domRef = ref(null)
const [inViewport] = useInViewport(domRef)
```
