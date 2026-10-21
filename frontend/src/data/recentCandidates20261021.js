const source = (label, url, date) => ({ label, url, date })
const lcp = source('LCP · panorama des candidatures, vérifié le 21 octobre', 'https://lcp.fr/actualites/presidentielle-2027-la-liste-des-candidats-deja-en-lice-et-des-pretendants-436373', '2026-10-14')
const polony = source('Natacha Polony · annonce de candidature', 'https://www.npolony.fr/actualites', '2026-10-14')
const becht = source('La Tribune · annonce de candidature', 'https://www.latribune.fr/article/la-tribune-dimanche/politique/presidentielle/14658207962183/hy9g7dp5b7wl.html', '2026-09-24')
const platret = source('Info Chalon · compte rendu de la réunion publique', 'https://www.info-chalon.com/articles/2026/10/09/114461/presidentielle-abrogation-des-35h-retablissement-des-frontieres-nationales-decheance-des-mandats-pour-les-ennemis-de-l-interieur-gilles-platret-s-elance-dans-la-presidentielle-2027/', '2026-10-09')

export const recentCandidates20261021 = [
  {
    id: 'natacha-polony', name: 'Natacha Polony', bloc: 'Souverainistes', party: 'Nous sommes la France',
    status: 'declared', statusLabel: 'Déclarée le 14 octobre',
    summary: 'La journaliste et essayiste a annoncé sa candidature le 14 octobre 2026 sur France Inter, après le lancement de son mouvement Nous sommes la France.',
    themes: ['Production', 'Souveraineté', 'Éducation'], priority: 27, photoUrl: '',
    currentRole: 'Journaliste, essayiste et fondatrice de Nous sommes la France',
    biography: ['Journaliste et essayiste, Natacha Polony a lancé le mouvement Nous sommes la France en septembre 2026.', 'Elle annonce le 14 octobre 2026 sa candidature à l’élection présidentielle sur France Inter.'],
    keyPositions: [{ topic: 'Production en France', summary: 'Elle présente sa candidature autour d’une politique de production sur le sol français.', source: polony }],
    timeline: [{ date: '2026-10-14', title: 'Annonce de candidature', description: 'Annonce sur France Inter, relayée sur son site de campagne.', source: polony }],
    sources: [polony, lcp],
  },
  {
    id: 'olivier-becht', name: 'Olivier Becht', bloc: 'Centre', party: 'Sans étiquette',
    status: 'declared', statusLabel: 'Déclaré le 24 septembre',
    summary: 'L’ancien ministre délégué au Commerce extérieur et député du Haut-Rhin annonce sa candidature le 24 septembre 2026, avec une démarche qu’il présente comme dépassant les clivages.',
    themes: ['Institutions', 'Territoires', 'Économie'], priority: 28, photoUrl: '',
    currentRole: 'Député du Haut-Rhin, ancien ministre délégué au Commerce extérieur',
    biography: ['Olivier Becht est député du Haut-Rhin et ancien maire de Rixheim.', 'Il a été ministre délégué au Commerce extérieur dans le gouvernement d’Élisabeth Borne et annonce sa candidature présidentielle le 24 septembre 2026.'],
    keyPositions: [{ topic: 'Projet de candidature', summary: 'Il présente une démarche de refondation du modèle français et revendique de s’adresser aux électeurs au-delà des clivages.', source: becht }],
    timeline: [{ date: '2026-09-24', title: 'Annonce de candidature', description: 'La presse rapporte son entrée dans la course à l’Élysée.', source: becht }],
    sources: [becht, lcp],
  },
  {
    id: 'gilles-platret', name: 'Gilles Platret', bloc: 'Droite', party: 'Divers droite',
    status: 'declared', statusLabel: 'Déclaré le 8 octobre',
    summary: 'Le maire de Chalon-sur-Saône annonce sa candidature lors d’une réunion publique organisée dans sa ville le 8 octobre 2026.',
    themes: ['Institutions', 'Frontières', 'Travail'], priority: 29, photoUrl: '',
    currentRole: 'Maire de Chalon-sur-Saône',
    biography: ['Gilles Platret est maire de Chalon-sur-Saône depuis 2014.', 'Ancien membre des Républicains, il annonce sa candidature présidentielle le 8 octobre 2026 lors d’une réunion publique.'],
    keyPositions: [{ topic: 'Travail et frontières', summary: 'Lors de son lancement, il défend notamment l’abrogation des 35 heures et le rétablissement des frontières nationales, selon le compte rendu de la presse locale.', source: platret }],
    timeline: [{ date: '2026-10-08', title: 'Lancement à Chalon-sur-Saône', description: 'Annonce lors de la réunion publique « Parlons de la France ».', source: platret }],
    sources: [platret, source('TF1 Info · liste des candidatures', 'https://www.tf1info.fr/politique/election-presidentielle-2027-liste-des-candidats-deja-declares-2447104.html', '2026-10-21')],
  },
  {
    id: 'francois-hollande', name: 'François Hollande', bloc: 'Gauche', party: 'Parti socialiste',
    status: 'intent', statusLabel: 'Pressenti — décision annoncée pour décembre ou janvier',
    summary: 'L’ancien président prépare une éventuelle candidature et annonce une décision pour décembre 2026 ou janvier 2027. Il n’est pas déclaré à la date de vérification.',
    themes: ['Institutions', 'Europe', 'Social-démocratie'], priority: 30, photoUrl: '',
    currentRole: 'Député de la Corrèze, ancien président de la République',
    biography: ['François Hollande a été président de la République de 2012 à 2017.', 'Il est redevenu député de la Corrèze en 2024 et envisage une candidature pour 2027 sans l’avoir officialisée au 21 octobre 2026.'],
    keyPositions: [],
    timeline: [{ date: '2026-10-14', title: 'Une candidature toujours envisagée', description: 'Le panorama de LCP le classe parmi les personnalités qui préparent une éventuelle candidature et attendent avant de décider.', source: lcp }],
    sources: [lcp],
  },
]
