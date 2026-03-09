import type {
  PollCandidateScore,
  PollScenario,
  VotingIntentPoll,
} from '../data/pollTypes'

function parseCandidateScore(value: unknown): PollCandidateScore | null {
  if (typeof value !== 'object' || value === null) {
    return null
  }

  const maybeScore = value as Partial<PollCandidateScore>
  if (
    typeof maybeScore.candidateId !== 'string' ||
    typeof maybeScore.candidateName !== 'string' ||
    typeof maybeScore.score !== 'number'
  ) {
    return null
  }

  return {
    candidateId: maybeScore.candidateId,
    candidateName: maybeScore.candidateName,
    score: maybeScore.score,
  }
}

function parseScenario(value: unknown): PollScenario | null {
  if (typeof value !== 'object' || value === null) {
    return null
  }

  const maybeScenario = value as {
    id?: unknown
    label?: unknown
    scores?: unknown
    leader?: unknown
    runnerUp?: unknown
  }

  if (typeof maybeScenario.id !== 'string' || typeof maybeScenario.label !== 'string') {
    return null
  }

  const scores = Array.isArray(maybeScenario.scores)
    ? maybeScenario.scores
        .map((entry) => parseCandidateScore(entry))
        .filter((entry): entry is PollCandidateScore => entry !== null)
    : []

  const leader = parseCandidateScore(maybeScenario.leader)
  const runnerUp = parseCandidateScore(maybeScenario.runnerUp)

  if (scores.length === 0) {
    return null
  }

  return {
    id: maybeScenario.id,
    label: maybeScenario.label,
    scores,
    leader,
    runnerUp,
  }
}

export function parseVotingIntentPoll(id: string, data: Record<string, unknown>): VotingIntentPoll | null {
  if (
    typeof data.pollster !== 'string' ||
    typeof data.sourceLabel !== 'string' ||
    typeof data.sourceUrl !== 'string' ||
    typeof data.sectionLabel !== 'string' ||
    typeof data.sampleSize !== 'number' ||
    typeof data.fieldworkStart !== 'string' ||
    typeof data.fieldworkEnd !== 'string'
  ) {
    return null
  }

  const scenarios = Array.isArray(data.scenarios)
    ? data.scenarios
        .map((entry) => parseScenario(entry))
        .filter((entry): entry is PollScenario => entry !== null)
    : []

  if (scenarios.length === 0) {
    return null
  }

  return {
    id,
    pollster: data.pollster,
    sourceLabel: data.sourceLabel,
    sourceUrl: data.sourceUrl,
    sectionLabel: data.sectionLabel,
    sampleSize: data.sampleSize,
    fieldworkStart: data.fieldworkStart,
    fieldworkEnd: data.fieldworkEnd,
    scenarios,
    dataLastUpdated: typeof data.dataLastUpdated === 'string' ? data.dataLastUpdated : undefined,
  }
}
