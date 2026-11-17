# Nemo Components

La boutique publique de composants animés de Nemo Studio. Chaque composant reproduit un effet repéré sur un site (mesuré avec Reanimate), et s'installe dans un projet React et Tailwind v4 avec la commande `pnpm dlx shadcn@latest add https://nemo-components.vercel.app/r/<nom>.json`.

## Structure

- `registry/`, le code installé chez les clients. `components/` (kebab-case, export nommé), `lib/` (fonctions pures et leurs tests), `hooks/`. Les imports y pointent `@/components`, `@/lib`, `@/hooks`, les chemins du projet qui installe.
- `registry.json`, la liste des composants. `pnpm registry` (ou `pnpm build`) génère `public/r/*.json`.
- `src/`, le site catalogue (React Router, une page par composant). Il s'importe en `@site/…`. Fiches dans `src/data/catalogue.ts`, démos dans `src/demos/demos.tsx`.
- `.claude/skills/reanimate` (MIT, Niaz Morshed) et `.claude/skills/ajouter-a-la-boutique`, le parcours pour ajouter un composant.

## Commandes

`pnpm dev`, `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build`, `pnpm registry`.

## Règles

- pnpm uniquement, jamais npm ni npx.
- Tests de la logique écrits avant le code, à côté du fichier, en Arrange, Act, Assert.
- Icônes `lucide-react` uniquement, `cursor-pointer` sur tout bouton.
- Commentaires seulement pour un « pourquoi » que le code ne dit pas.
- Une dépendance nouvelle attend l'accord de Nico et s'inscrit dans `docs/DEPENDENCIES.md`.
- Rien des sites d'origine copié tel quel (code, textes, images, logos, polices). La boutique est publique.
- Tout se fait sur `main`, déployée par Vercel. Chaque commit et chaque push attendent l'accord de Nico. Conventional Commits en français.
- Textes en français, sans tiret cadratin.
