import { useEffect } from 'react'
import { SITE_NAME, buildCanonicalUrl } from './site'

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

export function SeoHead({ title, description, path, keywords, noindex = false, jsonLd = null }: SeoHeadProps) {
  useEffect(() => {
    const canonicalUrl = buildCanonicalUrl(path)
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
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertCanonical(canonicalUrl)
    upsertJsonLd(jsonLd)
  }, [description, jsonLd, keywords, noindex, path, title])

  return null
}
