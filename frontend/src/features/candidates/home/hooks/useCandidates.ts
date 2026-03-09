import { useEffect, useMemo, useState } from 'react'
import type { Candidate } from '../../../../data/candidateTypes'
import { getCandidatesFromDatabase } from '../../../../services/candidateRepository'

interface UseCandidatesResult {
  candidates: Candidate[]
  isLoading: boolean
  loadError: string | null
  declaredCount: number
  conditionalCount: number
  lastUpdated: string | null
}

export function useCandidates(): UseCandidatesResult {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    const loadCandidates = async () => {
      setIsLoading(true)
      setLoadError(null)

      try {
        const dbCandidates = await getCandidatesFromDatabase()
        if (!active) {
          return
        }

        setCandidates(dbCandidates)
      } catch (readError) {
        if (!active) {
          return
        }

        setLoadError(
          'Impossible de lire Firestore. Vérifiez les règles de lecture de la collection candidates_2027.',
        )
        console.error('Failed to load candidates from Firestore', readError)
      } finally {
        if (active) {
          setIsLoading(false)
        }
      }
    }

    void loadCandidates()

    return () => {
      active = false
    }
  }, [])

  const declaredCount = useMemo(
    () =>
      candidates.filter(
        (candidate) => candidate.status === 'declared' || candidate.status === 'declared_primary',
      ).length,
    [candidates],
  )

  const conditionalCount = useMemo(
    () => candidates.filter((candidate) => candidate.status === 'conditional').length,
    [candidates],
  )

  const lastUpdated = useMemo(
    () =>
      candidates.reduce<string | null>((latest, candidate) => {
        const candidateDate = candidate.dataLastUpdated?.trim()
        if (!candidateDate) {
          return latest
        }

        if (latest === null || candidateDate > latest) {
          return candidateDate
        }

        return latest
      }, null),
    [candidates],
  )

  return {
    candidates,
    isLoading,
    loadError,
    declaredCount,
    conditionalCount,
    lastUpdated,
  }
}
