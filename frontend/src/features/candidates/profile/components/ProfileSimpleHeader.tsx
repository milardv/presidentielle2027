import { Link } from 'react-router-dom'

interface ProfileSimpleHeaderProps {
  title: string
}

export function ProfileSimpleHeader({ title }: ProfileSimpleHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-primary/10 px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-primary">
          <span className="material-symbols-outlined">arrow_back</span>
          Retour
        </Link>
        <h1 className="font-bold">{title}</h1>
        <div className="w-14" />
      </div>
    </header>
  )
}
