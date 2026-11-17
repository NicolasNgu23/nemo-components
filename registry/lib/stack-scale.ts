const STEP = 0.03

// Chaque carte qui vient se poser par-dessus fait rétrécir celle du dessous d'un cran.
export function stackScale(laterCardGaps: number[], cardHeight: number): number {
  const coverage = laterCardGaps.reduce(
    (total, gap) => total + 1 - Math.min(Math.max(gap / cardHeight, 0), 1),
    0,
  )
  return 1 - STEP * coverage
}
