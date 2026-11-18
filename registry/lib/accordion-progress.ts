const START = 0.7
const END = 0.42
const CONTENT_START = 0.4

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1)
const easeOutQuad = (t: number) => 1 - (1 - t) ** 2

// Mesuré sur cuberto.com : l'élément s'ouvre entre le moment où son haut atteint 70 % de l'écran et celui où il
// atteint 42 %, en ligne droite avec le défilement.
export function accordionProgress(top: number, viewportHeight: number): number {
  return clamp01((START * viewportHeight - top) / ((START - END) * viewportHeight))
}

export function accordionStyle(progress: number) {
  const colorMix = easeOutQuad(progress)
  return {
    open: progress,
    colorMix,
    numberOpacity: 0.2 + 0.3 * colorMix,
    imageOpacity: progress,
    contentOpacity: easeOutQuad(clamp01((progress - CONTENT_START) / (1 - CONTENT_START))),
  }
}
