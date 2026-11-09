const source = (label, url, date) => ({ label, url, date })
const lcp = source('LCP · annonce de candidature', 'https://lcp.fr/actualites/le-judoka-teddy-riner-annonce-sa-candidature-a-l-election-presidentielle-de-2027-444920', '2026-11-09')
const franceinfo = source('franceinfo · annonce de candidature', 'https://www.franceinfo.fr/elections/presidentielle/la-resignation-n-est-pas-une-option-teddy-riner-annonce-sa-candidature-a-l-election-presidentielle-2027_8274359.html', '2026-11-09')

export const recentCandidates20261109 = [
  {
    id: 'teddy-riner', name: 'Teddy Riner', bloc: 'Sans étiquette', party: 'Sans étiquette',
    dataLastUpdated: '2026-11-09',
    status: 'declared', statusLabel: 'Déclaré le 9 novembre',
    summary: 'Le judoka, champion olympique, annonce le 9 novembre 2026 sa candidature par une vidéo sur X et un entretien au Parisien. Il se dit « ni l’un, ni l’autre » quand on l’interroge sur un ancrage à gauche ou à droite.',
    themes: ['Cohésion sociale', 'Dette publique', 'Jeunesse'], priority: 31, photoUrl: '',
    currentRole: 'Judoka, champion olympique',
    biography: [
      'Âgé de 37 ans, Teddy Riner est l’un des judokas les plus titrés de l’histoire, plusieurs fois champion olympique.',
      'Il annonce le 9 novembre 2026 sa candidature à l’élection présidentielle, sous le slogan « La France qu’on veut ». Il dit y avoir pensé pendant les Jeux de Paris 2024 et avoir tranché cet automne.',
      'Il revendique un premier cercle d’une vingtaine de personnes issues de la société civile, de la fonction publique et d’anciens ministres, sans parti identifié à la date de l’annonce. Comme tout candidat, il doit réunir 500 parrainages d’élus.',
    ],
    keyPositions: [
      { topic: 'Positionnement', summary: 'Il refuse de se situer à gauche ou à droite et veut être « le président qui réconcilie et qui fédère ».', source: lcp },
      { topic: 'Retraites', summary: 'Il défend une réforme tenant compte de la démographie et de la pénibilité, en conservant la répartition sans exclure « une part de capitalisation ».', source: lcp },
      { topic: 'Dette et déclin', summary: 'Dans sa vidéo d’annonce, il décrit une France « qui s’effondre sous le poids de la dette » et appelle à plus de « bon sens, de fermeté, de justice ». Aucune mesure chiffrée n’est présentée à ce stade.', source: franceinfo },
    ],
    timeline: [
      { date: '2026-11-09', title: 'Annonce de candidature', description: 'Vidéo publiée sur X et entretien au Parisien ; il n’exclut pas de disputer les Jeux de Los Angeles 2028.', source: franceinfo },
    ],
    sources: [lcp, franceinfo],
  },
]
