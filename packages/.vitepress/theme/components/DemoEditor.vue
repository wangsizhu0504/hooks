<script setup lang="ts">
import TypeIt from 'typeit'
import type { El } from 'typeit/dist/types'
import { onMounted, ref, watch } from 'vue'
import { useInViewport } from '@kriszu/hooks'

const domRef = ref(null)
const isMount = ref(false)
const isFirst = ref(true)
const [inViewport] = useInViewport(domRef)

const block = ref<El>()

watch([inViewport, isMount], (curr) => {
  if (curr?.[0] && curr?.[1] && isFirst.value === true) {
    isFirst.value = false
    if (block.value) {
      new TypeIt(block.value, {
        speed: 50,
        startDelay: 900,
      })
        .type(
          '<span class="label-code">&lt;script setup lang=</span>"<span class="lange-code">ts</span>"<span class="label-code">&gt</span> <br /><br /><br />',
        )
        .type(
          '&nbsp<span class="import-code">import</span><span class="symbol-code"> { </span><span class="module-code">useState</span> <span class="symbol-code">}</span> from <span class="export-code">"@kriszu/hooks"</span> <br /> <br />',
          {
            delay: 200,
          },
        )
        .type(
          '&nbsp<span class="variable-code">const</span> <span class="symbol-code">[</span><span class="variable-code">state</span> ,<span class="variable-code">setState</span><span class="symbol-code">] </span> = <span class="function-code">useState</span>("Vite")',
        )
        .type('<br /><br /><span class="function-code"> setState</span>("Vue")', {
          delay: 400,
        })
        .type('<br /><br /><br /><span class="label-code">&lt;script/&gt;</span>')
        .type(
          '<br /><br /><span class="label-code">&lt;template&gt;</span><br /><br />&nbsp<span class="label-code">&lt;div&gt; <br /><br /></span>&nbsp&nbsp&nbspstate：{{<span class="variable-code"> state </span>}} <br /><br />&nbsp<span class="label-code">&lt;/div&gt; </span><br />',
        )
        .type('<br /><span class="label-code">&lt;template/&gt;</span>')
        .type('<br /><br /><div class="oldState comment-code italic">&lt;!-- state:Vite --&gt</div>', {
          delay: 1000,
        })
        .delete('.oldState', { delay: 1500, instant: true })
        .type('<div class="comment-code italic">&lt;!-- state:Vue --&gt</div>', {
          speed: 300,
        })
        .go()
    }
  }
})

onMounted(() => {
  isMount.value = true
})
</script>

<template>
  <div id="demo-editor" ref="domRef" flex overflow-hidden justify-center>
    <div class="terminal">
      <slot />
      <div>
        <pre ref="block" class="language-vue extra-class" />
      </div>
    </div>
  </div>
</template>

<style>
.import-code {
  color: #5e9177;
}

.module-code {
  color: #fabe3b;
}

.variable-code {
  color: #b79870;
}

.function-code,
.label-code {
  color: #88a56c;
}

.export-code,
.lange-code {
  color: #c08d80;
}

.symbol-code {
  color: #70a8b3
}

.comment-code {
  color: #9d9d9d
}

.terminal {
  line-height: 16px;
  min-height: 480px;
  margin-top: 25px;
  padding: 30px;
  margin-left: 12px;
  margin-right: 12px;
  padding-left: 10px;
  border-radius: 7px;
  position: relative;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0 0 30px 1px rgba(0, 0, 0, 0.15);
  width: 888px;
  max-width: 888px;
  margin-bottom: 32px;
}

.terminal::after {
  content: '';
  position: absolute;
  top: 12px;
  left: 10px;
  width: 12px;
  height: 12px;
  background: #f95c5b;
  border-radius: 100%;
  box-shadow: 0 0 0 1px #da3d42, 22px 0 0 0 #fabe3b, 22px 0 0 1px #ecb03e, 44px 0 0 0 #38cd46,
    44px 0 0 1px #2eae32;
}

@media (max-width: 768px) {
  .terminal {
    font-size: 12px;
    margin: 12px 12px;
  }
}

@media (max-width: 370px) {
  .terminal {
    font-size: 12px;
    margin: 12px 12px;
  }
}
</style>
