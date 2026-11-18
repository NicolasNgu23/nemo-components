import { describe, expect, test } from 'vitest'

import { columnDelay } from '@/lib/column-delay'

describe('columnDelay', () => {
  test('le premier logo de chaque ligne part tout de suite', () => {
    const columns = 4
    const firstOfSecondRow = 4

    expect(columnDelay(firstOfSecondRow, columns)).toBe(0)
  })

  test('chaque colonne attend 100 ms de plus que la précédente', () => {
    const columns = 4
    const thirdColumn = 2

    expect(columnDelay(thirdColumn, columns)).toBe(200)
  })

  test('le retard repart de zéro à la ligne suivante', () => {
    const columns = 3
    const lastOfFirstRow = 2
    const secondOfSecondRow = 4

    expect([columnDelay(lastOfFirstRow, columns), columnDelay(secondOfSecondRow, columns)]).toEqual(
      [200, 100],
    )
  })
})
