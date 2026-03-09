import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import type { VotingIntentPoll } from '../data/pollTypes'
import { parseVotingIntentPoll } from './pollParsers'

const POLLS_COLLECTION = 'polls_2027'

export async function getVotingIntentPollsFromDatabase(): Promise<VotingIntentPoll[]> {
  const queryRef = query(collection(db, POLLS_COLLECTION), orderBy('fieldworkEnd', 'desc'))
  const snapshot = await getDocs(queryRef)

  return snapshot.docs
    .map((entry) => parseVotingIntentPoll(entry.id, entry.data()))
    .filter((entry): entry is VotingIntentPoll => entry !== null)
}
