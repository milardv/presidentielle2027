import { collection, getDocs, query, where } from 'firebase/firestore'
import type { CandidateTweet, CandidateTweetMedia, CandidateTweetMetrics } from '../data/candidateTweetTypes'
import { db } from '../firebase'
import { decodeHtmlEntities } from '../utils/htmlEntities'

const TWEETS_COLLECTION = 'candidate_tweets_2027'
const MAX_TWEETS = 10

function toTweetTimestamp(value: string): number {
  if (!value) {
    return 0
  }

  const normalizedValue = value.trim()
  if (!normalizedValue) {
    return 0
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(normalizedValue)) {
    const parsedDate = Date.parse(`${normalizedValue}T12:00:00Z`)
    return Number.isNaN(parsedDate) ? 0 : parsedDate
  }

  const parsedDate = Date.parse(normalizedValue)
  return Number.isNaN(parsedDate) ? 0 : parsedDate
}

function isMetrics(value: unknown): value is CandidateTweetMetrics {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const metrics = value as Partial<CandidateTweetMetrics>
  return [metrics.likes, metrics.replies, metrics.reposts, metrics.views].every(
    (entry) => typeof entry === 'number' && Number.isFinite(entry),
  )
}

function parseMedia(value: unknown): CandidateTweetMedia[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map((entry) => {
      if (typeof entry !== 'object' || entry === null) {
        return null
      }

      const media = entry as {
        type?: unknown
        url?: unknown
        altText?: unknown
      }

      if (typeof media.url !== 'string' || media.url.length === 0) {
        return null
      }

      return {
        type:
          media.type === 'photo' || media.type === 'video' || media.type === 'animated_gif'
            ? media.type
            : 'unknown',
        url: media.url,
        altText: typeof media.altText === 'string' && media.altText.length > 0 ? decodeHtmlEntities(media.altText) : null,
      }
    })
    .filter((entry): entry is CandidateTweetMedia => entry !== null)
}

function parseCandidateTweet(id: string, data: Record<string, unknown>): CandidateTweet | null {
  if (
    typeof data.candidateId !== 'string' ||
    typeof data.candidateName !== 'string' ||
    typeof data.text !== 'string' ||
    typeof data.url !== 'string' ||
    typeof data.publishedAt !== 'string' ||
    typeof data.authorName !== 'string' ||
    typeof data.authorUsername !== 'string' ||
    typeof data.authorVerified !== 'boolean'
  ) {
    return null
  }

  return {
    id,
    candidateId: data.candidateId,
    candidateName: decodeHtmlEntities(data.candidateName),
    text: decodeHtmlEntities(data.text),
    url: data.url,
    publishedAt: data.publishedAt,
    authorName: decodeHtmlEntities(data.authorName),
    authorUsername: data.authorUsername,
    authorProfileImageUrl: typeof data.authorProfileImageUrl === 'string' && data.authorProfileImageUrl.length > 0
      ? data.authorProfileImageUrl
      : null,
    authorVerified: data.authorVerified,
    metrics: isMetrics(data.metrics)
      ? data.metrics
      : { likes: 0, replies: 0, reposts: 0, views: 0 },
    media: parseMedia(data.media),
  }
}

export async function getCandidateTweetsFromDatabase(candidateId: string): Promise<CandidateTweet[]> {
  const queryRef = query(collection(db, TWEETS_COLLECTION), where('candidateId', '==', candidateId))
  const snapshot = await getDocs(queryRef)

  return snapshot.docs
    .map((entry) => parseCandidateTweet(entry.id, entry.data()))
    .filter((tweet): tweet is CandidateTweet => tweet !== null)
    .sort((first, second) => toTweetTimestamp(second.publishedAt) - toTweetTimestamp(first.publishedAt))
    .slice(0, MAX_TWEETS)
}
