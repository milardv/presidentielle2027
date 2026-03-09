import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import type { Candidate } from '../data/candidateTypes'
import { parseCandidate } from './candidateParsers'

const CANDIDATES_COLLECTION = 'candidates_2027'

export async function getCandidatesFromDatabase(): Promise<Candidate[]> {
  const queryRef = query(collection(db, CANDIDATES_COLLECTION), orderBy('priority', 'asc'))
  const snapshot = await getDocs(queryRef)

  return snapshot.docs
    .map((entry) => parseCandidate(entry.id, entry.data()))
    .filter((candidate): candidate is Candidate => candidate !== null)
}

export async function getCandidateByIdFromDatabase(candidateId: string): Promise<Candidate | null> {
  const snapshot = await getDoc(doc(db, CANDIDATES_COLLECTION, candidateId))
  if (!snapshot.exists()) {
    return null
  }

  return parseCandidate(snapshot.id, snapshot.data())
}
