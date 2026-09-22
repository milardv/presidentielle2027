import type { Candidate, CandidateSource } from '../data/candidateTypes'
import { knownCandidates2027 } from '../data/candidates'

const staticCandidatesById = new Map(knownCandidates2027.map((candidate) => [candidate.id, candidate]))

function isStaticNewer(staticCandidate: Candidate, dbCandidate: Candidate): boolean {
  return (staticCandidate.dataLastUpdated ?? '') > (dbCandidate.dataLastUpdated ?? '')
}

function mergeSources(primary: CandidateSource[], secondary: CandidateSource[]): CandidateSource[] {
  const seen = new Set(primary.map((source) => source.url))
  return [...primary, ...secondary.filter((source) => !seen.has(source.url))]
}

// Firestore holds the enrichments (interventions, network, parcours...), the static
// module holds the editorial core. The most recently updated side wins on the core.
export function mergeCandidateWithStatic(dbCandidate: Candidate): Candidate {
  const staticCandidate = staticCandidatesById.get(dbCandidate.id)
  if (!staticCandidate || !isStaticNewer(staticCandidate, dbCandidate)) {
    return dbCandidate
  }

  return {
    ...dbCandidate,
    name: staticCandidate.name,
    bloc: staticCandidate.bloc,
    party: staticCandidate.party,
    status: staticCandidate.status,
    statusLabel: staticCandidate.statusLabel,
    summary: staticCandidate.summary,
    themes: staticCandidate.themes,
    priority: staticCandidate.priority,
    currentRole: staticCandidate.currentRole,
    biography: staticCandidate.biography,
    keyPositions: staticCandidate.keyPositions,
    timeline: staticCandidate.timeline,
    sources: mergeSources(staticCandidate.sources, dbCandidate.sources),
    photoUrl: dbCandidate.photoUrl || staticCandidate.photoUrl,
    dataLastUpdated: staticCandidate.dataLastUpdated,
  }
}

export function mergeCandidateListWithStatic(dbCandidates: Candidate[]): Candidate[] {
  const merged = new Map<string, Candidate>()

  for (const dbCandidate of dbCandidates) {
    merged.set(dbCandidate.id, mergeCandidateWithStatic(dbCandidate))
  }

  for (const staticCandidate of knownCandidates2027) {
    if (!merged.has(staticCandidate.id)) {
      merged.set(staticCandidate.id, staticCandidate)
    }
  }

  return [...merged.values()].sort((a, b) => a.priority - b.priority)
}

export function getStaticCandidate(candidateId: string): Candidate | null {
  return staticCandidatesById.get(candidateId) ?? null
}
