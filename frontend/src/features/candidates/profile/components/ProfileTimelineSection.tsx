import type { CandidateTimelineEvent } from '../../../../data/candidateTypes'
import { formatFrenchDate } from '../../shared/candidateUi'
import { ProfileSectionHeading } from './ProfileSectionHeading'

interface ProfileTimelineSectionProps {
  candidateId: string
  timeline: CandidateTimelineEvent[]
}

export function ProfileTimelineSection({ candidateId, timeline }: ProfileTimelineSectionProps) {
  return (
    <section id="evolution" className="scroll-mt-40">
      <ProfileSectionHeading icon="timeline" title="Évolution des positions" />

      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-4 sm:before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/50 before:via-primary/20 before:to-transparent">
        {timeline.map((event, index) => (
          <div key={`${candidateId}-evolution-${index}`} className="relative flex items-start group">
            <div className="absolute left-0 mt-1.5 size-8 sm:size-10 rounded-full border-4 border-background-light dark:border-background-dark bg-primary flex items-center justify-center z-10">
              <span className="material-symbols-outlined text-white text-xs sm:text-sm">check</span>
            </div>

            <div className="ml-11 sm:ml-14 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm w-full">
              <div className="flex flex-wrap justify-between items-start mb-2 gap-3">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                  {formatFrenchDate(event.date)}
                </span>
                <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500">
                  Documenté
                </span>
              </div>

              <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1">{event.title}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{event.description}</p>

              <div className="border-l-4 border-primary/30 pl-3 py-1 bg-primary/5 rounded-r-lg">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-1 gap-2">
                  <a
                    className="text-[10px] text-primary hover:underline flex items-center gap-1 break-words"
                    href={event.source.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="material-symbols-outlined text-[12px]">link</span>
                    Source : {event.source.label}
                  </a>
                  <span className="text-[10px] text-slate-400 italic">
                    {formatFrenchDate(event.source.date)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
