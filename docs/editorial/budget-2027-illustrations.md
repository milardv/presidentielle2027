# Budget 2027 : provenance des visuels

Article : `/actu/budget-2027-dette-services-publics/`, daté du 21 octobre 2026.

## Couverture

Fichier : `frontend/public/actu/budget-2027-services-publics.webp`.
Générée avec l’outil intégré imagegen, puis compressée en WebP avec Pillow.
Légende publique : illustration générée par IA, non documentaire.

Prompt final :

> Use case: illustration-story. Asset type: wide editorial cover for a serious French news dossier about the 2027 national budget, public debt and public services. Primary request: create an original sophisticated newspaper illustration, clearly an illustration rather than a documentary photograph. Scene: a realistic recognizable silhouette of the French Assemblée nationale forms the backdrop to a desk covered in blank budget sheets, beside visual hints of everyday public services: a school notebook, a medical stethoscope, a small railway ticket. Subtle paper-cut and ink textures, muted navy, warm ivory and a restrained red accent, thoughtful tension without catastrophe or alarmism. Landscape 16:9 composition suitable for a large website cover and mobile crop. No people, no politicians, no text, no letters, no numbers, no logos, no invented charts. High editorial quality.

## Graphique

Fichier : `frontend/public/actu/budget-2027-croissance.webp`.
Produit avec Matplotlib par `frontend/scripts/renderBudget2027Chart.py`.

- Gouvernement : croissance annuelle du PIB réel 2027 de 1,0 %, communiqué de Bercy du 11 septembre 2026.
- OFCE : 0,5 %, prévision d’octobre 2026, sources et attribution CC BY 4.0 dans l’article.

Ce sont des prévisions conditionnelles de deux producteurs différents. Pas une série historique ni des résultats observés. Les chiffres et la distinction de statut sont également disponibles en texte dans l’article et dans le texte alternatif du graphique.
