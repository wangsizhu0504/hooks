import { isRef, unref } from 'vue-demi'
import { describe, expect, it } from 'vitest'
import { useState } from '.'

describe('useState', () => {
  it('should be defined', () => {
    expect(useState).toBeDefined()
  })

  it('default result with initialValue', () => {
    const result = useState(1)
    const [state, setState] = result

    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(2)

    expect(typeof setState).toBe('function')
    expect(isRef(state)).toBe(true)
    expect(unref(state)).toBe(1)
  })

  it('change vue', () => {
    const result = useState(1)
    const [state, setState] = result

    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(2)

    expect(typeof setState).toBe('function')
    expect(isRef(state)).toBe(true)

    expect(unref(state)).toBe(1)

    setState(2)

    expect(unref(state)).toBe(2)
  })

  it('should receive function', () => {
    const result = useState(() => 'react')
    const [type, setType] = result
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(2)

    expect(typeof setType).toBe('function')
    expect(isRef(type)).toBe(true)

    expect(unref(type)).toBe('react')

    setType('vue')

    expect(unref(type)).toBe('vue')
  })
})
