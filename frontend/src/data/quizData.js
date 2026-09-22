export const QUIZ_UPDATED_AT = '2026-09-22'
export const QUIZ_ANSWER_VALUES = [-2, -1, 1, 2]

export const quizAnswerOptions = [
  { value: -2, label: 'Pas du tout d’accord', short: 'Non !', tone: 'rose' },
  { value: -1, label: 'Plutôt pas d’accord', short: 'Plutôt non', tone: 'orange' },
  { value: 1, label: 'Plutôt d’accord', short: 'Plutôt oui', tone: 'sky' },
  { value: 2, label: 'Tout à fait d’accord', short: 'Oui !', tone: 'emerald' },
]

// axis: eco (+1 = agreeing pushes toward liberal/rigueur, -1 = toward redistribution)
//       soc (+1 = agreeing pushes toward order/identity, -1 = toward openness)
export const quizQuestions = [
  {
    id: 'immigration',
    theme: 'Immigration',
    icon: 'users',
    statement: 'Il faut réduire fortement l’immigration, y compris légale (quotas, restriction du regroupement familial).',
    agreeLabel: 'réduire fortement l’immigration',
    disagreeLabel: 'ne pas restreindre davantage l’immigration',
    axis: { soc: 1 },
  },
  {
    id: 'retraites',
    theme: 'Retraites',
    icon: 'hourglass',
    statement: 'Il faut abroger la réforme des retraites et revenir à un âge légal de 62 ans, voire 60 ans.',
    agreeLabel: 'revenir à 62 ans ou moins',
    disagreeLabel: 'garder ou durcir la réforme des retraites',
    axis: { eco: -1 },
  },
  {
    id: 'nucleaire',
    theme: 'Énergie',
    icon: 'atom',
    statement: 'La France doit construire de nouveaux réacteurs nucléaires.',
    agreeLabel: 'relancer le nucléaire',
    disagreeLabel: 'sortir progressivement du nucléaire',
    axis: {},
  },
  {
    id: 'fiscalite',
    theme: 'Fiscalité',
    icon: 'coins',
    statement: 'Il faut taxer davantage les très hauts patrimoines (retour de l’ISF, taxe Zucman sur les ultra-riches).',
    agreeLabel: 'taxer davantage les très riches',
    disagreeLabel: 'ne pas alourdir la fiscalité du patrimoine',
    axis: { eco: -1 },
  },
  {
    id: 'europe',
    theme: 'Europe',
    icon: 'globe',
    statement: 'La France doit rester pleinement dans l’Union européenne et dans l’euro.',
    agreeLabel: 'rester pleinement dans l’UE et l’euro',
    disagreeLabel: 'prendre ses distances avec l’UE ou l’euro',
    axis: { soc: -1 },
  },
  {
    id: 'justice',
    theme: 'Sécurité',
    icon: 'gavel',
    statement: 'Il faut durcir la réponse pénale : peines planchers, fin des réductions de peine automatiques, exécution systématique des peines.',
    agreeLabel: 'durcir la réponse pénale',
    disagreeLabel: 'privilégier prévention et alternatives à la prison',
    axis: { soc: 1 },
  },
  {
    id: 'proportionnelle',
    theme: 'Institutions',
    icon: 'landmark',
    statement: 'Il faut élire les députés à la proportionnelle.',
    agreeLabel: 'instaurer la proportionnelle',
    disagreeLabel: 'conserver le scrutin majoritaire',
    axis: {},
  },
  {
    id: 'ric',
    theme: 'Démocratie',
    icon: 'vote',
    statement: 'Il faut créer un référendum d’initiative citoyenne (RIC) pour que les citoyens puissent proposer et abroger des lois.',
    agreeLabel: 'créer le RIC',
    disagreeLabel: 'ne pas créer de RIC',
    axis: {},
  },
  {
    id: 'depense',
    theme: 'Budget',
    icon: 'piggy-bank',
    statement: 'Réduire la dette et la dépense publique est la priorité, même si cela impose de baisser certaines prestations ou effectifs.',
    agreeLabel: 'faire de la réduction de la dette la priorité',
    disagreeLabel: 'préserver la dépense publique et les prestations',
    axis: { eco: 1 },
  },
  {
    id: 'smic',
    theme: 'Salaires',
    icon: 'wallet',
    statement: 'Il faut augmenter fortement le SMIC, vers 1 600 € net par mois.',
    agreeLabel: 'augmenter fortement le SMIC',
    disagreeLabel: 'ne pas imposer de forte hausse du SMIC',
    axis: { eco: -1 },
  },
  {
    id: 'laicite',
    theme: 'Laïcité',
    icon: 'scale',
    statement: 'Il faut interdire les signes religieux ostensibles dans davantage de lieux (université, sorties scolaires, compétitions sportives).',
    agreeLabel: 'étendre l’interdiction des signes religieux',
    disagreeLabel: 'ne pas étendre les interdictions',
    axis: { soc: 1 },
  },
  {
    id: 'ukraine',
    theme: 'Défense',
    icon: 'shield',
    statement: 'La France doit maintenir, voire renforcer, son soutien militaire à l’Ukraine.',
    agreeLabel: 'soutenir militairement l’Ukraine',
    disagreeLabel: 'réduire l’engagement militaire en Ukraine',
    axis: {},
  },
  {
    id: 'ecologie',
    theme: 'Écologie',
    icon: 'leaf',
    statement: 'Il faut accélérer la transition écologique même si cela impose des contraintes (normes, taxe carbone, limitation de certains usages).',
    agreeLabel: 'accélérer la transition écologique',
    disagreeLabel: 'alléger les contraintes écologiques',
    axis: { soc: -1 },
  },
  {
    id: 'services-publics',
    theme: 'Services publics',
    icon: 'factory',
    statement: 'L’État doit reprendre le contrôle des secteurs essentiels (énergie, autoroutes, eau) par la nationalisation ou une régulation forte.',
    agreeLabel: 'renationaliser ou reprendre le contrôle public',
    disagreeLabel: 'laisser ces secteurs au marché',
    axis: { eco: -1 },
  },
]

// Stance per candidate and question, from -2 (strongly against the statement) to +2 (strongly for).
// null = position not clearly established. Estimated from programmes and public statements (see fiches).
export const candidateStances = {
  'marine-le-pen':        { immigration: 2, retraites: 2, nucleaire: 2, fiscalite: -1, europe: 0, justice: 2, proportionnelle: 2, ric: 2, depense: 0, smic: -1, laicite: 2, ukraine: -1, ecologie: -2, 'services-publics': 1 },
  'edouard-philippe':     { immigration: 1, retraites: -2, nucleaire: 2, fiscalite: -2, europe: 2, justice: 1, proportionnelle: 0, ric: -1, depense: 2, smic: -2, laicite: 1, ukraine: 2, ecologie: 1, 'services-publics': -1 },
  'bruno-retailleau':     { immigration: 2, retraites: -2, nucleaire: 2, fiscalite: -2, europe: 1, justice: 2, proportionnelle: -1, ric: -1, depense: 2, smic: -2, laicite: 2, ukraine: 1, ecologie: -1, 'services-publics': -1 },
  'gabriel-attal':        { immigration: 1, retraites: -2, nucleaire: 2, fiscalite: -1, europe: 2, justice: 1, proportionnelle: 1, ric: -1, depense: 1, smic: -1, laicite: 2, ukraine: 2, ecologie: 1, 'services-publics': -1 },
  'jean-luc-melenchon':   { immigration: -2, retraites: 2, nucleaire: -2, fiscalite: 2, europe: -1, justice: -2, proportionnelle: 2, ric: 2, depense: -2, smic: 2, laicite: -2, ukraine: -1, ecologie: 2, 'services-publics': 2 },
  'raphael-glucksmann':   { immigration: 0, retraites: 1, nucleaire: 1, fiscalite: 2, europe: 2, justice: 0, proportionnelle: 2, ric: 0, depense: -1, smic: 1, laicite: 0, ukraine: 2, ecologie: 2, 'services-publics': 1 },
  'eric-zemmour':         { immigration: 2, retraites: -2, nucleaire: 2, fiscalite: -2, europe: 0, justice: 2, proportionnelle: 1, ric: 1, depense: 2, smic: -2, laicite: 2, ukraine: -1, ecologie: -2, 'services-publics': -1 },
  'xavier-bertrand':      { immigration: 1, retraites: -1, nucleaire: 2, fiscalite: -1, europe: 1, justice: 2, proportionnelle: -1, ric: 0, depense: 1, smic: -1, laicite: 2, ukraine: 1, ecologie: 0, 'services-publics': 0 },
  'david-lisnard':        { immigration: 1, retraites: -2, nucleaire: 2, fiscalite: -2, europe: 1, justice: 2, proportionnelle: -1, ric: -1, depense: 2, smic: -2, laicite: 1, ukraine: 1, ecologie: 0, 'services-publics': -2 },
  'fabien-roussel':       { immigration: -1, retraites: 2, nucleaire: 2, fiscalite: 2, europe: 0, justice: 0, proportionnelle: 2, ric: 1, depense: -2, smic: 2, laicite: 1, ukraine: 0, ecologie: 1, 'services-publics': 2 },
  'marine-tondelier':     { immigration: -2, retraites: 2, nucleaire: -2, fiscalite: 2, europe: 2, justice: -2, proportionnelle: 2, ric: 1, depense: -2, smic: 2, laicite: -1, ukraine: 1, ecologie: 2, 'services-publics': 2 },
  'francois-ruffin':      { immigration: 0, retraites: 2, nucleaire: 0, fiscalite: 2, europe: -1, justice: -1, proportionnelle: 2, ric: 2, depense: -2, smic: 2, laicite: 0, ukraine: 0, ecologie: 1, 'services-publics': 2 },
  'olivier-faure':        { immigration: -1, retraites: 2, nucleaire: 0, fiscalite: 2, europe: 2, justice: -1, proportionnelle: 2, ric: 0, depense: -1, smic: 1, laicite: 0, ukraine: 2, ecologie: 2, 'services-publics': 1 },
  'segolene-royal':       { immigration: -1, retraites: 1, nucleaire: 0, fiscalite: 1, europe: 1, justice: 0, proportionnelle: 1, ric: 1, depense: -1, smic: 1, laicite: 0, ukraine: -1, ecologie: 2, 'services-publics': 1 },
  'jerome-guedj':         { immigration: -1, retraites: 2, nucleaire: 0, fiscalite: 2, europe: 2, justice: 0, proportionnelle: 2, ric: 0, depense: -1, smic: 1, laicite: 2, ukraine: 2, ecologie: 1, 'services-publics': 1 },
  'emmanuel-maurel':      { immigration: -1, retraites: 2, nucleaire: 1, fiscalite: 2, europe: -1, justice: 0, proportionnelle: 2, ric: 1, depense: -2, smic: 2, laicite: 2, ukraine: 0, ecologie: 1, 'services-publics': 2 },
  'bernard-cazeneuve':    { immigration: 0, retraites: -1, nucleaire: 1, fiscalite: 1, europe: 2, justice: 1, proportionnelle: 1, ric: -1, depense: 0, smic: 0, laicite: 2, ukraine: 2, ecologie: 1, 'services-publics': 0 },
  'karim-bouamrane':      { immigration: 0, retraites: 1, nucleaire: 0, fiscalite: 1, europe: 2, justice: 1, proportionnelle: 1, ric: 0, depense: 0, smic: 1, laicite: 1, ukraine: 2, ecologie: 1, 'services-publics': 1 },
  'delphine-batho':       { immigration: -1, retraites: 1, nucleaire: -2, fiscalite: 2, europe: 1, justice: -1, proportionnelle: 2, ric: 1, depense: -1, smic: 1, laicite: 0, ukraine: 1, ecologie: 2, 'services-publics': 2 },
  'nathalie-arthaud':     { immigration: -2, retraites: 2, nucleaire: 0, fiscalite: 2, europe: -1, justice: -2, proportionnelle: 0, ric: 0, depense: -2, smic: 2, laicite: -1, ukraine: -2, ecologie: 0, 'services-publics': 2 },
  'nicolas-dupont-aignan':{ immigration: 2, retraites: 1, nucleaire: 2, fiscalite: 0, europe: -2, justice: 2, proportionnelle: 1, ric: 2, depense: 1, smic: 0, laicite: 2, ukraine: -1, ecologie: -1, 'services-publics': 1 },
  'florian-philippot':    { immigration: 2, retraites: 1, nucleaire: 2, fiscalite: 0, europe: -2, justice: 2, proportionnelle: 1, ric: 2, depense: 1, smic: 0, laicite: 2, ukraine: -2, ecologie: -2, 'services-publics': 1 },
  'francois-asselineau':  { immigration: 1, retraites: 1, nucleaire: 2, fiscalite: 0, europe: -2, justice: 1, proportionnelle: 1, ric: 2, depense: 0, smic: 0, laicite: 1, ukraine: -2, ecologie: -1, 'services-publics': 2 },
  'dominique-de-villepin':{ immigration: 0, retraites: -1, nucleaire: 2, fiscalite: 1, europe: 2, justice: 1, proportionnelle: 1, ric: 0, depense: 1, smic: 0, laicite: 1, ukraine: 1, ecologie: 1, 'services-publics': 0 },
}

// 3x3 grid keyed by `${soc}-${eco}` with soc/eco in {open,center,order} / {left,center,right}
export const quizPersonas = {
  'open-left': {
    title: 'Rouge-vert convaincu',
    tagline: 'Redistribuer, verdir, ouvrir : le grand soir, mais à vélo.',
    gradient: 'from-rose-500 via-red-500 to-emerald-500',
  },
  'open-center': {
    title: 'Progressiste pragmatique',
    tagline: 'Ouvert sur la société, prudent sur le portefeuille : le centre-gauche vous fait de l’œil.',
    gradient: 'from-pink-500 via-fuchsia-500 to-sky-500',
  },
  'open-right': {
    title: 'Libéral décontracté',
    tagline: 'Liberté partout, dans l’économie comme dans la société. Une espèce rare en France.',
    gradient: 'from-amber-400 via-orange-400 to-sky-500',
  },
  'center-left': {
    title: 'Social-républicain',
    tagline: 'Le cœur à gauche sur l’économie, la tête au centre sur le reste : tout le monde vous courtise.',
    gradient: 'from-red-500 via-rose-400 to-slate-500',
  },
  'center-center': {
    title: 'Équilibriste',
    tagline: 'Ni tout à fait ceci, ni tout à fait cela : c’est vous qui ferez le second tour.',
    gradient: 'from-slate-500 via-indigo-500 to-slate-700',
  },
  'center-right': {
    title: 'Réformateur tranquille',
    tagline: 'Rigueur budgétaire et modération sociétale : le centre-droit dans le texte.',
    gradient: 'from-sky-500 via-indigo-500 to-blue-700',
  },
  'order-left': {
    title: 'Souverainiste social',
    tagline: 'État fort, frontières fermes, salaires en hausse : un cocktail que plusieurs candidats se disputent.',
    gradient: 'from-blue-700 via-slate-700 to-red-600',
  },
  'order-center': {
    title: 'Gaulliste de la table de cuisine',
    tagline: 'Autorité, nation, bon sens : de l’ordre, sans casser le modèle social.',
    gradient: 'from-blue-800 via-blue-600 to-slate-500',
  },
  'order-right': {
    title: 'Droite d’autorité',
    tagline: 'Moins d’impôts, plus de sécurité, moins d’immigration : la droite ferme vous tend le bulletin.',
    gradient: 'from-blue-900 via-indigo-800 to-slate-900',
  },
}

export const QUIZ_FEEDBACK_URL = 'https://github.com/milardv/presidentielle2027/issues'
