import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { Candidate, CandidateSource, CandidateStatus } from '../data/candidates'
import { getCandidateByIdFromDatabase } from '../services/candidateRepository'

const statusBadgeStyles: Record<CandidateStatus, string> = {
  declared: 'bg-emerald-500 text-white border border-emerald-400/50',
  declared_primary: 'bg-teal-600 text-white border border-teal-500/50',
  intent: 'bg-sky-600 text-white border border-sky-500/50',
  conditional: 'bg-amber-500 text-white border border-amber-400/50',
}

function getInitials(fullName: string): string {
  return fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
}

function formatDate(date: string): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString('fr-FR')
}

function sourceKey(source: CandidateSource, index: number): string {
  return `${source.label}-${source.date}-${source.url}-${index}`
}

export default function Profile() {
  const { candidateId } = useParams<{ candidateId: string }>()
  const [candidate, setCandidate] = useState<Candidate | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    const loadCandidate = async () => {
      setIsLoading(true)
      setLoadError(null)

      if (!candidateId) {
        setCandidate(null)
        setLoadError('Aucun identifiant candidat fourni dans l URL.')
        setIsLoading(false)
        return
      }

      try {
        const dbCandidate = await getCandidateByIdFromDatabase(candidateId)
        if (!active) {
          return
        }

        if (dbCandidate === null) {
          setCandidate(null)
          setLoadError('Candidat introuvable en base de donnees.')
          return
        }

        setCandidate(dbCandidate)
      } catch (error) {
        if (!active) {
          return
        }
        setCandidate(null)
        setLoadError('Impossible de charger ce profil depuis Firestore.')
        console.error('Failed to load candidate profile', error)
      } finally {
        if (active) {
          setIsLoading(false)
        }
      }
    }

    void loadCandidate()

    return () => {
      active = false
    }
  }, [candidateId])

  const timeline = useMemo(() => {
    if (!candidate) {
      return []
    }

    return [...candidate.timeline].sort((first, second) => first.date.localeCompare(second.date))
  }, [candidate])

  if (isLoading) {
    return (
      <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen">
        <header className="sticky top-0 z-50 bg-white/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-primary/10 px-4 py-3">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-primary">
              <span className="material-symbols-outlined">arrow_back</span>
              Retour
            </Link>
            <h1 className="font-bold">Profil candidat</h1>
            <div className="w-14" />
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8 space-y-5">
          <div className="h-32 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
          <div className="h-24 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
          <div className="h-40 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
        </main>
      </div>
    )
  }

  if (loadError || candidate === null) {
    return (
      <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen">
        <header className="sticky top-0 z-50 bg-white/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-primary/10 px-4 py-3">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-primary">
              <span className="material-symbols-outlined">arrow_back</span>
              Retour
            </Link>
            <h1 className="font-bold">Profil candidat</h1>
            <div className="w-14" />
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-10">
          <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700 text-sm">
            {loadError ?? 'Candidat indisponible.'}
          </div>
          <div className="mt-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold"
            >
              <span className="material-symbols-outlined text-base">home</span>
              Retour a l accueil
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen">
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-primary/10 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-primary">
            <span className="material-symbols-outlined">arrow_back</span>
            Retour
          </Link>
          <h1 className="font-bold text-center">Profil candidat</h1>
          <Link to="/compare" className="text-slate-600 hover:text-primary flex items-center gap-1 text-sm">
            <span className="material-symbols-outlined text-base">compare_arrows</span>
            Comparer
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pb-24 space-y-7 pt-6">
        <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-5 sm:items-center">
            {candidate.photoUrl ? (
              <img
                src={candidate.photoUrl}
                alt={`Photo Wikipedia de ${candidate.name}`}
                className="h-20 w-20 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                loading="lazy"
              />
            ) : (
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-slate-800 to-slate-700 text-white text-2xl font-bold flex items-center justify-center border border-white/20">
                {getInitials(candidate.name)}
              </div>
            )}

            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-bold leading-tight">{candidate.name}</h2>
                <span
                  className={`text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider ${statusBadgeStyles[candidate.status]}`}
                >
                  {candidate.statusLabel}
                </span>
              </div>
              <p className="text-sm text-slate-500">
                {candidate.party} - {candidate.bloc}
              </p>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{candidate.currentRole}</p>
              <p className="text-[11px] text-slate-400">Photo: Wikipedia / Wikimedia Commons</p>
            </div>
          </div>

          <p className="mt-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{candidate.summary}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {candidate.themes.map((theme) => (
              <span
                key={`${candidate.id}-${theme}`}
                className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded font-semibold uppercase"
              >
                {theme}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">person</span>
            Biographie
          </h3>
          <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {candidate.biography.map((paragraph, index) => (
              <li key={`${candidate.id}-bio-${index}`} className="flex gap-2">
                <span className="text-primary">•</span>
                <span>{paragraph}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">fact_check</span>
            Positions documentees
          </h3>

          <div className="space-y-4">
            {candidate.keyPositions.length === 0 && (
              <p className="text-sm text-slate-500">Aucune position detaillee disponible.</p>
            )}

            {candidate.keyPositions.map((position, index) => (
              <article
                key={`${candidate.id}-position-${index}`}
                className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-slate-50 dark:bg-slate-900/40"
              >
                <h4 className="font-semibold text-slate-900 dark:text-slate-100">{position.topic}</h4>
                <p className="text-sm mt-2 text-slate-700 dark:text-slate-300">{position.summary}</p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <a
                    href={position.source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary text-xs font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">menu_book</span>
                    {position.source.label}
                  </a>
                  <span className="text-[11px] text-slate-400">{formatDate(position.source.date)}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">timeline</span>
            Chronologie
          </h3>

          <div className="space-y-4">
            {timeline.length === 0 && <p className="text-sm text-slate-500">Aucun evenement documente.</p>}

            {timeline.map((event, index) => (
              <article
                key={`${candidate.id}-timeline-${index}`}
                className="relative pl-4 border-l-2 border-slate-200 dark:border-slate-700"
              >
                <div className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-primary" />
                <p className="text-xs uppercase tracking-wider text-primary font-bold">{formatDate(event.date)}</p>
                <h4 className="font-semibold mt-1 text-slate-900 dark:text-slate-100">{event.title}</h4>
                <p className="text-sm mt-1 text-slate-700 dark:text-slate-300">{event.description}</p>
                <a
                  href={event.source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs text-slate-500 hover:text-primary"
                >
                  <span className="material-symbols-outlined text-sm">link</span>
                  {event.source.label}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">library_books</span>
            Sources principales
          </h3>

          <ul className="space-y-3">
            {candidate.sources.map((source, index) => (
              <li key={sourceKey(source, index)} className="flex items-center justify-between gap-3">
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-primary font-semibold hover:underline"
                >
                  {source.label}
                </a>
                <span className="text-[11px] text-slate-400">{formatDate(source.date)}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}
