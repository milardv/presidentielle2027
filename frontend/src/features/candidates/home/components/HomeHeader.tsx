import { DesktopAppTabs } from '../../../../components/DesktopAppTabs'
import { appNavItems } from '../../../../navigation/appNavItems'

export function HomeHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/84 px-4 py-3 backdrop-blur-md dark:border-slate-800 dark:bg-background-dark/86">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-blue-600 text-white shadow-[0_16px_36px_rgba(26,34,127,0.24)]">
            <span className="material-symbols-outlined text-[24px]">explore</span>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
              Presidentielle 2027
            </div>
            <h1 className="mt-2 text-lg font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-xl">
              La Boussole <span className="text-slate-500 dark:text-slate-400">des candidatures</span>
            </h1>
          </div>
        </div>

        <DesktopAppTabs items={appNavItems} />
      </div>
    </header>
  )
}
