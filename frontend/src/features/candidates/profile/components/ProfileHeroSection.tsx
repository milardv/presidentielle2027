import type { Candidate } from '../../../../data/candidateTypes'
import { candidateStatusBadgeStyles, getCandidateInitials } from '../../shared/candidateUi'

interface ProfileHeroSectionProps {
  candidate: Candidate
}

export function ProfileHeroSection({ candidate }: ProfileHeroSectionProps) {
  return (
    <section className="flex p-4 sm:p-6">
      <div className="flex w-full flex-col gap-6 items-center">
        <div className="flex gap-4 flex-col items-center">
          <div className="relative">
            {candidate.photoUrl ? (
              <img
                src={candidate.photoUrl}
                alt={`Photo Wikipedia de ${candidate.name}`}
                className="aspect-square rounded-full h-28 w-28 sm:h-32 sm:w-32 border-4 border-white dark:border-slate-800 shadow-xl object-cover"
                loading="lazy"
              />
            ) : (
              <div className="aspect-square rounded-full h-28 w-28 sm:h-32 sm:w-32 border-4 border-white dark:border-slate-800 shadow-xl bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center text-white text-3xl font-bold">
                {getCandidateInitials(candidate.name)}
              </div>
            )}
            <div className="absolute bottom-0 right-0 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full p-1 flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-white text-[16px] font-bold">database</span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold leading-tight tracking-tight text-center">{candidate.name}</h2>
            <div className="flex items-center gap-2 mt-1 flex-wrap justify-center">
              <p className="text-slate-500 dark:text-slate-400 text-base font-medium text-center">
                {candidate.currentRole}
              </p>
              <span
                className={`text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider ${candidateStatusBadgeStyles[candidate.status]}`}
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
  )
}
