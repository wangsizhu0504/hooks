# Export size

version: 0.0.1<br>
date: 2023-05-10T15:55:48.539Z

> Please note this is bundle size for each individual APIs (excluding Vue). Since we have a lot shared utilities underneath each function, importing two different functions does NOT necessarily mean the bundle size will be the sum of them (usually smaller). Depends on the bundler and minifier you use, the final result might vary, this list is for reference only.

<kbd>@kriszu/hooks</kbd>

| Function              | min+gzipped |
| --------------------- | ----------- |
| `useClipboard`        | 956 B       |
| `useTitle`            | 823 B       |
| `useMutationObserver` | 508 B       |
| `useEventListener`    | 449 B       |
| `useTimeout`          | 296 B       |
| `useState`            | 107 B       |
| `defaultWindow`       | 85 B        |

