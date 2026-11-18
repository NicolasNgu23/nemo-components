import { describe, expect, test } from 'vitest'

import { pileOffset } from '@/lib/pile-offset'

describe('pileOffset', () => {
  test('la carte du centre reste droite', () => {
    const centerCard = 1

    expect(pileOffset(centerCard)).toEqual({ x: 0, y: -18, rotate: 0 })
  })

  test('les deux cartes du bas penchent en sens contraire', () => {
    const bottomLeft = 3
    const bottomRight = 4

    const rotations = [pileOffset(bottomLeft).rotate, pileOffset(bottomRight).rotate]

    expect(rotations).toEqual([-20, 20])
  })

  test('au-delà de cinq cartes, les décalages recommencent', () => {
    const sixthCard = 5

    expect(pileOffset(sixthCard)).toEqual(pileOffset(0))
  })
})
