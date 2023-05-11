<script setup lang="ts">
import { useNow } from '@kriszu/hooks'

const now = useNow()
</script>

<template>
  <div>Now: {{ now }}</div>
</template>
