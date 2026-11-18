import { describe, expect, test } from 'vitest'

import { fillOrigin } from '@/lib/fill-origin'

const row = { left: 40, top: 600, width: 1360, height: 190 }

describe('fillOrigin', () => {
  test('le disque part du point d’entrée, relatif à la ligne', () => {
    const pointerNearTopLeft = { x: 140, y: 605 }

    const origin = fillOrigin(pointerNearTopLeft, row)

    expect([origin.x, origin.y]).toEqual([100, 5])
  })

  test('son rayon atteint le coin le plus éloigné, avec une marge pour l’anticrénelage', () => {
    const pointerNearTopLeft = { x: 140, y: 605 }

    expect(fillOrigin(pointerNearTopLeft, row).radius).toBe(Math.ceil(Math.hypot(1260, 185)) + 2)
  })

  test('un point de sortie hors de la ligne est ramené sur son bord', () => {
    const pointerBelowRightCorner = { x: 1420, y: 830 }

    const origin = fillOrigin(pointerBelowRightCorner, row)

    expect([origin.x, origin.y]).toEqual([1360, 190])
  })
})
