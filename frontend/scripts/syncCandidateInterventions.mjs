import crypto from 'node:crypto'
import { initializeApp } from 'firebase/app'
import { getFirebaseConfig } from './firebaseConfig.mjs'
import { collection, doc, getDocs, getFirestore, writeBatch } from 'firebase/firestore'

const firebaseConfig = getFirebaseConfig()

const CANDIDATES_COLLECTION = 'candidates_2027'
const RAW_INTERVENTIONS_COLLECTION = 'candidate_interventions_2027'
const MEDIA_ATTENTION_COLLECTION = 'candidate_media_attention_2027'
const TODAY_ISO = new Date().toISOString().slice(0, 10)
const NOW_ISO = new Date().toISOString()
const MEDIA_CLOUD_BASE_API_URL = 'https://search.mediacloud.org/api/'
const MEDIA_CLOUD_PROVIDER = 'onlinenews-mediacloud'
const DEFAULT_MEDIA_CLOUD_COLLECTION_IDS = [34412146]

const args = process.argv.slice(2)
const DRY_RUN = args.includes('--dry-run')
const YOUTUBE_ONLY = args.includes('--youtube-only')
const candidateFilterArg = args.find((entry) => entry.startsWith('--candidate='))
const candidateLimitArg = args.find((entry) => entry.startsWith('--candidate-limit='))
const providersArg = args.find((entry) => entry.startsWith('--providers='))
const candidateFilter = candidateFilterArg ? new Set(candidateFilterArg.slice('--candidate='.length).split(',').map((entry) => entry.trim()).filter(Boolean)) : null
const candidateLimit = candidateLimitArg ? Number.parseInt(candidateLimitArg.slice('--candidate-limit='.length), 10) : null
const enabledProviders = providersArg
  ? new Set(
      providersArg
        .slice('--providers='.length)
        .split(',')
        .map((entry) => entry.trim())
        .filter(Boolean),
    )
  : YOUTUBE_ONLY
    ? new Set(['youtube'])
    : new Set(['gdelt', 'youtube', 'mediacloud'])

const GDELT_DELAY_MS = 5500
const MEDIA_CLOUD_DELAY_MS = Number.parseInt(process.env.MEDIA_CLOUD_DELAY_MS ?? '1500', 10)
const FETCH_TIMEOUT_MS = 25000
const FETCH_RETRY_COUNT = 3
const LOOKBACK_DAYS = Number.parseInt(process.env.INTERVENTION_LOOKBACK_DAYS ?? '45', 10)
const MEDIA_ATTENTION_TIMESPAN = process.env.MEDIA_ATTENTION_TIMESPAN ?? '3months'
const MAX_GDELT_ARTICLES = Number.parseInt(process.env.GDELT_MAX_RECORDS ?? '3', 10)
const MAX_YOUTUBE_VIDEOS = Number.parseInt(process.env.YOUTUBE_MAX_RESULTS ?? '3', 10)
const MAX_CANDIDATE_INTERVENTIONS = Number.parseInt(process.env.MAX_CANDIDATE_INTERVENTIONS ?? '8', 10)
const MAX_MEDIA_ATTENTION_PEAK_STORIES = Number.parseInt(process.env.MEDIA_ATTENTION_PEAK_STORIES ?? '3', 10)
const YOUTUBE_API_KEY = (process.env.YOUTUBE_API_KEY ?? '').trim() || firebaseConfig.apiKey
const MEDIA_CLOUD_API_KEY = (process.env.MEDIA_CLOUD_API_KEY ?? '').trim()
const MEDIA_CLOUD_COLLECTION_IDS = (process.env.MEDIA_CLOUD_COLLECTION_IDS ?? '')
  .split(',')
  .map((entry) => Number.parseInt(entry.trim(), 10))
  .filter((entry) => Number.isInteger(entry) && entry > 0)
const EFFECTIVE_MEDIA_CLOUD_COLLECTION_IDS =
  MEDIA_CLOUD_COLLECTION_IDS.length > 0 ? MEDIA_CLOUD_COLLECTION_IDS : DEFAULT_MEDIA_CLOUD_COLLECTION_IDS

const commonStopWords = new Set(['de', 'du', 'des', 'la', 'le', 'les', 'et', 'a', 'au', 'aux'])

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function normalizeText(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function stableHash(value) {
  return crypto.createHash('sha1').update(value).digest('hex').slice(0, 12)
}

function truncate(value, maxLength) {
  if (value.length <= maxLength) {
    return value
  }

  return `${value.slice(0, maxLength - 1).trimEnd()}…`
}

function toIsoDateTimeDaysAgo(days) {
  const target = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
  return target.toISOString()
}

function toIsoDate(value) {
  if (typeof value !== 'string' || value.length === 0) {
    return TODAY_ISO
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value
  }

  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    return TODAY_ISO
  }

  return parsed.toISOString().slice(0, 10)
}

function toIsoDateFromUnknown(value) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    return null
  }

  const trimmedValue = value.trim()

  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmedValue)) {
    return trimmedValue
  }

  const compactDateMatch = trimmedValue.match(/^(\d{4})(\d{2})(\d{2})/)
  if (compactDateMatch) {
    return `${compactDateMatch[1]}-${compactDateMatch[2]}-${compactDateMatch[3]}`
  }

  const parsed = new Date(trimmedValue)
  if (Number.isNaN(parsed.getTime())) {
    return null
  }

  return parsed.toISOString().slice(0, 10)
}

function parseNumericValue(value) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }

  if (typeof value === 'string' && value.trim().length > 0) {
    const parsed = Number.parseFloat(value)
    return Number.isFinite(parsed) ? parsed : null
  }

  return null
}

function getMediaAttentionRange() {
  const endDate = new Date()
  const startDate = new Date(endDate)

  if (MEDIA_ATTENTION_TIMESPAN === '1month') {
    startDate.setUTCMonth(startDate.getUTCMonth() - 1)
  } else {
    startDate.setUTCMonth(startDate.getUTCMonth() - 3)
  }

  return {
    start: startDate.toISOString().slice(0, 10),
    end: endDate.toISOString().slice(0, 10),
  }
}

function sanitizeWhitespace(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim()
}

function decodeHtmlEntities(value) {
  const namedHtmlEntities = {
    amp: '&',
    apos: "'",
    nbsp: ' ',
    quot: '"',
    lt: '<',
    gt: '>',
    eacute: 'e',
    egrave: 'e',
    ecirc: 'e',
    agrave: 'a',
    ugrave: 'u',
    ocirc: 'o',
    rsquo: "'",
    lsquo: "'",
    ldquo: '"',
    rdquo: '"',
    ndash: '-',
    mdash: '-',
  }

  return String(value).replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (entity, token) => {
    if (token.startsWith('#x') || token.startsWith('#X')) {
      const codePoint = Number.parseInt(token.slice(2), 16)
      return Number.isNaN(codePoint) ? entity : String.fromCodePoint(codePoint)
    }

    if (token.startsWith('#')) {
      const codePoint = Number.parseInt(token.slice(1), 10)
      return Number.isNaN(codePoint) ? entity : String.fromCodePoint(codePoint)
    }

    return namedHtmlEntities[token.toLowerCase()] ?? entity
  })
}

function sanitizeText(value) {
  return decodeHtmlEntities(sanitizeWhitespace(value))
}

function buildCandidateMatchingPhrases(candidateName) {
  const normalizedName = normalizeText(candidateName)
  const tokens = normalizedName.split(' ').filter(Boolean)
  const phrases = new Set([normalizedName])

  if (tokens.length >= 2) {
    phrases.add(tokens.slice(-2).join(' '))
  }

  for (const token of tokens) {
    if (token.length >= 5 && !commonStopWords.has(token)) {
      phrases.add(token)
    }
  }

  return [...phrases].filter(Boolean)
}

function matchesCandidate(candidateName, text) {
  const normalizedText = normalizeText(text)
  if (!normalizedText) {
    return false
  }

  return buildCandidateMatchingPhrases(candidateName).some((phrase) => normalizedText.includes(phrase))
}

function buildGdeltQuery(candidateName) {
  const normalizedName = normalizeText(candidateName)
  const tokenCount = normalizedName.split(' ').filter(Boolean).length
  const nearDistance = Math.max(6, tokenCount * 3)

  return `near${nearDistance}:"${normalizedName}" sourcecountry:france sourcelang:french`
}

function buildMediaCloudQuery(candidateName) {
  const exactName = sanitizeWhitespace(candidateName)
  const accentlessName = sanitizeWhitespace(
    candidateName.normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
  )
  const spaceNormalizedName = sanitizeWhitespace(
    candidateName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^A-Za-z0-9]+/g, ' '),
  )

  const variants = [...new Set([exactName, accentlessName, spaceNormalizedName])].filter(
    (entry) => entry.length > 2,
  )

  return variants.map((entry) => `"${entry.replace(/"/g, '\\"')}"`).join(' OR ')
}

function createRawInterventionDocument(candidate, provider, entry) {
  return {
    id: `${candidate.id}-${provider}-${stableHash(entry.source.url)}`,
    candidateId: candidate.id,
    candidateName: candidate.name,
    provider,
    type: entry.type,
    title: entry.title,
    excerpt: entry.excerpt,
    context: entry.context,
    source: entry.source,
    providerData: entry.providerData ?? null,
    publishedAt: entry.source.date,
    dataLastUpdated: TODAY_ISO,
    syncedAt: NOW_ISO,
    autoGenerated: true,
  }
}

function parseExistingInterventions(value) {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .filter((entry) => typeof entry === 'object' && entry !== null)
    .map((entry) => ({
      id: typeof entry.id === 'string' ? entry.id : stableHash(JSON.stringify(entry)),
      type: entry.type === 'video' || entry.type === 'quote' || entry.type === 'post' ? entry.type : 'quote',
      title: typeof entry.title === 'string' ? entry.title : 'Intervention documentee',
      excerpt: typeof entry.excerpt === 'string' ? entry.excerpt : '',
      context: typeof entry.context === 'string' ? entry.context : '',
      source: {
        label: typeof entry.source?.label === 'string' ? entry.source.label : 'Source publique',
        url: typeof entry.source?.url === 'string' ? entry.source.url : '',
        date: toIsoDate(entry.source?.date),
      },
    }))
    .filter((entry) => entry.source.url)
}

function mergeInterventions(existingEntries, importedEntries) {
  const deduped = new Map()

  for (const entry of [...importedEntries, ...existingEntries]) {
    const key = `${entry.type}:${entry.source.url}`
    if (!deduped.has(key)) {
      deduped.set(key, {
        ...entry,
        source: {
          ...entry.source,
          date: toIsoDate(entry.source.date),
        },
      })
    }
  }

  return [...deduped.values()]
    .sort((first, second) => second.source.date.localeCompare(first.source.date))
    .slice(0, MAX_CANDIDATE_INTERVENTIONS)
}

function buildSyncMeta(candidate, gdeltCount, youtubeCount, youtubeStatus, mediaAttentionPointCount) {
  return {
    lastRunAt: NOW_ISO,
    queryWindowDays: LOOKBACK_DAYS,
    providers: {
      gdelt: {
        importedCount: gdeltCount,
        query: buildGdeltQuery(candidate.name),
      },
      youtube: {
        importedCount: youtubeCount,
        status: youtubeStatus,
      },
      mediacloud: {
        pointCount: mediaAttentionPointCount,
        query: buildMediaCloudQuery(candidate.name),
        timeSpan: MEDIA_ATTENTION_TIMESPAN,
        collectionIds: EFFECTIVE_MEDIA_CLOUD_COLLECTION_IDS,
      },
    },
  }
}

async function fetchJson(url, label, options = {}) {
  const retries = options.retries ?? FETCH_RETRY_COUNT
  const retryDelayMs = options.retryDelayMs ?? 2000
  const headers = options.headers ?? undefined

  for (let attempt = 1; attempt <= retries; attempt += 1) {
    let response

    try {
      response = await fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS), headers })
    } catch (error) {
      if (attempt === retries) {
        throw new Error(`${label}: network failure (${error.message})`)
      }

      await sleep(retryDelayMs)
      continue
    }

    const responseText = await response.text()
    const isJson = (response.headers.get('content-type') ?? '').includes('application/json')

    if (!response.ok) {
      if (response.status === 429 && attempt < retries) {
        await sleep(retryDelayMs)
        continue
      }

      let message = responseText
      if (isJson) {
        try {
          const payload = JSON.parse(responseText)
          message = payload.error?.message ?? JSON.stringify(payload)
        } catch {
          // Keep raw text message.
        }
      }

      throw new Error(`${label}: HTTP ${response.status} - ${truncate(message, 220)}`)
    }

    try {
      return JSON.parse(responseText)
    } catch (error) {
      if (attempt === retries) {
        throw new Error(`${label}: invalid JSON payload (${error.message})`)
      }
    }
  }

  throw new Error(`${label}: unreachable state`)
}

async function fetchGdeltInterventions(candidate) {
  const params = new URLSearchParams({
    query: buildGdeltQuery(candidate.name),
    mode: 'ArtList',
    maxrecords: String(MAX_GDELT_ARTICLES),
    format: 'json',
    sort: 'DateDesc',
  })

  const payload = await fetchJson(
    `https://api.gdeltproject.org/api/v2/doc/doc?${params.toString()}`,
    `GDELT ${candidate.id}`,
    { retryDelayMs: GDELT_DELAY_MS },
  )

  const articles = Array.isArray(payload.articles) ? payload.articles : []

  return articles
    .filter((article) => {
      const title = sanitizeWhitespace(article.title)
      const url = sanitizeWhitespace(article.url)
      return url && title && matchesCandidate(candidate.name, `${title} ${url}`)
    })
    .map((article) => ({
      id: `gdelt-${stableHash(article.url)}`,
      type: 'quote',
      title: sanitizeWhitespace(article.title),
      excerpt: truncate(
        `Article detecte automatiquement dans ${sanitizeWhitespace(article.domain || 'un media')} autour de ${candidate.name}.`,
        180,
      ),
      context:
        'Repere automatiquement via GDELT dans la presse web francaise. Verification editoriale recommandee avant republication en front.',
      source: {
        label: sanitizeWhitespace(article.domain || 'GDELT'),
        url: sanitizeWhitespace(article.url),
        date: toIsoDate(article.seendate),
      },
    }))
}

async function fetchMediaCloudAttention(candidate) {
  if (!MEDIA_CLOUD_API_KEY) {
    throw new Error('Missing MEDIA_CLOUD_API_KEY.')
  }

  const range = getMediaAttentionRange()
  const params = new URLSearchParams({
    q: buildMediaCloudQuery(candidate.name),
    start: range.start,
    end: range.end,
    platform: MEDIA_CLOUD_PROVIDER,
  })

  if (EFFECTIVE_MEDIA_CLOUD_COLLECTION_IDS.length > 0) {
    params.set('cs', EFFECTIVE_MEDIA_CLOUD_COLLECTION_IDS.join(','))
  }

  const payload = await fetchJson(
    `${MEDIA_CLOUD_BASE_API_URL}search/count-over-time?${params.toString()}`,
    `Media Cloud ${candidate.id}`,
    {
      retryDelayMs: MEDIA_CLOUD_DELAY_MS * 2,
      headers: {
        Accept: 'application/json',
        Authorization: `Token ${MEDIA_CLOUD_API_KEY}`,
      },
    },
  )

  const counts = Array.isArray(payload?.count_over_time?.counts) ? payload.count_over_time.counts : []

  return counts
    .map((entry) => {
      const date = toIsoDateFromUnknown(entry.date)
      const count = parseNumericValue(entry.count)
      const ratio = parseNumericValue(entry.ratio)

      if (!date || count === null) {
        return null
      }

      return {
        date,
        value: count,
        normalizedValue: ratio === null ? null : ratio * 100,
      }
    })
    .filter(Boolean)
    .sort((first, second) => first.date.localeCompare(second.date))
}

function getPeakPoint(points) {
  return (
    points.reduce((currentPeak, point) => {
      if (currentPeak === null || point.value > currentPeak.value) {
        return point
      }

      return currentPeak
    }, null) ?? null
  )
}

async function fetchMediaCloudPeakStories(candidate, date) {
  if (!MEDIA_CLOUD_API_KEY) {
    throw new Error('Missing MEDIA_CLOUD_API_KEY.')
  }

  const nextDate = new Date(`${date}T12:00:00Z`)
  nextDate.setUTCDate(nextDate.getUTCDate() + 1)

  const params = new URLSearchParams({
    q: buildMediaCloudQuery(candidate.name),
    start: date,
    end: nextDate.toISOString().slice(0, 10),
    platform: MEDIA_CLOUD_PROVIDER,
    page_size: String(MAX_MEDIA_ATTENTION_PEAK_STORIES),
  })

  if (EFFECTIVE_MEDIA_CLOUD_COLLECTION_IDS.length > 0) {
    params.set('cs', EFFECTIVE_MEDIA_CLOUD_COLLECTION_IDS.join(','))
  }

  const payload = await fetchJson(
    `${MEDIA_CLOUD_BASE_API_URL}search/story-list?${params.toString()}`,
    `Media Cloud peak stories ${candidate.id}`,
    {
      retryDelayMs: MEDIA_CLOUD_DELAY_MS * 2,
      headers: {
        Accept: 'application/json',
        Authorization: `Token ${MEDIA_CLOUD_API_KEY}`,
      },
    },
  )

  const stories = Array.isArray(payload?.stories) ? payload.stories : []

  return stories
    .map((story) => {
      const title = sanitizeText(story.title)
      const url = sanitizeWhitespace(story.url)
      const mediaName = sanitizeText(story.media_name)
      const publishDate = toIsoDate(story.publish_date)

      if (!title || !url || !mediaName) {
        return null
      }

      return {
        title,
        url,
        mediaName,
        publishDate,
      }
    })
    .filter(Boolean)
}

async function fetchYouTubeInterventions(candidate) {
  const params = new URLSearchParams({
    part: 'snippet',
    q: candidate.name,
    type: 'video',
    order: 'date',
    maxResults: String(MAX_YOUTUBE_VIDEOS),
    publishedAfter: toIsoDateTimeDaysAgo(LOOKBACK_DAYS),
    relevanceLanguage: 'fr',
    regionCode: 'FR',
    key: YOUTUBE_API_KEY,
  })

  const payload = await fetchJson(
    `https://www.googleapis.com/youtube/v3/search?${params.toString()}`,
    `YouTube ${candidate.id}`,
  )

  const items = Array.isArray(payload.items) ? payload.items : []

  return items
    .filter((item) => {
      const title = sanitizeText(item.snippet?.title)
      const description = sanitizeText(item.snippet?.description)
      return item.id?.videoId && matchesCandidate(candidate.name, `${title} ${description}`)
    })
    .map((item) => {
      const title = sanitizeText(item.snippet?.title)
      const description = sanitizeText(item.snippet?.description)
      const channelTitle = sanitizeText(item.snippet?.channelTitle || 'YouTube')
      const publishedAt = toIsoDate(item.snippet?.publishedAt)

      return {
        id: `youtube-${item.id.videoId}`,
        type: 'video',
        title,
        excerpt: truncate(
          description || `Video detectee automatiquement sur la chaine ${channelTitle}.`,
          180,
        ),
        context:
          'Repere automatiquement via YouTube Data API a partir du nom du candidat. Verification editoriale recommandee avant mise en avant.',
        source: {
          label: `YouTube • ${channelTitle}`,
          url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          date: publishedAt,
        },
        providerData: {
          videoId: item.id.videoId,
          channelTitle,
          thumbnailUrl:
            item.snippet?.thumbnails?.high?.url ??
            item.snippet?.thumbnails?.medium?.url ??
            item.snippet?.thumbnails?.default?.url ??
            null,
          publishedAt: item.snippet?.publishedAt ?? null,
          description,
        },
      }
    })
}

async function readCandidates(db) {
  const snapshot = await getDocs(collection(db, CANDIDATES_COLLECTION))
  const candidates = snapshot.docs
    .map((entry) => ({
      id: entry.id,
      ...entry.data(),
      existingInterventions: parseExistingInterventions(entry.data().interventions),
    }))
    .filter((candidate) => typeof candidate.name === 'string' && typeof candidate.priority === 'number')
    .sort((first, second) => first.priority - second.priority)

  if (candidateFilter) {
    return candidates.filter((candidate) => candidateFilter.has(candidate.id))
  }

  if (Number.isInteger(candidateLimit) && candidateLimit > 0) {
    return candidates.slice(0, candidateLimit)
  }

  return candidates
}

async function syncCandidateInterventions() {
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  const candidates = await readCandidates(db)

  if (candidates.length === 0) {
    throw new Error('No candidate found to sync interventions.')
  }

  const providerStats = {
    gdelt: 0,
    youtube: 0,
    youtubeBlocked: false,
    mediaCloudTimelinePoints: 0,
    mediaCloudConfigured: Boolean(MEDIA_CLOUD_API_KEY),
  }

  const candidateUpdates = []
  const rawInterventionDocs = []
  const mediaAttentionDocs = []

  for (const [index, candidate] of candidates.entries()) {
    if (index > 0 && enabledProviders.has('gdelt')) {
      await sleep(GDELT_DELAY_MS)
    }

    if (index > 0 && enabledProviders.has('mediacloud')) {
      await sleep(MEDIA_CLOUD_DELAY_MS)
    }

    let gdeltEntries = []
    let mediaCloudAttention = undefined
    let mediaCloudPeakContext = null
    let youtubeEntries = []
    let youtubeStatus = 'ok'

    if (enabledProviders.has('gdelt')) {
      try {
        gdeltEntries = await fetchGdeltInterventions(candidate)
        providerStats.gdelt += gdeltEntries.length
      } catch (error) {
        console.warn(`[GDELT] ${candidate.id}: ${error.message}`)
      }

    }

    if (enabledProviders.has('mediacloud')) {
      try {
        mediaCloudAttention = await fetchMediaCloudAttention(candidate)
        providerStats.mediaCloudTimelinePoints += mediaCloudAttention.length
        const peakPoint = getPeakPoint(mediaCloudAttention)
        if (peakPoint) {
          await sleep(MEDIA_CLOUD_DELAY_MS)

          try {
            const peakStories = await fetchMediaCloudPeakStories(candidate, peakPoint.date)
            mediaCloudPeakContext = {
              date: peakPoint.date,
              value: peakPoint.value,
              normalizedValue: peakPoint.normalizedValue ?? null,
              stories: peakStories,
            }
          } catch (error) {
            console.warn(`[Media Cloud peak stories] ${candidate.id}: ${error.message}`)
            mediaCloudPeakContext = {
              date: peakPoint.date,
              value: peakPoint.value,
              normalizedValue: peakPoint.normalizedValue ?? null,
              stories: [],
            }
          }
        }
      } catch (error) {
        console.warn(`[Media Cloud] ${candidate.id}: ${error.message}`)
      }
    }

    if (enabledProviders.has('youtube') && !providerStats.youtubeBlocked) {
      try {
        youtubeEntries = await fetchYouTubeInterventions(candidate)
        providerStats.youtube += youtubeEntries.length
      } catch (error) {
        const errorMessage = error.message || String(error)
        if (
          errorMessage.includes('API_KEY_SERVICE_BLOCKED') ||
          errorMessage.includes('youtube.api.v3.V3DataSearchService.List are blocked')
        ) {
          providerStats.youtubeBlocked = true
          youtubeStatus = 'blocked'
          console.warn('[YouTube] API blocked for the provided key. Enable youtube.googleapis.com on project 171363522127 to import videos.')
        } else {
          youtubeStatus = 'error'
          console.warn(`[YouTube] ${candidate.id}: ${errorMessage}`)
        }
      }
    } else if (enabledProviders.has('youtube')) {
      youtubeStatus = 'blocked'
    }

    const mergedInterventions = mergeInterventions(candidate.existingInterventions, [...youtubeEntries, ...gdeltEntries])

    candidateUpdates.push({
      candidateId: candidate.id,
      interventions: mergedInterventions,
      interventionsSyncMeta: buildSyncMeta(
        candidate,
        gdeltEntries.length,
        youtubeEntries.length,
        youtubeStatus,
        mediaCloudAttention?.length ?? 0,
      ),
      dataLastUpdated: TODAY_ISO,
    })

    for (const entry of gdeltEntries) {
      rawInterventionDocs.push(createRawInterventionDocument(candidate, 'gdelt', entry))
    }

    if (enabledProviders.has('mediacloud') && mediaCloudAttention !== undefined) {
      const latestPoint =
        mediaCloudAttention.length > 0 ? mediaCloudAttention[mediaCloudAttention.length - 1] : null
      const peakPoint =
        mediaCloudAttention.reduce(
          (currentPeak, point) => {
            if (currentPeak === null || point.value > currentPeak.value) {
              return point
            }

            return currentPeak
          },
          null,
        ) ?? null

      mediaAttentionDocs.push({
        id: candidate.id,
        candidateId: candidate.id,
        candidateName: candidate.name,
        provider: 'mediacloud',
        query: buildMediaCloudQuery(candidate.name),
        timeSpan: MEDIA_ATTENTION_TIMESPAN,
        points: mediaCloudAttention,
        pointCount: mediaCloudAttention.length,
        latestDate: latestPoint?.date ?? null,
        latestValue: latestPoint?.value ?? null,
        peakDate: peakPoint?.date ?? null,
        peakValue: peakPoint?.value ?? null,
        peakContext: mediaCloudPeakContext,
        dataLastUpdated: TODAY_ISO,
        updatedAt: NOW_ISO,
        autoGenerated: true,
        collectionIds: EFFECTIVE_MEDIA_CLOUD_COLLECTION_IDS,
      })
    }

    for (const entry of youtubeEntries) {
      rawInterventionDocs.push(createRawInterventionDocument(candidate, 'youtube', entry))
    }
  }

  if (DRY_RUN) {
    console.log(
      JSON.stringify(
        {
          candidates: candidates.length,
          rawInterventions: rawInterventionDocs.length,
          mediaAttentionDocs: mediaAttentionDocs.length,
          providerStats,
          sampleCandidate: candidateUpdates[0],
        },
        null,
        2,
      ),
    )
    return
  }

  const batch = writeBatch(db)

  for (const update of candidateUpdates) {
    batch.set(
      doc(db, CANDIDATES_COLLECTION, update.candidateId),
      {
        interventions: update.interventions,
        interventionsSyncMeta: update.interventionsSyncMeta,
        dataLastUpdated: update.dataLastUpdated,
      },
      { merge: true },
    )
  }

  for (const rawDoc of rawInterventionDocs) {
    batch.set(doc(db, RAW_INTERVENTIONS_COLLECTION, rawDoc.id), rawDoc, { merge: true })
  }

  for (const mediaAttentionDoc of mediaAttentionDocs) {
    batch.set(doc(db, MEDIA_ATTENTION_COLLECTION, mediaAttentionDoc.id), mediaAttentionDoc, { merge: true })
  }

  await batch.commit()

  console.log(
    JSON.stringify(
      {
        candidates: candidateUpdates.length,
        rawInterventions: rawInterventionDocs.length,
        mediaAttentionDocs: mediaAttentionDocs.length,
        providerStats,
      },
      null,
      2,
    ),
  )
}

await syncCandidateInterventions()
