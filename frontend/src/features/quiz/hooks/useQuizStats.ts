import { useEffect, useState } from 'react'
import type { QuizStats } from '../../../data/quizStatsTypes'
import { getQuizStats } from '../../../services/quizStatsRepository'

interface UseQuizStatsResult {
  stats: QuizStats | null
  isLoading: boolean
  loadError: string | null
}

export function useQuizStats(): UseQuizStatsResult {
  const [stats, setStats] = useState<QuizStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    // A cold Firestore connection occasionally reports "client is offline"; one retry covers it.
    const load = async (attempt = 0): Promise<void> => {
      try {
        const value = await getQuizStats()
        if (!active) return
        setStats(value)
        setIsLoading(false)
      } catch (error) {
        if (!active) return
        if (attempt < 2) {
          await new Promise((resolve) => window.setTimeout(resolve, 1500 * (attempt + 1)))
          return load(attempt + 1)
        }
        setLoadError('Statistiques indisponibles pour le moment.')
        setIsLoading(false)
        console.error('Failed to load quiz stats', error)
      }
    }

    void load()

    return () => {
      active = false
    }
  }, [])

  return { stats, isLoading, loadError }
}
