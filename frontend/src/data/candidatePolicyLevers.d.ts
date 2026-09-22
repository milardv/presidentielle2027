import type { PolicyLeverId } from './futureIndicators'

export interface CandidatePolicyLevers {
  values: Record<PolicyLeverId, number>
  notes: string
}

export function getCandidatePolicyLevers(candidateId: string): CandidatePolicyLevers | null
export const candidatesWithPolicyLevers: string[]
