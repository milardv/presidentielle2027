import type { ReactNode } from 'react'
import { AtSign, ExternalLink, Newspaper, PlayCircle } from 'lucide-react'
import type { CandidateIntervention } from '../../../../data/candidateTypes'
import { formatFrenchDate } from '../../shared/candidateUi'
import { ProfileSectionHeading } from './ProfileSectionHeading'

interface ProfileInterventionsSectionProps {
  candidateId: string
  entries: CandidateIntervention[]
}

const interventionTypeLabel: Record<CandidateIntervention['type'], string> = {
  video: 'Vidéo',
  quote: 'Presse',
  post: 'Post',
}

const interventionTypeIcon: Record<CandidateIntervention['type'], ReactNode> = {
  video: <PlayCircle className="h-[14px] w-[14px]" />,
  quote: <Newspaper className="h-[14px] w-[14px]" />,
  post: <AtSign className="h-[14px] w-[14px]" />,
}

function isGdeltIntervention(entry: CandidateIntervention): boolean {
  return entry.id.startsWith('gdelt-')
}

export function ProfileInterventionsSection({
  candidateId,
  entries,
}: ProfileInterventionsSectionProps) {
  if (entries.length === 0) {
    return (
      <section id="interventions" className="scroll-mt-40">
        <ProfileSectionHeading icon="mic" title="Interventions" />
        <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 text-sm text-slate-500 dark:text-slate-400">
          Aucune intervention médiatique documentée pour le moment.
        </div>
      </section>
    )
  }

  return (
    <section id="interventions" className="scroll-mt-40">
      <ProfileSectionHeading icon="mic" title="Interventions" />

      <div className="grid gap-4">
        {entries.map((entry, index) => (
          <article
            key={`${candidateId}-intervention-${entry.id}-${index}`}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                    {interventionTypeIcon[entry.type]}
                    {interventionTypeLabel[entry.type]}
                  </div>
                  {isGdeltIntervention(entry) ? (
                    <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
                      Source: GDELT
                    </span>
                  ) : null}
                </div>
                <h4 className="mt-3 text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  {entry.title}
                </h4>
              </div>

              <span className="text-[11px] text-slate-400">{formatFrenchDate(entry.source.date)}</span>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {entry.excerpt}
            </p>
            <p className="mt-3 rounded-lg bg-slate-50 dark:bg-slate-950/40 px-3 py-2 text-sm text-slate-600 dark:text-slate-400">
              {entry.context}
            </p>

            <div className="mt-4">
              <a
                href={entry.source.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                <ExternalLink className="h-[16px] w-[16px]" />
                {entry.source.label}
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
