import type { CSSProperties } from 'react'
import { Award, BarChart3, BookOpen, Compass, Eye, GitBranch, Globe2, Map, Search, Sparkles, Trophy } from 'lucide-react'
import { knowledgeRewards } from '../../data/knowledgeQuestions'

const badgeIcons = [Sparkles, Eye, BarChart3, Map, GitBranch, Compass, Search, BookOpen, Globe2, Award]
const badgePalettes = [
  ['#995b49', '#f8e9dd'], ['#476f8a', '#e1eef3'], ['#815a81', '#f2e6f0'], ['#a16f3b', '#f8eddb'], ['#4b8279', '#e1efeb'],
  ['#455f80', '#e4eaf1'], ['#9b665c', '#f5e9e5'], ['#718055', '#edf1e3'], ['#596790', '#e8eaf5'], ['#9b7642', '#f7eed9'],
]

export function JourneyBadgeMark({ index, size = 'tile' }: { index: number; size?: 'hero' | 'tile' | 'profile' }) {
  const Icon = badgeIcons[index] ?? Award
  const [ink, paper] = badgePalettes[index] ?? badgePalettes[0]
  return (
    <span
      className={`knowledge-badge-mark knowledge-badge-mark--${size}`}
      style={{ '--badge-ink': ink, '--badge-paper': paper } as CSSProperties}
      role="img"
      aria-label={`Badge ${index + 1} : ${knowledgeRewards[index]}`}
    >
      <span className="knowledge-badge-mark-inner"><Icon aria-hidden="true" strokeWidth={1.65} /><small>{String(index + 1).padStart(2, '0')}</small></span>
    </span>
  )
}

export function JourneyBadgeTile({ index }: { index: number }) {
  return (
    <div className="knowledge-badge-tile">
      <JourneyBadgeMark index={index} />
      <div><span>Badge {String(index + 1).padStart(2, '0')}</span><strong>{knowledgeRewards[index]}</strong></div>
    </div>
  )
}

export function CategoryBadgeMark({ title, color }: { title: string; color: string }) {
  return <span className="knowledge-category-badge-mark" style={{ '--badge-ink': color } as CSSProperties} role="img" aria-label={`Badge de maîtrise : ${title}`}><Trophy size={16} aria-hidden="true" /></span>
}
