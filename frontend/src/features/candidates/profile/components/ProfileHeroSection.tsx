import type { Candidate } from '../../../../data/candidateTypes'
import {
  candidateStatusBadgeStyles,
  formatFrenchDate,
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
      ? `Naissance : ${candidate.birthYear}${age !== null ? ` • ${age} ans` : ''}`
      : age !== null
        ? `${age} ans`
        : null
  const lastSource = candidate.sources[0] ?? null

  const actionLabel = isAuthenticated
    ? isFavorite
      ? 'Candidat suivi'
      : 'Suivre ce candidat'
    : 'Se connecter pour suivre'

  const helperLabel = isAuthenticated
    ? isFavorite
      ? 'Ce profil apparait deja dans votre espace personnel.'
      : 'Ajoutez ce candidat a votre profil personnel pour le retrouver rapidement.'
    : 'Connexion Google en un clic pour enregistrer vos favoris.'

  return (
    <section className="px-4 pt-4 sm:px-6 sm:pt-6">
      <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/90 shadow-[0_24px_70px_rgba(15,23,42,0.10)] backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/90">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(26,34,127,0.16),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(245,158,11,0.16),_transparent_32%)]" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-primary/12 via-sky-200/20 to-amber-200/25 dark:from-primary/20 dark:via-sky-400/10 dark:to-amber-300/10" />

        <div className="relative flex flex-col gap-6 p-5 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col gap-6 md:flex-row md:items-center">
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
              <div className="absolute -bottom-2 -right-2 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/80 bg-emerald-500 text-white shadow-lg dark:border-slate-900">
                <span className="material-symbols-outlined text-[19px]">public</span>
              </div>
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
                      <span className="material-symbols-outlined text-sm">cake</span>
                      {ageLabel}
                    </span>
                  ) : null}
                </div>

                <div>
                  <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                    {candidate.name}
                  </h2>
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

              {lastSource ? (
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
                  Derniere source visible: {lastSource.label} • {formatFrenchDate(lastSource.date)}
                </p>
              ) : null}
            </div>
          </div>

          <aside className="w-full max-w-sm rounded-[1.75rem] border border-slate-200/80 bg-white/85 p-5 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Suivi personnel</p>
            <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-950 dark:text-white">
              Gardez ce candidat a portee de main
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{helperLabel}</p>

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
              className={`mt-5 inline-flex w-full items-center justify-center gap-3 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-70 ${
                isFavorite
                  ? 'bg-rose-500 text-white shadow-[0_14px_30px_rgba(244,63,94,0.28)] hover:bg-rose-600'
                  : 'bg-slate-950 text-white shadow-[0_14px_30px_rgba(15,23,42,0.22)] hover:-translate-y-0.5 hover:bg-primary dark:bg-white dark:text-slate-950'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{isFavorite ? 'favorite' : 'favorite_border'}</span>
              <span>
                {isFavoritePending ? 'Mise a jour...' : actionLabel}
              </span>
            </button>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-3 dark:border-slate-800 dark:bg-slate-900/70">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Type</p>
                <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">Fiche sourcee</p>
              </div>
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-3 dark:border-slate-800 dark:bg-slate-900/70">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Profil</p>
                <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
                  {isFavorite ? 'Dans vos favoris' : 'Disponible au suivi'}
                </p>
              </div>
            </div>

            {favoriteError ? (
              <p className="mt-4 text-sm font-medium text-amber-700 dark:text-amber-400">{favoriteError}</p>
            ) : null}
          </aside>
        </div>
      </div>
    </section>
  )
}
