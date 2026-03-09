const profileAnchors = [
  { id: 'resume', label: 'Résumé' },
  { id: 'evolution', label: 'Évolution' },
  { id: 'media', label: 'Média' },
  { id: 'interventions', label: 'Interventions' },
  { id: 'themes', label: 'Thèmes' },
  { id: 'reseau', label: 'Réseau' },
  { id: 'parcours', label: 'Parcours' },
  { id: 'style', label: 'Style' },
  { id: 'sources', label: 'Sources' },
]

export function ProfileAnchorNav() {
  return (
    <nav className="sticky top-[65px] sm:top-[72px] bg-white dark:bg-background-dark border-b border-slate-200 dark:border-slate-800 z-40">
      <div className="flex px-4 overflow-x-auto no-scrollbar">
        {profileAnchors.map((anchor, index) => (
          <a
            key={anchor.id}
            className={`flex flex-col items-center justify-center border-b-2 pb-3 pt-4 px-3 sm:px-4 whitespace-nowrap ${
              index === 0
                ? 'border-primary text-primary'
                : 'border-transparent text-slate-500 dark:text-slate-400'
            }`}
            href={`#${anchor.id}`}
          >
            <p className="text-xs sm:text-sm font-medium">{anchor.label}</p>
          </a>
        ))}
      </div>
    </nav>
  )
}
