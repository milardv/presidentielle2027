import { DesktopAppTabs } from '../../../../components/DesktopAppTabs'
import { appNavItems } from '../../../../navigation/appNavItems'

export function HomeHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-primary/10 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-2xl sm:text-3xl">explore</span>
          <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-primary">
            La Boussole <span className="text-slate-500">2027</span>
          </h1>
        </div>
        <DesktopAppTabs items={appNavItems} />
      </div>
    </header>
  )
}
