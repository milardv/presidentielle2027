export interface SourceInventoryEntry {
  label: string
  url: string
  domain: string
  referenceCount: number
  latestDate?: string | null
  detail?: string
}

export interface SourceInventory {
  candidateSources: SourceInventoryEntry[]
  pollSources: SourceInventoryEntry[]
  methodologySources: SourceInventoryEntry[]
  institutionalSources: SourceInventoryEntry[]
  xVerificationSources: SourceInventoryEntry[]
  totalUniqueSources: number
  candidateReferenceCount: number
  pollStudyCount: number
  domainCount: number
  lastUpdated: string | null
}
