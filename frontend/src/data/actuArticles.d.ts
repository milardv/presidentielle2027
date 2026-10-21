export interface ActuSource { id: number; label: string; publisher: string; url: string }
export interface ActuParagraph { text: string; sources: number[] }
export interface ActuTable { caption: string; headers: string[]; rows: string[][]; sources: number[] }
export interface ActuSection {
  id: string
  number: string
  title: string
  paragraphs: ActuParagraph[]
  table?: ActuTable
  quote?: { text: string; attribution: string; sources: number[] }
  figure?: { image: string; alt: string; caption: string; sources: number[] }
}
export interface ActuArticleData {
  opening: string
  keyPoints: { value: string; label: string }[]
  keywords: string[]
  method: string
  imageLicenseUrl?: string
  slug: string
  path: string
  category: string
  eyebrow: string
  title: string
  description: string
  standfirst: string
  publishedAt: string
  readingMinutes: number
  image: string
  imagePosition?: string
  imageAlt: string
  imageCredit: string
  imageCreditUrl: string
  imageCaption: string
  sources: ActuSource[]
  sections: ActuSection[]
}
export const actuArticles: ActuArticleData[]
