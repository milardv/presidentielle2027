import type { CandidateSource, CandidateStatus } from '../../../data/candidateTypes'

export const candidateStatusBadgeStyles: Record<CandidateStatus, string> = {
  declared: 'bg-emerald-500 text-white border border-emerald-400/50',
  declared_primary: 'bg-teal-600 text-white border border-teal-500/50',
  intent: 'bg-sky-600 text-white border border-sky-500/50',
  conditional: 'bg-amber-500 text-white border border-amber-400/50',
}

export function getCandidateInitials(fullName: string): string {
  return fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
}

export function formatFrenchDate(date: string): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString('fr-FR')
}

export function sourceKey(source: CandidateSource, index: number): string {
  return `${source.label}-${source.date}-${source.url}-${index}`
}
