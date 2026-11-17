const longestDelayMs = 600
const pace = 8

export function revealDelay(index: number) {
  return Math.round(longestDelayMs * (1 - Math.exp(-index / pace)))
}
