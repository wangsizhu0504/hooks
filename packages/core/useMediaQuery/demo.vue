<script setup lang="ts">
import { useMediaQuery } from '@kriszu/hooks'

const isLargeScreen = useMediaQuery('(min-width: 1024px)')
const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')
</script>

<template>
  <div>isLargeScreen:{{ isLargeScreen }} </div>
  <div>prefersDark:{{ prefersDark }} </div>
</template>
