import { AnalysisHeader } from '../features/analysis/components/AnalysisHeader'
import { AnalysisMobileNav } from '../features/analysis/components/AnalysisMobileNav'
import { CommunicationStyleSection } from '../features/analysis/components/CommunicationStyleSection'
import { FactCheckSection } from '../features/analysis/components/FactCheckSection'
import { InfluenceMapSection } from '../features/analysis/components/InfluenceMapSection'

export default function Analysis() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white dark:bg-slate-900 min-h-screen md:min-h-[calc(100dvh-3rem)] md:my-6 md:rounded-2xl md:border md:border-slate-200 md:dark:border-slate-800 md:shadow-xl flex flex-col overflow-hidden">
        <AnalysisHeader />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 pb-24 md:pb-8">
          <InfluenceMapSection />
          <CommunicationStyleSection />
          <FactCheckSection />
        </main>

        <AnalysisMobileNav />
      </div>
    </div>
  )
}
