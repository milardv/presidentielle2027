import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import type { Candidate } from '../data/candidateTypes'
import { knownCandidates2027 } from '../data/candidates'
import { getStaticCandidate, mergeCandidateListWithStatic, mergeCandidateWithStatic } from './candidateMerge'
import { parseCandidate } from './candidateParsers'

const CANDIDATES_COLLECTION = 'candidates_2027'

export async function getCandidatesFromDatabase(): Promise<Candidate[]> {
  try {
    const queryRef = query(collection(db, CANDIDATES_COLLECTION), orderBy('priority', 'asc'))
    const snapshot = await getDocs(queryRef)

    const dbCandidates = snapshot.docs
      .map((entry) => parseCandidate(entry.id, entry.data()))
      .filter((candidate): candidate is Candidate => candidate !== null)

    return mergeCandidateListWithStatic(dbCandidates)
  } catch (error) {
    console.warn('Firestore unavailable, serving static candidate data.', error)
    return [...knownCandidates2027].sort((a, b) => a.priority - b.priority)
  }
}

export async function getCandidateByIdFromDatabase(candidateId: string): Promise<Candidate | null> {
  const staticCandidate = getStaticCandidate(candidateId)

  try {
    const snapshot = await getDoc(doc(db, CANDIDATES_COLLECTION, candidateId))
    if (!snapshot.exists()) {
      return staticCandidate
    }

    const dbCandidate = parseCandidate(snapshot.id, snapshot.data())
    return dbCandidate ? mergeCandidateWithStatic(dbCandidate) : staticCandidate
  } catch (error) {
    console.warn(`Firestore unavailable for ${candidateId}, serving static candidate data.`, error)
    return staticCandidate
  }
}

export async function getCandidatesByIdsFromDatabase(candidateIds: string[]): Promise<Candidate[]> {
  const uniqueCandidateIds = [...new Set(candidateIds)]

  if (uniqueCandidateIds.length === 0) {
    return []
  }

  const candidates = await Promise.all(
    uniqueCandidateIds.map((candidateId) => getCandidateByIdFromDatabase(candidateId)),
  )

  const candidatesById = new Map(
    candidates
      .filter((candidate): candidate is Candidate => candidate !== null)
      .map((candidate) => [candidate.id, candidate]),
  )

  return uniqueCandidateIds
    .map((candidateId) => candidatesById.get(candidateId) ?? null)
    .filter((candidate): candidate is Candidate => candidate !== null)
}
