import { mkdir, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { accentizeFrenchCopy } from '../src/seo/frenchCopy.js'
import {
  SITE_FAVICON_PATH,
  SITE_LOGO_PATH,
  SITE_NAME,
  SITE_SOCIAL_IMAGE_PATH,
  SITE_URL,
  seoPages,
} from '../src/seo/seoPagesData.js'

const PROJECT_ROOT = resolve(new URL('..', import.meta.url).pathname)
const PUBLIC_DIR = resolve(PROJECT_ROOT, 'public')

function normalizePath(path) {
  if (!path || path === '/') {
    return '/'
  }

  const withLeadingSlash = path.startsWith('/') ? path : `/${path}`
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`
}

function normalizeAssetPath(path) {
  if (!path) {
    return '/'
  }

  return path.startsWith('/') ? path : `/${path}`
}

function buildAbsoluteUrl(path) {
  const normalizedPath = normalizePath(path)
  return normalizedPath === '/' ? `${SITE_URL}/` : `${SITE_URL}${normalizedPath}`
}

function buildAbsoluteAssetUrl(path) {
  return `${SITE_URL}${normalizeAssetPath(path)}`
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function renderSeoPage(page) {
  const canonicalUrl = buildAbsoluteUrl(`/${page.slug}/`)
  const siteName = accentizeFrenchCopy(SITE_NAME)
  const title = accentizeFrenchCopy(page.title)
  const description = accentizeFrenchCopy(page.description)
  const heroEyebrow = accentizeFrenchCopy(page.heroEyebrow)
  const heroTitle = accentizeFrenchCopy(page.heroTitle)
  const heroIntro = accentizeFrenchCopy(page.heroIntro)
  const footerText = accentizeFrenchCopy(
    `Cette page fait partie de ${SITE_NAME} et renvoie vers les donnees de campagne, les profils candidats et les sondages 2027.`,
  )
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map((faq) => ({
      '@type': 'Question',
      name: accentizeFrenchCopy(faq.question),
      acceptedAnswer: {
        '@type': 'Answer',
        text: accentizeFrenchCopy(faq.answer),
      },
    })),
  }
  const organizationSchema = {
    '@type': 'Organization',
    name: siteName,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: buildAbsoluteAssetUrl(SITE_LOGO_PATH),
    },
    image: buildAbsoluteAssetUrl(SITE_SOCIAL_IMAGE_PATH),
  }
  const websiteSchema = {
    '@type': 'WebSite',
    name: siteName,
    url: SITE_URL,
    inLanguage: 'fr-FR',
    image: buildAbsoluteAssetUrl(SITE_SOCIAL_IMAGE_PATH),
    publisher: {
      '@type': 'Organization',
      name: siteName,
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
      name: siteName,
      url: SITE_URL,
    },
  }
  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [organizationSchema, websiteSchema, webpageSchema, { ...faqSchema, '@context': undefined }],
  }

  return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="robots" content="index,follow,max-image-preview:large" />
  <meta name="theme-color" content="#1a227f" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${escapeHtml(siteName)}" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
  <meta property="og:image" content="${escapeHtml(buildAbsoluteAssetUrl(SITE_SOCIAL_IMAGE_PATH))}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${escapeHtml(buildAbsoluteAssetUrl(SITE_SOCIAL_IMAGE_PATH))}" />
  <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />
  <link rel="icon" type="image/svg+xml" href="${escapeHtml(buildAbsoluteAssetUrl(SITE_FAVICON_PATH))}" />
  <link rel="manifest" href="${escapeHtml(buildAbsoluteAssetUrl('/site.webmanifest'))}" />
  <script type="application/ld+json">${JSON.stringify(schemaGraph)}</script>
  <style>
    :root {
      color-scheme: light;
      --bg: #f6f7fb;
      --surface: rgba(255,255,255,.94);
      --surface-soft: #f8fafc;
      --border: rgba(148,163,184,.28);
      --text: #0f172a;
      --muted: #475569;
      --primary: #1a227f;
      --accent: #f59e0b;
      --shadow: 0 22px 60px rgba(15,23,42,.08);
      --radius: 28px;
      --radius-sm: 18px;
      font-family: "Public Sans", system-ui, sans-serif;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      color: var(--text);
      background:
        radial-gradient(circle at top left, rgba(26,34,127,.10), transparent 36%),
        radial-gradient(circle at top right, rgba(245,158,11,.10), transparent 24%),
        var(--bg);
    }
    a { color: inherit; text-decoration: none; }
    .shell { max-width: 1180px; margin: 0 auto; padding: 24px 16px 72px; }
    .topbar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 16px 0 24px;
    }
    .brand-link {
      display: flex;
      align-items: center;
      gap: 14px;
      min-width: 0;
    }
    .brand-mark {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      border-radius: 18px;
      color: white;
      font-size: 1.2rem;
      font-weight: 900;
      background: linear-gradient(135deg, var(--primary), #2563eb);
      box-shadow: 0 16px 36px rgba(26,34,127,.24);
      flex: none;
    }
    .brand-copy {
      min-width: 0;
    }
    .brand-title {
      display: block;
      font-weight: 900;
      letter-spacing: -.03em;
      font-size: clamp(1.05rem, 2vw, 1.2rem);
    }
    .brand-subtitle {
      display: block;
      margin-top: 2px;
      color: var(--muted);
      font-size: .78rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .nav { display: flex; flex-wrap: wrap; gap: 10px; }
    .nav a {
      border: 1px solid var(--border);
      background: rgba(255,255,255,.86);
      padding: 10px 14px;
      border-radius: 999px;
      font-weight: 700;
      font-size: .92rem;
    }
    .hero, .panel {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
    }
    .hero { padding: 32px; }
    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      border-radius: 999px;
      padding: 7px 12px;
      font-size: .74rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: .18em;
      color: var(--primary);
      background: rgba(26,34,127,.10);
    }
    h1 {
      margin: 18px 0 0;
      font-size: clamp(2rem, 4vw, 3.4rem);
      line-height: 1.02;
      letter-spacing: -.04em;
    }
    .lead {
      max-width: 820px;
      margin: 18px 0 0;
      color: var(--muted);
      font-size: 1.03rem;
      line-height: 1.75;
    }
    .chips, .links { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 22px; }
    .chip {
      border-radius: 999px;
      border: 1px solid var(--border);
      background: var(--surface-soft);
      padding: 10px 14px;
      font-size: .85rem;
      font-weight: 700;
      color: var(--muted);
    }
    .layout {
      display: grid;
      gap: 22px;
      margin-top: 24px;
      grid-template-columns: minmax(0,1.2fr) minmax(280px,.8fr);
    }
    .card {
      border-radius: var(--radius-sm);
      border: 1px solid var(--border);
      background: var(--surface-soft);
      padding: 22px;
    }
    h2 {
      margin: 0;
      font-size: 1.24rem;
      line-height: 1.2;
      letter-spacing: -.03em;
    }
    .card p, .faq p, li {
      margin: 14px 0 0;
      color: var(--muted);
      line-height: 1.75;
      font-size: .98rem;
    }
    ul { margin: 18px 0 0; padding: 0; list-style: none; }
    li { display: flex; gap: 12px; }
    li::before {
      content: "";
      margin-top: 10px;
      width: 9px;
      height: 9px;
      border-radius: 999px;
      background: linear-gradient(135deg, var(--primary), var(--accent));
      flex: none;
    }
    .cta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      border: 1px solid var(--border);
      background: white;
      border-radius: 18px;
      padding: 14px 16px;
      font-weight: 800;
      margin-top: 12px;
    }
    .faq-grid { display: grid; gap: 14px; margin-top: 18px; }
    .faq {
      border-radius: var(--radius-sm);
      border: 1px solid var(--border);
      background: var(--surface-soft);
      padding: 22px;
    }
    footer {
      margin-top: 28px;
      color: var(--muted);
      font-size: .92rem;
      line-height: 1.7;
    }
    @media (max-width: 920px) {
      .layout { grid-template-columns: 1fr; }
      .hero { padding: 24px; }
    }
  </style>
</head>
<body>
  <main class="shell">
    <header class="topbar">
      <a class="brand-link" href="${escapeHtml(buildAbsoluteUrl('/'))}" aria-label="Retour à l’accueil ${escapeHtml(siteName)}">
        <span class="brand-mark">↗</span>
        <span class="brand-copy">
          <span class="brand-title">${escapeHtml(siteName)}</span>
          <span class="brand-subtitle">Candidats, sondages et intentions de vote</span>
        </span>
      </a>
      <nav class="nav" aria-label="Navigation principale">
        <a href="${escapeHtml(buildAbsoluteUrl('/'))}">Accueil</a>
        <a href="${escapeHtml(buildAbsoluteUrl('/polls'))}">Sondages</a>
        <a href="${escapeHtml(buildAbsoluteUrl('/candidats-presidentielle-2027/'))}">Candidats</a>
        <a href="${escapeHtml(buildAbsoluteUrl('/presidentielle-2027/'))}">Guide 2027</a>
      </nav>
    </header>

    <section class="hero">
      <span class="eyebrow">${escapeHtml(heroEyebrow)}</span>
      <h1>${escapeHtml(heroTitle)}</h1>
      <p class="lead">${escapeHtml(heroIntro)}</p>

      <div class="chips">
        ${page.queries.map((query) => `<span class="chip">${escapeHtml(accentizeFrenchCopy(query))}</span>`).join('')}
      </div>

      <div class="layout">
        <div>
          ${page.sections
            .map(
              (section) => `
            <article class="card">
              <h2>${escapeHtml(accentizeFrenchCopy(section.title))}</h2>
              ${section.paragraphs.map((paragraph) => `<p>${escapeHtml(accentizeFrenchCopy(paragraph))}</p>`).join('')}
            </article>
          `,
            )
            .join('')}
        </div>

        <aside>
          <section class="panel" style="padding:22px;">
            <div class="eyebrow">A retenir</div>
            <ul>
              ${page.summary.map((item) => `<li><span>${escapeHtml(accentizeFrenchCopy(item))}</span></li>`).join('')}
            </ul>
          </section>

          <section class="panel" style="padding:22px; margin-top:16px;">
            <div class="eyebrow">Liens utiles</div>
            <div class="links" style="display:block;">
              ${page.relatedLinks
                .map(
                  (link) => `
                <a class="cta" href="${escapeHtml(buildAbsoluteUrl(link.href))}">
                  <span>${escapeHtml(accentizeFrenchCopy(link.label))}</span>
                  <span>→</span>
                </a>
              `,
                )
                .join('')}
            </div>
          </section>
        </aside>
      </div>
    </section>

    <section class="panel" style="padding:28px; margin-top:22px;">
      <div class="eyebrow">FAQ</div>
      <div class="faq-grid">
        ${page.faqs
          .map(
            (faq) => `
          <article class="faq">
            <h2>${escapeHtml(accentizeFrenchCopy(faq.question))}</h2>
            <p>${escapeHtml(accentizeFrenchCopy(faq.answer))}</p>
          </article>
        `,
          )
          .join('')}
      </div>
    </section>

    <footer>
      ${escapeHtml(footerText)}
    </footer>
  </main>
</body>
</html>`
}

async function generateSeoPages() {
  for (const page of seoPages) {
    const pageDirectory = resolve(PUBLIC_DIR, page.slug)
    await rm(pageDirectory, { recursive: true, force: true })
    await mkdir(pageDirectory, { recursive: true })
    await writeFile(resolve(pageDirectory, 'index.html'), renderSeoPage(page), 'utf8')
  }
}

async function generateRobots() {
  const robotsContent = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`

  await writeFile(resolve(PUBLIC_DIR, 'robots.txt'), robotsContent, 'utf8')
}

async function generateSitemap() {
  const urls = ['/', '/polls', ...seoPages.map((page) => `/${page.slug}/`)]
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (path) => `  <url>
    <loc>${buildAbsoluteUrl(path)}</loc>
  </url>`,
  )
  .join('\n')}
</urlset>
`

  await writeFile(resolve(PUBLIC_DIR, 'sitemap.xml'), sitemap, 'utf8')
}

await generateSeoPages()
await generateRobots()
await generateSitemap()
