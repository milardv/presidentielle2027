import express from 'express'
import { execFile } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ADMIN_EMAIL = 'valentin.milard1@gmail.com'
const HOST = process.env.ADMIN_SYNC_HOST || '127.0.0.1'
const PORT = Number.parseInt(process.env.ADMIN_SYNC_PORT || '8787', 10)
const __dirname = dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = resolve(__dirname, '..')

function isAdminEmail(email) {
  return typeof email === 'string' && email.trim().toLowerCase() === ADMIN_EMAIL
}

function runTweetSync(args = []) {
  return new Promise((resolvePromise, rejectPromise) => {
    execFile(
      process.execPath,
      ['scripts/syncCandidateTweets.mjs', ...args],
      {
        cwd: PROJECT_ROOT,
        env: process.env,
        maxBuffer: 4 * 1024 * 1024,
      },
      (error, stdout, stderr) => {
        if (error) {
          rejectPromise(new Error(stderr.trim() || stdout.trim() || error.message))
          return
        }

        try {
          const payload = JSON.parse(stdout)
          const summaryEntries = Array.isArray(payload.summary) ? payload.summary : []

          resolvePromise({
            summary: summaryEntries,
            importedCount: summaryEntries.reduce(
              (total, entry) =>
                total +
                (typeof entry?.count === 'number' && Number.isFinite(entry.count) ? entry.count : 0),
              0,
            ),
            output: payload,
          })
        } catch (parseError) {
          rejectPromise(
            new Error(
              `Impossible d'interpreter la reponse du sync tweets.${stdout ? ` Sortie: ${stdout}` : ''}`,
            ),
          )
        }
      },
    )
  })
}

const app = express()

app.use((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (request.method === 'OPTIONS') {
    response.sendStatus(204)
    return
  }

  next()
})

app.use(express.json({ limit: '32kb' }))

app.get('/health', (_request, response) => {
  response.json({
    status: 'ok',
    service: 'admin-sync-server',
  })
})

app.post('/admin/refresh-all-tweets', async (request, response) => {
  const adminEmail = typeof request.body?.adminEmail === 'string' ? request.body.adminEmail.trim() : ''

  if (!isAdminEmail(adminEmail)) {
    response.status(403).json({
      error: `Admin access required for ${ADMIN_EMAIL}.`,
    })
    return
  }

  try {
    const result = await runTweetSync()
    response.json({
      candidateCount: result.summary.length,
      importedCount: result.importedCount,
      updatedAt: new Date().toISOString(),
    })
  } catch (error) {
    response.status(500).json({
      error: error instanceof Error ? error.message : 'Le refresh global tweets a echoue.',
    })
  }
})

app.post('/admin/refresh-tweets', async (request, response) => {
  const candidateId = typeof request.body?.candidateId === 'string' ? request.body.candidateId.trim() : ''
  const adminEmail = typeof request.body?.adminEmail === 'string' ? request.body.adminEmail.trim() : ''

  if (!isAdminEmail(adminEmail)) {
    response.status(403).json({
      error: `Admin access required for ${ADMIN_EMAIL}.`,
    })
    return
  }

  if (!candidateId || !/^[a-z0-9-]+$/i.test(candidateId)) {
    response.status(400).json({
      error: 'Candidate id invalide.',
    })
    return
  }

  try {
    const result = await runTweetSync([`--candidate=${candidateId}`])
    const summaryEntry = result.summary.find((entry) => entry?.candidateId === candidateId) || null

    response.json({
      candidateId,
      importedCount:
        summaryEntry && typeof summaryEntry.count === 'number' && Number.isFinite(summaryEntry.count)
          ? summaryEntry.count
          : 0,
      status: typeof summaryEntry?.status === 'string' ? summaryEntry.status : 'unknown',
      updatedAt: new Date().toISOString(),
    })
  } catch (error) {
    response.status(500).json({
      error: error instanceof Error ? error.message : 'Le refresh tweets a echoue.',
    })
  }
})

app.listen(PORT, HOST, () => {
  console.log(`Admin sync server listening on http://${HOST}:${PORT}`)
})
