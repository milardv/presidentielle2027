export interface SeoSection {
  title: string
  paragraphs: string[]
}

export interface SeoFaq {
  question: string
  answer: string
}

export interface SeoRelatedLink {
  label: string
  href: string
}

export interface SeoPageContent {
  slug: string
  title: string
  description: string
  heroEyebrow: string
  heroTitle: string
  heroIntro: string
  queries: string[]
  summary: string[]
  sections: SeoSection[]
  faqs: SeoFaq[]
  relatedLinks: SeoRelatedLink[]
}

export const SITE_NAME: string
export const SITE_URL: string
export const seoPages: SeoPageContent[]
export function getSeoPageBySlug(slug: string): SeoPageContent | null
