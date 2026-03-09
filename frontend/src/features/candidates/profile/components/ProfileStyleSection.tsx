import type { CandidateStyleSignal } from '../../../../data/candidateTypes'
import { formatFrenchDate } from '../../shared/candidateUi'
import { ProfileSectionHeading } from './ProfileSectionHeading'

interface ProfileStyleSectionProps {
  candidateId: string
  entries: CandidateStyleSignal[]
}

export function ProfileStyleSection({ candidateId, entries }: ProfileStyleSectionProps) {
  return (
    <section id="style" className="scroll-mt-40">
      <ProfileSectionHeading icon="stylus_note" title="Style politique" />

      <div className="space-y-4">
        {entries.map((entry, index) => (
          <article
            key={`${candidateId}-style-${index}`}
            className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h4 className="font-semibold text-slate-900 dark:text-slate-100">{entry.axis}</h4>
              <span className="text-[11px] text-slate-400">{formatFrenchDate(entry.source.date)}</span>
            </div>

            <p className="text-sm mt-2 text-slate-700 dark:text-slate-300">{entry.description}</p>
            <a
              href={entry.source.url}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:underline"
            >
              <span className="material-symbols-outlined text-sm">link</span>
              Source : {entry.source.label}
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
