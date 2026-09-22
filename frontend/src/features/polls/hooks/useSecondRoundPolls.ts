import { useEffect, useMemo, useState } from 'react'
import type { SecondRoundMatchup, SecondRoundPoll } from '../../../data/secondRoundPollTypes'
import { getSecondRoundPollsFromDatabase, groupSecondRoundPolls } from '../../../services/secondRoundPollRepository'

interface UseSecondRoundPollsResult {
  matchups: SecondRoundMatchup[]
  isLoading: boolean
  loadError: string | null
}

export function useSecondRoundPolls(): UseSecondRoundPollsResult {
  const [polls, setPolls] = useState<SecondRoundPoll[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    getSecondRoundPollsFromDatabase()
      .then((dbPolls) => {
        if (active) {
          setPolls(dbPolls)
        }
      })
      .catch((error: unknown) => {
        if (active) {
          setLoadError('Impossible de lire les sondages de second tour dans Firestore.')
          console.error('Failed to load second-round polls from Firestore', error)
        }
      })
      .finally(() => {
        if (active) {
          setIsLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [])

  const matchups = useMemo(() => groupSecondRoundPolls(polls), [polls])

  return { matchups, isLoading, loadError }
}
