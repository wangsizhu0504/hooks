# Export size

version: 0.0.11<br>
date: 2023-05-18T01:16:55.719Z

> Please note this is bundle size for each individual APIs (excluding Vue). Since we have a lot shared utilities underneath each function, importing two different functions does NOT necessarily mean the bundle size will be the sum of them (usually smaller). Depends on the bundler and minifier you use, the final result might vary, this list is for reference only.

<kbd>@kriszu/hooks</kbd>

| Function             | min+gzipped |
| -------------------- | ----------- |
| `useUrlParams`       | 1.55 kB     |
| `useClipboard`       | 936 B       |
| `useInViewport`      | 756 B       |
| `watchPausable`      | 665 B       |
| `useEventListener`   | 427 B       |
| `useThrottle`        | 378 B       |
| `watchWithFilter`    | 371 B       |
| `useDebounce`        | 354 B       |
| `useRaf`             | 329 B       |
| `useScrollTo`        | 306 B       |
| `useTimeout`         | 275 B       |
| `resolveRef`         | 169 B       |
| `toRef`              | 159 B       |
| `createContext`      | 147 B       |
| `tryOnBeforeMount`   | 114 B       |
| `tryOnMounted`       | 109 B       |
| `useState`           | 107 B       |
| `unrefElement`       | 105 B       |
| `tryOnScopeDispose`  | 103 B       |
| `useContext`         | 98 B        |
| `tryOnBeforeUnmount` | 93 B        |
| `tryOnUnmounted`     | 85 B        |

