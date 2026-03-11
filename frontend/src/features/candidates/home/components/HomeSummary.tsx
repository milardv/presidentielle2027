interface HomeSummaryProps {
  totalCount: number
  declaredCount: number
  conditionalCount: number
  lastUpdateLabel: string
}

export function HomeSummary(_props: HomeSummaryProps) {
  return (
    <section className="relative overflow-hidden py-6 sm:py-8">
      <div className="absolute inset-x-0 top-8 h-[22rem] rounded-[2rem] bg-[radial-gradient(circle_at_top_left,_rgba(26,34,127,0.14),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(245,158,11,0.14),_transparent_28%)] pointer-events-none" />

      <div className="relative rounded-[2rem] border border-slate-200/80 bg-white/88 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/88 sm:p-8">
        <div className="grid gap-8 lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
              Candidats, sondages et intentions de vote 2027
            </div>
            <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-[2.85rem] lg:leading-[1.05]">
              Qui sont les candidats aux présidentielles 2027 ?
            </h2>
            <div className="mt-5 inline-flex max-w-2xl items-start gap-3 rounded-[1.4rem] border border-slate-200/80 bg-slate-50/80 px-4 py-3 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300">
              <span className="material-symbols-outlined text-primary">lightbulb</span>
              <p>Candidats présidentielle 2027, sondages, intentions de vote, vidéos, tweets et analyses, au même endroit.</p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-slate-950 px-3 py-1.5 text-xs font-semibold text-white dark:bg-white dark:text-slate-950">
                Comparer plus vite
              </span>
              <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
                Vérifier les sources
              </span>
              <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
                Suivre la campagne
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
