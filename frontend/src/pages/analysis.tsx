import { Link } from 'react-router-dom';

export default function Analysis() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
            <div className="max-w-md mx-auto bg-white dark:bg-slate-900 min-h-screen shadow-xl flex flex-col">
                {/* Header */}
                <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 p-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">analytics</span>
                            <h1 className="text-lg font-bold tracking-tight">Analyse Candidat</h1>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-full">
                            <span className="text-[10px] font-bold px-2 text-slate-500 uppercase">Neutralité</span>
                            <button className="w-10 h-5 bg-primary rounded-full relative">
                                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-6 overflow-x-auto no-scrollbar">
                        <Link to="/analysis" className="border-b-2 border-primary pb-2 text-sm font-bold text-primary whitespace-nowrap">Réseau d'influence</Link>
                        <Link to="/analysis" className="border-b-2 border-transparent pb-2 text-sm font-medium text-slate-500 whitespace-nowrap">Rhétorique</Link>
                        <Link to="/analysis" className="border-b-2 border-transparent pb-2 text-sm font-medium text-slate-500 whitespace-nowrap">Fact-checking</Link>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 space-y-6 pb-24">
                    {/* Network Graph Visualization */}
                    <section>
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-xl font-bold">Cartographie des Alliances</h2>
                            <span className="material-symbols-outlined text-slate-400">info</span>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                            <div className="relative h-64 w-full flex items-center justify-center">
                                {/* Central Entity */}
                                <div className="z-10 w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
                                    <span className="font-bold">Candidat</span>
                                </div>
                                {/* Connection Lines (SVG) */}
                                <svg className="absolute inset-0 w-full h-full stroke-slate-300 dark:stroke-slate-600" fill="none" strokeWidth="1">
                                    <line x1="50%" x2="20%" y1="50%" y2="20%"></line>
                                    <line x1="50%" x2="80%" y1="50%" y2="30%"></line>
                                    <line x1="50%" x2="15%" y1="50%" y2="70%"></line>
                                    <line x1="50%" x2="75%" y1="50%" y2="80%"></line>
                                </svg>
                                {/* Orbiting Nodes */}
                                <div className="absolute top-8 left-12 p-2 bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-slate-100 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    <span className="text-xs font-semibold">Think Tank A</span>
                                </div>
                                <div className="absolute top-16 right-8 p-2 bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-slate-100 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                    <span className="text-xs font-semibold">Conseiller Clé</span>
                                </div>
                                <div className="absolute bottom-20 left-4 p-2 bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-slate-100 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                                    <span className="text-xs font-semibold">Partenaire Privé</span>
                                </div>
                                <div className="absolute bottom-12 right-12 p-2 bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-slate-100 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                    <span className="text-xs font-semibold">Média Affilié</span>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                                <p className="text-[10px] text-slate-500 uppercase font-bold mb-2">Sources vérifiées</p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-[11px] px-2 py-1 bg-primary/10 text-primary rounded-full">Registre Transparence</span>
                                    <span className="text-[11px] px-2 py-1 bg-primary/10 text-primary rounded-full">Décl. HATVP</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Rhetoric Style Section */}
                    <section>
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-xl font-bold">Style de Communication</h2>
                            <span className="text-xs text-primary font-bold">Méthodologie IA</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                                <p className="text-xs text-slate-500 mb-1">Technicité</p>
                                <div className="flex items-end gap-2">
                                    <span className="text-2xl font-bold">78%</span>
                                    <span className="material-symbols-outlined text-emerald-500 text-sm mb-1">trending_up</span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-2">
                                    <div className="bg-primary h-full rounded-full" style={{ width: '78%' }}></div>
                                </div>
                            </div>
                            <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                                <p className="text-xs text-slate-500 mb-1">Empathie</p>
                                <div className="flex items-end gap-2">
                                    <span className="text-2xl font-bold">42%</span>
                                    <span className="material-symbols-outlined text-amber-500 text-sm mb-1">trending_flat</span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-2">
                                    <div className="bg-primary h-full rounded-full" style={{ width: '42%' }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 p-3 bg-primary/5 rounded-lg">
                            <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300 italic">
                                "Analyse basée sur les 50 derniers discours officiels. Utilisation fréquente de termes économiques complexes et structures syntaxiques élaborées."
                            </p>
                        </div>
                    </section>

                    {/* Fact-Check Panel */}
                    <section>
                        <h2 className="text-xl font-bold mb-3">Vérification des Faits</h2>
                        <div className="space-y-3">
                            {/* Fact Card 1 */}
                            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-[10px] font-bold rounded uppercase">Affirmation</span>
                                        <div className="flex flex-col items-end">
                                            <span className="text-[10px] text-slate-400 uppercase font-bold">Fiabilité</span>
                                            <span className="text-sm font-bold text-emerald-600">8.5/10</span>
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium mb-3">"Le taux de chômage a baissé de 2% dans notre région l'an dernier."</p>
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <span className="material-symbols-outlined text-xs">verified</span>
                                        <span>Confirmé par l'INSEE</span>
                                    </div>
                                </div>
                            </div>

                            {/* Fact Card 2 */}
                            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="px-2 py-0.5 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 text-[10px] font-bold rounded uppercase">Opinion</span>
                                        <div className="flex flex-col items-end">
                                            <span className="text-[10px] text-slate-400 uppercase font-bold">Fiabilité</span>
                                            <span className="text-sm font-bold text-slate-400">N/A</span>
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium mb-3">"Nous sommes le seul rempart contre le déclin industriel."</p>
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <span className="material-symbols-outlined text-xs">info</span>
                                        <span>Subjectif - Rhétorique de campagne</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                {/* Bottom Navigation */}
                <nav className="fixed bottom-0 w-full max-w-md border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-3 flex justify-between items-center z-50">
                    <Link to="/" className="flex flex-col items-center gap-1 text-primary">
                        <span className="material-symbols-outlined">home</span>
                        <span className="text-[10px] font-bold">Accueil</span>
                    </Link>
                    <Link to="/analysis" className="flex flex-col items-center gap-1 text-slate-400">
                        <span className="material-symbols-outlined">hub</span>
                        <span className="text-[10px] font-medium">Réseau</span>
                    </Link>
                    <Link to="/analysis" className="flex flex-col items-center gap-1 text-slate-400">
                        <span className="material-symbols-outlined">pie_chart</span>
                        <span className="text-[10px] font-medium">Analyse</span>
                    </Link>
                    <Link to="/profile" className="flex flex-col items-center gap-1 text-slate-400">
                        <span className="material-symbols-outlined">person</span>
                        <span className="text-[10px] font-medium">Profil</span>
                    </Link>
                </nav>
            </div>
        </div>
    );
}
