export interface PollCandidateScore {
  candidateId: string
  candidateName: string
  score: number
}

export interface PollScenario {
  id: string
  label: string
  scores: PollCandidateScore[]
  leader: PollCandidateScore | null
  runnerUp: PollCandidateScore | null
}

export interface VotingIntentPoll {
  id: string
  pollster: string
  sourceLabel: string
  sourceUrl: string
  sectionLabel: string
  sampleSize: number
  fieldworkStart: string
  fieldworkEnd: string
  scenarios: PollScenario[]
  dataLastUpdated?: string
}

export interface PollCandidateAggregate {
  candidateId: string
  candidateName: string
  averageScore: number
  scenarioCount: number
  leaderCount: number
}
