interface HomeSummaryProps {
  totalCount: number
  declaredCount: number
  conditionalCount: number
  lastUpdateLabel: string
}

function SummaryStat({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="rounded-[1.5rem] border border-white/70 bg-white/82 p-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/78">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">{label}</p>
        <span className="material-symbols-outlined text-[18px] text-primary">{icon}</span>
      </div>
      <p className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white">{value}</p>
    </div>
  )
}

export function HomeSummary({
  totalCount,
  declaredCount,
  conditionalCount,
  lastUpdateLabel,
}: HomeSummaryProps) {
  return (
    <section className="relative overflow-hidden py-6 sm:py-8">
      <div className="absolute inset-x-0 top-8 h-[22rem] rounded-[2rem] bg-[radial-gradient(circle_at_top_left,_rgba(26,34,127,0.14),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(245,158,11,0.14),_transparent_28%)] pointer-events-none" />

      <div className="relative rounded-[2rem] border border-slate-200/80 bg-white/88 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/88 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.95fr)] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
              Vue d'ensemble
            </div>
            <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Les candidats connus, leurs statuts et leurs profils, dans une interface plus claire.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
              Suivez les candidatures deja declarees, les intentions qui montent et les profils a surveiller,
              avec des fiches detaillees, des interventions medias et des donnees chargees depuis Firestore.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-2">
            <SummaryStat label="Profils" value={`${totalCount}`} icon="groups" />
            <SummaryStat label="Declares" value={`${declaredCount}`} icon="campaign" />
            <SummaryStat label="Conditionnels" value={`${conditionalCount}`} icon="rule" />
            <div className="rounded-[1.5rem] border border-emerald-100 bg-emerald-50/90 p-4 shadow-sm dark:border-emerald-900/40 dark:bg-emerald-950/28 lg:col-span-2">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                </span>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em]">Mise a jour des donnees</p>
              </div>
              <p className="mt-3 text-lg font-bold tracking-tight text-emerald-900 dark:text-emerald-100">
                {lastUpdateLabel}
              </p>
              <p className="mt-2 text-sm text-emerald-700/90 dark:text-emerald-300/90">
                Les profils candidats sont lus a la demande depuis la base Firestore.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
