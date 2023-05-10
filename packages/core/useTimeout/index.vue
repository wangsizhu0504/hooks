<script setup lang="ts">
import { ref } from 'vue'
import { useTimeout } from '@kriszu/hooks'

const defaultText = 'Please wait for 3 seconds'
const text = ref(defaultText)
const { start, isPending } = useTimeout(() => {
  text.value = 'Fired!'
}, 3000)

function restart() {
  text.value = defaultText
  start()
}
</script>

<template>
  <p>{{ text }}</p>
  <button :class="{ disabled: isPending }" @click="restart()">
    Restart
  </button>
</template>
