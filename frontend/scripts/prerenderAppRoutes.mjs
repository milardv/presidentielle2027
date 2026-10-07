import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { CANDIDATE_DATA_LAST_UPDATED, candidates2027 } from '../src/data/candidates2027.js'
import { QUIZ_UPDATED_AT } from '../src/data/quizData.js'
import { actuArticles } from '../src/data/actuArticles.js'
import { pollsRouteSeo, quizRouteSeo, sourcesRouteSeo } from '../src/seo/appRoutesSeo.js'
import {
  HEAD_MARKERS,
  ROOT_MARKERS,
  buildAppRouteHead,
  buildAbsoluteAssetUrl,
  buildAbsoluteUrl,
  buildBreadcrumbSchema,
  buildCandidateFutureHead,
  buildCandidateHead,
  buildOrganizationSchema,
  buildQuizResultHead,
  buildWebpageSchema,
  buildWebsiteSchema,
  escapeHtml,
  renderHeadBlock,
  renderCandidateFallback,
  renderCandidateFutureFallback,
  renderPollsFallback,
  renderQuizFallback,
  renderQuizResultFallback,
  renderSourcesFallback,
  replaceBetweenMarkers,
  runningCandidates,
} from './lib/seoRender.mjs'

const PROJECT_ROOT = resolve(new URL('..', import.meta.url).pathname)
const DIST_DIR = resolve(PROJECT_ROOT, 'dist')
const today = new Date().toISOString().slice(0, 10)

function renderActuIndexFallback() {
  return `<main id="seo-root-fallback"><p class="eyebrow">Présidentielle 2027 · Actu</p><h1>Comprendre avant de choisir</h1><p class="lead">Articles gratuits, documentés et sourcés pour comprendre les enjeux de la présidentielle.</p><section class="panel"><h2>À la une</h2>${actuArticles.map((article) => `<p><a href="${escapeHtml(article.path)}">${escapeHtml(article.title)}</a> — ${escapeHtml(article.description)}</p>`).join('')}</section></main>`
}

function renderActuArticleFallback(article) {
  return `<main id="seo-root-fallback"><p><a href="/actu/">Actu</a> · ${escapeHtml(article.category)} · ${escapeHtml(article.publishedAt)}</p><article><h1>${escapeHtml(article.title)}</h1><p class="lead">${escapeHtml(article.standfirst)}</p><figure><img src="${escapeHtml(article.image)}" alt="${escapeHtml(article.imageAlt)}" style="max-width:100%;height:auto"/><figcaption>${escapeHtml(article.imageCaption)} <a href="${escapeHtml(article.imageCreditUrl)}">${escapeHtml(article.imageCredit)}</a></figcaption></figure>${article.sections.map((section) => `<section><h2>${escapeHtml(section.title)}</h2>${section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph.text)} ${paragraph.sources.map((id) => `<a href="#source-${id}">[${id}]</a>`).join(' ')}</p>`).join('')}</section>`).join('')}<section><h2>Sources & méthode</h2><ol>${article.sources.map((source) => `<li id="source-${source.id}"><a href="${escapeHtml(source.url)}">${escapeHtml(source.label)}</a> — ${escapeHtml(source.publisher)}</li>`).join('')}</ol></section></article></main>`
}

function buildActuArticleHead(article) {
  const title = `${article.title} | Présidentielle 2027`
  return renderHeadBlock({
    title,
    description: article.description,
    canonicalPath: article.path,
    image: article.image,
    ogType: 'article',
    schemaGraph: [
      buildOrganizationSchema(),
      buildWebsiteSchema(),
      buildWebpageSchema({ title, description: article.description, url: buildAbsoluteUrl(article.path), dateModified: article.publishedAt }),
      buildBreadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'Actu', path: '/actu/' }, { name: article.title, path: article.path }]),
      { '@type': 'NewsArticle', headline: article.title, description: article.description, datePublished: article.publishedAt, dateModified: article.publishedAt, inLanguage: 'fr-FR', isAccessibleForFree: true, image: buildAbsoluteAssetUrl(article.image), mainEntityOfPage: buildAbsoluteUrl(article.path), author: { '@type': 'Organization', name: 'Présidentielles 2027' }, publisher: { '@type': 'Organization', name: 'Présidentielles 2027' }, citation: article.sources.map((source) => source.url) },
    ],
  })
}

const routes = [
  {
    path: '/actu/',
    head: buildAppRouteHead({ path: '/actu/', title: 'Actu présidentielle 2027 : enquêtes et décryptages', description: 'Des articles de fond, gratuits et sourcés, pour comprendre les enjeux de la présidentielle 2027.' }, { dateModified: actuArticles[0].publishedAt }),
    root: renderActuIndexFallback(),
  },
  ...actuArticles.map((article) => ({ path: article.path, head: buildActuArticleHead(article), root: renderActuArticleFallback(article) })),
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
  {
    path: quizRouteSeo.path,
    head: buildAppRouteHead(quizRouteSeo, { dateModified: QUIZ_UPDATED_AT, image: '/quiz/cards/quiz.jpg' }),
    root: renderQuizFallback(),
  },
  ...runningCandidates().map((candidate) => ({
    path: `/quiz/resultat/${candidate.id}/`,
    head: buildQuizResultHead(candidate),
    root: renderQuizResultFallback(candidate),
  })),
  ...candidates2027.map((candidate) => ({
    path: `/candidats/${candidate.id}/`,
    head: buildCandidateHead(candidate),
    root: renderCandidateFallback(candidate),
  })),
  ...runningCandidates().map((candidate) => ({
    path: `/candidats/${candidate.id}/france-2032/`,
    head: buildCandidateFutureHead(candidate),
    root: renderCandidateFutureFallback(candidate),
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
