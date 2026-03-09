import { Link } from 'react-router-dom'
import { DesktopAppTabs } from '../../../../components/DesktopAppTabs'
import { appNavItems } from '../../../../navigation/appNavItems'

export function ProfilePageHeader() {
  return (
    <>
      <div className="bg-primary/10 border-b border-primary/20 px-4 py-2 text-center">
        <p className="text-xs font-medium text-primary uppercase tracking-wider italic">
          <span className="material-symbols-outlined text-xs align-middle mr-1">info</span>
          Outil informatif - données issues de sources publiques
        </p>
      </div>

      <header className="sticky top-0 z-50 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-primary">
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="hidden sm:inline">Retour</span>
          </Link>
          <h1 className="font-bold text-center text-sm sm:text-base">Fiche candidat</h1>
          <DesktopAppTabs items={appNavItems} className="shadow-none" />
          <div className="w-8 md:hidden sm:w-14" />
        </div>
      </header>
    </>
  )
}
