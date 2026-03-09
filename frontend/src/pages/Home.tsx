import { HomeAlert } from '../features/candidates/home/components/HomeAlert'
import { CandidatesGrid } from '../features/candidates/home/components/CandidatesGrid'
import { HomeDesktopFooter } from '../features/candidates/home/components/HomeDesktopFooter'
import { HomeEmptyState } from '../features/candidates/home/components/HomeEmptyState'
import { HomeHeader } from '../features/candidates/home/components/HomeHeader'
import { HomeLoadingGrid } from '../features/candidates/home/components/HomeLoadingGrid'
import { HomeMobileNav } from '../features/candidates/home/components/HomeMobileNav'
import { HomeSummary } from '../features/candidates/home/components/HomeSummary'
import { useCandidates } from '../features/candidates/home/hooks/useCandidates'
import { formatFrenchDate } from '../features/candidates/shared/candidateUi'

export default function Home() {
  const {
    candidates,
    isLoading,
    loadError,
    declaredCount,
    conditionalCount,
    lastUpdated,
  } = useCandidates()

  const lastUpdateLabel = lastUpdated ? formatFrenchDate(lastUpdated) : 'Non disponible'

  return (
    <div className="relative min-h-screen bg-background-light font-display text-slate-900 dark:bg-background-dark dark:text-slate-100">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top_left,_rgba(26,34,127,0.10),_transparent_36%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.08),_transparent_28%),radial-gradient(circle_at_40%_40%,_rgba(245,158,11,0.08),_transparent_24%)]" />
      <HomeHeader />

      <main className="relative max-w-7xl mx-auto px-4 pb-28 md:pb-24">
        <HomeSummary
          totalCount={candidates.length}
          declaredCount={declaredCount}
          conditionalCount={conditionalCount}
          lastUpdateLabel={lastUpdateLabel}
        />

        {loadError && <HomeAlert tone="error" message={loadError} />}

        {isLoading && <HomeLoadingGrid />}
        {!isLoading && !loadError && candidates.length === 0 && <HomeEmptyState />}
        {!isLoading && !loadError && candidates.length > 0 && <CandidatesGrid candidates={candidates} />}
      </main>

      <HomeMobileNav />
      <HomeDesktopFooter />
    </div>
  )
}
