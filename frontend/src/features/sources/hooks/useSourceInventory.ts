import { useEffect, useState } from 'react'
import type { SourceInventory } from '../../../data/sourceInventoryTypes'
import { getSourceInventory } from '../../../services/sourceInventoryRepository'

interface UseSourceInventoryResult {
  inventory: SourceInventory | null
  isLoading: boolean
  loadError: string | null
}

export function useSourceInventory(): UseSourceInventoryResult {
  const [inventory, setInventory] = useState<SourceInventory | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    const loadInventory = async () => {
      setIsLoading(true)
      setLoadError(null)

      try {
        const nextInventory = await getSourceInventory()
        if (!active) {
          return
        }

        setInventory(nextInventory)
      } catch (error) {
        if (!active) {
          return
        }

        setLoadError("Impossible de compiler l'inventaire des sources depuis Firestore.")
        console.error('Failed to load source inventory', error)
      } finally {
        if (active) {
          setIsLoading(false)
        }
      }
    }

    void loadInventory()

    return () => {
      active = false
    }
  }, [])

  return {
    inventory,
    isLoading,
    loadError,
  }
}
