import { describe, expect, test } from 'vitest'

import { shuffledOrder } from '@/lib/shuffled-order'

describe('shuffledOrder', () => {
  test('donne à chaque lettre un rang différent, de 0 au nombre de lettres', () => {
    const letterCount = 12

    const ranks = shuffledOrder(letterCount, Math.random)

    expect([...ranks].sort((a, b) => a - b)).toEqual([...Array(letterCount).keys()])
  })

  test('mélange les rangs selon le tirage reçu', () => {
    const alwaysFirst = () => 0

    expect(shuffledOrder(3, alwaysFirst)).toEqual([1, 2, 0])
  })
})
