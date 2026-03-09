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
    <nav
      aria-label="Navigation principale"
      className={`hidden md:flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 p-1 shadow-sm ${className}`.trim()}
    >
      {items.map((item) => (
        <NavLink
          key={`${item.label}-${item.to}`}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            `inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
              isActive
                ? 'bg-primary text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-primary hover:bg-primary/10'
            }`
          }
        >
          <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
