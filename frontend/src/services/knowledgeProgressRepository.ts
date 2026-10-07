import { doc, onSnapshot, runTransaction, serverTimestamp, type Unsubscribe } from 'firebase/firestore'
import { db } from '../firebase'
import { knowledgeCategories } from '../data/knowledgeQuestions'
import { getKnowledgeStats, parseKnowledgeSession, type KnowledgeSession } from '../features/knowledge/knowledgeGame'

export interface KnowledgeAchievements {
  journeyBadgeCount: number
  masteredCategoryIds: string[]
}

const userDoc = (uid: string) => doc(db, 'users', uid)

function parseSavedProgress(value: unknown): KnowledgeSession | null {
  const progress = parseKnowledgeSession(value)
  return progress && progress.answers.length >= 10 && progress.answers.length % 10 === 0 && ['checkpoint', 'result'].includes(progress.phase) ? progress : null
}

export function parseKnowledgeAchievements(value: unknown): KnowledgeAchievements {
  const raw = value && typeof value === 'object' ? value as Partial<KnowledgeAchievements> : {}
  const categoryIds = new Set(knowledgeCategories.map((category) => category.id))
  return {
    journeyBadgeCount: Number.isInteger(raw.journeyBadgeCount) ? Math.max(0, Math.min(10, raw.journeyBadgeCount!)) : 0,
    masteredCategoryIds: Array.isArray(raw.masteredCategoryIds) ? raw.masteredCategoryIds.filter((id): id is string => typeof id === 'string' && categoryIds.has(id)) : [],
  }
}

export function mergeKnowledgeAchievements(previous: unknown, journeyBadgeCount: number, masteredCategoryIds: string[]): KnowledgeAchievements {
  const current = parseKnowledgeAchievements(previous)
  return {
    journeyBadgeCount: Math.max(current.journeyBadgeCount, Math.min(10, journeyBadgeCount)),
    masteredCategoryIds: [...new Set([...current.masteredCategoryIds, ...masteredCategoryIds])],
  }
}

export function subscribeToKnowledgeProgress(
  uid: string,
  onNext: (progress: KnowledgeSession | null, achievements: KnowledgeAchievements) => void,
  onError: (error: unknown) => void,
): Unsubscribe {
  return onSnapshot(userDoc(uid), (snapshot) => {
    onNext(parseSavedProgress(snapshot.data()?.knowledgeProgress), parseKnowledgeAchievements(snapshot.data()?.knowledgeAchievements))
  }, onError)
}

export async function saveKnowledgeProgress(
  uid: string,
  session: KnowledgeSession,
  overwrite = false,
): Promise<{ saved: boolean; progress: KnowledgeSession }> {
  if (!parseSavedProgress(session)) {
    throw new Error('invalid-knowledge-progress')
  }

  return runTransaction(db, async (transaction) => {
    const reference = userDoc(uid)
    const snapshot = await transaction.get(reference)
    const previous = parseSavedProgress(snapshot.data()?.knowledgeProgress)
    const earned = getKnowledgeStats(session.answers).mastered.map((category) => category.id)
    const knowledgeAchievements = mergeKnowledgeAchievements(snapshot.data()?.knowledgeAchievements, session.answers.length / 10, earned)
    if (!overwrite && previous && previous.answers.length > session.answers.length) {
      transaction.set(reference, { knowledgeAchievements, updatedAt: serverTimestamp() }, { merge: true })
      return { saved: false, progress: previous }
    }
    transaction.set(reference, { knowledgeProgress: session, knowledgeAchievements, updatedAt: serverTimestamp() }, { merge: true })
    return { saved: true, progress: session }
  })
}
