# Cartographie Figma → React

Source : [Mon Portfolio](https://www.figma.com/design/ZSZ34vH93umjvkuW8KqjGg/Mon-Portfolio), page Accueil.
Lecture et export via Figma Console MCP / Desktop Bridge uniquement. Aucune modification de Figma.

## Frames

- Desktop : Portfolio — Art Direction V2.1 — Finalisation, 88:4708, 1280 × 13095.
- Mobile : Portfolio — Mobile — 390, 104:3792, 390 × 21209.
- Motion : V2.1 — Motion Foundations, 92:6529, 2000 × 4140.
- Tablette : Responsive Notes — Tablet, 105:4459, 900 × 1190.
- L’extraction des textes et références bitmap est conservée dans figma-extraction.json. Certains calques de texte sont masqués par un ancêtre : les composants utilisent les titres définitifs.
- Les notes détaillées de documentation n’ont pas toutes pu être relues lors du transfert, à cause de délais du bridge. Les consignes validées de la conversation ont complété les références.

## Sections

| Figma                            | Nœud    | React               |
| -------------------------------- | ------- | ------------------- |
| Hero et navigation               | 88:4710 | Header, Hero        |
| Références                       | 88:4741 | References          |
| Concevoir / Convertir / Scaler   | 88:4743 | Introduction        |
| Profils                          | 88:4757 | Profiles            |
| Services                         | 88:4764 | Services            |
| Ce que je construis concrètement | 88:4781 | Solutions, WorkCard |
| Love Building                    | 88:4794 | About               |
| Projets sélectionnés             | 88:4798 | Projects, WorkCard  |
| Méthode                          | 88:4806 | Method              |
| Offres                           | 88:4834 | Pricing             |
| Contact                          | 88:4846 | Contact             |
| FAQ                              | 88:4867 | FAQ                 |
| CTA final                        | 88:4886 | FinalCTA            |
| Footer                           | 88:4902 | Footer              |

Les fonctions de section sont regroupées dans app/components/sections/Sections.tsx.
Les données répétées et les paragraphes About sont dans app/data/portfolio.ts.
Les boutons, logos typographiques et images sont centralisés dans ui/Primitives.tsx.
Les déclarations statiques sont dans motion/MotionTitle.tsx.

## Tokens et responsive

Manrope (400–800), JetBrains Mono pour la syntaxe. Polices locales via Fontsource.

- Fond #080808, surfaces #141414 et #1B1B1B.
- Texte #F8F8F8, secondaire #A6A6A6.
- Orange #FF4D00 / #FF7A1A, violet #6C5CE7, bleu #4967FF.
- Accents de texte #A99BFF et #8DA0FF, syntaxe cyan #61D6D0.
- Crème #F2EFE8. Rayon principal 24 px.
- Largeur maximum 1280 px, marges 48 px desktop / 32 px tablette / 20 px mobile.
- Espacement de sections : 112 px desktop, 96 px tablette, 80 px mobile.
- Breakpoints : 767 / 1023 px.
- Titres principaux : 48 px desktop et 36 / 40 px mobile. Hero : 76 px et 44 / 46 px.
- Hero : crop original Figma reproduit en CSS, portrait séparé de l’anneau et du texte.
- Pricing : Landing Page en premier sur mobile ; ordre Audit / Landing / Application sur desktop.
- Les hauteurs Figma sont des références de composition ; le HTML s’agrandit avec le texte.

## Assets

23 images uniques extraites à partir des imageHash de Figma. Aucun texte, bouton, formulaire, carte ou section n’est rasterisé.
Les WebP sont des dérivés optimisés des originaux, avec alpha préservé. Dimensions source et alpha : app/assets/manifest.json.

| Index | Usage                                   |
| ----- | --------------------------------------- |
| 0     | Anneau Hero, transparent                |
| 1     | Portrait principal détouré              |
| 2     | Portrait de la carte Hero et avatar FAQ |
| 3     | Aperçu SaaS du carrousel                |
| 4     | Aperçu Landing du carrousel             |
| 5     | Aperçu Site Web et solution Plateformes |
| 6     | Capture service Landing                 |
| 7     | Logo Figma                              |
| 8     | Logo Next.js                            |
| 9     | Logo React                              |
| 10    | Logo Supabase                           |
| 11    | Capture service SaaS                    |
| 12    | Capture service Site Web                |
| 13    | Logo n8n                                |
| 14    | Capture Outils métier                   |
| 15    | Capture Dashboards                      |
| 16    | Portrait About noir et blanc            |
| 17    | Accent chromé About, transparent        |
| 18    | Content Sprint                          |
| 19    | Club Croissance Business                |
| 20    | CGTK                                    |
| 21    | Interface Méthode                       |
| 22    | Objet CTA, transparent                  |

Les flèches, coches et icônes génériques sont des SVG Lucide. Les quatre pictogrammes de la ligne de références sont représentés par un cercle générique : leur tracé spécifique reste à récupérer si nécessaire. Les marques textuelles restent en HTML.

## Motion : structure uniquement

- MotionTitle : syntaxe const, variable, opérateur, valeur, ponctuation et curseur séparés ; aucun découpage en lettres.
- Titres : services, solutions, projets, méthode. CTA conserve son grand titre éditorial.
- État final visible ; aucun effet de frappe ou séquence de scroll.
- Toggle sans texte ON/OFF, rôle switch et nom accessible.
- Glow décoratif séparé ; attributs data-motion-glow, data-motion-title, data-step-state.
- Révélation future à 60 %, 35–50 ms/caractère, une seule fois, curseur 600 ms ; réserver l’espace final.
- Glow futur : cascade 100–160 ms.
- Hero Ring : déplacement 20–30 px, rotation 3° maximum.
- About : déplacement 8 px, rotation 6° maximum.
- CTA : remontée 24 px.
- Reduced Motion : titres complets, pas de frappe/parallax, changements de contraste seulement.

## Contenus et destinations à compléter

- FAQ : première réponse anglaise conservée. Les cinq autres réponses ne sont pas présentes dans les instances fermées extraites ; leurs panneaux proposent seulement le lien existant « Me contacter ».
- Projets : chiffres repris littéralement de Figma, sans validation commerciale ajoutée. Les cartes ouvrent un aperçu accessible avec leur contenu existant.
- Blog, Guides, réseaux sociaux : URL non fournie ; boutons affichant explicitement l’indisponibilité du lien.
- Formulaire sans backend : validation HTML, message explicite qu’aucun envoi n’a eu lieu.
- Les captures de démonstration sont conservées, y compris leurs données internes.
- Le footer et les livrables des offres restent ceux de Figma.

## Vérification

Les commandes et observations finales sont consignées dans verification.md.
