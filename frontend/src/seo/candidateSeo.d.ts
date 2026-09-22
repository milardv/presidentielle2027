import type { Candidate, CandidateStatus, CandidateTimelineEvent } from '../data/candidateTypes'

export const STATUS_ORDER: CandidateStatus[]
export function statusGroupLabel(status: CandidateStatus): string
export function latestMilestone(candidate: Candidate): CandidateTimelineEvent | null
export function candidateProfilePath(candidate: Candidate): string
export function buildCandidateSeo(candidate: Candidate): {
  title: string
  description: string
  keywords: string[]
}
export function buildCandidateJsonLd(candidate: Candidate, canonicalUrl: string): Record<string, unknown>[]
