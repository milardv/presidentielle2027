export type CandidateStatus = 'declared' | 'declared_primary' | 'intent' | 'conditional'

export interface CandidateSource {
  label: string
  url: string
  date: string
}

export interface CandidatePosition {
  topic: string
  summary: string
  source: CandidateSource
}

export interface CandidateTimelineEvent {
  date: string
  title: string
  description: string
  source: CandidateSource
}

export interface CandidateThemeHighlight {
  theme: string
  analysis: string
  source: CandidateSource
}

export interface CandidateNetworkRelation {
  actor: string
  role: string
  relation: string
  source: CandidateSource
}

export interface CandidateParcoursStep {
  period: string
  role: string
  institution: string
  summary: string
  source: CandidateSource
}

export interface CandidateStyleSignal {
  axis: string
  description: string
  source: CandidateSource
}

export interface Candidate {
  id: string
  name: string
  photoUrl: string
  bloc: string
  party: string
  status: CandidateStatus
  statusLabel: string
  summary: string
  themes: string[]
  priority: number
  currentRole: string
  biography: string[]
  keyPositions: CandidatePosition[]
  timeline: CandidateTimelineEvent[]
  themeHighlights?: CandidateThemeHighlight[]
  network?: CandidateNetworkRelation[]
  parcours?: CandidateParcoursStep[]
  style?: CandidateStyleSignal[]
  sources: CandidateSource[]
  dataLastUpdated?: string
}
