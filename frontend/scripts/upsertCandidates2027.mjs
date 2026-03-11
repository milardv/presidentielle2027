import { initializeApp } from 'firebase/app'
import { getFirebaseConfig } from './firebaseConfig.mjs'
import { doc, getDocs, collection, writeBatch, getFirestore } from 'firebase/firestore'

const firebaseConfig = getFirebaseConfig()

const CANDIDATES_COLLECTION = 'candidates_2027'
const DATA_LAST_UPDATED = '2026-03-11'
const DRY_RUN = process.argv.includes('--dry-run')

const wikipediaAccessDate = '2026-03-11'
const assemblyAccessDate = '2026-03-11'
const justiceAccessDate = '2026-03-11'
const officialAccessDate = '2026-03-11'

const raphaelSources = {
  official: {
    label: 'Place publique',
    url: 'https://place-publique.eu/nos-elus/raphael-glucksmann/',
    date: '2021-03-17',
  },
  primary: {
    label: 'Le Monde',
    url: 'https://www.lemonde.fr/politique/article/2025/05/23/raphael-glucksmann-sur-l-election-presidentielle-de-2027-je-ne-participerai-pas-a-une-primaire_6608026_823448.html',
    date: '2025-05-23',
  },
  platform: {
    label: 'Le Monde',
    url: 'https://www.lemonde.fr/en/politics/article/2025/06/24/raphael-glucksmann-sets-out-policy-platform-for-2027-french-presidential-election_6742671_5.html',
    date: '2025-06-24',
  },
  congress: {
    label: 'Place publique',
    url: 'https://place-publique.eu/congres-place-publique/',
    date: '2025-03-16',
  },
  europarl: {
    label: 'Parlement européen',
    url: 'https://www.europarl.europa.eu/meps/fr/197478/RAPHAEL_GLUCKSMANN/cv',
    date: officialAccessDate,
  },
  wiki: {
    label: 'Wikipedia',
    url: 'https://fr.wikipedia.org/wiki/Rapha%C3%ABl_Glucksmann',
    date: wikipediaAccessDate,
  },
}

const attalSources = {
  assembly: {
    label: 'Assemblée nationale',
    url: 'https://www.assemblee-nationale.fr/dyn/deputes/PA722190',
    date: assemblyAccessDate,
  },
  path2027: {
    label: 'TF1 Info',
    url: 'https://www.tf1info.fr/politique/election-presidentielle-2027-attal-souhaite-proposer-un-chemin-aux-francais-pour-2027-2381173.html',
    date: '2025-07-05',
  },
  speech2027: {
    label: 'TF1 Info',
    url: 'https://www.tf1info.fr/politique/discours-gabriel-attal-je-savais-que-la-france-en-paierait-le-prix-attal-tacle-macron-sur-la-dissolution-et-pose-des-jalons-pour-2027-2395927.html',
    date: '2025-09-21',
  },
  lcp: {
    label: 'LCP',
    url: 'https://lcp.fr/actualites/gabriel-attal-le-candidat-pressenti-pour-2027-est-il-l-homme-fort-de-la-macronie-323615',
    date: '2025-09-11',
  },
  wiki: {
    label: 'Wikipedia',
    url: 'https://fr.wikipedia.org/wiki/Gabriel_Attal',
    date: wikipediaAccessDate,
  },
}

const melenchonSources = {
  official: {
    label: 'La France insoumise',
    url: 'https://lafranceinsoumise.fr/les-parlementaires-de-la-france-insoumise/jeanlucmelenchon/',
    date: '2020-09-24',
  },
  insoumise2027: {
    label: 'RMC BFMTV',
    url: 'https://rmc.bfmtv.com/actualites/politique/le-ps-n-est-plus-notre-allie-il-y-aura-une-candidature-insoumise-en-2027-annonce-melenchon_AV-202502160097.html',
    date: '2025-02-16',
  },
  reiteration: {
    label: 'BFMTV',
    url: 'https://www.bfmtv.com/politique/la-france-insoumise/video-presidentielle-2027-il-y-aura-une-candidature-insoumise-declare-jean-luc-melenchon_VN-202508230249.html',
    date: '2025-08-23',
  },
  strategy: {
    label: 'Jean-Luc Melenchon',
    url: 'https://melenchon.fr/wp-content/uploads/2026/02/1.-COMMENT-FAIRE-E2.pdf',
    date: '2026-02-10',
  },
  biography: {
    label: 'Jean-Luc Melenchon',
    url: 'https://melenchon.fr/biographie/',
    date: officialAccessDate,
  },
  wiki: {
    label: 'Wikipedia',
    url: 'https://fr.wikipedia.org/wiki/Jean-Luc_M%C3%A9lenchon',
    date: wikipediaAccessDate,
  },
}

const retailleauSources = {
  lr: {
    label: 'Les Républicains',
    url: 'https://republicains.fr/actualites/2025/06/30/bruno-retailleau-conseil-national-lr/',
    date: '2025-06-30',
  },
  tf1: {
    label: 'TF1 Info',
    url: 'https://www.tf1info.fr/politique/bruno-retailleau-candidat-a-la-presidentielle-2027-il-sera-l-invite-du-20h-de-tf1-ce-soir-2424402.html',
    date: '2026-02-12',
  },
  senate: {
    label: 'Sénat',
    url: 'https://www.senat.fr/senateur/retailleau_bruno14266k.html',
    date: officialAccessDate,
  },
  wiki: {
    label: 'Wikipedia',
    url: 'https://fr.wikipedia.org/wiki/Bruno_Retailleau',
    date: wikipediaAccessDate,
  },
}

const darmaninSources = {
  justice: {
    label: 'Ministère de la Justice',
    url: 'https://www.justice.gouv.fr/ministere-justice/ministre',
    date: justiceAccessDate,
  },
  participates: {
    label: 'TF1 Info',
    url: 'https://www.tf1info.fr/politique/gerald-darmanin-participera-d-une-maniere-ou-d-une-autre-a-l-election-presidentielle-de-2027-2350560.html',
    date: '2025-02-13',
  },
  capable: {
    label: 'TF1 Info',
    url: 'https://www.tf1info.fr/politique/presidentielle-2027-gerald-darmanin-y-songe-et-se-sent-capable-d-etre-le-candidat-de-son-camp-2420721.html',
    date: '2026-01-25',
  },
  movement: {
    label: 'Le Monde',
    url: 'https://www.lemonde.fr/politique/article/2025/08/31/a-tourcoing-gerald-darmanin-tend-la-main-aux-socialistes-et-fait-valoir-sa-fibre-sociale_6637931_823448.html',
    date: '2025-08-31',
  },
  populaires: {
    label: 'Les Populaires',
    url: 'https://les-populaires.fr/',
    date: officialAccessDate,
  },
  wiki: {
    label: 'Wikipedia',
    url: 'https://fr.wikipedia.org/wiki/G%C3%A9rald_Darmanin',
    date: wikipediaAccessDate,
  },
}

const candidates = [
  {
    id: 'raphael-glucksmann',
    name: 'Raphaël Glucksmann',
    bloc: 'Centre gauche',
    party: 'Place publique',
    status: 'intent',
    statusLabel: 'Intention déclarée',
    summary:
      'Député européen et coprésident de Place publique, il refuse une primaire de la gauche et pousse une offre autonome en vue de 2027.',
    themes: ['Europe', 'Réindustrialisation', 'Social-démocratie'],
    priority: 9,
    photoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/1720448398743_20240708_GLUCKSMANN_Raphael_FR_006.jpg/330px-1720448398743_20240708_GLUCKSMANN_Raphael_FR_006.jpg',
    currentRole: 'Député européen et coprésident de Place publique',
    biography: [
      'Né en 1979, Raphaël Glucksmann s’est d’abord imposé comme essayiste et réalisateur avant d’entrer dans la vie politique élective.',
      'Il siège au Parlement européen depuis 2019 et a conduit les listes PS-Place publique aux européennes de 2019 puis de 2024.',
      'En vue de 2027, il cherche à installer une offre sociale-démocrate autonome, pro-européenne et distincte des logiques de primaire.',
    ],
    keyPositions: [
      {
        topic: 'Présidentielle 2027',
        summary:
          'Il exclut de participer à une primaire de la gauche et préfère construire une offre autonome pour 2027.',
        source: raphaelSources.primary,
      },
      {
        topic: 'Plateforme économique',
        summary:
          'Il met en avant une ligne de réindustrialisation, de réforme de la gouvernance des entreprises et de justice sociale.',
        source: raphaelSources.platform,
      },
      {
        topic: 'Ancrage politique',
        summary:
          'Il incarne la ligne pro-européenne et sociale-démocrate portée par Place publique.',
        source: raphaelSources.official,
      },
    ],
    timeline: [
      {
        date: '2019-05-26',
        title: 'Élu au Parlement européen',
        description: 'Il devient député européen lors des élections européennes de 2019.',
        source: raphaelSources.wiki,
      },
      {
        date: '2024-06-09',
        title: 'Tête de liste PS-Place publique en 2024',
        description: 'Il reconduit son ancrage européen à la tête de la liste commune de centre gauche.',
        source: raphaelSources.wiki,
      },
      {
        date: '2025-05-23',
        title: 'Refus d’une primaire de la gauche',
        description: 'Il ferme la porte à une primaire et assume une stratégie autonome pour 2027.',
        source: raphaelSources.primary,
      },
      {
        date: '2025-06-24',
        title: 'Présentation d’une plateforme 2027',
        description: 'Il expose les premières lignes de sa plateforme pour l’élection présidentielle.',
        source: raphaelSources.platform,
      },
    ],
    themeHighlights: [
      {
        theme: 'Europe',
        analysis: 'Son positionnement reste fortement arrimé à une lecture pro-européenne de la souveraineté et de la puissance française.',
        source: raphaelSources.official,
      },
      {
        theme: 'Réindustrialisation',
        analysis: 'Il inscrit 2027 dans une logique de reconstruction productive et de réforme du capitalisme français.',
        source: raphaelSources.platform,
      },
      {
        theme: 'Autonomie à gauche',
        analysis: 'Le refus de la primaire vise à préserver un espace politique distinct au sein de la gauche réformiste.',
        source: raphaelSources.primary,
      },
    ],
    network: [
      {
        actor: 'Place publique',
        role: 'Coprésident',
        relation: 'Son parti lui sert de base organisationnelle pour structurer une offre sociale-démocrate autonome en vue de 2027.',
        source: raphaelSources.congress,
      },
      {
        actor: 'Parlement européen',
        role: 'Député européen',
        relation: 'Son mandat européen est son principal point d’appui institutionnel et donne de la crédibilité à sa ligne pro-européenne.',
        source: raphaelSources.europarl,
      },
      {
        actor: 'Alliance PS-Place publique',
        role: 'Chef de file électoral',
        relation: 'La coalition nouée aux européennes lui offre un réseau politique au-delà de son seul parti et prépare sa projection nationale.',
        source: raphaelSources.platform,
      },
    ],
    parcours: [
      {
        period: '2008-2013',
        role: 'Conseiller diplomatique',
        institution: 'Présidence géorgienne',
        summary: 'Il accompagne le président Mikheil Saakachvili, première expérience structurante dans les questions internationales.',
        source: raphaelSources.official,
      },
      {
        period: '2018-2019',
        role: 'Fondateur de Place publique puis tête de liste',
        institution: 'Place publique',
        summary: 'Il participe à la fondation de Place publique et mène la liste de centre gauche aux européennes de 2019.',
        source: raphaelSources.official,
      },
      {
        period: '2019-aujourd’hui',
        role: 'Député européen',
        institution: 'Parlement européen',
        summary: 'Il installe sa trajectoire politique autour du mandat européen et des enjeux de souveraineté démocratique.',
        source: raphaelSources.europarl,
      },
    ],
    style: [
      {
        axis: 'Registre',
        description: 'Style réformiste, pro-européen et offensif contre la logique de recomposition imposée par le macronisme.',
        source: raphaelSources.primary,
      },
      {
        axis: 'Narration',
        description: 'Il met en scène une gauche réformatrice, ancrée dans la puissance industrielle et la défense de la démocratie libérale.',
        source: raphaelSources.platform,
      },
      {
        axis: 'Méthode',
        description: 'Son refus de la primaire traduit un style de leadership autonome, peu enclin aux compromis tactiques imposés de l’extérieur.',
        source: raphaelSources.primary,
      },
    ],
    sources: [
      raphaelSources.primary,
      raphaelSources.platform,
      raphaelSources.official,
      raphaelSources.congress,
      raphaelSources.europarl,
      raphaelSources.wiki,
    ],
  },
  {
    id: 'gabriel-attal',
    name: 'Gabriel Attal',
    bloc: 'Centre',
    party: 'Renaissance',
    status: 'intent',
    statusLabel: 'Intention déclarée',
    summary:
      'Ancien Premier ministre et chef de file de Renaissance à l’Assemblée, il pose des jalons pour 2027 sans officialiser de candidature.',
    themes: ['Bloc central', 'Réforme', 'Autorité'],
    priority: 10,
    photoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Gabriel_Attal_2025_%283x4_cropped%29.jpg/330px-Gabriel_Attal_2025_%283x4_cropped%29.jpg',
    currentRole: 'Secrétaire général de Renaissance et président du groupe Ensemble pour la République à l’Assemblée nationale',
    biography: [
      'Né en 1989, Gabriel Attal a occupé plusieurs postes ministériels avant de devenir Premier ministre en 2024.',
      'Après Matignon, il conserve une place centrale dans le bloc macroniste comme chef du groupe Renaissance à l’Assemblée et secrétaire général du parti.',
      'Ses prises de parole de 2025 montrent qu’il travaille déjà une perspective nationale pour 2027.',
    ],
    keyPositions: [
      {
        topic: 'Perspective 2027',
        summary:
          'Il explique vouloir proposer un chemin aux Français pour 2027, signe d’une projection assumée sur la présidentielle.',
        source: attalSources.path2027,
      },
      {
        topic: 'Relecture de la dissolution',
        summary:
          'Il critique la dissolution de 2024 et s’en sert pour poser ses propres jalons politiques en vue de 2027.',
        source: attalSources.speech2027,
      },
      {
        topic: 'Contrôle de l’appareil central',
        summary:
          'Il cumule une position forte à l’Assemblée nationale et dans l’organisation de Renaissance.',
        source: attalSources.assembly,
      },
    ],
    timeline: [
      {
        date: '2024-01-09',
        title: 'Nomination à Matignon',
        description: 'Il devient Premier ministre et prend une dimension nationale de premier plan.',
        source: attalSources.wiki,
      },
      {
        date: '2025-07-05',
        title: 'Projection publique sur 2027',
        description: 'Il dit vouloir proposer un chemin aux Français pour 2027.',
        source: attalSources.path2027,
      },
      {
        date: '2025-09-21',
        title: 'Discours de repositionnement',
        description: 'Il critique la dissolution et s’installe comme l’un des prétendants majeurs du bloc central.',
        source: attalSources.speech2027,
      },
    ],
    themeHighlights: [
      {
        theme: 'Bloc central',
        analysis: 'Il travaille la reconstruction d’un espace central post-macronien dont il voudrait devenir l’une des incarnations.',
        source: attalSources.speech2027,
      },
      {
        theme: 'Réforme',
        analysis: 'Son discours reste marqué par une promesse de modernisation et d’efficacité publique.',
        source: attalSources.path2027,
      },
      {
        theme: 'Autorité',
        analysis: 'Sa prise de parole publique combine tonalité d’ordre, fermeté et volonté de leadership générationnel.',
        source: attalSources.speech2027,
      },
    ],
    network: [
      {
        actor: 'Renaissance',
        role: 'Secrétaire général',
        relation: 'Le parti lui fournit l’appareil central pour structurer sa projection politique nationale.',
        source: attalSources.path2027,
      },
      {
        actor: 'Groupe Ensemble pour la République',
        role: 'Président de groupe',
        relation: 'La présidence du groupe à l’Assemblée fait de lui le principal point d’appui parlementaire du bloc central.',
        source: attalSources.assembly,
      },
      {
        actor: 'Jeunes macronistes',
        role: 'Relais militants',
        relation: 'Le socle militant générationnel autour d’Attal alimente son image de successeur possible et sa capacité de mobilisation.',
        source: attalSources.lcp,
      },
    ],
    parcours: [
      {
        period: '2017-2022',
        role: 'Membre du gouvernement',
        institution: 'Exécutif français',
        summary: 'Il enchaîne plusieurs portefeuilles ministériels et s’impose comme une figure montante de la macronie.',
        source: attalSources.wiki,
      },
      {
        period: '2024',
        role: 'Premier ministre',
        institution: 'Gouvernement français',
        summary: 'Son passage à Matignon lui donne une stature nationale et un statut d’héritier potentiel du bloc central.',
        source: attalSources.wiki,
      },
      {
        period: '2024-aujourd’hui',
        role: 'Chef de parti et chef de groupe',
        institution: 'Renaissance / Assemblée nationale',
        summary: 'Après Matignon, il consolide simultanément un ancrage partisan et parlementaire pour préparer la suite.',
        source: attalSources.assembly,
      },
    ],
    style: [
      {
        axis: 'Registre',
        description: 'Style offensif et générationnel, cherchant à réarmer politiquement le centre après 2024.',
        source: attalSources.speech2027,
      },
      {
        axis: 'Positionnement',
        description: 'Il combine vocabulaire de responsabilité, promesse d’efficacité et volonté d’incarner le renouveau après le macronisme.',
        source: attalSources.path2027,
      },
      {
        axis: 'Tempo',
        description: 'Ses interventions récentes visent à occuper vite l’espace post-Macron et à parler directement au socle central.',
        source: attalSources.lcp,
      },
    ],
    sources: [
      attalSources.path2027,
      attalSources.speech2027,
      attalSources.lcp,
      attalSources.assembly,
      attalSources.wiki,
    ],
  },
  {
    id: 'jean-luc-melenchon',
    name: 'Jean-Luc Mélenchon',
    bloc: 'Gauche radicale',
    party: 'La France insoumise',
    status: 'conditional',
    statusLabel: 'Hypothèse active',
    summary:
      'Chef de file de La France insoumise, il prépare une offre insoumise pour 2027, refuse la primaire et entretient l’ambiguïté sur son incarnation personnelle.',
    themes: ['Union populaire', 'Rupture', 'Institutions'],
    priority: 11,
    photoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Jean-Luc_M%C3%A9lenchon_2026.png/330px-Jean-Luc_M%C3%A9lenchon_2026.png',
    currentRole: 'Chef de file de La France insoumise',
    biography: [
      'Né en 1951, Jean-Luc Mélenchon est une figure majeure de la gauche radicale française depuis plusieurs décennies.',
      'Fondateur et chef de file de La France insoumise, il a déjà été candidat à l’élection présidentielle en 2012, 2017 et 2022.',
      'Pour 2027, il verrouille la stratégie de son camp en refusant la primaire et en maintenant l’hypothèse de sa propre candidature.',
    ],
    keyPositions: [
      {
        topic: 'Candidature insoumise en 2027',
        summary:
          'Il affirme qu’il y aura une candidature insoumise en 2027, indépendante des logiques d’alliance avec le Parti socialiste.',
        source: melenchonSources.insoumise2027,
      },
      {
        topic: 'Refus de la primaire',
        summary:
          'Il réaffirme publiquement le refus d’une primaire de la gauche, afin de conserver l’autonomie stratégique de LFI.',
        source: melenchonSources.reiteration,
      },
      {
        topic: 'Préparation programmatique',
        summary:
          'Il publie en 2026 un document stratégique qui structure déjà le débat de fond autour de 2027.',
        source: melenchonSources.strategy,
      },
    ],
    timeline: [
      {
        date: '2016-02-10',
        title: 'Lancement de La France insoumise',
        description: 'Il installe un mouvement autonome dont il demeure la figure centrale.',
        source: melenchonSources.wiki,
      },
      {
        date: '2022-04-10',
        title: 'Troisième candidature présidentielle',
        description: 'Il approche de peu le second tour lors de la présidentielle de 2022.',
        source: melenchonSources.wiki,
      },
      {
        date: '2025-02-16',
        title: 'Annonce d’une candidature insoumise en 2027',
        description: 'Il confirme que LFI aura son propre candidat en 2027.',
        source: melenchonSources.insoumise2027,
      },
      {
        date: '2026-02-10',
        title: 'Publication d’un document stratégique',
        description: 'Il diffuse un texte programmatique qui nourrit la préparation politique du prochain cycle présidentiel.',
        source: melenchonSources.strategy,
      },
    ],
    themeHighlights: [
      {
        theme: 'Autonomie insoumise',
        analysis: 'Le refus d’une primaire confirme la volonté de préserver une candidature et une ligne proprement insoumises.',
        source: melenchonSources.insoumise2027,
      },
      {
        theme: 'Rupture',
        analysis: 'Sa stratégie 2027 reste pensée comme une alternative frontale au bloc central comme à la social-démocratie.',
        source: melenchonSources.strategy,
      },
      {
        theme: 'Institutions',
        analysis: 'Le cadre institutionnel et l’idée de refondation demeurent au cœur de son offre politique.',
        source: melenchonSources.strategy,
      },
    ],
    network: [
      {
        actor: 'La France insoumise',
        role: 'Chef de file',
        relation: 'Il reste le centre de gravité stratégique du mouvement et la référence de la ligne insoumise pour 2027.',
        source: melenchonSources.official,
      },
      {
        actor: 'Institut La Boétie',
        role: 'Coprésident',
        relation: 'Le laboratoire d’idées prolonge son influence intellectuelle et alimente la préparation doctrinale de son camp.',
        source: melenchonSources.biography,
      },
      {
        actor: 'Écosystème insoumis',
        role: 'Direction politique informelle',
        relation: 'Son autorité personnelle organise la sélection des thèmes, des cadres et du calendrier stratégique du mouvement.',
        source: melenchonSources.strategy,
      },
    ],
    parcours: [
      {
        period: '2008-2016',
        role: 'Fondateur du Parti de gauche',
        institution: 'Gauche radicale',
        summary: 'Il quitte le Parti socialiste, fonde le Parti de gauche et installe sa propre trajectoire politique nationale.',
        source: melenchonSources.biography,
      },
      {
        period: '2016-aujourd’hui',
        role: 'Chef de file',
        institution: 'La France insoumise',
        summary: 'Il structure un mouvement autonome centré sur l’Union populaire et la rupture avec le bloc central.',
        source: melenchonSources.official,
      },
      {
        period: '2025-2026',
        role: 'Préparateur stratégique de 2027',
        institution: 'Écosystème insoumis',
        summary: 'Il verrouille la ligne autonome de LFI et diffuse un document de cadrage pour préparer le prochain cycle présidentiel.',
        source: melenchonSources.strategy,
      },
    ],
    style: [
      {
        axis: 'Registre',
        description: 'Style tribunitien, conflictuel et fortement centralisé autour de la maîtrise de la ligne du mouvement.',
        source: melenchonSources.reiteration,
      },
      {
        axis: 'Rhétorique',
        description: 'Ses prises de parole privilégient la conflictualité politique, la dramatisation du rapport de force et la clarté de camp.',
        source: melenchonSources.insoumise2027,
      },
      {
        axis: 'Architecture',
        description: 'Il articule discours programmatique long et séquences médiatiques courtes pour garder la main sur le récit insoumis.',
        source: melenchonSources.strategy,
      },
    ],
    sources: [
      melenchonSources.insoumise2027,
      melenchonSources.reiteration,
      melenchonSources.strategy,
      melenchonSources.biography,
      melenchonSources.official,
      melenchonSources.wiki,
    ],
  },
  {
    id: 'bruno-retailleau',
    name: 'Bruno Retailleau',
    bloc: 'Droite',
    party: 'Les Républicains',
    status: 'declared',
    statusLabel: 'Déclaré',
    summary:
      'Président des Républicains, il assume désormais ouvertement une candidature de droite pour l’élection présidentielle de 2027.',
    themes: ['Sécurité', 'Immigration', 'Droite d’autorité'],
    priority: 12,
    photoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Bruno_Retailleau_-_Ministre_de_l%27Int%C3%A9rieur_fran%C3%A7ais_%28cropped%29.jpg/330px-Bruno_Retailleau_-_Ministre_de_l%27Int%C3%A9rieur_fran%C3%A7ais_%28cropped%29.jpg',
    currentRole: 'Président des Républicains',
    biography: [
      'Né en 1960, Bruno Retailleau s’est imposé comme l’une des principales figures de la droite conservatrice au Sénat.',
      'Il a renforcé sa stature nationale après son passage place Beauvau puis son élection à la tête des Républicains en 2025.',
      'Début 2026, il assume explicitement une candidature présidentielle, au cœur de la recomposition de la droite.',
    ],
    keyPositions: [
      {
        topic: 'Candidature 2027',
        summary:
          'Sa candidature présidentielle est désormais présentée comme explicite dans le débat public.',
        source: retailleauSources.tf1,
      },
      {
        topic: 'Contrôle de LR',
        summary:
          'Son élection à la tête des Républicains lui donne l’outil partisan central de la droite classique.',
        source: retailleauSources.lr,
      },
      {
        topic: 'Ligne politique',
        summary:
          'Il assume une ligne de droite d’autorité très marquée sur les enjeux régaliens.',
        source: retailleauSources.wiki,
      },
    ],
    timeline: [
      {
        date: '2025-05-18',
        title: 'Élection à la présidence de LR',
        description: 'Il prend la tête des Républicains et restructure le parti autour de sa ligne.',
        source: retailleauSources.wiki,
      },
      {
        date: '2025-06-30',
        title: 'Première séquence de chef de parti',
        description: 'Le conseil national de LR installe sa légitimité interne et sa ligne politique.',
        source: retailleauSources.lr,
      },
      {
        date: '2026-02-12',
        title: 'Candidature assumée pour 2027',
        description: 'Le débat public le présente comme candidat déclaré à la présidentielle.',
        source: retailleauSources.tf1,
      },
    ],
    themeHighlights: [
      {
        theme: 'Sécurité',
        analysis: 'Il cherche à incarner une droite de fermeté et d’autorité sur les enjeux régaliens.',
        source: retailleauSources.tf1,
      },
      {
        theme: 'Immigration',
        analysis: 'La maîtrise migratoire fait partie de ses marqueurs politiques les plus identifiables.',
        source: retailleauSources.wiki,
      },
      {
        theme: 'Parti de droite',
        analysis: 'Sa main sur LR lui donne un avantage d’organisation dans la préparation de 2027.',
        source: retailleauSources.lr,
      },
    ],
    network: [
      {
        actor: 'Les Républicains',
        role: 'Président',
        relation: 'La présidence du parti lui donne la machine militante et l’autorité interne nécessaires pour préparer 2027.',
        source: retailleauSources.lr,
      },
      {
        actor: 'Sénat',
        role: 'Sénateur de Vendée',
        relation: 'Son ancrage sénatorial nourrit son image d’élu de droite expérimenté et sa crédibilité sur les dossiers régaliens.',
        source: retailleauSources.senate,
      },
      {
        actor: 'Droite régalienne',
        role: 'Pôle idéologique',
        relation: 'Il fédère une droite d’autorité autour des questions d’immigration, de sécurité et d’ordre.',
        source: retailleauSources.tf1,
      },
    ],
    parcours: [
      {
        period: '2004-2010',
        role: 'Président du groupe de la majorité',
        institution: 'Conseil régional des Pays de la Loire',
        summary: 'Il construit un socle politique local solide avant sa montée en puissance nationale.',
        source: retailleauSources.senate,
      },
      {
        period: '2004-aujourd’hui',
        role: 'Sénateur',
        institution: 'Sénat',
        summary: 'Le Sénat devient sa base institutionnelle durable et le lieu où il affine sa ligne politique.',
        source: retailleauSources.senate,
      },
      {
        period: '2025-aujourd’hui',
        role: 'Président des Républicains',
        institution: 'Les Républicains',
        summary: 'Sa victoire à la tête du parti l’installe comme l’un des principaux prétendants de la droite pour 2027.',
        source: retailleauSources.lr,
      },
    ],
    style: [
      {
        axis: 'Registre',
        description: 'Style de droite d’autorité, sobre dans la forme mais très affirmé sur le fond régalien.',
        source: retailleauSources.tf1,
      },
      {
        axis: 'Tonalité',
        description: 'Il privilégie un discours grave, ferme et hiérarchisé, visant à réinstaller une autorité politique classique.',
        source: retailleauSources.lr,
      },
      {
        axis: 'Cadre politique',
        description: 'Sa communication met en avant la continuité doctrinale de la droite républicaine plutôt qu’un récit de rupture personnelle.',
        source: retailleauSources.senate,
      },
    ],
    sources: [retailleauSources.tf1, retailleauSources.lr, retailleauSources.senate, retailleauSources.wiki],
  },
  {
    id: 'gerald-darmanin',
    name: 'Gérald Darmanin',
    bloc: 'Centre droit',
    party: 'Populaires',
    status: 'intent',
    statusLabel: 'Intention déclarée',
    summary:
      'Garde des Sceaux et animateur du mouvement Populaires, il assume de réfléchir à 2027 et se dit capable de porter son camp.',
    themes: ['Justice', 'Sécurité', 'Droite sociale'],
    priority: 13,
    photoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/French_Justice_Minister_G%C3%A9rald_Darmanin_in_2025_%28cropped_1%29.jpg/330px-French_Justice_Minister_G%C3%A9rald_Darmanin_in_2025_%28cropped_1%29.jpg',
    currentRole: 'Garde des Sceaux, ministre de la Justice',
    biography: [
      'Né en 1982, Gérald Darmanin a bâti sa trajectoire entre implantation locale à Tourcoing et responsabilités ministérielles de premier plan.',
      'Après avoir dirigé l’Intérieur, il devient garde des Sceaux et structure parallèlement son propre mouvement, Populaires.',
      'Ses déclarations de 2025 et 2026 montrent une ambition présidentielle désormais assumée, à droite et au centre.',
    ],
    keyPositions: [
      {
        topic: 'Participation à 2027',
        summary:
          'Il affirme qu’il participera d’une manière ou d’une autre à la présidentielle de 2027.',
        source: darmaninSources.participates,
      },
      {
        topic: 'Capacité à être candidat',
        summary:
          'Il déclare y songer et se sentir capable d’être le candidat de son camp.',
        source: darmaninSources.capable,
      },
      {
        topic: 'Construction d’un mouvement propre',
        summary:
          'Son mouvement Populaires sert d’appui à une ligne de droite sociale distincte du simple appareil présidentiel.',
        source: darmaninSources.movement,
      },
    ],
    timeline: [
      {
        date: '2024-09-29',
        title: 'Lancement de Populaires',
        description: 'Il lance son propre mouvement politique pour préparer les prochaines échéances.',
        source: darmaninSources.movement,
      },
      {
        date: '2025-02-13',
        title: 'Entrée assumée dans le jeu de 2027',
        description: 'Il indique qu’il participera d’une manière ou d’une autre à l’élection présidentielle.',
        source: darmaninSources.participates,
      },
      {
        date: '2026-01-25',
        title: 'Ambition présidentielle explicite',
        description: 'Il dit penser à 2027 et se sentir capable d’être candidat.',
        source: darmaninSources.capable,
      },
    ],
    themeHighlights: [
      {
        theme: 'Justice',
        analysis: 'Sa position à la Chancellerie renforce son profil d’ordre et de maîtrise de l’appareil d’État.',
        source: darmaninSources.justice,
      },
      {
        theme: 'Droite sociale',
        analysis: 'Avec Populaires, il cherche à combiner autorité et discours tourné vers les classes populaires.',
        source: darmaninSources.movement,
      },
      {
        theme: 'Présidentielle 2027',
        analysis: 'Il ne se contente plus d’une influence indirecte et travaille désormais sa propre hypothèse présidentielle.',
        source: darmaninSources.capable,
      },
    ],
    network: [
      {
        actor: 'Ministère de la Justice',
        role: 'Garde des Sceaux',
        relation: 'La Chancellerie lui donne un levier institutionnel fort pour nourrir son image d’homme d’autorité.',
        source: darmaninSources.justice,
      },
      {
        actor: 'Les Populaires',
        role: 'Fondateur',
        relation: 'Son propre mouvement lui permet de s’émanciper partiellement du seul appareil présidentiel et de tester une offre politique autonome.',
        source: darmaninSources.populaires,
      },
      {
        actor: 'Tourcoing',
        role: 'Ancrage territorial',
        relation: 'La mise en scène régulière de Tourcoing nourrit sa ligne de droite sociale et populaire.',
        source: darmaninSources.movement,
      },
    ],
    parcours: [
      {
        period: '2014-2020',
        role: 'Maire',
        institution: 'Tourcoing',
        summary: 'Son implantation locale à Tourcoing sert de base durable à sa trajectoire politique nationale.',
        source: darmaninSources.wiki,
      },
      {
        period: '2017-2024',
        role: 'Ministre puis ministre de l’Intérieur',
        institution: 'Gouvernements français',
        summary: 'Il s’impose comme l’un des visages les plus visibles du pouvoir exécutif sur les sujets régaliens.',
        source: darmaninSources.wiki,
      },
      {
        period: '2024-aujourd’hui',
        role: 'Garde des Sceaux et fondateur de Populaires',
        institution: 'Justice / mouvement politique',
        summary: 'Il combine appareil d’État et structuration d’un mouvement propre pour préparer son avenir politique.',
        source: darmaninSources.populaires,
      },
    ],
    style: [
      {
        axis: 'Registre',
        description: 'Style direct, axé sur l’autorité et la proximité avec les classes populaires.',
        source: darmaninSources.movement,
      },
      {
        axis: 'Narration',
        description: 'Il cherche à concilier ordre républicain et récit de mobilité sociale pour élargir son socle à droite comme au centre.',
        source: darmaninSources.capable,
      },
      {
        axis: 'Incarnation',
        description: 'Sa communication repose sur la personnalisation, la franchise revendiquée et l’affichage d’une disponibilité pour 2027.',
        source: darmaninSources.participates,
      },
    ],
    sources: [
      darmaninSources.capable,
      darmaninSources.participates,
      darmaninSources.movement,
      darmaninSources.populaires,
      darmaninSources.justice,
      darmaninSources.wiki,
    ],
  },
].map((candidate) => ({ ...candidate, dataLastUpdated: DATA_LAST_UPDATED }))

async function main() {
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  const existingSnapshot = await getDocs(collection(db, CANDIDATES_COLLECTION))
  const existingIds = new Set(existingSnapshot.docs.map((entry) => entry.id))

  console.log(`Preparing ${candidates.length} candidate documents for ${CANDIDATES_COLLECTION}.`)
  console.log(`Existing documents before upsert: ${existingSnapshot.size}`)

  for (const candidate of candidates) {
    console.log(`- ${existingIds.has(candidate.id) ? 'update' : 'create'} ${candidate.id}`)
  }

  if (DRY_RUN) {
    console.log('Dry run enabled. No data written.')
    return
  }

  const batch = writeBatch(db)
  for (const candidate of candidates) {
    batch.set(doc(db, CANDIDATES_COLLECTION, candidate.id), candidate, { merge: true })
  }

  await batch.commit()

  const updatedSnapshot = await getDocs(collection(db, CANDIDATES_COLLECTION))
  console.log(`Collection size after upsert: ${updatedSnapshot.size}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
