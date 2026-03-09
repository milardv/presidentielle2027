import type { Candidate } from '../../../../data/candidateTypes'
import { CandidateCard } from './CandidateCard'

interface CandidatesGridProps {
  candidates: Candidate[]
}

export function CandidatesGrid({ candidates }: CandidatesGridProps) {
  return (
    <section className="grid items-stretch gap-4 py-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {candidates.map((candidate) => (
        <CandidateCard key={candidate.id} candidate={candidate} />
      ))}
    </section>
  )
}
