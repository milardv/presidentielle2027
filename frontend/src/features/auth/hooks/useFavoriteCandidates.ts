import { useCallback, useEffect, useState } from 'react'
import type { Candidate } from '../../../data/candidateTypes'
import { getCandidatesByIdsFromDatabase } from '../../../services/candidateRepository'
import {
  subscribeToUserFavoriteCandidateIds,
  toggleFavoriteCandidate as toggleFavoriteCandidateInRepository,
} from '../../../services/userProfileRepository'

interface UseFavoriteCandidatesResult {
  favoriteCandidateIds: string[]
  favoriteCandidates: Candidate[]
  isLoading: boolean
  loadError: string | null
  togglingCandidateId: string | null
  toggleFavoriteCandidate: (candidateId: string) => Promise<void>
}

export function useFavoriteCandidates(userId: string | undefined): UseFavoriteCandidatesResult {
  const [favoriteCandidateIds, setFavoriteCandidateIds] = useState<string[]>([])
  const [favoriteCandidates, setFavoriteCandidates] = useState<Candidate[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(Boolean(userId))
  const [loadError, setLoadError] = useState<string | null>(null)
  const [togglingCandidateId, setTogglingCandidateId] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setFavoriteCandidateIds([])
      setFavoriteCandidates([])
      setIsLoading(false)
      setLoadError(null)
      return
    }

    let active = true
    setIsLoading(true)
    setLoadError(null)

    const unsubscribe = subscribeToUserFavoriteCandidateIds(
      userId,
      (nextFavoriteCandidateIds) => {
        if (!active) {
          return
        }

        setFavoriteCandidateIds(nextFavoriteCandidateIds)

        if (nextFavoriteCandidateIds.length === 0) {
          setFavoriteCandidates([])
          setIsLoading(false)
          setLoadError(null)
          return
        }

        void getCandidatesByIdsFromDatabase(nextFavoriteCandidateIds)
          .then((candidates) => {
            if (!active) {
              return
            }

            setFavoriteCandidates(candidates)
            setIsLoading(false)
            setLoadError(null)
          })
          .catch((error) => {
            if (!active) {
              return
            }

            console.error('Failed to load favorite candidates', error)
            setFavoriteCandidates([])
            setIsLoading(false)
            setLoadError('Impossible de charger vos candidats suivis pour le moment.')
          })
      },
      (error) => {
        if (!active) {
          return
        }

        console.error('Failed to subscribe to user favorites', error)
        setFavoriteCandidateIds([])
        setFavoriteCandidates([])
        setIsLoading(false)
        setLoadError('Impossible de charger vos candidats suivis pour le moment.')
      },
    )

    return () => {
      active = false
      unsubscribe()
    }
  }, [userId])

  const toggleFavoriteCandidate = useCallback(
    async (candidateId: string) => {
      if (!userId) {
        throw new Error('Utilisateur non connecté')
      }

      const shouldFavorite = !favoriteCandidateIds.includes(candidateId)
      setTogglingCandidateId(candidateId)
      setLoadError(null)

      try {
        await toggleFavoriteCandidateInRepository(userId, candidateId, shouldFavorite)
      } catch (error) {
        console.error('Failed to toggle favorite candidate', error)
        setLoadError('Impossible de mettre a jour vos favoris pour le moment.')
      } finally {
        setTogglingCandidateId(null)
      }
    },
    [favoriteCandidateIds, userId],
  )

  return {
    favoriteCandidateIds,
    favoriteCandidates,
    isLoading,
    loadError,
    togglingCandidateId,
    toggleFavoriteCandidate,
  }
}
