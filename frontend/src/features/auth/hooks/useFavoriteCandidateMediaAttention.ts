import { useEffect, useState } from 'react'
import type { CandidateMediaAttention } from '../../../data/candidateMediaAttentionTypes'
import { getCandidateMediaAttentionsByIdsFromDatabase } from '../../../services/candidateMediaAttentionRepository'

interface UseFavoriteCandidateMediaAttentionResult {
  mediaAttentions: CandidateMediaAttention[]
  isLoading: boolean
  loadError: string | null
}

export function useFavoriteCandidateMediaAttention(
  candidateIds: string[],
): UseFavoriteCandidateMediaAttentionResult {
  const [mediaAttentions, setMediaAttentions] = useState<CandidateMediaAttention[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(candidateIds.length > 0)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    const uniqueCandidateIds = [...new Set(candidateIds)]

    if (uniqueCandidateIds.length === 0) {
      setMediaAttentions([])
      setIsLoading(false)
      setLoadError(null)
      return
    }

    let active = true
    setIsLoading(true)
    setLoadError(null)

    void getCandidateMediaAttentionsByIdsFromDatabase(uniqueCandidateIds)
      .then((nextMediaAttentions) => {
        if (!active) {
          return
        }

        setMediaAttentions(nextMediaAttentions)
        setIsLoading(false)
      })
      .catch((error) => {
        if (!active) {
          return
        }

        console.error('Failed to load favorite candidate media attention', error)
        setMediaAttentions([])
        setIsLoading(false)
        setLoadError('Impossible de charger les courbes Media Cloud pour le moment.')
      })

    return () => {
      active = false
    }
  }, [candidateIds])

  return {
    mediaAttentions,
    isLoading,
    loadError,
  }
}
