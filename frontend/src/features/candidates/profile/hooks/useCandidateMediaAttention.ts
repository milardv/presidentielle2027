import { useEffect, useState } from 'react'
import type { CandidateMediaAttention } from '../../../../data/candidateMediaAttentionTypes'
import { getCandidateMediaAttentionFromDatabase } from '../../../../services/candidateMediaAttentionRepository'

interface UseCandidateMediaAttentionResult {
  mediaAttention: CandidateMediaAttention | null
  isLoading: boolean
  loadError: string | null
}

export function useCandidateMediaAttention(
  candidateId: string | undefined,
): UseCandidateMediaAttentionResult {
  const [mediaAttention, setMediaAttention] = useState<CandidateMediaAttention | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    const loadMediaAttention = async () => {
      setIsLoading(true)
      setLoadError(null)

      if (!candidateId) {
        setMediaAttention(null)
        setLoadError('Aucun identifiant candidat fourni dans l’URL.')
        setIsLoading(false)
        return
      }

      try {
        const nextMediaAttention = await getCandidateMediaAttentionFromDatabase(candidateId)
        if (!active) {
          return
        }

        setMediaAttention(nextMediaAttention)
      } catch (error) {
        if (!active) {
          return
        }

        console.error('Failed to load candidate media attention', error)
        setMediaAttention(null)
        setLoadError('Impossible de charger la courbe d’attention média.')
      } finally {
        if (active) {
          setIsLoading(false)
        }
      }
    }

    void loadMediaAttention()

    return () => {
      active = false
    }
  }, [candidateId])

  return {
    mediaAttention,
    isLoading,
    loadError,
  }
}
