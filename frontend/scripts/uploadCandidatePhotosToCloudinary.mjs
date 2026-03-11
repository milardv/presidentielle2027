import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { initializeApp } from 'firebase/app'
import { doc, getDoc, getFirestore, writeBatch } from 'firebase/firestore'
import { getFirebaseConfig } from './firebaseConfig.mjs'

const CLOUDINARY_CLOUD_NAME = 'dagxzno9s'
const CLOUDINARY_UPLOAD_PRESET = 'trackfit'
const CLOUDINARY_API_KEY = '797213819654381'
const CLOUDINARY_FOLDER = 'presidentielles/candidats'
const DATA_LAST_UPDATED = '2026-03-11'
const DRY_RUN = process.argv.includes('--dry-run')
const ONLY_CANDIDATE = process.argv.find((argument) => argument.startsWith('--candidate='))?.split('=')[1]

const projectRoot = resolve(new URL('..', import.meta.url).pathname, '..')
const candidatesImagesDirectory = resolve(projectRoot, 'candidats')

const fileMappings = [
  { candidateId: 'bruno-retailleau', fileName: 'bruneau.jpg' },
  { candidateId: 'delphine-batho', fileName: 'delphine.jpg' },
  { candidateId: 'edouard-philippe', fileName: 'edouard.jpg' },
  { candidateId: 'francois-ruffin', fileName: 'francois.jpg' },
  { candidateId: 'gabriel-attal', fileName: 'gabriel.jpg' },
  { candidateId: 'gerald-darmanin', fileName: 'gerald.jpg' },
  { candidateId: 'jean-luc-melenchon', fileName: 'jean-luc.jpg' },
  { candidateId: 'jordan-bardella', fileName: 'jordan.jpg' },
  { candidateId: 'marine-le-pen', fileName: 'marine le pen.jpg' },
  { candidateId: 'marine-tondelier', fileName: 'marine tondelier.jpg' },
  { candidateId: 'nathalie-arthaud', fileName: 'nathalie.jpg' },
  { candidateId: 'raphael-glucksmann', fileName: 'raphael.jpg' },
  { candidateId: 'xavier-bertrand', fileName: 'xavier.jpg' },
]

const app = initializeApp(getFirebaseConfig())
const db = getFirestore(app)

function sanitizePublicId(candidateId) {
  return candidateId.replace(/[^a-z0-9/_-]+/gi, '-')
}

async function uploadImage({ candidateId, fileName }) {
  const filePath = resolve(candidatesImagesDirectory, fileName)
  const fileBuffer = await readFile(filePath)
  const uploadUrl = `https://api.cloudinary.com/v1_1/${encodeURIComponent(CLOUDINARY_CLOUD_NAME)}/image/upload`
  const formData = new FormData()

  formData.append('file', new Blob([fileBuffer]), fileName)
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
  formData.append('api_key', CLOUDINARY_API_KEY)
  formData.append('folder', CLOUDINARY_FOLDER)
  formData.append('public_id', sanitizePublicId(candidateId))
  formData.append('filename_override', fileName)

  const response = await fetch(uploadUrl, {
    method: 'POST',
    body: formData,
  })

  const payload = await response.json()
  if (!response.ok || typeof payload.secure_url !== 'string') {
    throw new Error(payload?.error?.message ?? `Upload failed for ${candidateId}.`)
  }

  return payload.secure_url
}

async function main() {
  const batch = writeBatch(db)
  const updates = []

  for (const mapping of fileMappings) {
    if (ONLY_CANDIDATE && mapping.candidateId !== ONLY_CANDIDATE) {
      continue
    }

    const candidateRef = doc(db, 'candidates_2027', mapping.candidateId)
    const candidateSnapshot = await getDoc(candidateRef)

    if (!candidateSnapshot.exists()) {
      throw new Error(`Candidate not found in Firestore: ${mapping.candidateId}`)
    }

    const uploadedUrl = DRY_RUN
      ? `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${CLOUDINARY_FOLDER}/${sanitizePublicId(mapping.candidateId)}`
      : await uploadImage(mapping)

    updates.push({ candidateId: mapping.candidateId, uploadedUrl })

    if (DRY_RUN) {
      continue
    }

    batch.update(candidateRef, {
      photoUrl: uploadedUrl,
      dataLastUpdated: DATA_LAST_UPDATED,
    })
  }

  if (DRY_RUN) {
    console.log(`Dry run: ${updates.length} candidate photos would be uploaded.`)
    for (const update of updates) {
      console.log(`${update.candidateId} -> ${update.uploadedUrl}`)
    }
    return
  }

  await batch.commit()
  console.log(`Uploaded and updated ${updates.length} candidate photos.`)
  for (const update of updates) {
    console.log(`${update.candidateId} -> ${update.uploadedUrl}`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
