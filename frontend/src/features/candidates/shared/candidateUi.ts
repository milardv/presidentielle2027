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

export function getAgeFromBirthDate(birthDate: string): number | null {
  const birth = new Date(`${birthDate}T12:00:00Z`)
  if (Number.isNaN(birth.getTime())) {
    return null
  }

  const now = new Date()
  let age = now.getUTCFullYear() - birth.getUTCFullYear()
  const currentMonth = now.getUTCMonth()
  const currentDay = now.getUTCDate()
  const birthMonth = birth.getUTCMonth()
  const birthDay = birth.getUTCDate()

  if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
    age -= 1
  }

  return age
}

export function sourceKey(source: CandidateSource, index: number): string {
  return `${source.label}-${source.date}-${source.url}-${index}`
}
