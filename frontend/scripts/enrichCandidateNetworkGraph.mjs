import { initializeApp } from 'firebase/app'
import { collection, doc, getDocs, getFirestore, writeBatch } from 'firebase/firestore'
import { getFirebaseConfig } from './firebaseConfig.mjs'

const firebaseConfig = getFirebaseConfig()

const CANDIDATES_COLLECTION = 'candidates_2027'
const DATA_LAST_UPDATED = '2026-03-11'
const DRY_RUN = process.argv.includes('--dry-run')

const actorImageSpecs = {
  Horizons: { type: 'wikimedia-file', file: 'Logo Horizons.svg' },
  'Ville du Havre': { type: 'wikipedia', title: 'Le_Havre' },
  'Etat (Matignon)': { type: 'wikipedia', title: 'Hôtel_Matignon' },
  'Région Hauts-de-France': { type: 'wikipedia', title: 'Hauts-de-France' },
  'Region Hauts-de-France': { type: 'wikipedia', title: 'Hauts-de-France' },
  'Les Républicains': { type: 'wikipedia', title: 'Les_Républicains' },
  'Les Republicains': { type: 'wikipedia', title: 'Les_Républicains' },
  'Lutte Ouvrière': { type: 'wikimedia-file', file: 'Logo Lutte Ouvrière.svg' },
  'Militantisme syndical et ouvrier': { type: 'wikimedia-file', file: 'Logo Lutte Ouvrière.svg' },
  'Campagnes présidentielles LO': { type: 'wikimedia-file', file: 'Logo Lutte Ouvrière.svg' },
  'Campagnes presidentielles LO': { type: 'wikimedia-file', file: 'Logo Lutte Ouvrière.svg' },
  'Génération Écologie': { type: 'wikipedia', title: 'Génération_écologie' },
  'Generation Écologie': { type: 'wikipedia', title: 'Génération_écologie' },
  'Assemblee nationale': { type: 'wikipedia', title: 'Assemblée_nationale_(France)' },
  'Assemblée nationale': { type: 'wikipedia', title: 'Assemblée_nationale_(France)' },
  'Ancien ministere de l’Écologie': { type: 'wikipedia', title: 'Ministère_de_la_Transition_écologique' },
  'Ancien ministère de l’Écologie': { type: 'wikipedia', title: 'Ministère_de_la_Transition_écologique' },
  'Les Écologistes': { type: 'official-meta', url: 'https://lesecologistes.fr' },
  'Primaire de la gauche': { type: 'wikipedia', title: 'Parti_socialiste_(France)' },
  'Ancrage local (Pas-de-Calais)': { type: 'wikipedia', title: 'Pas-de-Calais' },
  'Rassemblement national': { type: 'wikimedia-file', file: 'Logo Rassemblement National.svg' },
  'Groupe RN a l’Assemblee nationale': { type: 'wikimedia-file', file: 'Logo Rassemblement National.svg' },
  'Groupe RN a l\'Assemblee nationale': { type: 'wikimedia-file', file: 'Logo Rassemblement National.svg' },
  'Jordan Bardella': { type: 'wikipedia', title: 'Jordan_Bardella' },
  'Marine Le Pen': { type: 'wikipedia', title: 'Marine_Le_Pen' },
  'Tandem avec Marine Le Pen': { type: 'wikipedia', title: 'Marine_Le_Pen' },
  'Place publique': { type: 'wikipedia', title: 'Place_publique_(parti_politique)' },
  'Parlement européen': { type: 'wikipedia', title: 'Parlement_européen' },
  'Parlement europeen': { type: 'wikipedia', title: 'Parlement_européen' },
  'Alliance PS-Place publique': { type: 'wikipedia', title: 'Place_publique_(parti_politique)' },
  'Aurore Lalucq': { type: 'wikipedia', title: 'Aurore_Lalucq' },
  Renaissance: { type: 'wikipedia', title: 'Renaissance_(parti)' },
  'Gabriel Attal': { type: 'wikipedia', title: 'Gabriel_Attal' },
  'Édouard Philippe': { type: 'wikipedia', title: 'Édouard_Philippe' },
  'Edouard Philippe': { type: 'wikipedia', title: 'Édouard_Philippe' },
  'Gérald Darmanin': { type: 'wikipedia', title: 'Gérald_Darmanin' },
  'Gerald Darmanin': { type: 'wikipedia', title: 'Gérald_Darmanin' },
  'Groupe Ensemble pour la République': { type: 'wikipedia', title: 'Assemblée_nationale_(France)' },
  'Jeunes macronistes': { type: 'wikipedia', title: 'Renaissance_(parti)' },
  'La France insoumise': { type: 'wikipedia', title: 'La_France_insoumise' },
  'Jean-Luc Mélenchon': { type: 'wikipedia', title: 'Jean-Luc_Mélenchon' },
  'Jean-Luc Melenchon': { type: 'wikipedia', title: 'Jean-Luc_Mélenchon' },
  'Institut La Boétie': { type: 'wikipedia', title: 'Institut_La_Boétie_(2020)' },
  'Institut La Boetie': { type: 'wikipedia', title: 'Institut_La_Boétie_(2020)' },
  'Écosystème insoumis': { type: 'wikipedia', title: 'La_France_insoumise' },
  'Ecosysteme insoumis': { type: 'wikipedia', title: 'La_France_insoumise' },
  'François Ruffin': { type: 'wikipedia', title: 'François_Ruffin' },
  'Francois Ruffin': { type: 'wikipedia', title: 'François_Ruffin' },
  Sénat: { type: 'wikipedia', title: 'Sénat_(France)' },
  Senat: { type: 'wikipedia', title: 'Sénat_(France)' },
  'Droite régalienne': { type: 'wikipedia', title: 'Les_Républicains' },
  'Droite regalienne': { type: 'wikipedia', title: 'Les_Républicains' },
  'Laurent Wauquiez': { type: 'wikipedia', title: 'Laurent_Wauquiez' },
  'Michel Barnier': { type: 'wikipedia', title: 'Michel_Barnier' },
  'Ministère de la Justice': { type: 'wikipedia', title: 'Ministère_de_la_Justice_(France)' },
  'Ministere de la Justice': { type: 'wikipedia', title: 'Ministère_de_la_Justice_(France)' },
  'Les Populaires': { type: 'official-meta', url: 'https://populaires.net/decouvrir-populaires/' },
  Populaires: { type: 'official-meta', url: 'https://populaires.net/decouvrir-populaires/' },
  Tourcoing: { type: 'wikipedia', title: 'Tourcoing' },
  'Mouvement Debout': { type: 'wikipedia', title: 'Debout_!' },
  'Debout !': { type: 'wikipedia', title: 'Debout_!' },
  'Marine Tondelier': { type: 'wikipedia', title: 'Marine_Tondelier' },
  'Parti socialiste': { type: 'wikipedia', title: 'Parti_socialiste_(France)' },
  'Nouveau Parti anticapitaliste': { type: 'wikipedia', title: 'Nouveau_Parti_anticapitaliste' },
  'Arlette Laguiller': { type: 'wikipedia', title: 'Arlette_Laguiller' },
  "Cour d'appel de Paris": { type: 'wikipedia', title: "Cour_d'appel_en_France" },
  "Cour d’appel de Paris": { type: 'wikipedia', title: "Cour_d'appel_en_France" },
  'Primaire de la gauche unitaire': { type: 'wikipedia', title: 'Parti_socialiste_(France)' },
}

const imageCache = new Map()

function normalizeText(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function classifyNetworkTone(entry) {
  const haystack = normalizeText(`${entry.actor} ${entry.role} ${entry.relation}`)

  const rivalKeywords = ['rival', 'advers', 'oppos', 'contre', 'face', 'concurr', 'rapport de force', 'match']
  if (rivalKeywords.some((keyword) => haystack.includes(keyword))) {
    return 'rival'
  }

  const institutionKeywords = [
    'assemblee',
    'parlement',
    'senat',
    'ministere',
    'gouvernement',
    'ville',
    'region',
    'commission',
    'chancellerie',
    'matignon',
    'maire',
    'senateur',
    'depute',
    'territorial',
  ]
  if (institutionKeywords.some((keyword) => haystack.includes(keyword))) {
    return 'institution'
  }

  return 'ally'
}

function resolveUrl(url, baseUrl) {
  try {
    return new URL(url, baseUrl).toString()
  } catch {
    return null
  }
}

async function fetchWikipediaImage(title) {
  const cacheKey = `wiki:${title}`
  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey)
  }

  try {
    const response = await fetch(`https://fr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`)
    if (response.ok) {
      const payload = await response.json()
      const summaryImageUrl = payload?.thumbnail?.source ?? payload?.originalimage?.source ?? null
      if (summaryImageUrl) {
        imageCache.set(cacheKey, summaryImageUrl)
        return summaryImageUrl
      }
    }

    const pageImageResponse = await fetch(
      `https://fr.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&pithumbsize=320&format=json&origin=*`,
    )
    if (!pageImageResponse.ok) {
      imageCache.set(cacheKey, null)
      return null
    }

    const pageImagePayload = await pageImageResponse.json()
    const pages = pageImagePayload?.query?.pages ?? {}
    const firstPage = Object.values(pages)[0]
    const pageImageUrl = firstPage?.thumbnail?.source ?? null
    imageCache.set(cacheKey, pageImageUrl)
    return pageImageUrl
  } catch {
    imageCache.set(cacheKey, null)
    return null
  }
}

function getWikimediaFileUrl(fileName) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}?width=320`
}

async function fetchOfficialMetadataImage(url) {
  const cacheKey = `meta:${url}`
  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey)
  }

  try {
    const response = await fetch(url, {
      headers: {
        'user-agent': 'Mozilla/5.0',
        accept: 'text/html,application/xhtml+xml',
      },
    })

    if (!response.ok) {
      imageCache.set(cacheKey, null)
      return null
    }

    const html = await response.text()
    const ogImageMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
    const twitterImageMatch = html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i)
    const appleIconMatch = html.match(/<link[^>]+rel=["'][^"']*apple-touch-icon[^"']*["'][^>]+href=["']([^"']+)["']/i)
    const iconMatch = html.match(/<link[^>]+rel=["'][^"']*icon[^"']*["'][^>]+href=["']([^"']+)["']/i)

    const candidateImage =
      ogImageMatch?.[1] ?? twitterImageMatch?.[1] ?? appleIconMatch?.[1] ?? iconMatch?.[1] ?? null

    const imageUrl = candidateImage ? resolveUrl(candidateImage, url) : null
    imageCache.set(cacheKey, imageUrl)
    return imageUrl
  } catch {
    imageCache.set(cacheKey, null)
    return null
  }
}

async function resolveImageFromSpec(spec, fallbackSourceUrl) {
  if (!spec) {
    return null
  }

  if (spec.type === 'wikipedia') {
    return fetchWikipediaImage(spec.title)
  }

  if (spec.type === 'official-meta') {
    return fetchOfficialMetadataImage(spec.url)
  }

  if (spec.type === 'wikimedia-file') {
    return getWikimediaFileUrl(spec.file)
  }

  if (spec.type === 'source-meta' && fallbackSourceUrl) {
    return fetchOfficialMetadataImage(fallbackSourceUrl)
  }

  return null
}

async function getNetworkImageUrl(entry) {
  const spec = actorImageSpecs[entry.actor] ?? { type: 'source-meta' }
  const sourceUrl = typeof entry?.source?.url === 'string' ? entry.source.url : null
  return resolveImageFromSpec(spec, sourceUrl)
}

async function main() {
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  const snapshot = await getDocs(collection(db, CANDIDATES_COLLECTION))

  const candidatesToUpdate = []

  for (const entry of snapshot.docs) {
    const data = entry.data()
    if (!Array.isArray(data.network) || data.network.length === 0) {
      continue
    }

    const nextNetwork = []
    for (const networkEntry of data.network) {
      const imageUrl = await getNetworkImageUrl(networkEntry)
      nextNetwork.push({
        ...networkEntry,
        tone: networkEntry.tone ?? classifyNetworkTone(networkEntry),
        imageUrl: imageUrl ?? networkEntry.imageUrl ?? null,
      })
    }

    candidatesToUpdate.push({
      id: entry.id,
      network: nextNetwork,
    })
  }

  console.log(`Preparing ${candidatesToUpdate.length} candidate network documents.`)
  for (const candidate of candidatesToUpdate) {
    console.log(`- ${candidate.id}: ${candidate.network.length} nodes`)
  }

  if (DRY_RUN) {
    console.log('Dry run enabled. No data written.')
    return
  }

  const batch = writeBatch(db)
  for (const candidate of candidatesToUpdate) {
    batch.set(
      doc(db, CANDIDATES_COLLECTION, candidate.id),
      {
        network: candidate.network,
        dataLastUpdated: DATA_LAST_UPDATED,
      },
      { merge: true },
    )
  }

  await batch.commit()
  console.log('Network graph metadata updated.')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
