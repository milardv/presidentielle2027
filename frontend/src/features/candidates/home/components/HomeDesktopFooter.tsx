import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function HomeDesktopFooter() {
  return (
    <footer className="edition-footer">
      <div className="edition-footer-inner">
        <div>
          <Link to="/" className="edition-footer-brand">Présidentielle <span>2027</span></Link>
          <p>Un dossier indépendant pour lire la campagne, ses chiffres et les sources qui les fondent.</p>
        </div>
        <nav aria-label="Navigation de pied de page">
          <Link to="/">Accueil</Link>
          <Link to="/polls">Sondages</Link>
          <Link to="/actu">Actu</Link>
          <Link to="/quiz">Quiz</Link>
          <Link to="/sources">Sources et méthode <ArrowUpRight size={14} /></Link>
        </nav>
      </div>
    </footer>
  )
}
