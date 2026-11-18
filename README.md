# Nemo Components

Composants animés pour React et Tailwind v4, refaits par [Nemo Studio](https://nemo-studio-one.vercel.app/) à partir d'effets repérés sur le web. Catalogue et démos sur https://nemo-components.vercel.app.

## Installer un composant

Dans un projet déjà configuré avec shadcn :

```bash
pnpm dlx shadcn@latest add https://nemo-components.vercel.app/r/stacked-cards.json
```

## Composants

| Nom | Effet | Inspiré de |
|---|---|---|
| `stacked-cards` | Étapes en cartes qui s'empilent au défilement | mowa.studio |
| `reveal-words` | Mots qui montent l'un après l'autre | cuberto.com |
| `rising-wordmark` | Lettres qui montent au hasard et rebondissent au survol | noth.in |
| `service-list` | Liste de services, disque de couleur qui suit le pointeur au survol | mowa.studio |
| `scroll-accordion` | Cartes de services qui s'ouvrent une à une au défilement | cuberto.com |

Les effets sont refaits, aucun code des sites d'origine n'est copié. Le skill Reanimate inclus dans `.claude/skills/` est sous licence MIT (Niaz Morshed).
