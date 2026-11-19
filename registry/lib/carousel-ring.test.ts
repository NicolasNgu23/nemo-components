import { describe, expect, test } from 'vitest'

import { cardOffset, snapPosition } from '@/lib/carousel-ring'

describe('cardOffset', () => {
  test('la carte active est au centre', () => {
    const count = 5
    const position = 2

    expect(cardOffset(2, position, count)).toBe(0)
  })

  test('les cartes se répartissent des deux côtés en boucle', () => {
    const count = 5
    const position = 0

    const offsets = [0, 1, 2, 3, 4].map((index) => cardOffset(index, position, count))

    expect(offsets).toEqual([0, 1, 2, -2, -1])
  })

  test('pendant un glisser, le décalage suit la position fractionnaire', () => {
    const count = 5
    const draggedPosition = 0.25

    expect(cardOffset(1, draggedPosition, count)).toBe(0.75)
  })

  test('la position peut dépasser le nombre de cartes sans changer la place des cartes', () => {
    const count = 5
    const afterOneFullTurn = 7

    expect(cardOffset(2, afterOneFullTurn, count)).toBe(0)
  })
})

describe('snapPosition', () => {
  test('un petit glisser lent revient à la carte de départ', () => {
    const start = 3
    const shortDrag = 0.3
    const slowVelocity = 0.1

    expect(snapPosition(start, shortDrag, slowVelocity)).toBe(3)
  })

  test('un glisser lent au-delà de la moitié passe à la carte suivante', () => {
    const start = 3
    const longDrag = 0.6
    const slowVelocity = 0.1

    expect(snapPosition(start, longDrag, slowVelocity)).toBe(4)
  })

  test('un coup sec suffit à changer de carte même sur une courte distance', () => {
    const start = 3
    const shortDrag = -0.15
    const fastVelocity = -1.2

    expect(snapPosition(start, shortDrag, fastVelocity)).toBe(2)
  })

  test('un coup sec ne saute jamais plus d’une carte', () => {
    const start = 3
    const shortDrag = 0.2
    const veryFastVelocity = 9

    expect(snapPosition(start, shortDrag, veryFastVelocity)).toBe(4)
  })
})
