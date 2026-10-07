import { BarChart3, BrainCircuit, Home, Newspaper, UserRound, Vote } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import type { DesktopAppTabItem } from './DesktopAppTabs'

interface MobileAppNavProps {
  items: DesktopAppTabItem[]
  className?: string
}

export function MobileAppNav({ items, className = '' }: MobileAppNavProps) {
  const icons = { home: Home, poll: BarChart3, news: Newspaper, quiz: Vote, challenge: BrainCircuit, person: UserRound }
  return (
    <nav
      aria-label="Navigation mobile"
      className={`fixed bottom-0 left-0 right-0 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md px-2 pb-safe pt-2 z-50 md:hidden ${className}`.trim()}
    >
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
        {items.map((item) => {
          const Icon = icons[item.icon as keyof typeof icons] ?? Home
          return (
          <NavLink
            key={`${item.label}-${item.to}`}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 py-1 transition-colors ${
                isActive ? 'text-primary' : 'text-slate-400 dark:text-slate-500'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={21} strokeWidth={isActive ? 2.3 : 1.8} aria-hidden="true" />
                <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
              </>
            )}
          </NavLink>
        )})}
      </div>
    </nav>
  )
}
