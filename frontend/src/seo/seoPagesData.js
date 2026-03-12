export const SITE_NAME = 'Présidentielles 2027'
export const SITE_URL = 'https://electionpresidentielle2027.com'
export const SITE_LOGO_PATH = '/site-logo.svg'
export const SITE_FAVICON_PATH = '/favicon.svg'
export const SITE_SOCIAL_IMAGE_PATH = '/site-social-card.svg'

function candidatePage({
  slug,
  title,
  description,
  heroTitle,
  heroIntro,
  queries,
  summary,
  candidatePath,
  sections,
  faqs,
}) {
  return {
    slug,
    title,
    description,
    heroEyebrow: 'Candidat 2027',
    heroTitle,
    heroIntro,
    queries,
    summary,
    sections,
    faqs,
    relatedLinks: [
      candidatePath
        ? { label: 'Voir la fiche détaillée', href: candidatePath }
        : { label: 'Voir les sondages 2027', href: '/polls' },
      { label: 'Comparer les sondages', href: '/polls' },
      { label: 'Retour à l’accueil', href: '/' },
    ],
  }
}

export const seoPages = [
  {
    slug: 'presidentielle-2027',
    title: 'Présidentielle 2027 : candidats, sondages, date et intentions de vote',
    description:
      'Présidentielle 2027 : date probable, candidats déjà en vue, sondages, intentions de vote et règles utiles pour comprendre la campagne.',
    heroEyebrow: 'Guide 2027',
    heroTitle: 'Présidentielle 2027 : ce qu’il faut savoir dès maintenant',
    heroIntro:
      'La présidentielle 2027 reste très ouverte. Toutes les candidatures ne sont pas arrêtées, les sondages varient selon les scénarios, et il faut distinguer ce qui est déjà solide de ce qui relève encore des hypothèses.',
    queries: [
      'présidentielle 2027',
      'élection présidentielle 2027',
      'qui sera président en 2027',
      'qui sera candidat 2027',
    ],
    summary: [
      'La campagne se lit d’abord par statuts de candidature, blocs politiques et scénarios de sondage.',
      'Aucun vainqueur sérieux ne peut être annoncé à ce stade, mais plusieurs noms structurent déjà le débat.',
      'Le calendrier, les règles du scrutin et les rapports de force permettent déjà de suivre 2027 intelligemment.',
    ],
    sections: [
      {
        title: 'Ce que l’on sait déjà sur 2027',
        paragraphs: [
          'La prochaine présidentielle française aura lieu en 2027, dans un paysage encore mouvant. Plusieurs personnalités sont déjà déclarées, d’autres sont testées dans les enquêtes d’opinion, et certaines restent surtout des hypothèses politiques ou partisanes.',
          'Le point important est simple : la campagne n’est pas figée. Pour comprendre 2027, il faut regarder les candidatures crédibles, les rapports de force par bloc, et la manière dont les instituts testent les différents scénarios de premier tour.',
        ],
      },
      {
        title: 'Comment se faire une idée fiable de la course',
        paragraphs: [
          'Le bon réflexe consiste à croiser plusieurs éléments : le statut réel de chaque candidat, les sondages les plus récents, les thèmes sur lesquels il prend position, et sa capacité à rassembler au-delà de son socle politique.',
          'Autrement dit, suivre 2027 ne consiste pas seulement à demander qui est en tête aujourd’hui. Il faut aussi regarder qui peut durer, qui peut élargir sa base, et qui peut transformer une visibilité médiatique en candidature réellement compétitive.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Où voir les candidats à la présidentielle 2027 ?',
        answer:
          'La liste utile n’est pas seulement une liste de noms. Il faut regarder qui est déclaré, qui est simplement testé, et qui dispose déjà d’un appareil politique ou d’une dynamique suffisante pour compter en 2027.',
      },
      {
        question: 'Où voir les sondages de la présidentielle 2027 ?',
        answer:
          'Les sondages doivent être lus institut par institut, scénario par scénario, avec attention à la date de terrain. Une seule étude ne suffit jamais à résumer une campagne aussi ouverte.',
      },
      {
        question: 'Peut-on déjà savoir qui gagnera en 2027 ?',
        answer:
          'Non. À ce stade, les données permettent surtout d’identifier les candidats les plus solides, les blocs les plus structurés et les scénarios qui reviennent le plus souvent, pas de désigner un vainqueur certain.',
      },
    ],
    relatedLinks: [
      { label: 'Voir l’accueil principal', href: '/' },
      { label: 'Voir les sondages 2027', href: '/polls' },
      { label: 'Voir les candidats 2027', href: '/candidats-presidentielle-2027/' },
    ],
  },
  {
    slug: 'sondage-presidentielle-2027',
    title: 'Sondage présidentielle 2027 : intentions de vote, classement et dynamique',
    description:
      'Sondage présidentielle 2027 : ce que disent vraiment les intentions de vote, comment comparer les instituts et ce qu’on peut déjà déduire des scénarios testés.',
    heroEyebrow: 'Sondages 2027',
    heroTitle: 'Sondage présidentielle 2027 : ce que montrent vraiment les intentions de vote',
    heroIntro:
      'Les sondages 2027 donnent une photographie utile du rapport de force, mais ils ne disent ni tout ni définitivement qui gagnera. Pour bien les lire, il faut comparer les instituts, les dates de terrain et les scénarios testés.',
    queries: [
      'présidentielle 2027 sondage',
      'sondage présidentielle 2027',
      'intentions de vote 2027',
      'sondages présidentielle 2027 en direct',
      'classement candidats présidentielle 2027',
      'sondage IFOP présidentielle 2027',
      'qui va gagner présidentielle 2027',
      'probabilité victoire présidentielle 2027',
    ],
    summary: [
      'Un sondage vaut surtout par sa date, son institut et la composition exacte de son scénario.',
      'Les écarts faibles et les variations marginales ne doivent pas être surinterprétés.',
      'La meilleure lecture vient de la comparaison entre plusieurs études, pas d’un seul chiffre isolé.',
    ],
    sections: [
      {
        title: 'Ce que disent vraiment les sondages 2027',
        paragraphs: [
          'Une intention de vote ne mesure pas un résultat futur certain. Elle mesure une situation donnée, à une date donnée, dans un scénario précis. Changer un nom dans le tableau, modifier l’offre politique ou déplacer le terrain de quelques semaines suffit parfois à faire bouger l’ordre d’arrivée.',
          'La bonne question n’est donc pas seulement qui est premier. Il faut aussi regarder qui est régulièrement bien placé, qui plafonne, qui progresse selon les configurations, et quels candidats existent surtout dans un scénario particulier.',
        ],
      },
      {
        title: 'Comment comparer IFOP, Harris, OpinionWay, Elabe ou Cluster17',
        paragraphs: [
          'Chaque institut apporte sa propre photographie. Les différences peuvent venir de la méthode, de la date de terrain, du wording ou simplement du scénario testé. C’est pourquoi il faut comparer plusieurs études au lieu de transformer un seul sondage en verdict.',
          'Lorsqu’un nom revient en tête dans plusieurs enquêtes, ou lorsqu’un même bloc politique reste durablement haut quel que soit l’institut, on tient déjà une information plus robuste qu’un classement isolé publié un jour donné.',
        ],
      },
      {
        title: 'Peut-on déjà savoir qui va gagner ?',
        paragraphs: [
          'Non. En mars 2026, il est beaucoup trop tôt pour confondre intentions de vote et résultat final. Les candidatures ne sont pas toutes stabilisées, les alliances peuvent encore bouger et la campagne elle-même n’a pas encore produit tous ses effets.',
          'En revanche, les sondages permettent déjà d’identifier les candidats les plus visibles, les plus testés et les plus capables d’entrer dans une course crédible au premier tour.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Où voir les derniers sondages présidentielle 2027 ?',
        answer:
          'Il faut regarder les études les plus récentes, mais surtout les comparer entre elles. La date de terrain, l’institut et le scénario comptent davantage qu’un titre de publication isolé.',
      },
      {
        question: 'Le site affiche-t-il une probabilité de victoire ?',
        answer:
          'Pas sous la forme d’une prédiction fermée. Une campagne aussi ouverte se lit mieux par tendances, hiérarchie de candidats et répétition des scénarios que par promesse de certitude.',
      },
      {
        question: 'Les sondages sont-ils mis à jour automatiquement ?',
        answer:
          'Oui. Les données sont stockées en base puis relues par le front pour garder un affichage rapide, stable et facile à comparer dans le temps.',
      },
    ],
    relatedLinks: [
      { label: 'Ouvrir la page sondages', href: '/polls' },
      { label: 'Voir les candidats 2027', href: '/candidats-presidentielle-2027/' },
      { label: 'Retour au guide présidentielle 2027', href: '/presidentielle-2027/' },
    ],
  },
  {
    slug: 'candidats-presidentielle-2027',
    title: 'Candidats présidentielle 2027 : liste, profils et statuts',
    description:
      'Qui sont les candidats à la présidentielle 2027 ? Les noms déjà sérieux, les candidatures plausibles et les profils simplement testés dans les sondages.',
    heroEyebrow: 'Candidats',
    heroTitle: 'Candidats présidentielle 2027 : qui compte vraiment à ce stade ?',
    heroIntro:
      'La question utile n’est pas seulement de savoir qui est cité. Il faut distinguer les candidatures déclarées, les profils plausibles, et les noms qui existent surtout parce qu’ils sont testés dans les sondages.',
    queries: [
      'candidats présidentielle 2027',
      'qui sera candidat 2027',
      'qui peut se présenter en 2027',
    ],
    summary: [
      'Tous les noms visibles en 2027 n’ont pas le même niveau de réalité politique.',
      'Le bon tri consiste à séparer les candidats déclarés, les candidatures probables et les profils encore hypothétiques.',
      'Pour juger un candidat, il faut regarder son statut, son parti, ses positions et sa présence dans les sondages.',
    ],
    sections: [
      {
        title: 'Qui compte vraiment en 2027 ?',
        paragraphs: [
          'À ce stade, comptent surtout les personnalités qui réunissent au moins une partie des conditions suivantes : un parti ou un appareil identifiable, une exposition nationale régulière, un espace politique clair, et une présence récurrente dans les intentions de vote.',
          'Cela permet de faire la différence entre une candidature déjà installée, une ambition sérieuse en cours de construction, et un simple nom d’essai utilisé par les instituts pour tester un électorat ou une famille politique.',
        ],
      },
      {
        title: 'Comment reconnaître une candidature crédible',
        paragraphs: [
          'Une candidature crédible ne repose pas seulement sur la notoriété. Elle suppose aussi une capacité d’organisation, des relais territoriaux, des prises de position cohérentes et, à terme, la possibilité d’obtenir les parrainages nécessaires.',
          'Autrement dit, un bon classement dans un sondage peut signaler un potentiel, mais il ne suffit pas à lui seul à faire d’une personnalité un candidat solide pour l’élection présidentielle.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Tous les noms visibles dans les sondages sont-ils de vrais candidats ?',
        answer:
          'Non. Certains sont déjà engagés, d’autres sont seulement testés pour mesurer un rapport de force. Il faut donc toujours distinguer candidature réelle, hypothèse conditionnelle et simple scénario d’enquête.',
      },
      {
        question: 'Comment savoir qui est officiellement candidat ?',
        answer:
          'Le bon indicateur n’est pas seulement la notoriété, mais le statut politique annoncé : déclaration formelle, candidature envisagée, ou simple présence dans les scénarios d’intentions de vote.',
      },
      {
        question: 'Où voir le détail d’un candidat ?',
        answer:
          'Une fiche utile doit montrer plus qu’un portrait : statut, positions, interventions, dynamique médiatique et liens avec les principaux sondages.',
      },
    ],
    relatedLinks: [
      { label: 'Voir l’accueil des candidats', href: '/' },
      { label: 'Jordan Bardella 2027', href: '/bardella-2027/' },
      { label: 'Gabriel Attal 2027', href: '/attal-president-2027/' },
    ],
  },
  {
    slug: 'quand-aura-lieu-la-presidentielle-2027',
    title: 'Quand aura lieu la présidentielle 2027 ? Date, calendrier et rythme du scrutin',
    description:
      'Quand aura lieu la présidentielle 2027 ? Réponse claire sur la date officielle, le calendrier attendu et l’écart entre les deux tours.',
    heroEyebrow: 'Calendrier',
    heroTitle: 'Quand aura lieu la présidentielle 2027 ?',
    heroIntro:
      'Au 11 mars 2026, la date officielle n’est pas encore publiée. On peut néanmoins répondre clairement à la question : l’élection doit se tenir au printemps 2027, avec deux tours espacés de quatorze jours.',
    queries: [
      'quand aura lieu la présidentielle 2027',
      'date élections présidentielles 2027',
    ],
    summary: [
      'La date exacte n’est pas encore officielle au 11 mars 2026.',
      'Le scrutin doit se tenir au printemps 2027.',
      'Le second tour intervient quatorze jours après le premier.',
    ],
    sections: [
      {
        title: 'Ce qui est déjà certain',
        paragraphs: [
          'La prochaine élection présidentielle aura bien lieu en 2027 et se déroulera, comme d’habitude, en deux tours. Le rythme institutionnel de la Ve République conduit à un scrutin organisé au printemps, avec un second tour quatorze jours après le premier.',
          'Ce cadre général est solide. Il permet déjà de comprendre le tempo politique de l’année 2027, même si les dates précises ne sont pas encore arrêtées officiellement.',
        ],
      },
      {
        title: 'Ce qui n’est pas encore officiel',
        paragraphs: [
          'Au 11 mars 2026, le décret de convocation n’a pas encore fixé la date exacte du premier tour. Il faut donc éviter d’annoncer un jour précis comme s’il était déjà officiel.',
          'La réponse honnête à la question est donc la suivante : printemps 2027, deux tours, quatorze jours d’écart, mais calendrier détaillé encore en attente de publication officielle.',
        ],
      },
    ],
    faqs: [
      {
        question: 'La date du premier tour 2027 est-elle officielle ?',
        answer:
          'Non, pas encore au 11 mars 2026. La date exacte doit encore être fixée par les autorités compétentes et publiée officiellement.',
      },
      {
        question: 'Combien de temps sépare les deux tours ?',
        answer:
          'Le second tour de l’élection présidentielle intervient quatorze jours après le premier.',
      },
      {
        question: 'Où suivre les candidats en attendant la date officielle ?',
        answer:
          'En attendant le calendrier détaillé, le plus utile est de suivre les candidats les plus crédibles, les intentions de vote et les grands thèmes de campagne déjà visibles.',
      },
    ],
    relatedLinks: [
      { label: 'Comment se déroule l’élection présidentielle', href: '/comment-se-deroule-election-presidentielle/' },
      { label: 'Voir les sondages 2027', href: '/polls' },
      { label: 'Retour au guide 2027', href: '/presidentielle-2027/' },
    ],
  },
  {
    slug: 'qui-peut-se-presenter-en-2027',
    title: 'Qui peut se présenter en 2027 ? Conditions pour être candidat à la présidentielle',
    description:
      'Qui peut se présenter en 2027 ? Réponse claire sur les conditions légales de candidature et le rôle décisif des 500 parrainages.',
    heroEyebrow: 'Règles',
    heroTitle: 'Qui peut se présenter en 2027 ?',
    heroIntro:
      'En théorie, tout citoyen français remplissant les conditions légales peut briguer l’Élysée. En pratique, la vraie barrière est politique : il faut aussi obtenir 500 présentations d’élus.',
    queries: [
      'qui peut se présenter en 2027',
      'conditions candidature présidentielle 2027',
    ],
    summary: [
      'Être connu ne suffit pas pour devenir candidat à la présidentielle.',
      'Il faut remplir les conditions légales de base et obtenir 500 présentations d’élus.',
      'La difficulté est autant politique que juridique.',
    ],
    sections: [
      {
        title: 'La réponse courte',
        paragraphs: [
          'Peut se présenter à l’élection présidentielle un citoyen français majeur, jouissant de ses droits civiques et capable de satisfaire aux exigences prévues pour déposer une candidature régulière.',
          'Le point décisif, en pratique, est l’obtention de 500 présentations d’élus provenant d’au moins 30 départements ou collectivités d’outre-mer, sans concentration excessive sur un seul territoire.',
        ],
      },
      {
        title: 'Pourquoi tout le monde ne peut pas réellement aller au bout',
        paragraphs: [
          'Une notoriété médiatique, un bon sondage ou une forte présence sur les réseaux ne suffisent pas. Pour devenir un candidat réel, il faut une organisation, des relais territoriaux et la capacité de convaincre des élus de parrainer la candidature.',
          'C’est pour cela qu’il existe toujours un écart entre les personnalités dont on parle beaucoup et celles qui ont une chance concrète d’être officiellement sur la ligne de départ.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Faut-il 500 parrainages pour être candidat ?',
        answer:
          'Oui. L’obtention de 500 présentations d’élus constitue la condition politique la plus déterminante pour transformer une ambition en candidature effective.',
      },
      {
        question: 'Peut-on être candidat simplement parce qu’on est testé dans les sondages ?',
        answer:
          'Non. Être testé dans une enquête d’opinion peut signaler une existence politique, mais cela ne remplace ni les conditions légales ni la capacité à obtenir des présentations d’élus.',
      },
      {
        question: 'Quels profils ont vraiment une chance de compter en 2027 ?',
        answer:
          'Ce sont généralement ceux qui combinent notoriété nationale, appareil politique, relais territoriaux et capacité à exister durablement dans les sondages et le débat public.',
      },
    ],
    relatedLinks: [
      { label: 'Voir les candidats 2027', href: '/candidats-presidentielle-2027/' },
      { label: 'Voir les sondages', href: '/polls' },
      { label: 'Comprendre le scrutin', href: '/comment-se-deroule-election-presidentielle/' },
    ],
  },
  {
    slug: 'macron-peut-il-se-representer-en-2027',
    title: 'Macron peut-il se représenter en 2027 ?',
    description:
      'Macron peut-il se représenter en 2027 ? Réponse constitutionnelle claire et conséquences politiques pour la succession du bloc central.',
    heroEyebrow: 'Constitution',
    heroTitle: 'Macron peut-il se représenter en 2027 ?',
    heroIntro:
      'La réponse courte est non. En l’état actuel de l’article 6 de la Constitution, Emmanuel Macron ne peut pas exercer un troisième mandat consécutif après 2017 et 2022.',
    queries: [
      'macron peut-il se représenter en 2027',
      'macron 2027',
    ],
    summary: [
      'L’article 6 de la Constitution limite l’exercice à deux mandats consécutifs.',
      'Emmanuel Macron a déjà été élu en 2017 puis en 2022.',
      'En l’état actuel du droit, il ne peut donc pas être candidat à un nouveau mandat consécutif en 2027.',
    ],
    sections: [
      {
        title: 'La réponse juridique',
        paragraphs: [
          'L’article 6 de la Constitution prévoit qu’aucun président ne peut exercer plus de deux mandats consécutifs. Emmanuel Macron ayant été élu une première fois en 2017 puis réélu en 2022, il n’entre pas dans le cadre d’une candidature à un troisième mandat consécutif en 2027.',
          'Ce point ne relève pas d’une interprétation politique flottante. C’est une conséquence directe du droit constitutionnel actuellement en vigueur.',
        ],
      },
      {
        title: 'Pourquoi la question reste centrale malgré tout',
        paragraphs: [
          'Même sans candidature possible, Emmanuel Macron continue de peser sur 2027 par la question de sa succession, de son influence et de la recomposition de son espace politique.',
          'Autrement dit, demander si Macron peut se représenter revient souvent, en réalité, à demander qui héritera du bloc central, qui s’en démarquera et comment cette succession redessinera le premier tour.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Emmanuel Macron peut-il faire un troisième mandat consécutif ?',
        answer:
          'Non. En l’état actuel de la Constitution, un troisième mandat présidentiel consécutif n’est pas possible.',
      },
      {
        question: 'Pourquoi voit-on encore Macron 2027 dans les recherches ?',
        answer:
          'Parce que la question porte souvent moins sur sa candidature que sur son influence, sa succession et l’avenir du camp qu’il a structuré depuis 2017.',
      },
      {
        question: 'Qui peut occuper cet espace politique en 2027 ?',
        answer:
          'Plusieurs figures du bloc central ou de la droite gouvernementale sont observées dans ce rôle, notamment celles qui disposent déjà d’une visibilité nationale et d’une crédibilité de premier tour.',
      },
    ],
    relatedLinks: [
      { label: 'Gabriel Attal 2027', href: '/attal-president-2027/' },
      { label: 'Édouard Philippe 2027', href: '/edouard-philippe-2027/' },
      { label: 'Voir les sondages', href: '/polls' },
    ],
  },
  {
    slug: 'comment-se-deroule-election-presidentielle',
    title: 'Comment se déroule l’élection présidentielle ? Règles, tours et qualification',
    description:
      'Comment se déroule l’élection présidentielle française ? Deux tours, qualification, majorité absolue et logique du scrutin expliqués simplement.',
    heroEyebrow: 'Mode d’emploi',
    heroTitle: 'Comment se déroule l’élection présidentielle ?',
    heroIntro:
      'L’élection présidentielle française se déroule en deux tours : tous les candidats qualifiés au premier, puis les deux premiers au second si personne n’obtient la majorité absolue dès le départ.',
    queries: [
      'comment se déroule l election présidentielle',
      'règles élection présidentielle france',
    ],
    summary: [
      'Le scrutin se joue en deux tours.',
      'Les deux premiers du premier tour se qualifient pour le second.',
      'Le vainqueur du second tour devient président de la République.',
    ],
    sections: [
      {
        title: 'Le premier tour',
        paragraphs: [
          'Au premier tour, tous les candidats officiellement qualifiés sont en compétition. Si l’un d’entre eux recueille la majorité absolue des suffrages exprimés, il est élu immédiatement.',
          'Dans les faits contemporains, ce cas est exceptionnel. Le premier tour sert donc surtout à sélectionner les deux finalistes et à mesurer le poids réel de chaque bloc politique.',
        ],
      },
      {
        title: 'Pourquoi le second tour change tout',
        paragraphs: [
          'Une fois les deux finalistes connus, l’élection devient un duel. Les électeurs des candidats éliminés doivent alors arbitrer, se reporter, s’abstenir ou voter blanc, ce qui modifie fortement la logique du scrutin.',
          'C’est pour cela que la lecture de 2027 ne peut pas s’arrêter au premier tour : il faut aussi regarder les réserves de voix, les compatibilités politiques et les rejets réciproques.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Combien y a-t-il de tours à l’élection présidentielle ?',
        answer:
          'Deux, sauf si un candidat obtient dès le premier tour la majorité absolue des suffrages exprimés.',
      },
      {
        question: 'Qui se qualifie pour le second tour ?',
        answer:
          'Les deux candidats arrivés en tête au premier tour se qualifient pour le second.',
      },
      {
        question: 'Pourquoi les reports de voix comptent-ils autant ?',
        answer:
          'Parce qu’entre les deux tours, les électorats des candidats éliminés deviennent décisifs pour faire basculer l’élection.',
      },
    ],
    relatedLinks: [
      { label: 'Voir les sondages 2027', href: '/polls' },
      { label: 'Voir les candidats', href: '/' },
      { label: 'Quand aura lieu la présidentielle 2027', href: '/quand-aura-lieu-la-presidentielle-2027/' },
    ],
  },
  {
    slug: 'simulateur-presidentielle-2027',
    title: 'Simulateur présidentielle 2027 : comparer les candidats et les scénarios',
    description:
      'Simulateur présidentielle 2027 : ce qu’on peut vraiment comparer aujourd’hui entre candidats, scénarios de sondages et blocs politiques.',
    heroEyebrow: 'Comparaison',
    heroTitle: 'Simulateur présidentielle 2027 : ce qu’on peut comparer sérieusement',
    heroIntro:
      'Il n’existe pas encore de simulateur crédible capable de prédire 2027 avec certitude. En revanche, on peut déjà comparer les scénarios de premier tour, les candidats testés et les grands équilibres politiques.',
    queries: [
      'simulateur présidentielle 2027',
      'comparateur présidentielle 2027',
    ],
    summary: [
      'Le plus utile aujourd’hui est de comparer les scénarios, pas de promettre une prédiction définitive.',
      'Les intentions de vote permettent de lire les rapports de force par candidat et par bloc.',
      'Un bon comparateur montre les écarts, les variantes de scénario et les dynamiques, pas un faux verdict figé.',
    ],
    sections: [
      {
        title: 'Ce qu’un simulateur peut vraiment montrer en 2026',
        paragraphs: [
          'À ce stade, un outil sérieux ne peut pas dire qui sera élu en 2027. En revanche, il peut comparer les candidats présents dans les sondages, observer comment un scénario change quand un nom entre ou sort, et mesurer quels blocs restent les plus solides.',
          'C’est déjà beaucoup : cela permet de voir qui pèse réellement, qui n’existe que dans certains cas de figure et quels duels deviennent crédibles selon les configurations testées.',
        ],
      },
      {
        title: 'Ce qu’il ne faut pas promettre',
        paragraphs: [
          'Un simulateur honnête ne doit pas transformer des données encore incomplètes en prophétie. Les candidatures ne sont pas toutes arrêtées, les alliances peuvent bouger et la campagne réelle modifiera encore les rapports de force.',
          'La bonne approche consiste donc à comparer, hiérarchiser et observer les tendances, plutôt qu’à faire croire qu’un algorithme sait déjà qui gagnera la présidentielle 2027.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Existe-t-il déjà un simulateur fiable de second tour pour 2027 ?',
        answer:
          'Pas au sens d’un outil capable de prédire sérieusement l’issue finale. En revanche, les scénarios de sondages permettent déjà de comparer plusieurs configurations de premier tour et d’anticiper certains équilibres.',
      },
      {
        question: 'Par quoi faut-il commencer pour comparer les candidats ?',
        answer:
          'Le plus utile est de partir des intentions de vote, puis de regarder le statut réel du candidat, son bloc politique et sa capacité à exister au-delà d’un simple test de sondage.',
      },
      {
        question: 'À quoi sert alors cette page ?',
        answer:
          'Elle sert à répondre à la vraie question derrière le mot simulateur : quels candidats comparer, quels scénarios regarder et quelles limites garder en tête avant de tirer des conclusions trop tôt.',
      },
    ],
    relatedLinks: [
      { label: 'Voir les sondages', href: '/polls' },
      { label: 'Voir les candidats', href: '/' },
      { label: 'Guide présidentielle 2027', href: '/presidentielle-2027/' },
    ],
  },
  candidatePage({
    slug: 'bardella-2027',
    title: 'Bardella 2027 : candidature, sondages et scénario présidentielle',
    description:
      'Bardella 2027 : ce que signifie vraiment la place de Jordan Bardella dans les sondages, au RN et dans les scénarios de 2027.',
    heroTitle: 'Bardella 2027 : pourquoi Jordan Bardella compte déjà',
    heroIntro:
      'Jordan Bardella pèse en 2027 parce qu’il peut être lu de deux façons : comme figure politique propre du RN et comme variable décisive dans la stratégie autour de Marine Le Pen.',
    queries: ['bardella 2027', 'jordan bardella 2027', 'qui va gagner présidentielle 2027'],
    summary: [
      'Sa place dépend du scénario retenu et du rôle exact que le RN lui attribue.',
      'Ses niveaux doivent toujours être comparés à ceux de Marine Le Pen.',
      'La question centrale n’est pas seulement son score, mais son statut politique réel.',
    ],
    candidatePath: '/candidats/jordan-bardella',
    sections: [
      {
        title: 'Pourquoi Bardella pèse déjà autant',
        paragraphs: [
          'Jordan Bardella est devenu une figure nationale qui dépasse le simple rôle de porte-parole partisan. Son nom compte parce qu’il peut être testé comme candidature autonome, comme recours possible, ou comme indicateur du poids propre du RN dans l’opinion.',
          'Cela explique pourquoi il faut toujours lire ses chiffres avec prudence : un score Bardella ne dit pas seulement quelque chose sur lui, il dit aussi quelque chose sur l’état du bloc national-populiste et sur la place laissée ou non à d’autres figures de ce camp.',
        ],
      },
      {
        title: 'Les trois choses à regarder',
        paragraphs: [
          'D’abord son statut : candidature assumée, hypothèse conditionnelle ou simple test d’institut. Ensuite sa relation politique avec Marine Le Pen. Enfin sa capacité à tenir un niveau élevé dans plusieurs scénarios et pas seulement dans un cas isolé.',
          'Si un candidat reste haut quelles que soient les configurations, il devient un acteur structurant de la campagne. Si son niveau dépend beaucoup de la présence ou de l’absence d’un autre nom, la lecture est plus conditionnelle.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Jordan Bardella est-il officiellement candidat en 2027 ?',
        answer:
          'La question doit être lue avec précision : selon les séquences, Jordan Bardella peut être présenté comme candidature possible, hypothèse conditionnelle ou simple scénario de sondage. Il faut donc regarder son statut exact et non seulement son nom.',
      },
      {
        question: 'Pourquoi Bardella et Le Pen sont-ils toujours comparés ?',
        answer:
          'Parce qu’ils occupent le même espace politique et que la présence de l’un modifie immédiatement la lecture électorale de l’autre.',
      },
      {
        question: 'Où voir ses scores dans les intentions de vote ?',
        answer:
          'Le plus utile est de comparer ses niveaux scénario par scénario, plutôt que de s’arrêter à un seul classement publié un jour donné.',
      },
    ],
  }),
  candidatePage({
    slug: 'le-pen-2027',
    title: 'Le Pen 2027 : candidature, statut et place dans les sondages',
    description:
      'Le Pen 2027 : pourquoi Marine Le Pen reste centrale, ce que change sa présence et comment lire sa place dans les intentions de vote.',
    heroTitle: 'Le Pen 2027 : un nom central pour toute la lecture du premier tour',
    heroIntro:
      'Marine Le Pen reste un repère majeur de 2027. Sa présence, son niveau et son statut modifient immédiatement la hiérarchie de nombreux autres candidats.',
    queries: ['le pen 2027', 'marine le pen 2027', 'sondage présidentielle 2027'],
    summary: [
      'Sa seule présence change la lecture du premier tour.',
      'Il faut regarder à la fois son statut, sa base électorale et l’effet sur le RN.',
      'Comparer Le Pen et Bardella éclaire la stratégie de tout son camp.',
    ],
    candidatePath: '/candidats/marine-le-pen',
    sections: [
      {
        title: 'Pourquoi Marine Le Pen reste structurante',
        paragraphs: [
          'Marine Le Pen reste l’un des noms qui organisent le plus fortement le paysage 2027. Quand elle est présente dans un scénario, la hiérarchie des autres candidats change souvent, notamment dans le camp national-populiste mais aussi dans la lecture globale du premier tour.',
          'C’est pour cela qu’il faut suivre à la fois son niveau électoral propre, son statut personnel et l’effet que sa présence produit sur les autres candidatures de droite ou d’extrême droite.',
        ],
      },
      {
        title: 'Ce qu’il faut regarder en priorité',
        paragraphs: [
          'La première question est de savoir dans quels scénarios elle apparaît et avec quel niveau. La deuxième consiste à voir comment sa présence modifie la place de Jordan Bardella et, plus largement, l’équilibre des autres blocs au premier tour.',
          'Autrement dit, Le Pen 2027 ne se lit pas seulement comme un cas individuel. C’est aussi une clé d’interprétation de l’ensemble du paysage électoral.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Marine Le Pen est-elle suivie dans les sondages 2027 ?',
        answer:
          'Oui. Lorsqu’elle figure dans un scénario, son niveau permet de mesurer non seulement sa force propre, mais aussi la façon dont toute la compétition se réorganise autour d’elle.',
      },
      {
        question: 'Pourquoi comparer Le Pen et Bardella ?',
        answer:
          'Parce que cette comparaison dit beaucoup sur la stratégie du RN et sur la manière dont son électorat pourrait se répartir selon la tête d’affiche retenue.',
      },
      {
        question: 'Où lire ses positions et ses interventions ?',
        answer:
          'Une fiche utile doit montrer ses prises de position, ses interventions médiatiques et la façon dont elles s’inscrivent dans la préparation de 2027.',
      },
    ],
  }),
  candidatePage({
    slug: 'attal-president-2027',
    title: 'Attal président 2027 : candidature, ligne politique et sondages',
    description:
      'Attal président 2027 : pourquoi Gabriel Attal est regardé comme un héritier possible du bloc central et comment lire sa crédibilité.',
    heroTitle: 'Attal président 2027 : la question de la crédibilité plus que du buzz',
    heroIntro:
      'Gabriel Attal apparaît comme l’un des héritiers possibles du bloc central. La vraie question n’est pas seulement sa visibilité, mais sa capacité à transformer cette visibilité en candidature de premier tour.',
    queries: ['attal président 2027', 'gabriel attal 2027', 'macron succession 2027'],
    summary: [
      'Son nom revient parce qu’il incarne une partie de la succession du bloc central.',
      'Il faut mesurer sa capacité à rassembler au-delà de son socle immédiat.',
      'Ses sondages n’ont de sens que rapportés à son espace politique et à ses concurrents directs.',
    ],
    candidatePath: '/candidats/gabriel-attal',
    sections: [
      {
        title: 'Pourquoi son nom revient autant',
        paragraphs: [
          'Depuis que la voie d’un nouveau mandat consécutif d’Emmanuel Macron est fermée, Gabriel Attal est naturellement observé comme l’un des profils capables de reprendre une partie de cet espace politique. Son âge, sa notoriété et son expérience gouvernementale nourrissent cette attention.',
          'Mais une présidentielle ne se gagne pas à la seule exposition médiatique. La vraie question est de savoir s’il peut tenir dans la durée, fédérer un bloc et apparaître comme plus qu’un symbole de succession.',
        ],
      },
      {
        title: 'Ce qui décidera de sa crédibilité',
        paragraphs: [
          'Il faut regarder son niveau dans les scénarios, sa capacité à parler au-delà du noyau macroniste, et sa faculté à exister face aux autres prétendants du centre et de la droite de gouvernement.',
          'Un candidat crédible pour 2027 n’est pas seulement un nom connu : c’est un profil capable de durer, de structurer un discours et de rester compétitif dans plusieurs hypothèses de premier tour.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Gabriel Attal est-il déjà candidat ?',
        answer:
          'Il faut distinguer ici l’ambition politique, le statut officiel et la présence dans les sondages. Les trois ne se confondent pas et doivent être lus séparément.',
      },
      {
        question: 'Pourquoi Attal est-il souvent relié à Macron 2027 ?',
        answer:
          'Parce qu’il est l’un des profils les plus souvent cités quand il s’agit de penser la succession du bloc central et l’après-Macron.',
      },
      {
        question: 'Où voir ses vidéos et ses tweets ?',
        answer:
          'Pour juger un candidat de ce type, il faut regarder ses prises de parole publiques autant que ses chiffres dans les intentions de vote.',
      },
    ],
  }),
  candidatePage({
    slug: 'edouard-philippe-2027',
    title: 'Édouard Philippe 2027 : candidature, profil et sondages',
    description:
      'Édouard Philippe 2027 : pourquoi il apparaît comme un profil solide du centre-droit et comment lire sa place dans la course.',
    heroTitle: 'Édouard Philippe 2027 : un profil de centre-droit déjà très installé',
    heroIntro:
      'Édouard Philippe est l’un des profils les plus solides du centre-droit pour 2027. Le sujet n’est pas seulement sa notoriété, mais sa capacité à agréger un espace politique assez large pour viser le second tour.',
    queries: ['édouard philippe 2027', 'philippe 2027', 'candidat centre droit 2027'],
    summary: [
      'Sa notoriété est déjà forte, mais elle doit encore se transformer en coalition électorale solide.',
      'Il faut mesurer son autonomie réelle par rapport au macronisme.',
      'Ses scores n’ont de sens qu’en regard de ses concurrents du centre et de la droite modérée.',
    ],
    candidatePath: '/candidats/edouard-philippe',
    sections: [
      {
        title: 'Pourquoi il apparaît comme un pivot',
        paragraphs: [
          'Édouard Philippe combine plusieurs atouts rares : une identification nationale élevée, une image d’ancien Premier ministre et une capacité à rassurer une partie de l’électorat modéré. Cela explique pourquoi son nom revient aussi souvent lorsqu’on parle de 2027.',
          'Mais être un pivot potentiel ne suffit pas. La vraie question est de savoir s’il peut transformer cette stature en dynamique électorale assez large pour dominer son camp et rester compétitif face aux autres blocs.',
        ],
      },
      {
        title: 'Comment lire sa candidature',
        paragraphs: [
          'Il faut regarder sa ligne politique propre, la place qu’il prend vis-à-vis du macronisme et sa capacité à attirer des électeurs du centre comme de la droite de gouvernement.',
          'Si cette capacité d’agrégation se confirme dans plusieurs scénarios de sondage, alors son nom ne sera plus seulement un symbole de stabilité, mais un vrai point d’appui pour la campagne 2027.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Édouard Philippe est-il déjà en campagne pour 2027 ?',
        answer:
          'La bonne lecture consiste à regarder son statut politique concret, ses prises de position récentes et la manière dont il se situe dans l’espace central et centre-droit.',
      },
      {
        question: 'Pourquoi le comparer à Gabriel Attal ?',
        answer:
          'Parce qu’ils peuvent viser une partie du même espace politique tout en proposant des styles, des réseaux et des trajectoires différentes.',
      },
      {
        question: 'Où voir ses interventions ?',
        answer:
          'Pour comprendre sa trajectoire, il faut regarder ses interventions médiatiques, ses positions publiques et leur cohérence avec une éventuelle candidature.',
      },
    ],
  }),
  candidatePage({
    slug: 'melenchon-2027',
    title: 'Mélenchon 2027 : candidature, ligne politique et rôle à gauche',
    description:
      'Mélenchon 2027 : pourquoi Jean-Luc Mélenchon continue de structurer la gauche et comment lire son poids dans les scénarios testés.',
    heroTitle: 'Mélenchon 2027 : un acteur qui continue de structurer la gauche',
    heroIntro:
      'Jean-Luc Mélenchon reste central pour 2027, qu’il soit lui-même candidat ou qu’il pèse sur la désignation du candidat final de son espace politique.',
    queries: ['mélenchon 2027', 'jean-luc mélenchon 2027', 'gauche 2027'],
    summary: [
      'Son nom reste incontournable dès qu’il s’agit de lire la gauche pour 2027.',
      'La vraie question est autant son rôle de structuration que son éventuelle candidature personnelle.',
      'Il faut comparer sa ligne, son bloc et ses performances aux autres profils de gauche.',
    ],
    candidatePath: '/candidats/jean-luc-melenchon',
    sections: [
      {
        title: 'Pourquoi il reste incontournable',
        paragraphs: [
          'Jean-Luc Mélenchon conserve une capacité rare à structurer le débat à gauche. Même quand il n’est pas au centre de l’actualité immédiate, sa ligne politique, sa base militante et sa place dans l’espace insoumis continuent de peser sur tout l’équilibre de ce camp.',
          'C’est ce qui explique la persistance de son nom dans les recherches : on ne cherche pas seulement à savoir s’il sera candidat, mais aussi quel effet sa présence ou son absence produira sur toute la gauche.',
        ],
      },
      {
        title: 'Ce qu’il faut regarder pour le juger',
        paragraphs: [
          'Il faut observer sa relation avec les autres forces de gauche, la manière dont les instituts le testent, et la capacité de sa ligne à tenir face à des offres concurrentes plus social-démocrates, écologistes ou populistes.',
          'Autrement dit, Mélenchon 2027 ne se lit pas seulement en points de sondage. Il se lit aussi en capacité de polarisation, de rassemblement ou de division.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Jean-Luc Mélenchon est-il suivi dans les sondages 2027 ?',
        answer:
          'Oui, quand il figure dans les scénarios, son niveau permet de mesurer à la fois sa force propre et l’état du rapport de force à gauche.',
      },
      {
        question: 'Pourquoi Mélenchon est-il souvent comparé à Glucksmann ?',
        answer:
          'Parce qu’ils représentent deux lignes différentes de la gauche et deux façons opposées d’élargir ou de structurer cet électorat.',
      },
      {
        question: 'Où voir ses prises de parole ?',
        answer:
          'Les prises de parole sont essentielles pour juger un profil comme le sien, car elles disent autant sa stratégie que ses positions de fond.',
      },
    ],
  }),
  candidatePage({
    slug: 'zemmour-2027',
    title: 'Zemmour 2027 : retour politique, sondages et place dans le débat',
    description:
      'Zemmour 2027 : ce que vaut encore son nom dans les scénarios testés et ce qu’il dit de l’état de la droite radicale.',
    heroTitle: 'Zemmour 2027 : ce que signifie encore son nom dans la course',
    heroIntro:
      'Éric Zemmour n’occupe plus la même position qu’en 2022, mais son nom reste utile pour mesurer la dispersion ou la recomposition de la droite radicale.',
    queries: ['zemmour 2027', 'éric zemmour 2027', 'droite radicale 2027'],
    summary: [
      'Son nom reste un indicateur de fragmentation politique plus qu’une évidence de candidature.',
      'Il faut regarder s’il existe encore comme pôle électoral distinct.',
      'Le bon angle n’est pas seulement sa personne, mais l’état de tout l’espace qu’il a contribué à structurer.',
    ],
    candidatePath: null,
    sections: [
      {
        title: 'Ce que sa présence signifie vraiment',
        paragraphs: [
          'Quand le nom d’Éric Zemmour apparaît encore dans les comparaisons ou dans certains scénarios, cela dit surtout quelque chose de l’état de la droite radicale : dispersion, concurrence interne, ou maintien d’un espace politique distinct.',
          'Sa place ne doit donc pas être lue de façon isolée. Elle prend son sens par rapport au RN, à Bardella, à Marine Le Pen et à la capacité de cet électorat à se concentrer sur une seule candidature.',
        ],
      },
      {
        title: 'Comment lire sa place en 2027',
        paragraphs: [
          'La bonne question est de savoir s’il conserve un socle identifiable, s’il réapparaît dans des scénarios crédibles et si sa présence modifie réellement le rapport de force à droite.',
          'S’il n’existe plus que marginalement dans les enquêtes, alors sa fonction devient surtout interprétative. S’il retrouve une capacité à perturber l’équilibre du bloc national, il redevient un facteur politique plus concret.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Éric Zemmour est-il encore un acteur politique à suivre pour 2027 ?',
        answer:
          'Oui, au moins comme indicateur d’un espace politique. La vraie question est de savoir s’il pèse encore directement dans les intentions de vote ou surtout dans la recomposition de son camp.',
      },
      {
        question: 'Pourquoi le comparer à Bardella et à Le Pen ?',
        answer:
          'Parce qu’ils se disputent ou se partagent une partie du même espace électoral, et que leur rapport de force dit beaucoup sur la structure du premier tour.',
      },
      {
        question: 'Où voir sa place dans les intentions de vote ?',
        answer:
          'La bonne lecture consiste à repérer les scénarios où il apparaît et à comparer immédiatement son niveau à celui des autres candidatures de droite radicale.',
      },
    ],
  }),
  candidatePage({
    slug: 'glucksmann-2027',
    title: 'Glucksmann 2027 : candidature, espace politique et dynamique',
    description:
      'Glucksmann 2027 : pourquoi Raphaël Glucksmann attire l’attention et comment juger sa capacité à exister comme candidature de gauche.',
    heroTitle: 'Glucksmann 2027 : une candidature possible, mais à quelles conditions ?',
    heroIntro:
      'Raphaël Glucksmann attire l’attention parce qu’il incarne une offre de gauche pro-européenne distincte de LFI comme du centre. La vraie question est de savoir si cette ligne peut devenir une candidature assez large pour peser en 2027.',
    queries: ['glucksmann 2027', 'raphaël glucksmann 2027', 'gauche sociale-démocrate 2027'],
    summary: [
      'Son nom monte parce qu’il incarne une offre différente à gauche.',
      'La clé est de savoir s’il peut élargir au-delà d’un public urbain, européen et réformiste.',
      'Il faut juger sa trajectoire à la fois par sa visibilité, ses positions et sa capacité de rassemblement.',
    ],
    candidatePath: '/candidats/raphael-glucksmann',
    sections: [
      {
        title: 'Pourquoi son nom progresse autant',
        paragraphs: [
          'Raphaël Glucksmann concentre une partie des attentes d’une gauche pro-européenne, sociale-démocrate et autonome vis-à-vis des blocs déjà bien identifiés. Cela suffit à faire de lui un nom de plus en plus observé dans la perspective de 2027.',
          'Mais l’attention ne suffit pas. Pour devenir un acteur central de la présidentielle, il faut encore transformer cette visibilité en force électorale, en capacité de rassemblement et en crédibilité nationale au premier tour.',
        ],
      },
      {
        title: 'Ce qu’il faut regarder pour le juger',
        paragraphs: [
          'Il faut regarder son positionnement propre, sa capacité à se différencier des autres offres de gauche et la manière dont les instituts le testent face à des profils concurrents. C’est là que l’on voit si son nom correspond à une simple curiosité politique ou à une candidature réellement montante.',
          'Il faut aussi observer si son espace reste niche ou s’il parvient à parler plus largement à l’électorat de gauche et du centre-gauche.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Raphaël Glucksmann est-il déjà candidat ?',
        answer:
          'La question doit être lue avec nuance : un nom peut être fortement présent dans le débat sans relever encore d’une candidature formellement arrêtée.',
      },
      {
        question: 'Pourquoi le comparer à Mélenchon ?',
        answer:
          'Parce qu’ils représentent deux lignes différentes pour la gauche 2027, avec des électorats, des stratégies et des horizons de coalition distincts.',
      },
      {
        question: 'Où voir ses prises de parole ?',
        answer:
          'Pour évaluer un profil de ce type, il faut regarder ses interventions publiques, ses thèmes récurrents et leur traduction éventuelle dans les scénarios de vote.',
      },
    ],
  }),
]

export function getSeoPageBySlug(slug) {
  return seoPages.find((page) => page.slug === slug) || null
}
