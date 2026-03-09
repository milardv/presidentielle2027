import type { CandidateSource } from '../../../../data/candidateTypes'
import { formatFrenchDate, sourceKey } from '../../shared/candidateUi'
import { ProfileSectionHeading } from './ProfileSectionHeading'

interface ProfileSourcesSectionProps {
  sources: CandidateSource[]
}

export function ProfileSourcesSection({ sources }: ProfileSourcesSectionProps) {
  return (
    <section id="sources" className="scroll-mt-40">
      <ProfileSectionHeading icon="library_books" title="Sources principales" />

      <ul className="space-y-3">
        {sources.map((source, index) => (
          <li
            key={sourceKey(source, index)}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-3"
          >
            <a
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-primary font-semibold hover:underline break-words"
            >
              {source.label}
            </a>
            <span className="text-[11px] text-slate-400">{formatFrenchDate(source.date)}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
