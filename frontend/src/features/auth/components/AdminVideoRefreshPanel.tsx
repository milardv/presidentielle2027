import { useEffect, useMemo, useState } from 'react'
import { ChartSpline, FileText, LoaderCircle, MessageCircle, Newspaper, RefreshCw, ShieldCheck, Video } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Candidate } from '../../../data/candidateTypes'
import {
  getCandidateMediaCounts,
  getCandidateTweetSyncStatus,
  refreshAllCandidateTweets,
  refreshCandidateMediaAttention,
  refreshCandidateGdelt,
  refreshCandidateTweets,
  refreshCandidateVideos,
  type CandidateMediaCounts,
  type CandidateTweetSyncStatus,
} from '../../../services/adminVideoSyncService'
import { getCandidatesFromDatabase } from '../../../services/candidateRepository'

interface AdminVideoRefreshPanelProps {
  adminEmail: string
}

function formatSyncDate(value: string | null): string {
  if (!value) {
    return 'Jamais'
  }

  const parsedDate = new Date(value)
  if (Number.isNaN(parsedDate.getTime())) {
    return 'Jamais'
  }

  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(parsedDate)
}

export function AdminVideoRefreshPanel({ adminEmail }: AdminVideoRefreshPanelProps) {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [refreshingProvider, setRefreshingProvider] = useState<'youtube' | 'gdelt' | 'mediacloud' | 'tweets' | 'tweets-all' | null>(null)
  const [mediaCounts, setMediaCounts] = useState<CandidateMediaCounts>({ youtube: 0, gdelt: 0, tweets: 0 })
  const [tweetSyncStatus, setTweetSyncStatus] = useState<CandidateTweetSyncStatus>({
    lastRunAt: null,
    importedCount: null,
    status: null,
  })
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
      setMediaCounts({ youtube: 0, gdelt: 0, tweets: 0 })
      setTweetSyncStatus({ lastRunAt: null, importedCount: null, status: null })
      setIsCountsLoading(false)
      return
    }

    let active = true
    setIsCountsLoading(true)

    void Promise.all([getCandidateMediaCounts(selectedCandidateId), getCandidateTweetSyncStatus(selectedCandidateId)])
      .then(([counts, syncStatus]) => {
        if (!active) {
          return
        }

        setMediaCounts(counts)
        setTweetSyncStatus(syncStatus)
      })
      .catch((error) => {
        if (!active) {
          return
        }

        console.error('Failed to load candidate media counts', error)
        setMediaCounts({ youtube: 0, gdelt: 0, tweets: 0 })
        setTweetSyncStatus({ lastRunAt: null, importedCount: null, status: null })
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
        `${result.importedCount} video${result.importedCount > 1 ? 's' : ''} importée${result.importedCount > 1 ? 's' : ''} pour ${result.candidateName}.`,
      )
    } catch (error) {
      console.error('Failed to refresh candidate videos from admin panel', error)
      setLoadError(error instanceof Error ? error.message : 'Impossible de rafraîchir les vidéos.')
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
        `${result.importedCount} entrée${result.importedCount > 1 ? 's' : ''} GDELT importée${result.importedCount > 1 ? 's' : ''} pour ${result.candidateName}.`,
      )
    } catch (error) {
      console.error('Failed to refresh candidate GDELT entries from admin panel', error)
      setLoadError(error instanceof Error ? error.message : 'Impossible de rafraîchir les données GDELT.')
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
        `${result.pointCount} point${result.pointCount > 1 ? 's' : ''} Media Cloud mis à jour pour ${result.candidateName}.`,
      )
    } catch (error) {
      console.error('Failed to refresh candidate Media Cloud attention from admin panel', error)
      setLoadError(error instanceof Error ? error.message : 'Impossible de rafraîchir la courbe Media Cloud.')
    } finally {
      setRefreshingProvider(null)
    }
  }

  const handleRefreshTweets = async () => {
    if (!selectedCandidate) {
      return
    }

    setRefreshingProvider('tweets')
    setLoadError(null)
    setRefreshMessage(null)

    try {
      const result = await refreshCandidateTweets(selectedCandidate, adminEmail)
      const [counts, syncStatus] = await Promise.all([
        getCandidateMediaCounts(selectedCandidate.id),
        getCandidateTweetSyncStatus(selectedCandidate.id),
      ])
      setMediaCounts(counts)
      setTweetSyncStatus(syncStatus)
      setRefreshMessage(
        `${result.importedCount} tweet${result.importedCount > 1 ? 's' : ''} mis à jour pour ${selectedCandidate.name}.`,
      )
    } catch (error) {
      console.error('Failed to refresh candidate tweets from admin panel', error)
      setLoadError(error instanceof Error ? error.message : 'Impossible de rafraîchir les tweets.')
    } finally {
      setRefreshingProvider(null)
    }
  }

  const handleRefreshAllTweets = async () => {
    setRefreshingProvider('tweets-all')
    setLoadError(null)
    setRefreshMessage(null)

    try {
      const result = await refreshAllCandidateTweets(adminEmail)

      if (selectedCandidateId) {
        const [counts, syncStatus] = await Promise.all([
          getCandidateMediaCounts(selectedCandidateId),
          getCandidateTweetSyncStatus(selectedCandidateId),
        ])
        setMediaCounts(counts)
        setTweetSyncStatus(syncStatus)
      }

      setRefreshMessage(
        `${result.importedCount} tweets mis à jour sur ${result.candidateCount} candidat${result.candidateCount > 1 ? 's' : ''}.`,
      )
    } catch (error) {
      console.error('Failed to refresh all candidate tweets from admin panel', error)
      setLoadError(error instanceof Error ? error.message : 'Impossible de rafraichir tous les tweets.')
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
              Rafraîchissement médias candidat
            </h2>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          Lance un rafraîchissement ciblé pour un candidat : YouTube pour les vidéos, X pour les tweets scrapés, GDELT pour les articles, Media Cloud pour la courbe d’attention.
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

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/50">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Vidéos YouTube</span>
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

          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/50">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Tweets</span>
              <MessageCircle className="h-[16px] w-[16px] text-primary" />
            </div>
            <p className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white">
              {isCountsLoading ? '…' : mediaCounts.tweets}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/50">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Dernier rafraîchissement tweets</p>
              <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                {formatSyncDate(tweetSyncStatus.lastRunAt)}
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {tweetSyncStatus.importedCount !== null
                  ? `${tweetSyncStatus.importedCount} tweet${tweetSyncStatus.importedCount > 1 ? 's' : ''} importé${tweetSyncStatus.importedCount > 1 ? 's' : ''}`
                  : 'Aucun rafraîchissement détecté pour ce candidat.'}
              </p>
            </div>
            {tweetSyncStatus.status ? (
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
                {tweetSyncStatus.status}
              </span>
            ) : null}
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
            {refreshingProvider === 'youtube' ? 'Rafraîchissement...' : 'Rafraîchir les vidéos'}
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
            {refreshingProvider === 'gdelt' ? 'Rafraîchissement...' : 'Rafraîchir GDELT'}
          </button>

          <button
            type="button"
            onClick={() => {
              void handleRefreshTweets()
            }}
            disabled={!selectedCandidate || isLoading || refreshingProvider !== null}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-200 dark:disabled:border-slate-700 dark:disabled:bg-slate-900 dark:disabled:text-slate-500"
          >
            {refreshingProvider === 'tweets' ? (
              <LoaderCircle className="h-[18px] w-[18px] animate-spin" />
            ) : (
              <MessageCircle className="h-[18px] w-[18px]" />
            )}
            {refreshingProvider === 'tweets' ? 'Rafraîchissement...' : 'Rafraîchir les tweets'}
          </button>

          <button
            type="button"
            onClick={() => {
              void handleRefreshAllTweets()
            }}
            disabled={isLoading || refreshingProvider !== null || candidates.length === 0}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-200 dark:disabled:border-slate-700 dark:disabled:bg-slate-900 dark:disabled:text-slate-500"
          >
            {refreshingProvider === 'tweets-all' ? (
              <LoaderCircle className="h-[18px] w-[18px] animate-spin" />
            ) : (
              <MessageCircle className="h-[18px] w-[18px]" />
            )}
            {refreshingProvider === 'tweets-all' ? 'Rafraîchissement global...' : 'Rafraîchir tous les tweets'}
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
            {refreshingProvider === 'mediacloud' ? 'Rafraîchissement...' : 'Rafraîchir Media Cloud'}
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
              Voir la page vidéos
            </Link>
          ) : null}

          {selectedCandidate ? (
            <Link
              to={`/candidats/${selectedCandidate.id}/tweets`}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-200"
            >
              <MessageCircle className="h-[18px] w-[18px]" />
              Voir la page tweets
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
            Media Cloud n’est pas configuré dans le front admin. Ajoute `VITE_MEDIA_CLOUD_API_KEY` en local si tu veux lancer ce rafraîchissement depuis l’interface.
          </p>
        ) : null}

        <p className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-400">
          Le rafraîchissement des tweets passe par un service local pour exécuter Playwright. Lance `npm run admin:sync-server` sur la machine admin, puis utilise le bouton.
        </p>

        {loadError ? (
          <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-300">
            {loadError}
          </p>
        ) : null}
      </div>
    </section>
  )
}
