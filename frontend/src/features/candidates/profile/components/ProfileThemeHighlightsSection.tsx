import type { CandidateThemeHighlight } from '../../../../data/candidateTypes'
import { formatFrenchDate } from '../../shared/candidateUi'
import { ProfileSectionHeading } from './ProfileSectionHeading'

interface ProfileThemeHighlightsSectionProps {
  candidateId: string
  entries: CandidateThemeHighlight[]
}

export function ProfileThemeHighlightsSection({
  candidateId,
  entries,
}: ProfileThemeHighlightsSectionProps) {
  return (
    <section id="themes" className="scroll-mt-40">
      <ProfileSectionHeading icon="flare" title="Thèmes de campagne" />

      <div className="grid gap-4 md:grid-cols-2">
        {entries.map((entry, index) => (
          <article
            key={`${candidateId}-theme-${index}`}
            className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900"
          >
            <h4 className="font-semibold text-slate-900 dark:text-slate-100">{entry.theme}</h4>
            <p className="text-sm mt-2 text-slate-700 dark:text-slate-300">{entry.analysis}</p>
            <div className="mt-3 flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-3 sm:items-center">
              <a
                href={entry.source.url}
                target="_blank"
                rel="noreferrer"
                className="text-primary text-xs font-semibold hover:underline break-words"
              >
                {entry.source.label}
              </a>
              <span className="text-[11px] text-slate-400">{formatFrenchDate(entry.source.date)}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
