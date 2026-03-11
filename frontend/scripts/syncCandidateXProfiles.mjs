import { initializeApp } from 'firebase/app'
import { collection, doc, getDocs, getFirestore, writeBatch } from 'firebase/firestore'
import { getFirebaseConfig } from './firebaseConfig.mjs'
import { CANDIDATE_X_PROFILES } from './candidateXProfiles.mjs'

const app = initializeApp(getFirebaseConfig())
const db = getFirestore(app)
const snapshot = await getDocs(collection(db, 'candidates_2027'))
const batch = writeBatch(db)
const todayIso = new Date().toISOString().slice(0, 10)
let updatedCount = 0

for (const entry of snapshot.docs) {
  const profile = CANDIDATE_X_PROFILES[entry.id]
  if (!profile) {
    continue
  }

  batch.set(
    doc(db, 'candidates_2027', entry.id),
    {
      xUsername: profile.username,
      dataLastUpdated: todayIso,
    },
    { merge: true },
  )
  updatedCount += 1
}

await batch.commit()
console.log(JSON.stringify({ updatedCount }, null, 2))
