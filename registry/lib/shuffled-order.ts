// Le rang d'apparition de chaque élément, tiré au hasard (mélange de Fisher-Yates).
export function shuffledOrder(count: number, random: () => number) {
  const ranks = [...Array(count).keys()]
  for (let index = count - 1; index > 0; index -= 1) {
    const other = Math.floor(random() * (index + 1))
    ;[ranks[index], ranks[other]] = [ranks[other]!, ranks[index]!]
  }
  return ranks
}
