export interface CandidateMediaAttentionPoint {
  date: string
  value: number
  normalizedValue?: number | null
}

export interface CandidateMediaAttentionPeakStory {
  title: string
  url: string
  mediaName: string
  publishDate: string
}

export interface CandidateMediaAttentionPeakContext {
  date: string
  value: number
  normalizedValue?: number | null
  stories: CandidateMediaAttentionPeakStory[]
}

export interface CandidateMediaAttention {
  candidateId: string
  candidateName: string
  provider: 'gdelt' | 'mediacloud'
  query: string
  timeSpan: string
  points: CandidateMediaAttentionPoint[]
  pointCount: number
  latestDate?: string | null
  latestValue?: number | null
  peakDate?: string | null
  peakValue?: number | null
  peakContext?: CandidateMediaAttentionPeakContext | null
  dataLastUpdated?: string
  updatedAt?: string
}
