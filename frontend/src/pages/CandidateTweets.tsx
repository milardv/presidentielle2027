import { useEffect, useRef, useState } from 'react'
import { AtSign, ExternalLink } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { CandidateProfileTabs } from '../features/candidates/profile/components/CandidateProfileTabs'
import { ProfileErrorState } from '../features/candidates/profile/components/ProfileErrorState'
import { ProfileLoadingState } from '../features/candidates/profile/components/ProfileLoadingState'
import { ProfilePageHeader } from '../features/candidates/profile/components/ProfilePageHeader'
import { useCandidateProfile } from '../features/candidates/profile/hooks/useCandidateProfile'
import { getCandidateInitials } from '../features/candidates/shared/candidateUi'

const X_WIDGET_SCRIPT_ID = 'x-widgets-script'
const X_WIDGET_INIT_TIMEOUT_MS = 5000

let xWidgetsPromise: Promise<XWidgets> | null = null

type XWidgets = {
  widgets: {
    load: (element?: HTMLElement) => void
  }
}

function loadXWidgets(): Promise<XWidgets> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Window is unavailable.'))
  }

  const existingWidgets = (window as Window & { twttr?: XWidgets }).twttr
  if (existingWidgets?.widgets) {
    return Promise.resolve(existingWidgets)
  }

  if (xWidgetsPromise) {
    return xWidgetsPromise
  }

  let script = document.getElementById(X_WIDGET_SCRIPT_ID) as HTMLScriptElement | null
  if (!script) {
    script = document.createElement('script')
    script.id = X_WIDGET_SCRIPT_ID
    script.src = 'https://platform.twitter.com/widgets.js'
    script.async = true
    script.charset = 'utf-8'
    document.body.appendChild(script)
  }

  xWidgetsPromise = new Promise<XWidgets>((resolve, reject) => {
    let attempts = 0
    const maxAttempts = 100

    const checkWidgets = () => {
      const twttr = (window as Window & { twttr?: XWidgets }).twttr
      if (twttr?.widgets) {
        resolve(twttr)
        return true
      }

      attempts += 1
      if (attempts >= maxAttempts) {
        reject(new Error('Le widget X ne s’est pas initialise correctement.'))
        return true
      }

      return false
    }

    if (checkWidgets()) {
      return
    }

    const intervalId = window.setInterval(() => {
      if (checkWidgets()) {
        window.clearInterval(intervalId)
      }
    }, 100)

    script?.addEventListener(
      'error',
      () => {
        window.clearInterval(intervalId)
        xWidgetsPromise = null
        reject(new Error('Impossible de charger le script officiel X.'))
      },
      { once: true },
    )
  })

  return xWidgetsPromise
}

function OfficialXTimeline({ username }: { username: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    const container = containerRef.current

    if (!container) {
      return undefined
    }

    setIsLoading(true)
    setLoadError(null)

    if (container.dataset.timelineUsername === username && container.querySelector('iframe')) {
      setIsLoading(false)
      return undefined
    }

    if (container.dataset.timelineUsername !== username) {
      container.innerHTML = ''
      container.dataset.timelineUsername = username
    }

    if (!container.querySelector('a.twitter-timeline')) {
      const timelineAnchor = document.createElement('a')
      timelineAnchor.className = 'twitter-timeline'
      timelineAnchor.href = `https://twitter.com/${username}?ref_src=twsrc%5Etfw`
      timelineAnchor.setAttribute('data-tweet-limit', '10')
      timelineAnchor.setAttribute('data-chrome', 'nofooter noborders transparent')
      timelineAnchor.setAttribute('data-dnt', 'true')
      timelineAnchor.textContent = `Tweets by @${username}`
      container.appendChild(timelineAnchor)
    }

    const observer = new MutationObserver(() => {
      if (container.querySelector('iframe')) {
        setIsLoading(false)
        setLoadError(null)
        observer.disconnect()
      }
    })

    observer.observe(container, { childList: true, subtree: true })

    void loadXWidgets()
      .then((twttr) => {
        if (!active) {
          return
        }

        twttr.widgets.load(container)
        window.setTimeout(() => {
          if (active && !container.querySelector('iframe')) {
            setLoadError('X refuse temporairement l’embed de cette timeline ou ton navigateur bloque le widget. Ouvre le compte directement sur X.')
            setIsLoading(false)
          }
        }, X_WIDGET_INIT_TIMEOUT_MS)
      })
      .catch((error) => {
        if (!active) {
          return
        }

        console.error('Failed to load official X timeline', error)
        setLoadError('Impossible de charger l’embed officiel X pour le moment.')
        setIsLoading(false)
      })

    return () => {
      active = false
      observer.disconnect()
    }
  }, [username])

  return (
    <div className="rounded-[2rem] border border-slate-200/80 bg-white/94 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900/92 sm:p-6">
      <div className="relative mx-auto max-w-[540px]">
        {isLoading ? (
          <div className="pointer-events-none absolute inset-0 z-10 animate-pulse rounded-[1.6rem] bg-white/88 p-4 dark:bg-slate-900/88">
            <div className="space-y-4">
              <div className="h-12 rounded-2xl bg-slate-200/80 dark:bg-slate-800/80" />
              <div className="h-[520px] rounded-[1.6rem] bg-slate-200/80 dark:bg-slate-800/80" />
            </div>
          </div>
        ) : null}

        {loadError ? (
          <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-300">
            {loadError}
          </div>
        ) : null}

        <div className="relative min-h-[620px]">
          <div ref={containerRef} className="min-h-[620px]" />
        </div>
      </div>
    </div>
  )
}

export default function CandidateTweets() {
  const { candidateId } = useParams<{ candidateId: string }>()
  const { candidate, isLoading: isCandidateLoading, loadError: candidateLoadError } = useCandidateProfile(candidateId)

  if (isCandidateLoading) {
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
          <div className="relative grid gap-6 p-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(240px,0.9fr)] lg:items-center sm:p-8">
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
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Tweets</p>
                <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white">{candidate.name}</h1>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  Timeline officielle X du candidat, intégrée directement via le widget officiel et limitée à 10 posts.
                </p>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-950/60">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Compte officiel</p>
              <p className="mt-3 text-2xl font-black tracking-tight text-slate-950 dark:text-white">
                {candidate.xUsername ? `@${candidate.xUsername}` : 'Non configure'}
              </p>
              {candidate.xUsername ? (
                <a
                  href={`https://x.com/${candidate.xUsername}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  <ExternalLink className="h-[16px] w-[16px]" />
                  Ouvrir sur X
                </a>
              ) : null}
            </div>
          </div>
        </section>

        {candidate.xUsername ? (
          <section className="mt-6">
            <OfficialXTimeline username={candidate.xUsername} />
          </section>
        ) : (
          <section className="mt-6 rounded-[2rem] border border-dashed border-slate-300 bg-white/85 p-8 text-center dark:border-slate-700 dark:bg-slate-900/85">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-primary/10 text-primary">
              <AtSign className="h-[28px] w-[28px]" />
            </div>
            <h2 className="mt-5 text-2xl font-black tracking-tight text-slate-950 dark:text-white">
              Compte X non configuré
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Aucun identifiant X officiel n’est encore enregistré pour ce candidat.
            </p>
          </section>
        )}
      </main>
    </div>
  )
}
