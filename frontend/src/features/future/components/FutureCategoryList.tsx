import {
  Briefcase,
  ChevronDown,
  GraduationCap,
  HeartPulse,
  Landmark,
  Leaf,
  Shield,
  Vote,
  Wallet,
  type LucideIcon,
} from 'lucide-react'
import { useState } from 'react'
import type { LeverEvidence } from '../../../data/candidateLeverEvidence.js'
import type { PolicyLeverId } from '../../../data/futureIndicators.js'
import type { CategoryProjection } from '../futureEngine'
import { IndicatorCard } from './IndicatorCard'

const icons: Record<string, LucideIcon> = {
  briefcase: Briefcase,
  landmark: Landmark,
  wallet: Wallet,
  'heart-pulse': HeartPulse,
  'graduation-cap': GraduationCap,
  shield: Shield,
  leaf: Leaf,
  vote: Vote,
}

interface FutureCategoryListProps {
  categories: CategoryProjection[]
  candidateFirstName: string
  accent: string
  evidence: Partial<Record<PolicyLeverId, LeverEvidence>>
}

export function FutureCategoryList({ categories, candidateFirstName, accent, evidence }: FutureCategoryListProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set([categories[0]?.category.id ?? '']))

  const toggle = (id: string) => {
    setOpenIds((current) => {
      const next = new Set(current)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className="space-y-3">
      {categories.map((entry) => {
        const Icon = icons[entry.category.icon] ?? Briefcase
        const isOpen = openIds.has(entry.category.id)
        const neutral = entry.projections.length - entry.improving - entry.worsening

        return (
          <section key={entry.category.id} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <button
              type="button"
              onClick={() => toggle(entry.category.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-slate-50 dark:hover:bg-slate-800/60 sm:px-6"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white" style={{ backgroundColor: accent }}>
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-lg font-black tracking-tight text-slate-950 dark:text-white">{entry.category.label}</span>
                <span className="mt-1 flex flex-wrap gap-1.5 text-[11px] font-bold">
                  {entry.improving > 0 ? (
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-700">{entry.improving} en mieux</span>
                  ) : null}
                  {entry.worsening > 0 ? <span className="rounded-full bg-rose-100 px-2 py-0.5 text-rose-700">{entry.worsening} en moins bien</span> : null}
                  {neutral > 0 ? <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-600">{neutral} comme la tendance</span> : null}
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-500">
                    {entry.projections.length} indicateur{entry.projections.length > 1 ? 's' : ''}
                  </span>
                </span>
              </span>
              <ChevronDown className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen ? (
              <div className="grid gap-4 border-t border-slate-200 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-900/40 lg:grid-cols-2 sm:p-5">
                {entry.projections.map((projection) => (
                  <IndicatorCard key={projection.indicator.id} projection={projection} candidateFirstName={candidateFirstName} accent={accent} evidence={evidence} />
                ))}
              </div>
            ) : null}
          </section>
        )
      })}
    </div>
  )
}
