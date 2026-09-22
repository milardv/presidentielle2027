import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { CANDIDATE_DATA_LAST_UPDATED, candidates2027 } from '../src/data/candidates2027.js'
import { pollsRouteSeo, sourcesRouteSeo } from '../src/seo/appRoutesSeo.js'
import {
  HEAD_MARKERS,
  ROOT_MARKERS,
  buildAppRouteHead,
  buildCandidateHead,
  renderCandidateFallback,
  renderPollsFallback,
  renderSourcesFallback,
  replaceBetweenMarkers,
} from './lib/seoRender.mjs'

const PROJECT_ROOT = resolve(new URL('..', import.meta.url).pathname)
const DIST_DIR = resolve(PROJECT_ROOT, 'dist')
const today = new Date().toISOString().slice(0, 10)

const routes = [
  {
    path: pollsRouteSeo.path,
    head: buildAppRouteHead(pollsRouteSeo, { dateModified: today }),
    root: renderPollsFallback(),
  },
  {
    path: sourcesRouteSeo.path,
    head: buildAppRouteHead(sourcesRouteSeo, { dateModified: CANDIDATE_DATA_LAST_UPDATED }),
    root: renderSourcesFallback(),
  },
  ...candidates2027.map((candidate) => ({
    path: `/candidats/${candidate.id}/`,
    head: buildCandidateHead(candidate),
    root: renderCandidateFallback(candidate),
  })),
]

async function main() {
  const template = await readFile(resolve(DIST_DIR, 'index.html'), 'utf8')

  for (const route of routes) {
    const html = replaceBetweenMarkers(
      replaceBetweenMarkers(template, HEAD_MARKERS, route.head),
      ROOT_MARKERS,
      route.root,
    )
    const directory = resolve(DIST_DIR, `.${route.path}`)
    await mkdir(directory, { recursive: true })
    await writeFile(resolve(directory, 'index.html'), html, 'utf8')
  }

  // GitHub Pages serves 404.html for unknown paths; keep the SPA shell there.
  await copyFile(resolve(DIST_DIR, 'index.html'), resolve(DIST_DIR, '404.html'))

  console.log(`Prerendered ${routes.length} app routes into dist/.`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
