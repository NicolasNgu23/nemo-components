import { describe, expect, test } from 'vitest'

import { accordionProgress, accordionStyle } from '@/lib/accordion-progress'

describe('accordionProgress', () => {
  test('vaut 0 tant que le haut de l’élément est sous 70 % de l’écran', () => {
    const topBelowStart = 700

    expect(accordionProgress(topBelowStart, 900)).toBe(0)
  })

  test('progresse en ligne droite jusqu’à 42 % de l’écran', () => {
    const topHalfwayBetween630And378 = (630 + 378) / 2

    expect(accordionProgress(topHalfwayBetween630And378, 900)).toBeCloseTo(0.5)
  })

  test('vaut 1 au-delà de 42 % de l’écran', () => {
    const topAboveEnd = 100

    expect(accordionProgress(topAboveEnd, 900)).toBe(1)
  })
})

describe('accordionStyle', () => {
  test('fond, texte et numéro avancent vite puis ralentissent (power1.out)', () => {
    const quarterProgress = 0.26

    const styleAtQuarter = accordionStyle(quarterProgress)

    expect(styleAtQuarter.colorMix).toBeCloseTo(1 - 0.74 ** 2)
  })

  test('l’image suit la progression en ligne droite', () => {
    expect(accordionStyle(0.26).imageOpacity).toBeCloseTo(0.26)
  })

  test('le texte reste caché jusqu’à 40 % de la progression', () => {
    expect(accordionStyle(0.4).contentOpacity).toBe(0)
  })

  test('puis apparaît sur les 60 % restants', () => {
    const progressPastThreshold = 0.58

    expect(accordionStyle(progressPastThreshold).contentOpacity).toBeCloseTo(1 - 0.7 ** 2)
  })

  test('le numéro passe de 0,2 à 0,5 d’opacité', () => {
    expect([accordionStyle(0).numberOpacity, accordionStyle(1).numberOpacity]).toEqual([0.2, 0.5])
  })
})
