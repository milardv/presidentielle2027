import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import type { PollCandidateScore } from '../data/pollTypes'
import type { SecondRoundMatchup, SecondRoundPoll } from '../data/secondRoundPollTypes'

const SECOND_ROUND_COLLECTION = 'polls_second_round_2027'

function parseScore(value: unknown): PollCandidateScore | null {
  if (typeof value !== 'object' || value === null) {
    return null
  }
  const maybe = value as Partial<PollCandidateScore>
  if (typeof maybe.candidateId !== 'string' || typeof maybe.candidateName !== 'string' || typeof maybe.score !== 'number') {
    return null
  }
  return { candidateId: maybe.candidateId, candidateName: maybe.candidateName, score: maybe.score }
}

export function parseSecondRoundPoll(id: string, data: Record<string, unknown>): SecondRoundPoll | null {
  if (
    typeof data.matchupId !== 'string' ||
    typeof data.matchupLabel !== 'string' ||
    typeof data.pollster !== 'string' ||
    typeof data.sourceUrl !== 'string' ||
    typeof data.fieldworkStart !== 'string' ||
    typeof data.fieldworkEnd !== 'string'
  ) {
    return null
  }

  const scores = Array.isArray(data.scores)
    ? data.scores.map(parseScore).filter((score): score is PollCandidateScore => score !== null)
    : []
  if (scores.length !== 2) {
    return null
  }

  return {
    id,
    matchupId: data.matchupId,
    matchupLabel: data.matchupLabel,
    pollster: data.pollster,
    sourceLabel: typeof data.sourceLabel === 'string' ? data.sourceLabel : data.pollster,
    sourceUrl: data.sourceUrl,
    sampleSize: typeof data.sampleSize === 'number' ? data.sampleSize : 0,
    fieldworkStart: data.fieldworkStart,
    fieldworkEnd: data.fieldworkEnd,
    scores,
    winnerId: typeof data.winnerId === 'string' ? data.winnerId : null,
    dataLastUpdated: typeof data.dataLastUpdated === 'string' ? data.dataLastUpdated : undefined,
  }
}

export function groupSecondRoundPolls(polls: SecondRoundPoll[]): SecondRoundMatchup[] {
  const byMatchup = new Map<string, SecondRoundPoll[]>()
  for (const poll of polls) {
    byMatchup.set(poll.matchupId, [...(byMatchup.get(poll.matchupId) ?? []), poll])
  }

  return [...byMatchup.entries()]
    .map(([id, matchupPolls]) => {
      const sorted = [...matchupPolls].sort((a, b) => (a.fieldworkEnd < b.fieldworkEnd ? 1 : -1))
      const latestPoll = sorted[0]
      const candidates = latestPoll.scores.map((score) => ({ ...score, score: 0 }))
      const averages = candidates.map((candidate) => {
        const values = sorted
          .map((poll) => poll.scores.find((score) => score.candidateId === candidate.candidateId)?.score)
          .filter((value): value is number => typeof value === 'number')
        return {
          ...candidate,
          score: values.length > 0 ? values.reduce((sum, value) => sum + value, 0) / values.length : 0,
        }
      })

      return { id, label: latestPoll.matchupLabel, candidates, latestPoll, polls: sorted, averages }
    })
    .sort((a, b) => (a.latestPoll.fieldworkEnd < b.latestPoll.fieldworkEnd ? 1 : -1))
}

export async function getSecondRoundPollsFromDatabase(): Promise<SecondRoundPoll[]> {
  const queryRef = query(collection(db, SECOND_ROUND_COLLECTION), orderBy('fieldworkEnd', 'desc'))
  const snapshot = await getDocs(queryRef)

  return snapshot.docs
    .map((entry) => parseSecondRoundPoll(entry.id, entry.data()))
    .filter((entry): entry is SecondRoundPoll => entry !== null)
}
