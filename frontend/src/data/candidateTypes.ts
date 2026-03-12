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

export type CandidateNetworkTone = 'ally' | 'institution' | 'rival'

export interface CandidateNetworkRelation {
  actor: string
  role: string
  relation: string
  tone?: CandidateNetworkTone
  imageUrl?: string
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

export interface CandidateParentBackground {
  relation: string
  profession: string
  source: CandidateSource
}

export interface CandidateChildhoodInterest {
  label: string
  source: CandidateSource
}

export type CandidateInterventionType = 'video' | 'quote' | 'post'

export interface CandidateIntervention {
  id: string
  type: CandidateInterventionType
  title: string
  excerpt: string
  context: string
  source: CandidateSource
}

export interface Candidate {
  id: string
  name: string
  photoUrl: string
  videoUrl?: string
  xUsername?: string
  bloc: string
  party: string
  status: CandidateStatus
  statusLabel: string
  summary: string
  themes: string[]
  priority: number
  currentRole: string
  birthDate?: string
  birthYear?: number
  biography: string[]
  parentBackground?: CandidateParentBackground[]
  childhoodCity?: string
  childhoodCitySource?: CandidateSource
  childhoodInterests?: CandidateChildhoodInterest[]
  keyPositions: CandidatePosition[]
  timeline: CandidateTimelineEvent[]
  themeHighlights?: CandidateThemeHighlight[]
  network?: CandidateNetworkRelation[]
  parcours?: CandidateParcoursStep[]
  style?: CandidateStyleSignal[]
  interventions?: CandidateIntervention[]
  sources: CandidateSource[]
  dataLastUpdated?: string
}
