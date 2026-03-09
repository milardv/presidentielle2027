export function InfluenceMapSection() {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg sm:text-xl font-bold">Cartographie des Alliances</h2>
        <span className="material-symbols-outlined text-slate-400">info</span>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
        <div className="relative h-64 sm:h-72 w-full flex items-center justify-center">
          <div className="z-10 w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
            <span className="font-bold">Candidat</span>
          </div>

          <svg className="absolute inset-0 w-full h-full stroke-slate-300 dark:stroke-slate-600" fill="none" strokeWidth="1">
            <line x1="50%" x2="20%" y1="50%" y2="20%"></line>
            <line x1="50%" x2="80%" y1="50%" y2="30%"></line>
            <line x1="50%" x2="15%" y1="50%" y2="70%"></line>
            <line x1="50%" x2="75%" y1="50%" y2="80%"></line>
          </svg>

          <div className="absolute top-6 left-4 sm:top-8 sm:left-12 p-2 bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-slate-100 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span className="text-[11px] sm:text-xs font-semibold">Think Tank A</span>
          </div>
          <div className="absolute top-12 right-3 sm:top-16 sm:right-8 p-2 bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-slate-100 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span className="text-[11px] sm:text-xs font-semibold">Conseiller Clé</span>
          </div>
          <div className="absolute bottom-20 left-1 sm:left-4 p-2 bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-slate-100 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
            <span className="text-[11px] sm:text-xs font-semibold">Partenaire Privé</span>
          </div>
          <div className="absolute bottom-10 right-4 sm:bottom-12 sm:right-12 p-2 bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-slate-100 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            <span className="text-[11px] sm:text-xs font-semibold">Média Affilié</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <p className="text-[10px] text-slate-500 uppercase font-bold mb-2">Sources vérifiées</p>
          <div className="flex flex-wrap gap-2">
            <span className="text-[11px] px-2 py-1 bg-primary/10 text-primary rounded-full">
              Registre Transparence
            </span>
            <span className="text-[11px] px-2 py-1 bg-primary/10 text-primary rounded-full">Décl. HATVP</span>
          </div>
        </div>
      </div>
    </section>
  )
}
