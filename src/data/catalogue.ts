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
  footer:
    'Une boutique de Nemo Studio. Les effets sont refaits, aucun code des sites d’origine n’est copié.',
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
  {
    name: 'service-list',
    title: 'Liste de services',
    description:
      'Une liste numérotée de services. Chaque ligne monte en apparaissant au défilement, et au survol un disque de couleur grandit depuis le point d’entrée du pointeur puis se rétracte vers son point de sortie.',
    tags: ['Survol', 'Défilement', 'Liste'],
    origin: { label: 'mowa.studio, liste « Leistungen »', url: 'https://mowa.studio/leistungen' },
    values: [
      'Disque centré sur le point d’entrée, rayon jusqu’au coin le plus éloigné, de 0 à 1 en 750 ms, cubic-bezier(0.22, 1, 0.36, 1).',
      'À la sortie, le centre passe au point de sortie et le disque s’y rétracte avec la même courbe.',
      'Titre décalé de 16 px et flèche tournée de 45° en 600 ms, même courbe. Texte et étiquettes plus lisibles en 400 ms.',
      'Apparition liée au défilement, 40 px et opacité, de l’entrée de la ligne à 60 % de cette entrée, linéaire (CSS ViewTimeline).',
      'Réglages : fillDuration pour la vitesse du disque, reveal="accordion" pour déplier chaque ligne au défilement comme l’accordéon de Cuberto.',
    ],
  },
  {
    name: 'scroll-accordion',
    title: 'Accordéon au défilement',
    description:
      'Des services en cartes qui s’ouvrent une à une au défilement. Chaque carte grandit, passe du clair au foncé et dévoile son texte au rythme de sa remontée dans l’écran.',
    tags: ['Défilement', 'Cartes', 'Accordéon'],
    origin: { label: 'cuberto.com, section des services', url: 'https://cuberto.com/' },
    values: [
      'Ouverture en ligne droite avec le défilement, du haut de la carte à 70 % de l’écran jusqu’à 42 %.',
      'Fond, couleur du texte et numéro (opacité 0,2 à 0,5) en power1.out sur la même plage.',
      'Décor qui apparaît en ligne droite, texte et bouton invisibles jusqu’à 40 % puis en power1.out.',
      'La première carte est toujours ouverte. Tout est ouvert si l’appareil désactive les animations.',
    ],
  },
  {
    name: 'logo-grid',
    title: 'Grille de logos',
    description:
      'Une section « ils nous font confiance » en grille. Le titre monte mot à mot, puis chaque ligne de logos apparaît en fondu en entrant à l’écran, de gauche à droite.',
    tags: ['Apparition', 'Logos', 'Grille'],
    origin: { label: 'cuberto.com, section des marques clientes', url: 'https://cuberto.com/' },
    values: [
      'Mots du titre qui montent de 120 % à 0 en 1,5 s, courbe expo.out, 150 ms d’écart entre deux mots.',
      'Logos en fondu de 0 à 1 en 1,9 s, courbe power1.out, dès que leur ligne entre à l’écran.',
      'Dans une ligne, 100 ms d’écart d’une colonne à la suivante.',
      'Grille de 4 colonnes, 2 sur téléphone. Tout est visible si l’appareil désactive les animations.',
    ],
  },
  {
    name: 'testimonial-pile',
    title: 'Tas de témoignages',
    description:
      'Des témoignages en cartes posées en tas, penchées et qui se chevauchent. Au survol, toutes les cartes se redressent et se rangent en grille pour se lire.',
    tags: ['Survol', 'Cartes', 'Témoignages'],
    origin: {
      label: 'cuberto.com, section « Trusted by our clients »',
      url: 'https://cuberto.com/',
    },
    values: [
      'Au repos, chaque carte est décalée vers le centre et penchée de 0 à 20 degrés, la carte du milieu reste droite et passe dessous.',
      'Au survol du tas, toutes les cartes reviennent en grille en 1 s, courbe cubic-bezier(0.25, 1, 0.5, 1), et repartent pareil.',
      'Titre qui monte mot à mot, 150 ms d’écart, expo.out en 1,5 s.',
      'Grille rangée d’office sur écran tactile et si l’appareil désactive les animations.',
    ],
  },
  {
    name: 'project-list',
    title: 'Liste de projets',
    description:
      'Les réalisations en liste, titre, client, année et numéro. Les traits s’ouvrent depuis le centre, puis les textes montent. Au survol, les autres lignes s’effacent et le visuel du projet apparaît derrière.',
    tags: ['Survol', 'Liste', 'Réalisations'],
    origin: { label: 'podium.global, vue liste des projets', url: 'https://podium.global/' },
    values: [
      'Points des traits qui apparaissent en 140 ms, puis trait qui s’étire depuis le centre et points qui s’écartent vers les bords en 580 ms, power2.inOut, 60 ms plus tard.',
      'Textes qui montent de 110 % à 0 en 460 ms, power3.out, à 580 ms.',
      'Au survol, les autres lignes et leurs traits passent à 0,2 d’opacité en 480 ms, expo.out.',
      'Visuel du projet en fondu en 580 ms et qui se pose de 1,015 à 1 en 1,05 s, expo.out.',
    ],
  },
  {
    name: 'curved-carousel',
    title: 'Carrousel courbé',
    description:
      'Un carrousel plein écran pour mettre des projets à la une. Les visuels tournent sur un cylindre vu de l’intérieur, la couleur de fond et le titre changent avec eux. Flèches, vignettes et glisser à la souris.',
    tags: ['Carrousel', '3D', 'Glisser'],
    origin: {
      label: 'apechain.com, bloc « Hot games » (enregistrement d’écran)',
      url: 'https://apechain.com/',
    },
    values: [
      'Au clic, fond et titre changent tout de suite, les cartes tournent en 1,4 s, courbe expo.out (90 % du trajet en 0,45 s).',
      'Cartes sur l’intérieur d’un cylindre, 40 degrés entre deux cartes, la carte active avancée devant ses voisines, l’ensemble penché de 3 degrés.',
      'Un glisser au-delà d’une demi-carte ou un coup sec change de carte, jamais plus d’une à la fois.',
      'Version CSS 3D sans dépendance, cartes plates là où l’original les bombe en WebGL.',
    ],
  },
]
