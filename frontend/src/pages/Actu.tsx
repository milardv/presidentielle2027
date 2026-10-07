import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Check, Copy, Share2 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { AppSiteHeader } from '../components/AppSiteHeader'
import { MobileAppNav } from '../components/MobileAppNav'
import { actuArticles } from '../data/actuArticles.js'
import { HomeDesktopFooter } from '../features/candidates/home/components/HomeDesktopFooter'
import { appNavItems } from '../navigation/appNavItems'
import { SeoHead } from '../seo/SeoHead'
import { buildAbsoluteAssetUrl, buildCanonicalUrl, SITE_NAME } from '../seo/site'
import '../actu.css'

type Article = (typeof actuArticles)[number]

const scenarios = [
  { label: 'Dossier A', total: 500, territories: 30, maximum: 50 },
  { label: 'Dossier B', total: 500, territories: 29, maximum: 45 },
  { label: 'Dossier C', total: 500, territories: 30, maximum: 75 },
]

const articleKeywords = ['500 parrainages présidentielle 2027', 'candidature présidentielle 2027', 'Conseil constitutionnel parrainages']

function SourceRefs({ article, ids }: { article: Article; ids: number[] }) {
  return (
    <span className="actu-source-refs">
      {ids.map((id) => {
        const source = article.sources.find((item) => item.id === id)
        return source ? <a key={id} href={`#source-${id}`} aria-label={`Voir la source ${id} : ${source.label}`}>[{id}]</a> : null
      })}
    </span>
  )
}

function CaseStudy() {
  const [selected, setSelected] = useState(0)
  const scenario = scenarios[selected]
  const enough = scenario.total >= 500
  const spread = scenario.territories >= 30
  const concentration = scenario.maximum <= scenario.total / 10
  const valid = enough && spread && concentration

  return (
    <aside className="actu-case" aria-labelledby="actu-case-title">
      <div className="actu-case-head">
        <span className="actu-mini-label">Le test des 500</span>
        <h3 id="actu-case-title">Même total, trois issues différentes.</h3>
        <p>Choisissez un dossier fictif de 500 présentations pour voir ce que change la règle territoriale.</p>
      </div>
      <div className="actu-case-tabs" role="group" aria-label="Choisir un dossier fictif">
        {scenarios.map((item, index) => (
          <button key={item.label} type="button" className={selected === index ? 'is-selected' : ''} aria-pressed={selected === index} onClick={() => setSelected(index)}>{item.label}</button>
        ))}
      </div>
      <div className="actu-case-result" aria-live="polite">
        <div className="actu-case-numbers">
          <div><strong>{scenario.total}</strong><span>présentations</span></div>
          <div><strong>{scenario.territories}</strong><span>territoires</span></div>
          <div><strong>{scenario.maximum}</strong><span>dans le territoire le plus représenté</span></div>
        </div>
        <p className={valid ? 'actu-case-verdict is-valid' : 'actu-case-verdict'}>
          {valid ? <Check size={17} aria-hidden="true" /> : <span aria-hidden="true">×</span>}
          {valid ? 'Le dossier franchit les trois seuils illustrés.' : !spread ? 'Il manque au moins un territoire.' : 'Trop de signatures viennent du même territoire.'}
        </p>
        <small>Simulation pédagogique : le Conseil constitutionnel contrôle aussi l’éligibilité et la validité de chaque présentation.</small>
      </div>
    </aside>
  )
}

function ArticleCover({ article, eager = false }: { article: Article; eager?: boolean }) {
  return (
    <figure className="actu-cover">
      <img src={article.image} alt={article.imageAlt} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : undefined} />
      <figcaption>{article.imageCaption} <a href={article.imageCreditUrl} target="_blank" rel="noreferrer">{article.imageCredit} <ArrowUpRight size={12} aria-hidden="true" /></a></figcaption>
    </figure>
  )
}

export function ActuIndex() {
  const featured = actuArticles[0]
  return (
    <div className="edition-page actu-page">
      <SeoHead title="Actu présidentielle 2027 : enquêtes et décryptages" description="Des articles de fond, gratuits et sourcés, pour comprendre les enjeux de la présidentielle 2027." path="/actu/" keywords={['actualité présidentielle 2027', 'analyse présidentielle 2027', 'parrainages présidentielle 2027']} jsonLd={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Actu présidentielle 2027', url: buildCanonicalUrl('/actu/'), inLanguage: 'fr-FR' }} />
      <AppSiteHeader />
      <main className="actu-index-main">
        <div className="actu-index-masthead">
          <p className="actu-mini-label">Le dossier politique · Actu</p>
          <div className="actu-index-heading"><h1>Comprendre<br /><em>avant de choisir.</em></h1><p>Des récits et des décryptages pour regarder sous la surface de la campagne. Chaque article est libre d’accès, documenté et conçu pour être lu aussi confortablement sur mobile.</p></div>
        </div>
        <div className="actu-index-rule"><span>À la une</span><span>01 / {String(actuArticles.length).padStart(2, '0')}</span></div>
        <Link to={featured.path} className="actu-feature">
          <div className="actu-feature-image"><img src={featured.image} alt={featured.imageAlt} fetchPriority="high" /></div>
          <div className="actu-feature-copy"><span className="actu-mini-label">{featured.category} · {featured.readingMinutes} min de lecture</span><h2>{featured.title}</h2><p>{featured.standfirst}</p><span className="actu-feature-link">Lire l’article complet <ArrowRight size={18} aria-hidden="true" /></span><span className="actu-feature-date">7 octobre 2026 · Sources primaires consultables</span></div>
        </Link>
        <div className="actu-index-note"><BookOpen size={22} aria-hidden="true" /><p>Les sujets sont publiés avec leurs documents de référence et leurs crédits visuels. Les simulations sont signalées comme telles.</p></div>
      </main>
      <HomeDesktopFooter />
      <MobileAppNav items={appNavItems} />
    </div>
  )
}

export function ActuArticle() {
  const { slug } = useParams()
  const article = actuArticles.find((item) => item.slug === slug)
  const [progress, setProgress] = useState(0)
  const [largeText, setLargeText] = useState(false)
  const [copied, setCopied] = useState(false)
  const articleJsonLd = useMemo(() => article ? { '@context': 'https://schema.org', '@type': 'NewsArticle', headline: article.title, description: article.description, datePublished: article.publishedAt, dateModified: article.publishedAt, inLanguage: 'fr-FR', isAccessibleForFree: true, image: buildAbsoluteAssetUrl(article.image), mainEntityOfPage: buildCanonicalUrl(article.path), author: { '@type': 'Organization', name: SITE_NAME }, publisher: { '@type': 'Organization', name: SITE_NAME }, citation: article.sources.map((source) => source.url) } : null, [article])

  useEffect(() => {
    if (!article) return
    const update = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight
      setProgress(available > 0 ? Math.min(100, Math.max(0, (window.scrollY / available) * 100)) : 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [article])

  if (!article) return <div className="edition-page actu-page"><AppSiteHeader /><main className="actu-missing"><h1>Article introuvable</h1><Link to="/actu/">Voir les articles <ArrowRight size={16} /></Link></main></div>

  const share = async () => {
    const url = buildCanonicalUrl(article.path)
    try {
      if (navigator.share) await navigator.share({ title: article.title, url })
      else { await navigator.clipboard.writeText(url); setCopied(true); window.setTimeout(() => setCopied(false), 2500) }
    } catch { /* Le partage peut être annulé sans effet. */ }
  }

  return (
    <div className={`edition-page actu-page actu-article-page ${largeText ? 'actu-large-text' : ''}`}>
      <SeoHead title={`${article.title} | Présidentielle 2027`} description={article.description} path={article.path} image={article.image} ogType="article" keywords={articleKeywords} jsonLd={articleJsonLd} />
      <AppSiteHeader />
      <div className="actu-reading-progress" role="progressbar" aria-label="Progression dans l’article" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${progress}%` }} /></div>
      <main id="article" className="actu-article-main">
        <div className="actu-reading-toolbar"><Link to="/actu/"><ArrowLeft size={16} aria-hidden="true" /> Actu</Link><span>Lecture · {article.readingMinutes} min</span><div><button type="button" aria-label={largeText ? 'Réduire la taille du texte' : 'Agrandir la taille du texte'} aria-pressed={largeText} onClick={() => setLargeText((value) => !value)}>Aa</button><button type="button" aria-label="Partager cet article" onClick={share}>{copied ? <Copy size={17} /> : <Share2 size={17} />}<span>{copied ? 'Lien copié' : 'Partager'}</span></button></div></div>
        <article>
          <header className="actu-article-header"><p className="actu-mini-label">{article.eyebrow} <span>·</span> {article.category}</p><h1>{article.title}</h1><p className="actu-standfirst">{article.standfirst}</p><div className="actu-byline"><span>La rédaction</span><span>7 octobre 2026</span><span>{article.readingMinutes} min de lecture</span><span>Accès libre</span></div></header>
          <ArticleCover article={article} eager />
          <div className="actu-article-layout">
            <aside className="actu-article-aside" aria-label="Dans cet article"><span className="actu-mini-label">Dans cet article</span>{article.sections.map((section) => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}<a href="#sources">Sources & méthode</a></aside>
            <div className="actu-article-content">
              <p className="actu-opening"><span aria-hidden="true">L</span>a présidentielle se raconte souvent à travers les sondages. Mais pour des candidats encore inconnus, une autre carte se dessine en coulisses : celle des élus capables de les présenter. En 2027, cette étape dira autant sur la capacité d’organisation des campagnes que sur la façon dont la République sélectionne ses prétendants.</p>
              <div className="actu-key-points" aria-label="Les trois règles à retenir"><div><strong>500</strong><span>présentations d’élus</span></div><div><strong>30</strong><span>territoires au minimum</span></div><div><strong>10 %</strong><span>au plus d’un même territoire</span></div></div>
              {article.sections.map((section, index) => <section id={section.id} className="actu-section" key={section.id}><div className="actu-section-number">{section.number} / Le décryptage</div><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph.text}>{paragraph.text}<SourceRefs article={article} ids={paragraph.sources} /></p>)}{index === 1 ? <CaseStudy /> : null}{index === 2 ? <blockquote>« Ce bilan chiffré conduit à relativiser diverses affirmations »<cite>Conseil constitutionnel, observations sur l’élection de 2022 <SourceRefs article={article} ids={[3]} /></cite></blockquote> : null}</section>)}
              <section id="sources" className="actu-sources"><span className="actu-mini-label">Transparence</span><h2>Sources & méthode</h2><p>Article rédigé à partir des textes et observations officiels ci-dessous. Les dossiers A, B et C sont des exemples fictifs destinés à expliquer les règles. La photographie illustre le rôle des mairies et ne montre aucun événement de la campagne 2027.</p><ol>{article.sources.map((source) => <li id={`source-${source.id}`} key={source.id}><span>{String(source.id).padStart(2, '0')}</span><a href={source.url} target="_blank" rel="noreferrer"><strong>{source.label}</strong><small>{source.publisher}</small></a><ArrowUpRight size={17} aria-hidden="true" /></li>)}</ol></section>
            </div>
          </div>
        </article>
        <div className="actu-end-card"><span className="actu-mini-label">Pour continuer</span><h2>La campagne mérite du temps de lecture.</h2><Link to="/actu/">Retour à l’Actu <ArrowRight size={18} aria-hidden="true" /></Link></div>
      </main>
      <HomeDesktopFooter />
    </div>
  )
}
