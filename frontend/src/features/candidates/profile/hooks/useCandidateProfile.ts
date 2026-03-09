import { useEffect, useState } from 'react'
import type { Candidate } from '../../../../data/candidateTypes'
import { getCandidateByIdFromDatabase } from '../../../../services/candidateRepository'

interface UseCandidateProfileResult {
  candidate: Candidate | null
  isLoading: boolean
  loadError: string | null
}

export function useCandidateProfile(candidateId: string | undefined): UseCandidateProfileResult {
  const [candidate, setCandidate] = useState<Candidate | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    const loadCandidate = async () => {
      setIsLoading(true)
      setLoadError(null)

      if (!candidateId) {
        setCandidate(null)
        setLoadError('Aucun identifiant candidat fourni dans l’URL.')
        setIsLoading(false)
        return
      }

      try {
        const dbCandidate = await getCandidateByIdFromDatabase(candidateId)
        if (!active) {
          return
        }

        if (dbCandidate === null) {
          setCandidate(null)
          setLoadError('Candidat introuvable en base de données.')
          return
        }

        setCandidate(dbCandidate)
      } catch (error) {
        if (!active) {
          return
        }

        setCandidate(null)
        setLoadError('Impossible de charger ce profil depuis Firestore.')
        console.error('Failed to load candidate profile', error)
      } finally {
        if (active) {
          setIsLoading(false)
        }
      }
    }

    void loadCandidate()

    return () => {
      active = false
    }
  }, [candidateId])

  return {
    candidate,
    isLoading,
    loadError,
  }
}
