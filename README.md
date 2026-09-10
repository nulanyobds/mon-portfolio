# BeDev Portfolio

Portfolio React fidèle aux sources Figma desktop et mobile, sans rasteriser la page.

## Développement

```sh
npm install
npm run dev
```

## Vérification et build

```sh
npm run typecheck
npm run lint
npm run build
```

La route / est pré-rendue en HTML dans build/client/index.html. Le site ne nécessite pas de serveur React en production. Aucun déploiement n’est configuré.

Stack : React, TypeScript, React Router Framework Mode, Vite, Motion, CSS Modules, Lucide. Les polices sont locales.

Contenus : app/data/portfolio.ts. Styles : app/styles/tokens.css et app/components/sections/Portfolio.module.css.

Les formulaires valident les champs mais indiquent explicitement qu’aucun envoi n’a lieu. Les animations complexes restent à développer. Les destinations non fournies restent signalées comme indisponibles.

Voir docs/figma-source-map.md pour les sources, les assets et les limites de contenu.
