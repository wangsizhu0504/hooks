# Export size

version: 0.0.5<br>
date: 2023-05-12T12:56:03.098Z

> Please note this is bundle size for each individual APIs (excluding Vue). Since we have a lot shared utilities underneath each function, importing two different functions does NOT necessarily mean the bundle size will be the sum of them (usually smaller). Depends on the bundler and minifier you use, the final result might vary, this list is for reference only.

<kbd>@kriszu/hooks</kbd>

| Function              | min+gzipped |
| --------------------- | ----------- |
| `useTimeAgo`          | 1.61 kB     |
| `useUrlParams`        | 1.56 kB     |
| `useClipboard`        | 953 B       |
| `useTitle`            | 833 B       |
| `useInViewport`       | 760 B       |
| `useNow`              | 760 B       |
| `formatTimeAgo`       | 739 B       |
| `onStartTyping`       | 695 B       |
| `watchPausable`       | 665 B       |
| `useMutationObserver` | 514 B       |
| `useEventListener`    | 449 B       |
| `watchWithFilter`     | 371 B       |
| `useInterval`         | 340 B       |
| `useRaf`              | 329 B       |
| `useTimeout`          | 296 B       |
| `resolveRef`          | 169 B       |
| `toRef`               | 159 B       |
| `createContext`       | 147 B       |
| `useState`            | 107 B       |
| `unrefElement`        | 105 B       |
| `useContext`          | 98 B        |

