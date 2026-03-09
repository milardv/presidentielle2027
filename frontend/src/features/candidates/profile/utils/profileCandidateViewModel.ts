import type {
  Candidate,
  CandidateNetworkRelation,
  CandidateParcoursStep,
  CandidateStyleSignal,
  CandidateThemeHighlight,
  CandidateTimelineEvent,
} from '../../../../data/candidateTypes'
import { formatFrenchDate } from '../../shared/candidateUi'

export interface ProfileCandidateViewModel {
  timeline: CandidateTimelineEvent[]
  themeHighlights: CandidateThemeHighlight[]
  networkEntries: CandidateNetworkRelation[]
  parcoursEntries: CandidateParcoursStep[]
  styleEntries: CandidateStyleSignal[]
}

function buildThemeHighlights(candidate: Candidate): CandidateThemeHighlight[] {
  if ((candidate.themeHighlights?.length ?? 0) > 0) {
    return candidate.themeHighlights ?? []
  }

  return candidate.themes.map((theme, index) => {
    const fallbackSource = candidate.keyPositions[index]?.source ?? candidate.sources[0]
    return {
      theme,
      analysis: `Thème central de la campagne ${candidate.name}.`,
      source: fallbackSource,
    }
  })
}

function buildNetworkEntries(candidate: Candidate): CandidateNetworkRelation[] {
  if ((candidate.network?.length ?? 0) > 0) {
    return candidate.network ?? []
  }

  const fallbackSource = candidate.sources[0]
  return [
    {
      actor: candidate.party,
      role: 'Parti politique',
      relation: 'Base organisationnelle principale de sa candidature.',
      source: fallbackSource,
    },
    {
      actor: candidate.currentRole,
      role: 'Position institutionnelle',
      relation: 'Point d’appui institutionnel de sa trajectoire politique.',
      source: fallbackSource,
    },
  ]
}

function buildParcoursEntries(
  candidate: Candidate,
  timeline: CandidateTimelineEvent[],
): CandidateParcoursStep[] {
  if ((candidate.parcours?.length ?? 0) > 0) {
    return candidate.parcours ?? []
  }

  return timeline.map((event) => ({
    period: formatFrenchDate(event.date),
    role: event.title,
    institution: 'Parcours politique',
    summary: event.description,
    source: event.source,
  }))
}

function buildStyleEntries(candidate: Candidate): CandidateStyleSignal[] {
  if ((candidate.style?.length ?? 0) > 0) {
    return candidate.style ?? []
  }

  return [
    {
      axis: 'Registre',
      description: `Style politique prédominant de ${candidate.name} à documenter plus finement.`,
      source: candidate.sources[0],
    },
  ]
}

export function buildProfileCandidateViewModel(candidate: Candidate): ProfileCandidateViewModel {
  const timeline = [...candidate.timeline].sort((first, second) => first.date.localeCompare(second.date))

  return {
    timeline,
    themeHighlights: buildThemeHighlights(candidate),
    networkEntries: buildNetworkEntries(candidate),
    parcoursEntries: buildParcoursEntries(candidate, timeline),
    styleEntries: buildStyleEntries(candidate),
  }
}
