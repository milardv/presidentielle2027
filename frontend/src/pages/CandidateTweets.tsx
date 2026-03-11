import type { ReactNode } from 'react'
import { AtSign, BadgeCheck, ExternalLink, Eye, Heart, MessageCircle, Repeat2 } from 'lucide-react'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { MobileAppNav } from '../components/MobileAppNav'
import { CandidateProfileTabs } from '../features/candidates/profile/components/CandidateProfileTabs'
import { ProfileErrorState } from '../features/candidates/profile/components/ProfileErrorState'
import { ProfileLoadingState } from '../features/candidates/profile/components/ProfileLoadingState'
import { ProfilePageHeader } from '../features/candidates/profile/components/ProfilePageHeader'
import { useCandidateProfile } from '../features/candidates/profile/hooks/useCandidateProfile'
import { useCandidateTweets } from '../features/candidates/profile/hooks/useCandidateTweets'
import type { CandidateTweet } from '../data/candidateTweetTypes'
import { formatFrenchDate, getCandidateInitials } from '../features/candidates/shared/candidateUi'
import { appNavItems } from '../navigation/appNavItems'
import { SeoHead } from '../seo/SeoHead'

function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat('fr-FR', {
    notation: 'compact',
    maximumFractionDigits: value >= 1000 ? 1 : 0,
  }).format(value)
}

function TweetMetric({ label, value, icon }: { label: string; value: number; icon: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-300">
      <span className="text-slate-400">{icon}</span>
      <span>{formatCompactNumber(value)}</span>
      <span className="sr-only">{label}</span>
    </div>
  )
}

function TweetCard({ tweet, isLead = false }: { tweet: CandidateTweet; isLead?: boolean }) {
  const leadMedia = tweet.media[0] ?? null

  return (
    <article
      className={`overflow-hidden rounded-[1.8rem] border bg-white/94 shadow-sm ${
        isLead
          ? 'border-primary/20 shadow-[0_20px_50px_rgba(26,34,127,0.12)]'
          : 'border-slate-200/80 dark:border-slate-800'
      } dark:bg-slate-900/92`}
    >
      <div className={`grid gap-0 ${leadMedia ? 'lg:grid-cols-[minmax(0,1fr)_320px]' : ''}`}>
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              {tweet.authorProfileImageUrl ? (
                <img
                  src={tweet.authorProfileImageUrl}
                  alt={tweet.authorName}
                  className="h-12 w-12 rounded-2xl object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-sm font-bold text-white">
                  {getCandidateInitials(tweet.authorName)}
                </div>
              )}

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-black tracking-tight text-slate-950 dark:text-white">{tweet.authorName}</p>
                  {tweet.authorVerified ? <BadgeCheck className="h-[16px] w-[16px] text-primary" /> : null}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <AtSign className="h-[13px] w-[13px]" />
                    {tweet.authorUsername}
                  </span>
                  <span>•</span>
                  <span>{formatFrenchDate(tweet.publishedAt)}</span>
                </div>
              </div>
            </div>

            <a
              href={tweet.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-primary hover:text-primary dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-300"
              aria-label="Ouvrir le tweet sur X"
            >
              <ExternalLink className="h-[18px] w-[18px]" />
            </a>
          </div>

          <p className="mt-5 whitespace-pre-wrap text-[15px] leading-7 text-slate-700 dark:text-slate-200">{tweet.text}</p>

          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <TweetMetric label="Mentions j’aime" value={tweet.metrics.likes} icon={<Heart className="h-[15px] w-[15px]" />} />
            <TweetMetric label="Réponses" value={tweet.metrics.replies} icon={<MessageCircle className="h-[15px] w-[15px]" />} />
            <TweetMetric label="Reposts" value={tweet.metrics.reposts} icon={<Repeat2 className="h-[15px] w-[15px]" />} />
            <TweetMetric label="Vues" value={tweet.metrics.views} icon={<Eye className="h-[15px] w-[15px]" />} />
          </div>
        </div>

        {leadMedia ? (
          <div className="border-t border-slate-200/80 bg-slate-100/80 dark:border-slate-800 dark:bg-slate-950/60 lg:border-l lg:border-t-0">
            <img
              src={leadMedia.url}
              alt={leadMedia.altText ?? `Visuel du tweet de ${tweet.authorName}`}
              className="h-full w-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        ) : null}
      </div>
    </article>
  )
}

export default function CandidateTweets() {
  const { candidateId } = useParams<{ candidateId: string }>()
  const { candidate, isLoading: isCandidateLoading, loadError: candidateLoadError } = useCandidateProfile(candidateId)
  const { tweets, isLoading: areTweetsLoading, loadError: tweetsLoadError } = useCandidateTweets(candidateId)

  const [leadTweet, otherTweets] = useMemo(() => [tweets[0] ?? null, tweets.slice(1)], [tweets])

  if (isCandidateLoading || areTweetsLoading) {
    return <ProfileLoadingState />
  }

  if (candidateLoadError || candidate === null) {
    return <ProfileErrorState errorMessage={candidateLoadError ?? 'Candidat indisponible.'} />
  }

  return (
    <div className="relative min-h-screen bg-background-light font-display text-slate-900 dark:bg-background-dark dark:text-slate-100">
      <SeoHead
        title={`${candidate.name} 2027 : tweets et prises de parole`}
        description={`Flux des tweets et publications publiques de ${candidate.name} dans le suivi Présidentielles 2027.`}
        path={`/candidats/${candidate.id}/tweets`}
        noindex
      />
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
                  Les 10 derniers posts publics du compte X officiel du candidat, récupérés automatiquement puis stockés en base.
                </p>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-950/60">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Compte officiel</p>
              <p className="mt-3 text-2xl font-black tracking-tight text-slate-950 dark:text-white">
                {candidate.xUsername ? `@${candidate.xUsername}` : 'Non configuré'}
              </p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {tweets.length} post{tweets.length > 1 ? 's' : ''} disponible{tweets.length > 1 ? 's' : ''}
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

        {tweetsLoadError ? (
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-300">
            {tweetsLoadError}
          </div>
        ) : null}

        {!tweetsLoadError && tweets.length === 0 ? (
          <section className="mt-6 rounded-[2rem] border border-dashed border-slate-300 bg-white/85 p-8 text-center dark:border-slate-700 dark:bg-slate-900/85">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-primary/10 text-primary">
              <AtSign className="h-[28px] w-[28px]" />
            </div>
            <h2 className="mt-5 text-2xl font-black tracking-tight text-slate-950 dark:text-white">
              Aucun tweet importé pour le moment
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              La synchronisation Playwright n’a pas encore rempli ce compte ou le profil n’est pas exploitable publiquement.
            </p>
          </section>
        ) : null}

        {leadTweet ? (
          <section className="mt-6 grid gap-5">
            <TweetCard tweet={leadTweet} isLead />
            {otherTweets.map((tweet) => (
              <TweetCard key={tweet.id} tweet={tweet} />
            ))}
          </section>
        ) : null}
      </main>

      <MobileAppNav items={appNavItems} />
    </div>
  )
}
