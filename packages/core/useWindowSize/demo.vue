<script setup lang="ts">
import { useWindowSize } from '@kriszu/hooks'

const { width, height } = useWindowSize()
</script>

<template>
  <p>{{ width }} x {{ height }}</p>
</template>
