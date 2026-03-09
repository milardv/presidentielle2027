import { initializeApp } from 'firebase/app'
import { getFirebaseConfig } from './firebaseConfig.mjs'
import { doc, getDocs, collection, writeBatch, getFirestore } from 'firebase/firestore'

const firebaseConfig = getFirebaseConfig()

const CANDIDATES_COLLECTION = 'candidates_2027'
const DATA_LAST_UPDATED = '2026-03-09'
const DRY_RUN = process.argv.includes('--dry-run')

const wikipediaAccessDate = '2026-03-09'
const assemblyAccessDate = '2026-03-09'
const justiceAccessDate = '2026-03-09'

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
    style: [
      {
        axis: 'Registre',
        description: 'Style réformiste, pro-européen et offensif contre la logique de recomposition imposée par le macronisme.',
        source: raphaelSources.primary,
      },
    ],
    sources: [raphaelSources.primary, raphaelSources.platform, raphaelSources.official, raphaelSources.wiki],
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
    currentRole: 'Secrétaire général de Renaissance et président du groupe Renaissance à l’Assemblée nationale',
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
    style: [
      {
        axis: 'Registre',
        description: 'Style offensif et générationnel, cherchant à réarmer politiquement le centre après 2024.',
        source: attalSources.speech2027,
      },
    ],
    sources: [attalSources.path2027, attalSources.speech2027, attalSources.assembly, attalSources.wiki],
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
    style: [
      {
        axis: 'Registre',
        description: 'Style tribunitien, conflictuel et fortement centralisé autour de la maîtrise de la ligne du mouvement.',
        source: melenchonSources.reiteration,
      },
    ],
    sources: [
      melenchonSources.insoumise2027,
      melenchonSources.reiteration,
      melenchonSources.strategy,
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
    style: [
      {
        axis: 'Registre',
        description: 'Style de droite d’autorité, sobre dans la forme mais très affirmé sur le fond régalien.',
        source: retailleauSources.tf1,
      },
    ],
    sources: [retailleauSources.tf1, retailleauSources.lr, retailleauSources.wiki],
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
    style: [
      {
        axis: 'Registre',
        description: 'Style direct, axé sur l’autorité et la proximité avec les classes populaires.',
        source: darmaninSources.movement,
      },
    ],
    sources: [
      darmaninSources.capable,
      darmaninSources.participates,
      darmaninSources.movement,
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
