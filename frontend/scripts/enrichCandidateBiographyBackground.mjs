import { initializeApp } from 'firebase/app'
import { collection, getDocs, getFirestore, writeBatch } from 'firebase/firestore'
import { getFirebaseConfig } from './firebaseConfig.mjs'

const firebaseConfig = getFirebaseConfig()
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const CANDIDATES_COLLECTION = 'candidates_2027'
const DATA_LAST_UPDATED = '2026-03-11'
const ACCESS_DATE = '2026-03-11'
const DRY_RUN = process.argv.includes('--dry-run')
const ONLY_CANDIDATE = process.argv.find((argument) => argument.startsWith('--candidate='))?.split('=')[1]

function source(label, url, date = ACCESS_DATE) {
  return { label, url, date }
}

function uniqueSources(existingSources, additionalSources) {
  const entries = [...(Array.isArray(existingSources) ? existingSources : []), ...additionalSources]
  const seen = new Set()

  return entries.filter((entry) => {
    if (!entry || typeof entry.url !== 'string' || typeof entry.label !== 'string' || typeof entry.date !== 'string') {
      return false
    }

    const key = `${entry.url}::${entry.label}::${entry.date}`
    if (seen.has(key)) {
      return false
    }

    seen.add(key)
    return true
  })
}

function collectContextSources(context) {
  const sources = []

  for (const parent of context.parentBackground ?? []) {
    sources.push(parent.source)
  }

  if (context.childhoodCitySource) {
    sources.push(context.childhoodCitySource)
  }

  for (const interest of context.childhoodInterests ?? []) {
    sources.push(interest.source)
  }

  return sources
}

const sharedSources = {
  edouardWiki: source('Wikipedia', 'https://fr.wikipedia.org/wiki/%C3%89douard_Philippe'),
  xavierWiki: source('Wikipedia', 'https://fr.wikipedia.org/wiki/Xavier_Bertrand'),
  nathalieWiki: source('Wikipedia', 'https://fr.wikipedia.org/wiki/Nathalie_Arthaud'),
  delphineWiki: source('Wikipedia', 'https://fr.wikipedia.org/wiki/Delphine_Batho'),
  marineTondelierWiki: source('Wikipedia', 'https://en.wikipedia.org/wiki/Marine_Tondelier'),
  ruffinWiki: source('Wikipedia', 'https://fr.wikipedia.org/wiki/Fran%C3%A7ois_Ruffin'),
  marineLePenWiki: source('Wikipedia', 'https://fr.wikipedia.org/wiki/Marine_Le_Pen'),
  pierretteWiki: source('Wikipedia', 'https://fr.wikipedia.org/wiki/Pierrette_Le_Pen'),
  jordanWiki: source('Wikipedia', 'https://fr.wikipedia.org/wiki/Jordan_Bardella'),
  jordanChildhood: source(
    'Le Monde',
    'https://www.lemonde.fr/m-le-mag/article/2024/06/02/l-enfance-de-jordan-bardella-a-saint-denis-du-mythe-a-la-realite_6236866_4500055.html',
    '2024-06-02',
  ),
  raphaelWiki: source('Wikipedia', 'https://fr.wikipedia.org/wiki/Rapha%C3%ABl_Glucksmann'),
  gabrielWiki: source('Wikipedia', 'https://fr.wikipedia.org/wiki/Gabriel_Attal'),
  melenchonWiki: source('Wikipedia', 'https://fr.wikipedia.org/wiki/Jean-Luc_M%C3%A9lenchon'),
  retailleauWiki: source('Wikipedia', 'https://fr.wikipedia.org/wiki/Bruno_Retailleau'),
  darmaninWiki: source('Wikipedia', 'https://fr.wikipedia.org/wiki/G%C3%A9rald_Darmanin'),
}

const biographyContextById = {
  'edouard-philippe': {
    parentBackground: [
      { relation: 'Père', profession: 'Professeur de français', source: sharedSources.edouardWiki },
      { relation: 'Mère', profession: 'Professeure de français', source: sharedSources.edouardWiki },
    ],
    childhoodCity: 'Rouen puis Grand-Quevilly',
    childhoodCitySource: sharedSources.edouardWiki,
    childhoodInterests: [],
  },
  'xavier-bertrand': {
    parentBackground: [
      { relation: 'Père', profession: 'Cadre bancaire', source: sharedSources.xavierWiki },
      { relation: 'Mère', profession: 'Employée de banque', source: sharedSources.xavierWiki },
    ],
    childhoodCity: 'Châlons-en-Champagne',
    childhoodCitySource: sharedSources.xavierWiki,
    childhoodInterests: [],
  },
  'nathalie-arthaud': {
    parentBackground: [
      { relation: 'Père', profession: 'Garagiste', source: sharedSources.nathalieWiki },
      { relation: 'Mère', profession: 'Aide à la comptabilité', source: sharedSources.nathalieWiki },
    ],
    childhoodCity: 'Peyrins puis Lyon',
    childhoodCitySource: sharedSources.nathalieWiki,
    childhoodInterests: [{ label: 'Volleyball', source: sharedSources.nathalieWiki }],
  },
  'delphine-batho': {
    parentBackground: [
      {
        relation: 'Père',
        profession: 'Photographe, ancien ouvrier relieur puis enseignant aux Beaux-Arts',
        source: sharedSources.delphineWiki,
      },
      { relation: 'Mère', profession: 'Photographe', source: sharedSources.delphineWiki },
    ],
    childhoodCity: 'Paris',
    childhoodCitySource: sharedSources.delphineWiki,
    childhoodInterests: [
      { label: 'Actions humanitaires', source: sharedSources.delphineWiki },
      { label: 'Engagement lycéen', source: sharedSources.delphineWiki },
    ],
  },
  'marine-tondelier': {
    parentBackground: [
      { relation: 'Père', profession: 'Médecin homéopathe', source: sharedSources.marineTondelierWiki },
      { relation: 'Mère', profession: 'Dentiste', source: sharedSources.marineTondelierWiki },
    ],
    childhoodCity: 'Hénin-Beaumont',
    childhoodCitySource: sharedSources.marineTondelierWiki,
    childhoodInterests: [],
  },
  'francois-ruffin': {
    parentBackground: [
      { relation: 'Père', profession: 'Cadre chez Bonduelle', source: sharedSources.ruffinWiki },
      { relation: 'Mère', profession: 'Femme au foyer', source: sharedSources.ruffinWiki },
    ],
    childhoodCity: 'Amiens',
    childhoodCitySource: sharedSources.ruffinWiki,
    childhoodInterests: [],
  },
  'marine-le-pen': {
    parentBackground: [
      { relation: 'Père', profession: 'Homme politique et ancien officier parachutiste', source: sharedSources.marineLePenWiki },
      { relation: 'Mère', profession: 'Ancien mannequin', source: sharedSources.pierretteWiki },
    ],
    childhoodCity: 'Saint-Cloud',
    childhoodCitySource: sharedSources.marineLePenWiki,
    childhoodInterests: [],
  },
  'jordan-bardella': {
    parentBackground: [
      { relation: 'Père', profession: 'Patron d’une PME de distributeurs automatiques', source: sharedSources.jordanWiki },
      { relation: 'Mère', profession: 'ATSEM', source: sharedSources.jordanWiki },
    ],
    childhoodCity: 'Saint-Denis',
    childhoodCitySource: sharedSources.jordanChildhood,
    childhoodInterests: [
      { label: 'Soutien scolaire bénévole', source: sharedSources.jordanWiki },
      { label: 'Cours de français à des migrants', source: sharedSources.jordanWiki },
    ],
  },
  'raphael-glucksmann': {
    parentBackground: [
      { relation: 'Père', profession: 'Philosophe et essayiste', source: sharedSources.raphaelWiki },
    ],
    childhoodCity: 'Paris',
    childhoodCitySource: sharedSources.raphaelWiki,
    childhoodInterests: [],
  },
  'gabriel-attal': {
    parentBackground: [
      { relation: 'Père', profession: 'Avocat puis producteur de cinéma', source: sharedSources.gabrielWiki },
      { relation: 'Mère', profession: 'Salariée d’une société de production', source: sharedSources.gabrielWiki },
    ],
    childhoodCity: 'Paris, entre les 13e et 14e arrondissements',
    childhoodCitySource: sharedSources.gabrielWiki,
    childhoodInterests: [],
  },
  'jean-luc-melenchon': {
    parentBackground: [
      { relation: 'Père', profession: 'Receveur des Postes, télégraphes et téléphones', source: sharedSources.melenchonWiki },
      { relation: 'Mère', profession: 'Institutrice', source: sharedSources.melenchonWiki },
    ],
    childhoodCity: 'Tanger puis Lons-le-Saunier',
    childhoodCitySource: sharedSources.melenchonWiki,
    childhoodInterests: [],
  },
  'bruno-retailleau': {
    parentBackground: [
      { relation: 'Père', profession: 'Commerçant en grains', source: sharedSources.retailleauWiki },
      { relation: 'Mère', profession: 'Couturière', source: sharedSources.retailleauWiki },
    ],
    childhoodCity: 'Saint-Malô-du-Bois',
    childhoodCitySource: sharedSources.retailleauWiki,
    childhoodInterests: [{ label: 'Équitation', source: sharedSources.retailleauWiki }],
  },
  'gerald-darmanin': {
    parentBackground: [
      { relation: 'Père', profession: 'Tenancier de bistrot et ancien adjudant-chef de l’armée française', source: sharedSources.darmaninWiki },
      { relation: 'Mère', profession: 'Concierge à la Banque de France', source: sharedSources.darmaninWiki },
    ],
    childhoodCity: 'Tourcoing',
    childhoodCitySource: sharedSources.darmaninWiki,
    childhoodInterests: [],
  },
}

async function main() {
  const snapshot = await getDocs(collection(db, CANDIDATES_COLLECTION))
  const batch = writeBatch(db)
  const updatedCandidates = []

  for (const candidateDoc of snapshot.docs) {
    const candidateId = candidateDoc.id
    const context = biographyContextById[candidateId]
    if (!context) {
      continue
    }

    if (ONLY_CANDIDATE && candidateId !== ONLY_CANDIDATE) {
      continue
    }

    const candidate = candidateDoc.data()
    const mergedSources = uniqueSources(candidate.sources, collectContextSources(context))

    updatedCandidates.push(candidateId)

    if (DRY_RUN) {
      continue
    }

    batch.update(candidateDoc.ref, {
      parentBackground: context.parentBackground,
      childhoodCity: context.childhoodCity,
      childhoodCitySource: context.childhoodCitySource,
      childhoodInterests: context.childhoodInterests,
      sources: mergedSources,
      dataLastUpdated: DATA_LAST_UPDATED,
    })
  }

  if (updatedCandidates.length === 0) {
    console.log('No candidates matched the enrichment set.')
    return
  }

  if (DRY_RUN) {
    console.log(`Dry run: ${updatedCandidates.length} candidates would be updated.`)
    console.log(updatedCandidates.join('\n'))
    return
  }

  await batch.commit()
  console.log(`Updated ${updatedCandidates.length} candidates with childhood biography context.`)
  console.log(updatedCandidates.join('\n'))
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
