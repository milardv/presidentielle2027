import { Compass, UserRound } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
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
  const primaryNavItems = appNavItems.filter((item) => item.to !== '/profile')

  return (
    <header
      className={`sticky top-0 z-50 border-b border-slate-200/80 bg-white/92 px-4 py-3 backdrop-blur-md dark:border-slate-800 dark:bg-background-dark/92 ${className}`.trim()}
    >
      <div
        className={`mx-auto grid ${containerClassName} grid-cols-[minmax(0,1fr)_auto] items-center gap-4 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]`.trim()}
      >
        <Link
          to="/"
          className="group flex min-w-0 items-center gap-3"
          aria-label="Retour à l’accueil Présidentielles 2027"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white shadow-[0_16px_36px_rgba(236,91,19,0.20)] transition-transform duration-300 group-hover:-translate-y-0.5">
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

        <DesktopAppTabs items={primaryNavItems} className="justify-self-center" />

        <div className="flex items-center justify-end">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold transition-all duration-300 ${
                isActive
                  ? 'border-primary bg-primary text-white shadow-[0_12px_24px_rgba(236,91,19,0.22)]'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-primary/30 hover:text-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
              }`
            }
            aria-label="Ouvrir mon profil"
          >
            <UserRound className="h-[18px] w-[18px]" />
            <span className="hidden sm:inline">Profil</span>
          </NavLink>
        </div>
      </div>
    </header>
  )
}
