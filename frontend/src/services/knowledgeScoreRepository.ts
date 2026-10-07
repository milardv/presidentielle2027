import { doc, onSnapshot, runTransaction, serverTimestamp, type Unsubscribe } from 'firebase/firestore'
import { db } from '../firebase'
import { mergeKnowledgeAchievements } from './knowledgeProgressRepository'

export interface KnowledgeBestScore {
  score: number
  answered: number
  correct: number
  completed: boolean
  masteredCategoryIds: string[]
}

const userDoc = (uid: string) => doc(db, 'users', uid)

function parseBestScore(value: unknown): KnowledgeBestScore | null {
  if (!value || typeof value !== 'object') return null
  const raw = value as Record<string, unknown>
  if (typeof raw.score !== 'number' || typeof raw.answered !== 'number' || typeof raw.correct !== 'number') return null
  if (typeof raw.completed !== 'boolean' || !Array.isArray(raw.masteredCategoryIds)) return null
  return {
    score: raw.score,
    answered: raw.answered,
    correct: raw.correct,
    completed: raw.completed,
    masteredCategoryIds: raw.masteredCategoryIds.filter((id): id is string => typeof id === 'string'),
  }
}

export function subscribeToKnowledgeBestScore(uid: string, onNext: (best: KnowledgeBestScore | null) => void, onError: (error: unknown) => void): Unsubscribe {
  return onSnapshot(userDoc(uid), (snapshot) => onNext(parseBestScore(snapshot.data()?.knowledgeBestScore)), onError)
}

export async function saveKnowledgeBestScore(uid: string, result: KnowledgeBestScore): Promise<{ best: KnowledgeBestScore; saved: boolean }> {
  return runTransaction(db, async (transaction) => {
    const reference = userDoc(uid)
    const snapshot = await transaction.get(reference)
    const previous = parseBestScore(snapshot.data()?.knowledgeBestScore)
    const newRecord = !previous || result.score > previous.score || (result.score === previous.score && result.answered > previous.answered)
    const knowledgeAchievements = mergeKnowledgeAchievements(snapshot.data()?.knowledgeAchievements, Math.floor(result.answered / 10), result.masteredCategoryIds)
    transaction.set(reference, { ...(newRecord ? { knowledgeBestScore: result } : {}), knowledgeAchievements, updatedAt: serverTimestamp() }, { merge: true })
    return { best: newRecord ? result : previous!, saved: newRecord }
  })
}
