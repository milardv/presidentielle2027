import { AtSign, ChartSpline, FileText, SquarePlay } from 'lucide-react'
import { NavLink } from 'react-router-dom'

interface CandidateProfileTabsProps {
  candidateId: string
}

export function CandidateProfileTabs({ candidateId }: CandidateProfileTabsProps) {
  const tabs = [
    { label: 'Fiche', to: `/candidats/${candidateId}`, end: true, icon: <FileText className="h-[18px] w-[18px]" /> },
    { label: 'Vidéos', to: `/candidats/${candidateId}/videos`, end: true, icon: <SquarePlay className="h-[18px] w-[18px]" /> },
    { label: 'Tweets', to: `/candidats/${candidateId}/tweets`, end: true, icon: <AtSign className="h-[18px] w-[18px]" /> },
    {
      label: 'Analyse',
      to: `/candidats/${candidateId}/analysis`,
      end: true,
      icon: <ChartSpline className="h-[18px] w-[18px]" />,
    },
  ]

  return (
    <nav className="sticky top-[65px] z-40 border-b border-slate-200 bg-white/92 px-4 backdrop-blur-md dark:border-slate-800 dark:bg-background-dark/92 sm:top-[72px]">
      <div className="flex w-full overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={({ isActive }) =>
              `inline-flex items-center gap-2 border-b-2 px-4 py-4 text-sm font-semibold whitespace-nowrap transition-colors ${
                isActive
                  ? 'border-primary text-primary'
                  : 'border-transparent text-slate-500 hover:text-primary dark:text-slate-400'
              }`
            }
          >
            {tab.icon}
            {tab.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
