<script setup lang="ts">
import { ref } from 'vue'
import { useRaf } from '@kriszu/hooks'

const count = ref(0)
const { pause, resume } = useRaf(() => count.value += 1)
</script>

<template>
  <div>Count: {{ count }}</div>
  <button @click="pause">
    pause
  </button>
  <button @click="resume">
    resume
  </button>
</template>
