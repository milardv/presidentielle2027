export interface ActuSource { id: number; label: string; publisher: string; url: string }
export interface ActuParagraph { text: string; sources: number[] }
export interface ActuSection { id: string; number: string; title: string; paragraphs: ActuParagraph[] }
export interface ActuArticleData {
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
  imageAlt: string
  imageCredit: string
  imageCreditUrl: string
  imageCaption: string
  sources: ActuSource[]
  sections: ActuSection[]
}
export const actuArticles: ActuArticleData[]
