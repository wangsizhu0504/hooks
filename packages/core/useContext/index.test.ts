import { createApp, defineComponent, h, ref } from 'vue-demi'
import { describe, expect, it } from 'vitest'
import { createPageContext, usePageContext } from './usePageContext'

export function mount<V>(Comp: V) {
  const el = document.createElement('div')
  const app = createApp(Comp as any)

  const unmount = () => app.unmount()
  const comp = app.mount(el) as any
  comp.unmount = unmount
  return comp
}

const ChildComponent = defineComponent({
  setup() {
    const { count } = usePageContext()
    expect(count?.value).toBe(0)

    return () => h('div')
  },
})

const RootComponent = defineComponent({
  setup() {
    const count = ref(0)
    const increment = async () => {
      count.value++
    }
    createPageContext({ count, increment })

    return () => h(ChildComponent)
  },
})
describe('computedWithControl', () => {
  it('should work', () => {
    mount(RootComponent)
  })
})
