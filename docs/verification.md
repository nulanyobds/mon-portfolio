# Vérification finale

Date : 2026-09-09

## Contrôles réussis

- npx --no-install tsc --noEmit : réussi.
- npm run lint : réussi.
- npm run test:visual : réussi.
- Serveur local : HTTP 200 sur http://127.0.0.1:4173/.
- Viewports vérifiés : 1280 px, 834 px et 390 px.
- Largeur document = largeur viewport dans les trois cas ; aucun débordement horizontal.
- Un seul h1.
- 33 images présentes, 0 image cassée.
- Menu mobile : ouverture, navigation vers Services et fermeture vérifiées.
- Toggle : bascule aria-checked vérifiée.
- FAQ : ouverture d’un panneau vérifiée.
- Formulaire : champ requis bloquant vérifié ; message explicite sans faux envoi vérifié.
- Dialogue Content Sprint : ouverture et fermeture par Escape vérifiées.
- Captures enregistrées dans docs/screenshots : desktop.png, mobile.png, tablet.png, ainsi que les aperçus de hero, Services, Solutions, About et Tarifs.

## Production

Un build React Router statique a déjà réussi avant la dernière correction de masque. Le build relancé dans le sandbox est bloqué par l’accès esbuild à un répertoire parent (Accès refusé), tandis que la vérification TypeScript directe, le lint, le serveur local et les tests navigateur passent. La commande à relancer dans un terminal autorisé reste :

    npm run build

Le résultat attendu est build/client/index.html avec pré-rendu de la route /.

