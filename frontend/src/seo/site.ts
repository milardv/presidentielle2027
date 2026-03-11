export const SITE_NAME = 'Présidentielles 2027'
export const SITE_URL = 'https://milardv.github.io/presidentielle2027'

function normalizePath(path: string): string {
  if (!path || path === '/') {
    return '/'
  }

  const withLeadingSlash = path.startsWith('/') ? path : `/${path}`
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`
}

export function buildCanonicalUrl(path: string): string {
  const normalizedPath = normalizePath(path)
  return normalizedPath === '/' ? `${SITE_URL}/` : `${SITE_URL}${normalizedPath}`
}

export function withBasePath(path: string): string {
  const normalizedPath = normalizePath(path)
  const baseUrl = import.meta.env.BASE_URL || '/'
  const trimmedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl

  return normalizedPath === '/'
    ? `${trimmedBase || ''}/`
    : `${trimmedBase || ''}${normalizedPath}`
}
