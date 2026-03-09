import { initializeApp } from 'firebase/app'
import { collection, doc, getDocs, getFirestore, writeBatch } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDjCugeUjARO7ObrcR4ao4_53rWSHGGYPQ',
  authDomain: 'presidentielles-f0682.firebaseapp.com',
  projectId: 'presidentielles-f0682',
  storageBucket: 'presidentielles-f0682.firebasestorage.app',
  messagingSenderId: '171363522127',
  appId: '1:171363522127:web:4225ffc2fb1ac427807c3a',
  measurementId: 'G-1V4MQDR9VX',
}

const CANDIDATES_COLLECTION = 'candidates_2027'
const DATA_LAST_UPDATED = '2026-03-09'
const DRY_RUN = process.argv.includes('--dry-run')

const birthDatesById = {
  'edouard-philippe': '1970-11-28',
  'xavier-bertrand': '1965-03-21',
  'nathalie-arthaud': '1970-02-23',
  'delphine-batho': '1973-03-23',
  'marine-tondelier': '1986-08-23',
  'francois-ruffin': '1975-10-18',
  'marine-le-pen': '1968-08-05',
  'jordan-bardella': '1995-09-13',
  'raphael-glucksmann': '1979-10-15',
  'gabriel-attal': '1989-03-16',
  'jean-luc-melenchon': '1951-08-19',
  'bruno-retailleau': '1960-11-20',
  'gerald-darmanin': '1982-10-11',
}

const curatedInterventionsById = {
  'raphael-glucksmann': [
    {
      id: 'primaire-gauche-2025',
      type: 'quote',
      title: 'Refus de la primaire de la gauche',
      excerpt:
        'Raphaël Glucksmann ferme la porte à une primaire et cherche à installer une candidature autonome pour 2027.',
      context: 'Positionnement dans la recomposition de la gauche réformiste à l’approche de 2027.',
      source: {
        label: 'Le Monde',
        url: 'https://www.lemonde.fr/politique/article/2025/05/23/raphael-glucksmann-sur-l-election-presidentielle-de-2027-je-ne-participerai-pas-a-une-primaire_6608026_823448.html',
        date: '2025-05-23',
      },
    },
    {
      id: 'plateforme-2027-2025',
      type: 'quote',
      title: 'Premiers marqueurs de plateforme pour 2027',
      excerpt:
        'Il met en avant une ligne de réindustrialisation, de réforme des entreprises et de justice sociale.',
      context: 'Intervention de cadrage programmatique sur son offre présidentielle potentielle.',
      source: {
        label: 'Le Monde',
        url: 'https://www.lemonde.fr/en/politics/article/2025/06/24/raphael-glucksmann-sets-out-policy-platform-for-2027-french-presidential-election_6742671_5.html',
        date: '2025-06-24',
      },
    },
    {
      id: 'portrait-place-publique',
      type: 'post',
      title: 'Portrait officiel sur Place publique',
      excerpt:
        'La page du parti rappelle son ancrage européen et son rôle central dans la stratégie de Place publique.',
      context: 'Support officiel utile pour documenter sa présentation publique et son positionnement partisan.',
      source: {
        label: 'Place publique',
        url: 'https://place-publique.eu/nos-elus/raphael-glucksmann/',
        date: '2021-03-17',
      },
    },
  ],
  'gabriel-attal': [
    {
      id: 'chemin-2027-tf1',
      type: 'video',
      title: '« Proposer un chemin aux Français pour 2027 »',
      excerpt:
        'Gabriel Attal explique qu’il veut proposer un chemin aux Français pour 2027, signe d’une projection présidentielle assumée.',
      context: 'Séquence télévisée et reprise presse autour de sa projection dans l’après-Macron.',
      source: {
        label: 'TF1 Info',
        url: 'https://www.tf1info.fr/politique/election-presidentielle-2027-attal-souhaite-proposer-un-chemin-aux-francais-pour-2027-2381173.html',
        date: '2025-07-05',
      },
    },
    {
      id: 'dissolution-jalons-2027',
      type: 'quote',
      title: 'Discours de rupture sur la dissolution',
      excerpt:
        'Il critique la dissolution de 2024 et s’en sert pour poser des jalons personnels dans la perspective de 2027.',
      context: 'Moment de repositionnement politique au sein du bloc central.',
      source: {
        label: 'TF1 Info',
        url: 'https://www.tf1info.fr/politique/discours-gabriel-attal-je-savais-que-la-france-en-paierait-le-prix-attal-tacle-macron-sur-la-dissolution-et-pose-des-jalons-pour-2027-2395927.html',
        date: '2025-09-21',
      },
    },
    {
      id: 'fiche-assemblee-attal',
      type: 'post',
      title: 'Présentation officielle à l’Assemblée nationale',
      excerpt:
        'Sa fiche de député documente sa place institutionnelle actuelle et son ancrage au sein de la majorité.',
      context: 'Référence officielle de fonction utilisée pour contextualiser son poids politique.',
      source: {
        label: 'Assemblée nationale',
        url: 'https://www.assemblee-nationale.fr/dyn/deputes/PA722190',
        date: '2026-03-09',
      },
    },
  ],
  'jean-luc-melenchon': [
    {
      id: 'candidature-insoumise-2027-rmc',
      type: 'quote',
      title: '« Il y aura une candidature insoumise en 2027 »',
      excerpt:
        'Jean-Luc Mélenchon confirme que La France insoumise présentera son propre candidat en 2027.',
      context: 'Moment clef de clarification sur l’autonomie stratégique de LFI.',
      source: {
        label: 'RMC BFMTV',
        url: 'https://rmc.bfmtv.com/actualites/politique/le-ps-n-est-plus-notre-allie-il-y-aura-une-candidature-insoumise-en-2027-annonce-melenchon_AV-202502160097.html',
        date: '2025-02-16',
      },
    },
    {
      id: 'video-bfmtv-aout-2025',
      type: 'video',
      title: 'Réitération publique de la ligne insoumise',
      excerpt:
        'Dans une séquence vidéo, il réaffirme qu’il y aura une candidature insoumise en 2027 et écarte la logique de primaire.',
      context: 'Reprise télévisée d’un marqueur stratégique central du mouvement.',
      source: {
        label: 'BFMTV',
        url: 'https://www.bfmtv.com/politique/la-france-insoumise/video-presidentielle-2027-il-y-aura-une-candidature-insoumise-declare-jean-luc-melenchon_VN-202508230249.html',
        date: '2025-08-23',
      },
    },
    {
      id: 'document-strategique-2026',
      type: 'post',
      title: 'Publication d’un document stratégique',
      excerpt:
        'Le texte diffusé début 2026 sert de base à la préparation idéologique et programmatique du prochain cycle électoral.',
      context: 'Document public de cadrage politique diffusé par Jean-Luc Mélenchon.',
      source: {
        label: 'Jean-Luc Melenchon',
        url: 'https://melenchon.fr/wp-content/uploads/2026/02/1.-COMMENT-FAIRE-E2.pdf',
        date: '2026-02-10',
      },
    },
  ],
  'bruno-retailleau': [
    {
      id: 'tf1-fevrier-2026',
      type: 'video',
      title: 'Candidature 2027 assumée publiquement',
      excerpt:
        'Une séquence reprise par TF1 Info l’installe explicitement comme candidat déclaré de la droite pour 2027.',
      context: 'Point de bascule public entre prétendant potentiel et candidature assumée.',
      source: {
        label: 'TF1 Info',
        url: 'https://www.tf1info.fr/politique/bruno-retailleau-candidat-a-la-presidentielle-2027-il-sera-l-invite-du-20h-de-tf1-ce-soir-2424402.html',
        date: '2026-02-12',
      },
    },
    {
      id: 'conseil-national-lr-2025',
      type: 'post',
      title: 'Discours au conseil national de LR',
      excerpt:
        'Le nouveau président des Républicains y fixe sa ligne politique et son cap pour la droite.',
      context: 'Moment d’installation partisane après sa victoire à la tête de LR.',
      source: {
        label: 'Les Républicains',
        url: 'https://republicains.fr/actualites/2025/06/30/bruno-retailleau-conseil-national-lr/',
        date: '2025-06-30',
      },
    },
    {
      id: 'portrait-wikipedia-retailleau',
      type: 'quote',
      title: 'Consolidation de son profil de droite d’autorité',
      excerpt:
        'Sa trajectoire et ses prises de position le placent au cœur d’une ligne régalienne très assumée.',
      context: 'Synthèse de trajectoire utilisée pour contextualiser sa présence dans la course.',
      source: {
        label: 'Wikipedia',
        url: 'https://fr.wikipedia.org/wiki/Bruno_Retailleau',
        date: '2026-03-09',
      },
    },
  ],
  'gerald-darmanin': [
    {
      id: 'participera-2027-tf1',
      type: 'quote',
      title: '« Je participerai d’une manière ou d’une autre à 2027 »',
      excerpt:
        'Gérald Darmanin affirme publiquement qu’il jouera un rôle direct dans l’élection présidentielle de 2027.',
      context: 'Première formulation explicite de son ambition à l’échelle présidentielle.',
      source: {
        label: 'TF1 Info',
        url: 'https://www.tf1info.fr/politique/gerald-darmanin-participera-d-une-maniere-ou-d-une-autre-a-l-election-presidentielle-de-2027-2350560.html',
        date: '2025-02-13',
      },
    },
    {
      id: 'capable-etre-candidat-2026',
      type: 'quote',
      title: 'Il se dit capable d’être le candidat de son camp',
      excerpt:
        'Début 2026, il reconnaît réfléchir à 2027 et se sentir capable de porter politiquement son camp.',
      context: 'Moment d’explicitation de son hypothèse présidentielle personnelle.',
      source: {
        label: 'TF1 Info',
        url: 'https://www.tf1info.fr/politique/presidentielle-2027-gerald-darmanin-y-songe-et-se-sent-capable-d-etre-le-candidat-de-son-camp-2420721.html',
        date: '2026-01-25',
      },
    },
    {
      id: 'tourcoing-fibre-sociale',
      type: 'quote',
      title: 'Tourcoing, vitrine de sa « fibre sociale »',
      excerpt:
        'Le déplacement à Tourcoing met en scène une ligne de droite sociale destinée à élargir son socle politique.',
      context: 'Séquence territoriale utilisée pour installer son mouvement Populaires et sa différence politique.',
      source: {
        label: 'Le Monde',
        url: 'https://www.lemonde.fr/politique/article/2025/08/31/a-tourcoing-gerald-darmanin-tend-la-main-aux-socialistes-et-fait-valoir-sa-fibre-sociale_6637931_823448.html',
        date: '2025-08-31',
      },
    },
  ],
}

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function buildFallbackInterventions(candidate) {
  if (!Array.isArray(candidate.keyPositions) || candidate.keyPositions.length === 0) {
    return []
  }

  return candidate.keyPositions.slice(0, 3).map((position, index) => ({
    id: `${slugify(position.topic)}-${index + 1}`,
    type: 'quote',
    title: position.topic,
    excerpt: position.summary,
    context: `Prise de position reprise dans ${position.source.label}.`,
    source: position.source,
  }))
}

function enrichCandidate(candidateId, candidate) {
  const birthDate = birthDatesById[candidateId]
  const birthYear = birthDate ? Number.parseInt(birthDate.slice(0, 4), 10) : null
  const interventions =
    curatedInterventionsById[candidateId] ?? buildFallbackInterventions(candidate)

  return {
    birthDate: birthDate ?? null,
    birthYear,
    interventions,
    dataLastUpdated: DATA_LAST_UPDATED,
  }
}

async function main() {
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  const snapshot = await getDocs(collection(db, CANDIDATES_COLLECTION))

  if (snapshot.empty) {
    console.log('No candidates found.')
    return
  }

  const batch = writeBatch(db)

  for (const entry of snapshot.docs) {
    const patch = enrichCandidate(entry.id, entry.data())
    console.log(
      `${entry.id}: birthDate=${patch.birthDate ?? 'missing'} interventions=${patch.interventions.length}`,
    )

    if (!DRY_RUN) {
      batch.set(doc(db, CANDIDATES_COLLECTION, entry.id), patch, { merge: true })
    }
  }

  if (DRY_RUN) {
    console.log('Dry run enabled. No data written.')
    return
  }

  await batch.commit()
  console.log(`Updated ${snapshot.size} candidate documents.`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
