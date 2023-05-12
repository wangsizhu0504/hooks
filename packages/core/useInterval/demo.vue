<script setup lang="ts">
import { ref } from 'vue'
import { useInterval } from '@kriszu/hooks'
import { rand } from '../utils'

const greetings = ['Hello', 'Hi', 'Yo!', 'Hey', 'Hola', 'Bonjour', 'Salut!', '你好', 'Привет']
const word = ref('Hello')
const interval = ref(500)

const { pause, resume, isActive } = useInterval(() => {
  word.value = greetings[rand(0, greetings.length - 1)]
}, interval)
</script>

<template>
  <p>{{ word }}</p>
  <p>
    interval:
    <input v-model="interval" type="number" placeholder="interval" />
  </p>
  <button v-if="isActive" class="orange" @click="pause">
    Pause
  </button>
  <button v-if="!isActive" @click="resume">
    Resume
  </button>
</template>
