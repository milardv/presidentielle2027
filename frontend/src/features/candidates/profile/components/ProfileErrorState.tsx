import { Link } from 'react-router-dom'
import { MobileAppNav } from '../../../../components/MobileAppNav'
import { appNavItems } from '../../../../navigation/appNavItems'
import { ProfileSimpleHeader } from './ProfileSimpleHeader'

interface ProfileErrorStateProps {
  errorMessage: string
}

export function ProfileErrorState({ errorMessage }: ProfileErrorStateProps) {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen">
      <ProfileSimpleHeader title="Profil candidat" />

      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700 text-sm">{errorMessage}</div>
        <div className="mt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold"
          >
            <span className="material-symbols-outlined text-base">home</span>
            Retour à l’accueil
          </Link>
        </div>
      </main>

      <MobileAppNav items={appNavItems} />
    </div>
  )
}
