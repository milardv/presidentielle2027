import type { Candidate } from '../../../../data/candidateTypes'
import { ProfileSectionHeading } from './ProfileSectionHeading'

interface ProfileBioSectionProps {
  candidate: Candidate
}

export function ProfileBioSection({ candidate }: ProfileBioSectionProps) {
  const parentBackground = candidate.parentBackground ?? []
  const childhoodInterests = candidate.childhoodInterests ?? []

  return (
    <section id="resume" className="scroll-mt-40">
      <ProfileSectionHeading icon="person" title="Biographie et résumé politique" />

      <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm leading-relaxed text-slate-700 dark:text-slate-300">
        <p className="mb-4">{candidate.summary}</p>

        {(candidate.childhoodCity || parentBackground.length > 0) && (
          <div className="mb-5 grid gap-3 md:grid-cols-2">
            {candidate.childhoodCity && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/40">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                  Ville d&apos;enfance
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {candidate.childhoodCity}
                </p>
              </div>
            )}

            {parentBackground.length > 0 && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/40">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                  Professions des parents
                </p>
                <ul className="mt-2 space-y-1 text-sm text-slate-700 dark:text-slate-300">
                  {parentBackground.map((entry, index) => (
                    <li key={`${candidate.id}-parent-${entry.relation}-${index}`}>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{entry.relation} :</span>{' '}
                      {entry.profession}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {childhoodInterests.length > 0 && (
          <div className="mb-5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/40">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
              Centres d&apos;intérêt repérés dans l&apos;enfance
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {childhoodInterests.map((entry, index) => (
                <span
                  key={`${candidate.id}-interest-${entry.label}-${index}`}
                  className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-700"
                >
                  {entry.label}
                </span>
              ))}
            </div>
          </div>
        )}

        <ul className="space-y-2 mb-4 text-sm">
          {candidate.biography.map((paragraph, index) => (
            <li key={`${candidate.id}-bio-${index}`} className="flex gap-2">
              <span className="text-primary">-</span>
              <span>{paragraph}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2">
          {candidate.themes.map((theme) => (
            <span
              key={`${candidate.id}-tag-${theme}`}
              className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs font-semibold"
            >
              {theme}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
