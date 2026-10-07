import { NavLink } from 'react-router-dom'

export interface DesktopAppTabItem {
  label: string
  to: string
  icon: string
  end?: boolean
}

interface DesktopAppTabsProps {
  items: DesktopAppTabItem[]
  className?: string
}

export function DesktopAppTabs({ items, className = '' }: DesktopAppTabsProps) {
  return (
    <nav aria-label="Navigation principale" className={`edition-desktop-nav ${className}`.trim()}>
      {items.map((item) => (
        <NavLink key={`${item.label}-${item.to}`} to={item.to} end={item.end} className={({ isActive }) => `edition-nav-link ${isActive ? 'is-active' : ''}`}>
          {item.label === 'Sondage' ? 'Sondages' : item.label}
        </NavLink>
      ))}
    </nav>
  )
}
