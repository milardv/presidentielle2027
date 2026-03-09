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
      className={`hidden md:flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/75 p-1.5 shadow-[0_14px_34px_rgba(15,23,42,0.10)] backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/78 ${className}`.trim()}
    >
      {items.map((item) => (
        <NavLink
          key={`${item.label}-${item.to}`}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            `inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold transition-all duration-300 ${
              isActive
                ? 'bg-gradient-to-r from-primary to-blue-600 text-white shadow-[0_12px_24px_rgba(26,34,127,0.28)]'
                : 'text-slate-500 dark:text-slate-400 hover:-translate-y-0.5 hover:bg-white hover:text-primary dark:hover:bg-slate-800'
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
