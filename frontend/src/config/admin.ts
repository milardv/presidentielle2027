export const ADMIN_EMAIL = 'valentin.milard1@gmail.com'

export function isAdminEmail(email: string | null | undefined): boolean {
  return typeof email === 'string' && email.trim().toLowerCase() === ADMIN_EMAIL
}
