<script setup lang="ts">
import { usePageContext } from '../usePageContext'

const { count } = usePageContext()
</script>

<template>
  <ul>
    <li>
      count: {{ count }}
    </li>
  </ul>
</template>
