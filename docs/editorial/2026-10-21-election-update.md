# Actualisation du 21 octobre 2026

## Sondages

- 56 études et 210 scénarios de premier tour ; 51 sondages de second tour pour six duels suivis.
- Dernier terrain : Ifop-Fiducial, du 17 octobre à partir de 20 h au 19 octobre 2026.
- Rapport primaire : https://www.ifopgroup.com/wp-content/uploads/2026/10/122853-barometre-de-lelection-presidentielle-vague-7-resultats-densemble.pdf
- Échantillon pertinent : 1 928 inscrits, extraits de 2 081 adultes. Les dates et les premières configurations ont été recoupées avec le rapport. Les scores restent ceux des configurations testées ; aucune interpolation n’est ajoutée aux données.
- Le tableau Wikipédia sert au repérage et à l’import des autres enquêtes, chaque étude conserve son lien d’origine. Les totaux légèrement différents de 100 sont conservés lorsqu’ils résultent des arrondis publiés.
- L’exclusion du doublon Harris mal daté de septembre est conservée. Le rapport Ifop officiel remplace le lien de presse pour la dernière vague, aux deux tours.
- Une copie de wikitexte peut être relue avec `node scripts/syncPolls2027.mjs --dry-run --source-file /chemin/source.wiki`. Sans `--dry-run`, la synchronisation écrit dans Firestore ; `--reset` remplace les collections importées.

## Candidatures

30 personnalités suivies. Ajout de Natacha Polony (déclarée le 14 octobre), Olivier Becht (24 septembre), Gilles Platret (8 octobre) et François Hollande (candidature envisagée, non déclarée). Les annonces et dates sont sourcées dans chaque fiche. Les statuts des profils déjà présents ont été recoupés avec le panorama de LCP actualisé le 14 octobre, complété par les sources individuelles ; ils restent inchangés lorsqu’aucune annonce nouvelle n’est établie. Les annonces de candidature ne constituent pas une validation par le Conseil constitutionnel.

Les nouveaux profils sans portrait sous licence vérifiée utilisent les initiales prévues par le site. Aucune position n’est inventée pour les faire entrer dans le quiz ; les décomptes du prérendu utilisent les profils effectivement documentés par le quiz.

## Graphique

Révélation horizontale unique de 1,6 seconde à l’entrée dans le champ, rejouable. Échelle horizontale proportionnelle aux dates réelles. Les valeurs agrégées ne changent pas avec l’animation. Le curseur permet de comparer les données au clavier et au toucher. Le mode mouvement réduit présente immédiatement les courbes et retire le bouton d’animation.

Validation : compilation TypeScript/Vite et prérendu ; ESLint ciblé ; détection Impeccable sans signalement ; lecture réelle de Firestore ; Playwright à 1440 et 390 pixels, clavier, rejeu et mouvement réduit, sans débordement ni erreur JavaScript. Le lint global comporte cinq erreurs préexistantes dans les pages de profil et les hooks d’authentification, hors de cette modification.
