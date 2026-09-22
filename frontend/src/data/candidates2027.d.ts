import type { Candidate, CandidateSource, CandidateStatus } from './candidateTypes'

export const CANDIDATE_DATA_LAST_UPDATED: string
export const ELECTION_FIRST_ROUND_DATE: string
export const ELECTION_SECOND_ROUND_DATE: string
export const ELECTION_DECREE_DATE: string

export const candidates2027: Candidate[]

export const electionCalendar: {
  firstRound: string
  secondRound: string
  decree: string
  mandateEnd: string
  source: CandidateSource
}

export function getCandidate2027ById(candidateId: string): Candidate | null
export function isRunningStatus(status: CandidateStatus): boolean
