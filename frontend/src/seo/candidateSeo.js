import { CANDIDATE_DATA_LAST_UPDATED } from '../data/candidates2027.js'
import { SITE_NAME, SITE_URL } from './seoPagesData.js'

export const STATUS_ORDER = ['declared', 'declared_primary', 'conditional', 'intent', 'not_running']

const STATUS_GROUP_LABELS = {
  declared: 'Candidats déclarés',
  declared_primary: 'Candidats à une primaire',
  conditional: 'Candidatures conditionnelles',
  intent: 'Candidatures pressenties',
  not_running: 'Ne se présentent pas',
}

export function statusGroupLabel(status) {
  return STATUS_GROUP_LABELS[status] ?? 'Autres'
}

export function latestMilestone(candidate) {
  const past = [...candidate.timeline]
    .filter((event) => event.date <= CANDIDATE_DATA_LAST_UPDATED)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
  return past[0] ?? null
}

export function candidateProfilePath(candidate) {
  return `/candidats/${candidate.id}/`
}

export function buildCandidateSeo(candidate) {
  const isRunning = candidate.status !== 'not_running'
  const title = isRunning
    ? `${candidate.name} 2027 : candidature, positions, parcours et sondages`
    : `${candidate.name} 2027 : rôle dans la campagne, positions et parcours`
  const description = `${candidate.name} (${candidate.party}) - ${candidate.summary}`.slice(0, 300)

  return {
    title,
    description,
    keywords: [
      `${candidate.name} 2027`,
      `${candidate.name} présidentielle 2027`,
      `${candidate.name} candidat 2027`,
      candidate.party,
    ],
  }
}

export function buildCandidateJsonLd(candidate, canonicalUrl) {
  const wikipediaUrls = candidate.sources
    .map((source) => source.url)
    .filter((url) => url.includes('wikipedia.org'))
  const seo = buildCandidateSeo(candidate)

  const person = {
    '@type': 'Person',
    name: candidate.name,
    jobTitle: candidate.currentRole,
    affiliation: { '@type': 'Organization', name: candidate.party },
    description: candidate.summary,
    url: canonicalUrl,
    ...(candidate.photoUrl ? { image: candidate.photoUrl } : {}),
    ...(wikipediaUrls.length > 0 ? { sameAs: wikipediaUrls } : {}),
  }

  return [
    {
      '@type': 'ProfilePage',
      name: seo.title,
      description: seo.description,
      url: canonicalUrl,
      inLanguage: 'fr-FR',
      dateModified: candidate.dataLastUpdated ?? CANDIDATE_DATA_LAST_UPDATED,
      mainEntity: person,
      isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Candidats présidentielle 2027',
          item: `${SITE_URL}/candidats-presidentielle-2027/`,
        },
        { '@type': 'ListItem', position: 3, name: candidate.name, item: canonicalUrl },
      ],
    },
  ]
}
