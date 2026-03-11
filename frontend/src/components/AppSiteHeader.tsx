import { Compass } from 'lucide-react'
import { Link } from 'react-router-dom'
import { appNavItems } from '../navigation/appNavItems'
import { DesktopAppTabs } from './DesktopAppTabs'

interface AppSiteHeaderProps {
  className?: string
  containerClassName?: string
}

export function AppSiteHeader({
  className = '',
  containerClassName = 'w-full',
}: AppSiteHeaderProps) {
  return (
    <header
      className={`sticky top-0 z-50 border-b border-slate-200/70 bg-white/84 px-4 py-3 backdrop-blur-md dark:border-slate-800 dark:bg-background-dark/86 ${className}`.trim()}
    >
      <div className={`mx-auto flex ${containerClassName} items-center justify-between gap-4`}>
        <Link
          to="/"
          className="group flex min-w-0 items-center gap-3"
          aria-label="Retour à l’accueil Présidentielles 2027"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-blue-600 text-white shadow-[0_16px_36px_rgba(26,34,127,0.24)] transition-transform duration-300 group-hover:-translate-y-0.5">
            <Compass className="h-[22px] w-[22px]" />
          </div>

          <div className="min-w-0">
            <span className="block text-lg font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-xl">
              Présidentielles 2027
            </span>
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
              Candidats, sondages et intentions de vote
            </p>
          </div>
        </Link>

        <DesktopAppTabs items={appNavItems} />
      </div>
    </header>
  )
}
