import { useEffect, useMemo, useState } from 'react'
import type { PollCandidateAggregate, VotingIntentPoll } from '../../../data/pollTypes'
import { getVotingIntentPollsFromDatabase } from '../../../services/pollRepository'

interface UsePollsResult {
  polls: VotingIntentPoll[]
  isLoading: boolean
  loadError: string | null
  totalStudies: number
  totalScenarios: number
  latestFieldworkEnd: string | null
  dataLastUpdated: string | null
  pollsterCount: number
  latestStudy: VotingIntentPoll | null
  topCandidates: PollCandidateAggregate[]
  keyTakeaways: string[]
}

const leftCandidateIds = new Set([
  'nathalie-arthaud',
  'philippe-poutou',
  'fabien-roussel',
  'jean-luc-melenchon',
  'francois-ruffin',
  'olivier-faure',
  'francois-hollande',
  'raphael-glucksmann',
  'marine-tondelier',
])

function buildCandidateAverages(polls: VotingIntentPoll[]): PollCandidateAggregate[] {
  const aggregates = new Map<
    string,
    { candidateName: string; totalScore: number; scenarioCount: number; leaderCount: number }
  >()

  polls.forEach((poll) => {
    poll.scenarios.forEach((scenario) => {
      scenario.scores.forEach((score) => {
        const current =
          aggregates.get(score.candidateId) ??
          ({ candidateName: score.candidateName, totalScore: 0, scenarioCount: 0, leaderCount: 0 } as const)

        aggregates.set(score.candidateId, {
          candidateName: score.candidateName,
          totalScore: current.totalScore + score.score,
          scenarioCount: current.scenarioCount + 1,
          leaderCount:
            current.leaderCount + (scenario.leader?.candidateId === score.candidateId ? 1 : 0),
        })
      })
    })
  })

  return [...aggregates.entries()]
    .map(([candidateId, aggregate]) => ({
      candidateId,
      candidateName: aggregate.candidateName,
      averageScore: aggregate.totalScore / aggregate.scenarioCount,
      scenarioCount: aggregate.scenarioCount,
      leaderCount: aggregate.leaderCount,
    }))
    .sort((first, second) => second.averageScore - first.averageScore)
}

function buildKeyTakeaways(
  topCandidates: PollCandidateAggregate[],
  latestStudy: VotingIntentPoll | null,
  totalScenarios: number,
): string[] {
  const leader = topCandidates[0]
  const runnerUp = topCandidates[1]
  const leftLeader = topCandidates.find((candidate) => leftCandidateIds.has(candidate.candidateId))

  const takeaways: string[] = []

  if (leader) {
    takeaways.push(
      `${leader.candidateName} domine l'echantillon avec ${leader.averageScore.toFixed(1)}% en moyenne sur ${leader.scenarioCount} scenarios et ${leader.leaderCount} arrivées en tête.`,
    )
  }

  if (leader && runnerUp) {
    takeaways.push(
      `${runnerUp.candidateName} suit a ${runnerUp.averageScore.toFixed(1)}% de moyenne, soit ${Math.abs(leader.averageScore - runnerUp.averageScore).toFixed(1)} points derrière la tete moyenne.`,
    )
  }

  if (leftLeader) {
    takeaways.push(
      `A gauche, ${leftLeader.candidateName} ressort comme le profil le plus haut avec ${leftLeader.averageScore.toFixed(1)}% de moyenne sur ${leftLeader.scenarioCount} scenarios testés.`,
    )
  }

  if (latestStudy) {
    const latestLeaders = latestStudy.scenarios
      .slice(0, 2)
      .map((scenario) => scenario.label)
      .join(' ; ')

    takeaways.push(
      `Dernier terrain disponible (${latestStudy.pollster}, ${latestStudy.fieldworkEnd}) : ${latestLeaders || `${totalScenarios} scenarios enregistrés`}.`,
    )
  }

  return takeaways.slice(0, 4)
}

export function usePolls(): UsePollsResult {
  const [polls, setPolls] = useState<VotingIntentPoll[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    const loadPolls = async () => {
      setIsLoading(true)
      setLoadError(null)

      try {
        const dbPolls = await getVotingIntentPollsFromDatabase()
        if (!active) {
          return
        }

        setPolls(dbPolls)
      } catch (error) {
        if (!active) {
          return
        }

        setLoadError('Impossible de lire la collection polls_2027 dans Firestore.')
        console.error('Failed to load voting intent polls from Firestore', error)
      } finally {
        if (active) {
          setIsLoading(false)
        }
      }
    }

    void loadPolls()

    return () => {
      active = false
    }
  }, [])

  const totalStudies = polls.length
  const totalScenarios = useMemo(
    () => polls.reduce((total, poll) => total + poll.scenarios.length, 0),
    [polls],
  )
  const latestFieldworkEnd = polls[0]?.fieldworkEnd ?? null
  const latestStudy = polls[0] ?? null

  const dataLastUpdated = useMemo(
    () =>
      polls.reduce<string | null>((latest, poll) => {
        const current = poll.dataLastUpdated?.trim()
        if (!current) {
          return latest
        }

        if (latest === null || current > latest) {
          return current
        }

        return latest
      }, null),
    [polls],
  )

  const pollsterCount = useMemo(() => new Set(polls.map((poll) => poll.pollster)).size, [polls])
  const topCandidates = useMemo(() => buildCandidateAverages(polls), [polls])
  const keyTakeaways = useMemo(
    () => buildKeyTakeaways(topCandidates, latestStudy, totalScenarios),
    [latestStudy, topCandidates, totalScenarios],
  )

  return {
    polls,
    isLoading,
    loadError,
    totalStudies,
    totalScenarios,
    latestFieldworkEnd,
    dataLastUpdated,
    pollsterCount,
    latestStudy,
    topCandidates,
    keyTakeaways,
  }
}
