import { Link } from 'react-router-dom';

export default function Compare() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased min-h-screen">
      <div className="relative flex min-h-screen flex-col bg-background-light dark:bg-background-dark">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center p-4 justify-between max-w-2xl mx-auto w-full">
            <Link to="/" className="text-primary flex size-10 items-center justify-center rounded-full hover:bg-primary/10 transition-colors">
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <h1 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight flex-1 text-center">Comparateur</h1>
            <div className="flex w-10 items-center justify-end">
              <button className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">share</span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 w-full max-w-2xl mx-auto pb-24">
          {/* Selector Toggle */}
          <div className="px-4 py-4">
            <div className="flex h-11 items-center justify-center rounded-xl bg-slate-200/50 dark:bg-slate-800/50 p-1">
              <label className="flex cursor-pointer h-full grow items-center justify-center rounded-lg px-2 has-[:checked]:bg-white dark:has-[:checked]:bg-slate-700 has-[:checked]:shadow-sm text-slate-600 dark:text-slate-400 has-[:checked]:text-primary dark:has-[:checked]:text-white text-sm font-semibold transition-all">
                <span className="truncate">Positions</span>
                <input defaultChecked className="invisible w-0" name="view-type" type="radio" value="positions" />
              </label>
              <label className="flex cursor-pointer h-full grow items-center justify-center rounded-lg px-2 has-[:checked]:bg-white dark:has-[:checked]:bg-slate-700 has-[:checked]:shadow-sm text-slate-600 dark:text-slate-400 has-[:checked]:text-primary dark:has-[:checked]:text-white text-sm font-semibold transition-all">
                <span className="truncate">Profils</span>
                <input className="invisible w-0" name="view-type" type="radio" value="details" />
              </label>
            </div>
          </div>

          {/* Sticky Candidates Header */}
          <div className="sticky top-[73px] z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm py-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex px-4 gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory">
              <div className="flex-1 min-w-[160px] flex items-center gap-3 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm snap-start">
                <div className="h-12 w-12 shrink-0 rounded-full border-2 border-primary overflow-hidden">
                  <img className="h-full w-full object-cover" alt="Portrait photo of candidate Jean-Marc Valois" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEWRTT1ZTUSri7Aaz5dzJ7PUK1N9SEtugo0PAx_ijSZ6d5VMqcenRG6wlOcrc_ODsJrHBLUAUNEsE4Ah1yyziCsEdHNrZumzWGprGyj3l8XMop_oHJWaEhfgdst6QF8HksZDx6F8jtyuA3_NNklUmPNY2Nasxt-YcjdbpizL0mpTcDweT7YCWqiPYIIwiZnKIFzE_bdSYngJXVXC8mhE5p-pE0bTyI37r-fasiqj3CAY3yImFkl69cFy-bx_5wopVu7GlQ_VjZOrr0" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-slate-900 dark:text-slate-100 font-bold text-sm truncate uppercase tracking-wider">Valois</p>
                  <p className="text-primary text-xs font-medium">Centre-Droit</p>
                </div>
              </div>
              <div className="flex-1 min-w-[160px] flex items-center gap-3 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm snap-start">
                <div className="h-12 w-12 shrink-0 rounded-full border-2 border-primary/40 overflow-hidden">
                  <img className="h-full w-full object-cover" alt="Portrait photo of candidate Sophie Morel" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6BzYaFHQcTMjracCMV1GifU1LYeqBJUEc0invikpH_6PT6hDeQnKGx4YnRC4ZV9o3QeTcmL90qVBp51hWsaKtvoKICcpPzcyU8dx1Y_K2stwiLtPmwZbz9KvYTX4WDlIUf9CIpRP4Jl-kLCLq1VtQi5bgpBDIWtvh97yPDyppBmeXw9R7ExTp_xLcm67ngeofuWCFhKG6i5D-J-Gc4Gof4bsUSCq5eF6tFhB9oacpCuVh_Hphh1Su1PPPgZ0dHvIxm-4Zo5lDxkuR" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-slate-900 dark:text-slate-100 font-bold text-sm truncate uppercase tracking-wider">Morel</p>
                  <p className="text-primary text-xs font-medium">Écologie</p>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Sections */}
          <div className="space-y-6 mt-6 px-4">
            {/* Section: Positions Thématiques */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary text-xl">policy</span>
                <h3 className="text-slate-900 dark:text-slate-100 font-bold uppercase text-xs tracking-[0.1em]">Positions Thématiques</h3>
              </div>
              <div className="space-y-4">
                {/* Row 1: Économie */}
                <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase mb-3">Économie &amp; Travail</p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2 border-r border-slate-100 dark:border-slate-800 pr-3">
                      <p className="text-sm leading-relaxed italic">"Réduction massive de la dépense publique et flexibilité accrue pour les PME."</p>
                    </div>
                    <div className="space-y-2 pl-1">
                      <p className="text-sm leading-relaxed italic">"Taxation des superprofits et réduction du temps de travail hebdomadaire."</p>
                    </div>
                  </div>
                </div>

                {/* Row 2: Énergie */}
                <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase mb-3">Transition Énergétique</p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2 border-r border-slate-100 dark:border-slate-800 pr-3">
                      <p className="text-sm leading-relaxed italic">"Priorité au nucléaire de nouvelle génération et maintien du gaz."</p>
                    </div>
                    <div className="space-y-2 pl-1">
                      <p className="text-sm leading-relaxed italic">"Sortie totale du nucléaire d'ici 2040 et investissement 100% renouvelables."</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section: Ton Rhétorique */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary text-xl">record_voice_over</span>
                <h3 className="text-slate-900 dark:text-slate-100 font-bold uppercase text-xs tracking-[0.1em]">Ton Rhétorique</h3>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-500 uppercase mb-2">
                      <span>Institutionnel</span>
                      <span>Rupture</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full relative">
                      <div className="absolute top-1/2 left-[20%] -translate-y-1/2 h-4 w-4 rounded-full bg-primary border-2 border-white dark:border-slate-900 shadow-md"></div>
                      <div className="absolute top-1/2 left-[85%] -translate-y-1/2 h-4 w-4 rounded-full bg-primary/40 border-2 border-white dark:border-slate-900 shadow-md"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div>
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full mb-2 uppercase">Pragmatique</span>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Utilise des données chiffrées et un vocabulaire managérial.</p>
                    </div>
                    <div>
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full mb-2 uppercase">Émotionnel</span>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Discours axé sur l'urgence climatique et la justice sociale.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section: Force du Réseau */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary text-xl">hub</span>
                <h3 className="text-slate-900 dark:text-slate-100 font-bold uppercase text-xs tracking-[0.1em]">Force du Réseau</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold text-primary">85</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Indice d'ancrage</span>
                    <div className="mt-3 flex -space-x-2">
                      <div className="h-6 w-6 rounded-full bg-slate-200 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[8px] font-bold">MED</div>
                      <div className="h-6 w-6 rounded-full bg-slate-200 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[8px] font-bold">LR</div>
                      <div className="h-6 w-6 rounded-full bg-slate-200 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[8px] font-bold">+</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold text-primary/60">62</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Indice d'ancrage</span>
                    <div className="mt-3 flex -space-x-2">
                      <div className="h-6 w-6 rounded-full bg-slate-200 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[8px] font-bold">NGO</div>
                      <div className="h-6 w-6 rounded-full bg-slate-200 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[8px] font-bold">EELV</div>
                      <div className="h-6 w-6 rounded-full bg-slate-200 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[8px] font-bold">+</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Sources Footer */}
            <footer className="pt-8 pb-12 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-sm text-slate-400">info</span>
                <p className="text-[11px] font-bold text-slate-500 uppercase">Sources &amp; Méthodologie</p>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed italic">
                Données consolidées à partir des programmes officiels (Juin 2024), analyses lexicales de 25 discours récents, et bases de données de financements publics. Mise à jour : 12/10/2023.
              </p>
            </footer>
          </div>
        </main>

        {/* Bottom Navigation Bar */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-background-dark/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800">
          <div className="flex max-w-2xl mx-auto px-4 py-2">
            <Link to="/" className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-500 dark:text-slate-400">
              <span className="material-symbols-outlined">group</span>
              <p className="text-[10px] font-medium leading-none">Candidats</p>
            </Link>
            <Link to="/compare" className="flex flex-1 flex-col items-center justify-center gap-1 text-primary dark:text-white">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>compare_arrows</span>
              <p className="text-[10px] font-bold leading-none">Comparer</p>
            </Link>
            <Link to="/" className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-500 dark:text-slate-400">
              <span className="material-symbols-outlined">newspaper</span>
              <p className="text-[10px] font-medium leading-none">Actualités</p>
            </Link>
            <Link to="/" className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-500 dark:text-slate-400">
              <span className="material-symbols-outlined">settings</span>
              <p className="text-[10px] font-medium leading-none">Réglages</p>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
