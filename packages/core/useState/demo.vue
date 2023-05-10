<script setup lang="ts">
import { useState } from '@kriszu/hooks'

const [value, toggle] = useState(true)
</script>

<template>
  <div>
    <p>Value: {{ value }}</p>
    <button @click="toggle(true)">
      Set True
    </button>
    <button @click="toggle(false)">
      Set False
    </button>
  </div>
</template>
