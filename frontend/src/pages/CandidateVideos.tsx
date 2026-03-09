import type { ReactNode } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ExternalLink, PlayCircle, SquarePlay, Video } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { CandidateProfileTabs } from '../features/candidates/profile/components/CandidateProfileTabs'
import { ProfileErrorState } from '../features/candidates/profile/components/ProfileErrorState'
import { ProfileLoadingState } from '../features/candidates/profile/components/ProfileLoadingState'
import { ProfilePageHeader } from '../features/candidates/profile/components/ProfilePageHeader'
import { useCandidateProfile } from '../features/candidates/profile/hooks/useCandidateProfile'
import { useCandidateVideos } from '../features/candidates/profile/hooks/useCandidateVideos'
import { formatFrenchDate, getCandidateInitials } from '../features/candidates/shared/candidateUi'

function VideoStat({ label, value, icon }: { label: string; value: string; icon: ReactNode }) {
  return (
    <div className="h-full rounded-[1.4rem] border border-slate-200/80 bg-white/90 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/88">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">{label}</p>
        <div className="text-primary">{icon}</div>
      </div>
      <p className="mt-3 text-xl font-black leading-tight tracking-tight text-slate-950 dark:text-white sm:text-2xl">
        {value}
      </p>
    </div>
  )
}

export default function CandidateVideos() {
  const { candidateId } = useParams<{ candidateId: string }>()
  const { candidate, isLoading: isCandidateLoading, loadError: candidateLoadError } = useCandidateProfile(candidateId)
  const { videos, isLoading: areVideosLoading, loadError: videosLoadError } = useCandidateVideos(candidateId)
  const playerSectionRef = useRef<HTMLElement | null>(null)
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null)

  const playableVideos = useMemo(() => videos.filter((video) => video.videoId), [videos])
  const selectedVideo = useMemo(
    () => playableVideos.find((video) => video.id === selectedVideoId) ?? playableVideos[0] ?? null,
    [playableVideos, selectedVideoId],
  )

  useEffect(() => {
    if (!selectedVideoId && playableVideos[0]) {
      setSelectedVideoId(playableVideos[0].id)
      return
    }

    if (selectedVideoId && !playableVideos.some((video) => video.id === selectedVideoId)) {
      setSelectedVideoId(playableVideos[0]?.id ?? null)
    }
  }, [playableVideos, selectedVideoId])

  const handleSelectVideo = (videoId: string) => {
    setSelectedVideoId(videoId)
    playerSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  if (isCandidateLoading || areVideosLoading) {
    return <ProfileLoadingState />
  }

  if (candidateLoadError || candidate === null) {
    return <ProfileErrorState errorMessage={candidateLoadError ?? 'Candidat indisponible.'} />
  }

  return (
    <div className="relative min-h-screen bg-background-light font-display text-slate-900 dark:bg-background-dark dark:text-slate-100">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(circle_at_top_left,_rgba(26,34,127,0.12),_transparent_40%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.10),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(245,158,11,0.12),_transparent_22%)]" />
      <ProfilePageHeader />
      <CandidateProfileTabs candidateId={candidate.id} />

      <main className="relative mx-auto max-w-4xl px-4 pb-16 pt-6 sm:px-6 sm:pb-24">
        <section className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/92 shadow-[0_22px_60px_rgba(15,23,42,0.10)] dark:border-slate-800 dark:bg-slate-900/92">
          <div className="relative grid gap-6 p-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:items-center sm:p-8">
            <div className="flex items-start gap-4">
              {candidate.photoUrl ? (
                <img
                  src={candidate.photoUrl}
                  alt={candidate.name}
                  className="h-20 w-20 rounded-[1.6rem] object-cover shadow-sm sm:h-24 sm:w-24"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-[1.6rem] bg-gradient-to-br from-slate-800 to-slate-700 text-xl font-bold text-white shadow-sm sm:h-24 sm:w-24">
                  {getCandidateInitials(candidate.name)}
                </div>
              )}

              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Vidéos YouTube</p>
                <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                  {candidate.name}
                </h1>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  Sélection des vidéos YouTube détectées automatiquement pour ce candidat.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <VideoStat label="Vidéos" value={`${videos.length}`} icon={<SquarePlay className="h-[18px] w-[18px]" />} />
            </div>
          </div>
        </section>

        {videosLoadError ? (
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-300">
            {videosLoadError}
          </div>
        ) : null}

        {!videosLoadError && videos.length === 0 ? (
          <section className="mt-6 rounded-[2rem] border border-dashed border-slate-300 bg-white/85 p-8 text-center dark:border-slate-700 dark:bg-slate-900/85">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-primary/10 text-primary">
              <Video className="h-[28px] w-[28px]" />
            </div>
            <h2 className="mt-5 text-2xl font-black tracking-tight text-slate-950 dark:text-white">
              Aucune vidéo importée pour le moment
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Lance la synchronisation YouTube pour alimenter cette page avec les vidéos récentes du candidat.
            </p>
          </section>
        ) : null}

        {selectedVideo ? (
          <section
            ref={playerSectionRef}
            className="mt-6 overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/95 shadow-[0_18px_50px_rgba(15,23,42,0.10)] dark:border-slate-800 dark:bg-slate-900/92"
          >
            <div className="grid gap-0 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
              <div className="bg-slate-950">
                <div className="aspect-video">
                  <iframe
                    key={selectedVideo.videoId}
                    src={`https://www.youtube-nocookie.com/embed/${selectedVideo.videoId}?rel=0&modestbranding=1`}
                    title={selectedVideo.title}
                    className="h-full w-full"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between p-5 sm:p-6">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
                    <PlayCircle className="h-[16px] w-[16px]" />
                    Lecture integree
                  </div>

                  <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-950 dark:text-white">
                    {selectedVideo.title}
                  </h2>

                  <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-semibold dark:border-slate-700 dark:bg-slate-950/60">
                      {selectedVideo.channelTitle}
                    </span>
                    <span>{formatFrenchDate(selectedVideo.publishedAt)}</span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {selectedVideo.excerpt || 'Description indisponible.'}
                  </p>

                  <p className="mt-4 rounded-2xl bg-slate-50/90 px-4 py-3 text-sm leading-relaxed text-slate-600 dark:bg-slate-950/60 dark:text-slate-400">
                    {selectedVideo.context}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <a
                    href={selectedVideo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                  >
                    <ExternalLink className="h-[18px] w-[18px]" />
                    Ouvrir sur YouTube
                  </a>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {videos.length > 0 ? (
          <section className="mt-6 grid gap-5">
            {videos.map((video) => (
              <article
                key={video.id}
                className={`overflow-hidden rounded-[1.8rem] border bg-white/92 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_18px_40px_rgba(26,34,127,0.14)] dark:bg-slate-900/90 ${
                  selectedVideo?.id === video.id
                    ? 'border-primary/50 ring-2 ring-primary/15 dark:border-primary/40'
                    : 'border-slate-200/80 dark:border-slate-800'
                }`}
              >
                <div className="grid gap-0 md:grid-cols-[320px_minmax(0,1fr)]">
                  <button
                    type="button"
                    onClick={() => {
                      if (video.videoId) {
                        handleSelectVideo(video.id)
                      }
                    }}
                    disabled={!video.videoId}
                    className="relative block min-h-[200px] overflow-hidden bg-slate-900 text-left disabled:cursor-not-allowed"
                  >
                    {video.thumbnailUrl ? (
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full min-h-[200px] items-center justify-center bg-gradient-to-br from-slate-800 to-slate-700 text-white">
                        <PlayCircle className="h-[40px] w-[40px]" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.12)_0%,rgba(15,23,42,0.54)_100%)]" />
                    <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/45 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                      <PlayCircle className="h-[18px] w-[18px]" />
                      {video.videoId ? 'Lire ici' : 'YouTube'}
                    </div>
                  </button>

                  <div className="p-5 sm:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">{video.channelTitle}</p>
                        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white">
                          {video.title}
                        </h2>
                      </div>
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-300">
                        {formatFrenchDate(video.publishedAt)}
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {video.excerpt || 'Description indisponible.'}
                    </p>

                    <p className="mt-4 rounded-2xl bg-slate-50/90 px-4 py-3 text-sm leading-relaxed text-slate-600 dark:bg-slate-950/60 dark:text-slate-400">
                      {video.context}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      {video.videoId ? (
                        <button
                          type="button"
                          onClick={() => handleSelectVideo(video.id)}
                          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                        >
                          <PlayCircle className="h-[18px] w-[18px]" />
                          Lire ici
                        </button>
                      ) : null}

                      <a
                        href={video.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-700 transition-colors hover:border-red-300 hover:bg-red-100 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-200"
                      >
                        <ExternalLink className="h-[18px] w-[18px]" />
                        Ouvrir sur YouTube
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>
        ) : null}
      </main>
    </div>
  )
}
