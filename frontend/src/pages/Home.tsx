import { useEffect } from 'react'
import { HomeAlert } from '../features/candidates/home/components/HomeAlert'
import { CandidatesGrid } from '../features/candidates/home/components/CandidatesGrid'
import { HomeDesktopFooter } from '../features/candidates/home/components/HomeDesktopFooter'
import { HomeEmptyState } from '../features/candidates/home/components/HomeEmptyState'
import { HomeHeader } from '../features/candidates/home/components/HomeHeader'
import { HomeLoadingGrid } from '../features/candidates/home/components/HomeLoadingGrid'
import { HomeMobileNav } from '../features/candidates/home/components/HomeMobileNav'
import { HomeSeoLinksSection } from '../features/candidates/home/components/HomeSeoLinksSection'
import { HomeSummary } from '../features/candidates/home/components/HomeSummary'
import { useCandidates } from '../features/candidates/home/hooks/useCandidates'
import { formatFrenchDate } from '../features/candidates/shared/candidateUi'
import { SeoHead } from '../seo/SeoHead'

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

  useEffect(() => {
    document.documentElement.classList.add('home-viewport-scrollbar-hidden')
    document.body.classList.add('home-viewport-scrollbar-hidden')

    return () => {
      document.documentElement.classList.remove('home-viewport-scrollbar-hidden')
      document.body.classList.remove('home-viewport-scrollbar-hidden')
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-background-light font-display text-slate-900 dark:bg-background-dark dark:text-slate-100">
      <SeoHead
        title="Présidentielle 2027 : candidats, sondages, intentions de vote et analyses"
        description="Présidentielle 2027 : retrouvez les candidats suivis, les sondages, les intentions de vote, les profils détaillés, les vidéos, les tweets et les analyses de campagne."
        path="/"
        keywords={[
          'présidentielle 2027',
          'élections présidentielles 2027',
          'candidats présidentielle 2027',
          'sondage présidentielle 2027',
          'intentions de vote 2027',
        ]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Présidentielle 2027 : candidats et sondages',
          description:
            'Hub de suivi des candidats, des sondages et des principales questions autour de la présidentielle 2027.',
          inLanguage: 'fr-FR',
        }}
      />
      <HomeHeader />

      <main className="relative w-full px-4 pb-28 md:pb-24">
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
        <HomeSeoLinksSection />
      </main>

      <HomeMobileNav />
      <HomeDesktopFooter />
    </div>
  )
}
