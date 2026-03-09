export function CommunicationStyleSection() {
  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <h2 className="text-lg sm:text-xl font-bold">Style de Communication</h2>
        <span className="text-xs text-primary font-bold">Méthodologie IA</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-500 mb-1">Technicité</p>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold">78%</span>
            <span className="material-symbols-outlined text-emerald-500 text-sm mb-1">trending_up</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-2">
            <div className="bg-primary h-full rounded-full" style={{ width: '78%' }}></div>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-500 mb-1">Empathie</p>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold">42%</span>
            <span className="material-symbols-outlined text-amber-500 text-sm mb-1">trending_flat</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-2">
            <div className="bg-primary h-full rounded-full" style={{ width: '42%' }}></div>
          </div>
        </div>
      </div>

      <div className="mt-3 p-3 bg-primary/5 rounded-lg">
        <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300 italic">
          "Analyse basée sur les 50 derniers discours officiels. Utilisation fréquente de termes économiques complexes et structures syntaxiques élaborées."
        </p>
      </div>
    </section>
  )
}
