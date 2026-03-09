import type { CandidateNetworkRelation } from '../../../../data/candidateTypes'
import { formatFrenchDate } from '../../shared/candidateUi'
import { ProfileSectionHeading } from './ProfileSectionHeading'

interface ProfileNetworkSectionProps {
  candidateId: string
  entries: CandidateNetworkRelation[]
}

export function ProfileNetworkSection({ candidateId, entries }: ProfileNetworkSectionProps) {
  return (
    <section id="reseau" className="scroll-mt-40">
      <ProfileSectionHeading icon="group" title="Réseau politique" />

      <div className="space-y-4">
        {entries.map((entry, index) => (
          <article
            key={`${candidateId}-network-${index}`}
            className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-slate-100">{entry.actor}</h4>
                <p className="text-xs uppercase tracking-wider text-primary font-bold mt-1">{entry.role}</p>
              </div>
              <span className="text-[11px] text-slate-400">{formatFrenchDate(entry.source.date)}</span>
            </div>

            <p className="text-sm mt-2 text-slate-700 dark:text-slate-300">{entry.relation}</p>
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
