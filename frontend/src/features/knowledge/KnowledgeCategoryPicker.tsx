import { ArrowRight, Users } from 'lucide-react'
import { knowledgeCategories } from '../../data/knowledgeQuestions'
import { loadKnowledgeCategorySession } from './knowledgeGame'

export function KnowledgeCategoryPicker({ onChoose, counts, status }: {
  onChoose: (categoryId: string) => void
  counts: Record<string, number>
  status: 'loading' | 'ready' | 'error'
}) {
  return <section className="knowledge-category-picker" aria-labelledby="knowledge-category-picker-title">
    <div className="knowledge-category-picker-heading"><h2 id="knowledge-category-picker-title">Sur quoi voulez-vous travailler ?</h2><p>Choisissez un thème : dix questions, leurs explications et votre bilan. Votre progression est conservée pour chaque catégorie.</p></div>
    <div className="knowledge-category-choices">{knowledgeCategories.map((category) => {
      const saved = loadKnowledgeCategorySession(category.id)
      const count = counts[category.id] ?? 0
      const action = saved?.answers.length === 10 ? 'Voir mon bilan' : saved?.answers.length ? 'Reprendre' : 'Commencer'
      return <button key={category.id} type="button" onClick={() => onChoose(category.id)} className="knowledge-category-choice" aria-label={`${action} : ${category.title}`}>
        <span className="knowledge-category-choice-heading"><span className="knowledge-category-dot" style={{ background: category.color }} /><strong>{category.title}</strong><ArrowRight size={18} aria-hidden="true" /></span>
        <span className="knowledge-category-description">{category.description}</span>
        <span className="knowledge-category-participation"><Users size={15} aria-hidden="true" />{status === 'loading' ? 'Chargement des participants…' : status === 'error' ? 'Participants indisponibles' : `${new Intl.NumberFormat('fr-FR').format(count)} personne${count === 1 ? '' : 's'} ${count === 1 ? 'a' : 'ont'} commencé`}</span>
        <span className="knowledge-category-choice-action">{saved?.answers.length ? `${saved.answers.length} / 10 questions · ` : '10 questions · '}{action}</span>
      </button>
    })}</div>
    <p className="knowledge-participation-note">Comptage depuis le 22 octobre 2026 : un compte connecté ou un navigateur est compté une fois par catégorie ouverte. Une reprise ou un nouvel essai ne compte pas à nouveau. Des appareils ou comptes différents peuvent représenter la même personne.</p>
  </section>
}
