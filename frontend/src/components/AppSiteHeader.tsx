import { ArrowUpRight, UserRound } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { appNavItems } from '../navigation/appNavItems'
import { DesktopAppTabs } from './DesktopAppTabs'

interface AppSiteHeaderProps {
  className?: string
  containerClassName?: string
}

export function AppSiteHeader({ className = '', containerClassName = 'w-full' }: AppSiteHeaderProps) {
  const primaryNavItems = appNavItems.filter((item) => item.to !== '/profile')

  return (
    <header className={`edition-site-header ${className}`.trim()}>
      <div className={`edition-header-inner ${containerClassName}`.trim()}>
        <Link to="/" className="edition-brand" aria-label="Accueil Présidentielle 2027">
          <span className="edition-brand-mark" aria-hidden="true">27<span>.</span></span>
          <span className="edition-brand-name">Présidentielle <b>2027</b><small>Le dossier politique</small></span>
        </Link>
        <DesktopAppTabs items={primaryNavItems} />
        <div className="edition-header-actions">
          <Link to="/sources" className="edition-sources-link">Nos sources <ArrowUpRight size={15} /></Link>
          <NavLink to="/profile" className={({ isActive }) => `edition-profile-link ${isActive ? 'is-active' : ''}`} aria-label="Ouvrir mon profil">
            <UserRound size={18} /><span>Mon profil</span>
          </NavLink>
        </div>
      </div>
    </header>
  )
}
