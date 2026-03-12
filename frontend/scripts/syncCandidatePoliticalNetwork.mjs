import { initializeApp } from 'firebase/app'
import { doc, getDoc, getFirestore, writeBatch } from 'firebase/firestore'
import { getFirebaseConfig } from './firebaseConfig.mjs'

const CANDIDATES_COLLECTION = 'candidates_2027'
const DATA_LAST_UPDATED = '2026-03-12'
const DRY_RUN = process.argv.includes('--dry-run')

const officialSource = (label, url, date = '2026-03-12') => ({ label, url, date })
const pressSource = (label, url, date) => ({ label, url, date })

const candidateNetworks = {
  'edouard-philippe': [
    {
      actor: 'Horizons',
      role: 'Base partisane',
      relation: 'Le parti Horizons constitue son appareil politique et sa plateforme de préparation pour 2027.',
      tone: 'ally',
      source: officialSource('Horizons', 'https://horizonsleparti.fr/'),
    },
    {
      actor: 'Gabriel Attal',
      role: 'Rival du bloc central',
      relation: "Leur rapport de force structure la compétition pour représenter le centre et l'héritage macroniste en 2027.",
      tone: 'rival',
      source: pressSource(
        'Le Parisien',
        'https://www.leparisien.fr/politique/qui-pour-representer-le-centre-a-la-presidentielle-2027-gabriel-attal-et-edouard-philippe-au-coude-a-coude-selon-un-sondage-28-01-2026-H2C33AWYMVDUFJLMYOT7SO6II4.php',
        '2026-01-28',
      ),
    },
    {
      actor: 'Gérald Darmanin',
      role: 'Rival du bloc central',
      relation: 'Darmanin travaille aussi sa propre offre et conteste la hiérarchie implicite du centre droit autour de Philippe.',
      tone: 'rival',
      source: pressSource(
        'Le Parisien',
        'https://www.leparisien.fr/politique/gerald-darmanin-ne-veut-pas-se-faire-oublier-02-05-2025-X5CF6R4QWZB4DGSJMT3NOPZLLM.php',
        '2025-05-02',
      ),
    },
  ],
  'xavier-bertrand': [
    {
      actor: 'Les Républicains',
      role: 'Famille politique',
      relation: 'Même en gardant son autonomie, Xavier Bertrand reste inscrit dans le jeu de la droite LR pour 2027.',
      tone: 'ally',
      source: officialSource(
        'Région Hauts-de-France',
        'https://nivo.hautsdefrance.fr/mentions',
      ),
    },
    {
      actor: 'Bruno Retailleau',
      role: 'Concurrent à droite',
      relation: 'Bertrand soutient Retailleau pour le parti mais refuse de lui reconnaître un monopole sur la candidature de droite en 2027.',
      tone: 'rival',
      source: pressSource(
        'RMC BFMTV',
        'https://rmc.bfmtv.com/actualites/politique/bruno-retailleau-meilleur-candidat-a-droite-pour-2027-ca-je-ne-suis-pas-sur-ironise-xavier-bertrand_AV-202502260476.html',
        '2025-02-26',
      ),
    },
    {
      actor: 'Laurent Wauquiez',
      role: 'Concurrent à droite',
      relation: "La bataille LR réactive la concurrence entre plusieurs prétendants de droite, dont Wauquiez et Bertrand, en vue de 2027.",
      tone: 'rival',
      source: pressSource(
        'Le Monde',
        'https://www.lemonde.fr/politique/article/2025/02/14/laurent-wauquiez-lance-son-duel-a-distance-avec-bruno-retailleau-pour-prendre-la-tete-des-republicains_6545995_823448.html',
        '2025-02-14',
      ),
    },
  ],
  'nathalie-arthaud': [
    {
      actor: 'Lutte Ouvrière',
      role: 'Appareil militant',
      relation: 'LO reste sa structure centrale, qui porte sa ligne révolutionnaire et sa présence présidentielle répétée.',
      tone: 'ally',
      source: officialSource(
        'Lutte Ouvrière',
        'https://www.lutte-ouvriere.org/portail/elections/candidat/nathalie-arthaud-164108.html',
      ),
    },
    {
      actor: 'Arlette Laguiller',
      role: 'Figure tutélaire',
      relation: "Nathalie Arthaud s'inscrit dans la continuité d'Arlette Laguiller, qui a longtemps incarné LO à la présidentielle.",
      tone: 'ally',
      source: pressSource(
        'Lutte Ouvrière',
        'https://www.lutte-ouvriere.org/mensuel/article/2016-09-17-lutte-ouvriere-dans-la-campagne-presidentielle_70740.html',
        '2016-09-17',
      ),
    },
    {
      actor: 'Nouveau Parti anticapitaliste',
      role: "Autre pôle d'extrême gauche",
      relation: "Le NPA occupe le même espace électoral protestataire et concurrence LO sur la visibilité de l'extrême gauche.",
      tone: 'rival',
      source: pressSource(
        'Le Parisien',
        'https://www.leparisien.fr/elections/presidentielle/presidentielle-2027-nathalie-arthaud-annonce-sa-candidature-08-12-2025-CVGIMSFYS5CYDEFDIYUM2AW6FM.php',
        '2025-12-08',
      ),
    },
  ],
  'delphine-batho': [
    {
      actor: 'Génération Écologie',
      role: 'Base partisane',
      relation: "Delphine Batho s'appuie sur Génération Écologie pour défendre une candidature écologiste autonome en 2027.",
      tone: 'ally',
      source: pressSource(
        'Génération Écologie',
        'https://www.generationecologie.fr/2025/07/07/non-a-la-disparition-des-ecologistes-a-la-presidentielle/',
        '2025-07-07',
      ),
    },
    {
      actor: 'Les Écologistes',
      role: "Concurrence dans l'espace écologiste",
      relation: "Batho critique la stratégie des Écologistes qui consiste à s'insérer dans une primaire de gauche plutôt qu'à porter une offre écologiste distincte.",
      tone: 'rival',
      source: pressSource(
        'AFP / Yahoo Actualités',
        'https://fr.news.yahoo.com/news/delphine-batho-d%C3%A9put%C3%A9e-%C3%A9colo-porte-080210656.html/',
        '2025-11-25',
      ),
    },
    {
      actor: 'Marine Tondelier',
      role: 'Rivale écologiste',
      relation: "La candidature de Batho se construit aussi en opposition à la ligne de Marine Tondelier sur la primaire et l'union de la gauche.",
      tone: 'rival',
      source: pressSource(
        'AFP / Yahoo Actualités',
        'https://fr.news.yahoo.com/news/delphine-batho-d%C3%A9put%C3%A9e-%C3%A9colo-porte-080210656.html/',
        '2025-11-25',
      ),
    },
  ],
  'marine-tondelier': [
    {
      actor: 'Les Écologistes',
      role: 'Appareil du parti',
      relation: 'Marine Tondelier tient le parti écologiste et veut en faire la base de sa séquence présidentielle.',
      tone: 'ally',
      source: pressSource(
        'Les Écologistes',
        'https://lesecologistes.fr/posts/4DGpyusxBAU4xQPexfncsx/marine-tondelier-designee-pour-representer-les-ecologistes-a-la-primaire-et-a-la-presidentielle',
        '2025-12-08',
      ),
    },
    {
      actor: 'Parti socialiste',
      role: 'Partenaire de gauche',
      relation: "Elle pousse à une alliance plus large avec les socialistes et soutient l'idée d'une candidature commune hors LFI.",
      tone: 'ally',
      source: pressSource(
        'Le Parisien',
        'https://www.leparisien.fr/politique/marine-tondelier-refuse-les-gauches-irreconciliables-et-suggere-une-primaire-des-territoires-en-vue-de-2027-26-04-2025-PYNVZVF4QZHMDP2EYJJ7BV2WH4.php',
        '2025-04-26',
      ),
    },
    {
      actor: 'Jean-Luc Mélenchon',
      role: 'Rival stratégique à gauche',
      relation: "Tondelier défend une candidature commune hors Mélenchon, ce qui en fait un point de fracture majeur entre écologistes et LFI.",
      tone: 'rival',
      source: pressSource(
        'Le Parisien',
        'https://www.leparisien.fr/politique/ca-va-murir-tout-lete-lidee-dune-primaire-pour-2027-cristallise-les-divisions-a-gauche-26-05-2025-34NOQMTTJBHBPHLG6MBW55557Y.php',
        '2025-05-26',
      ),
    },
  ],
  'francois-ruffin': [
    {
      actor: 'Debout !',
      role: 'Mouvement personnel',
      relation: 'Ruffin utilise Debout ! comme base militante et comme véhicule pour sa propre offre politique.',
      tone: 'ally',
      source: officialSource('François Ruffin', 'https://bio.francoisruffin.fr/'),
    },
    {
      actor: 'Marine Tondelier',
      role: "Partenaire de la primaire unitaire",
      relation: "Ruffin avance avec une partie des écologistes, dont Marine Tondelier, pour installer une primaire de gauche hors LFI.",
      tone: 'ally',
      source: pressSource(
        'Le Monde',
        'https://www.lemonde.fr/politique/article/2025/07/02/presidentielle-2027-le-front-populaire-lance-une-primaire-qui-ne-dit-pas-son-nom_6617449_823448.html',
        '2025-07-02',
      ),
    },
    {
      actor: 'Jean-Luc Mélenchon',
      role: 'Rival à gauche',
      relation: "Ruffin attaque directement la stratégie de Mélenchon et le tient pour l'obstacle principal à une candidature commune de gauche.",
      tone: 'rival',
      source: pressSource(
        'Le Monde',
        'https://www.lemonde.fr/politique/article/2025/04/02/francois-ruffin-propose-d-incarner-une-union-de-la-gauche-pour-la-presidentielle-de-2027_6589773_823448.html',
        '2025-04-02',
      ),
    },
  ],
  'marine-le-pen': [
    {
      actor: 'Rassemblement national',
      role: 'Machine partisane',
      relation: "Le RN reste l'appareil central de sa stratégie présidentielle et de sa capacité de mobilisation.",
      tone: 'ally',
      source: officialSource('Rassemblement national', 'https://www.rassemblementnational.fr/'),
    },
    {
      actor: 'Jordan Bardella',
      role: 'Plan B et lieutenant',
      relation: "Le tandem avec Bardella structure la campagne RN, à la fois comme soutien direct et comme solution de rechange si elle est empêchée.",
      tone: 'ally',
      source: pressSource(
        'Le Monde',
        'https://www.lemonde.fr/politique/article/2025/04/26/si-marine-le-pen-est-empechee-pour-la-presidentielle-2027-je-serai-son-candidat-assure-jordan-bardella_6600386_823448.html',
        '2025-04-26',
      ),
    },
    {
      actor: 'Édouard Philippe',
      role: 'Rival de second tour',
      relation: "Philippe se projette explicitement comme l'un de ceux qui veulent la battre en 2027.",
      tone: 'rival',
      source: pressSource(
        'BFMTV',
        'https://www.bfmtv.com/politique/elle-ne-me-fait-pas-peur-edouard-philippe-a-envie-de-battre-marine-le-pen-en-2027_AD-202502230404.html',
        '2025-02-23',
      ),
    },
  ],
  'jordan-bardella': [
    {
      actor: 'Rassemblement national',
      role: 'Appareil du parti',
      relation: 'Jordan Bardella contrôle le parti et en fait le socle organisationnel de sa possible candidature.',
      tone: 'ally',
      source: officialSource(
        'Rassemblement national',
        'https://rassemblementnational.fr/instances/bureau-executif',
      ),
    },
    {
      actor: 'Marine Le Pen',
      role: 'Protectrice et référence',
      relation: "Sa trajectoire présidentielle dépend directement du tandem construit avec Marine Le Pen et de sa validation politique.",
      tone: 'ally',
      source: pressSource(
        'Rassemblement national',
        'https://rassemblementnational.fr/agenda/meeting-avec-marine-le-pen-et-jordan-bardella-a-narbonne',
        '2025-05-01',
      ),
    },
    {
      actor: "Cour d'appel de Paris",
      role: 'Facteur institutionnel décisif',
      relation: "L'hypothèse Bardella devient centrale si la situation judiciaire de Marine Le Pen l'empêche d'être candidate en 2027.",
      tone: 'institution',
      source: pressSource(
        'AP',
        'https://apnews.com/article/fa548e0280837fa277d9b5627846a93c',
        '2026-02-27',
      ),
    },
  ],
  'raphael-glucksmann': [
    {
      actor: 'Place publique',
      role: 'Appareil politique',
      relation: 'Place publique est sa base organisationnelle et le véhicule de sa ligne sociale-démocrate et pro-européenne.',
      tone: 'ally',
      source: pressSource(
        'Place publique',
        'https://place-publique.eu/nominations-place-publique-renouvelle-ses-instances-dirigeantes-en-vue-des-prochainsrendez-vous-electoraux/',
        '2025-04-02',
      ),
    },
    {
      actor: 'Aurore Lalucq',
      role: 'Co-présidente et alliée',
      relation: 'Le binôme formé avec Aurore Lalucq structure la direction de Place publique et sa préparation des prochaines échéances.',
      tone: 'ally',
      source: pressSource(
        'Place publique',
        'https://place-publique.eu/nominations-place-publique-renouvelle-ses-instances-dirigeantes-en-vue-des-prochainsrendez-vous-electoraux/',
        '2025-04-02',
      ),
    },
    {
      actor: 'Jean-Luc Mélenchon',
      role: 'Rival à gauche',
      relation: "Glucksmann assume une ligne opposée à LFI et refuse une stratégie commune avec Mélenchon pour 2027.",
      tone: 'rival',
      source: pressSource(
        'BFMTV',
        'https://www.bfmtv.com/politique/presidentielle-2027-glucksmann-appelle-la-gauche-a-se-rassembler-sans-lfi-pour-un-projet-puissant_AN-202503160117.html',
        '2025-03-16',
      ),
    },
  ],
  'gabriel-attal': [
    {
      actor: 'Renaissance',
      role: 'Appareil du bloc central',
      relation: 'En prenant la tête de Renaissance, Gabriel Attal a récupéré la principale machine partisane du macronisme.',
      tone: 'ally',
      source: pressSource(
        'Le Monde',
        'https://www.lemonde.fr/politique/article/2025/09/19/gabriel-attal-se-prepare-pour-2027-et-promet-de-renverser-la-table_6641854_823448.html',
        '2025-09-19',
      ),
    },
    {
      actor: 'Édouard Philippe',
      role: 'Rival du bloc central',
      relation: "Attal construit sa montée en puissance en se mesurant à Philippe, déjà déclaré et mieux installé dans l'espace central.",
      tone: 'rival',
      source: pressSource(
        'Le Monde',
        'https://www.lemonde.fr/en/politics/article/2025/04/07/gabriel-attal-takes-first-step-toward-race-for-french-presidency_6739920_5.html',
        '2025-04-07',
      ),
    },
    {
      actor: 'Gérald Darmanin',
      role: 'Rival du bloc central',
      relation: 'La précampagne du bloc central oppose aussi Attal à Darmanin, qui refuse de se ranger derrière lui.',
      tone: 'rival',
      source: pressSource(
        'Le Parisien',
        'https://www.leparisien.fr/elections/presidentielle/on-va-bientot-avoir-plus-de-candidats-que-delecteurs-avant-2027-le-bloc-central-au-bord-du-grand-schisme-27-01-2026-FOA7G5NZDZFE3MMBPM2FTSC4FE.php',
        '2026-01-27',
      ),
    },
  ],
  'jean-luc-melenchon': [
    {
      actor: 'La France insoumise',
      role: 'Appareil du mouvement',
      relation: "LFI reste l'instrument central de son influence et de sa capacité à imposer sa propre ligne pour 2027.",
      tone: 'ally',
      source: officialSource(
        'La France insoumise',
        'https://lafranceinsoumise.fr/lfi-comment-ca-marche/',
      ),
    },
    {
      actor: 'François Ruffin',
      role: 'Rival à gauche',
      relation: "Depuis sa rupture avec LFI, Ruffin conteste frontalement la stratégie de Mélenchon et veut lui opposer une candidature d'union.",
      tone: 'rival',
      source: pressSource(
        'Le Monde',
        'https://www.lemonde.fr/politique/article/2025/04/02/francois-ruffin-propose-d-incarner-une-union-de-la-gauche-pour-la-presidentielle-de-2027_6589773_823448.html',
        '2025-04-02',
      ),
    },
    {
      actor: 'Raphaël Glucksmann',
      role: 'Rival à gauche',
      relation: "Glucksmann revendique une autre offre politique à gauche et refuse toute alliance nationale avec Mélenchon.",
      tone: 'rival',
      source: pressSource(
        'Le Monde',
        'https://www.lemonde.fr/politique/article/2025/05/23/raphael-glucksmann-sur-l-election-presidentielle-de-2027-je-ne-participerai-pas-a-une-primaire_6608026_823448.html',
        '2025-05-23',
      ),
    },
  ],
  'bruno-retailleau': [
    {
      actor: 'Les Républicains',
      role: 'Appareil du parti',
      relation: "En prenant la tête de LR, Retailleau a mis la main sur l'appareil de la droite classique pour préparer 2027.",
      tone: 'ally',
      source: pressSource(
        'Les Républicains',
        'https://republicains.fr/actualites/2025/05/18/election-du-president-des-republicains-resultats-du-vote/',
        '2025-05-18',
      ),
    },
    {
      actor: 'Michel Barnier',
      role: 'Soutien de l’appareil LR',
      relation: "Retailleau s'appuie sur Michel Barnier pour verrouiller une partie des instances LR et crédibiliser sa ligne pour 2027.",
      tone: 'ally',
      source: pressSource(
        'Les Républicains',
        'https://republicains.fr/actualites/2025/06/28/michel-barnier-lr-doit-tout-faire-pour-etre-present-en-2027-et-gagner-dans-la-foulee-une-majorite-absolue/',
        '2025-06-28',
      ),
    },
    {
      actor: 'Laurent Wauquiez',
      role: 'Rival à droite',
      relation: "La conquête de LR puis la question présidentielle ont transformé Wauquiez en rival direct de Retailleau.",
      tone: 'rival',
      source: pressSource(
        'Le Monde',
        'https://www.lemonde.fr/politique/article/2025/02/14/laurent-wauquiez-lance-son-duel-a-distance-avec-bruno-retailleau-pour-prendre-la-tete-des-republicains_6545995_823448.html',
        '2025-02-14',
      ),
    },
  ],
  'gerald-darmanin': [
    {
      actor: 'Les Populaires',
      role: 'Mouvement personnel',
      relation: "Darmanin s'appuie sur Populaires pour tester une offre de droite sociale et se différencier du reste du bloc central.",
      tone: 'ally',
      source: officialSource('Populaires', 'https://populaires.net/'),
    },
    {
      actor: 'Gabriel Attal',
      role: 'Rival du bloc central',
      relation: "Darmanin refuse de s'aligner sur Gabriel Attal et critique sa ligne dans la bataille d'influence pour 2027.",
      tone: 'rival',
      source: pressSource(
        'Le Parisien',
        'https://www.leparisien.fr/elections/presidentielle/on-va-bientot-avoir-plus-de-candidats-que-delecteurs-avant-2027-le-bloc-central-au-bord-du-grand-schisme-27-01-2026-FOA7G5NZDZFE3MMBPM2FTSC4FE.php',
        '2026-01-27',
      ),
    },
    {
      actor: 'Édouard Philippe',
      role: 'Rival du bloc central',
      relation: "Philippe et Darmanin se disputent aussi l'espace centre droit, chacun cherchant à apparaître comme le mieux placé pour 2027.",
      tone: 'rival',
      source: pressSource(
        'Le Parisien',
        'https://www.leparisien.fr/politique/gerald-darmanin-ne-veut-pas-se-faire-oublier-02-05-2025-X5CF6R4QWZB4DGSJMT3NOPZLLM.php',
        '2025-05-02',
      ),
    },
  ],
}

async function main() {
  const app = initializeApp(getFirebaseConfig())
  const db = getFirestore(app)
  const batch = writeBatch(db)

  const candidateIds = Object.keys(candidateNetworks)
  console.log(`Preparing network research update for ${candidateIds.length} candidates.`)

  for (const candidateId of candidateIds) {
    const candidateRef = doc(db, CANDIDATES_COLLECTION, candidateId)
    const snapshot = await getDoc(candidateRef)

    if (!snapshot.exists()) {
      throw new Error(`Candidate not found: ${candidateId}`)
    }

    const network = candidateNetworks[candidateId]
    console.log(`- ${candidateId}: ${network.length} researched nodes`)

    if (DRY_RUN) {
      continue
    }

    batch.set(
      candidateRef,
      {
        network,
        dataLastUpdated: DATA_LAST_UPDATED,
      },
      { merge: true },
    )
  }

  if (DRY_RUN) {
    console.log('Dry run enabled. No data written.')
    return
  }

  await batch.commit()
  console.log('Candidate political networks updated.')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
