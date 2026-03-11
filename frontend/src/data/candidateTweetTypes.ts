export interface CandidateTweetMetrics {
  likes: number
  replies: number
  reposts: number
  views: number
}

export interface CandidateTweetMedia {
  type: 'photo' | 'video' | 'animated_gif' | 'unknown'
  url: string
  altText: string | null
}

export interface CandidateTweet {
  id: string
  candidateId: string
  candidateName: string
  text: string
  url: string
  publishedAt: string
  authorName: string
  authorUsername: string
  authorProfileImageUrl: string | null
  authorVerified: boolean
  metrics: CandidateTweetMetrics
  media: CandidateTweetMedia[]
}
