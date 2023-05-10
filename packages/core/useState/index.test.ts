import { isRef, unref } from 'vue-demi'
import { describe, expect, it } from 'vitest'
import { useState } from '.'

describe('useState', () => {
  it('should be defined', () => {
    expect(useState).toBeDefined()
  })

  it('default result with initialValue', () => {
    const result = useState(1)
    const [num, setNum] = result

    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(2)

    expect(typeof setNum).toBe('function')
    expect(isRef(num)).toBe(true)
    expect(unref(num)).toBe(1)
  })

  it('change vue', () => {
    const result = useState(1)
    const [num, setNum] = result

    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(2)

    expect(typeof setNum).toBe('function')
    expect(isRef(num)).toBe(true)

    expect(unref(num)).toBe(1)

    setNum(2)

    expect(unref(num)).toBe(2)
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
