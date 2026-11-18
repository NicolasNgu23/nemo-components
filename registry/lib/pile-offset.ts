// Mesuré sur une grille de 3 cartes puis 2 : chaque carte est tirée vers le centre et penchée.
const offsets = [
  { x: 101, y: 90, rotate: -9 },
  { x: 0, y: -18, rotate: 0 },
  { x: -86, y: 90, rotate: 9 },
  { x: 58, y: -126, rotate: -20 },
  { x: 11, y: -153, rotate: 20 },
] as const

export function pileOffset(index: number) {
  const offset = offsets[index % offsets.length]!
  return { x: offset.x, y: offset.y, rotate: offset.rotate }
}
