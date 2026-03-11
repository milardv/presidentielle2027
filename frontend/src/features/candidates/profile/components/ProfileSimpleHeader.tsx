import { AppSiteHeader } from '../../../../components/AppSiteHeader'

interface ProfileSimpleHeaderProps {
  title: string
}

export function ProfileSimpleHeader({ title }: ProfileSimpleHeaderProps) {
  return (
    <>
      <AppSiteHeader containerClassName="w-full" />
      <div className="border-b border-primary/10 bg-white/90 px-4 py-3 text-center text-sm font-semibold text-slate-700 backdrop-blur-sm dark:bg-background-dark/90 dark:text-slate-200">
        {title}
      </div>
    </>
  )
}
