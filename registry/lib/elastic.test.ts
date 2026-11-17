import { describe, expect, test } from 'vitest'

import { elasticOut, toLinearEasing } from '@/lib/elastic'

describe('elasticOut', () => {
  test('part de 0 et arrive à 1', () => {
    const start = 0
    const end = 1

    expect(elasticOut(start)).toBeCloseTo(0, 5)
    expect(elasticOut(end)).toBeCloseTo(1, 2)
  })

  test('dépasse sa cible avant de s’y poser, comme un ressort', () => {
    const samples = Array.from({ length: 101 }, (_, index) => elasticOut(index / 100))

    expect(Math.max(...samples)).toBeGreaterThan(1)
  })
})

describe('toLinearEasing', () => {
  test('écrit une courbe CSS linear() avec autant de points que demandé', () => {
    const halfway = (t: number) => t / 2

    expect(toLinearEasing(halfway, 2)).toBe('linear(0, 0.25, 0.5)')
  })
})
