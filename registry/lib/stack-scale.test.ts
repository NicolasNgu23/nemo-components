import { describe, expect, test } from 'vitest'

import { stackScale } from '@/lib/stack-scale'

describe('stackScale', () => {
  test('la dernière carte, que rien ne recouvre, garde sa taille', () => {
    const noLaterCards: number[] = []

    expect(stackScale(noLaterCards, 300)).toBe(1)
  })

  test('une carte encore loin de la suivante garde sa taille', () => {
    const nextCardOneHeightAway = [300]

    expect(stackScale(nextCardOneHeightAway, 300)).toBe(1)
  })

  test('une carte recouverte par la suivante rétrécit d’un cran', () => {
    const nextCardStuck = [0]

    expect(stackScale(nextCardStuck, 300)).toBeCloseTo(0.97)
  })

  test('une carte recouverte par deux cartes rétrécit de deux crans', () => {
    const twoLaterCardsStuck = [0, 0]

    expect(stackScale(twoLaterCardsStuck, 300)).toBeCloseTo(0.94)
  })

  test('la suivante à mi-chemin fait rétrécir la carte de moitié d’un cran', () => {
    const nextCardHalfway = [150]

    expect(stackScale(nextCardHalfway, 300)).toBeCloseTo(0.985)
  })
})
