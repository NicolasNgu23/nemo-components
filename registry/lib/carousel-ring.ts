// Décalage signé de la carte par rapport au centre, ramené entre -count/2 et count/2 pour que le
// carrousel tourne toujours par le chemin le plus court.
export function cardOffset(index: number, position: number, count: number) {
  const raw = (((index - position) % count) + count) % count
  return raw >= count / 2 ? raw - count : raw
}

const flickVelocity = 0.5

// drag et velocity sont exprimés en cartes (et cartes par seconde) dans le sens de la position.
export function snapPosition(start: number, drag: number, velocity: number) {
  if (Math.abs(velocity) >= flickVelocity) return start + Math.sign(velocity)
  return start + Math.max(-1, Math.min(1, Math.round(drag)))
}
