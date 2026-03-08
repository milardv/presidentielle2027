import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type {
  Candidate,
  CandidateNetworkRelation,
  CandidateParcoursStep,
  CandidateSource,
  CandidateStyleSignal,
  CandidateStatus,
  CandidateThemeHighlight,
} from '../data/candidates'
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

  const themeHighlights = useMemo((): CandidateThemeHighlight[] => {
    if (!candidate) {
      return []
    }

    if ((candidate.themeHighlights?.length ?? 0) > 0) {
      return candidate.themeHighlights ?? []
    }

    return candidate.themes.map((theme, index) => {
      const fallbackSource = candidate.keyPositions[index]?.source ?? candidate.sources[0]
      return {
        theme,
        analysis: `Theme central de la campagne ${candidate.name}.`,
        source: fallbackSource,
      }
    })
  }, [candidate])

  const networkEntries = useMemo((): CandidateNetworkRelation[] => {
    if (!candidate) {
      return []
    }

    if ((candidate.network?.length ?? 0) > 0) {
      return candidate.network ?? []
    }

    const fallbackSource = candidate.sources[0]
    return [
      {
        actor: candidate.party,
        role: 'Parti politique',
        relation: 'Base organisationnelle principale de sa candidature.',
        source: fallbackSource,
      },
      {
        actor: candidate.currentRole,
        role: 'Position institutionnelle',
        relation: 'Point d appui institutionnel de sa trajectoire politique.',
        source: fallbackSource,
      },
    ]
  }, [candidate])

  const parcoursEntries = useMemo((): CandidateParcoursStep[] => {
    if (!candidate) {
      return []
    }

    if ((candidate.parcours?.length ?? 0) > 0) {
      return candidate.parcours ?? []
    }

    return timeline.map((event) => ({
      period: formatDate(event.date),
      role: event.title,
      institution: 'Parcours politique',
      summary: event.description,
      source: event.source,
    }))
  }, [candidate, timeline])

  const styleEntries = useMemo((): CandidateStyleSignal[] => {
    if (!candidate) {
      return []
    }

    if ((candidate.style?.length ?? 0) > 0) {
      return candidate.style ?? []
    }

    const fallbackSource = candidate.sources[0]
    return [
      {
        axis: 'Registre',
        description: `Style politique predominant de ${candidate.name} a documenter plus finement.`,
        source: fallbackSource,
      },
    ]
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
      <div className="bg-primary/10 border-b border-primary/20 px-4 py-2 text-center">
        <p className="text-xs font-medium text-primary uppercase tracking-wider italic">
          <span className="material-symbols-outlined text-xs align-middle mr-1">info</span>
          Outil informatif - donnees issues de sources publiques
        </p>
      </div>

      <header className="sticky top-0 z-50 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3">
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

      <main className="max-w-4xl mx-auto pb-24">
        <section className="flex p-6">
          <div className="flex w-full flex-col gap-6 items-center">
            <div className="flex gap-4 flex-col items-center">
              <div className="relative">
                {candidate.photoUrl ? (
                  <img
                    src={candidate.photoUrl}
                    alt={`Photo Wikipedia de ${candidate.name}`}
                    className="aspect-square rounded-full h-32 w-32 border-4 border-white dark:border-slate-800 shadow-xl object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="aspect-square rounded-full h-32 w-32 border-4 border-white dark:border-slate-800 shadow-xl bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center text-white text-3xl font-bold">
                    {getInitials(candidate.name)}
                  </div>
                )}
                <div className="absolute bottom-0 right-0 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full p-1 flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-white text-[16px] font-bold">database</span>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold leading-tight tracking-tight text-center">{candidate.name}</h2>
                <div className="flex items-center gap-2 mt-1 flex-wrap justify-center">
                  <p className="text-slate-500 dark:text-slate-400 text-base font-medium text-center">{candidate.currentRole}</p>
                  <span
                    className={`text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider ${statusBadgeStyles[candidate.status]}`}
                  >
                    {candidate.statusLabel}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 text-center">
                  {candidate.party} - {candidate.bloc} - Photo Wikipedia / Wikimedia Commons
                </p>
              </div>
            </div>
          </div>
        </section>

        <nav className="sticky top-[72px] bg-white dark:bg-background-dark border-b border-slate-200 dark:border-slate-800 z-40">
          <div className="flex px-4 overflow-x-auto no-scrollbar">
            <a
              className="flex flex-col items-center justify-center border-b-2 border-primary text-primary pb-3 pt-4 px-4 whitespace-nowrap"
              href="#resume"
            >
              <p className="text-sm font-bold">Resume</p>
            </a>
            <a
              className="flex flex-col items-center justify-center border-b-2 border-transparent text-slate-500 dark:text-slate-400 pb-3 pt-4 px-4 whitespace-nowrap"
              href="#themes"
            >
              <p className="text-sm font-medium">Themes</p>
            </a>
            <a
              className="flex flex-col items-center justify-center border-b-2 border-transparent text-slate-500 dark:text-slate-400 pb-3 pt-4 px-4 whitespace-nowrap"
              href="#reseau"
            >
              <p className="text-sm font-medium">Reseau</p>
            </a>
            <a
              className="flex flex-col items-center justify-center border-b-2 border-transparent text-slate-500 dark:text-slate-400 pb-3 pt-4 px-4 whitespace-nowrap"
              href="#parcours"
            >
              <p className="text-sm font-medium">Parcours</p>
            </a>
            <a
              className="flex flex-col items-center justify-center border-b-2 border-transparent text-slate-500 dark:text-slate-400 pb-3 pt-4 px-4 whitespace-nowrap"
              href="#style"
            >
              <p className="text-sm font-medium">Style</p>
            </a>
            <a
              className="flex flex-col items-center justify-center border-b-2 border-transparent text-slate-500 dark:text-slate-400 pb-3 pt-4 px-4 whitespace-nowrap"
              href="#sources"
            >
              <p className="text-sm font-medium">Sources</p>
            </a>
          </div>
        </nav>

        <div className="p-4 space-y-8">
          <section id="resume" className="scroll-mt-40">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">person</span>
              Biographie et resume politique
            </h3>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm leading-relaxed text-slate-700 dark:text-slate-300">
              <p className="mb-4">{candidate.summary}</p>
              <ul className="space-y-2 mb-4 text-sm">
                {candidate.biography.map((paragraph, index) => (
                  <li key={`${candidate.id}-bio-${index}`} className="flex gap-2">
                    <span className="text-primary">-</span>
                    <span>{paragraph}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {candidate.themes.map((theme) => (
                  <span
                    key={`${candidate.id}-tag-${theme}`}
                    className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs font-semibold"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="scroll-mt-40">
            <h3 className="text-xl font-bold mb-5 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">timeline</span>
              Evolution des positions
            </h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/50 before:via-primary/20 before:to-transparent">
              {timeline.map((event, index) => (
                <div key={`${candidate.id}-evolution-${index}`} className="relative flex items-start group">
                  <div className="absolute left-0 mt-1.5 size-10 rounded-full border-4 border-background-light dark:border-background-dark bg-primary flex items-center justify-center z-10">
                    <span className="material-symbols-outlined text-white text-sm">check</span>
                  </div>
                  <div className="ml-14 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm w-full">
                    <div className="flex justify-between items-start mb-2 gap-3">
                      <span className="text-xs font-bold text-primary uppercase tracking-wider">{formatDate(event.date)}</span>
                      <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500">Documente</span>
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1">{event.title}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{event.description}</p>
                    <div className="border-l-4 border-primary/30 pl-3 py-1 bg-primary/5 rounded-r-lg">
                      <div className="flex justify-between items-center mt-1 gap-3">
                        <a
                          className="text-[10px] text-primary hover:underline flex items-center gap-1"
                          href={event.source.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span className="material-symbols-outlined text-[12px]">link</span>
                          Source : {event.source.label}
                        </a>
                        <span className="text-[10px] text-slate-400 italic">{formatDate(event.source.date)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="themes" className="scroll-mt-40">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">flare</span>
              Themes de campagne
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {themeHighlights.map((entry, index) => (
                <article
                  key={`${candidate.id}-theme-${index}`}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900"
                >
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100">{entry.theme}</h4>
                  <p className="text-sm mt-2 text-slate-700 dark:text-slate-300">{entry.analysis}</p>
                  <div className="mt-3 flex justify-between gap-3 items-center">
                    <a
                      href={entry.source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary text-xs font-semibold hover:underline"
                    >
                      {entry.source.label}
                    </a>
                    <span className="text-[11px] text-slate-400">{formatDate(entry.source.date)}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="reseau" className="scroll-mt-40">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">group</span>
              Reseau politique
            </h3>
            <div className="space-y-4">
              {networkEntries.map((entry, index) => (
                <article
                  key={`${candidate.id}-network-${index}`}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100">{entry.actor}</h4>
                      <p className="text-xs uppercase tracking-wider text-primary font-bold mt-1">{entry.role}</p>
                    </div>
                    <span className="text-[11px] text-slate-400">{formatDate(entry.source.date)}</span>
                  </div>
                  <p className="text-sm mt-2 text-slate-700 dark:text-slate-300">{entry.relation}</p>
                  <a
                    href={entry.source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    <span className="material-symbols-outlined text-sm">link</span>
                    Source : {entry.source.label}
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section id="parcours" className="scroll-mt-40">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">route</span>
              Parcours
            </h3>
            <div className="space-y-4">
              {parcoursEntries.map((step, index) => (
                <article
                  key={`${candidate.id}-parcours-${index}`}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">{step.period}</span>
                    <span className="text-[11px] text-slate-400">{step.institution}</span>
                  </div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 mt-1">{step.role}</h4>
                  <p className="text-sm mt-2 text-slate-700 dark:text-slate-300">{step.summary}</p>
                  <a
                    href={step.source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    <span className="material-symbols-outlined text-sm">link</span>
                    Source : {step.source.label}
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section id="style" className="scroll-mt-40">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">stylus_note</span>
              Style politique
            </h3>
            <div className="space-y-4">
              {styleEntries.map((entry, index) => (
                <article
                  key={`${candidate.id}-style-${index}`}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">{entry.axis}</h4>
                    <span className="text-[11px] text-slate-400">{formatDate(entry.source.date)}</span>
                  </div>
                  <p className="text-sm mt-2 text-slate-700 dark:text-slate-300">{entry.description}</p>
                  <a
                    href={entry.source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    <span className="material-symbols-outlined text-sm">link</span>
                    Source : {entry.source.label}
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section id="sources" className="scroll-mt-40">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
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
        </div>
      </main>
    </div>
  )
}
