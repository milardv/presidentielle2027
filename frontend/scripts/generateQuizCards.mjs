import { mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { chromium } from 'playwright'
import { candidates2027 } from '../src/data/candidates2027.js'

const OUTPUT_DIR = resolve(new URL('..', import.meta.url).pathname, 'public/quiz/cards')
const SITE = 'electionpresidentielle2027.com'

const partyColors = [
  ['rassemblement national', '#1d4ed8'],
  ['renaissance', '#f59e0b'],
  ['horizons', '#0891b2'],
  ['républicains', '#1e40af'],
  ['nous france', '#1e3a8a'],
  ['nouvelle énergie', '#0e7490'],
  ['insoumise', '#dc2626'],
  ['place publique', '#e11d48'],
  ['socialiste', '#f43f5e'],
  ['gauche républicaine', '#be123c'],
  ['convention', '#db2777'],
  ['communiste', '#b91c1c'],
  ['écologistes', '#059669'],
  ['écologie', '#10b981'],
  ['debout !', '#7c3aed'],
  ['debout la france', '#0f172a'],
  ['lutte ouvrière', '#991b1b'],
  ['reconquête', '#312e81'],
  ['patriotes', '#1e3a8a'],
  ['union populaire républicaine', '#1e40af'],
  ['france humaniste', '#475569'],
]

function colorFor(party) {
  const normalized = party.toLowerCase()
  return partyColors.find(([key]) => normalized.includes(key))?.[1] ?? '#1a227f'
}

function escapeHtml(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
}

function cardHtml({ eyebrow, title, subtitle, accent, photoUrl, initials, footer }) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
  * { box-sizing: border-box; margin: 0; }
  body { width: 1200px; height: 630px; font-family: "Public Sans", "Segoe UI", system-ui, sans-serif; color: #fff;
    background: radial-gradient(circle at 85% 20%, ${accent}cc, transparent 45%), radial-gradient(circle at 10% 90%, rgba(245,158,11,.55), transparent 40%), linear-gradient(135deg, #1a227f 0%, #0f172a 100%); overflow: hidden; }
  .wrap { display: flex; align-items: center; gap: 56px; height: 100%; padding: 64px 72px; }
  .photo { width: 300px; height: 380px; border-radius: 40px; object-fit: cover; border: 8px solid rgba(255,255,255,.9); box-shadow: 0 30px 80px rgba(0,0,0,.45); flex: none; background: #1e293b; display: flex; align-items: center; justify-content: center; font-size: 120px; font-weight: 900; }
  .eyebrow { display: inline-block; padding: 10px 18px; border-radius: 999px; background: rgba(255,255,255,.14); font-size: 22px; font-weight: 800; letter-spacing: .18em; text-transform: uppercase; }
  h1 { margin-top: 26px; font-size: 76px; line-height: 1.02; letter-spacing: -.04em; font-weight: 900; }
  .sub { margin-top: 18px; font-size: 32px; font-weight: 700; color: rgba(255,255,255,.85); }
  .footer { position: absolute; left: 72px; bottom: 44px; font-size: 24px; font-weight: 800; color: rgba(255,255,255,.75); letter-spacing: .02em; }
  .badge { position: absolute; right: 72px; bottom: 44px; padding: 14px 22px; border-radius: 999px; background: #fff; color: #1a227f; font-size: 24px; font-weight: 900; }
</style></head><body>
  <div class="wrap">
    ${photoUrl ? `<img class="photo" src="${escapeHtml(photoUrl)}" />` : `<div class="photo">${escapeHtml(initials)}</div>`}
    <div>
      <span class="eyebrow">${escapeHtml(eyebrow)}</span>
      <h1>${escapeHtml(title)}</h1>
      <p class="sub">${escapeHtml(subtitle)}</p>
    </div>
  </div>
  <div class="footer">${escapeHtml(footer)}</div>
  <div class="badge">Et vous ? Faites le test →</div>
</body></html>`
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true })
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })

  const running = candidates2027.filter((candidate) => candidate.status !== 'not_running')
  for (const candidate of running) {
    await page.setContent(
      cardHtml({
        eyebrow: 'Mon match présidentielle 2027',
        title: candidate.name,
        subtitle: candidate.party,
        accent: colorFor(candidate.party),
        photoUrl: candidate.photoUrl,
        initials: candidate.name
          .split(' ')
          .slice(0, 2)
          .map((part) => part[0])
          .join(''),
        footer: `${SITE}/quiz`,
      }),
      { waitUntil: 'networkidle' },
    )
    await page.screenshot({ path: resolve(OUTPUT_DIR, `${candidate.id}.jpg`), type: 'jpeg', quality: 82 })
    console.log(`card: ${candidate.id}`)
  }

  await page.setContent(
    cardHtml({
      eyebrow: 'Quiz présidentielle 2027',
      title: 'Quel candidat vous correspond ?',
      subtitle: '14 affirmations · 2 minutes · résultat partageable',
      accent: '#0ea5e9',
      photoUrl: 'https://electionpresidentielle2027.com/elysee.png',
      initials: '?',
      footer: `${SITE}/quiz`,
    }),
    { waitUntil: 'networkidle' },
  )
  await page.screenshot({ path: resolve(OUTPUT_DIR, 'quiz.jpg'), type: 'jpeg', quality: 82 })
  await browser.close()
  console.log(`Generated ${running.length + 1} quiz cards in ${OUTPUT_DIR}.`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
