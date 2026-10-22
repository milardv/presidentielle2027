import { collection, doc, onSnapshot, runTransaction, serverTimestamp, type Unsubscribe } from 'firebase/firestore'
import { db } from '../firebase'
import { knowledgeCategories } from '../data/knowledgeQuestions'

export const KNOWLEDGE_VISITOR_KEY = 'presidentielle2027-knowledge-visitor-v1'
let memoryVisitorId: string | null = null

function visitorId(): string {
  if (memoryVisitorId) return memoryVisitorId
  try {
    memoryVisitorId = localStorage.getItem(KNOWLEDGE_VISITOR_KEY) || crypto.randomUUID()
    localStorage.setItem(KNOWLEDGE_VISITOR_KEY, memoryVisitorId)
  } catch { memoryVisitorId = crypto.randomUUID() }
  return memoryVisitorId
}

async function participantKey(identity: string, categoryId: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`knowledge-v1:${identity}:${categoryId}`))
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

export function subscribeToKnowledgeParticipation(
  onNext: (counts: Record<string, number>) => void,
  onError: (error: unknown) => void,
): Unsubscribe {
  return onSnapshot(collection(db, 'knowledge_category_stats_2027'), (snapshot) => {
    const counts: Record<string, number> = {}
    snapshot.forEach((entry) => {
      const count = entry.data().startedCount
      if (Number.isSafeInteger(count) && count >= 0) counts[entry.id] = count
    })
    onNext(counts)
  }, onError)
}

export async function recordKnowledgeCategoryStart(categoryId: string, uid?: string): Promise<void> {
  if (!knowledgeCategories.some((category) => category.id === categoryId)) throw new Error('invalid-knowledge-category')
  const identities = [`visitor:${visitorId()}`, ...(uid ? [`account:${uid}`] : [])]
  const keys = await Promise.all(identities.map((identity) => participantKey(identity, categoryId)))
  const participants = keys.map((key) => doc(db, 'knowledge_category_starts_2027', key))
  const stats = doc(db, 'knowledge_category_stats_2027', categoryId)
  await runTransaction(db, async (transaction) => {
    const previous = await Promise.all(participants.map((reference) => transaction.get(reference)))
    const aggregate = await transaction.get(stats)
    const count = aggregate.data()?.startedCount ?? 0
    if (!Number.isSafeInteger(count) || count < 0) throw new Error('invalid-participation-count')
    const alreadyStarted = previous.some((entry) => entry.exists())
    previous.forEach((entry, index) => {
      if (!entry.exists()) transaction.set(participants[index], { categoryId, startedAt: serverTimestamp() })
    })
    if (!alreadyStarted) transaction.set(stats, { startedCount: count + 1, updatedAt: serverTimestamp() }, { merge: true })
  })
}
