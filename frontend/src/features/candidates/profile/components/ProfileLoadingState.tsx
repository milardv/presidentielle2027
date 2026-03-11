import { ProfileSimpleHeader } from './ProfileSimpleHeader'
import { MobileAppNav } from '../../../../components/MobileAppNav'
import { appNavItems } from '../../../../navigation/appNavItems'

export function ProfileLoadingState() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen">
      <ProfileSimpleHeader title="Profil candidat" />

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-5">
        <div className="h-32 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
        <div className="h-24 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
        <div className="h-40 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
      </main>

      <MobileAppNav items={appNavItems} />
    </div>
  )
}
