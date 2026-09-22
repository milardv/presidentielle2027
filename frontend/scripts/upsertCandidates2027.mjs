import { initializeApp } from 'firebase/app'
import { getFirebaseConfig } from './firebaseConfig.mjs'
import { doc, getDocs, collection, writeBatch, getFirestore } from 'firebase/firestore'
import { candidates2027 } from '../src/data/candidates2027.js'

const firebaseConfig = getFirebaseConfig()

const CANDIDATES_COLLECTION = 'candidates_2027'
const DRY_RUN = process.argv.includes('--dry-run')

// Empty photoUrl must not erase a Cloudinary URL already stored in Firestore.
const candidates = candidates2027.map(({ photoUrl, ...candidate }) =>
  photoUrl ? { ...candidate, photoUrl } : candidate,
)

async function main() {
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  const existingSnapshot = await getDocs(collection(db, CANDIDATES_COLLECTION))
  const existingIds = new Set(existingSnapshot.docs.map((entry) => entry.id))

  console.log(`Preparing ${candidates.length} candidate documents for ${CANDIDATES_COLLECTION}.`)
  console.log(`Existing documents before upsert: ${existingSnapshot.size}`)

  for (const candidate of candidates) {
    console.log(`- ${existingIds.has(candidate.id) ? 'update' : 'create'} ${candidate.id} (${candidate.statusLabel})`)
  }

  if (DRY_RUN) {
    console.log('Dry run enabled. No data written.')
    return
  }

  const batch = writeBatch(db)
  for (const candidate of candidates) {
    batch.set(doc(db, CANDIDATES_COLLECTION, candidate.id), candidate, { merge: true })
  }

  await batch.commit()

  const updatedSnapshot = await getDocs(collection(db, CANDIDATES_COLLECTION))
  console.log(`Collection size after upsert: ${updatedSnapshot.size}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
