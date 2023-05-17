---
category: Utilities
---

# tryOnBeforeMount

Safe `onBeforeMount`. Call `onBeforeMount()` if it's inside a component lifecycle, if not, just call the function

## Usage

```js
import { tryOnBeforeMount } from '@kriszu/hooks'

tryOnBeforeMount(() => {

})
```
# tryOnBeforeUnmount

Safe `onBeforeUnmount`. Call `onBeforeUnmount()` if it's inside a component lifecycle, if not, do nothing

## Usage

```js
import { tryOnBeforeUnmount } from '@kriszu/hooks'

tryOnBeforeUnmount(() => {

})
```

# tryOnMounted

Safe `onMounted`. Call `onMounted()` if it's inside a component lifecycle, if not, just call the function

## Usage

```js
import { tryOnMounted } from '@kriszu/hooks'

tryOnMounted(() => {

})
```
# tryOnScopeDispose

Safe `onScopeDispose`. Call `onScopeDispose()` if it's inside an effect scope lifecycle, if not, do nothing

## Usage

```js
import { tryOnScopeDispose } from '@kriszu/hooks'

tryOnScopeDispose(() => {

})
```

# tryOnUnmounted

Safe `onUnmounted`. Call `onUnmounted()` if it's inside a component lifecycle, if not, do nothing

## Usage

```js
import { tryOnUnmounted } from '@kriszu/hooks'

tryOnUnmounted(() => {

})
```

# tryOnUnmounted

Safe `onUnmounted`. Call `onUnmounted()` if it's inside a component lifecycle, if not, do nothing

## Usage

```js
import { tryOnUnmounted } from '@vueuse/core'

tryOnUnmounted(() => {

})
```

