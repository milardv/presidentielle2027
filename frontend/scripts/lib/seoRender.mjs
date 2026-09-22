import { accentizeFrenchCopy } from '../../src/seo/frenchCopy.js'
import {
  SITE_LOGO_PATH,
  SITE_NAME,
  SITE_SOCIAL_IMAGE_PATH,
  SITE_URL,
  seoPages,
} from '../../src/seo/seoPagesData.js'
import {
  CANDIDATE_DATA_LAST_UPDATED,
  candidates2027,
  electionCalendar,
} from '../../src/data/candidates2027.js'
import {
  STATUS_ORDER,
  buildCandidateFutureSeo,
  buildCandidateJsonLd,
  buildCandidateSeo,
  candidateFuturePath,
  candidateProfilePath,
  latestMilestone,
  statusGroupLabel,
} from '../../src/seo/candidateSeo.js'
import { FUTURE_HORIZON_YEAR, FUTURE_MODEL_UPDATED_AT, policyLevers } from '../../src/data/futureIndicators.js'
import { buildCandidateFutureModel } from '../../src/features/future/futureModel.js'
import { pollsRouteSeo, quizRouteSeo, sourcesRouteSeo } from '../../src/seo/appRoutesSeo.js'
import pollsSnapshot from '../../src/data/pollsSnapshot.json' with { type: 'json' }
import { QUIZ_UPDATED_AT, quizAnswerOptions, quizQuestions } from '../../src/data/quizData.js'

export const HEAD_MARKERS = ['<!-- seo:head:start -->', '<!-- seo:head:end -->']
export const ROOT_MARKERS = ['<!-- seo:root:start -->', '<!-- seo:root:end -->']

export const siteName = accentizeFrenchCopy(SITE_NAME)

export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

export function normalizePath(path) {
  if (!path || path === '/') {
    return '/'
  }

  const withLeadingSlash = path.startsWith('/') ? path : `/${path}`
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`
}

export function buildAbsoluteUrl(path) {
  const normalizedPath = normalizePath(path)
  return normalizedPath === '/' ? `${SITE_URL}/` : `${SITE_URL}${normalizedPath}`
}

export function buildAbsoluteAssetUrl(path) {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

const frenchDateFormatter = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

export function formatFrenchDate(isoDate) {
  const parsed = new Date(`${isoDate}T12:00:00Z`)
  return Number.isNaN(parsed.getTime()) ? isoDate : frenchDateFormatter.format(parsed)
}

export function replaceBetweenMarkers(html, [start, end], replacement) {
  const startIndex = html.indexOf(start)
  const endIndex = html.indexOf(end)
  if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
    throw new Error(`Markers ${start} / ${end} not found in HTML template.`)
  }

  return `${html.slice(0, startIndex + start.length)}\n${replacement}\n${html.slice(endIndex)}`
}

export function seoPageForCandidate(candidate) {
  const profilePath = candidateProfilePath(candidate)
  return seoPages.find((page) => page.relatedLinks.some((link) => link.href === profilePath)) ?? null
}

export function sortedCandidates() {
  return [...candidates2027].sort((a, b) => a.priority - b.priority)
}

export function runningCandidates() {
  return sortedCandidates().filter((candidate) => candidate.status !== 'not_running')
}

export function buildOrganizationSchema() {
  return {
    '@type': 'Organization',
    name: siteName,
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: buildAbsoluteAssetUrl(SITE_LOGO_PATH) },
    image: buildAbsoluteAssetUrl(SITE_SOCIAL_IMAGE_PATH),
  }
}

export function buildWebsiteSchema() {
  return {
    '@type': 'WebSite',
    name: siteName,
    url: SITE_URL,
    inLanguage: 'fr-FR',
    image: buildAbsoluteAssetUrl(SITE_SOCIAL_IMAGE_PATH),
    publisher: {
      '@type': 'Organization',
      name: siteName,
      logo: { '@type': 'ImageObject', url: buildAbsoluteAssetUrl(SITE_LOGO_PATH) },
    },
  }
}

export function buildWebpageSchema({ title, description, url, dateModified, type = 'WebPage' }) {
  return {
    '@type': type,
    name: title,
    description,
    url,
    inLanguage: 'fr-FR',
    ...(dateModified ? { dateModified } : {}),
    primaryImageOfPage: { '@type': 'ImageObject', url: buildAbsoluteAssetUrl(SITE_SOCIAL_IMAGE_PATH) },
    isPartOf: { '@type': 'WebSite', name: siteName, url: SITE_URL },
  }
}

export function buildBreadcrumbSchema(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: buildAbsoluteUrl(item.path),
    })),
  }
}

export function renderHeadBlock({
  title,
  description,
  canonicalPath,
  schemaGraph,
  ogType = 'website',
  image = SITE_SOCIAL_IMAGE_PATH,
  robots = 'index,follow,max-image-preview:large',
}) {
  const canonicalUrl = buildAbsoluteUrl(canonicalPath)
  const socialImage = buildAbsoluteAssetUrl(image)
  const graph = { '@context': 'https://schema.org', '@graph': schemaGraph }

  return `  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="robots" content="${escapeHtml(robots)}" />
  <meta name="theme-color" content="#1a227f" />
  <meta property="og:type" content="${ogType}" />
  <meta property="og:site_name" content="${escapeHtml(siteName)}" />
  <meta property="og:locale" content="fr_FR" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
  <meta property="og:image" content="${escapeHtml(socialImage)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${escapeHtml(socialImage)}" />
  <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />
  <script type="application/ld+json">${JSON.stringify(graph)}</script>`
}

function renderNav() {
  return `<nav class="actions" aria-label="Liens principaux">
      <a class="action" href="/">Accueil</a>
      <a class="action" href="/quiz/">Quiz : quel candidat vous correspond ?</a>
      <a class="action" href="/candidats-presidentielle-2027/">Candidats</a>
      <a class="action" href="/polls/">Sondages</a>
      <a class="action" href="/primaire-gauche-presidentielle-2027/">Primaires</a>
      <a class="action" href="/presidentielle-2027/">Guide 2027</a>
      <a class="action" href="/sources/">Sources</a>
    </nav>`
}

function renderUpdatedLine(isoDate) {
  return `<p class="meta">Mis à jour le <time datetime="${escapeHtml(isoDate)}">${escapeHtml(formatFrenchDate(isoDate))}</time> · Premier tour le ${escapeHtml(formatFrenchDate(electionCalendar.firstRound))}, second tour le ${escapeHtml(formatFrenchDate(electionCalendar.secondRound))}.</p>`
}

export function renderCandidateTable(candidates = sortedCandidates()) {
  const groups = STATUS_ORDER.map((status) => ({
    status,
    label: statusGroupLabel(status),
    entries: candidates.filter((candidate) => candidate.status === status),
  })).filter((group) => group.entries.length > 0)

  return groups
    .map(
      (group) => `<section class="candidate-group">
      <h3>${escapeHtml(group.label)} (${group.entries.length})</h3>
      <table class="candidate-table">
        <thead>
          <tr><th scope="col">Candidat</th><th scope="col">Parti</th><th scope="col">Statut</th><th scope="col">Dernier jalon</th></tr>
        </thead>
        <tbody>
          ${group.entries
            .map((candidate) => {
              const milestone = latestMilestone(candidate)
              return `<tr>
            <td><a href="${escapeHtml(candidateProfilePath(candidate))}">${escapeHtml(candidate.name)}</a></td>
            <td>${escapeHtml(candidate.party)}</td>
            <td>${escapeHtml(candidate.statusLabel)}</td>
            <td>${
              milestone
                ? `<time datetime="${escapeHtml(milestone.date)}">${escapeHtml(formatFrenchDate(milestone.date))}</time> - ${escapeHtml(milestone.title)}`
                : '-'
            }</td>
          </tr>`
            })
            .join('')}
        </tbody>
      </table>
    </section>`,
    )
    .join('\n')
}

function renderSourceLink(source) {
  return `<a href="${escapeHtml(source.url)}" rel="noopener nofollow" target="_blank">${escapeHtml(source.label)}</a> (${escapeHtml(formatFrenchDate(source.date))})`
}

export function renderCandidateFallback(candidate) {
  const seo = buildCandidateSeo(candidate)
  const landingPage = seoPageForCandidate(candidate)
  const others = runningCandidates()
    .filter((entry) => entry.id !== candidate.id)
    .slice(0, 12)

  const photo = candidate.photoUrl
    ? `<figure class="portrait">
      <img src="${escapeHtml(candidate.photoUrl)}" alt="Portrait de ${escapeHtml(candidate.name)}" width="320" height="400" loading="eager" />
      ${
        candidate.photoCredit
          ? `<figcaption class="source">Photo : ${escapeHtml(candidate.photoCredit.author)}, <a href="${escapeHtml(candidate.photoCredit.sourceUrl)}" rel="noopener nofollow" target="_blank">Wikimedia Commons</a>, ${
              candidate.photoCredit.licenseUrl
                ? `<a href="${escapeHtml(candidate.photoCredit.licenseUrl)}" rel="noopener nofollow" target="_blank">${escapeHtml(candidate.photoCredit.license)}</a>`
                : escapeHtml(candidate.photoCredit.license)
            }</figcaption>`
          : ''
      }
    </figure>`
    : ''

  return `<main id="seo-root-fallback">
    <p class="eyebrow">${escapeHtml(statusGroupLabel(candidate.status))} · ${escapeHtml(candidate.party)}</p>
    <h1>${escapeHtml(seo.title)}</h1>
    ${photo}
    <p class="lead">${escapeHtml(candidate.summary)}</p>
    <p><strong>Statut :</strong> ${escapeHtml(candidate.statusLabel)} · <strong>Bloc :</strong> ${escapeHtml(candidate.bloc)} · <strong>Fonction :</strong> ${escapeHtml(candidate.currentRole)}</p>
    ${renderUpdatedLine(candidate.dataLastUpdated ?? CANDIDATE_DATA_LAST_UPDATED)}
    ${renderNav()}

    <section class="panel">
      <h2>Biographie</h2>
      ${candidate.biography.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}
      <p><strong>Thèmes :</strong> ${candidate.themes.map((theme) => escapeHtml(theme)).join(', ')}</p>
    </section>

    <section class="panel">
      <h2>Positions clés pour 2027</h2>
      <ul>
        ${candidate.keyPositions
          .map(
            (position) =>
              `<li><strong>${escapeHtml(position.topic)} :</strong> ${escapeHtml(position.summary)} <span class="source">Source : ${renderSourceLink(position.source)}</span></li>`,
          )
          .join('')}
      </ul>
    </section>

    <section class="panel">
      <h2>Chronologie</h2>
      <ul>
        ${[...candidate.timeline]
          .sort((a, b) => (a.date < b.date ? -1 : 1))
          .map(
            (event) =>
              `<li><time datetime="${escapeHtml(event.date)}">${escapeHtml(formatFrenchDate(event.date))}</time> - <strong>${escapeHtml(event.title)}</strong> : ${escapeHtml(event.description)}</li>`,
          )
          .join('')}
      </ul>
    </section>

    <section class="panel">
      <h2>Sources</h2>
      <ul>
        ${candidate.sources.map((source) => `<li>${renderSourceLink(source)}</li>`).join('')}
      </ul>
    </section>

    <section class="panel">
      <h2>Aller plus loin</h2>
      <div class="links">
        ${candidate.status !== 'not_running' ? `<a href="${escapeHtml(candidateFuturePath(candidate))}">La France dans 5 ans avec ${escapeHtml(candidate.name)} : projection ${FUTURE_HORIZON_YEAR}</a>` : ''}
        ${landingPage ? `<a href="/${escapeHtml(landingPage.slug)}/">${escapeHtml(accentizeFrenchCopy(landingPage.heroTitle))}</a>` : ''}
        <a href="/candidats-presidentielle-2027/">Liste complète des candidats 2027</a>
        <a href="/polls/">Sondages présidentielle 2027</a>
        <a href="/presidentielle-2027/">Guide présidentielle 2027</a>
      </div>
    </section>

    <section class="panel">
      <h2>Autres candidats suivis</h2>
      <div class="links">
        ${others
          .map((entry) => `<a href="${escapeHtml(candidateProfilePath(entry))}">${escapeHtml(entry.name)} (${escapeHtml(entry.party)})</a>`)
          .join('')}
      </div>
    </section>
  </main>`
}

function formatIndicatorValue(value, indicator) {
  return value.toLocaleString('fr-FR', { minimumFractionDigits: indicator.decimals, maximumFractionDigits: indicator.decimals })
}

function formatDelta(value, indicator) {
  const sign = value > 0 ? '+' : value < 0 ? '−' : '±'
  return `${sign}${formatIndicatorValue(Math.abs(value), indicator)}`
}

export function renderCandidateFutureFallback(candidate) {
  const model = buildCandidateFutureModel(candidate.id)
  const seo = buildCandidateFutureSeo(candidate)
  if (!model) {
    return `<main id="seo-root-fallback"><h1>${escapeHtml(seo.title)}</h1><p class="lead">${escapeHtml(candidate.name)} ne se présente pas à l’élection : pas de projection.</p>${renderNav()}</main>`
  }

  const firstName = candidate.name.split(' ')[0]
  const leverChips = Object.entries(model.levers.values)
    .filter(([, value]) => value !== 0)
    .map(([lever, value]) => `<li><strong>${escapeHtml(policyLevers[lever].label)} :</strong> ${escapeHtml(String(value))} ${escapeHtml(policyLevers[lever].unit)}</li>`)
    .join('')

  return `<main id="seo-root-fallback">
    <p class="eyebrow">La France dans 5 ans · projection ${FUTURE_HORIZON_YEAR}</p>
    <h1>${escapeHtml(seo.title)}</h1>
    <p class="lead">${escapeHtml(seo.description)}</p>
    <p class="meta">${model.improving} indicateurs en mieux que la tendance, ${model.worsening} en moins bien, ${model.neutral} sans écart significatif · modèle mis à jour le <time datetime="${FUTURE_MODEL_UPDATED_AT}">${escapeHtml(formatFrenchDate(FUTURE_MODEL_UPDATED_AT))}</time>.</p>
    ${renderNav()}

    <section class="panel">
      <h2>Hypothèses retenues</h2>
      <p>${escapeHtml(model.levers.notes)}</p>
      <ul>${leverChips}</ul>
    </section>

    ${model.categories
      .map(
        (entry) => `<section class="panel">
      <h2>${escapeHtml(entry.category.label)}</h2>
      <table class="candidate-table">
        <thead><tr><th scope="col">Indicateur</th><th scope="col">Aujourd’hui</th><th scope="col">Tendance ${FUTURE_HORIZON_YEAR}</th><th scope="col">Avec ${escapeHtml(firstName)} (intervalle 80 %)</th><th scope="col">Écart</th></tr></thead>
        <tbody>
          ${entry.projections
            .map(
              (projection) => `<tr>
            <td>${escapeHtml(projection.indicator.label)} <span class="source">(${escapeHtml(projection.indicator.unit)})</span></td>
            <td>${escapeHtml(formatIndicatorValue(projection.today, projection.indicator))} <span class="source">${escapeHtml(projection.indicator.baseline.label)}</span></td>
            <td>${escapeHtml(formatIndicatorValue(projection.trend, projection.indicator))}</td>
            <td><strong>${escapeHtml(formatIndicatorValue(projection.median, projection.indicator))}</strong> (${escapeHtml(formatIndicatorValue(projection.p10, projection.indicator))} à ${escapeHtml(formatIndicatorValue(projection.p90, projection.indicator))})</td>
            <td>${escapeHtml(formatDelta(projection.deltaVsTrend, projection.indicator))} · ${projection.improvesVsTrend === null ? 'comme la tendance' : projection.improvesVsTrend ? 'mieux' : 'moins bien'}</td>
          </tr>`,
            )
            .join('')}
        </tbody>
      </table>
    </section>`,
      )
      .join('\n')}

    <section class="panel">
      <h2>Méthode</h2>
      <p>Pour chaque indicateur, le modèle part de la dernière valeur publiée (Insee, Eurostat, Citepa, SSMSI, Cevipof…), prolonge la tendance sans changement de politique jusqu’en ${FUTURE_HORIZON_YEAR}, puis ajoute l’effet de chaque levier du programme (impulsion budgétaire, âge de la retraite, SMIC, fiscalité du patrimoine, transition écologique, justice pénale, immigration, institutions, rapport à l’Union européenne…) multiplié par une élasticité issue de la littérature économique. L’incertitude combine celle de la tendance et celle de chaque élasticité ; l’intervalle affiché couvre 80 % des cas. Le détail du calcul et les sources de chaque indicateur sont affichés sur la page interactive.</p>
      <div class="links">
        <a href="${escapeHtml(candidateProfilePath(candidate))}">Fiche de ${escapeHtml(candidate.name)}</a>
        <a href="/candidats-presidentielle-2027/">Tous les candidats</a>
        <a href="/quiz/">Quel candidat vous correspond ?</a>
      </div>
    </section>
  </main>`
}

export function buildCandidateFutureHead(candidate) {
  const seo = buildCandidateFutureSeo(candidate)
  const canonicalPath = candidateFuturePath(candidate)
  return renderHeadBlock({
    title: seo.title,
    description: seo.description,
    canonicalPath,
    ogType: 'article',
    schemaGraph: [
      buildOrganizationSchema(),
      buildWebsiteSchema(),
      buildWebpageSchema({ title: seo.title, description: seo.description, url: buildAbsoluteUrl(canonicalPath), dateModified: FUTURE_MODEL_UPDATED_AT, type: 'AnalysisNewsArticle' }),
      buildBreadcrumbSchema([
        { name: 'Accueil', path: '/' },
        { name: 'Candidats présidentielle 2027', path: '/candidats-presidentielle-2027/' },
        { name: candidate.name, path: candidateProfilePath(candidate) },
        { name: 'La France dans 5 ans', path: canonicalPath },
      ]),
    ],
  })
}

export function buildCandidateHead(candidate) {
  const seo = buildCandidateSeo(candidate)
  const canonicalPath = candidateProfilePath(candidate)
  return renderHeadBlock({
    title: seo.title,
    description: seo.description,
    canonicalPath,
    ogType: 'profile',
    schemaGraph: [
      buildOrganizationSchema(),
      buildWebsiteSchema(),
      ...buildCandidateJsonLd(candidate, buildAbsoluteUrl(canonicalPath)),
    ],
  })
}

export function renderHomeFallback() {
  const running = runningCandidates()
  const notRunning = sortedCandidates().filter((candidate) => candidate.status === 'not_running')
  const candidateLandingPages = seoPages.filter((page) => page.heroEyebrow === 'Candidat 2027')
  const faqPages = seoPages.filter((page) => page.heroEyebrow !== 'Candidat 2027')

  return `<main id="seo-root-fallback">
    <p class="eyebrow">Élection présidentielle 2027 · ${escapeHtml(formatFrenchDate(electionCalendar.firstRound))} et ${escapeHtml(formatFrenchDate(electionCalendar.secondRound))}</p>
    <h1>Présidentielle 2027 : candidats, sondages, intentions de vote et analyses</h1>
    <p class="lead">
      Suivez les ${running.length} candidatures déclarées, en primaire ou pressenties pour l’élection présidentielle des ${escapeHtml(formatFrenchDate(electionCalendar.firstRound))} et ${escapeHtml(formatFrenchDate(electionCalendar.secondRound))}, consultez les derniers sondages et retrouvez en un seul endroit les profils, positions sourcées, interventions, vidéos et tweets des candidats.
    </p>
    ${renderUpdatedLine(CANDIDATE_DATA_LAST_UPDATED)}
    ${renderNav()}

    <section class="panel">
      <h2>Quel candidat vous correspond ? Le quiz en 2 minutes</h2>
      <p>${quizQuestions.length} affirmations sur les grands clivages de 2027, comparées aux positions publiques de ${running.length} candidats : obtenez votre top 3, votre profil politique et un résultat à partager.</p>
      <p><a class="action" href="/quiz/">Faire le quiz</a></p>
    </section>

    <section class="panel">
      <h2>Les candidats à la présidentielle 2027</h2>
      <div class="links">
        ${running
          .map((candidate) => `<a href="${escapeHtml(candidateProfilePath(candidate))}">${escapeHtml(candidate.name)} · ${escapeHtml(candidate.party)}</a>`)
          .join('')}
      </div>
      ${
        notRunning.length > 0
          ? `<p>Ne se présentent pas : ${notRunning
              .map((candidate) => `<a href="${escapeHtml(candidateProfilePath(candidate))}">${escapeHtml(candidate.name)}</a>`)
              .join(', ')}.</p>`
          : ''
      }
    </section>

    <section class="panel">
      <h2>Questions fréquentes sur 2027</h2>
      <div class="links">
        ${faqPages
          .map((page) => `<a href="/${escapeHtml(page.slug)}/">${escapeHtml(accentizeFrenchCopy(page.heroTitle))}</a>`)
          .join('')}
      </div>
    </section>

    <section class="panel">
      <h2>Analyses par candidat</h2>
      <div class="links">
        ${candidateLandingPages
          .map((page) => `<a href="/${escapeHtml(page.slug)}/">${escapeHtml(accentizeFrenchCopy(page.heroTitle))}</a>`)
          .join('')}
      </div>
    </section>

    <section class="panel">
      <h2>Ce que vous trouverez sur le site</h2>
      <ul>
        <li>Une fiche sourcée par candidat : statut, positions, chronologie, interventions, vidéos et tweets.</li>
        <li>Les intentions de vote et la comparaison des instituts de sondage.</li>
        <li>Des réponses claires aux questions clés : dates, règles, primaires, éligibilité.</li>
        <li>Toutes les sources et la méthodologie, page par page.</li>
      </ul>
    </section>
  </main>`
}

function formatPercent(value) {
  return Number.isInteger(value) ? `${value}` : String(value).replace('.', ',')
}

function fieldworkLabel(poll) {
  return poll.fieldworkStart === poll.fieldworkEnd
    ? formatFrenchDate(poll.fieldworkEnd)
    : `${formatFrenchDate(poll.fieldworkStart)} – ${formatFrenchDate(poll.fieldworkEnd)}`
}

export function renderPollSnapshotTables() {
  const studies = pollsSnapshot.firstRound.studies.slice(0, 4)
  const firstRoundTables = studies
    .map((study) => {
      const scenario = study.scenarios[0]
      return `<section class="poll-study">
      <h3>${escapeHtml(study.pollster)} · terrain ${escapeHtml(fieldworkLabel(study))}${study.sampleSize ? ` · ${study.sampleSize.toLocaleString('fr-FR')} personnes` : ''}</h3>
      <table class="candidate-table">
        <thead><tr><th scope="col">Candidat</th><th scope="col">Intentions de vote (1er tour)</th></tr></thead>
        <tbody>
          ${scenario.scores
            .map(
              (score) =>
                `<tr><td>${escapeHtml(score.candidateName)}</td><td>${escapeHtml(formatPercent(score.score))} %</td></tr>`,
            )
            .join('')}
        </tbody>
      </table>
      <p class="source">${study.scenarios.length > 1 ? `${study.scenarios.length} scénarios testés, scénario principal affiché. ` : ''}<a href="${escapeHtml(study.sourceUrl)}" rel="noopener nofollow" target="_blank">Source de l’enquête</a></p>
    </section>`
    })
    .join('\n')

  const secondRoundTable = pollsSnapshot.secondRound.matchups.length
    ? `<section class="poll-study">
      <h3>Second tour : duels testés face à Marine Le Pen</h3>
      <table class="candidate-table">
        <thead><tr><th scope="col">Duel</th><th scope="col">Dernier sondage</th><th scope="col">Résultat</th></tr></thead>
        <tbody>
          ${pollsSnapshot.secondRound.matchups
            .map((matchup) => {
              const poll = matchup.polls[0]
              return `<tr>
              <td>${escapeHtml(matchup.label)}</td>
              <td>${escapeHtml(poll.pollster)}, ${escapeHtml(fieldworkLabel(poll))}</td>
              <td>${poll.scores.map((score) => `${escapeHtml(score.candidateName)} ${escapeHtml(formatPercent(score.score))} %`).join(' – ')}</td>
            </tr>`
            })
            .join('')}
        </tbody>
      </table>
    </section>`
    : ''

  return `<p class="meta">${pollsSnapshot.firstRound.studyCount} enquêtes de premier tour compilées · dernier terrain le ${escapeHtml(formatFrenchDate(pollsSnapshot.firstRound.latestFieldworkEnd))} · données consolidées le ${escapeHtml(formatFrenchDate(pollsSnapshot.generatedAt))} (source : <a href="${escapeHtml(pollsSnapshot.source.url)}" rel="noopener nofollow" target="_blank">${escapeHtml(pollsSnapshot.source.label)}</a> et notices des instituts).</p>
    ${firstRoundTables}
    ${secondRoundTable}`
}

export function renderPollsFallback() {
  const running = runningCandidates()
  return `<main id="seo-root-fallback">
    <p class="eyebrow">Sondages 2027</p>
    <h1>Sondage présidentielle 2027 : intentions de vote, classement et instituts</h1>
    <p class="lead">${escapeHtml(pollsRouteSeo.description)}</p>
    ${renderUpdatedLine(pollsSnapshot.generatedAt)}
    ${renderNav()}

    <section class="panel">
      <h2>Les derniers sondages publiés</h2>
      ${renderPollSnapshotTables()}
    </section>

    <section class="panel">
      <h2>Ce que compare cette page</h2>
      <ul>
        <li>Les intentions de vote de premier tour, institut par institut (IFOP, Elabe, OpinionWay, Harris Interactive, Cluster17), avec la date de terrain et la taille de l’échantillon.</li>
        <li>Les scénarios testés : avec ou sans Marine Le Pen, Édouard Philippe face à Gabriel Attal, vainqueur de la primaire socialiste face à Jean-Luc Mélenchon.</li>
        <li>L’évolution dans le temps de chaque candidat et les hypothèses de second tour.</li>
      </ul>
      <p>Les chiffres sont chargés en direct depuis notre base de données ; activez JavaScript pour afficher les graphiques interactifs.</p>
    </section>

    <section class="panel">
      <h2>Candidats suivis dans les sondages</h2>
      <div class="links">
        ${running
          .map((candidate) => `<a href="${escapeHtml(candidateProfilePath(candidate))}">${escapeHtml(candidate.name)}</a>`)
          .join('')}
      </div>
    </section>

    <section class="panel">
      <h2>Pour bien lire un sondage</h2>
      <div class="links">
        <a href="/sondage-presidentielle-2027/">Comment lire les sondages 2027</a>
        <a href="/simulateur-presidentielle-2027/">Comparer les scénarios</a>
        <a href="/candidats-presidentielle-2027/">Liste des candidats</a>
      </div>
    </section>
  </main>`
}

export function renderSourcesFallback() {
  return `<main id="seo-root-fallback">
    <p class="eyebrow">Méthodologie</p>
    <h1>Sources et méthodologie</h1>
    <p class="lead">${escapeHtml(sourcesRouteSeo.description)}</p>
    ${renderUpdatedLine(CANDIDATE_DATA_LAST_UPDATED)}
    ${renderNav()}

    <section class="panel">
      <h2>Comment les données sont construites</h2>
      <ul>
        <li>Profils candidats : chaque position, chaque date de chronologie et chaque affirmation renvoie à une source datée (presse nationale, sites institutionnels, sites officiels des partis, Wikipédia).</li>
        <li>Sondages : instituts membres de la commission des sondages, avec date de terrain, échantillon et scénario testé.</li>
        <li>Interventions et vidéos : chaînes officielles et médias audiovisuels, via les API YouTube et Media Cloud.</li>
        <li>Tweets : comptes X vérifiés des candidats.</li>
      </ul>
    </section>

    <section class="panel">
      <h2>Sources institutionnelles de référence</h2>
      <ul>
        <li><a href="${escapeHtml(electionCalendar.source.url)}" rel="noopener" target="_blank">${escapeHtml(electionCalendar.source.label)}</a> : dates officielles des deux tours (décret du ${escapeHtml(formatFrenchDate(electionCalendar.decree))}).</li>
        <li>Conseil constitutionnel : liste officielle des candidats et contrôle des parrainages.</li>
        <li>Assemblée nationale, Sénat, Parlement européen : mandats et fonctions des candidats.</li>
      </ul>
    </section>

    <section class="panel">
      <h2>Explorer</h2>
      <div class="links">
        <a href="/candidats-presidentielle-2027/">Liste des candidats</a>
        <a href="/polls/">Sondages</a>
        <a href="/presidentielle-2027/">Guide 2027</a>
      </div>
    </section>
  </main>`
}

export function renderQuizFallback() {
  return `<main id="seo-root-fallback">
    <p class="eyebrow">Quiz présidentielle 2027 · 2 minutes</p>
    <h1>Quiz présidentielle 2027 : quel candidat vous correspond ?</h1>
    <p class="lead">${escapeHtml(quizRouteSeo.description)}</p>
    ${renderUpdatedLine(QUIZ_UPDATED_AT)}
    ${renderNav()}

    <section class="panel">
      <h2>Comment ça marche</h2>
      <ul>
        <li>${quizQuestions.length} affirmations sur les clivages de la campagne : immigration, retraites, énergie, fiscalité, Europe, sécurité, institutions, budget, salaires, laïcité, défense, écologie, services publics.</li>
        <li>Quatre réponses possibles (${quizAnswerOptions.map((option) => escapeHtml(option.label.toLowerCase())).join(', ')}) ou « sans avis ».</li>
        <li>Vos réponses sont comparées aux positions publiques de ${runningCandidates().length} candidats déclarés ou en primaire, documentées dans leurs fiches.</li>
        <li>Vous obtenez votre top 3, un profil politique (avec un peu d’humour), le détail question par question face au podium et un lien de partage. Aucune réponse individuelle n’est enregistrée, seules des statistiques anonymes agrégées.</li>
        <li>La page affiche aussi les candidats le plus souvent arrivés en tête chez les participants et la répartition des réponses pour chaque affirmation.</li>
      </ul>
      <p><a class="action" href="/quiz/#quiz">Lancer le quiz (JavaScript requis)</a></p>
    </section>

    <section class="panel">
      <h2>Les ${quizQuestions.length} affirmations</h2>
      <ol>
        ${quizQuestions.map((question) => `<li><strong>${escapeHtml(question.theme)} :</strong> ${escapeHtml(question.statement)}</li>`).join('')}
      </ol>
    </section>

    <section class="panel">
      <h2>Les candidats comparés</h2>
      <div class="links">
        ${runningCandidates()
          .map((candidate) => `<a href="${escapeHtml(candidateProfilePath(candidate))}">${escapeHtml(candidate.name)} (${escapeHtml(candidate.party)})</a>`)
          .join('')}
      </div>
    </section>
  </main>`
}

export function renderQuizResultFallback(candidate) {
  return `<main id="seo-root-fallback">
    <p class="eyebrow">Résultat du quiz présidentielle 2027</p>
    <h1>Mon candidat le plus compatible pour 2027 : ${escapeHtml(candidate.name)}</h1>
    <p class="lead">Ce lien partage le résultat d’un internaute au quiz « Quel candidat vous correspond ? ». ${escapeHtml(candidate.name)} (${escapeHtml(candidate.party)}) est le candidat le plus proche de ses réponses. Faites le test à votre tour : ${quizQuestions.length} affirmations, 2 minutes, aucune inscription.</p>
    ${renderNav()}
    <section class="panel">
      <div class="links">
        <a class="action" href="/quiz/#quiz">Faire le quiz</a>
        <a class="action" href="${escapeHtml(candidateProfilePath(candidate))}">Voir la fiche de ${escapeHtml(candidate.name)}</a>
        <a class="action" href="/candidats-presidentielle-2027/">Tous les candidats</a>
      </div>
    </section>
  </main>`
}

export function buildQuizResultHead(candidate) {
  const path = `/quiz/resultat/${candidate.id}/`
  const title = `Mon match présidentielle 2027 : ${candidate.name} - Quiz « Quel candidat vous correspond ? »`
  const description = `Résultat du quiz présidentielle 2027 : ${candidate.name} (${candidate.party}) est le candidat le plus proche de mes idées. Faites le test en 2 minutes et comparez.`
  return renderHeadBlock({
    title,
    description,
    canonicalPath: path,
    image: `/quiz/cards/${candidate.id}.jpg`,
    robots: 'noindex,follow',
    schemaGraph: [buildOrganizationSchema(), buildWebsiteSchema(), buildWebpageSchema({ title, description, url: buildAbsoluteUrl(path) })],
  })
}

export function buildAppRouteHead(routeSeo, { dateModified, image }) {
  return renderHeadBlock({
    title: routeSeo.title,
    description: routeSeo.description,
    canonicalPath: routeSeo.path,
    ...(image ? { image } : {}),
    schemaGraph: [
      buildOrganizationSchema(),
      buildWebsiteSchema(),
      buildWebpageSchema({
        title: routeSeo.title,
        description: routeSeo.description,
        url: buildAbsoluteUrl(routeSeo.path),
        dateModified,
      }),
      buildBreadcrumbSchema([
        { name: 'Accueil', path: '/' },
        { name: routeSeo.title, path: routeSeo.path },
      ]),
    ],
  })
}
