<script setup lang="ts">
import { tryOnBeforeMount, tryOnBeforeUnmount, tryOnMounted, tryOnScopeDispose, tryOnUnmounted } from '@kriszu/hooks'

tryOnBeforeMount(() => {
  console.log('tryOnBeforeMount', tryOnBeforeMount)
})
tryOnBeforeUnmount(() => {
  console.log('tryOnBeforeUnmount')
})
tryOnMounted(() => {
  console.log('tryOnMounted')
})
tryOnUnmounted(() => {
  console.log('tryOnUnmounted')
})
tryOnScopeDispose(() => {
  console.log('tryOnScopeDispose')
})
</script>

<template>
  <div />
</template>
