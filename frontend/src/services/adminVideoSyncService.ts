import { collection, doc, getDoc, getDocs, query, where, writeBatch } from 'firebase/firestore'
import type {
  CandidateMediaAttentionPeakContext,
  CandidateMediaAttentionPeakStory,
  CandidateMediaAttentionPoint,
} from '../data/candidateMediaAttentionTypes'
import type { Candidate, CandidateIntervention } from '../data/candidateTypes'
import { ADMIN_EMAIL, isAdminEmail } from '../config/admin'
import { db } from '../firebase'
import { decodeHtmlEntities } from '../utils/htmlEntities'

const CANDIDATES_COLLECTION = 'candidates_2027'
const RAW_INTERVENTIONS_COLLECTION = 'candidate_interventions_2027'
const MEDIA_ATTENTION_COLLECTION = 'candidate_media_attention_2027'
const TWEETS_COLLECTION = 'candidate_tweets_2027'
const LOOKBACK_DAYS = 45
const MEDIA_ATTENTION_TIMESPAN = '3months'
const MEDIA_CLOUD_BASE_API_URL = 'https://search.mediacloud.org/api/'
const MEDIA_CLOUD_PROVIDER = 'onlinenews-mediacloud'
const DEFAULT_MEDIA_CLOUD_COLLECTION_IDS = [34412146]
const MAX_YOUTUBE_RESULTS = 6
const MAX_GDELT_ARTICLES = 4
const MAX_CANDIDATE_INTERVENTIONS = 8
const MAX_MEDIA_ATTENTION_PEAK_STORIES = 3

const commonStopWords = new Set(['de', 'du', 'des', 'la', 'le', 'les', 'et', 'a', 'au', 'aux'])

interface YouTubeIntervention extends CandidateIntervention {
  providerData: {
    videoId: string
    channelTitle: string
    thumbnailUrl: string | null
    publishedAt: string | null
    description: string
  }
}

export interface RefreshCandidateVideosResult {
  candidateName: string
  candidateId: string
  importedCount: number
  updatedAt: string
}

export interface RefreshCandidateGdeltResult {
  candidateName: string
  candidateId: string
  importedCount: number
  updatedAt: string
}

export interface RefreshCandidateMediaAttentionResult {
  candidateName: string
  candidateId: string
  pointCount: number
  updatedAt: string
}

export interface RefreshCandidateTweetsResult {
  candidateName: string
  candidateId: string
  importedCount: number
  updatedAt: string
}

export interface RefreshAllCandidateTweetsResult {
  candidateCount: number
  importedCount: number
  updatedAt: string
}

export interface CandidateMediaCounts {
  youtube: number
  gdelt: number
  tweets: number
}

export interface CandidateTweetSyncStatus {
  lastRunAt: string | null
  importedCount: number | null
  status: string | null
}

function getYouTubeApiKey(): string {
  const youtubeApiKey = import.meta.env.VITE_YOUTUBE_API_KEY?.trim()
  const firebaseApiKey = import.meta.env.VITE_FIREBASE_API_KEY?.trim()
  const apiKey = youtubeApiKey || firebaseApiKey

  if (!apiKey) {
    throw new Error('Missing YouTube API key in Vite environment.')
  }

  return apiKey
}

function getMediaCloudApiKey(): string {
  const apiKey = import.meta.env.VITE_MEDIA_CLOUD_API_KEY?.trim()

  if (!apiKey) {
    throw new Error('Missing Media Cloud API key in Vite environment.')
  }

  return apiKey
}

function getAdminSyncApiUrl(): string {
  return import.meta.env.VITE_ADMIN_SYNC_API_URL?.trim() || 'http://127.0.0.1:8787'
}

async function postToAdminSync<T>(path: string, payload: Record<string, unknown>): Promise<T> {
  const response = await fetch(`${getAdminSyncApiUrl().replace(/\/$/, '')}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const body = (await response.json()) as { error?: string }

  if (!response.ok) {
    throw new Error(body.error || 'Le serveur local de sync a refuse la requete.')
  }

  return body as T
}

function getMediaCloudCollectionIds(): number[] {
  const rawValue = import.meta.env.VITE_MEDIA_CLOUD_COLLECTION_IDS?.trim()

  if (!rawValue) {
    return DEFAULT_MEDIA_CLOUD_COLLECTION_IDS
  }

  return rawValue
    .split(',')
    .map((entry) => Number.parseInt(entry.trim(), 10))
    .filter((entry) => Number.isInteger(entry) && entry > 0)
}

function sanitizeWhitespace(value: unknown): string {
  return String(value ?? '').replace(/\s+/g, ' ').trim()
}

function sanitizeText(value: unknown): string {
  return decodeHtmlEntities(sanitizeWhitespace(value))
}

function normalizeText(value: unknown): string {
  return sanitizeWhitespace(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function buildCandidateMatchingPhrases(candidateName: string): string[] {
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

function matchesCandidate(candidateName: string, text: string): boolean {
  const normalizedText = normalizeText(text)

  if (!normalizedText) {
    return false
  }

  return buildCandidateMatchingPhrases(candidateName).some((phrase) => normalizedText.includes(phrase))
}

function truncate(value: string, maxLength: number): string {
  if (value.length <= maxLength) {
    return value
  }

  return `${value.slice(0, maxLength - 1).trimEnd()}…`
}

function toIsoDate(value: string | null | undefined): string {
  if (!value) {
    return new Date().toISOString().slice(0, 10)
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value
  }

  const parsedDate = new Date(value)
  if (Number.isNaN(parsedDate.getTime())) {
    return new Date().toISOString().slice(0, 10)
  }

  return parsedDate.toISOString().slice(0, 10)
}

function toIsoDateFromUnknown(value: unknown): string | null {
  if (typeof value !== 'string') {
    return null
  }

  const trimmedValue = value.trim()
  if (!trimmedValue) {
    return null
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmedValue)) {
    return trimmedValue
  }

  const compactDateMatch = trimmedValue.match(/^(\d{4})(\d{2})(\d{2})/)
  if (compactDateMatch) {
    return `${compactDateMatch[1]}-${compactDateMatch[2]}-${compactDateMatch[3]}`
  }

  const parsedDate = new Date(trimmedValue)
  if (Number.isNaN(parsedDate.getTime())) {
    return null
  }

  return parsedDate.toISOString().slice(0, 10)
}

function parseNumericValue(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }

  if (typeof value === 'string' && value.trim().length > 0) {
    const parsedNumber = Number.parseFloat(value)
    return Number.isFinite(parsedNumber) ? parsedNumber : null
  }

  return null
}

function toIsoDateTimeDaysAgo(days: number): string {
  const target = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
  return target.toISOString()
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url)
  const payload = await response.json()

  if (!response.ok) {
    const message =
      typeof payload === 'object' && payload !== null && 'error' in payload
        ? String((payload as { error?: { message?: string } }).error?.message ?? 'Unknown error')
        : 'Unknown error'

    throw new Error(message)
  }

  return payload as T
}

async function stableHash(value: string): Promise<string> {
  const encoded = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest('SHA-1', encoded)
  const hex = [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('')
  return hex.slice(0, 12)
}

function mergeInterventions(
  existingEntries: CandidateIntervention[] | undefined,
  importedEntries: CandidateIntervention[],
): CandidateIntervention[] {
  const deduped = new Map<string, CandidateIntervention>()

  for (const entry of [...importedEntries, ...(existingEntries ?? [])]) {
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

function buildGdeltQuery(candidateName: string): string {
  const normalizedName = normalizeText(candidateName)
  const tokenCount = normalizedName.split(' ').filter(Boolean).length
  const nearDistance = Math.max(6, tokenCount * 3)

  return `near${nearDistance}:"${normalizedName}" sourcecountry:france sourcelang:french`
}

function buildMediaCloudQuery(candidateName: string): string {
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

function getMediaAttentionDateRange(): { start: string; end: string } {
  const endDate = new Date()
  const startDate = new Date(endDate)
  startDate.setUTCMonth(startDate.getUTCMonth() - 3)

  return {
    start: startDate.toISOString().slice(0, 10),
    end: endDate.toISOString().slice(0, 10),
  }
}

async function fetchCandidateYouTubeVideos(candidateName: string): Promise<YouTubeIntervention[]> {
  const params = new URLSearchParams({
    part: 'snippet',
    q: candidateName,
    type: 'video',
    order: 'date',
    maxResults: String(MAX_YOUTUBE_RESULTS),
    publishedAfter: toIsoDateTimeDaysAgo(LOOKBACK_DAYS),
    relevanceLanguage: 'fr',
    regionCode: 'FR',
    key: getYouTubeApiKey(),
  })

  const payload = await fetchJson<{
    items?: Array<{
      id?: { videoId?: string }
      snippet?: {
        title?: string
        description?: string
        channelTitle?: string
        publishedAt?: string
        thumbnails?: {
          high?: { url?: string }
          medium?: { url?: string }
          default?: { url?: string }
        }
      }
    }>
  }>(`https://www.googleapis.com/youtube/v3/search?${params.toString()}`)

  const items = Array.isArray(payload.items) ? payload.items : []

  return items
    .filter((item) => {
      const videoId = item.id?.videoId
      const title = sanitizeText(item.snippet?.title)
      const description = sanitizeText(item.snippet?.description)

      return Boolean(videoId) && matchesCandidate(candidateName, `${title} ${description}`)
    })
    .map((item) => {
      const videoId = item.id?.videoId ?? ''
      const title = sanitizeText(item.snippet?.title)
      const description = sanitizeText(item.snippet?.description)
      const channelTitle = sanitizeText(item.snippet?.channelTitle || 'YouTube')
      const publishedAt = toIsoDate(item.snippet?.publishedAt)

      return {
        id: `youtube-${videoId}`,
        type: 'video' as const,
        title,
        excerpt: truncate(
          description || `Video detectee automatiquement sur la chaine ${channelTitle}.`,
          180,
        ),
        context:
          'Repere automatiquement via YouTube Data API a partir du nom du candidat. Verification editoriale recommandee avant mise en avant.',
        source: {
          label: `YouTube • ${channelTitle}`,
          url: `https://www.youtube.com/watch?v=${videoId}`,
          date: publishedAt,
        },
        providerData: {
          videoId,
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

async function fetchCandidateGdeltEntries(candidateName: string): Promise<CandidateIntervention[]> {
  const params = new URLSearchParams({
    query: buildGdeltQuery(candidateName),
    mode: 'ArtList',
    maxrecords: String(MAX_GDELT_ARTICLES),
    format: 'json',
    sort: 'DateDesc',
  })

  const payload = await fetchJson<{
    articles?: Array<{
      title?: string
      url?: string
      domain?: string
      seendate?: string
    }>
  }>(`https://api.gdeltproject.org/api/v2/doc/doc?${params.toString()}`)

  const articles = Array.isArray(payload.articles) ? payload.articles : []

  return articles
    .filter((article) => {
      const title = sanitizeWhitespace(article.title)
      const url = sanitizeWhitespace(article.url)
      return Boolean(url) && Boolean(title) && matchesCandidate(candidateName, `${title} ${url}`)
    })
    .map((article) => {
      const sourceUrl = sanitizeWhitespace(article.url)

      return {
        id: `gdelt-${sourceUrl}`,
        type: 'quote' as const,
        title: sanitizeWhitespace(article.title),
        excerpt: truncate(
          `Article detecte automatiquement dans ${sanitizeWhitespace(article.domain || 'un media')} autour de ${candidateName}.`,
          180,
        ),
        context:
          'Repere automatiquement via GDELT dans la presse web francaise. Verification editoriale recommandee avant republication en front.',
        source: {
          label: sanitizeWhitespace(article.domain || 'GDELT'),
          url: sourceUrl,
          date: toIsoDate(article.seendate),
        },
      }
    })
}

async function fetchMediaCloudJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Token ${getMediaCloudApiKey()}`,
    },
  })

  const payload = await response.json()

  if (!response.ok) {
    const detail =
      typeof payload === 'object' && payload !== null && 'detail' in payload
        ? String((payload as { detail?: string }).detail ?? 'Unknown error')
        : 'Unknown error'

    throw new Error(detail)
  }

  return payload as T
}

async function fetchCandidateMediaCloudAttention(
  candidateName: string,
): Promise<CandidateMediaAttentionPoint[]> {
  const { start, end } = getMediaAttentionDateRange()

  const params = new URLSearchParams({
    q: buildMediaCloudQuery(candidateName),
    start,
    end,
    platform: MEDIA_CLOUD_PROVIDER,
  })

  const collectionIds = getMediaCloudCollectionIds()
  if (collectionIds.length > 0) {
    params.set('cs', collectionIds.join(','))
  }

  const payload = await fetchMediaCloudJson<{
    count_over_time?: {
      counts?: Array<{
        date?: string
        count?: number
        ratio?: number
      }>
    }
  }>(`${MEDIA_CLOUD_BASE_API_URL}search/count-over-time?${params.toString()}`)

  const counts = Array.isArray(payload.count_over_time?.counts) ? payload.count_over_time.counts : []

  const points: CandidateMediaAttentionPoint[] = []

  for (const entry of counts) {
    const date = toIsoDateFromUnknown(entry.date)
    const count = parseNumericValue(entry.count)
    const ratio = parseNumericValue(entry.ratio)

    if (!date || count === null) {
      continue
    }

    points.push({
      date,
      value: count,
      normalizedValue: ratio === null ? null : ratio * 100,
    })
  }

  return points.sort((first, second) => first.date.localeCompare(second.date))
}

function getPeakPoint(points: CandidateMediaAttentionPoint[]): CandidateMediaAttentionPoint | null {
  return (
    points.reduce<CandidateMediaAttentionPoint | null>((currentPeak, point) => {
      if (currentPeak === null || point.value > currentPeak.value) {
        return point
      }

      return currentPeak
    }, null) ?? null
  )
}

async function fetchMediaCloudPeakStories(
  candidateName: string,
  date: string,
): Promise<CandidateMediaAttentionPeakStory[]> {
  const nextDate = new Date(`${date}T12:00:00Z`)
  nextDate.setUTCDate(nextDate.getUTCDate() + 1)

  const params = new URLSearchParams({
    q: buildMediaCloudQuery(candidateName),
    start: date,
    end: nextDate.toISOString().slice(0, 10),
    platform: MEDIA_CLOUD_PROVIDER,
    page_size: String(MAX_MEDIA_ATTENTION_PEAK_STORIES),
  })

  const collectionIds = getMediaCloudCollectionIds()
  if (collectionIds.length > 0) {
    params.set('cs', collectionIds.join(','))
  }

  const payload = await fetchMediaCloudJson<{
    stories?: Array<{
      title?: string
      url?: string
      media_name?: string
      publish_date?: string
    }>
  }>(`${MEDIA_CLOUD_BASE_API_URL}search/story-list?${params.toString()}`)

  const stories = Array.isArray(payload.stories) ? payload.stories : []

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
    .filter((story): story is CandidateMediaAttentionPeakStory => story !== null)
}

async function writeImportedInterventions(
  candidate: Candidate,
  importedEntries: CandidateIntervention[],
  provider: 'youtube' | 'gdelt',
  providerPayload: Record<string, unknown>,
): Promise<void> {
  const nowIso = new Date().toISOString()
  const todayIso = nowIso.slice(0, 10)
  const mergedInterventions = mergeInterventions(candidate.interventions, importedEntries)
  const batch = writeBatch(db)

  batch.set(
    doc(db, CANDIDATES_COLLECTION, candidate.id),
    {
      interventions: mergedInterventions,
      interventionsSyncMeta: {
        lastRunAt: nowIso,
        queryWindowDays: LOOKBACK_DAYS,
        providers: {
          [provider]: providerPayload,
        },
      },
      dataLastUpdated: todayIso,
    },
    { merge: true },
  )

  for (const entry of importedEntries) {
    const rawId = `${candidate.id}-${provider}-${await stableHash(entry.source.url)}`
    const providerData =
      provider === 'youtube' && 'providerData' in entry
        ? (entry as YouTubeIntervention).providerData
        : null

    batch.set(
      doc(db, RAW_INTERVENTIONS_COLLECTION, rawId),
      {
        id: rawId,
        candidateId: candidate.id,
        candidateName: candidate.name,
        provider,
        type: entry.type,
        title: entry.title,
        excerpt: entry.excerpt,
        context: entry.context,
        source: entry.source,
        providerData,
        publishedAt: entry.source.date,
        dataLastUpdated: todayIso,
        syncedAt: nowIso,
        autoGenerated: true,
      },
      { merge: true },
    )
  }

  await batch.commit()
}

async function writeCandidateMediaAttention(
  candidate: Candidate,
  provider: 'gdelt' | 'mediacloud',
  queryLabel: string,
  mediaAttentionPoints: CandidateMediaAttentionPoint[],
  peakContext?: CandidateMediaAttentionPeakContext | null,
): Promise<void> {
  const nowIso = new Date().toISOString()
  const todayIso = nowIso.slice(0, 10)
  const latestPoint =
      mediaAttentionPoints.length > 0 ? mediaAttentionPoints[mediaAttentionPoints.length - 1] : null
  const peakPoint = getPeakPoint(mediaAttentionPoints)

  await writeBatch(db)
    .set(
      doc(db, MEDIA_ATTENTION_COLLECTION, candidate.id),
      {
        candidateId: candidate.id,
        candidateName: candidate.name,
        provider,
        query: queryLabel,
        timeSpan: MEDIA_ATTENTION_TIMESPAN,
        points: mediaAttentionPoints,
        pointCount: mediaAttentionPoints.length,
        latestDate: latestPoint?.date ?? null,
        latestValue: latestPoint?.value ?? null,
        peakDate: peakPoint?.date ?? null,
        peakValue: peakPoint?.value ?? null,
        peakContext: peakContext ?? null,
        dataLastUpdated: todayIso,
        updatedAt: nowIso,
        autoGenerated: true,
      },
      { merge: true },
    )
    .commit()
}

function getRefreshErrorMessage(error: unknown): string {
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const code = String(error.code)

    if (code === 'permission-denied') {
      return 'Firestore refuse l’ecriture des donnees. Verifie les regles pour l’utilisateur admin.'
    }
  }

  if (error instanceof Error) {
    if (error.message.includes('Missing Media Cloud API key')) {
      return 'La cle Media Cloud n’est pas configuree dans le front admin.'
    }

    if (error.message.toLowerCase().includes('token')) {
      return 'La cle Media Cloud semble invalide ou refusee.'
    }

    if (error.message.includes('API_KEY_SERVICE_BLOCKED')) {
      return 'La YouTube Data API n’est pas active pour cette cle.'
    }

    if (error.message.includes('quota')) {
      return 'Le quota YouTube est temporairement depasse.'
    }

    if (error.message.includes('Failed to fetch')) {
      return 'La source distante ne repond pas pour le moment.'
    }

    return error.message
  }

  return 'Impossible de rafraichir les donnees pour le moment.'
}

export async function refreshCandidateVideos(
  candidate: Candidate,
  userEmail: string | null | undefined,
): Promise<RefreshCandidateVideosResult> {
  if (!isAdminEmail(userEmail)) {
    throw new Error(`Admin access required for ${ADMIN_EMAIL}.`)
  }

  try {
    const importedVideos = await fetchCandidateYouTubeVideos(candidate.name)
    await writeImportedInterventions(candidate, importedVideos, 'youtube', {
      importedCount: importedVideos.length,
      status: 'ok',
    })

    return {
      candidateName: candidate.name,
      candidateId: candidate.id,
      importedCount: importedVideos.length,
      updatedAt: new Date().toISOString(),
    }
  } catch (error) {
    throw new Error(getRefreshErrorMessage(error))
  }
}

export async function refreshCandidateGdelt(
  candidate: Candidate,
  userEmail: string | null | undefined,
): Promise<RefreshCandidateGdeltResult> {
  if (!isAdminEmail(userEmail)) {
    throw new Error(`Admin access required for ${ADMIN_EMAIL}.`)
  }

  try {
    const importedEntries = await fetchCandidateGdeltEntries(candidate.name)
    await writeImportedInterventions(candidate, importedEntries, 'gdelt', {
      importedCount: importedEntries.length,
      query: buildGdeltQuery(candidate.name),
    })

    return {
      candidateName: candidate.name,
      candidateId: candidate.id,
      importedCount: importedEntries.length,
      updatedAt: new Date().toISOString(),
    }
  } catch (error) {
    throw new Error(getRefreshErrorMessage(error))
  }
}

export async function refreshCandidateMediaAttention(
  candidate: Candidate,
  userEmail: string | null | undefined,
): Promise<RefreshCandidateMediaAttentionResult> {
  if (!isAdminEmail(userEmail)) {
    throw new Error(`Admin access required for ${ADMIN_EMAIL}.`)
  }

  try {
    const mediaAttentionPoints = await fetchCandidateMediaCloudAttention(candidate.name)
    const peakPoint = getPeakPoint(mediaAttentionPoints)
    const peakStories = peakPoint ? await fetchMediaCloudPeakStories(candidate.name, peakPoint.date) : []
    await writeCandidateMediaAttention(
      candidate,
      'mediacloud',
      buildMediaCloudQuery(candidate.name),
      mediaAttentionPoints,
      peakPoint
        ? {
            date: peakPoint.date,
            value: peakPoint.value,
            normalizedValue: peakPoint.normalizedValue,
            stories: peakStories,
          }
        : null,
    )

    return {
      candidateName: candidate.name,
      candidateId: candidate.id,
      pointCount: mediaAttentionPoints.length,
      updatedAt: new Date().toISOString(),
    }
  } catch (error) {
    throw new Error(getRefreshErrorMessage(error))
  }
}

export async function refreshCandidateTweets(
  candidate: Candidate,
  userEmail: string | null | undefined,
): Promise<RefreshCandidateTweetsResult> {
  if (!isAdminEmail(userEmail)) {
    throw new Error(`Admin access required for ${ADMIN_EMAIL}.`)
  }

  try {
    const payload = await postToAdminSync<{
      candidateId?: string
      candidateName?: string
      importedCount?: number
      updatedAt?: string
    }>('/admin/refresh-tweets', {
        candidateId: candidate.id,
        adminEmail: userEmail,
    })

    return {
      candidateName: payload.candidateName || candidate.name,
      candidateId: payload.candidateId || candidate.id,
      importedCount: Number.isFinite(payload.importedCount) ? Number(payload.importedCount) : 0,
      updatedAt: payload.updatedAt || new Date().toISOString(),
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes('Failed to fetch')) {
      throw new Error('Le serveur local de sync tweets ne repond pas. Lance `npm run admin:sync-server` sur la machine admin.')
    }

    throw new Error(getRefreshErrorMessage(error))
  }
}

export async function refreshAllCandidateTweets(
  userEmail: string | null | undefined,
): Promise<RefreshAllCandidateTweetsResult> {
  if (!isAdminEmail(userEmail)) {
    throw new Error(`Admin access required for ${ADMIN_EMAIL}.`)
  }

  try {
    const payload = await postToAdminSync<{
      candidateCount?: number
      importedCount?: number
      updatedAt?: string
    }>('/admin/refresh-all-tweets', {
      adminEmail: userEmail,
    })

    return {
      candidateCount: Number.isFinite(payload.candidateCount) ? Number(payload.candidateCount) : 0,
      importedCount: Number.isFinite(payload.importedCount) ? Number(payload.importedCount) : 0,
      updatedAt: payload.updatedAt || new Date().toISOString(),
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes('Failed to fetch')) {
      throw new Error('Le serveur local de sync tweets ne repond pas. Lance `npm run admin:sync-server` sur la machine admin.')
    }

    throw new Error(getRefreshErrorMessage(error))
  }
}

export async function getCandidateTweetSyncStatus(candidateId: string): Promise<CandidateTweetSyncStatus> {
  const snapshot = await getDoc(doc(db, CANDIDATES_COLLECTION, candidateId))
  const data = snapshot.data() as {
    tweetsSyncMeta?: {
      lastRunAt?: unknown
      importedCount?: unknown
      status?: unknown
    }
  } | undefined

  const lastRunAt =
    typeof data?.tweetsSyncMeta?.lastRunAt === 'string' && data.tweetsSyncMeta.lastRunAt.trim().length > 0
      ? data.tweetsSyncMeta.lastRunAt
      : null
  const importedCount =
    typeof data?.tweetsSyncMeta?.importedCount === 'number' && Number.isFinite(data.tweetsSyncMeta.importedCount)
      ? data.tweetsSyncMeta.importedCount
      : null
  const status =
    typeof data?.tweetsSyncMeta?.status === 'string' && data.tweetsSyncMeta.status.trim().length > 0
      ? data.tweetsSyncMeta.status
      : null

  return {
    lastRunAt,
    importedCount,
    status,
  }
}

export async function getCandidateMediaCounts(candidateId: string): Promise<CandidateMediaCounts> {
  const youtubeQuery = query(
    collection(db, RAW_INTERVENTIONS_COLLECTION),
    where('candidateId', '==', candidateId),
    where('provider', '==', 'youtube'),
  )
  const gdeltQuery = query(
    collection(db, RAW_INTERVENTIONS_COLLECTION),
    where('candidateId', '==', candidateId),
    where('provider', '==', 'gdelt'),
  )
  const tweetsQuery = query(
    collection(db, TWEETS_COLLECTION),
    where('candidateId', '==', candidateId),
  )

  const [youtubeSnapshot, gdeltSnapshot, tweetsSnapshot] = await Promise.all([
    getDocs(youtubeQuery),
    getDocs(gdeltQuery),
    getDocs(tweetsQuery),
  ])

  return {
    youtube: youtubeSnapshot.size,
    gdelt: gdeltSnapshot.size,
    tweets: tweetsSnapshot.size,
  }
}
