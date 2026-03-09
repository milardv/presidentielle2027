import { Link } from 'react-router-dom'
import { DesktopAppTabs } from '../../../components/DesktopAppTabs'
import { appNavItems } from '../../../navigation/appNavItems'

export function AnalysisHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">analytics</span>
          <h1 className="text-lg font-bold tracking-tight">Analyse Candidat</h1>
        </div>

        <div className="flex items-center gap-3">
          <DesktopAppTabs items={appNavItems} className="shadow-none" />
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-full">
            <span className="text-[10px] font-bold px-2 text-slate-500 uppercase">Neutralité</span>
            <button className="w-10 h-5 bg-primary rounded-full relative" type="button" aria-label="Basculer la neutralité">
              <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto no-scrollbar">
        <Link to="/analysis" className="border-b-2 border-primary pb-2 text-sm font-bold text-primary whitespace-nowrap">
          Réseau d'influence
        </Link>
        <Link to="/analysis" className="border-b-2 border-transparent pb-2 text-sm font-medium text-slate-500 whitespace-nowrap">
          Rhétorique
        </Link>
        <Link to="/analysis" className="border-b-2 border-transparent pb-2 text-sm font-medium text-slate-500 whitespace-nowrap">
          Fact-checking
        </Link>
      </div>
    </header>
  )
}
