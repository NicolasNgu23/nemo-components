const dimmed = 0.2

export function rowOpacity(index: number, hovered: number | null) {
  return hovered === null || index === hovered ? 1 : dimmed
}

// Le trait d'indice i est celui du haut de la ligne i, donc aussi celui du bas de la ligne i - 1.
export function dividerOpacity(index: number, hovered: number | null) {
  return hovered === null || index === hovered || index === hovered + 1 ? 1 : dimmed
}
