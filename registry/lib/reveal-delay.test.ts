import { describe, expect, test } from 'vitest'

import { revealDelay } from '@/lib/reveal-delay'

describe('revealDelay', () => {
  test('le premier mot part tout de suite', () => {
    const firstWord = 0

    expect(revealDelay(firstWord)).toBe(0)
  })

  test('les écarts entre mots se resserrent au fil de la phrase', () => {
    const delays = [0, 1, 2, 10, 11].map(revealDelay)

    const firstGap = delays[1]! - delays[0]!
    const laterGap = delays[4]! - delays[3]!

    expect(laterGap).toBeLessThan(firstGap)
  })

  test('même une longue phrase finit de démarrer avant 600 ms', () => {
    const fiftiethWord = 49

    expect(revealDelay(fiftiethWord)).toBeLessThanOrEqual(600)
  })
})
