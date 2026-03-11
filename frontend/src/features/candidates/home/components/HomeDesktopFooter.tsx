import { Link } from 'react-router-dom'

export function HomeDesktopFooter() {
  return (
    <footer className="hidden md:block py-12 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl">explore</span>
            <h3 className="text-lg font-extrabold tracking-tight text-primary">
              La Boussole <span className="text-slate-500">2027</span>
            </h3>
          </div>
          <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
            Projet informatif fondé sur des déclarations publiques de candidature et des sources ouvertes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase text-slate-400">Navigation</h4>
            <ul className="text-sm space-y-2 font-medium">
              <li>
                <Link to="/" className="hover:text-primary">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/polls" className="hover:text-primary">
                  Sondages
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-primary">
                  Profil
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase text-slate-400">Ressources</h4>
            <ul className="text-sm space-y-2 font-medium">
              <li>
                <Link to="/" className="hover:text-primary">
                  Sources
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
