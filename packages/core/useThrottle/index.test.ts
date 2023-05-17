import { describe, expect, it, vi } from 'vitest'
import { promiseTimeout } from '../utils'
import { useThrottle } from '.'

describe('useThrottle', () => {
  it('should be defined', () => {
    expect(useThrottle).toBeDefined()
  })

  it('should work', async () => {
    const callback = vi.fn()
    const ms = 20
    const run = useThrottle(callback, ms)
    run()
    run()
    expect(callback).toHaveBeenCalledTimes(1)
    await promiseTimeout(ms + 10)
    run()
    expect(callback).toHaveBeenCalledTimes(2)
  })

  it('should work with trailing', async () => {
    const callback = vi.fn()
    const ms = 20
    const run = useThrottle(callback, ms, true)
    run()
    run()
    expect(callback).toHaveBeenCalledTimes(1)
    await promiseTimeout(ms + 10)
    expect(callback).toHaveBeenCalledTimes(2)
  })

  it('should work with leading', async () => {
    const callback = vi.fn()
    const ms = 20
    const run = useThrottle(callback, ms, false, false)
    run()
    run()
    expect(callback).toHaveBeenCalledTimes(1)
    await promiseTimeout(ms + 10)
    run()
    run()
    run()
    expect(callback).toHaveBeenCalledTimes(2)
    await promiseTimeout(ms + 20)
    run()
    expect(callback).toHaveBeenCalledTimes(2)
  })
})
