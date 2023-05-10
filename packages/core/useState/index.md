---
category: Utilities
---

# useState

Implementation of useState in React

## Usage

```js
import { useState } from '@kriszu/hooks'

const [name, setName] = useState('react')
console.log(name.value) // react
setName('vue')
console.log(name.value) // vue
```
