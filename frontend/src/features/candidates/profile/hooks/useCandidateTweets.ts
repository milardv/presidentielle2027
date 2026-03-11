import { useEffect, useState } from 'react'
import type { CandidateTweet } from '../../../../data/candidateTweetTypes'
import { getCandidateTweetsFromDatabase } from '../../../../services/candidateTweetRepository'

interface UseCandidateTweetsResult {
  tweets: CandidateTweet[]
  isLoading: boolean
  loadError: string | null
}

export function useCandidateTweets(candidateId: string | undefined): UseCandidateTweetsResult {
  const [tweets, setTweets] = useState<CandidateTweet[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    const loadTweets = async () => {
      if (!candidateId) {
        setTweets([])
        setLoadError('Aucun identifiant candidat fourni dans l’URL.')
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setLoadError(null)

      try {
        const nextTweets = await getCandidateTweetsFromDatabase(candidateId)
        if (!active) {
          return
        }

        setTweets(nextTweets)
      } catch (error) {
        if (!active) {
          return
        }

        console.error('Failed to load candidate tweets', error)
        setTweets([])
        setLoadError('Impossible de charger les tweets de ce candidat.')
      } finally {
        if (active) {
          setIsLoading(false)
        }
      }
    }

    void loadTweets()

    return () => {
      active = false
    }
  }, [candidateId])

  return {
    tweets,
    isLoading,
    loadError,
  }
}
