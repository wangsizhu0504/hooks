<script setup lang="ts">
import { ref } from 'vue-demi'
import { createPageContext } from '../usePageContext'

const count = ref(1)
const increment = async () => {
  count.value++
}
createPageContext({
  count,
  increment,
})
