import type { DesktopAppTabItem } from '../components/DesktopAppTabs'

export const appNavItems: DesktopAppTabItem[] = [
  { label: 'Accueil', to: '/', icon: 'home', end: true },
  { label: 'Sondage', to: '/polls', icon: 'poll' },
  { label: 'Analyse', to: '/analysis', icon: 'analytics' },
  { label: 'Profil', to: '/profile', icon: 'person' },
]
