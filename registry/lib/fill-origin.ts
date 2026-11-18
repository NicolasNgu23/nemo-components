type Point = { x: number; y: number }
type Box = { left: number; top: number; width: number; height: number }

const clamp = (value: number, max: number) => Math.min(Math.max(value, 0), max)

// Le disque de survol part du point d'entrée (ou se rétracte vers le point de sortie) et doit couvrir toute la
// ligne, donc atteindre son coin le plus éloigné.
export function fillOrigin(pointer: Point, box: Box): Point & { radius: number } {
  const x = clamp(pointer.x - box.left, box.width)
  const y = clamp(pointer.y - box.top, box.height)
  const radius = Math.ceil(Math.hypot(Math.max(x, box.width - x), Math.max(y, box.height - y))) + 2
  return { x, y, radius }
}
