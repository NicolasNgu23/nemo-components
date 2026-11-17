export const registryUrl = 'https://nemo-components.vercel.app/r'

export const catalogue = {
  title: 'Nemo Components',
  intro:
    'Les composants animés repérés sur les plus beaux sites, refaits par Nemo Studio et installables en une ligne dans un projet React et Tailwind.',
  installHint: 'Dans un projet déjà configuré avec shadcn',
  copyLabel: 'Copier la commande',
  copiedLabel: 'Copié',
  inspiredBy: 'Inspiré de',
  measuredValues: 'Valeurs mesurées',
  backLabel: 'Tous les composants',
  notFound: 'Ce composant n’existe pas (encore).',
  footer: 'Une boutique de Nemo Studio. Les effets sont refaits, aucun code des sites d’origine n’est copié.',
}

export type CatalogueItem = {
  name: string
  title: string
  description: string
  tags: string[]
  origin: { label: string; url: string }
  values: string[]
}

export const items: CatalogueItem[] = [
  {
    name: 'stacked-cards',
    title: 'Cartes empilées',
    description:
      'Des étapes en cartes qui se collent les unes sur les autres pendant le défilement. Celle du dessous rétrécit d’un cran, une barre de tirets montre l’étape.',
    tags: ['Défilement', 'Cartes', 'Sticky'],
    origin: { label: 'mowa.studio, « So arbeiten wir »', url: 'https://mowa.studio/leistungen' },
    values: [
      'Chaque carte se colle 1,25 rem plus bas que la précédente, à partir de 6 rem.',
      'La carte recouverte rétrécit de 3 % par carte posée dessus, origine en haut.',
      'Numéro bleu au survol, 300 ms.',
      'Sans animation si l’appareil les désactive.',
    ],
  },
  {
    name: 'reveal-words',
    title: 'Mots qui montent',
    description:
      'Un titre dont chaque mot sort de sous sa ligne, l’un après l’autre, quand il arrive à l’écran.',
    tags: ['Texte', 'Apparition'],
    origin: { label: 'cuberto.com', url: 'https://cuberto.com/' },
    values: [
      'Chaque mot monte de 110 % de sa hauteur en 900 ms, courbe cubic-bezier(0.22, 1, 0.36, 1).',
      'Délai qui ralentit, 600 × (1 − e^(−rang / 8)) ms.',
      'Déclenché quand 30 % du titre est visible, une seule fois.',
    ],
  },
  {
    name: 'rising-wordmark',
    title: 'Nom qui se lève',
    description:
      'Un mot sur toute la largeur. Les lettres montent dans un ordre tiré au hasard à chaque passage, le point grossit ensuite, et une lettre survolée rebondit.',
    tags: ['Texte', 'Pied de page', 'Survol'],
    origin: { label: 'noth.in, pied de page', url: 'https://www.noth.in/works' },
    values: [
      'Lettres de 120 % à 0 en 1 200 ms, power4.inOut, 30 ms entre deux lettres, départ à 200 ms.',
      'Point de 0 à 1 en 600 ms avec dépassement (back.out), à 1 200 ms.',
      'Survol, échelle 0,05 puis retour en elastic.out(1, 0.8) sur 2 400 ms.',
      'Rejoué à chaque passage, nouvel ordre à chaque fois.',
    ],
  },
]
