# Cartographie motion

Source visuelle vérifiée : `V2.1 — Motion Foundations` dans le fichier Figma `Mon Portfolio`.

| Section       | Effet principal                                                                                                                 | Mobile / Reduced Motion                                                             |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Hero          | Navigation et contenu en cascade, portrait en translation/scale, anneau en parallaxe limité, carte avec suivi léger du pointeur | Carte stable sur mobile ; transforms supprimés en mode réduit                       |
| Introduction  | Entrées opposées du texte et du carrousel                                                                                       | Révélation verticale naturelle                                                      |
| Profils       | Apparition successive des trois cartes                                                                                          | Même ordre, sans hover requis                                                       |
| Services      | Déclaration JavaScript saisie, toggle lié au scroll, propagation du glow et spotlight local                                     | Aucun suivi du pointeur ; activation au scroll ; état final immédiat en mode réduit |
| Solutions     | Déclaration saisie, cartes en cascade et halo violet/bleu                                                                       | Cartes verticales, clip-path réduit                                                 |
| Love Building | Décalage du texte et du visuel, halo respirant, BUILD flottant, accent chromé en parallaxe léger                                | Mouvement réduit puis supprimé selon la préférence système                          |
| Projets       | Titre saisi, révélation masquée des images, élévation et tilt faible                                                            | Tilt supprimé et cartes verticales                                                  |
| Méthode       | Ligne remplie selon le scroll et états inactive/active/complete                                                                 | Progression verticale sans scène sticky                                             |
| Pricing       | Cartes en cascade et profondeur légère au hover                                                                                 | Entrée verticale uniquement                                                         |
| Contact       | Deux colonnes révélées séparément et focus lumineux des champs                                                                  | Même structure et transitions courtes                                               |
| FAQ           | Hauteur et opacité animées, rotation de l’icône                                                                                 | Fonctionnelle sans transition en mode réduit                                        |
| CTA final     | Entrée du contenu, NEXT révélé, halo lent et objet 3D en parallaxe limité                                                       | Parallaxe supprimé en mode réduit                                                   |
| Footer        | Apparition douce et déplacement court des liens                                                                                 | Contenu directement visible en mode réduit                                          |

Les mouvements utilisent Motion for React, `IntersectionObserver` et des transitions CSS basées sur `transform` et `opacity`. Aucun WebGL, GSAP ou écouteur direct de scroll n’a été ajouté.

## Cycle de visibilité

Les reveals et les groupes de cartes sont rejouables. L’entrée est validée autour de 20 à 30 % de visibilité ; la sortie ne réinitialise l’état qu’après la disparition réelle de la zone observée et un délai de 160 à 180 ms. Le typing suit le même principe. Le toggle, la propagation lumineuse, la méthode et les parallaxes restent liés à un progrès de scroll réversible de 0 à 1.
