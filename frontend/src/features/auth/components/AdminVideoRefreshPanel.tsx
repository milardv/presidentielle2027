import { useEffect, useMemo, useState } from 'react'
import { ChartSpline, FileText, LoaderCircle, Newspaper, RefreshCw, ShieldCheck, Video } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Candidate } from '../../../data/candidateTypes'
import {
  getCandidateMediaCounts,
  refreshCandidateMediaAttention,
  refreshCandidateGdelt,
  refreshCandidateVideos,
  type CandidateMediaCounts,
} from '../../../services/adminVideoSyncService'
import { getCandidatesFromDatabase } from '../../../services/candidateRepository'

interface AdminVideoRefreshPanelProps {
  adminEmail: string
}

export function AdminVideoRefreshPanel({ adminEmail }: AdminVideoRefreshPanelProps) {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [refreshingProvider, setRefreshingProvider] = useState<'youtube' | 'gdelt' | 'mediacloud' | null>(null)
  const [mediaCounts, setMediaCounts] = useState<CandidateMediaCounts>({ youtube: 0, gdelt: 0 })
  const [isCountsLoading, setIsCountsLoading] = useState<boolean>(false)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [refreshMessage, setRefreshMessage] = useState<string | null>(null)
  const hasMediaCloudKey = Boolean(import.meta.env.VITE_MEDIA_CLOUD_API_KEY?.trim())

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

  useEffect(() => {
    if (!selectedCandidateId) {
      setMediaCounts({ youtube: 0, gdelt: 0 })
      setIsCountsLoading(false)
      return
    }

    let active = true
    setIsCountsLoading(true)

    void getCandidateMediaCounts(selectedCandidateId)
      .then((counts) => {
        if (!active) {
          return
        }

        setMediaCounts(counts)
      })
      .catch((error) => {
        if (!active) {
          return
        }

        console.error('Failed to load candidate media counts', error)
        setMediaCounts({ youtube: 0, gdelt: 0 })
      })
      .finally(() => {
        if (active) {
          setIsCountsLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [selectedCandidateId])

  const handleRefreshVideos = async () => {
    if (!selectedCandidate) {
      return
    }

    setRefreshingProvider('youtube')
    setLoadError(null)
    setRefreshMessage(null)

    try {
      const result = await refreshCandidateVideos(selectedCandidate, adminEmail)
      const counts = await getCandidateMediaCounts(selectedCandidate.id)
      setMediaCounts(counts)
      setRefreshMessage(
        `${result.importedCount} video${result.importedCount > 1 ? 's' : ''} importee${result.importedCount > 1 ? 's' : ''} pour ${result.candidateName}.`,
      )
    } catch (error) {
      console.error('Failed to refresh candidate videos from admin panel', error)
      setLoadError(error instanceof Error ? error.message : 'Impossible de rafraichir les videos.')
    } finally {
      setRefreshingProvider(null)
    }
  }

  const handleRefreshGdelt = async () => {
    if (!selectedCandidate) {
      return
    }

    setRefreshingProvider('gdelt')
    setLoadError(null)
    setRefreshMessage(null)

    try {
      const result = await refreshCandidateGdelt(selectedCandidate, adminEmail)
      const counts = await getCandidateMediaCounts(selectedCandidate.id)
      setMediaCounts(counts)
      setRefreshMessage(
        `${result.importedCount} entree${result.importedCount > 1 ? 's' : ''} GDELT importee${result.importedCount > 1 ? 's' : ''} pour ${result.candidateName}.`,
      )
    } catch (error) {
      console.error('Failed to refresh candidate GDELT entries from admin panel', error)
      setLoadError(error instanceof Error ? error.message : 'Impossible de rafraichir les donnees GDELT.')
    } finally {
      setRefreshingProvider(null)
    }
  }

  const handleRefreshMediaAttention = async () => {
    if (!selectedCandidate) {
      return
    }

    setRefreshingProvider('mediacloud')
    setLoadError(null)
    setRefreshMessage(null)

    try {
      const result = await refreshCandidateMediaAttention(selectedCandidate, adminEmail)
      setRefreshMessage(
        `${result.pointCount} point${result.pointCount > 1 ? 's' : ''} Media Cloud mis a jour pour ${result.candidateName}.`,
      )
    } catch (error) {
      console.error('Failed to refresh candidate Media Cloud attention from admin panel', error)
      setLoadError(error instanceof Error ? error.message : 'Impossible de rafraichir la courbe Media Cloud.')
    } finally {
      setRefreshingProvider(null)
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
              Rafraichissement medias candidat
            </h2>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          Lance un refresh cible pour un candidat: YouTube pour les videos, GDELT pour les articles, Media Cloud pour la courbe d’attention.
        </p>
      </div>

      <div className="grid gap-4 p-5 sm:p-6">
        <label className="grid gap-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Candidat</span>
          <select
            value={selectedCandidateId}
            onChange={(event) => setSelectedCandidateId(event.target.value)}
            disabled={isLoading || refreshingProvider !== null || candidates.length === 0}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:bg-slate-100 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-200 dark:disabled:bg-slate-900"
          >
            {candidates.map((candidate) => (
              <option key={candidate.id} value={candidate.id}>
                {candidate.name}
              </option>
            ))}
          </select>
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/50">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Videos YouTube</span>
              <Video className="h-[16px] w-[16px] text-primary" />
            </div>
            <p className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white">
              {isCountsLoading ? '…' : mediaCounts.youtube}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/50">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Articles GDELT</span>
              <Newspaper className="h-[16px] w-[16px] text-primary" />
            </div>
            <p className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white">
              {isCountsLoading ? '…' : mediaCounts.gdelt}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => {
              void handleRefreshVideos()
            }}
            disabled={!selectedCandidate || isLoading || refreshingProvider !== null}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-100 dark:disabled:bg-slate-700"
          >
            {refreshingProvider === 'youtube' ? (
              <LoaderCircle className="h-[18px] w-[18px] animate-spin" />
            ) : (
              <RefreshCw className="h-[18px] w-[18px]" />
            )}
            {refreshingProvider === 'youtube' ? 'Rafraichissement...' : 'Rafraichir les videos'}
          </button>

          <button
            type="button"
            onClick={() => {
              void handleRefreshGdelt()
            }}
            disabled={!selectedCandidate || isLoading || refreshingProvider !== null}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-200 dark:disabled:border-slate-700 dark:disabled:bg-slate-900 dark:disabled:text-slate-500"
          >
            {refreshingProvider === 'gdelt' ? (
              <LoaderCircle className="h-[18px] w-[18px] animate-spin" />
            ) : (
              <Newspaper className="h-[18px] w-[18px]" />
            )}
            {refreshingProvider === 'gdelt' ? 'Rafraichissement...' : 'Rafraichir GDELT'}
          </button>

          <button
            type="button"
            onClick={() => {
              void handleRefreshMediaAttention()
            }}
            disabled={!selectedCandidate || isLoading || refreshingProvider !== null || !hasMediaCloudKey}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-200 dark:disabled:border-slate-700 dark:disabled:bg-slate-900 dark:disabled:text-slate-500"
          >
            {refreshingProvider === 'mediacloud' ? (
              <LoaderCircle className="h-[18px] w-[18px] animate-spin" />
            ) : (
              <ChartSpline className="h-[18px] w-[18px]" />
            )}
            {refreshingProvider === 'mediacloud' ? 'Rafraichissement...' : 'Rafraichir Media Cloud'}
          </button>

          {selectedCandidate ? (
            <Link
              to={`/candidats/${selectedCandidate.id}`}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-200"
            >
              <FileText className="h-[18px] w-[18px]" />
              Voir la fiche
            </Link>
          ) : null}

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

        {!hasMediaCloudKey ? (
          <p className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-400">
            Media Cloud n’est pas configure dans le front admin. Ajoute `VITE_MEDIA_CLOUD_API_KEY` en local si tu veux lancer ce refresh depuis l’interface.
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
