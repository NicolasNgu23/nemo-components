---
name: ajouter-a-la-boutique
description: Ajoute un composant animé à la boutique nemo-components, à partir d'une URL, d'un enregistrement d'écran ou de code. Utilise Reanimate pour mesurer et reproduire le mouvement, puis range le composant au format du registre shadcn avec sa démo et sa fiche. À utiliser quand Nico dit « ajoute ça à la boutique », « récupère ce composant », ou envoie un site, une vidéo ou du code à reprendre.
---

# Ajouter un composant à la boutique

## 1. Reproduire le mouvement avec Reanimate

Suivre le skill `reanimate` en niveau « motion-faithful » par défaut. La source peut être une URL, une vidéo (mp4, mov, gif) ou du code collé. Si l'URL n'est pas joignable depuis la session, demander un enregistrement d'écran et avancer sur le reste en attendant.

Le clone se construit directement dans `registry/` et sa démo dans `src/demos/demos.tsx`, pour que Reanimate capture la page `/c/<nom>` du catalogue (`pnpm dev`) avec les mêmes réglages que la référence.

## 2. Ranger le composant

- `registry/components/<nom>.tsx`, le composant, en kebab-case, export nommé, props pour tout ce qui change d'un projet à l'autre (textes, couleurs via `className`).
- `registry/lib/<unite>.ts` et `<unite>.test.ts`, chaque calcul en fonction pure, test écrit avant le code, en Arrange, Act, Assert.
- `registry/hooks/` pour un hook réutilisé.
- Imports en `@/components/…`, `@/lib/…`, `@/hooks/…`, qui sont les chemins du projet qui installera le composant.
- Aucune dépendance npm nouvelle sans l'accord de Nico et une ligne dans `docs/DEPENDENCIES.md`.
- Pas de variable CSS du thème, les courbes et couleurs s'écrivent en valeurs Tailwind arbitraires pour que le composant marche partout.
- Toujours prévoir `prefers-reduced-motion`, et rien qui lise `window` pendant le rendu.

## 3. Le déclarer

- Une entrée dans `registry.json` (fichiers, `target` en `@components/`, `@lib/`, `@hooks/`, `registryDependencies` vers `https://nemo-components.vercel.app/r/<item>.json`).
- Une fiche dans `src/data/catalogue.ts` avec titre, description, étiquettes, site d'origine et valeurs mesurées par Reanimate.
- La démo dans `src/demos/demos.tsx`.

## 4. Ce qu'on ne reprend jamais

Ni le code d'un site tiers copié tel quel, ni ses textes, images, logos ou polices payantes. La boutique est publique, on refait l'effet avec nos propres contenus. Du code sous licence libre peut servir de base en gardant sa mention de licence.

## 5. Vérifier et livrer

`pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build`. Montrer à Nico la démo et le tableau de comparaison de Reanimate, puis attendre son accord avant de committer et de pousser (le push sur `main` publie la boutique).
