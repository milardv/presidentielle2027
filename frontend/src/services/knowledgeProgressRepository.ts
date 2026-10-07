import { doc, onSnapshot, runTransaction, serverTimestamp, type Unsubscribe } from 'firebase/firestore'
import { db } from '../firebase'
import { parseKnowledgeSession, type KnowledgeSession } from '../features/knowledge/knowledgeGame'

const userDoc = (uid: string) => doc(db, 'users', uid)

function parseSavedProgress(value: unknown): KnowledgeSession | null {
  const progress = parseKnowledgeSession(value)
  return progress && progress.answers.length >= 10 && progress.answers.length % 10 === 0 && ['checkpoint', 'result'].includes(progress.phase) ? progress : null
}

export function subscribeToKnowledgeProgress(
  uid: string,
  onNext: (progress: KnowledgeSession | null) => void,
  onError: (error: unknown) => void,
): Unsubscribe {
  return onSnapshot(userDoc(uid), (snapshot) => {
    onNext(parseSavedProgress(snapshot.data()?.knowledgeProgress))
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
    if (!overwrite && previous && previous.answers.length > session.answers.length) {
      return { saved: false, progress: previous }
    }
    transaction.set(reference, { knowledgeProgress: session, updatedAt: serverTimestamp() }, { merge: true })
    return { saved: true, progress: session }
  })
}
