const analysisAnchors = [
  { id: 'media', label: 'Média' },
  { id: 'themes', label: 'Thèmes' },
  { id: 'reseau', label: 'Réseau' },
  { id: 'parcours', label: 'Parcours' },
  { id: 'style', label: 'Style' },
]

export function CandidateAnalysisAnchorNav() {
  return (
    <nav className="sticky top-[121px] z-40 border-b border-slate-200 bg-white px-4 sm:top-[128px] mt-4">
      <div className="mx-auto flex max-w-4xl overflow-x-auto no-scrollbar">
        {analysisAnchors.map((anchor, index) => (
          <a
            key={anchor.id}
            className={`flex flex-col items-center justify-center whitespace-nowrap border-b-2 px-3 pb-3 pt-4 sm:px-4 ${
              index === 0 ? 'border-primary text-primary' : 'border-transparent text-slate-500'
            }`}
            href={`#${anchor.id}`}
          >
            <p className="text-xs font-medium sm:text-sm">{anchor.label}</p>
          </a>
        ))}
      </div>
    </nav>
  )
}
