import type { LeverEvidence } from '../../data/candidateLeverEvidence'
import type { CandidatePolicyLevers } from '../../data/candidatePolicyLevers'
import type { FutureCategory, FutureIndicator, PolicyLeverId } from '../../data/futureIndicators'

export interface LeverContribution {
  lever: PolicyLeverId
  label: string
  unit: string
  value: number
  perUnit: number
  contribution: number
  sigma: number
  note: string
}

export interface IndicatorProjection {
  indicator: FutureIndicator
  today: number
  trend: number
  median: number
  p10: number
  p90: number
  sigma: number
  deltaVsTrend: number
  deltaVsToday: number
  improvesVsTrend: boolean | null
  contributions: LeverContribution[]
}

export interface CategoryProjection {
  category: FutureCategory
  projections: IndicatorProjection[]
  improving: number
  worsening: number
}

export interface CandidateFutureModel {
  levers: CandidatePolicyLevers
  evidence: Partial<Record<PolicyLeverId, LeverEvidence>>
  categories: CategoryProjection[]
  improving: number
  worsening: number
  neutral: number
}

export function projectIndicator(indicator: FutureIndicator, levers: Record<PolicyLeverId, number>): IndicatorProjection
export function buildCandidateFutureModel(candidateId: string): CandidateFutureModel | null
