import { AppSiteHeader } from '../../../../components/AppSiteHeader'

export function ProfilePageHeader() {
  return (
    <>
      <div className="bg-primary/10 border-b border-primary/20 px-4 py-2 text-center">
        <p className="text-xs font-medium text-primary uppercase tracking-wider italic">
          <span className="material-symbols-outlined text-xs align-middle mr-1">info</span>
          Outil informatif - données issues de sources publiques
        </p>
      </div>
      <AppSiteHeader containerClassName="w-full" />
    </>
  )
}
