import { Link } from 'react-router-dom'
import type { Candidate } from '../../../data/candidateTypes'
import {
  candidateStatusBadgeStyles,
  getAgeFromBirthDate,
  getCandidateInitials,
} from '../../candidates/shared/candidateUi'

interface FavoriteCandidatesSectionProps {
  candidates: Candidate[]
  isLoading: boolean
  errorMessage: string | null
  removingCandidateId: string | null
  onRemoveFavorite: (candidateId: string) => void
}

function FavoriteCandidateCard({
  candidate,
  isRemoving,
  onRemoveFavorite,
}: {
  candidate: Candidate
  isRemoving: boolean
  onRemoveFavorite: (candidateId: string) => void
}) {
  const age = candidate.birthDate ? getAgeFromBirthDate(candidate.birthDate) : null

  return (
    <article className="group rounded-[1.6rem] border border-slate-200/80 bg-white/90 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_18px_40px_rgba(26,34,127,0.16)] dark:border-slate-800 dark:bg-slate-900/85">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-4">
          {candidate.photoUrl ? (
            <img
              src={candidate.photoUrl}
              alt={candidate.name}
              className="h-16 w-16 rounded-2xl object-cover shadow-sm"
              loading="lazy"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-800 to-slate-700 text-lg font-bold text-white shadow-sm">
              {getCandidateInitials(candidate.name)}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-base font-bold tracking-tight text-slate-950 dark:text-white">{candidate.name}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{candidate.currentRole}</p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${candidateStatusBadgeStyles[candidate.status]}`}
              >
                {candidate.statusLabel}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-slate-950 px-2.5 py-1 text-[11px] font-semibold text-white dark:bg-white dark:text-slate-950">
                {candidate.party}
              </span>
              <span className="rounded-full border border-slate-200 px-2.5 py-1 text-[11px] font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300">
                {candidate.bloc}
              </span>
              {age !== null ? (
                <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300">
                  {age} ans
                </span>
              ) : null}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onRemoveFavorite(candidate.id)}
          disabled={isRemoving}
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-rose-600 transition-colors hover:border-rose-300 hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-70 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-300"
        >
          <span className="material-symbols-outlined text-[18px]">
            {isRemoving ? 'hourglass_top' : 'delete'}
          </span>
          {isRemoving ? 'Retrait...' : 'Retirer'}
        </button>
      </div>

      <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{candidate.summary}</p>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
        <div className="flex flex-wrap gap-1.5">
          {candidate.themes.slice(0, 2).map((theme) => (
            <span
              key={`${candidate.id}-${theme}`}
              className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-primary"
            >
              {theme}
            </span>
          ))}
        </div>
        <Link
          to={`/candidats/${candidate.id}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-transform hover:translate-x-0.5"
        >
          Voir la fiche
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
      </div>
    </article>
  )
}

function FavoriteCandidatesSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={`favorite-skeleton-${index}`}
          className="h-52 animate-pulse rounded-[1.6rem] border border-slate-200/80 bg-white/70 dark:border-slate-800 dark:bg-slate-900/70"
        />
      ))}
    </div>
  )
}

export function FavoriteCandidatesSection({
  candidates,
  isLoading,
  errorMessage,
  removingCandidateId,
  onRemoveFavorite,
}: FavoriteCandidatesSectionProps) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 sm:p-8">
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-rose-200/30 via-amber-100/30 to-transparent dark:from-rose-400/10 dark:via-amber-300/10" />

      <div className="relative">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Favoris</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white">
              Les candidats que vous suivez
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Retrouvez ici vos profils politiques mis de cote pour revenir vite sur leurs positions,
              interventions et evolutions de campagne.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 self-start rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-300">
            <span className="material-symbols-outlined text-[18px] text-rose-500">favorite</span>
            {candidates.length} suivi{candidates.length > 1 ? 's' : ''}
          </div>
        </div>

        <div className="mt-6">
          {isLoading ? <FavoriteCandidatesSkeleton /> : null}

          {!isLoading && errorMessage ? (
            <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-300">
              {errorMessage}
            </p>
          ) : null}

          {!isLoading && !errorMessage && candidates.length === 0 ? (
            <div className="rounded-[1.6rem] border border-dashed border-slate-300 bg-slate-50/80 p-6 text-center dark:border-slate-700 dark:bg-slate-950/40">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-[24px]">favorite</span>
              </div>
              <h3 className="mt-4 text-lg font-bold tracking-tight text-slate-950 dark:text-white">
                Aucun candidat suivi pour l'instant
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                Ouvrez une fiche candidat puis utilisez le bouton de suivi pour le retrouver ici.
              </p>
              <Link
                to="/"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary dark:bg-white dark:text-slate-950"
              >
                <span className="material-symbols-outlined text-[18px]">travel_explore</span>
                Explorer les candidats
              </Link>
            </div>
          ) : null}

          {!isLoading && !errorMessage && candidates.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {candidates.map((candidate) => (
                <FavoriteCandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  isRemoving={removingCandidateId === candidate.id}
                  onRemoveFavorite={onRemoveFavorite}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
