// La courbe « elastic.out(1, 0.8) » de GSAP, celle du rebond des lettres du pied de page de noth.in.
const period = 0.8
const phase = (period / (2 * Math.PI)) * Math.asin(1)

export function elasticOut(t: number) {
  return 2 ** (-10 * t) * Math.sin(((t - phase) * 2 * Math.PI) / period) + 1
}

export function toLinearEasing(curve: (t: number) => number, steps: number) {
  const points = Array.from({ length: steps + 1 }, (_, index) =>
    Number(curve(index / steps).toFixed(4)),
  )
  return `linear(${points.join(', ')})`
}
