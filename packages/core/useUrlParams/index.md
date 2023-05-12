---
category: Browser
---

# useUrlParams

Reactive [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)

## Usage

```js
import { useUrlParams } from '@kriszu/hooks'

const params = useUrlParams('history')

console.log(params.foo) // 'bar'

params.foo = 'bar'
params.name = 'awesome'
// url updated to `?foo=bar&name=awesome`
```

### Hash Mode

When using with hash mode route, specify the `mode` to `hash`

```js
import { useUrlParams } from '@kriszu/hooks'

const params = useUrlParams('hash')

params.foo = 'bar'
params.name = 'awesome'
// url updated to `#/your/route?foo=bar&name=awesome`
```

### Hash Params

When using with history mode route, but want to use hash as params, specify the `mode` to `hash-params`

```js
import { useUrlParams } from '@kriszu/hooks'

const params = useUrlParams('hash-params')

params.foo = 'bar'
params.name = 'awesome'
// url updated to `/your/route#foo=bar&name=awesome`
```
