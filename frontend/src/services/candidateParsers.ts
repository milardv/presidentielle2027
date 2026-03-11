import type {
  Candidate,
  CandidateIntervention,
  CandidateNetworkRelation,
  CandidateNetworkTone,
  CandidateParcoursStep,
  CandidatePosition,
  CandidateSource,
  CandidateStatus,
  CandidateStyleSignal,
  CandidateThemeHighlight,
  CandidateTimelineEvent,
} from '../data/candidateTypes'
import { decodeHtmlEntities } from '../utils/htmlEntities'

const validStatuses: CandidateStatus[] = ['declared', 'declared_primary', 'intent', 'conditional']
const validNetworkTones: CandidateNetworkTone[] = ['ally', 'institution', 'rival']

function isValidStatus(value: unknown): value is CandidateStatus {
  return typeof value === 'string' && validStatuses.includes(value as CandidateStatus)
}

function isValidNetworkTone(value: unknown): value is CandidateNetworkTone {
  return typeof value === 'string' && validNetworkTones.includes(value as CandidateNetworkTone)
}

function parseSource(value: unknown): CandidateSource | null {
  if (typeof value !== 'object' || value === null) {
    return null
  }

  const maybeSource = value as Partial<CandidateSource>
  if (
    typeof maybeSource.label !== 'string' ||
    typeof maybeSource.url !== 'string' ||
    typeof maybeSource.date !== 'string'
  ) {
    return null
  }

  return {
    label: maybeSource.label,
    url: maybeSource.url,
    date: maybeSource.date,
  }
}

function parseSources(value: unknown): CandidateSource[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map((source) => parseSource(source))
    .filter((source): source is CandidateSource => source !== null)
}

function parseStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value.filter((entry): entry is string => typeof entry === 'string')
}

function parseKeyPositions(value: unknown): CandidatePosition[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map((position) => {
      if (typeof position !== 'object' || position === null) {
        return null
      }

      const maybePosition = position as {
        topic?: unknown
        summary?: unknown
        source?: unknown
      }
      const source = parseSource(maybePosition.source)
      if (
        typeof maybePosition.topic !== 'string' ||
        typeof maybePosition.summary !== 'string' ||
        source === null
      ) {
        return null
      }

      return {
        topic: maybePosition.topic,
        summary: maybePosition.summary,
        source,
      }
    })
    .filter((position): position is CandidatePosition => position !== null)
}

function parseTimeline(value: unknown): CandidateTimelineEvent[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map((event) => {
      if (typeof event !== 'object' || event === null) {
        return null
      }

      const maybeEvent = event as {
        date?: unknown
        title?: unknown
        description?: unknown
        source?: unknown
      }
      const source = parseSource(maybeEvent.source)
      if (
        typeof maybeEvent.date !== 'string' ||
        typeof maybeEvent.title !== 'string' ||
        typeof maybeEvent.description !== 'string' ||
        source === null
      ) {
        return null
      }

      return {
        date: maybeEvent.date,
        title: maybeEvent.title,
        description: maybeEvent.description,
        source,
      }
    })
    .filter((event): event is CandidateTimelineEvent => event !== null)
}

function parseThemeHighlights(value: unknown): CandidateThemeHighlight[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map((entry) => {
      if (typeof entry !== 'object' || entry === null) {
        return null
      }

      const maybeEntry = entry as {
        theme?: unknown
        analysis?: unknown
        source?: unknown
      }
      const source = parseSource(maybeEntry.source)
      if (
        typeof maybeEntry.theme !== 'string' ||
        typeof maybeEntry.analysis !== 'string' ||
        source === null
      ) {
        return null
      }

      return {
        theme: maybeEntry.theme,
        analysis: maybeEntry.analysis,
        source,
      }
    })
    .filter((entry): entry is CandidateThemeHighlight => entry !== null)
}

function parseNetwork(value: unknown): CandidateNetworkRelation[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map((entry) => {
      if (typeof entry !== 'object' || entry === null) {
        return null
      }

      const maybeEntry = entry as {
        actor?: unknown
        role?: unknown
        relation?: unknown
        tone?: unknown
        imageUrl?: unknown
        source?: unknown
      }
      const source = parseSource(maybeEntry.source)
      if (
        typeof maybeEntry.actor !== 'string' ||
        typeof maybeEntry.role !== 'string' ||
        typeof maybeEntry.relation !== 'string' ||
        source === null
      ) {
        return null
      }

      return {
        actor: maybeEntry.actor,
        role: maybeEntry.role,
        relation: maybeEntry.relation,
        ...(isValidNetworkTone(maybeEntry.tone) ? { tone: maybeEntry.tone } : {}),
        ...(typeof maybeEntry.imageUrl === 'string' && maybeEntry.imageUrl.length > 0
          ? { imageUrl: maybeEntry.imageUrl }
          : {}),
        source,
      }
    })
    .filter((entry): entry is CandidateNetworkRelation => entry !== null)
}

function parseParcours(value: unknown): CandidateParcoursStep[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map((entry) => {
      if (typeof entry !== 'object' || entry === null) {
        return null
      }

      const maybeEntry = entry as {
        period?: unknown
        role?: unknown
        institution?: unknown
        summary?: unknown
        source?: unknown
      }
      const source = parseSource(maybeEntry.source)
      if (
        typeof maybeEntry.period !== 'string' ||
        typeof maybeEntry.role !== 'string' ||
        typeof maybeEntry.institution !== 'string' ||
        typeof maybeEntry.summary !== 'string' ||
        source === null
      ) {
        return null
      }

      return {
        period: maybeEntry.period,
        role: maybeEntry.role,
        institution: maybeEntry.institution,
        summary: maybeEntry.summary,
        source,
      }
    })
    .filter((entry): entry is CandidateParcoursStep => entry !== null)
}

function parseStyle(value: unknown): CandidateStyleSignal[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map((entry) => {
      if (typeof entry !== 'object' || entry === null) {
        return null
      }

      const maybeEntry = entry as {
        axis?: unknown
        description?: unknown
        source?: unknown
      }
      const source = parseSource(maybeEntry.source)
      if (
        typeof maybeEntry.axis !== 'string' ||
        typeof maybeEntry.description !== 'string' ||
        source === null
      ) {
        return null
      }

      return {
        axis: maybeEntry.axis,
        description: maybeEntry.description,
        source,
      }
    })
    .filter((entry): entry is CandidateStyleSignal => entry !== null)
}

function parseInterventions(value: unknown): CandidateIntervention[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map((entry) => {
      if (typeof entry !== 'object' || entry === null) {
        return null
      }

      const maybeEntry = entry as {
        id?: unknown
        type?: unknown
        title?: unknown
        excerpt?: unknown
        context?: unknown
        source?: unknown
      }

      const source = parseSource(maybeEntry.source)
      if (
        typeof maybeEntry.id !== 'string' ||
        (maybeEntry.type !== 'video' && maybeEntry.type !== 'quote' && maybeEntry.type !== 'post') ||
        typeof maybeEntry.title !== 'string' ||
        typeof maybeEntry.excerpt !== 'string' ||
        typeof maybeEntry.context !== 'string' ||
        source === null
      ) {
        return null
      }

      return {
        id: maybeEntry.id,
        type: maybeEntry.type,
        title: decodeHtmlEntities(maybeEntry.title),
        excerpt: decodeHtmlEntities(maybeEntry.excerpt),
        context: maybeEntry.context,
        source,
      }
    })
    .filter((entry): entry is CandidateIntervention => entry !== null)
}

export function parseCandidate(id: string, data: Record<string, unknown>): Candidate | null {
  if (
    typeof data.name !== 'string' ||
    typeof data.bloc !== 'string' ||
    typeof data.party !== 'string' ||
    !isValidStatus(data.status) ||
    typeof data.statusLabel !== 'string' ||
    typeof data.summary !== 'string' ||
    typeof data.priority !== 'number'
  ) {
    return null
  }

  const themes = parseStringArray(data.themes)
  const biography = parseStringArray(data.biography)

  const sources = parseSources(data.sources)
  if (sources.length === 0) {
    return null
  }

  return {
    id,
    name: data.name,
    photoUrl: typeof data.photoUrl === 'string' ? data.photoUrl : '',
    xUsername: typeof data.xUsername === 'string' ? data.xUsername : undefined,
    bloc: data.bloc,
    party: data.party,
    status: data.status,
    statusLabel: data.statusLabel,
    summary: data.summary,
    themes: themes.length > 0 ? themes : ['Non classé'],
    priority: data.priority,
    currentRole: typeof data.currentRole === 'string' ? data.currentRole : 'Rôle non renseigné',
    birthDate: typeof data.birthDate === 'string' ? data.birthDate : undefined,
    birthYear: typeof data.birthYear === 'number' ? data.birthYear : undefined,
    biography: biography.length > 0 ? biography : [data.summary],
    keyPositions: parseKeyPositions(data.keyPositions),
    timeline: parseTimeline(data.timeline),
    themeHighlights: parseThemeHighlights(data.themeHighlights),
    network: parseNetwork(data.network),
    parcours: parseParcours(data.parcours),
    style: parseStyle(data.style),
    interventions: parseInterventions(data.interventions),
    sources,
    dataLastUpdated: typeof data.dataLastUpdated === 'string' ? data.dataLastUpdated : undefined,
  }
}
