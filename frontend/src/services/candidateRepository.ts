import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  type DocumentData,
} from 'firebase/firestore'
import { db } from '../firebase'
import {
  candidateDataLastUpdated,
  knownCandidates2027,
  type Candidate,
  type CandidateNetworkRelation,
  type CandidateParcoursStep,
  type CandidatePosition,
  type CandidateSource,
  type CandidateStyleSignal,
  type CandidateStatus,
  type CandidateThemeHighlight,
  type CandidateTimelineEvent,
} from '../data/candidates'
import { candidateInsightsById } from '../data/candidateInsights'
import { candidateStyleById } from '../data/candidateStyle'

const CANDIDATES_COLLECTION = 'candidates_2027'

const validStatuses: CandidateStatus[] = ['declared', 'declared_primary', 'intent', 'conditional']

function isValidStatus(value: unknown): value is CandidateStatus {
  return typeof value === 'string' && validStatuses.includes(value as CandidateStatus)
}

function parseSources(value: unknown): CandidateSource[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map((source) => parseSource(source))
    .filter((source): source is CandidateSource => source !== null)
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

function parseCandidate(id: string, data: DocumentData): Candidate | null {
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

  const keyPositions = parseKeyPositions(data.keyPositions)
  const timeline = parseTimeline(data.timeline)
  const themeHighlights = parseThemeHighlights(data.themeHighlights)
  const network = parseNetwork(data.network)
  const parcours = parseParcours(data.parcours)
  const style = parseStyle(data.style)

  return {
    id,
    name: data.name,
    photoUrl: typeof data.photoUrl === 'string' ? data.photoUrl : '',
    bloc: data.bloc,
    party: data.party,
    status: data.status,
    statusLabel: data.statusLabel,
    summary: data.summary,
    themes: themes.length > 0 ? themes : ['Non classe'],
    priority: data.priority,
    currentRole: typeof data.currentRole === 'string' ? data.currentRole : 'Role non renseigne',
    biography: biography.length > 0 ? biography : [data.summary],
    keyPositions,
    timeline,
    themeHighlights,
    network,
    parcours,
    style,
    sources,
  }
}

export async function seedCandidatesIfEmpty(): Promise<void> {
  const collectionRef = collection(db, CANDIDATES_COLLECTION)
  const snapshot = await getDocs(collectionRef)
  if (!snapshot.empty) {
    return
  }

  await Promise.all(
    knownCandidates2027.map((candidate) => {
      const insights = candidateInsightsById[candidate.id]
      return setDoc(doc(db, CANDIDATES_COLLECTION, candidate.id), {
        ...candidate,
        themeHighlights: insights?.themeHighlights ?? [],
        network: insights?.network ?? [],
        parcours: insights?.parcours ?? [],
        style: candidateStyleById[candidate.id] ?? [],
        dataLastUpdated: candidateDataLastUpdated,
      })
    }),
  )
}

export async function getCandidatesFromDatabase(): Promise<Candidate[]> {
  const queryRef = query(collection(db, CANDIDATES_COLLECTION), orderBy('priority', 'asc'))
  const snapshot = await getDocs(queryRef)

  return snapshot.docs
    .map((entry) => parseCandidate(entry.id, entry.data()))
    .filter((candidate): candidate is Candidate => candidate !== null)
}

export async function getCandidateByIdFromDatabase(candidateId: string): Promise<Candidate | null> {
  const snapshot = await getDoc(doc(db, CANDIDATES_COLLECTION, candidateId))
  if (!snapshot.exists()) {
    return null
  }

  return parseCandidate(snapshot.id, snapshot.data())
}

export async function syncCandidateInsightsInDatabase(): Promise<void> {
  await Promise.all(
    knownCandidates2027.map((candidate) =>
      setDoc(
        doc(db, CANDIDATES_COLLECTION, candidate.id),
        {
          photoUrl: candidate.photoUrl,
          themeHighlights: candidateInsightsById[candidate.id]?.themeHighlights ?? [],
          network: candidateInsightsById[candidate.id]?.network ?? [],
          parcours: candidateInsightsById[candidate.id]?.parcours ?? [],
          style: candidateStyleById[candidate.id] ?? [],
          dataLastUpdated: candidateDataLastUpdated,
        },
        { merge: true },
      ),
    ),
  )
}
