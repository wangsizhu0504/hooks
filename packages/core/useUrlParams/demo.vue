<script setup lang="ts">
import { useUrlParams } from '@kriszu/hooks'

const params = useUrlParams('history')
params.foo = 'bar'
params.vueuse = 'awesome'
</script>

<template>
  <div>
    <ul class="!m-0">
      <li v-for="key in Object.keys(params)" :key="key">
        {{ key }}={{ params[key] }}
      </li>
    </ul>
  </div>
</template>
