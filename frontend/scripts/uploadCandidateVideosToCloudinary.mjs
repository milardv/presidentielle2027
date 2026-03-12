import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { initializeApp } from 'firebase/app'
import { doc, getDoc, getFirestore, writeBatch } from 'firebase/firestore'
import { getFirebaseConfig } from './firebaseConfig.mjs'

const CLOUDINARY_CLOUD_NAME = 'dagxzno9s'
const CLOUDINARY_UPLOAD_PRESET = 'trackfit'
const CLOUDINARY_API_KEY = '797213819654381'
const CLOUDINARY_FOLDER = 'presidentielles/candidats/videos'
const DATA_LAST_UPDATED = '2026-03-12'
const DRY_RUN = process.argv.includes('--dry-run')
const ONLY_CANDIDATE = process.argv.find((argument) => argument.startsWith('--candidate='))?.split('=')[1]

const projectRoot = resolve(new URL('..', import.meta.url).pathname, '..')
const candidatesVideosDirectory = resolve(projectRoot, 'candidats')

const fileMappings = [
  { candidateId: 'bruno-retailleau', fileName: 'bruneau.mp4' },
  { candidateId: 'delphine-batho', fileName: 'delphine.mp4' },
  { candidateId: 'edouard-philippe', fileName: 'edouard.mp4' },
  { candidateId: 'francois-ruffin', fileName: 'francois.mp4' },
  { candidateId: 'gabriel-attal', fileName: 'gabriel.mp4' },
  { candidateId: 'gerald-darmanin', fileName: 'gerald.mp4' },
  { candidateId: 'jean-luc-melenchon', fileName: 'jean-luc.mp4' },
  { candidateId: 'jordan-bardella', fileName: 'jordan.mp4' },
  { candidateId: 'marine-le-pen', fileName: 'marine le pen.mp4' },
  { candidateId: 'marine-tondelier', fileName: 'marine tondelier.mp4' },
  { candidateId: 'nathalie-arthaud', fileName: 'nathalie.mp4' },
  { candidateId: 'raphael-glucksmann', fileName: 'raphael.mp4' },
  { candidateId: 'xavier-bertrand', fileName: 'xavier.mp4' },
]

const app = initializeApp(getFirebaseConfig())
const db = getFirestore(app)

function sanitizePublicId(candidateId) {
  return candidateId.replace(/[^a-z0-9/_-]+/gi, '-')
}

function encodePublicIdForPath(publicId) {
  return publicId
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')
}

function buildOptimizedVideoUrl(publicId, version, format = 'mp4') {
  return `https://res.cloudinary.com/${encodeURIComponent(CLOUDINARY_CLOUD_NAME)}/video/upload/f_auto,q_auto:good,vc_auto/v${encodeURIComponent(String(version))}/${encodePublicIdForPath(publicId)}.${encodeURIComponent(format)}`
}

async function uploadVideo({ candidateId, fileName }) {
  const filePath = resolve(candidatesVideosDirectory, fileName)
  const fileBuffer = await readFile(filePath)
  const uploadUrl = `https://api.cloudinary.com/v1_1/${encodeURIComponent(CLOUDINARY_CLOUD_NAME)}/video/upload`
  const formData = new FormData()

  formData.append('file', new Blob([fileBuffer]), fileName)
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
  formData.append('api_key', CLOUDINARY_API_KEY)
  formData.append('folder', CLOUDINARY_FOLDER)
  formData.append('public_id', sanitizePublicId(candidateId))
  formData.append('filename_override', fileName)
  formData.append('resource_type', 'video')

  const response = await fetch(uploadUrl, {
    method: 'POST',
    body: formData,
  })

  const payload = await response.json()
  if (
    !response.ok ||
    typeof payload.public_id !== 'string' ||
    (typeof payload.version !== 'string' && typeof payload.version !== 'number')
  ) {
    throw new Error(payload?.error?.message ?? `Video upload failed for ${candidateId}.`)
  }

  return buildOptimizedVideoUrl(payload.public_id, payload.version, typeof payload.format === 'string' ? payload.format : 'mp4')
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
      ? buildOptimizedVideoUrl(`${CLOUDINARY_FOLDER}/${sanitizePublicId(mapping.candidateId)}`, 'draft')
      : await uploadVideo(mapping)

    updates.push({ candidateId: mapping.candidateId, uploadedUrl })

    if (DRY_RUN) {
      continue
    }

    batch.update(candidateRef, {
      videoUrl: uploadedUrl,
      dataLastUpdated: DATA_LAST_UPDATED,
    })
  }

  if (DRY_RUN) {
    console.log(`Dry run: ${updates.length} candidate videos would be uploaded.`)
    for (const update of updates) {
      console.log(`${update.candidateId} -> ${update.uploadedUrl}`)
    }
    return
  }

  await batch.commit()
  console.log(`Uploaded and updated ${updates.length} candidate videos.`)
  for (const update of updates) {
    console.log(`${update.candidateId} -> ${update.uploadedUrl}`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
