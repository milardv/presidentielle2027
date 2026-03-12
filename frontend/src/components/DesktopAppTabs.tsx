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
      className={`hidden md:flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1.5 shadow-[0_14px_34px_rgba(15,23,42,0.08)] ${className}`.trim()}
    >
      {items.map((item) => (
        <NavLink
          key={`${item.label}-${item.to}`}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            `inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold transition-all duration-300 ${
              isActive
                ? 'bg-primary text-white shadow-[0_12px_24px_rgba(236,91,19,0.22)]'
                : 'text-slate-500 hover:-translate-y-0.5 hover:bg-slate-50 hover:text-primary'
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
