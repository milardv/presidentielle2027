import type { CandidateSource } from './candidateTypes'

export type PolicyLeverId =
  | 'fiscalImpulse'
  | 'retirementAge'
  | 'smicHike'
  | 'taxWealth'
  | 'educationInvestment'
  | 'healthInvestment'
  | 'prisonBuilding'
  | 'immigrationRestriction'
  | 'justiceRepressive'
  | 'ecologyIntensity'
  | 'nuclearRelaunch'
  | 'institutionsReform'
  | 'europeExit'

export interface PolicyLeverDefinition {
  label: string
  unit: string
  description: string
  kind: 'editorial' | 'quiz' | 'derived'
  question?: string
}

export interface FutureCategory {
  id: string
  label: string
  icon: string
}

export interface FutureEffect {
  lever: PolicyLeverId
  perUnit: number
  sigma: number
  /** Keys of literatureSources giving the order of magnitude of the elasticity. */
  refs: string[]
  note: string
}

export interface LiteratureSource {
  label: string
  url: string
}

export interface FutureIndicator {
  id: string
  category: string
  label: string
  unit: string
  decimals: number
  higherIsBetter: boolean
  bounds: [number, number]
  baseline: { value: number; date: string; label: string; source: CandidateSource }
  history: Array<{ year: number; value: number }>
  trend: { value: number; sigma: number; rationale: string }
  effects: FutureEffect[]
}

export const FUTURE_HORIZON_YEAR: number
export const FUTURE_MODEL_UPDATED_AT: string
export const literatureSources: Record<string, LiteratureSource>
export const policyLevers: Record<PolicyLeverId, PolicyLeverDefinition>
export const futureCategories: FutureCategory[]
export const futureIndicators: FutureIndicator[]
export function getFutureIndicatorById(indicatorId: string): FutureIndicator | null
