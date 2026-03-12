import type { CandidateSource } from '../data/candidateTypes'
import { INSTITUTIONAL_SOURCES, METHODOLOGY_SOURCES, X_VERIFICATION_SOURCES } from '../data/sourceCatalog'
import type { VotingIntentPoll } from '../data/pollTypes'
import type { SourceInventory, SourceInventoryEntry } from '../data/sourceInventoryTypes'
import { getCandidatesFromDatabase } from './candidateRepository'
import { getVotingIntentPollsFromDatabase } from './pollRepository'

interface SourceSeed {
  label: string
  url: string
  date?: string | null
  detail?: string
}

function normalizeUrl(url: string): string | null {
  try {
    const parsedUrl = new URL(url.trim())
    parsedUrl.hash = ''

    if (parsedUrl.pathname !== '/') {
      parsedUrl.pathname = parsedUrl.pathname.replace(/\/+$/, '')
    }

    return parsedUrl.toString()
  } catch {
    return null
  }
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

function isCandidateSourceLike(value: unknown): value is CandidateSource {
  if (!value || typeof value !== 'object') {
    return false
  }

  const candidateSource = value as Partial<CandidateSource>

  return (
    typeof candidateSource.label === 'string' &&
    typeof candidateSource.url === 'string' &&
    typeof candidateSource.date === 'string'
  )
}

function collectNestedCandidateSources(value: unknown, visited = new Set<object>()): SourceSeed[] {
  if (value === null || value === undefined) {
    return []
  }

  if (isCandidateSourceLike(value)) {
    return [
      {
        label: value.label,
        url: value.url,
        date: value.date,
      },
    ]
  }

  if (typeof value !== 'object') {
    return []
  }

  if (visited.has(value)) {
    return []
  }

  visited.add(value)

  if (Array.isArray(value)) {
    return value.flatMap((entry) => collectNestedCandidateSources(entry, visited))
  }

  return Object.values(value).flatMap((entry) => collectNestedCandidateSources(entry, visited))
}

function aggregateSources(sourceSeeds: SourceSeed[]): SourceInventoryEntry[] {
  const aggregatedSources = new Map<string, SourceInventoryEntry>()

  sourceSeeds.forEach((seed) => {
    const normalizedUrl = normalizeUrl(seed.url)
    if (!normalizedUrl || seed.label.trim().length === 0) {
      return
    }

    const existingSource = aggregatedSources.get(normalizedUrl)

    if (existingSource) {
      existingSource.referenceCount += 1

      if (seed.date && (!existingSource.latestDate || seed.date > existingSource.latestDate)) {
        existingSource.latestDate = seed.date
      }

      if (!existingSource.detail && seed.detail) {
        existingSource.detail = seed.detail
      }

      return
    }

    aggregatedSources.set(normalizedUrl, {
      label: seed.label.trim(),
      url: normalizedUrl,
      domain: extractDomain(normalizedUrl),
      referenceCount: 1,
      latestDate: seed.date?.trim() || null,
      detail: seed.detail?.trim() || undefined,
    })
  })

  return [...aggregatedSources.values()].sort((first, second) => {
    if (second.referenceCount !== first.referenceCount) {
      return second.referenceCount - first.referenceCount
    }

    if ((second.latestDate ?? '') !== (first.latestDate ?? '')) {
      return (second.latestDate ?? '').localeCompare(first.latestDate ?? '')
    }

    return first.label.localeCompare(second.label, 'fr')
  })
}

function buildPollSourceSeeds(polls: VotingIntentPoll[]): SourceSeed[] {
  return polls
    .filter((poll) => poll.sourceLabel.trim().length > 0 && poll.sourceUrl.trim().length > 0)
    .map((poll) => ({
      label: poll.sourceLabel,
      url: poll.sourceUrl,
      date: poll.fieldworkEnd,
      detail: `${poll.pollster} - terrain clos le ${poll.fieldworkEnd}`,
    }))
}

function getInventoryLastUpdated(candidateDates: string[], pollDates: string[]): string | null {
  return [...candidateDates, ...pollDates].reduce<string | null>((latestDate, currentDate) => {
    if (!currentDate) {
      return latestDate
    }

    if (latestDate === null || currentDate > latestDate) {
      return currentDate
    }

    return latestDate
  }, null)
}

function getUniqueUrlCount(sections: SourceInventoryEntry[][]): number {
  return new Set(sections.flat().map((entry) => entry.url)).size
}

function getUniqueDomainCount(sections: SourceInventoryEntry[][]): number {
  return new Set(sections.flat().map((entry) => entry.domain).filter(Boolean)).size
}

export async function getSourceInventory(): Promise<SourceInventory> {
  const [candidates, polls] = await Promise.all([
    getCandidatesFromDatabase(),
    getVotingIntentPollsFromDatabase(),
  ])

  const candidateSourceSeeds = candidates.flatMap((candidate) => collectNestedCandidateSources(candidate))
  const pollSourceSeeds = buildPollSourceSeeds(polls)

  const candidateSources = aggregateSources(candidateSourceSeeds)
  const pollSources = aggregateSources(pollSourceSeeds)

  const sections = [
    candidateSources,
    pollSources,
    METHODOLOGY_SOURCES,
    INSTITUTIONAL_SOURCES,
    X_VERIFICATION_SOURCES,
  ]

  return {
    candidateSources,
    pollSources,
    methodologySources: METHODOLOGY_SOURCES,
    institutionalSources: INSTITUTIONAL_SOURCES,
    xVerificationSources: X_VERIFICATION_SOURCES,
    totalUniqueSources: getUniqueUrlCount(sections),
    candidateReferenceCount: candidateSourceSeeds.length,
    pollStudyCount: polls.length,
    domainCount: getUniqueDomainCount(sections),
    lastUpdated: getInventoryLastUpdated(
      candidates.map((candidate) => candidate.dataLastUpdated ?? '').filter(Boolean),
      polls.map((poll) => poll.dataLastUpdated ?? '').filter(Boolean),
    ),
  }
}
