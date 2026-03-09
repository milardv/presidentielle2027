import type { Candidate } from '../../../../data/candidateTypes'
import { ProfileSectionHeading } from './ProfileSectionHeading'

interface ProfileBioSectionProps {
  candidate: Candidate
}

export function ProfileBioSection({ candidate }: ProfileBioSectionProps) {
  return (
    <section id="resume" className="scroll-mt-40">
      <ProfileSectionHeading icon="person" title="Biographie et résumé politique" />

      <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm leading-relaxed text-slate-700 dark:text-slate-300">
        <p className="mb-4">{candidate.summary}</p>
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
