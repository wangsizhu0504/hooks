<script setup lang="ts">
import { usePageContext } from '../usePageContext'

const { increment } = usePageContext()!
</script>

<template>
  <button @click="increment">
    +
  </button>
</template>
