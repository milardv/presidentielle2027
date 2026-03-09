import { useEffect, useState } from 'react'
import type { CandidateVideo } from '../../../../data/candidateVideoTypes'
import { getCandidateVideosFromDatabase } from '../../../../services/candidateVideoRepository'

interface UseCandidateVideosResult {
  videos: CandidateVideo[]
  isLoading: boolean
  loadError: string | null
}

export function useCandidateVideos(candidateId: string | undefined): UseCandidateVideosResult {
  const [videos, setVideos] = useState<CandidateVideo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    const loadVideos = async () => {
      if (!candidateId) {
        setVideos([])
        setLoadError('Aucun identifiant candidat fourni dans l’URL.')
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setLoadError(null)

      try {
        const nextVideos = await getCandidateVideosFromDatabase(candidateId)
        if (!active) {
          return
        }

        setVideos(nextVideos)
      } catch (error) {
        if (!active) {
          return
        }

        console.error('Failed to load candidate videos', error)
        setVideos([])
        setLoadError('Impossible de charger les vidéos YouTube de ce candidat.')
      } finally {
        if (active) {
          setIsLoading(false)
        }
      }
    }

    void loadVideos()

    return () => {
      active = false
    }
  }, [candidateId])

  return {
    videos,
    isLoading,
    loadError,
  }
}
