import type { CandidateSource, CandidateStatus } from '../../../data/candidateTypes'

export const candidateStatusBadgeStyles: Record<CandidateStatus, string> = {
  declared: 'bg-emerald-500 text-white border border-emerald-400/50',
  declared_primary: 'bg-teal-600 text-white border border-teal-500/50',
  intent: 'bg-sky-600 text-white border border-sky-500/50',
  conditional: 'bg-amber-500 text-white border border-amber-400/50',
}

function normalizePartyName(party: string): string {
  return party
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

export function getCandidatePartyGradientClasses(party: string): string {
  const normalizedParty = normalizePartyName(party)

  if (normalizedParty.includes('rassemblement national')) {
    return 'from-sky-600 via-blue-700 to-indigo-900'
  }

  if (normalizedParty.includes('renaissance')) {
    return 'from-amber-300 via-orange-400 to-blue-500'
  }

  if (normalizedParty.includes('horizons')) {
    return 'from-cyan-400 via-sky-600 to-indigo-700'
  }

  if (normalizedParty.includes('republicains')) {
    return 'from-blue-500 via-indigo-600 to-blue-900'
  }

  if (normalizedParty.includes('france insoumise')) {
    return 'from-red-500 via-orange-500 to-amber-400'
  }

  if (
    normalizedParty.includes('place publique') ||
    normalizedParty.includes('populaires') ||
    normalizedParty.includes('lutte ouvriere')
  ) {
    return 'from-rose-500 via-red-500 to-orange-500'
  }

  if (
    normalizedParty.includes('ecologistes') ||
    normalizedParty.includes('generation ecologie')
  ) {
    return 'from-emerald-400 via-green-500 to-lime-500'
  }

  if (normalizedParty.includes('debout')) {
    return 'from-blue-600 via-slate-800 to-red-500'
  }

  return 'from-slate-300 via-slate-200 to-slate-400 dark:from-slate-700 dark:via-slate-600 dark:to-slate-800'
}

export function getCandidatePartyAccentColor(party: string): string {
  const normalizedParty = normalizePartyName(party)

  if (normalizedParty.includes('rassemblement national')) {
    return '#2563eb'
  }

  if (normalizedParty.includes('renaissance')) {
    return '#f59e0b'
  }

  if (normalizedParty.includes('horizons')) {
    return '#0891b2'
  }

  if (normalizedParty.includes('republicains')) {
    return '#1d4ed8'
  }

  if (normalizedParty.includes('france insoumise')) {
    return '#ef4444'
  }

  if (
    normalizedParty.includes('place publique') ||
    normalizedParty.includes('populaires') ||
    normalizedParty.includes('lutte ouvriere')
  ) {
    return '#f43f5e'
  }

  if (
    normalizedParty.includes('ecologistes') ||
    normalizedParty.includes('generation ecologie')
  ) {
    return '#10b981'
  }

  if (normalizedParty.includes('debout')) {
    return '#475569'
  }

  return '#64748b'
}

export function getCandidateInitials(fullName: string): string {
  return fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
}

function parseDateLike(date: string): Date | null {
  if (!date) {
    return null
  }

  const normalizedDate = date.trim()
  if (!normalizedDate) {
    return null
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(normalizedDate)) {
    const parsedDate = new Date(`${normalizedDate}T12:00:00Z`)
    return Number.isNaN(parsedDate.getTime()) ? null : parsedDate
  }

  const parsedDate = new Date(normalizedDate)
  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate
}

export function formatFrenchDate(date: string): string {
  const parsedDate = parseDateLike(date)

  if (parsedDate === null) {
    return 'Date indisponible'
  }

  return parsedDate.toLocaleDateString('fr-FR')
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
