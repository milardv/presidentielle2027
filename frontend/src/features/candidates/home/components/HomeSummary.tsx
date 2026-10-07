import { ArrowDownRight, ArrowUpRight, BarChart3, BookOpen, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'

interface HomeSummaryProps {
  totalCount: number
  declaredCount: number
  conditionalCount: number
  lastUpdateLabel: string
}

const ELYSEE_HERO_IMAGE_URL =
  'https://res.cloudinary.com/dagxzno9s/image/upload/f_auto,q_auto/v1773332875/presidentielles/site/elysee-home.png'

export function HomeSummary({ totalCount, declaredCount, conditionalCount, lastUpdateLabel }: HomeSummaryProps) {
  return (
    <section className="edition-hero" aria-labelledby="home-title">
      <div className="edition-hero-copy">
        <div className="edition-meta"><span className="edition-live-dot" /> Le dossier présidentiel <span>Mis à jour le {lastUpdateLabel}</span></div>
        <h1 id="home-title">Comprendre la course à <em>l’Élysée.</em></h1>
        <p className="edition-lede">Les candidatures, les rapports de force et les idées qui dessinent 2027. Une lecture claire des faits, des chiffres et de leurs limites.</p>
        <div className="edition-actions">
          <a href="#home-candidates" className="edition-button edition-button-primary">Explorer les candidats <ArrowDownRight size={18} /></a>
          <Link to="/polls" className="edition-button edition-button-quiet">Lire les sondages <ArrowUpRight size={18} /></Link>
        </div>
        <div className="edition-hero-facts" aria-label="État des candidatures suivies">
          <div><strong>{totalCount}</strong><span>profils suivis</span></div>
          <div><strong>{declaredCount}</strong><span>candidatures déclarées</span></div>
          <div><strong>{conditionalCount}</strong><span>situations à confirmer</span></div>
        </div>
      </div>
      <div className="edition-hero-media">
        <img src={ELYSEE_HERO_IMAGE_URL} alt="Illustration du palais de l’Élysée et d’une urne électorale" fetchPriority="high" />
        <div className="edition-image-caption"><span>Le scrutin, en perspective</span><span>France · 2027</span></div>
      </div>
      <div className="edition-hero-bottom">
        <span><CheckCircle2 size={17} /> Candidatures vérifiées</span>
        <span><BarChart3 size={17} /> Sondages contextualisés</span>
        <span><BookOpen size={17} /> Méthodes accessibles</span>
      </div>
    </section>
  )
}
