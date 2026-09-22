import type { PollCandidateScore } from './pollTypes'

export interface SecondRoundPoll {
  id: string
  matchupId: string
  matchupLabel: string
  pollster: string
  sourceLabel: string
  sourceUrl: string
  sampleSize: number
  fieldworkStart: string
  fieldworkEnd: string
  scores: PollCandidateScore[]
  winnerId: string | null
  dataLastUpdated?: string
}

export interface SecondRoundMatchup {
  id: string
  label: string
  candidates: PollCandidateScore[]
  latestPoll: SecondRoundPoll
  polls: SecondRoundPoll[]
  averages: PollCandidateScore[]
}
