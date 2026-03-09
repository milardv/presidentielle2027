import type { Candidate } from '../../../../data/candidateTypes'
import {
  candidateStatusBadgeStyles,
  getAgeFromBirthDate,
  getCandidateInitials,
} from '../../shared/candidateUi'

interface ProfileHeroSectionProps {
  candidate: Candidate
  isAuthenticated: boolean
  isFavorite: boolean
  isFavoritePending: boolean
  favoriteError: string | null
  onToggleFavorite: () => void
  onSignIn: () => Promise<void>
}

export function ProfileHeroSection({
  candidate,
  isAuthenticated,
  isFavorite,
  isFavoritePending,
  favoriteError,
  onToggleFavorite,
  onSignIn,
}: ProfileHeroSectionProps) {
  const age = candidate.birthDate ? getAgeFromBirthDate(candidate.birthDate) : null
  const ageLabel =
    typeof candidate.birthYear === 'number'
      ? `${age !== null ? ` ${age} ans` : ''}`
      : age !== null
        ? `${age} ans`
        : null
  const actionLabel = isFavorite ? 'Suivi' : 'Suivre'

  return (
    <section className="px-4 pt-4 sm:px-6 sm:pt-6">
      <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/90 shadow-[0_24px_70px_rgba(15,23,42,0.10)] backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/90">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(26,34,127,0.16),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(245,158,11,0.16),_transparent_32%)]" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-primary/12 via-sky-200/20 to-amber-200/25 dark:from-primary/20 dark:via-sky-400/10 dark:to-amber-300/10" />

        <div className="relative p-5 sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="relative self-center md:self-start">
              {candidate.photoUrl ? (
                <img
                  src={candidate.photoUrl}
                  alt={`Photo Wikipedia de ${candidate.name}`}
                  className="h-32 w-32 rounded-[2rem] border-4 border-white object-cover shadow-xl dark:border-slate-800 sm:h-36 sm:w-36"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-32 w-32 items-center justify-center rounded-[2rem] border-4 border-white bg-gradient-to-br from-slate-800 to-slate-700 text-3xl font-bold text-white shadow-xl dark:border-slate-800 sm:h-36 sm:w-36">
                  {getCandidateInitials(candidate.name)}
                </div>
              )}
            </div>

            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${candidateStatusBadgeStyles[candidate.status]}`}
                  >
                    {candidate.statusLabel}
                  </span>
                  {ageLabel ? (
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
                      {ageLabel}
                    </span>
                  ) : null}
                </div>

                <div>
                  <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
                    <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                      {candidate.name}
                    </h2>
                    <button
                      type="button"
                      onClick={() => {
                        if (isAuthenticated) {
                          onToggleFavorite()
                          return
                        }

                        void onSignIn()
                      }}
                      disabled={isFavoritePending}
                      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-70 ${
                        isFavorite
                          ? 'border-rose-200 bg-rose-50 text-rose-700 hover:border-rose-300 hover:bg-rose-100 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-200'
                          : 'border-slate-200 bg-white/85 text-slate-700 hover:border-primary hover:text-primary dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-200'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">{isFavorite ? 'favorite' : 'favorite_border'}</span>
                      {isFavoritePending ? 'Mise a jour...' : actionLabel}
                    </button>
                  </div>
                  <p className="mt-2 text-base font-medium text-slate-600 dark:text-slate-300">
                    {candidate.currentRole}
                  </p>
                </div>

                <p className="max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {candidate.summary}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
                <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white dark:bg-white dark:text-slate-900">
                  {candidate.party}
                </span>
                <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
                  {candidate.bloc}
                </span>
                {candidate.themes.slice(0, 3).map((theme) => (
                  <span
                    key={`${candidate.id}-${theme}`}
                    className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                  >
                    {theme}
                  </span>
                ))}
              </div>

              {favoriteError ? (
                <p className="text-sm font-medium text-amber-700 dark:text-amber-400">{favoriteError}</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
