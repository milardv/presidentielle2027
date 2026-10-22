# David Lisnard — recherche du 22 octobre 2026

La fiche est enrichie à partir de notices institutionnelles, d’entretiens personnels, de comptes rendus de campagne et de presse identifiée. Les anecdotes d’enfance sont présentées comme des souvenirs du candidat. Les propositions économiques ne sont pas présentées comme des résultats acquis.

## Repères et provenance

- Naissance à Limoges, parents footballeur et danseuse, reconversion dans le commerce, retour à Cannes et premières responsabilités : [notice LaREF](https://archive.laref.org/david-lisnard/), recoupée avec la [biographie de campagne](https://www.unenouvelleenergie.fr/david-lisnard/) et [Wikipédia](https://fr.wikipedia.org/wiki/David_Lisnard).
- Lycées Carnot et Bristol, diplôme de Sciences Po Bordeaux en 1992 : biographie de campagne et notice encyclopédique. Pas d’âge précis ajouté pour le déménagement à Cannes, faute de chronologie recoupée.
- Enfance, culture et sport : [compte rendu d’Empreintes](https://www.unenouvelleenergie.fr/david-lisnard-dans-empreintes-sur-le-figaro-je-veux-faire-gagner-la-belle-france-celle-des-gens-qui-bossent-et-qui-veulent-sen-sortir/) ; récit personnel explicitement attribué. Aucun diagnostic psychologique ni causalité politique affirmée.
- Présidence de l’AMF : [résultats officiels du 17 novembre 2021](https://www.amf.asso.fr/documents-david-lisnard-elu-la-presidence-amf/40989), 62,3 %.
- Réélection de 2026 : [Ville de Cannes](https://cannes.com/fr/index/actualites/annee-2026/mars/seance-d-installation-du-conseil-municipal-de-cannes.html), premier tour le 15 mars et installation le 21 mars. Ne pas reprendre les dates contradictoires de l’infobox Wikipédia.
- Candidature et départ de LR : [LCP, 1er avril, relatant l’intervention du 31 mars 2026 sur France 2](https://lcp.fr/actualites/je-suis-candidat-david-lisnard-quitte-lr-et-relance-le-debat-sur-une-primaire-a-droite).
- Positions d’octobre : comptes rendus du Crayon, BFMTV et BFMTV–RMC référencés dans `lisnardResearchSources`. La réduction de dépense annoncée est un objectif du candidat ; aucune contre-expertise budgétaire n’est revendiquée ici.
- Échange du 19 octobre sur LCI : [Le Parisien avec AFP, 20 octobre](https://www.leparisien.fr/politique/je-men-fous-david-lisnard-sagace-apres-avoir-ete-interroge-sur-le-17-octobre-1961-20-10-2026-67QQ72XSNJGMBHDQG3MQNZYXKM.php). Le résumé conserve sa réaction initiale et la reconnaissance ultérieure de la gravité des faits.
- Critiques au sein de l’AMF et réponse de Lisnard : [Le Monde, 21 octobre](https://www.lemonde.fr/politique/article/2026/10/21/des-maires-de-gauche-reprochent-a-david-lisnard-ses-propos-sur-le-massacre-du-17-octobre-1961_6798298_823448.html). Les positions des deux parties sont attribuées ; aucune conclusion judiciaire n’est suggérée.

## Vidéos vérifiées

Identifiants trouvés dans les intégrations des pages de Nouvelle Énergie. Titres, auteurs et disponibilité contrôlés par YouTube oEmbed ; dates de mise en ligne contrôlées dans les métadonnées `publishDate` des pages YouTube.

| Vidéo | Publication YouTube | Éditeur de la vidéo |
| --- | --- | --- |
| [Empreintes](https://www.youtube.com/watch?v=HAPGJIdAR3g) | 9 octobre 2026 | Empreintes Le Figaro 2027 |
| [Le Crayon](https://www.youtube.com/watch?v=SdILU6uwqTs) | 11 octobre 2026 | Le Crayon |
| [Entretien BFMTV du 10 octobre](https://www.youtube.com/watch?v=cquciFhgHv0) | 12 octobre 2026 | Nouvelle Énergie avec David Lisnard |
| [Face à Apolline de Malherbe](https://www.youtube.com/watch?v=Dpe_J7T0ztw) | 13 octobre 2026 | David Lisnard |

Les résumés s’appuient sur les comptes rendus sourcés. Les vidéos n’ont pas été visionnées intégralement ; ne pas présenter cette recherche comme une transcription ou une vérification exhaustive des déclarations. La date d’un compte rendu n’est pas confondue avec celle de la diffusion ou de la mise en ligne.

## Publications X

Cinq publications des 27 septembre, 11, 17 (deux posts) et 18 octobre sont vérifiées via le point d’intégration public `cdn.syndication.twimg.com/tweet-result`. Identifiant, auteur `davidlisnard` et horodatage sont contrôlés. Extraits de vingt-cinq mots maximum, complétés par un contexte explicitement présenté comme un résumé ; le lien ouvre l’original. La sélection ne prétend pas constituer les cinq ou dix derniers messages ni un suivi exhaustif.

Les vues et reposts ne sont pas fournis par cette réponse X : aucun chiffre n’est inventé. Les métriques sont masquées pour ces entrées. Les liens, dates, extraits et URL de vérification sont versionnés dans `frontend/scripts/data/lisnardTweets20261022.json`.

## Publication ciblée

Depuis `frontend` :

```sh
node scripts/updateLisnardResearch20261022.mjs
node scripts/updateLisnardResearch20261022.mjs --write
```

Le script fusionne les interventions et sources existantes, n’écrit que la fiche `david-lisnard` et ses documents médias, et conserve notamment son statut, sa photo et les autres enrichissements. Relancer n’ajoute pas de doublons : les identifiants médias sont stables.
