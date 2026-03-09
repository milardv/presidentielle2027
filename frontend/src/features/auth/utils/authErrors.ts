export function getAuthErrorMessage(error: unknown): string {
  if (
    error &&
    typeof error === 'object' &&
    'code' in error &&
    typeof (error as { code?: unknown }).code === 'string'
  ) {
    const code = (error as { code: string }).code

    if (code === 'auth/popup-closed-by-user') {
      return 'La fenêtre Google a été fermée avant la fin de la connexion.'
    }
    if (code === 'auth/cancelled-popup-request') {
      return 'Une autre tentative de connexion est déjà en cours.'
    }
    if (code === 'auth/popup-blocked') {
      return 'Le navigateur a bloqué la popup Google. Autorise les popups puis réessaie.'
    }
    if (code === 'auth/unauthorized-domain') {
      return 'Ce domaine n’est pas autorisé dans Firebase Auth pour la connexion Google.'
    }
    if (code === 'auth/operation-not-allowed') {
      return 'La connexion Google n’est pas activée dans Firebase Auth pour ce projet.'
    }
  }

  return 'Connexion Google impossible pour le moment. Réessaie dans quelques secondes.'
}
