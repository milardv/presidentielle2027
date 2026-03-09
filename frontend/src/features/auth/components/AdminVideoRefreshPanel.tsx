import { useEffect, useMemo, useState } from 'react'
import { LoaderCircle, RefreshCw, ShieldCheck, Video } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Candidate } from '../../../data/candidateTypes'
import { refreshCandidateVideos } from '../../../services/adminVideoSyncService'
import { getCandidatesFromDatabase } from '../../../services/candidateRepository'

interface AdminVideoRefreshPanelProps {
  adminEmail: string
}

export function AdminVideoRefreshPanel({ adminEmail }: AdminVideoRefreshPanelProps) {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [refreshMessage, setRefreshMessage] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    void getCandidatesFromDatabase()
      .then((nextCandidates) => {
        if (!active) {
          return
        }

        setCandidates(nextCandidates)
        setSelectedCandidateId((currentSelectedCandidateId) => currentSelectedCandidateId || nextCandidates[0]?.id || '')
        setIsLoading(false)
      })
      .catch((error) => {
        if (!active) {
          return
        }

        console.error('Failed to load candidates for admin refresh panel', error)
        setLoadError('Impossible de charger la liste des candidats.')
        setIsLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  const selectedCandidate = useMemo(
    () => candidates.find((candidate) => candidate.id === selectedCandidateId) ?? null,
    [candidates, selectedCandidateId],
  )

  const handleRefresh = async () => {
    if (!selectedCandidate) {
      return
    }

    setIsRefreshing(true)
    setLoadError(null)
    setRefreshMessage(null)

    try {
      const result = await refreshCandidateVideos(selectedCandidate, adminEmail)
      setRefreshMessage(
        `${result.importedCount} video${result.importedCount > 1 ? 's' : ''} importee${result.importedCount > 1 ? 's' : ''} pour ${result.candidateName}.`,
      )
    } catch (error) {
      console.error('Failed to refresh candidate videos from admin panel', error)
      setLoadError(error instanceof Error ? error.message : 'Impossible de rafraichir les videos.')
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <section className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/94 shadow-[0_20px_50px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900/92">
      <div className="border-b border-slate-200/80 bg-slate-50/70 px-5 py-4 dark:border-slate-800 dark:bg-slate-950/40 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Admin</p>
            <h2 className="mt-1 text-xl font-black tracking-tight text-slate-950 dark:text-white">
              Rafraichissement videos candidat
            </h2>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          Lance un refresh YouTube cible pour un candidat, puis verifie la page videos juste apres l’import.
        </p>
      </div>

      <div className="grid gap-4 p-5 sm:p-6">
        <label className="grid gap-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Candidat</span>
          <select
            value={selectedCandidateId}
            onChange={(event) => setSelectedCandidateId(event.target.value)}
            disabled={isLoading || isRefreshing || candidates.length === 0}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:bg-slate-100 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-200 dark:disabled:bg-slate-900"
          >
            {candidates.map((candidate) => (
              <option key={candidate.id} value={candidate.id}>
                {candidate.name}
              </option>
            ))}
          </select>
        </label>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => {
              void handleRefresh()
            }}
            disabled={!selectedCandidate || isLoading || isRefreshing}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-100 dark:disabled:bg-slate-700"
          >
            {isRefreshing ? <LoaderCircle className="h-[18px] w-[18px] animate-spin" /> : <RefreshCw className="h-[18px] w-[18px]" />}
            {isRefreshing ? 'Rafraichissement...' : 'Rafraichir les videos'}
          </button>

          {selectedCandidate ? (
            <Link
              to={`/candidats/${selectedCandidate.id}/videos`}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-200"
            >
              <Video className="h-[18px] w-[18px]" />
              Voir la page videos
            </Link>
          ) : null}
        </div>

        {refreshMessage ? (
          <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-300">
            {refreshMessage}
          </p>
        ) : null}

        {loadError ? (
          <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-300">
            {loadError}
          </p>
        ) : null}
      </div>
    </section>
  )
}
