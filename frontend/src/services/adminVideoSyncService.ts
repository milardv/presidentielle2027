import { collection, doc, writeBatch } from 'firebase/firestore'
import type { Candidate, CandidateIntervention } from '../data/candidateTypes'
import { ADMIN_EMAIL, isAdminEmail } from '../config/admin'
import { db } from '../firebase'

const CANDIDATES_COLLECTION = 'candidates_2027'
const RAW_INTERVENTIONS_COLLECTION = 'candidate_interventions_2027'
const LOOKBACK_DAYS = 45
const MAX_YOUTUBE_RESULTS = 6
const MAX_CANDIDATE_INTERVENTIONS = 8

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

function getYouTubeApiKey(): string {
  const youtubeApiKey = import.meta.env.VITE_YOUTUBE_API_KEY?.trim()
  const firebaseApiKey = import.meta.env.VITE_FIREBASE_API_KEY?.trim()
  const apiKey = youtubeApiKey || firebaseApiKey

  if (!apiKey) {
    throw new Error('Missing YouTube API key in Vite environment.')
  }

  return apiKey
}

function sanitizeWhitespace(value: unknown): string {
  return String(value ?? '').replace(/\s+/g, ' ').trim()
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
      const title = sanitizeWhitespace(item.snippet?.title)
      const description = sanitizeWhitespace(item.snippet?.description)

      return Boolean(videoId) && matchesCandidate(candidateName, `${title} ${description}`)
    })
    .map((item) => {
      const videoId = item.id?.videoId ?? ''
      const title = sanitizeWhitespace(item.snippet?.title)
      const description = sanitizeWhitespace(item.snippet?.description)
      const channelTitle = sanitizeWhitespace(item.snippet?.channelTitle || 'YouTube')
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

function getRefreshErrorMessage(error: unknown): string {
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const code = String(error.code)

    if (code === 'permission-denied') {
      return 'Firestore refuse l’ecriture des videos. Verifie les regles pour l’utilisateur admin.'
    }
  }

  if (error instanceof Error) {
    if (error.message.includes('API_KEY_SERVICE_BLOCKED')) {
      return 'La YouTube Data API n’est pas active pour cette cle.'
    }

    if (error.message.includes('quota')) {
      return 'Le quota YouTube est temporairement depasse.'
    }

    return error.message
  }

  return 'Impossible de rafraichir les videos pour le moment.'
}

export async function refreshCandidateVideos(
  candidate: Candidate,
  userEmail: string | null | undefined,
): Promise<RefreshCandidateVideosResult> {
  if (!isAdminEmail(userEmail)) {
    throw new Error(`Admin access required for ${ADMIN_EMAIL}.`)
  }

  try {
    const nowIso = new Date().toISOString()
    const todayIso = nowIso.slice(0, 10)
    const importedVideos = await fetchCandidateYouTubeVideos(candidate.name)
    const mergedInterventions = mergeInterventions(candidate.interventions, importedVideos)
    const batch = writeBatch(db)

    batch.set(
      doc(db, CANDIDATES_COLLECTION, candidate.id),
      {
        interventions: mergedInterventions,
        interventionsSyncMeta: {
          lastRunAt: nowIso,
          queryWindowDays: LOOKBACK_DAYS,
          providers: {
            youtube: {
              importedCount: importedVideos.length,
              status: 'ok',
            },
          },
        },
        dataLastUpdated: todayIso,
      },
      { merge: true },
    )

    for (const entry of importedVideos) {
      const rawId = `${candidate.id}-youtube-${await stableHash(entry.source.url)}`
      batch.set(
        doc(collection(db, RAW_INTERVENTIONS_COLLECTION), rawId),
        {
          id: rawId,
          candidateId: candidate.id,
          candidateName: candidate.name,
          provider: 'youtube',
          type: entry.type,
          title: entry.title,
          excerpt: entry.excerpt,
          context: entry.context,
          source: entry.source,
          providerData: entry.providerData,
          publishedAt: entry.source.date,
          dataLastUpdated: todayIso,
          syncedAt: nowIso,
          autoGenerated: true,
        },
        { merge: true },
      )
    }

    await batch.commit()

    return {
      candidateName: candidate.name,
      candidateId: candidate.id,
      importedCount: importedVideos.length,
      updatedAt: nowIso,
    }
  } catch (error) {
    throw new Error(getRefreshErrorMessage(error))
  }
}
