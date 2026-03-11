import { useEffect } from 'react'
import {
  SITE_LOGO_PATH,
  SITE_NAME,
  SITE_SOCIAL_IMAGE_PATH,
  SITE_URL,
  buildAbsoluteAssetUrl,
  buildCanonicalUrl,
} from './site'

interface SeoHeadProps {
  title: string
  description: string
  path: string
  keywords?: string[]
  noindex?: boolean
  jsonLd?: Record<string, unknown> | Record<string, unknown>[] | null
}

function upsertMeta(attribute: 'name' | 'property', value: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${value}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, value)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function upsertCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', 'canonical')
    document.head.appendChild(element)
  }

  element.setAttribute('href', href)
}

function upsertJsonLd(payload: Record<string, unknown> | Record<string, unknown>[] | null | undefined) {
  const existingScripts = [...document.head.querySelectorAll<HTMLScriptElement>('script[data-seo-jsonld="true"]')]
  existingScripts.forEach((script) => script.remove())

  if (!payload) {
    return
  }

  const graph = Array.isArray(payload) ? { '@context': 'https://schema.org', '@graph': payload } : payload
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.dataset.seoJsonld = 'true'
  script.textContent = JSON.stringify(graph)
  document.head.appendChild(script)
}

function buildSeoGraph(
  payload: Record<string, unknown> | Record<string, unknown>[] | null | undefined,
  title: string,
  description: string,
  canonicalUrl: string,
) {
  const organizationSchema = {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: buildAbsoluteAssetUrl(SITE_LOGO_PATH),
    },
    image: buildAbsoluteAssetUrl(SITE_SOCIAL_IMAGE_PATH),
  }

  const websiteSchema = {
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'fr-FR',
    image: buildAbsoluteAssetUrl(SITE_SOCIAL_IMAGE_PATH),
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: buildAbsoluteAssetUrl(SITE_LOGO_PATH),
      },
    },
  }

  const webpageSchema = {
    '@type': 'WebPage',
    name: title,
    description,
    url: canonicalUrl,
    inLanguage: 'fr-FR',
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: buildAbsoluteAssetUrl(SITE_SOCIAL_IMAGE_PATH),
    },
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
  }

  const payloadItems = payload ? (Array.isArray(payload) ? payload : [payload]) : []
  return [organizationSchema, websiteSchema, webpageSchema, ...payloadItems]
}

export function SeoHead({ title, description, path, keywords, noindex = false, jsonLd = null }: SeoHeadProps) {
  useEffect(() => {
    const canonicalUrl = buildCanonicalUrl(path)
    const socialImageUrl = buildAbsoluteAssetUrl(SITE_SOCIAL_IMAGE_PATH)
    document.documentElement.lang = 'fr'
    document.title = title

    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large')
    upsertMeta('name', 'keywords', keywords?.join(', ') || '')
    upsertMeta('property', 'og:site_name', SITE_NAME)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', canonicalUrl)
    upsertMeta('property', 'og:image', socialImageUrl)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', socialImageUrl)
    upsertCanonical(canonicalUrl)
    upsertJsonLd(buildSeoGraph(jsonLd, title, description, canonicalUrl))
  }, [description, jsonLd, keywords, noindex, path, title])

  return null
}
