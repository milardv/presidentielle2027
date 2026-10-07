export interface KnowledgeSource { label: string; url: string }
export interface KnowledgeQuestion {
  id: string
  categoryId: string
  round: number
  prompt: string
  options: [string, string, string, string]
  correctIndex: number
  explanation: string
  concept: string
}
type QuestionSeed = [string, [string, string, string, string], number, string, string]
export interface KnowledgeCategory {
  id: string
  title: string
  shortTitle: string
  description: string
  color: string
  sources: KnowledgeSource[]
  questions: QuestionSeed[]
}

export const knowledgeCategories: KnowledgeCategory[] = [
  {
    id: 'macro', title: 'Macroéconomie', shortTitle: 'Économie', color: '#c4714f',
    description: 'Lire la croissance, les prix et l’emploi sans confondre les indicateurs.',
    sources: [
      { label: 'PIB et ses composantes — Insee', url: 'https://www.insee.fr/fr/statistiques/8358374' },
      { label: 'Définitions des concepts — Insee', url: 'https://www.insee.fr/fr/information/2383278' },
      { label: 'Travail domestique et PIB — Insee', url: 'https://www.insee.fr/fr/statistiques/2123967' },
    ],
    questions: [
      ["Dans un pays, le PIB progresse mais le revenu médian recule. Que peut-on en déduire ?", ["Une hausse de l’activité économique ne garantit pas une hausse du revenu médian", "Le PIB a forcément été mal calculé", "Tous les revenus ont progressé", "La population a nécessairement diminué"], 0, "Le PIB renseigne sur l’activité économique totale ; il ne dit pas à lui seul comment les revenus sont répartis.", "PIB et répartition"],
      ["Entre deux années, le PIB en euros courants augmente de 5 % et les prix de cette production de 3 %. Sa hausse « en volume » est proche de…", ["2 %", "3 %", "5 %", "8 %"], 0, "Une fois l’effet des prix retiré, la production a progressé d’environ 2 % (exactement 1,94 %).", "Croissance réelle"],
      ["L’inflation est de 6 % une année, puis de 2 % l’année suivante. Que deviennent les prix ?", ["Ils continuent d’augmenter, mais moins vite", "Ils baissent de 4 % la deuxième année", "Ils reviennent au niveau d’avant la première année", "Leur évolution ne peut pas être estimée"], 0, "Deux taux d’inflation positifs successifs signifient deux hausses de prix, la seconde étant plus lente.", "Inflation"],
      ["En un an, un salaire nominal gagne 3 % et les prix montent de 5 %. Que devient son pouvoir d’achat ?", ["Il diminue d’environ 2 %", "Il augmente de 3 %", "Il augmente de 5 %", "Il ne change pas"], 0, "Les prix augmentent plus vite que le salaire : ce salaire permet donc d’acheter moins qu’avant.", "Pouvoir d’achat"],
      ["Cinq revenus mensuels sont de 1 000, 1 200, 1 300, 1 400 et 9 000 €. Quel est le revenu médian ?", ["1 300 €", "1 000 €", "2 780 €", "9 000 €"], 0, "Une fois les revenus rangés, la troisième valeur est celle du milieu : 1 300 €.", "Médiane"],
      ["Sur 100 personnes actives, 8 sont au chômage. Quel est le taux de chômage de ce groupe ?", ["8 %", "0,8 %", "12,5 %", "92 %"], 0, "Le taux de chômage rapporte les personnes au chômage à la population active : ici, 8 sur 100.", "Taux de chômage"],
      ["Un atelier fabrique 100 pièces en 10 heures, puis 120 pièces en 10 heures. Comment évolue la production par heure ?", ["Elle augmente de 20 %", "Elle augmente de 10 %", "Elle augmente de 2 %", "Elle reste stable"], 0, "La production passe de 10 à 12 pièces par heure, soit 20 % de plus.", "Productivité"],
      ["Une personne prépare chaque jour le repas de sa famille sans être payée. Cette activité entre-t-elle directement dans le PIB ?", ["Non, ce travail domestique non rémunéré n’y est généralement pas compté", "Oui, tous les repas préparés à domicile y sont valorisés", "Oui, mais seulement si la personne prépare plus de dix repas", "Non, parce que l’alimentation est toujours exclue du PIB"], 0, "Le PIB ne valorise généralement pas les services domestiques non rémunérés au sein d’un ménage ; un repas acheté, lui, est comptabilisé.", "Limites du PIB"],
      ["Un pays exporte 90 milliards d’euros de biens et en importe 110 milliards. Son solde commercial de biens est…", ["Un déficit de 20 milliards d’euros", "Un excédent de 20 milliards d’euros", "Un déficit de 200 milliards d’euros", "Un solde nul car les services ne sont pas comptés"], 0, "Pour les biens, 90 moins 110 donne un solde de −20 milliards : les importations dépassent les exportations.", "Commerce extérieur"],
      ["Le pays A a un PIB de 200 milliards d’euros pour 10 millions d’habitants ; le pays B, 300 milliards pour 30 millions. Lequel a le PIB par habitant le plus élevé ?", ["Le pays A", "Le pays B", "Les deux sont égaux", "Impossible à savoir sans le taux de chômage"], 0, "Le PIB par habitant est de 20 000 € dans A contre 10 000 € dans B : une production totale plus grande ne suffit pas.", "PIB par habitant"],
    ],
  },
  {
    id: 'budget', title: 'Budget et fiscalité', shortTitle: 'Budget', color: '#a36374',
    description: 'Voir qui finance une promesse et à quel horizon.',
    sources: [
      { label: 'Qu’est-ce qu’un budget ? — Vie publique', url: 'https://www.vie-publique.fr/fiches/21818-quest-ce-quun-budget' },
      { label: 'Finances publiques, notions clés — Vie publique', url: 'https://www.vie-publique.fr/files/2026-03/9782111742116-Extrait.pdf' },
    ],
    questions: [
      ["Sur une année, les administrations publiques encaissent 100 et dépensent 110. Quel est leur déficit sur cette année ?", ["10", "100", "110", "210"], 0, "Un déficit est la différence entre les dépenses et les recettes d’une période : ici, 10.", "Déficit"],
      ["Après plusieurs années d’emprunts et de remboursements, que représente la dette publique à une date donnée ?", ["Le capital des emprunts encore dû", "Le seul déficit de l’année", "Toutes les dépenses votées pour l’année", "Les recettes fiscales attendues l’an prochain"], 0, "La dette est un stock à une date donnée ; le déficit mesure un écart de dépenses et de recettes sur une période.", "Dette"],
      ["Une nouvelle aide coûte 2 milliards d’euros chaque année. Une vente d’actifs rapporte 2 milliards une seule fois. Quel problème reste-t-il ?", ["Financer l’aide les années suivantes", "Financer uniquement la première année", "Connaître le nombre de ministères", "Convertir les montants en pourcentage"], 0, "Une recette ponctuelle ne finance qu’une année d’une dépense qui revient tous les ans.", "Dépense récurrente"],
      ['À budget inchangé, consacrer plus d’argent à un poste implique…', ['De réduire ou différer autre chose', 'De diminuer la dette du même montant', 'D’augmenter le pouvoir d’achat de tous', 'De financer deux fois la même dépense'], 0, 'C’est le coût d’opportunité : choisir une dépense empêche d’utiliser les mêmes moyens ailleurs.', 'Coût d’opportunité'],
      ["Un barème prévoit 10 % jusqu’à 20 000 € et 20 % au-delà. Le revenu imposable d’une personne est de 25 000 €. Quelle part est taxée à 20 % ?", ["5 000 €", "25 000 €", "20 000 €", "Aucune"], 0, "Dans ce barème simplifié, seuls les 5 000 € au-dessus du seuil appartiennent à la tranche à 20 %.", "Progressivité"],
      ['La TVA est principalement un impôt sur…', ['La consommation', 'Les seuls revenus du travail', 'Le patrimoine immobilier', 'Le bénéfice net des entreprises'], 0, 'La TVA frappe la consommation de biens et services selon les règles applicables.', 'TVA'],
      ["L’État emprunte 100 milliards d’euros à 2 % d’intérêt annuel, sans rembourser de capital cette année. Combien paie-t-il d’intérêts ?", ["2 milliards d’euros", "100 milliards d’euros", "102 milliards d’euros", "20 milliards d’euros"], 0, "Deux pour cent de 100 milliards représentent 2 milliards d’intérêts pour l’année, hors remboursement du capital.", "Charge d’intérêts"],
      ['Un crédit d’impôt et une dépense directe peuvent tous deux…', ['Soutenir une activité avec un coût public', 'Augmenter automatiquement les recettes fiscales', 'Avoir toujours le même nombre de bénéficiaires', 'Produire immédiatement le même effet économique'], 0, 'Une réduction d’impôt peut réduire les recettes publiques, même si elle n’apparaît pas comme une dépense classique.', 'Dépense fiscale'],
      ['Pourquoi rapporter la dette au PIB ?', ['Pour comparer la dette à la taille de l’économie', 'Pour calculer directement la charge d’intérêts', 'Pour mesurer la dette privée des ménages', 'Pour connaître le niveau de vie médian'], 0, 'Le ratio dette/PIB met le stock de dette en regard de l’activité économique annuelle.', 'Ratio dette/PIB'],
      ['Deux programmes annoncent le même coût brut. Que faut-il encore regarder ?', ['Le financement et les effets indirects', 'Le seul coût de la première année', 'Le seul nombre de mesures annoncées', 'Le seul montant avant impôts'], 0, 'Le coût net, le calendrier, les recettes et les comportements induits peuvent modifier l’évaluation.', 'Évaluation budgétaire'],
    ],
  },
  {
    id: 'travail', title: 'Droit du travail et emploi', shortTitle: 'Travail', color: '#607f9b',
    description: 'Comprendre salaires, protection et transitions professionnelles.',
    sources: [
      { label: 'Le SMIC — Ministère du Travail', url: 'https://travail-emploi.gouv.fr/droit-du-travail/la-remuneration/article/le-smic' },
      { label: 'Droits en CDD — Service Public', url: 'https://www.service-public.fr/particuliers/vosdroits/F41' },
      { label: 'Taux de chômage — Insee', url: 'https://www.insee.fr/fr/metadonnees/definition/c1687' },
      { label: 'Protection des actifs — France Stratégie', url: 'https://www.strategie-plan.gouv.fr/publications/20172027-repenser-protection-actifs-actions-critiques' },
    ],
    questions: [
      ["Une fiche de paie affiche 2 000 € bruts et 300 € de cotisations salariales, avant impôt sur le revenu. Quel est le salaire net avant cet impôt ?", ["1 700 €", "2 300 €", "2 000 €", "300 €"], 0, "Le net avant impôt correspond ici au brut moins les cotisations salariales : 2 000 − 300 = 1 700 €.", "Brut et net"],
      ['Le coût d’un emploi pour l’employeur comprend…', ['Le salaire brut et les cotisations patronales', 'Le salaire net et le seul impôt sur le revenu', 'Le seul salaire brut', 'Le salaire net diminué des cotisations salariales'], 0, 'Comparer salaire net et coût employeur aide à lire une proposition sur les rémunérations.', 'Coût du travail'],
      ['Le SMIC fixe…', ['Un minimum légal de rémunération du travail salarié concerné', 'Le salaire médian de tous les salariés', 'Le minimum négocié dans chaque branche uniquement', 'Le coût minimum complet d’un emploi pour l’employeur'], 0, 'Le salaire minimum encadre la rémunération ; il ne détermine pas tous les salaires.', 'Salaire minimum'],
      ['Une personne sans emploi est-elle toujours comptée comme chômeuse ?', ['Non, des critères statistiques s’appliquent', 'Oui, dès qu’elle n’a plus de contrat', 'Oui, dès qu’elle est inscrite à France Travail', 'Non, seules les personnes indemnisées sont comptées'], 0, 'Le chômage statistique dépend notamment de la situation de recherche et de disponibilité.', 'Définition du chômage'],
      ["Dans un groupe de 100 personnes de 15 à 64 ans, 72 ont un emploi. Quel est son taux d’emploi ?", ["72 %", "28 %", "7,2 %", "Impossible à calculer sans connaître le nombre de chômeurs"], 0, "Le taux d’emploi rapporte les personnes qui travaillent à toute la population du groupe d’âge étudié.", "Taux d’emploi"],
      ["Une salariée travaille en CDD. A-t-elle droit à des congés payés pendant ce contrat ?", ["Oui, le type de contrat ne supprime pas ce droit", "Non, seuls les salariés en CDI y ont droit", "Oui, seulement si son contrat dure plus de deux ans", "Non, les congés sont remplacés par le salaire minimum"], 0, "Un CDD est limité dans le temps, mais le salarié conserve les droits prévus par le droit du travail, notamment les congés payés.", "CDI et CDD"],
      ["Une usine ferme. Quelle mesure aide directement ses salariés même si leurs postes disparaissent ?", ["Un revenu temporaire et un accompagnement vers un nouvel emploi", "Une aide liée uniquement au maintien des machines de l’usine", "Une interdiction de toute formation pendant la fermeture", "Un calcul du seul nombre de postes supprimés"], 0, "La protection d’une personne peut continuer après la disparition d’un poste, par le revenu et l’accompagnement.", "Sécurité professionnelle"],
      ["Une formation annonce 1 000 inscriptions. Quelle autre information aide à juger son utilité pour retrouver un emploi ?", ["Les compétences acquises et les débouchés des participants", "Le nombre d’inscriptions seulement, sur trois années", "Le coût par inscription seulement", "Le nombre de cours proposés seulement"], 0, "Le nombre d’inscrits ne dit pas si la formation est accessible, utile et suivie d’un emploi.", "Reconversion"],
      ["Une entreprise produit davantage avec le même nombre d’heures de travail. Les salaires augmentent-ils automatiquement ?", ["Non, la répartition du gain dépend aussi des décisions économiques et sociales", "Oui, tous les salaires augmentent du même montant", "Oui, chaque salarié reçoit toute la hausse de production", "Non, une hausse de production interdit toute augmentation de salaire"], 0, "Un gain de productivité crée une possibilité, mais ne fixe pas à lui seul son partage entre salaires, prix, investissement et profits.", "Productivité et salaires"],
      ['Pourquoi ne pas juger une réforme au seul nombre d’emplois créés ?', ['Parce qu’il ne dit pas seul leur qualité ni qui en bénéficie', 'Parce qu’il mesure automatiquement la hausse des salaires', 'Parce qu’il ne compte jamais les emplois à temps partiel', 'Parce qu’il inclut uniquement les emplois publics'], 0, 'Le volume d’emplois ne dit pas à lui seul leur rémunération, leur stabilité ou les personnes qui en bénéficient.', 'Qualité de l’emploi'],
    ],
  },
  {
    id: 'solidarite', title: 'Retraites et solidarité', shortTitle: 'Solidarité', color: '#88759b',
    description: 'Identifier les mécanismes de financement et de redistribution.',
    sources: [
      { label: 'Rapport annuel 2026 — Conseil d’orientation des retraites', url: 'https://www.cor-retraites.fr/rapports-du-cor/rapport-annuel-cor-juin-2026-evolutions-perspectives-retraites-france' },
      { label: 'Leviers d’équilibre — Conseil d’orientation des retraites', url: 'https://www.cor-retraites.fr/reunions-du-cor/impact-macroeconomique-leviers-dequilibre-financier-dun-systeme-retraite' },
    ],
    questions: [
      ["Les cotisations prélevées aujourd’hui servent à payer les pensions d’aujourd’hui. De quel fonctionnement s’agit-il ?", ["La retraite par répartition", "Une épargne placée séparément pour chaque retraité", "Une pension financée uniquement par les ventes de biens publics", "Un remboursement individuel des cotisations passées"], 0, "Dans la répartition, les ressources collectées auprès des actifs financent notamment les pensions courantes.", "Répartition"],
      ['Si le rapport entre retraités et cotisants change, que faut-il examiner ?', ['L’équilibre entre recettes et pensions', 'Le seul taux d’inflation des prix alimentaires', 'Le seul nombre de comptes individuels', 'La seule durée moyenne des études'], 0, 'La démographie compte pour un système financé en grande partie par les cotisations des actifs.', 'Démographie'],
      ["L’âge légal de départ est de 64 ans pour une personne, mais elle part à 66 ans. Quel est son âge effectif de départ ?", ["66 ans", "64 ans", "65 ans", "Impossible à déterminer"], 0, "L’âge légal est le seuil fixé par la règle ; l’âge effectif est l’âge auquel la personne part réellement.", "Âge effectif"],
      ['À règles inchangées, relever les pensions sans nouvelles recettes peut…', ['Accroître le besoin de financement', 'Accroître automatiquement les cotisations sans décision', 'Réduire mécaniquement le ratio retraités/actifs', 'Diminuer la masse des pensions versées'], 0, 'Une hausse des dépenses doit être financée ou compensée pour maintenir l’équilibre.', 'Financement'],
      ["Deux personnes atteignent le même âge de retraite, mais l’une a exercé un métier physiquement usant. Quel effet une règle uniforme peut-elle masquer ?", ["Des capacités différentes à travailler plus longtemps", "Une pension automatiquement identique pour tous", "Un nombre d’années travaillées nécessairement identique", "Une disparition automatique des risques professionnels"], 0, "L’état de santé et les conditions de travail peuvent rendre un même âge de départ très différent à vivre.", "Pénibilité"],
      ["Une aide mensuelle vaut 100 €. Si les prix augmentent de 5 %, quel montant maintient environ son pouvoir d’achat ?", ["105 €", "100 €", "95 €", "150 €"], 0, "Une hausse de 5 % porte 100 € à 105 € : l’indexation sur les prix vise à préserver la valeur réelle.", "Indexation"],
      ["Une aide pour les enfants est versée à tous les foyers avec enfants, quel que soit leur revenu. Comment qualifier ce critère d’accès ?", ["Universel pour les foyers avec enfants", "Réservé aux foyers sous un plafond de revenu", "Réservé aux seuls foyers imposables", "Calculé uniquement selon le salaire des parents"], 0, "Une aide universelle dans une population éligible ne cible pas les bénéficiaires selon leur revenu.", "Universalité"],
      ["Une personne remplit les conditions pour recevoir une aide, mais ne la demande pas. Comment s’appelle cette situation ?", ["Le non-recours", "Une fraude aux prestations", "Une revalorisation", "Une avance remboursable"], 0, "Le non-recours concerne les droits ouverts qui ne sont pas effectivement utilisés.", "Non-recours"],
      ['Quelle question aide à comparer deux réformes des retraites ?', ['Qui paie, qui bénéficie et à quel âge ?', 'Le seul âge légal annoncé', 'Le seul coût la première année', 'La seule pension moyenne nationale'], 0, 'Les effets dépendent des générations, des carrières et du financement choisi.', 'Effets distributifs'],
      ["Dans un régime de retraite financé par les cotisations, que peut produire une hausse du taux de cotisation, à emplois et salaires inchangés ?", ["Davantage de recettes pour le régime", "Une baisse automatique du nombre de retraités", "Une hausse automatique de l’âge légal", "Une disparition immédiate de toutes les dépenses"], 0, "À assiette inchangée, un taux de cotisation plus élevé accroît les recettes ; il modifie aussi l’effort demandé aux cotisants.", "Leviers de retraite"],
    ],
  },
  {
    id: 'climat', title: 'Écologie et énergie', shortTitle: 'Écologie', color: '#62816b',
    description: 'Relier émissions, adaptation et fonctionnement du système énergétique.',
    sources: [
      { label: 'Incidences économiques de l’action climatique — France Stratégie', url: 'https://www.strategie-plan.gouv.fr/publications/incidences-economiques-de-laction-climat' },
      { label: 'Flexibilité électrique — RTE', url: 'https://www.rte-france.com/bases-electricite/systeme-electrique/flexibilite-electrique-cle-voute-transition-energetique' },
    ],
    questions: [
      ['Réduire les émissions de gaz à effet de serre relève surtout de…', ['L’atténuation du changement climatique', 'L’adaptation aux effets du changement climatique', 'La compensation des seules pertes assurées', 'La gestion des seuls pics de consommation électrique'], 0, 'L’atténuation agit sur les causes ; l’adaptation prépare les territoires et activités aux effets.', 'Atténuation'],
      ['Construire des protections contre les canicules relève surtout de…', ['L’adaptation', 'L’atténuation des émissions mondiales', 'La compensation carbone', 'Le stockage de l’électricité'], 0, 'L’adaptation réduit la vulnérabilité aux conséquences du changement climatique.', 'Adaptation'],
      ["Un téléphone acheté en France est fabriqué à l’étranger. Quel indicateur tient compte des émissions de cette fabrication ?", ["L’empreinte carbone de la consommation française", "Les seules émissions produites sur le territoire français", "Le nombre d’appareils recyclés en France", "La seule consommation d’électricité des ménages français"], 0, "L’empreinte de consommation inclut les émissions liées aux biens importés consommés en France.", "Empreinte carbone"],
      ["Un appareil d’une puissance de 1 kW fonctionne pendant 2 heures. Quelle énergie consomme-t-il ?", ["2 kWh", "1 kWh", "0,5 kWh", "2 kW"], 0, "Énergie = puissance × durée : 1 kW pendant 2 heures consomme 2 kWh.", "Énergie et puissance"],
      ['Pour un réseau électrique, production et consommation doivent…', ['Être équilibrées en temps réel', 'Être égales uniquement sur l’année', 'Être égales uniquement sur la journée', 'Être égales uniquement au moment de la pointe hivernale'], 0, 'RTE ajuste le système pour maintenir l’équilibre à chaque instant.', 'Équilibre électrique'],
      ['Pourquoi la météo compte-t-elle pour l’éolien et le solaire ?', ['Leur production varie avec vent et soleil', 'Leur coût d’installation varie chaque heure', 'Leur puissance installée varie avec les saisons', 'Leur production est pilotée uniquement par la demande'], 0, 'Une production variable nécessite de penser flexibilité, stockage, réseaux et autres moyens.', 'Production variable'],
      ["Un budget carbone autorise 100 millions de tonnes d’émissions sur cinq ans. Après 60 millions de tonnes, combien reste-t-il dans ce budget ?", ["40 millions de tonnes", "60 millions de tonnes", "100 millions de tonnes chaque année", "160 millions de tonnes"], 0, "Un budget carbone fixe un plafond cumulé : 100 moins 60 laisse 40 millions de tonnes.", "Budget carbone"],
      ['Un équipement moins polluant à l’usage peut malgré tout nécessiter…', ['Des ressources et émissions lors de sa fabrication', 'Aucune émission avant sa première utilisation', 'Un impact nul pendant son recyclage', 'Des émissions limitées à son lieu d’usage'], 0, 'Comparer des solutions suppose de considérer leur cycle de vie, pas seulement l’usage.', 'Cycle de vie'],
      ['Pourquoi une aide climatique peut-elle être ciblée selon le revenu ?', ['L’investissement initial n’est pas finançable pour tous', 'Tous les ménages ont la même capacité d’emprunt', 'Une aide uniforme profite toujours davantage aux plus modestes', 'Le coût d’une rénovation est déjà payé par les économies futures'], 0, 'Le coût initial d’une rénovation ou d’un véhicule peut être un obstacle même si l’opération est utile à terme.', 'Transition juste'],
      ["Une usine pollue l’eau utilisée par les habitants voisins sans payer la dépollution. Quel concept décrit ce coût subi par des tiers ?", ["Une externalité négative", "Un bénéfice privé de l’usine", "Une subvention aux habitants", "Une hausse de productivité"], 0, "Une externalité négative est un coût imposé à des tiers sans être entièrement pris en charge par celui qui le crée.", "Externalité"],
    ],
  },
  {
    id: 'logement', title: 'Logement et territoires', shortTitle: 'Logement', color: '#9b784e',
    description: 'Comprendre le foncier, la construction et les déplacements.',
    sources: [
      { label: 'Densité et sols en ville — Cerema', url: 'https://www.cerema.fr/index.php/fr/actualites/densite-sols-ville-contexte-declinaison-du-zero' },
      { label: 'Urbanisme et densité désirable — Cerema', url: 'https://www.cerema.fr/fr/actualites/urbanisme-chemin-densite-desirable' },
    ],
    questions: [
      ['Construire davantage de logements dans une zone recherchée agit d’abord sur…', ['L’offre de logements disponibles', 'La demande de logements', 'Le taux d’intérêt des emprunts', 'Le prix du foncier dans toutes les régions'], 0, 'L’offre est une dimension centrale d’un marché local du logement, même si ses effets dépendent du lieu et du type de biens.', 'Offre de logements'],
      ["Une ville transforme un parking déjà aménagé en immeuble de logements. Quelle stratégie urbaine illustre-t-elle ?", ["La densification d’un espace déjà urbanisé", "L’extension sur une nouvelle terre agricole", "La suppression de tous les transports", "La création de logements sans réutiliser le foncier"], 0, "La densification accueille davantage d’usages sur une surface déjà urbanisée.", "Densification"],
      ["Une prairie est recouverte de bitume pour créer un grand parking. Quel effet sur le sol faut-il aussi considérer ?", ["La perte de fonctions comme l’infiltration de l’eau", "L’augmentation garantie de sa fertilité", "La création automatique d’une zone humide", "Le seul changement de son prix de vente"], 0, "Le revêtement peut altérer durablement les fonctions écologiques, hydriques ou agronomiques du sol.", "Artificialisation"],
      ['Pourquoi une construction en périphérie peut-elle avoir un coût caché ?', ['Elle peut allonger trajets et réseaux', 'Elle augmente toujours les loyers du centre', 'Elle rend inutiles les transports collectifs', 'Elle évite tous les coûts d’équipement public'], 0, 'L’éloignement peut nécessiter routes, réseaux et déplacements supplémentaires.', 'Étalement urbain'],
      ["Une ancienne usine inutilisée est réaménagée pour accueillir de nouveaux usages. Quel avantage territorial cela peut-il avoir ?", ["Limiter l’ouverture de nouveaux sols naturels à l’urbanisation", "Éviter systématiquement toute dépollution", "Garantir des loyers plus bas partout", "Supprimer toute règle d’urbanisme"], 0, "Réutiliser un terrain déjà aménagé peut limiter l’étalement, même si sa reconversion a parfois un coût.", "Friche"],
      ["Une ville plafonne certains loyers, mais manque toujours de logements. Quelle action agit directement sur leur nombre disponible ?", ["Construire ou remettre des logements vacants en état", "Abaisser seulement le loyer maximal autorisé", "Changer seulement l’indice de révision des loyers", "Interdire uniquement les annonces au-dessus du plafond"], 0, "Un plafond encadre un prix ; construire ou remettre des logements sur le marché agit directement sur la quantité disponible.", "Prix et quantité"],
      ['Une rénovation énergétique vise surtout à…', ['Réduire les besoins d’énergie d’un bâtiment', 'Réduire seulement le prix de l’énergie', 'Augmenter la production électrique nationale', 'Changer uniquement le contrat du fournisseur'], 0, 'Isoler ou améliorer les équipements peut réduire l’énergie nécessaire au même confort.', 'Performance énergétique'],
      ['Pourquoi regarder les logements vacants avant de conclure à un manque national uniforme ?', ['Parce que leur localisation peut différer des besoins', 'Parce que toute vacance prouve une offre suffisante', 'Parce que la vacance est identique dans chaque ville', 'Parce que le nombre de logements vacants détermine seul les loyers'], 0, 'Un logement vacant loin de l’emploi ou nécessitant des travaux ne résout pas automatiquement une tension locale.', 'Vacance et localisation'],
      ['Densifier sans espaces verts peut aggraver quel risque local ?', ['La surchauffe urbaine', 'La hausse automatique des précipitations', 'La baisse systématique de la densité', 'La disparition des besoins de mobilité'], 0, 'La forme urbaine et les sols végétalisés comptent dans le confort thermique.', 'Îlot de chaleur'],
      ['Pour arbitrer logement et sols, quelle donnée est indispensable ?', ['Le lieu précis des besoins et des terrains', 'La seule moyenne nationale des loyers', 'Le nombre total de logements en France seulement', 'Le seul coût moyen du mètre carré national'], 0, 'Les tensions de logement et les possibilités foncières varient fortement selon les territoires.', 'Échelle locale'],
    ],
  },
  {
    id: 'sante', title: 'Santé publique', shortTitle: 'Santé', color: '#4d8a83',
    description: 'Distinguer accès aux soins, prévention et capacités réelles.',
    sources: [
      { label: 'Renoncement aux soins et densité médicale — Drees', url: 'https://www.drees.solidarites-sante.gouv.fr/publications/etudes-et-resultats/renoncement-aux-soins-la-faible-densite-medicale-est-un-facteur' },
      { label: 'Mesurer le renoncement aux soins — Drees', url: 'https://drees.solidarites-sante.gouv.fr/publications/drees-methodes/la-mesure-du-renoncement-aux-soins-est-tres-sensible-la-formulation-des' },
    ],
    questions: [
      ['Un soin remboursé est-il nécessairement accessible ?', ['Non, le délai et la distance comptent aussi', 'Oui, si le taux de remboursement atteint 100 %', 'Oui, dès qu’un médecin exerce dans le département', 'Non, car le remboursement ne joue jamais sur l’accès'], 0, 'Le prix n’est qu’une dimension de l’accès : disponibilité, transport et délais comptent également.', 'Accès aux soins'],
      ["Un soin coûte 100 €. Assurance maladie et complémentaire remboursent ensemble 70 €. Quel est le reste à charge du patient ?", ["30 €", "70 €", "100 €", "170 €"], 0, "Le reste à charge est le montant que le patient paie après remboursements : ici, 30 €.", "Reste à charge"],
      ['Une politique de prévention cherche principalement à…', ['Réduire la survenue ou la gravité des problèmes de santé', 'Traiter uniquement les maladies déjà déclarées', 'Remplacer toutes les consultations médicales', 'Réduire seulement le prix des médicaments'], 0, 'Prévenir peut agir avant qu’une maladie ne survienne ou ne s’aggrave.', 'Prévention'],
      ["Une zone compte 10 médecins pour 10 000 habitants ; une autre, 20 médecins pour 40 000 habitants. Laquelle a la plus forte densité médicale ?", ["La première zone", "La seconde zone", "Les deux sont identiques", "Impossible à comparer sans le prix des consultations"], 0, "La première a 10 médecins pour 10 000 habitants ; la seconde en a 5 pour 10 000.", "Densité médicale"],
      ['Pourquoi une hausse du nombre de consultations ne suffit-elle pas à juger un système ?', ['Elle ne renseigne pas seule sur la qualité et les besoins', 'Elle mesure directement la baisse de mortalité', 'Elle prouve que chaque patient a reçu un soin utile', 'Elle indique seulement le nombre de soignants disponibles'], 0, 'Le volume d’activité doit être rapproché des résultats de santé, des besoins et des inégalités.', 'Indicateurs de santé'],
      ['Le renoncement aux soins déclaré dans une enquête dépend aussi…', ['De la formulation de la question', 'Uniquement du taux de remboursement officiel', 'Uniquement du nombre de médecins inscrits', 'Seulement du budget national de santé'], 0, 'La Drees montre que les réponses peuvent varier selon les mots employés pour interroger les personnes.', 'Mesure du renoncement'],
      ["Un test de dépistage signale parfois une maladie chez une personne qui ne l’a pas. Pourquoi faut-il mesurer ce phénomène ?", ["Pour peser les bénéfices du dépistage et les faux positifs", "Parce qu’un test positif prouve toujours la maladie", "Pour éviter de compter les personnes testées", "Parce que seul le coût des affiches importe"], 0, "Un faux positif peut entraîner inquiétude ou examens inutiles ; les bénéfices et effets indésirables doivent être comparés.", "Dépistage"],
      ['Ouvrir des places de soins sans personnels disponibles risque de…', ['Ne pas créer la capacité annoncée', 'Augmenter automatiquement le nombre de rendez-vous', 'Réduire le temps de formation des soignants', 'Rendre tous les soins accessibles sans délai'], 0, 'Une capacité de soins dépend aussi des professionnels capables d’assurer le service.', 'Capacité réelle'],
      ['Pourquoi comparer des résultats de santé entre groupes sociaux ?', ['Pour repérer des inégalités que la moyenne masque', 'Pour remplacer toute mesure individuelle par une moyenne', 'Pour prouver que le revenu est la seule cause de santé', 'Pour calculer directement le coût des hôpitaux'], 0, 'Une moyenne nationale peut cacher des écarts importants d’accès et d’état de santé.', 'Inégalités de santé'],
      ['Avant de juger une réforme sanitaire, il faut regarder…', ['Coût, accès, qualité et effets sur les patients', 'Seulement la baisse annoncée des dépenses', 'Seulement le nombre de structures ouvertes', 'Seulement l’évolution du nombre de consultations'], 0, 'Une réforme peut modifier plusieurs dimensions du soin, parfois dans des directions différentes.', 'Évaluation des soins'],
    ],
  },
  {
    id: 'institutions', title: 'Institutions et droits', shortTitle: 'Institutions', color: '#69748f',
    description: 'Savoir qui décide, qui contrôle et ce qu’un vote peut changer.',
    sources: [
      { label: 'Comment définir le Parlement ? — Vie publique', url: 'https://www.vie-publique.fr/fiches/19485-comment-definir-le-parlement' },
      { label: 'Rôle du Conseil constitutionnel — Vie publique', url: 'https://www.vie-publique.fr/infographie/37900-infographie-quel-est-le-role-du-conseil-constitutionnel' },
    ],
    questions: [
      ['En France, qui vote la loi ?', ['Le Parlement', 'Le Gouvernement par décret', 'Le Conseil constitutionnel après contrôle', 'Les électeurs à chaque élection présidentielle'], 0, 'L’Assemblée nationale et le Sénat composent le Parlement, qui exerce le pouvoir législatif.', 'Pouvoir législatif'],
      ['Le Gouvernement a notamment pour mission de…', ['Conduire la politique de la Nation et appliquer la loi', 'Contrôler la constitutionnalité des lois', 'Adopter seul toutes les lois', 'Diriger les tribunaux dans leurs jugements'], 0, 'Il dispose du pouvoir exécutif dans le cadre fixé par la Constitution et la loi.', 'Pouvoir exécutif'],
      ["Une loi adoptée est contestée au regard de la Constitution. Quelle institution peut en contrôler la conformité ?", ["Le Conseil constitutionnel", "La Cour des comptes", "Le Conseil d’État", "Le Défenseur des droits"], 0, "Le Conseil constitutionnel peut contrôler qu’une loi respecte la Constitution, selon les procédures prévues.", "Contrôle constitutionnel"],
      ['Pourquoi une promesse présidentielle peut-elle nécessiter une majorité parlementaire ?', ['Parce que changer la loi passe par le Parlement', 'Parce qu’un référendum est obligatoire pour toute réforme', 'Parce que les ministres sont élus par les députés', 'Parce que le Conseil constitutionnel rédige les lois'], 0, 'Nombre de réformes annoncées exigent un texte législatif et donc une procédure parlementaire.', 'Majorité parlementaire'],
      ["Un même dirigeant pourrait écrire la loi, l’exécuter et juger les litiges sans contrôle. Quel risque la séparation des pouvoirs cherche-t-elle à limiter ?", ["La concentration du pouvoir", "L’existence d’élections libres", "La publicité des débats", "La possibilité d’un contrôle juridictionnel"], 0, "Répartir les fonctions de décision et de contrôle limite le risque d’arbitraire.", "Contre-pouvoirs"],
      ["Une loi crée un droit. Le gouvernement publie un décret pour son application. Ce décret peut-il contredire la loi ?", ["Non, il doit respecter la loi", "Oui, tout décret prime sur une loi", "Oui, dès qu’il est publié plus tard", "Non, parce qu’un décret est voté par le Parlement"], 0, "Un décret est un acte réglementaire de l’exécutif : il doit respecter les lois qui lui sont supérieures.", "Loi et règlement"],
      ["Une liste reçoit 30 % des voix lors d’une élection. Quel résultat se rapproche du principe proportionnel ?", ["Environ 30 % des sièges", "Tous les sièges", "Aucun siège", "Toujours exactement un siège"], 0, "La proportionnelle cherche à rapprocher la part des sièges de la part des voix, selon la méthode électorale.", "Proportionnelle"],
      ['Un référendum permet de…', ['Consulter directement les électeurs sur une question prévue par le droit', 'Soumettre toute loi automatiquement au vote populaire', 'Permettre au président d’écarter le Parlement sur tout sujet', 'Faire voter les seuls élus locaux sur une loi'], 0, 'Ses conditions, son objet et ses effets dépendent du cadre juridique utilisé.', 'Référendum'],
      ["Un contrôle juridique retarde une décision de quelques semaines. Quel avantage peut-il apporter ?", ["Repérer une erreur ou un abus avant l’application", "Garantir que plus personne ne conteste la décision", "Faire disparaître automatiquement son coût financier", "Supprimer toute responsabilité des décideurs"], 0, "Les contrôles prennent du temps mais peuvent améliorer la légalité et la qualité d’une décision.", "Délibération"],
      ['Pour savoir si un candidat peut appliquer une proposition, il faut vérifier…', ['Quelle institution possède la compétence', 'Seulement le soutien dans les sondages', 'Seulement la popularité de la proposition', 'Uniquement le nombre de ministres favorables'], 0, 'L’État, le Parlement, les collectivités et l’Union européenne n’ont pas les mêmes pouvoirs.', 'Compétence'],
    ],
  },
  {
    id: 'europe', title: 'Europe et échanges', shortTitle: 'Europe', color: '#6b7caa',
    description: 'Situer les décisions françaises dans les règles et interdépendances européennes.',
    sources: [
      { label: 'Domaines d’action de l’UE — Commission européenne', url: 'https://commission.europa.eu/about/role/law/areas-eu-action_fr' },
      { label: 'Principe de subsidiarité — Parlement européen', url: 'https://www.europarl.europa.eu/factsheets/fr/sheet/7/subsidiaritetsprincipen' },
    ],
    questions: [
      ['L’Union européenne ne peut agir que dans les domaines…', ['Que les États lui ont attribués par les traités', 'Que la Commission juge prioritaires sans base juridique', 'Qui concernent au moins deux pays', 'Où le Parlement européen a déjà voté une résolution'], 0, 'Le principe d’attribution délimite les compétences de l’Union.', 'Attribution des compétences'],
      ["Une pollution traverse plusieurs pays européens. Selon la subsidiarité, quand une action de l’UE se justifie-t-elle ?", ["Quand l’échelon européen peut mieux atteindre l’objectif que les États seuls", "Dès qu’un pays en fait la demande, sans autre critère", "Seulement si tous les pays ont la même pollution", "Jamais pour un problème qui touche plusieurs pays"], 0, "Dans les domaines non exclusifs, l’action européenne doit apporter une efficacité supérieure à l’action nationale.", "Subsidiarité"],
      ['Le marché intérieur européen repose notamment sur…', ['La circulation des biens, services, personnes et capitaux', 'Une monnaie identique dans tous les États membres', 'Un impôt sur le revenu identique partout', 'L’absence de toute réglementation nationale'], 0, 'Ces quatre libertés structurent le marché intérieur, avec des règles et exceptions.', 'Marché intérieur'],
      ['Une compétence « exclusive » de l’UE signifie que…', ['L’Union légifère dans ce domaine selon les traités', 'Chaque État légifère librement malgré une règle commune', 'Les décisions exigent toujours un référendum national', 'L’Union ne peut donner que des conseils sans force juridique'], 0, 'Les États ont confié certains domaines précis au niveau européen, selon les traités.', 'Compétence exclusive'],
      ['Une compétence « partagée » signifie que…', ['UE et États peuvent intervenir selon les règles du traité', 'L’Union décide seule en toutes circonstances', 'Les États décident seuls même après une loi européenne', 'Les collectivités locales remplacent les États'], 0, 'L’exercice d’une compétence partagée dépend de l’action déjà menée par l’Union et du traité.', 'Compétence partagée'],
      ['Qui propose généralement les textes législatifs européens ?', ['La Commission européenne', 'Le Parlement européen seul', 'Le Conseil européen seul', 'La Banque centrale européenne'], 0, 'La Commission détient en général l’initiative législative au niveau de l’Union.', 'Initiative européenne'],
      ['Dans la procédure législative ordinaire, qui adopte les textes ?', ['Le Parlement européen et le Conseil de l’UE', 'La Commission européenne seule', 'Les parlements nationaux seuls', 'La Banque centrale et la Commission'], 0, 'Parlement et Conseil sont les deux colégislateurs de la procédure ordinaire.', 'Colégislation'],
      ['Pourquoi un pays peut-il gagner à une règle commune tout en perdant une marge d’action ?', ['Il partage une décision pour agir à plus grande échelle', 'Il récupère automatiquement un droit de veto individuel', 'Il conserve exactement la même autonomie juridique', 'Il évite toute négociation avec les autres États'], 0, 'Coopérer peut accroître la portée d’une action, tout en limitant certaines décisions unilatérales.', 'Souveraineté partagée'],
      ['La politique commerciale commune relève principalement…', ['D’une compétence de l’Union européenne', 'D’une compétence exclusive de chaque État membre', 'De la seule Banque centrale européenne', 'Des seules régions frontalières'], 0, 'Les traités attribuent la politique commerciale commune à l’Union.', 'Commerce extérieur'],
      ['Avant de promettre de « décider seul » sur un sujet européen, il faut regarder…', ['La compétence juridique et les interdépendances concrètes', 'Seulement le soutien de l’Assemblée nationale', 'Seulement le budget de la mesure', 'Uniquement l’avis de la Commission européenne'], 0, 'Une décision peut être juridiquement nationale, partagée ou européenne, avec des conséquences au-delà des frontières.', 'Niveau de décision'],
    ],
  },
  {
    id: 'preuves', title: 'Chiffres et esprit critique', shortTitle: 'Preuves', color: '#986e86',
    description: 'Déjouer les raccourcis qui faussent les débats publics.',
    sources: [
      { label: 'Moyenne et médiane — Insee', url: 'https://www.insee.fr/fr/metadonnees/definition/c1970' },
      { label: 'Peut-on se fier aux sondages ? — Insee', url: 'https://www.insee.fr/fr/information/7722109' },
      { label: 'Corrélation et causalité — Insee', url: 'https://www.insee.fr/fr/information/2674028' },
      { label: 'Évaluation d’impact — Insee', url: 'https://www.insee.fr/fr/statistiques/4253057' },
    ],
    questions: [
      ['Deux phénomènes évoluent ensemble. Cela prouve-t-il que l’un cause l’autre ?', ['Non, une corrélation ne suffit pas', 'Oui, si les deux séries montent plusieurs années', 'Oui, si le coefficient est proche de 1', 'Oui, si l’échantillon est très grand'], 0, 'Une cause commune ou le hasard peuvent créer une corrélation sans lien causal direct.', 'Corrélation'],
      ['Dans une série avec quelques revenus très élevés, quel indicateur résiste mieux à ces extrêmes ?', ['La médiane', 'La moyenne arithmétique', 'La somme des revenus', 'L’étendue entre minimum et maximum'], 0, 'La médiane dépend de la position centrale ; la moyenne peut être tirée vers le haut.', 'Médiane'],
      ['Un sondage repose sur un échantillon. Pourquoi faut-il parler d’incertitude ?', ['Le résultat peut varier selon les personnes interrogées', 'Parce que tout échantillon a nécessairement 50 % d’erreur', 'Parce que chaque personne représente exactement une commune', 'Parce que l’incertitude disparaît avec des quotas'], 0, 'L’échantillonnage introduit une variabilité dont la méthode doit rendre compte.', 'Précision statistique'],
      ['Une hausse de 2 à 3 représente…', ['+50 % en relatif et +1 en valeur absolue', '+1 % en relatif et +1 en valeur absolue', '+33 % en relatif et +1 en valeur absolue', '+150 % en relatif et +1 en valeur absolue'], 0, 'Il faut distinguer la variation absolue (+1) et relative (+1 sur une base de 2).', 'Variation relative'],
      ['Une mesure est annoncée « efficace » après une simple comparaison avant/après. Que manque-t-il ?', ['Un scénario crédible de ce qui se serait passé sans elle', 'Une période après réforme plus longue uniquement', 'Un nombre de bénéficiaires plus élevé uniquement', 'Une comparaison du coût avec le budget total uniquement'], 0, 'D’autres changements ont pu se produire en même temps : l’évaluation causale cherche un contrefactuel.', 'Contrefactuel'],
      ['Pourquoi préciser la date d’une statistique dans un débat ?', ['Pour savoir à quelle situation elle se rapporte', 'Pour connaître directement sa marge d’erreur', 'Pour déduire sa méthode d’échantillonnage', 'Pour garantir qu’elle décrit encore la situation présente'], 0, 'Une donnée ancienne peut décrire une situation différente de celle discutée aujourd’hui.', 'Actualité des données'],
      ['Un graphique commence son axe vertical à 90 au lieu de 0. Quel risque ?', ['Exagérer visuellement de petites différences', 'Réduire la taille réelle de l’échantillon', 'Modifier la moyenne arithmétique', 'Changer automatiquement les unités sur l’axe horizontal'], 0, 'L’échelle choisie peut accentuer ou atténuer la perception d’un écart.', 'Échelle graphique'],
      ["Une réforme est appliquée à des communes déjà plus riches que les autres. Quel risque apparaît si on compare directement leurs résultats ?", ["Attribuer à la réforme un écart qui existait déjà", "Effacer automatiquement les écarts de départ", "Rendre les budgets des communes identiques", "Garantir que seule la réforme explique le résultat"], 0, "Un écart initial entre groupes peut fausser l’estimation de l’effet d’une réforme.", "Biais de sélection"],
      ['Une prévision dépend d’hypothèses. Que faut-il vérifier ?', ['Les hypothèses et l’intervalle d’incertitude', 'Seulement la valeur centrale annoncée', 'Seulement la précision des décimales', 'Uniquement la date de publication'], 0, 'Une projection n’est pas une certitude ; ses conditions de validité doivent être explicites.', 'Projection'],
      ["Un graphique viral annonce « +20 % » sans unité ni source. Que faut-il vérifier avant de le citer ?", ["Ce qui est mesuré, la période et l’origine de la donnée", "Si sa couleur confirme l’argument souhaité", "Si un autre indicateur peut être ignoré", "Si le chiffre a beaucoup été partagé"], 0, "Sans définition, période ni source, un pourcentage est impossible à interpréter correctement.", "Lecture critique"],
    ],
  },
]

export const knowledgeQuestions: KnowledgeQuestion[] = Array.from({ length: 10 }, (_, round) =>
  knowledgeCategories.map((category) => {
    const [prompt, options, correctIndex, explanation, concept] = category.questions[round]
    return { id: `${category.id}-${round + 1}`, categoryId: category.id, round: round + 1, prompt, options, correctIndex, explanation, concept }
  }),
).flat()

export const knowledgeRewards = [
  'La première étincelle', 'L’œil du lecteur', 'Le sens des chiffres', 'La carte des choix', 'Le fil des causes',
  'La boussole publique', 'La voix du doute', 'Le carnet d’enquête', 'Le regard d’ensemble', 'Le passeport du débat',
]
