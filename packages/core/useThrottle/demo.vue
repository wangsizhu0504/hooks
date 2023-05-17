<script setup lang="ts">
import { ref } from 'vue'
import { useThrottle } from '@kriszu/hooks'

const updated = ref(0)
const clicked = ref(0)
const throttledFn = useThrottle(() => {
  updated.value += 1
}, 1000)

function clickedFn() {
  clicked.value += 1
  throttledFn()
}
</script>

<template>
  <div>
    <button @click="clickedFn">
      Smash me!
    </button>
    <note>Delay is set to 1000ms for this demo.</note>

    <p>Button clicked: {{ clicked }}</p>
    <p>Event handler called: {{ updated }}</p>
  </div>
</template>
