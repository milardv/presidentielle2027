export const SITE_NAME = 'Présidentielles 2027'
export const SITE_URL = 'https://electionpresidentielle2027.com'
export const SITE_LOGO_PATH = '/site-logo.svg'
export const SITE_FAVICON_PATH = '/favicon.svg'
export const SITE_SOCIAL_IMAGE_PATH = '/site-social-card.svg'

function normalizePath(path: string): string {
  if (!path || path === '/') {
    return '/'
  }

  const withLeadingSlash = path.startsWith('/') ? path : `/${path}`
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`
}

function normalizeAssetPath(path: string): string {
  if (!path) {
    return '/'
  }

  return path.startsWith('/') ? path : `/${path}`
}

export function buildCanonicalUrl(path: string): string {
  const normalizedPath = normalizePath(path)
  return normalizedPath === '/' ? `${SITE_URL}/` : `${SITE_URL}${normalizedPath}`
}

export function buildAbsoluteAssetUrl(path: string): string {
  return `${SITE_URL}${normalizeAssetPath(path)}`
}

export function withBasePath(path: string): string {
  const normalizedPath = normalizePath(path)
  const baseUrl = import.meta.env.BASE_URL || '/'
  const trimmedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl

  return normalizedPath === '/'
    ? `${trimmedBase || ''}/`
    : `${trimmedBase || ''}${normalizedPath}`
}
