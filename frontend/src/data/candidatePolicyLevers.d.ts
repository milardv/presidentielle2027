import type { PolicyLeverId } from './futureIndicators'

export interface CandidatePolicyLevers {
  values: Record<PolicyLeverId, number>
  notes: string
}

export interface EditorialLeverDetail {
  value: number
  statement?: string
  topic?: string
}

export interface CandidatePolicyLeverDetails {
  notes: string
  levers: Record<'fiscalImpulse' | 'retirementAge' | 'smicHike' | 'taxWealth' | 'educationInvestment' | 'healthInvestment' | 'prisonBuilding', EditorialLeverDetail>
  topics?: Partial<Record<PolicyLeverId, string>>
}

export const candidatePolicyLeverDetails: Record<string, CandidatePolicyLeverDetails>
export function getCandidatePolicyLevers(candidateId: string): CandidatePolicyLevers | null
export const candidatesWithPolicyLevers: string[]
