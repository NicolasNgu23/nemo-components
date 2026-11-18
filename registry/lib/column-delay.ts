const stepMs = 100

export function columnDelay(index: number, columns: number) {
  return (index % columns) * stepMs
}
