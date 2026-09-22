import type { CandidateSource } from './candidateTypes'
import type { PolicyLeverId } from './futureIndicators'

export type LeverEvidenceKind = 'programme' | 'quiz' | 'derive'

export interface LeverEvidenceComponent {
  question: string
  theme: string
  stance: number
  stanceLabel: string
}

export interface LeverEvidence {
  lever: PolicyLeverId
  kind: LeverEvidenceKind
  value: number
  /** The declaration or programme measure the value rests on. */
  statement: string
  /** How the declaration was translated into the lever value. */
  detail: string
  /** Sourced position of the candidate fiche documenting the statement, when available. */
  source: CandidateSource | null
  excerpt: string | null
  /** Fallback: the candidate fiche and its sources. */
  fichePath: string
  components: LeverEvidenceComponent[]
}

export const LEVER_KIND_LABELS: Record<LeverEvidenceKind, string>
export function getCandidateLeverEvidence(candidateId: string): Record<PolicyLeverId, LeverEvidence> | null
