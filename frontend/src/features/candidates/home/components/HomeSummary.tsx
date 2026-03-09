interface HomeSummaryProps {
  totalCount: number
  declaredCount: number
  conditionalCount: number
  lastUpdateLabel: string
}

export function HomeSummary({
  totalCount,
  declaredCount,
  conditionalCount,
  lastUpdateLabel,
}: HomeSummaryProps) {
  return (
    <section className="py-6 border-b border-slate-200 dark:border-slate-800">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Candidats connus - présidentielle 2027
          </h2>
          <p className="text-slate-500 text-sm mt-1 leading-relaxed">
            {totalCount} profils documentés ({declaredCount} déclarations publiques, {conditionalCount}{' '}
            candidatures conditionnelles).
          </p>
        </div>
        <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold border border-green-100 dark:border-green-900/30 self-start max-w-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="break-words">MISE A JOUR DES DONNEES : {lastUpdateLabel}</span>
        </div>
      </div>
    </section>
  )
}
