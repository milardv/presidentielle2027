import { Link } from 'react-router-dom'
import type { Candidate } from '../../../../data/candidateTypes'
import {
  candidateStatusBadgeStyles,
  formatFrenchDate,
  getCandidatePartyGradientClasses,
  getCandidateInitials,
} from '../../shared/candidateUi'

interface CandidateCardProps {
  candidate: Candidate
  variant?: 'default' | 'rail'
  revealIndex?: number
}

export function CandidateCard({ candidate, variant = 'default', revealIndex = 0 }: CandidateCardProps) {
  const firstSource = candidate.sources[0]
  const partyGradientClasses = getCandidatePartyGradientClasses(candidate.party)
  const isRail = variant === 'rail'

  return (
    <Link
      to={`/candidats/${candidate.id}`}
      aria-label={`Voir la fiche détaillée de ${candidate.name}`}
      className={`group block overflow-hidden transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 ${
        isRail
          ? 'candidate-card-reveal h-full w-[18.75rem] flex-none snap-start rounded-[1.85rem] border border-slate-200 bg-white shadow-[0_18px_48px_rgba(15,23,42,0.08)] hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(15,23,42,0.14)] sm:w-[20.5rem]'
          : `h-full rounded-[1.85rem] bg-gradient-to-br ${partyGradientClasses} p-[1.5px] shadow-[0_18px_48px_rgba(15,23,42,0.08)] hover:-translate-y-1.5 hover:shadow-[0_26px_64px_rgba(26,34,127,0.16)]`
      }`}
      style={isRail ? { animationDelay: `${Math.min(revealIndex, 9) * 70}ms` } : undefined}
    >
      <article
        className={`relative flex h-full flex-col overflow-hidden ${
          isRail
            ? 'rounded-[1.85rem] bg-white'
            : 'rounded-[1.72rem] border border-white/60 bg-white/92 dark:border-slate-800/80 dark:bg-slate-900/94'
        }`}
      >
        {!isRail && (
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-primary/14 via-sky-200/22 to-amber-200/22 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-primary/18 dark:via-sky-400/10 dark:to-amber-300/10" />
        )}

        <div
          className={`relative overflow-hidden bg-slate-200 ${
            isRail ? 'h-[22rem] border-b border-slate-200' : 'h-[30rem] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 sm:h-[26rem]'
          }`}
        >
          <div className="absolute left-4 top-4 z-10 flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${candidateStatusBadgeStyles[candidate.status]}`}
            >
              {candidate.statusLabel}
            </span>
          </div>

          {candidate.photoUrl ? (
            isRail && candidate.videoUrl ? (
              <>
                <video
                  src={candidate.videoUrl}
                  poster={candidate.photoUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  disablePictureInPicture
                  controlsList="nodownload noplaybackrate noremoteplayback"
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.04)_0%,rgba(15,23,42,0.14)_48%,rgba(15,23,42,0.22)_100%)]" />
              </>
            ) : (
              <>
                <img
                  src={candidate.photoUrl}
                  alt={`Photo Wikipedia de ${candidate.name}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className={`absolute inset-0 ${isRail ? 'bg-slate-950/16' : 'bg-[linear-gradient(180deg,rgba(15,23,42,0.10)_0%,rgba(15,23,42,0.38)_58%,rgba(15,23,42,0.88)_100%)]'}`} />
              </>
            )
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-[1.75rem] border border-white/25 bg-white/12 text-3xl font-bold tracking-wider text-white backdrop-blur-sm">
                {getCandidateInitials(candidate.name)}
              </div>
            </div>
          )}

          <div className={`absolute bottom-0 left-0 right-0 p-4 sm:p-5 ${isRail ? 'bg-slate-950/84' : ''}`}>
            <p className="text-xl font-black leading-tight tracking-tight text-white">{candidate.name}</p>
            <p className="mt-2 max-w-[90%] text-sm font-medium text-white/78">{candidate.currentRole}</p>
          </div>
        </div>

        <div className="relative flex flex-1 flex-col p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
            {candidate.party}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-950 px-3 py-1 text-[11px] font-semibold text-white dark:bg-white dark:text-slate-950">
              {candidate.bloc}
            </span>
            {candidate.themes.slice(0, 3).map((theme) => (
              <span
                key={`${candidate.id}-${theme}`}
                className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-primary"
              >
                {theme}
              </span>
            ))}
          </div>

          <p
            className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
            style={
              isRail
                ? {
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 4,
                    overflow: 'hidden',
                  }
                : undefined
            }
          >
            {candidate.summary}
          </p>

          <div className="mt-auto pt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
            Voir la fiche
            <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-0.5">
              arrow_forward
            </span>
          </div>

          <p className="mt-4 text-[11px] text-slate-400">Source publiée le {formatFrenchDate(firstSource.date)}</p>
        </div>
      </article>
    </Link>
  )
}
