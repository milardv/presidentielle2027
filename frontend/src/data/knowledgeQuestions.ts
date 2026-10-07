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
    ],
    questions: [
      ['Que mesure principalement le PIB ?', ['La production créée sur un territoire', 'Le revenu disponible des ménages', 'La valeur du patrimoine national', 'Le total des dépenses publiques'], 0, 'Le PIB mesure la richesse nouvellement produite pendant une période. Il ne résume pas à lui seul le bien-être.', 'PIB'],
      ['Une croissance « en volume » retire quel effet ?', ['L’effet des variations de prix', 'L’effet des variations de population', 'L’effet des variations saisonnières', 'L’effet des taux de change'], 0, 'La croissance en volume cherche à mesurer la variation réelle de la production, hors variation des prix.', 'Croissance réelle'],
      ['L’inflation passe de 6 % à 2 %. Que peut-on en conclure ?', ['Les prix augmentent moins vite', 'Le niveau général des prix a reculé de 4 %', 'Les prix sont revenus à leur niveau initial', 'Le pouvoir d’achat a automatiquement gagné 4 %'], 0, 'Une inflation positive plus faible signifie une hausse des prix plus lente, pas nécessairement une baisse des prix.', 'Inflation'],
      ['Si le salaire augmente de 3 % et les prix de 5 %, le pouvoir d’achat du salaire…', ['Recule approximativement', 'Progresse approximativement de 2 %', 'Reste stable car le salaire a augmenté', 'Progresse de 8 %'], 0, 'À salaire nominal donné, une hausse des prix plus rapide réduit le pouvoir d’achat réel.', 'Pouvoir d’achat'],
      ['La médiane partage une population en…', ['Deux groupes de même effectif', 'Deux groupes de même revenu total', 'Deux groupes dont la moyenne est identique', 'Deux groupes dont le revenu le plus fréquent est identique'], 0, 'La moitié des observations est sous la médiane et l’autre moitié au-dessus.', 'Médiane'],
      ['Le taux de chômage rapporte les chômeurs à…', ['La population active', 'La population en âge de travailler', 'Les seules personnes en emploi', 'Tous les habitants'], 0, 'La population active comprend les personnes en emploi et les chômeurs selon la définition statistique utilisée.', 'Taux de chômage'],
      ['La productivité du travail compare généralement…', ['La production au travail mobilisé', 'Le salaire net au salaire brut', 'Le bénéfice au chiffre d’affaires', 'Le nombre de chômeurs aux postes vacants'], 0, 'La productivité rapporte une production à une quantité de travail, par exemple des heures travaillées.', 'Productivité'],
      ['Une hausse du PIB garantit-elle que chacun gagne davantage ?', ['Non, la répartition peut changer', 'Oui, si elle est mesurée en volume', 'Oui, si le taux de chômage baisse', 'Oui, si le PIB par habitant augmente'], 0, 'Un total national peut progresser alors que certains revenus stagnent ou diminuent.', 'Répartition'],
      ['Une balance commerciale de biens déficitaire signifie que…', ['Les importations de biens dépassent les exportations de biens', 'Les dépenses publiques dépassent les recettes', 'Les services importés dépassent les services exportés', 'Les investissements dépassent l’épargne des ménages'], 0, 'Le solde commercial des biens compare leurs exportations et leurs importations sur une période.', 'Commerce extérieur'],
      ['Pourquoi regarder le PIB par habitant en plus du PIB total ?', ['Pour tenir compte de la taille de la population', 'Pour déduire directement le revenu médian', 'Pour retirer automatiquement l’inflation', 'Pour mesurer la seule production marchande'], 0, 'Un même PIB total ne représente pas la même production moyenne selon le nombre d’habitants.', 'PIB par habitant'],
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
      ['Le déficit public est avant tout…', ['Un écart annuel entre dépenses et recettes', 'Le stock total des emprunts encore dus', 'La seule charge d’intérêts annuelle', 'Le total des prélèvements obligatoires'], 0, 'Le déficit est un flux sur une période ; la dette est un stock d’emprunts à une date donnée.', 'Déficit'],
      ['La dette publique est plutôt…', ['Un stock d’engagements financiers', 'Le seul déficit de l’année', 'Le total des dépenses votées pour l’année', 'La somme des recettes fiscales futures'], 0, 'La dette reflète notamment l’accumulation d’emprunts passés, et non seulement le déficit de l’année.', 'Dette'],
      ['Une mesure coûte 2 milliards chaque année. Quel point distingue son financement ?', ['Une recette permanente d’une recette ponctuelle', 'Une autorisation de dépense d’une dépense réalisée', 'Une recette nationale d’une recette locale', 'Un montant brut d’un montant net'], 0, 'Une dépense récurrente financée par une ressource unique pose une question de financement les années suivantes.', 'Dépense récurrente'],
      ['À budget inchangé, consacrer plus d’argent à un poste implique…', ['De réduire ou différer autre chose', 'De diminuer la dette du même montant', 'D’augmenter le pouvoir d’achat de tous', 'De financer deux fois la même dépense'], 0, 'C’est le coût d’opportunité : choisir une dépense empêche d’utiliser les mêmes moyens ailleurs.', 'Coût d’opportunité'],
      ['Un impôt progressif se caractérise par…', ['Un taux qui augmente avec la base imposable', 'Un montant identique pour tous', 'Un taux identique quelle que soit la base', 'Une assiette limitée à la consommation'], 0, 'La progressivité fait croître le taux d’imposition avec le niveau de la base concernée.', 'Progressivité'],
      ['La TVA est principalement un impôt sur…', ['La consommation', 'Les seuls revenus du travail', 'Le patrimoine immobilier', 'Le bénéfice net des entreprises'], 0, 'La TVA frappe la consommation de biens et services selon les règles applicables.', 'TVA'],
      ['Le service de la dette désigne notamment…', ['Le paiement des intérêts dus', 'La seule émission de nouveaux emprunts', 'Les dépenses publiques hors intérêts', 'La valeur totale du patrimoine public'], 0, 'Les intérêts sont une charge budgétaire liée aux emprunts en cours.', 'Charge d’intérêts'],
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
      { label: 'Taux de chômage — Insee', url: 'https://www.insee.fr/fr/metadonnees/definition/c1687' },
      { label: 'Protection des actifs — France Stratégie', url: 'https://www.strategie-plan.gouv.fr/publications/20172027-repenser-protection-actifs-actions-critiques' },
    ],
    questions: [
      ['Le salaire net est généralement…', ['Le salaire après déduction des cotisations salariales', 'Le salaire avant toute retenue', 'Le coût complet supporté par l’employeur', 'Le salaire brut augmenté de l’impôt sur le revenu'], 0, 'Le salaire brut et le salaire net ne mesurent pas la même chose ; le coût employeur ajoute encore d’autres charges.', 'Brut et net'],
      ['Le coût d’un emploi pour l’employeur comprend…', ['Le salaire brut et les cotisations patronales', 'Le salaire net et le seul impôt sur le revenu', 'Le seul salaire brut', 'Le salaire net diminué des cotisations salariales'], 0, 'Comparer salaire net et coût employeur aide à lire une proposition sur les rémunérations.', 'Coût du travail'],
      ['Le SMIC fixe…', ['Un minimum légal de rémunération du travail salarié concerné', 'Le salaire médian de tous les salariés', 'Le minimum négocié dans chaque branche uniquement', 'Le coût minimum complet d’un emploi pour l’employeur'], 0, 'Le salaire minimum encadre la rémunération ; il ne détermine pas tous les salaires.', 'Salaire minimum'],
      ['Une personne sans emploi est-elle toujours comptée comme chômeuse ?', ['Non, des critères statistiques s’appliquent', 'Oui, dès qu’elle n’a plus de contrat', 'Oui, dès qu’elle est inscrite à France Travail', 'Non, seules les personnes indemnisées sont comptées'], 0, 'Le chômage statistique dépend notamment de la situation de recherche et de disponibilité.', 'Définition du chômage'],
      ['Le taux d’emploi rapporte les personnes en emploi à…', ['La population du groupe étudié', 'Les seules personnes actives du groupe', 'Les seuls salariés du secteur privé', 'Les personnes en emploi plus les postes vacants'], 0, 'Le taux d’emploi et le taux de chômage ont des dénominateurs différents.', 'Taux d’emploi'],
      ['Un contrat à durée déterminée se distingue d’un CDI notamment par…', ['Une durée ou une fin prévue selon ses règles', 'Une période d’essai obligatoirement plus longue', 'L’absence de tout droit à congés', 'Une rémunération légalement toujours plus élevée'], 0, 'La forme du contrat change le cadre de la relation d’emploi, sans supprimer les protections légales.', 'CDI et CDD'],
      ['Protéger un poste et protéger une personne pendant une transition, c’est…', ['Deux politiques différentes', 'Deux noms juridiques pour la même aide', 'Deux formes du même contrat de travail', 'Deux politiques qui n’affectent que les employeurs'], 0, 'La protection peut porter sur la stabilité du poste ou sur le revenu et l’accompagnement entre deux emplois.', 'Sécurité professionnelle'],
      ['Une formation professionnelle est plus utile si…', ['Elle correspond à des compétences recherchées et accessibles', 'Elle augmente seulement le nombre de formations proposées', 'Elle vise uniquement les métiers déjà en déclin', 'Elle est évaluée au seul nombre d’inscriptions'], 0, 'Le contenu, l’accès et les débouchés comptent pour juger une politique de formation.', 'Reconversion'],
      ['Une hausse de productivité peut créer une marge pour…', ['Produire davantage par unité de travail', 'Augmenter automatiquement chaque salaire du même montant', 'Réduire mécaniquement le chômage à zéro', 'Faire disparaître tout besoin d’investissement'], 0, 'Une productivité supérieure peut augmenter la production, mais sa répartition dépend de choix économiques et sociaux.', 'Productivité et salaires'],
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
      ['Dans un système de retraite par répartition, les pensions courantes sont principalement financées par…', ['Les ressources prélevées sur les actifs actuels', 'Le placement personnel de chaque retraité uniquement', 'Le capital accumulé par chaque employeur uniquement', 'Une dotation identique versée à chaque naissance'], 0, 'La répartition organise un transfert entre générations à travers les ressources du système.', 'Répartition'],
      ['Si le rapport entre retraités et cotisants change, que faut-il examiner ?', ['L’équilibre entre recettes et pensions', 'Le seul taux d’inflation des prix alimentaires', 'Le seul nombre de comptes individuels', 'La seule durée moyenne des études'], 0, 'La démographie compte pour un système financé en grande partie par les cotisations des actifs.', 'Démographie'],
      ['L’âge légal et l’âge effectif de départ sont…', ['Deux notions distinctes', 'Toujours le même âge pour chaque personne', 'L’âge moyen prévu et l’âge moyen souhaité', 'Deux seuils fixés exclusivement par les employeurs'], 0, 'L’âge légal fixe une borne juridique ; l’âge effectif décrit ce que les personnes font réellement.', 'Âge effectif'],
      ['À règles inchangées, relever les pensions sans nouvelles recettes peut…', ['Accroître le besoin de financement', 'Accroître automatiquement les cotisations sans décision', 'Réduire mécaniquement le ratio retraités/actifs', 'Diminuer la masse des pensions versées'], 0, 'Une hausse des dépenses doit être financée ou compensée pour maintenir l’équilibre.', 'Financement'],
      ['La pénibilité du travail est importante dans le débat sur l’âge de départ parce que…', ['Les capacités à travailler longtemps diffèrent', 'Les conditions de travail sont identiques à tout âge', 'L’âge légal mesure à lui seul l’état de santé', 'La pénibilité est déjà incluse dans le PIB'], 0, 'Une règle uniforme peut peser différemment selon les conditions de travail et l’état de santé.', 'Pénibilité'],
      ['Indexer une prestation sur les prix vise surtout à…', ['Préserver son pouvoir d’achat face à l’inflation', 'Faire croître automatiquement la prestation comme le PIB', 'Aligner la prestation sur le salaire médian', 'Compenser uniquement la hausse des cotisations'], 0, 'L’indexation aux prix limite la perte de valeur réelle d’un montant nominal.', 'Indexation'],
      ['Une aide universelle est versée…', ['Sans ciblage par revenu pour les personnes éligibles', 'Après vérification d’un plafond de ressources', 'Uniquement aux personnes sous le seuil de pauvreté', 'Seulement aux foyers qui en font la demande chaque année'], 0, 'L’universalité et le ciblage répartissent différemment le coût et la couverture.', 'Universalité'],
      ['Le non-recours à une aide signifie que…', ['Des personnes éligibles ne la demandent ou ne la reçoivent pas', 'Des personnes non éligibles l’obtiennent', 'Des personnes la remboursent après un contrôle', 'Le budget prévu pour l’aide est dépassé'], 0, 'Une politique peut exister dans la loi sans atteindre toutes les personnes auxquelles elle s’adresse.', 'Non-recours'],
      ['Quelle question aide à comparer deux réformes des retraites ?', ['Qui paie, qui bénéficie et à quel âge ?', 'Le seul âge légal annoncé', 'Le seul coût la première année', 'La seule pension moyenne nationale'], 0, 'Les effets dépendent des générations, des carrières et du financement choisi.', 'Effets distributifs'],
      ['Le Conseil d’orientation des retraites présente notamment quels leviers financiers ?', ['Pensions, cotisations et âge de départ', 'Uniquement les prix et les taux de change', 'Uniquement les rendements immobiliers', 'Uniquement les recettes de TVA'], 0, 'Ces leviers déplacent différemment l’effort entre actifs, retraités et générations.', 'Leviers de retraite'],
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
      ['Une empreinte carbone de consommation inclut notamment…', ['Les émissions liées aux biens importés consommés', 'Uniquement les émissions produites sur le territoire', 'Uniquement les émissions directes des ménages', 'Uniquement les émissions des entreprises françaises à l’étranger'], 0, 'Elle regarde les émissions associées à ce que l’on consomme, y compris celles produites ailleurs.', 'Empreinte carbone'],
      ['Le kWh mesure principalement…', ['Une quantité d’énergie', 'Une puissance disponible à un instant', 'Une intensité carbone', 'Un coût par unité d’énergie'], 0, 'Le kilowattheure est une quantité d’énergie ; le kilowatt mesure une puissance.', 'Énergie et puissance'],
      ['Pour un réseau électrique, production et consommation doivent…', ['Être équilibrées en temps réel', 'Être égales uniquement sur l’année', 'Être égales uniquement sur la journée', 'Être égales uniquement au moment de la pointe hivernale'], 0, 'RTE ajuste le système pour maintenir l’équilibre à chaque instant.', 'Équilibre électrique'],
      ['Pourquoi la météo compte-t-elle pour l’éolien et le solaire ?', ['Leur production varie avec vent et soleil', 'Leur coût d’installation varie chaque heure', 'Leur puissance installée varie avec les saisons', 'Leur production est pilotée uniquement par la demande'], 0, 'Une production variable nécessite de penser flexibilité, stockage, réseaux et autres moyens.', 'Production variable'],
      ['Un budget carbone fixe…', ['Une quantité d’émissions à ne pas dépasser sur une période', 'Une enveloppe d’euros réservée aux énergies fossiles', 'Un plafond annuel de consommation d’électricité', 'Un prix maximal de la tonne de carbone'], 0, 'Un budget carbone exprime une contrainte cumulative sur les émissions.', 'Budget carbone'],
      ['Un équipement moins polluant à l’usage peut malgré tout nécessiter…', ['Des ressources et émissions lors de sa fabrication', 'Aucune émission avant sa première utilisation', 'Un impact nul pendant son recyclage', 'Des émissions limitées à son lieu d’usage'], 0, 'Comparer des solutions suppose de considérer leur cycle de vie, pas seulement l’usage.', 'Cycle de vie'],
      ['Pourquoi une aide climatique peut-elle être ciblée selon le revenu ?', ['L’investissement initial n’est pas finançable pour tous', 'Tous les ménages ont la même capacité d’emprunt', 'Une aide uniforme profite toujours davantage aux plus modestes', 'Le coût d’une rénovation est déjà payé par les économies futures'], 0, 'Le coût initial d’une rénovation ou d’un véhicule peut être un obstacle même si l’opération est utile à terme.', 'Transition juste'],
      ['Si une activité polluante fait supporter des coûts à d’autres, il s’agit d’une…', ['Externalité négative', 'Externalité positive', 'Coût privé entièrement internalisé', 'Transfert sans effet sur les tiers'], 0, 'Une externalité est un effet sur des tiers qui n’est pas entièrement payé par celui qui le provoque.', 'Externalité'],
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
      ['La densification consiste à…', ['Accueillir davantage d’usages sur une surface déjà urbanisée', 'Étendre la ville sur des terres agricoles', 'Augmenter uniquement la hauteur maximale autorisée', 'Construire des logements sans services ni transports'], 0, 'La densification cherche à utiliser plus intensément le foncier déjà bâti ou aménagé.', 'Densification'],
      ['Artificialiser un sol, c’est notamment…', ['Altérer durablement ses fonctions par l’occupation ou l’usage', 'Y construire uniquement un immeuble', 'Modifier son prix sans en changer l’usage', 'Y planter des arbres après un chantier'], 0, 'L’artificialisation concerne les fonctions du sol, pas seulement la présence visible de béton.', 'Artificialisation'],
      ['Pourquoi une construction en périphérie peut-elle avoir un coût caché ?', ['Elle peut allonger trajets et réseaux', 'Elle augmente toujours les loyers du centre', 'Elle rend inutiles les transports collectifs', 'Elle évite tous les coûts d’équipement public'], 0, 'L’éloignement peut nécessiter routes, réseaux et déplacements supplémentaires.', 'Étalement urbain'],
      ['Transformer une friche déjà aménagée peut aider à…', ['Créer des usages sans ouvrir autant de nouveaux sols naturels', 'Garantir des travaux moins chers que sur un terrain vierge', 'Supprimer l’obligation d’étudier les sols', 'Créer automatiquement plus de logements sociaux'], 0, 'Le renouvellement urbain peut limiter l’extension sur les espaces naturels, agricoles et forestiers.', 'Friche'],
      ['Un plafonnement des loyers crée-t-il directement de nouveaux logements ?', ['Non, il encadre un prix', 'Oui, car tout prix plafonné accroît la construction', 'Non, car il réduit toujours le nombre de logements', 'Oui, car il rend tout terrain constructible'], 0, 'Un encadrement agit directement sur le loyer autorisé ; ses effets sur l’offre demandent une analyse séparée.', 'Prix et quantité'],
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
      ['Le « reste à charge » désigne…', ['La somme payée par le patient après remboursements', 'La somme avancée avant tout remboursement', 'Le coût total du soin pour l’assurance maladie', 'La part des dépenses non remboursées aux établissements'], 0, 'Il permet de regarder ce que la couverture laisse effectivement au patient.', 'Reste à charge'],
      ['Une politique de prévention cherche principalement à…', ['Réduire la survenue ou la gravité des problèmes de santé', 'Traiter uniquement les maladies déjà déclarées', 'Remplacer toutes les consultations médicales', 'Réduire seulement le prix des médicaments'], 0, 'Prévenir peut agir avant qu’une maladie ne survienne ou ne s’aggrave.', 'Prévention'],
      ['La densité médicale compare…', ['Le nombre de professionnels à une population ou un territoire', 'Le nombre de patients effectivement soignés chaque jour', 'Le temps moyen d’attente par consultation', 'Le nombre d’habitants au budget de l’hôpital'], 0, 'La densité de professionnels est un indicateur d’offre, à compléter par leurs spécialités et leur disponibilité.', 'Densité médicale'],
      ['Pourquoi une hausse du nombre de consultations ne suffit-elle pas à juger un système ?', ['Elle ne renseigne pas seule sur la qualité et les besoins', 'Elle mesure directement la baisse de mortalité', 'Elle prouve que chaque patient a reçu un soin utile', 'Elle indique seulement le nombre de soignants disponibles'], 0, 'Le volume d’activité doit être rapproché des résultats de santé, des besoins et des inégalités.', 'Indicateurs de santé'],
      ['Le renoncement aux soins déclaré dans une enquête dépend aussi…', ['De la formulation de la question', 'Uniquement du taux de remboursement officiel', 'Uniquement du nombre de médecins inscrits', 'Seulement du budget national de santé'], 0, 'La Drees montre que les réponses peuvent varier selon les mots employés pour interroger les personnes.', 'Mesure du renoncement'],
      ['Une campagne de dépistage doit évaluer aussi…', ['Les faux positifs et les bénéfices réels', 'Uniquement le nombre de tests réalisés', 'Le nombre de cas détectés sans comparaison', 'Seulement le coût unitaire de chaque test'], 0, 'Détecter davantage ne suffit pas : il faut comparer bénéfices, erreurs et effets indésirables.', 'Dépistage'],
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
      ['Le Conseil constitutionnel peut notamment…', ['Contrôler la conformité d’une loi à la Constitution', 'Proposer le budget annuel au Parlement', 'Trancher tout litige civil entre particuliers', 'Adopter les lois ordinaires en dernier ressort'], 0, 'Son contrôle porte notamment sur la constitutionnalité de textes et la régularité de certaines élections.', 'Contrôle constitutionnel'],
      ['Pourquoi une promesse présidentielle peut-elle nécessiter une majorité parlementaire ?', ['Parce que changer la loi passe par le Parlement', 'Parce qu’un référendum est obligatoire pour toute réforme', 'Parce que les ministres sont élus par les députés', 'Parce que le Conseil constitutionnel rédige les lois'], 0, 'Nombre de réformes annoncées exigent un texte législatif et donc une procédure parlementaire.', 'Majorité parlementaire'],
      ['La séparation des pouvoirs vise surtout à…', ['Limiter la concentration du pouvoir', 'Donner le dernier mot aux juges sur tout choix politique', 'Empêcher tout contrôle du Gouvernement', 'Confier la loi au seul pouvoir exécutif'], 0, 'Répartir les fonctions de décision et de contrôle réduit le risque d’arbitraire.', 'Contre-pouvoirs'],
      ['Une loi et un décret sont…', ['Deux types d’actes juridiques distincts', 'Deux textes toujours adoptés par le Parlement', 'Deux textes de même portée et de même auteur', 'Deux décisions toujours soumises au référendum'], 0, 'Le domaine de la loi relève du Parlement ; les actes réglementaires relèvent de l’exécutif selon les règles applicables.', 'Loi et règlement'],
      ['Un scrutin proportionnel cherche à…', ['Rapprocher la part des sièges de la part des voix', 'Garantir une majorité absolue au premier parti', 'Donner un siège à chaque candidat quel que soit son score', 'Faire élire les députés par les seuls élus locaux'], 0, 'La proportionnelle vise une représentation des forces politiques selon leurs voix, avec des variantes de méthode.', 'Proportionnelle'],
      ['Un référendum permet de…', ['Consulter directement les électeurs sur une question prévue par le droit', 'Soumettre toute loi automatiquement au vote populaire', 'Permettre au président d’écarter le Parlement sur tout sujet', 'Faire voter les seuls élus locaux sur une loi'], 0, 'Ses conditions, son objet et ses effets dépendent du cadre juridique utilisé.', 'Référendum'],
      ['Le contrôle d’une décision publique peut avoir quel coût apparent ?', ['Ralentir la décision tout en réduisant les risques d’erreur ou d’abus', 'Accélérer toute décision en supprimant les débats', 'Garantir qu’aucune décision contestée ne sera adoptée', 'Empêcher définitivement toute erreur publique'], 0, 'Les contre-pouvoirs prennent du temps mais contribuent à la légitimité et à la qualité des décisions.', 'Délibération'],
      ['Pour savoir si un candidat peut appliquer une proposition, il faut vérifier…', ['Quelle institution possède la compétence', 'Seulement le soutien dans les sondages', 'Seulement la popularité de la proposition', 'Uniquement le nombre de ministres favorables'], 0, 'L’État, le Parlement, les collectivités et l’Union européenne n’ont pas les mêmes pouvoirs.', 'Compétence'],
    ],
  },
  {
    id: 'europe', title: 'Europe et échanges', shortTitle: 'Europe', color: '#6b7caa',
    description: 'Situer les décisions françaises dans les règles et interdépendances européennes.',
    sources: [
      { label: 'Domaines d’action de l’UE — Commission européenne', url: 'https://commission.europa.eu/about/role/law/areas-eu-action_en' },
      { label: 'Principe de subsidiarité — Parlement européen', url: 'https://www.europarl.europa.eu/factsheets/fr/sheet/7/subsidiaritetsprincipen' },
    ],
    questions: [
      ['L’Union européenne ne peut agir que dans les domaines…', ['Que les États lui ont attribués par les traités', 'Que la Commission juge prioritaires sans base juridique', 'Qui concernent au moins deux pays', 'Où le Parlement européen a déjà voté une résolution'], 0, 'Le principe d’attribution délimite les compétences de l’Union.', 'Attribution des compétences'],
      ['La subsidiarité pose quelle question ?', ['L’action commune est-elle mieux menée au niveau européen ?', 'Faut-il l’unanimité dans tous les votes européens ?', 'Le droit européen prime-t-il toujours sur la Constitution ?', 'Le budget européen doit-il être équilibré ?'], 0, 'Dans les compétences non exclusives, l’Union doit justifier la valeur ajoutée de son action.', 'Subsidiarité'],
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
      ['Un groupe très différent des autres reçoit une réforme. Quel risque pour l’évaluation ?', ['Confondre effet de la réforme et différence initiale', 'Éliminer automatiquement les facteurs cachés', 'Mesurer uniquement une erreur de calcul', 'Garantir que le groupe non traité est comparable'], 0, 'Un biais de sélection peut fausser une comparaison simple entre bénéficiaires et non-bénéficiaires.', 'Biais de sélection'],
      ['Une prévision dépend d’hypothèses. Que faut-il vérifier ?', ['Les hypothèses et l’intervalle d’incertitude', 'Seulement la valeur centrale annoncée', 'Seulement la précision des décimales', 'Uniquement la date de publication'], 0, 'Une projection n’est pas une certitude ; ses conditions de validité doivent être explicites.', 'Projection'],
      ['Pour décider à partir d’un chiffre, quelle question vient en premier ?', ['Que mesure-t-il exactement et qui l’a produit ?', 'Quelle conclusion politique en découle immédiatement ?', 'Quel autre indicateur peut être ignoré ?', 'Le graphique confirme-t-il la tendance souhaitée ?'], 0, 'Définition, méthode, source et période sont nécessaires avant d’interpréter un indicateur.', 'Lecture critique'],
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
