import { doc, getDoc } from 'firebase/firestore'
import type {
  CandidateMediaAttention,
  CandidateMediaAttentionPeakContext,
  CandidateMediaAttentionPeakStory,
  CandidateMediaAttentionPoint,
} from '../data/candidateMediaAttentionTypes'
import { db } from '../firebase'

const CANDIDATE_MEDIA_ATTENTION_COLLECTION = 'candidate_media_attention_2027'

function parseNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }

  if (typeof value === 'string' && value.trim().length > 0) {
    const parsedNumber = Number.parseFloat(value)
    return Number.isFinite(parsedNumber) ? parsedNumber : null
  }

  return null
}

function parseIsoDate(value: unknown): string | null {
  if (typeof value !== 'string' || value.trim().length === 0) {
    return null
  }

  const trimmedValue = value.trim()

  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmedValue)) {
    return trimmedValue
  }

  const compactMatch = trimmedValue.match(/^(\d{4})(\d{2})(\d{2})/)
  if (compactMatch) {
    return `${compactMatch[1]}-${compactMatch[2]}-${compactMatch[3]}`
  }

  const parsedDate = new Date(trimmedValue)
  if (Number.isNaN(parsedDate.getTime())) {
    return null
  }

  return parsedDate.toISOString().slice(0, 10)
}

function parsePoints(value: unknown): CandidateMediaAttentionPoint[] {
  if (!Array.isArray(value)) {
    return []
  }

  const parsedPoints: CandidateMediaAttentionPoint[] = []

  for (const entry of value) {
    if (typeof entry !== 'object' || entry === null) {
      continue
    }

    const maybePoint = entry as {
      date?: unknown
      value?: unknown
      normalizedValue?: unknown
    }
    const date = parseIsoDate(maybePoint.date)
    const pointValue = parseNumber(maybePoint.value)

    if (!date || pointValue === null) {
      continue
    }

    parsedPoints.push({
      date,
      value: pointValue,
      normalizedValue: parseNumber(maybePoint.normalizedValue),
    })
  }

  const dedupedPoints = new Map<string, CandidateMediaAttentionPoint>()

  for (const point of parsedPoints) {
    dedupedPoints.set(point.date, point)
  }

  return [...dedupedPoints.values()].sort((first, second) => first.date.localeCompare(second.date))
}

function parsePeakStories(value: unknown): CandidateMediaAttentionPeakStory[] {
  if (!Array.isArray(value)) {
    return []
  }

  const stories: CandidateMediaAttentionPeakStory[] = []

  for (const entry of value) {
    if (typeof entry !== 'object' || entry === null) {
      continue
    }

    const maybeStory = entry as {
      title?: unknown
      url?: unknown
      mediaName?: unknown
      publishDate?: unknown
    }
    const title = typeof maybeStory.title === 'string' ? maybeStory.title.trim() : ''
    const url = typeof maybeStory.url === 'string' ? maybeStory.url.trim() : ''
    const mediaName = typeof maybeStory.mediaName === 'string' ? maybeStory.mediaName.trim() : ''
    const publishDate = parseIsoDate(maybeStory.publishDate)

    if (!title || !url || !mediaName || !publishDate) {
      continue
    }

    stories.push({
      title,
      url,
      mediaName,
      publishDate,
    })
  }

  return stories
}

function parsePeakContext(value: unknown): CandidateMediaAttentionPeakContext | null {
  if (typeof value !== 'object' || value === null) {
    return null
  }

  const maybePeakContext = value as {
    date?: unknown
    value?: unknown
    normalizedValue?: unknown
    stories?: unknown
  }
  const date = parseIsoDate(maybePeakContext.date)
  const pointValue = parseNumber(maybePeakContext.value)

  if (!date || pointValue === null) {
    return null
  }

  return {
    date,
    value: pointValue,
    normalizedValue: parseNumber(maybePeakContext.normalizedValue),
    stories: parsePeakStories(maybePeakContext.stories),
  }
}

function parseCandidateMediaAttention(
  candidateId: string,
  value: Record<string, unknown>,
): CandidateMediaAttention | null {
  const points = parsePoints(value.points)
  const candidateName = typeof value.candidateName === 'string' ? value.candidateName : ''
  const query = typeof value.query === 'string' ? value.query : ''
  const timeSpan = typeof value.timeSpan === 'string' ? value.timeSpan : '3months'
  const provider = value.provider === 'mediacloud' ? 'mediacloud' : 'gdelt'

  if (!candidateName || !query) {
    return null
  }

  return {
    candidateId,
    candidateName,
    provider,
    query,
    timeSpan,
    points,
    pointCount:
      typeof value.pointCount === 'number' && Number.isFinite(value.pointCount)
        ? value.pointCount
        : points.length,
    latestDate: parseIsoDate(value.latestDate),
    latestValue: parseNumber(value.latestValue),
    peakDate: parseIsoDate(value.peakDate),
    peakValue: parseNumber(value.peakValue),
    peakContext: parsePeakContext(value.peakContext),
    dataLastUpdated: typeof value.dataLastUpdated === 'string' ? value.dataLastUpdated : undefined,
    updatedAt: typeof value.updatedAt === 'string' ? value.updatedAt : undefined,
  }
}

export async function getCandidateMediaAttentionFromDatabase(
  candidateId: string,
): Promise<CandidateMediaAttention | null> {
  const snapshot = await getDoc(doc(db, CANDIDATE_MEDIA_ATTENTION_COLLECTION, candidateId))
  if (!snapshot.exists()) {
    return null
  }

  return parseCandidateMediaAttention(snapshot.id, snapshot.data())
}

export async function getCandidateMediaAttentionsByIdsFromDatabase(
  candidateIds: string[],
): Promise<CandidateMediaAttention[]> {
  const uniqueCandidateIds = [...new Set(candidateIds)]

  if (uniqueCandidateIds.length === 0) {
    return []
  }

  const mediaAttentions = await Promise.all(
    uniqueCandidateIds.map((candidateId) => getCandidateMediaAttentionFromDatabase(candidateId)),
  )

  const mediaAttentionsById = new Map(
    mediaAttentions
      .filter((entry): entry is CandidateMediaAttention => entry !== null)
      .map((entry) => [entry.candidateId, entry]),
  )

  return uniqueCandidateIds
    .map((candidateId) => mediaAttentionsById.get(candidateId) ?? null)
    .filter((entry): entry is CandidateMediaAttention => entry !== null)
}
