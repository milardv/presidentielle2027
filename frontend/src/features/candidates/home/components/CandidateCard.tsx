import { Link } from 'react-router-dom'
import type { Candidate } from '../../../../data/candidateTypes'
import {
  candidateStatusBadgeStyles,
  formatFrenchDate,
  getCandidateInitials,
} from '../../shared/candidateUi'

interface CandidateCardProps {
  candidate: Candidate
}

export function CandidateCard({ candidate }: CandidateCardProps) {
  const firstSource = candidate.sources[0]

  return (
    <article className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative h-40 sm:h-44 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-700">
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span
            className={`text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider ${candidateStatusBadgeStyles[candidate.status]}`}
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
              {getCandidateInitials(candidate.name)}
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <p className="text-white font-bold text-base sm:text-lg leading-tight">{candidate.name}</p>
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
            <span className="text-[11px] font-medium truncate max-w-[140px] sm:max-w-[180px]">
              {firstSource.label}
            </span>
          </a>

          <Link
            to={`/candidats/${candidate.id}`}
            className="text-primary text-sm font-bold flex items-center gap-1 group/link"
          >
            Consulter
            <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>
        </div>

        <p className="text-[11px] text-slate-400">Source publiée le {formatFrenchDate(firstSource.date)}</p>
      </div>
    </article>
  )
}
