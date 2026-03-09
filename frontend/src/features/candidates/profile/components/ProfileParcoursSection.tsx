import type { CandidateParcoursStep } from '../../../../data/candidateTypes'
import { ProfileSectionHeading } from './ProfileSectionHeading'

interface ProfileParcoursSectionProps {
  candidateId: string
  entries: CandidateParcoursStep[]
}

export function ProfileParcoursSection({ candidateId, entries }: ProfileParcoursSectionProps) {
  return (
    <section id="parcours" className="scroll-mt-40">
      <ProfileSectionHeading icon="route" title="Parcours" />

      <div className="space-y-4">
        {entries.map((step, index) => (
          <article
            key={`${candidateId}-parcours-${index}`}
            className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">{step.period}</span>
              <span className="text-[11px] text-slate-400">{step.institution}</span>
            </div>

            <h4 className="font-semibold text-slate-900 dark:text-slate-100 mt-1">{step.role}</h4>
            <p className="text-sm mt-2 text-slate-700 dark:text-slate-300">{step.summary}</p>

            <a
              href={step.source.url}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:underline"
            >
              <span className="material-symbols-outlined text-sm">link</span>
              Source : {step.source.label}
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
