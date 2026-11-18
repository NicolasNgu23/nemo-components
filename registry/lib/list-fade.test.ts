import { describe, expect, test } from 'vitest'

import { dividerOpacity, rowOpacity } from '@/lib/list-fade'

describe('rowOpacity', () => {
  test('sans survol, toutes les lignes sont pleines', () => {
    const noHover = null

    expect(rowOpacity(3, noHover)).toBe(1)
  })

  test('la ligne survolée reste pleine, les autres s’effacent à 0,2', () => {
    const hovered = 2

    expect([rowOpacity(2, hovered), rowOpacity(0, hovered)]).toEqual([1, 0.2])
  })
})

describe('dividerOpacity', () => {
  test('les traits au-dessus et au-dessous de la ligne survolée restent pleins', () => {
    const hovered = 2
    const lineAbove = 2
    const lineBelow = 3

    expect([dividerOpacity(lineAbove, hovered), dividerOpacity(lineBelow, hovered)]).toEqual([1, 1])
  })

  test('les autres traits s’effacent pendant le survol', () => {
    const hovered = 2
    const farLine = 5

    expect(dividerOpacity(farLine, hovered)).toBe(0.2)
  })

  test('sans survol, tous les traits sont pleins', () => {
    const noHover = null

    expect(dividerOpacity(0, noHover)).toBe(1)
  })
})
