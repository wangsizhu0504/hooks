<script setup lang="ts">
import { useTimeAgo } from '@kriszu/hooks'
import { computed } from 'vue'
import { functions } from '../../../meta'
import exportSizes from '../../../../packages/export-size.json'

const props = defineProps<{ fn: string }>()
const info = computed(() => functions.find(i => i.name === props.fn))
const lastUpdated = useTimeAgo(new Date(info.value?.lastUpdated || 0))
const link = computed(() => `/functions\#category=${encodeURIComponent(info.value!.category!)}`)

const exportSize = exportSizes[info.value!.name as keyof typeof exportSizes]
</script>

<template>
  <div class="grid grid-cols-[100px_auto] gap-2 text-sm mt-4 mb-8 items-start">
    <div opacity="50">
      Category
    </div>
    <div><a :href="link">{{ info?.category }}</a></div>
    <div opacity="50">
      Export Size
    </div>
    <div> {{ exportSize }}</div>
    <template v-if="info?.lastUpdated">
      <div opacity="50">
        Last Changed
      </div>
      <div>{{ lastUpdated }}</div>
    </template>
  </div>
</template>
