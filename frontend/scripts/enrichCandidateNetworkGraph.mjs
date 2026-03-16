import { initializeApp } from 'firebase/app'
import { collection, doc, getDocs, getFirestore, writeBatch } from 'firebase/firestore'
import { getFirebaseConfig } from './firebaseConfig.mjs'

const firebaseConfig = getFirebaseConfig()

const CANDIDATES_COLLECTION = 'candidates_2027'
const DATA_LAST_UPDATED = '2026-03-13'
const DRY_RUN = process.argv.includes('--dry-run')

const actorImageSpecs = {
  Horizons: { type: 'wikimedia-file', file: 'Logo Horizons.svg' },
  'Le Havre': { type: 'wikipedia', title: 'Le_Havre' },
  'Ville du Havre': { type: 'wikipedia', title: 'Le_Havre' },
  'Etat (Matignon)': { type: 'wikipedia', title: 'Hôtel_Matignon' },
  'Hauts-de-France': { type: 'direct', url: 'https://upload.wikimedia.org/wikipedia/fr/thumb/2/2e/R%C3%A9gion_Hauts-de-France_logo_2016.svg/langfr-330px-R%C3%A9gion_Hauts-de-France_logo_2016.svg.png' },
  'Région Hauts-de-France': { type: 'direct', url: 'https://upload.wikimedia.org/wikipedia/fr/thumb/2/2e/R%C3%A9gion_Hauts-de-France_logo_2016.svg/langfr-330px-R%C3%A9gion_Hauts-de-France_logo_2016.svg.png' },
  'Region Hauts-de-France': { type: 'direct', url: 'https://upload.wikimedia.org/wikipedia/fr/thumb/2/2e/R%C3%A9gion_Hauts-de-France_logo_2016.svg/langfr-330px-R%C3%A9gion_Hauts-de-France_logo_2016.svg.png' },
  'Saint-Quentin': { type: 'direct', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Saint-Quentin_Basilique_22.jpg/330px-Saint-Quentin_Basilique_22.jpg' },
  'Les Républicains': { type: 'direct', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/CGLR2023_-_4.png/330px-CGLR2023_-_4.png' },
  'Les Republicains': { type: 'direct', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/CGLR2023_-_4.png/330px-CGLR2023_-_4.png' },
  'Xavier Bertrand': { type: 'wikipedia', title: 'Xavier_Bertrand' },
  'Lutte Ouvrière': { type: 'wikimedia-file', file: 'Logo Lutte Ouvrière.svg' },
  'Militantisme syndical et ouvrier': { type: 'wikimedia-file', file: 'Logo Lutte Ouvrière.svg' },
  'Campagnes présidentielles LO': { type: 'wikimedia-file', file: 'Logo Lutte Ouvrière.svg' },
  'Campagnes presidentielles LO': { type: 'wikimedia-file', file: 'Logo Lutte Ouvrière.svg' },
  'Campagne présidentielle de Lutte Ouvrière': { type: 'wikimedia-file', file: 'Logo Lutte Ouvrière.svg' },
  'Campagne presidentielle de Lutte Ouvriere': { type: 'wikimedia-file', file: 'Logo Lutte Ouvrière.svg' },
  'Nathalie Arthaud': { type: 'wikipedia', title: 'Nathalie_Arthaud' },
  'Ministère de l’Éducation nationale': { type: 'direct', url: 'https://upload.wikimedia.org/wikipedia/fr/thumb/e/ec/MIN_Education_Nationale_et_Jeunesse_RVB.jpg/330px-MIN_Education_Nationale_et_Jeunesse_RVB.jpg' },
  'Ministere de l’Éducation nationale': { type: 'direct', url: 'https://upload.wikimedia.org/wikipedia/fr/thumb/e/ec/MIN_Education_Nationale_et_Jeunesse_RVB.jpg/330px-MIN_Education_Nationale_et_Jeunesse_RVB.jpg' },
  'Ministere de l\'Education nationale': { type: 'direct', url: 'https://upload.wikimedia.org/wikipedia/fr/thumb/e/ec/MIN_Education_Nationale_et_Jeunesse_RVB.jpg/330px-MIN_Education_Nationale_et_Jeunesse_RVB.jpg' },
  'Génération Écologie': { type: 'direct', url: 'https://upload.wikimedia.org/wikipedia/fr/thumb/d/d8/G%C3%A9n%C3%A9ration_%C3%A9cologie_logo.png/330px-G%C3%A9n%C3%A9ration_%C3%A9cologie_logo.png' },
  'Generation Écologie': { type: 'direct', url: 'https://upload.wikimedia.org/wikipedia/fr/thumb/d/d8/G%C3%A9n%C3%A9ration_%C3%A9cologie_logo.png/330px-G%C3%A9n%C3%A9ration_%C3%A9cologie_logo.png' },
  'Assemblee nationale': { type: 'official-meta', url: 'https://www.assemblee-nationale.fr/' },
  'Assemblée nationale': { type: 'official-meta', url: 'https://www.assemblee-nationale.fr/' },
  'Ancien ministere de l’Écologie': { type: 'wikipedia', title: 'Ministère_de_la_Transition_écologique' },
  'Ancien ministère de l’Écologie': { type: 'wikipedia', title: 'Ministère_de_la_Transition_écologique' },
  'Deux-Sèvres': { type: 'direct', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Deux-S%C3%A8vres-Position.svg/langfr-330px-Deux-S%C3%A8vres-Position.svg.png' },
  'Deux-Sevres': { type: 'direct', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Deux-S%C3%A8vres-Position.svg/langfr-330px-Deux-S%C3%A8vres-Position.svg.png' },
  'Delphine Batho': { type: 'wikipedia', title: 'Delphine_Batho' },
  'Les Écologistes': { type: 'official-meta', url: 'https://lesecologistes.fr' },
  'Hénin-Beaumont': { type: 'direct', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Mairie_Henin_Beaumont.jpg/330px-Mairie_Henin_Beaumont.jpg' },
  'Primaire de la gauche': { type: 'wikipedia', title: 'Parti_socialiste_(France)' },
  'Amiens': { type: 'wikipedia', title: 'Amiens' },
  'Somme': { type: 'direct', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Drapeau_fr_d%C3%A9partement_Somme.svg/langfr-330px-Drapeau_fr_d%C3%A9partement_Somme.svg.png' },
  'Ancrage local (Pas-de-Calais)': { type: 'wikipedia', title: 'Pas-de-Calais' },
  'Rassemblement national': { type: 'wikimedia-file', file: 'Logo Rassemblement National.svg' },
  'Groupe RN à l’Assemblée nationale': { type: 'wikimedia-file', file: 'Logo Rassemblement National.svg' },
  'Groupe RN à l\'Assemblée nationale': { type: 'wikimedia-file', file: 'Logo Rassemblement National.svg' },
  'Groupe RN a l’Assemblee nationale': { type: 'wikimedia-file', file: 'Logo Rassemblement National.svg' },
  'Groupe RN a l\'Assemblee nationale': { type: 'wikimedia-file', file: 'Logo Rassemblement National.svg' },
  'Jordan Bardella': { type: 'wikipedia', title: 'Jordan_Bardella' },
  'Marine Le Pen': { type: 'wikipedia', title: 'Marine_Le_Pen' },
  'Tandem avec Marine Le Pen': { type: 'wikipedia', title: 'Marine_Le_Pen' },
  'Raphaël Glucksmann': { type: 'wikipedia', title: 'Raphaël_Glucksmann' },
  'Raphael Glucksmann': { type: 'wikipedia', title: 'Raphaël_Glucksmann' },
  'Place publique': { type: 'direct', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Logo_Place_publique.svg/langfr-330px-Logo_Place_publique.svg.png' },
  'Parlement européen': { type: 'direct', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/European_Parliament_logo.svg/langfr-330px-European_Parliament_logo.svg.png' },
  'Parlement europeen': { type: 'direct', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/European_Parliament_logo.svg/langfr-330px-European_Parliament_logo.svg.png' },
  'Alliance PS-Place publique': { type: 'wikipedia', title: 'Place_publique_(parti_politique)' },
  'Aurore Lalucq': { type: 'wikipedia', title: 'Aurore_Lalucq' },
  Renaissance: { type: 'direct', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Renaissance-logotype-officiel.svg/langfr-330px-Renaissance-logotype-officiel.svg.png' },
  'Gabriel Attal': { type: 'wikipedia', title: 'Gabriel_Attal' },
  'Emmanuel Macron': { type: 'direct', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Macron_Alden-Biesen_2026_%28cropped%29.jpg/330px-Macron_Alden-Biesen_2026_%28cropped%29.jpg' },
  'Édouard Philippe': { type: 'wikipedia', title: 'Édouard_Philippe' },
  'Edouard Philippe': { type: 'wikipedia', title: 'Édouard_Philippe' },
  'Gérald Darmanin': { type: 'wikipedia', title: 'Gérald_Darmanin' },
  'Gerald Darmanin': { type: 'wikipedia', title: 'Gérald_Darmanin' },
  'Groupe Ensemble pour la République': { type: 'wikipedia', title: 'Assemblée_nationale_(France)' },
  'Jeunes macronistes': { type: 'wikipedia', title: 'Renaissance_(parti)' },
  'La France insoumise': { type: 'wikipedia', title: 'La_France_insoumise' },
  'Jean-Luc Mélenchon': { type: 'wikipedia', title: 'Jean-Luc_Mélenchon' },
  'Jean-Luc Melenchon': { type: 'wikipedia', title: 'Jean-Luc_Mélenchon' },
  'Institut La Boétie': { type: 'direct', url: 'https://upload.wikimedia.org/wikipedia/fr/thumb/6/64/Institut_de_la_Bo%C3%A9tie.png/330px-Institut_de_la_Bo%C3%A9tie.png' },
  'Institut La Boetie': { type: 'direct', url: 'https://upload.wikimedia.org/wikipedia/fr/thumb/6/64/Institut_de_la_Bo%C3%A9tie.png/330px-Institut_de_la_Bo%C3%A9tie.png' },
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
  'Bruno Retailleau': { type: 'wikipedia', title: 'Bruno_Retailleau' },
  'Ministère de l’Intérieur': { type: 'direct', url: 'https://upload.wikimedia.org/wikipedia/fr/thumb/0/02/Logo_du_Minist%C3%A8re_de_l%27Int%C3%A9rieur_%282020%29.svg/langfr-330px-Logo_du_Minist%C3%A8re_de_l%27Int%C3%A9rieur_%282020%29.svg.png' },
  'Ministère de l\'Intérieur': { type: 'direct', url: 'https://upload.wikimedia.org/wikipedia/fr/thumb/0/02/Logo_du_Minist%C3%A8re_de_l%27Int%C3%A9rieur_%282020%29.svg/langfr-330px-Logo_du_Minist%C3%A8re_de_l%27Int%C3%A9rieur_%282020%29.svg.png' },
  'Ministere de l\'Interieur': { type: 'direct', url: 'https://upload.wikimedia.org/wikipedia/fr/thumb/0/02/Logo_du_Minist%C3%A8re_de_l%27Int%C3%A9rieur_%282020%29.svg/langfr-330px-Logo_du_Minist%C3%A8re_de_l%27Int%C3%A9rieur_%282020%29.svg.png' },
  'Ministère de la Justice': { type: 'direct', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Minist%C3%A8re_de_la_Justice.svg/langfr-330px-Minist%C3%A8re_de_la_Justice.svg.png' },
  'Ministere de la Justice': { type: 'direct', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Minist%C3%A8re_de_la_Justice.svg/langfr-330px-Minist%C3%A8re_de_la_Justice.svg.png' },
  'Les Populaires': { type: 'official-meta', url: 'https://populaires.net/decouvrir-populaires/' },
  Populaires: { type: 'official-meta', url: 'https://populaires.net/decouvrir-populaires/' },
  Tourcoing: { type: 'direct', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Collage_Tourcoing.png/330px-Collage_Tourcoing.png' },
  'Mouvement Debout': { type: 'wikipedia', title: 'Debout_!' },
  'Debout !': { type: 'direct', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Debout-Parti-Politique.jpg/330px-Debout-Parti-Politique.jpg' },
  'Marine Tondelier': { type: 'wikipedia', title: 'Marine_Tondelier' },
  'Parti socialiste': { type: 'direct', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Logotipo_del_PS.png/330px-Logotipo_del_PS.png' },
  'Nouveau Parti anticapitaliste': { type: 'direct', url: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Logo_du_NPA_-_l%27Anticapitaliste.jpg' },
  'Arlette Laguiller': { type: 'direct', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Arlette_Laguiller_1999.jpg/330px-Arlette_Laguiller_1999.jpg' },
  "Cour d'appel de Paris": { type: 'direct', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Palais_Justice_Paris.jpg/330px-Palais_Justice_Paris.jpg' },
  "Cour d’appel de Paris": { type: 'direct', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Palais_Justice_Paris.jpg/330px-Palais_Justice_Paris.jpg' },
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

  if (spec.type === 'direct') {
    return spec.url ?? null
  }

  if (spec.type === 'source-meta' && fallbackSourceUrl) {
    return fetchOfficialMetadataImage(fallbackSourceUrl)
  }

  return null
}

function buildCandidateImageMap(snapshot) {
  const candidateImageMap = new Map()

  for (const entry of snapshot.docs) {
    const data = entry.data()
    if (typeof data?.name !== 'string' || typeof data?.photoUrl !== 'string' || data.photoUrl.length === 0) {
      continue
    }

    candidateImageMap.set(normalizeText(data.name), data.photoUrl)
  }

  return candidateImageMap
}

async function getNetworkImageUrl(entry, candidateImageMap) {
  const candidateImageUrl = candidateImageMap.get(normalizeText(entry.actor)) ?? null
  if (candidateImageUrl) {
    return candidateImageUrl
  }

  const spec = actorImageSpecs[entry.actor] ?? { type: 'source-meta' }
  const sourceUrl = typeof entry?.source?.url === 'string' ? entry.source.url : null
  return resolveImageFromSpec(spec, sourceUrl)
}

async function main() {
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  const snapshot = await getDocs(collection(db, CANDIDATES_COLLECTION))
  const candidateImageMap = buildCandidateImageMap(snapshot)

  const candidatesToUpdate = []

  for (const entry of snapshot.docs) {
    const data = entry.data()
    if (!Array.isArray(data.network) || data.network.length === 0) {
      continue
    }

    const nextNetwork = []
    for (const networkEntry of data.network) {
      const imageUrl = await getNetworkImageUrl(networkEntry, candidateImageMap)
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
