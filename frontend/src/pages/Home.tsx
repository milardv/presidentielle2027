import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  candidateDataLastUpdated,
  type Candidate,
  type CandidateStatus,
} from '../data/candidates'
import {
  getCandidatesFromDatabase,
  seedCandidatesIfEmpty,
  syncCandidatePhotosInDatabase,
} from '../services/candidateRepository'

const statusBadgeStyles: Record<CandidateStatus, string> = {
  declared:
    'bg-emerald-500 text-white border border-emerald-400/50',
  declared_primary:
    'bg-teal-600 text-white border border-teal-500/50',
  intent:
    'bg-sky-600 text-white border border-sky-500/50',
  conditional:
    'bg-amber-500 text-white border border-amber-400/50',
}

function getInitials(fullName: string): string {
  return fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
}

function formatSourceDate(date: string): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString('fr-FR')
}

export default function Home() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [loadWarning, setLoadWarning] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    const loadCandidates = async () => {
      setLoadError(null)
      setLoadWarning(null)

      try {
        const dbCandidates = await getCandidatesFromDatabase()
        if (!active) {
          return
        }

        if (dbCandidates.length > 0) {
          if (dbCandidates.some((candidate) => candidate.photoUrl.trim().length === 0)) {
            try {
              await syncCandidatePhotosInDatabase()
              const refreshedCandidates = await getCandidatesFromDatabase()
              if (!active) {
                return
              }
              setCandidates(refreshedCandidates)
              setLoadWarning('Photos Wikipedia synchronisees en base de donnees.')
              return
            } catch (syncError) {
              if (!active) {
                return
              }
              setCandidates(dbCandidates)
              setLoadWarning(
                'Des photos Wikipedia manquent en base et la synchronisation a echoue (droits d ecriture requis).',
              )
              console.error('Failed to sync candidate photo URLs in Firestore', syncError)
              return
            }
          }

          setCandidates(dbCandidates)
          return
        }

        try {
          await seedCandidatesIfEmpty()
          const seededCandidates = await getCandidatesFromDatabase()
          if (!active) {
            return
          }
          setCandidates(seededCandidates)
          if (seededCandidates.length === 0) {
            setLoadWarning('Base vide: aucun document candidat trouve apres tentative de seed.')
          } else {
            setLoadWarning('Collection vide detectee: seed initial applique depuis les donnees locales.')
          }
        } catch (seedError) {
          if (!active) {
            return
          }
          setLoadWarning(
            'Base vide et seed impossible. Verifiez les regles Firestore (permissions d ecriture).',
          )
          console.error('Failed to seed candidates in Firestore', seedError)
        }
      } catch (readError) {
        if (!active) {
          return
        }
        setLoadError(
          'Impossible de lire Firestore. Verifiez les regles de lecture de la collection candidates_2027.',
        )
        console.error('Failed to load candidates from Firestore', readError)
      } finally {
        if (active) {
          setIsLoading(false)
        }
      }
    }

    void loadCandidates()

    return () => {
      active = false
    }
  }, [])

  const declaredCount = useMemo(
    () =>
      candidates.filter(
        (candidate) => candidate.status === 'declared' || candidate.status === 'declared_primary',
      ).length,
    [candidates],
  )
  const conditionalCount = useMemo(
    () => candidates.filter((candidate) => candidate.status === 'conditional').length,
    [candidates],
  )
  const defaultProfileRoute = candidates.length > 0 ? `/profile/${candidates[0].id}` : '/'
  const lastUpdateLabel = new Date(`${candidateDataLastUpdated}T12:00:00Z`).toLocaleDateString('fr-FR')

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen">
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-primary/10 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl">explore</span>
            <h1 className="text-xl font-extrabold tracking-tight text-primary">
              La Boussole <span className="text-slate-500">2027</span>
            </h1>
          </div>
          <Link
            to="/compare"
            className="bg-primary text-white px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-lg">compare_arrows</span>
            <span className="hidden sm:inline">Comparer</span>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-24">
        <section className="py-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Candidats connus - presidentielle 2027</h2>
              <p className="text-slate-500 text-sm mt-1">
                {candidates.length} profils documentes ({declaredCount} declarations publiques, {conditionalCount}{' '}
                candidatures conditionnelles).
              </p>
            </div>
            <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-3 py-1.5 rounded-lg text-xs font-bold border border-green-100 dark:border-green-900/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              MISE A JOUR DES DONNEES : {lastUpdateLabel}
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Cette liste est chargee depuis Firestore. Le seed local ne s execute qu en cas de base vide.
          </p>
        </section>

        {loadError && (
          <section className="py-6">
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 text-sm">{loadError}</div>
          </section>
        )}

        {loadWarning && (
          <section className="py-6">
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800 text-sm">
              {loadWarning}
            </div>
          </section>
        )}

        {isLoading && (
          <section className="py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={`loading-${index}`}
                className="h-72 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 animate-pulse"
              ></div>
            ))}
          </section>
        )}

        {!isLoading && !loadError && candidates.length === 0 && (
          <section className="py-6">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-sm text-slate-600 dark:text-slate-300">
              Aucun candidat trouve en base.
            </div>
          </section>
        )}

        {!isLoading && !loadError && candidates.length > 0 && (
          <section className="py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {candidates.map((candidate) => {
              const firstSource = candidate.sources[0]
              return (
                <article
                  key={candidate.id}
                  className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="relative h-44 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-700">
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      <span
                        className={`text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider ${statusBadgeStyles[candidate.status]}`}
                      >
                        {candidate.statusLabel}
                      </span>
                    </div>

                    {candidate.photoUrl ? (
                      <>
                        <img
                          src={candidate.photoUrl}
                          alt={`Photo Wikipedia de ${candidate.name}`}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/35" />
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-20 w-20 rounded-full bg-white/15 border border-white/30 backdrop-blur-sm flex items-center justify-center text-white text-2xl font-bold tracking-wider">
                          {getInitials(candidate.name)}
                        </div>
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <p className="text-white font-bold text-lg leading-tight">{candidate.name}</p>
                      <p className="text-white/80 text-xs font-medium italic">
                        {candidate.party} - {candidate.bloc}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 space-y-4">
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{candidate.summary}</p>

                    <div className="flex flex-wrap gap-1.5">
                      {candidate.themes.map((theme) => (
                        <span
                          key={`${candidate.id}-${theme}`}
                          className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded font-semibold uppercase"
                        >
                          {theme}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                      <a
                        href={firstSource.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-slate-500 hover:text-primary transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">menu_book</span>
                        <span className="text-[11px] font-medium">{firstSource.label}</span>
                      </a>

                      <Link
                        to={`/profile/${candidate.id}`}
                        className="text-primary text-sm font-bold flex items-center gap-1 group/link"
                      >
                        Consulter
                        <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">
                          arrow_forward
                        </span>
                      </Link>
                    </div>

                    <p className="text-[11px] text-slate-400">Source publiee le {formatSourceDate(firstSource.date)}</p>
                  </div>
                </article>
              )
            })}
          </section>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-4 pb-safe pt-2 flex items-center justify-around z-50 md:hidden">
        <Link to="/" className="flex flex-col items-center gap-1 text-primary py-1">
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-bold">Accueil</span>
        </Link>
        <Link to="/" className="flex flex-col items-center gap-1 text-slate-400 py-1">
          <span className="material-symbols-outlined">group</span>
          <span className="text-[10px] font-medium">Candidats</span>
        </Link>
        <Link to="/" className="flex flex-col items-center gap-1 text-slate-400 py-1">
          <span className="material-symbols-outlined">menu_book</span>
          <span className="text-[10px] font-medium">Programmes</span>
        </Link>
        <Link to="/" className="flex flex-col items-center gap-1 text-slate-400 py-1">
          <span className="material-symbols-outlined">newspaper</span>
          <span className="text-[10px] font-medium">Actualites</span>
        </Link>
        <Link to={defaultProfileRoute} className="flex flex-col items-center gap-1 text-slate-400 py-1">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-medium">Profil</span>
        </Link>
      </nav>

      <footer className="hidden md:block py-12 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-2xl">explore</span>
              <h3 className="text-lg font-extrabold tracking-tight text-primary">
                La Boussole <span className="text-slate-500">2027</span>
              </h3>
            </div>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
              Projet informatif fonde sur des declarations publiques de candidature et des sources ouvertes.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase text-slate-400">Navigation</h4>
              <ul className="text-sm space-y-2 font-medium">
                <li>
                  <Link to="/compare" className="hover:text-primary">
                    Comparateur
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-primary">
                    Candidats
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase text-slate-400">Ressources</h4>
              <ul className="text-sm space-y-2 font-medium">
                <li>
                  <Link to="/" className="hover:text-primary">
                    Methodologie
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-primary">
                    Sources
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
