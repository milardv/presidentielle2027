import { collection, getDocs, query, where } from 'firebase/firestore'
import type { CandidateVideo } from '../data/candidateVideoTypes'
import { db } from '../firebase'

const RAW_INTERVENTIONS_COLLECTION = 'candidate_interventions_2027'

function extractVideoIdFromUrl(url: string): string | null {
  try {
    const parsedUrl = new URL(url)
    if (parsedUrl.hostname.includes('youtu.be')) {
      return parsedUrl.pathname.replace(/^\//, '') || null
    }

    return parsedUrl.searchParams.get('v')
  } catch {
    return null
  }
}

function inferThumbnailUrl(videoId: string | null): string | null {
  return videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : null
}

function parseCandidateVideo(id: string, data: Record<string, unknown>): CandidateVideo | null {
  if (
    typeof data.candidateId !== 'string' ||
    data.provider !== 'youtube' ||
    typeof data.title !== 'string' ||
    typeof data.source !== 'object' ||
    data.source === null
  ) {
    return null
  }

  const source = data.source as {
    url?: unknown
    label?: unknown
    date?: unknown
  }
  const providerData = typeof data.providerData === 'object' && data.providerData !== null
    ? (data.providerData as {
        videoId?: unknown
        thumbnailUrl?: unknown
        channelTitle?: unknown
      })
    : null

  if (typeof source.url !== 'string' || typeof source.label !== 'string' || typeof source.date !== 'string') {
    return null
  }

  const videoId =
    typeof providerData?.videoId === 'string' && providerData.videoId.length > 0
      ? providerData.videoId
      : extractVideoIdFromUrl(source.url)

  const channelTitle =
    typeof providerData?.channelTitle === 'string' && providerData.channelTitle.length > 0
      ? providerData.channelTitle
      : source.label.replace(/^YouTube\s*[•|-]\s*/u, '')

  const thumbnailUrl =
    typeof providerData?.thumbnailUrl === 'string' && providerData.thumbnailUrl.length > 0
      ? providerData.thumbnailUrl
      : inferThumbnailUrl(videoId)

  return {
    id,
    candidateId: data.candidateId,
    title: data.title,
    excerpt: typeof data.excerpt === 'string' ? data.excerpt : '',
    context: typeof data.context === 'string' ? data.context : '',
    url: source.url,
    sourceLabel: source.label,
    publishedAt: source.date,
    channelTitle,
    thumbnailUrl,
    videoId,
  }
}

export async function getCandidateVideosFromDatabase(candidateId: string): Promise<CandidateVideo[]> {
  const queryRef = query(
    collection(db, RAW_INTERVENTIONS_COLLECTION),
    where('candidateId', '==', candidateId),
    where('provider', '==', 'youtube'),
  )
  const snapshot = await getDocs(queryRef)

  return snapshot.docs
    .map((entry) => parseCandidateVideo(entry.id, entry.data()))
    .filter((video): video is CandidateVideo => video !== null)
    .sort((first, second) => second.publishedAt.localeCompare(first.publishedAt))
}
