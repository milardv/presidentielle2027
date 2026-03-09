import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  type PartialWithFieldValue,
  type Unsubscribe,
  type WithFieldValue,
} from 'firebase/firestore'
import { db } from '../firebase'

const USERS_COLLECTION = 'users'

interface UpsertUserProfileInput {
  displayName: string
  email: string
  photoUrl: string | null
  providerId: string
}

interface UserProfileDocument {
  uid: string
  displayName: string
  email: string
  photoUrl: string | null
  providerId: string
  favoriteCandidateIds: string[]
  createdAt: ReturnType<typeof serverTimestamp>
  updatedAt: ReturnType<typeof serverTimestamp>
  lastSignInAt: ReturnType<typeof serverTimestamp>
}

function userDocRef(uid: string) {
  return doc(db, USERS_COLLECTION, uid)
}

export async function upsertUserProfile(uid: string, input: UpsertUserProfileInput): Promise<void> {
  const reference = userDocRef(uid)
  const snapshot = await getDoc(reference)

  if (!snapshot.exists()) {
    const createPayload: WithFieldValue<UserProfileDocument> = {
      uid,
      displayName: input.displayName,
      email: input.email,
      photoUrl: input.photoUrl,
      providerId: input.providerId,
      favoriteCandidateIds: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastSignInAt: serverTimestamp(),
    }
    await setDoc(reference, createPayload)
    return
  }

  const updatePayload: PartialWithFieldValue<UserProfileDocument> = {
    displayName: input.displayName,
    email: input.email,
    photoUrl: input.photoUrl,
    providerId: input.providerId,
    updatedAt: serverTimestamp(),
    lastSignInAt: serverTimestamp(),
  }
  await setDoc(reference, updatePayload, { merge: true })
}

function sanitizeFavoriteCandidateIds(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value.filter((entry): entry is string => typeof entry === 'string')
}

export function subscribeToUserFavoriteCandidateIds(
  uid: string,
  onNext: (favoriteCandidateIds: string[]) => void,
  onError?: (error: unknown) => void,
): Unsubscribe {
  return onSnapshot(
    userDocRef(uid),
    (snapshot) => {
      if (!snapshot.exists()) {
        onNext([])
        return
      }

      onNext(sanitizeFavoriteCandidateIds(snapshot.data().favoriteCandidateIds))
    },
    onError,
  )
}

export async function toggleFavoriteCandidate(
  uid: string,
  candidateId: string,
  shouldFavorite: boolean,
): Promise<void> {
  const payload: PartialWithFieldValue<UserProfileDocument> = {
    uid,
    favoriteCandidateIds: shouldFavorite ? arrayUnion(candidateId) : arrayRemove(candidateId),
    updatedAt: serverTimestamp(),
  }

  await setDoc(userDocRef(uid), payload, { merge: true })
}
