import { chromium } from 'playwright'
import { initializeApp } from 'firebase/app'
import { collection, doc, getDocs, getFirestore, writeBatch } from 'firebase/firestore'
import { getFirebaseConfig } from './firebaseConfig.mjs'
import { getCandidateXProfile } from './candidateXProfiles.mjs'

const app = initializeApp(getFirebaseConfig())
const db = getFirestore(app)

const CANDIDATES_COLLECTION = 'candidates_2027'
const TWEETS_COLLECTION = 'candidate_tweets_2027'
const TODAY_ISO = new Date().toISOString().slice(0, 10)
const NOW_ISO = new Date().toISOString()
const PAGE_WAIT_MS = Number.parseInt(process.env.X_SCRAPE_WAIT_MS ?? '5500', 10)
const MAX_TWEETS = 10
const MAX_SCROLL_ATTEMPTS = 5
const MAX_PROFILE_RETRIES = 2

const args = process.argv.slice(2)
const DRY_RUN = args.includes('--dry-run')
const candidateFilterArg = args.find((entry) => entry.startsWith('--candidate='))
const candidateLimitArg = args.find((entry) => entry.startsWith('--candidate-limit='))
const candidateFilter = candidateFilterArg
  ? new Set(candidateFilterArg.slice('--candidate='.length).split(',').map((entry) => entry.trim()).filter(Boolean))
  : null
const candidateLimit = candidateLimitArg ? Number.parseInt(candidateLimitArg.slice('--candidate-limit='.length), 10) : null

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

function sanitizeWhitespace(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim()
}

function normalizeProfileImageUrl(value) {
  if (typeof value !== 'string' || value.length === 0) {
    return null
  }

  return value.replace('_normal.', '_400x400.')
}

function parseCompactMetric(value) {
  if (typeof value !== 'string') {
    return 0
  }

  const normalized = value.trim().replace(/,/g, '.').toUpperCase()
  const match = normalized.match(/^(\d+(?:\.\d+)?)([KMB])?$/)
  if (!match) {
    const fallback = Number.parseInt(normalized.replace(/[^0-9]/g, ''), 10)
    return Number.isFinite(fallback) ? fallback : 0
  }

  const base = Number.parseFloat(match[1])
  const multiplier = match[2] === 'K' ? 1_000 : match[2] === 'M' ? 1_000_000 : match[2] === 'B' ? 1_000_000_000 : 1
  return Math.round(base * multiplier)
}

function parseCandidateDocument(entry) {
  const data = entry.data()
  if (typeof data.name !== 'string' || typeof data.priority !== 'number') {
    return null
  }

  const configuredProfile = getCandidateXProfile(entry.id)
  const xUsername = typeof data.xUsername === 'string' && data.xUsername.trim().length > 0
    ? data.xUsername.trim()
    : configuredProfile?.username ?? null

  return {
    id: entry.id,
    name: data.name,
    priority: data.priority,
    xUsername,
  }
}

async function readCandidates() {
  const snapshot = await getDocs(collection(db, CANDIDATES_COLLECTION))
  const candidates = snapshot.docs
    .map((entry) => parseCandidateDocument(entry))
    .filter((entry) => entry !== null)
    .sort((first, second) => first.priority - second.priority)

  const filteredCandidates = candidateFilter
    ? candidates.filter((entry) => candidateFilter.has(entry.id))
    : candidates

  if (Number.isInteger(candidateLimit) && candidateLimit > 0) {
    return filteredCandidates.slice(0, candidateLimit)
  }

  return filteredCandidates
}

async function collectTweetsForCandidate(page, candidate) {
  if (!candidate.xUsername) {
    return {
      status: 'missing-username',
      tweets: [],
    }
  }

  const targetUrl = `https://x.com/${candidate.xUsername}`
  await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForTimeout(PAGE_WAIT_MS)

  for (let attempt = 0; attempt < MAX_SCROLL_ATTEMPTS; attempt += 1) {
    const tweetCount = await page.locator('article').count()
    if (tweetCount >= MAX_TWEETS + 3) {
      break
    }

    await page.mouse.wheel(0, 2200)
    await page.waitForTimeout(1600)
  }

  const extractedTweets = await page.locator('article').evaluateAll((articles, expectedUsername) => {
    const normalizeUsername = (value) => String(value ?? '').replace(/^@/, '').trim().toLowerCase()

    return articles.map((article) => {
      const articleText = article.innerText || ''
      const lines = articleText.split('\n').map((entry) => entry.trim()).filter(Boolean)
      const userNameNode = article.querySelector('[data-testid="User-Name"]')
      const userLinks = userNameNode ? [...userNameNode.querySelectorAll('a[href]')] : []
      const authorName = userLinks.find((link) => !(link.textContent || '').trim().startsWith('@'))?.textContent?.trim() || ''
      const authorUsername = (userLinks.find((link) => (link.textContent || '').trim().startsWith('@'))?.textContent || '').trim().replace(/^@/, '')
      const isRepost = lines[0]?.toLowerCase().endsWith('reposted') ?? false
      const tweetText = article.querySelector('[data-testid="tweetText"]')?.textContent?.trim() || ''
      const statusLink = [...article.querySelectorAll('a[href]')]
        .map((link) => link.getAttribute('href'))
        .find((href) => typeof href === 'string' && /^\/[A-Za-z0-9_]+\/status\/\d+$/.test(href)) || null
      const profileImage = article.querySelector('[data-testid^="UserAvatar-Container-"] img')?.getAttribute('src') || null
      const mediaImages = [...article.querySelectorAll('img[src]')]
        .map((image) => ({
          src: image.getAttribute('src') || '',
          altText: image.getAttribute('alt') || null,
        }))
        .filter((image) => image.src && !image.src.includes('/profile_images/') && !image.src.includes('/emoji/'))
      const replyCount = article.querySelector('[data-testid="reply"]')?.textContent?.trim() || '0'
      const repostCount = article.querySelector('[data-testid="retweet"]')?.textContent?.trim() || '0'
      const likeCount = article.querySelector('[data-testid="like"]')?.textContent?.trim() || '0'
      const viewCount = [...article.querySelectorAll('a[href]')]
        .find((link) => (link.getAttribute('href') || '').endsWith('/analytics'))
        ?.textContent?.trim() || '0'

      return {
        statusLink,
        publishedAt: article.querySelector('time')?.getAttribute('datetime') || null,
        authorName,
        authorUsername,
        authorVerified: article.querySelector('[data-testid="icon-verified"]') !== null,
        isRepost,
        tweetText,
        profileImage,
        mediaImages,
        metrics: {
          replies: replyCount,
          reposts: repostCount,
          likes: likeCount,
          views: viewCount,
        },
        isOwnTweet: normalizeUsername(authorUsername) === normalizeUsername(expectedUsername),
      }
    })
  }, candidate.xUsername)

  const tweets = extractedTweets
    .filter((tweet) => tweet.isOwnTweet && !tweet.isRepost && tweet.statusLink && tweet.publishedAt && tweet.tweetText)
    .map((tweet) => {
      const statusLink = tweet.statusLink
      const tweetId = statusLink.split('/status/')[1] ?? ''
      return {
        id: tweetId,
        candidateId: candidate.id,
        candidateName: candidate.name,
        username: candidate.xUsername,
        url: `https://x.com${statusLink}`,
        publishedAt: tweet.publishedAt,
        authorName: sanitizeWhitespace(tweet.authorName || candidate.name),
        authorUsername: candidate.xUsername,
        authorProfileImageUrl: normalizeProfileImageUrl(tweet.profileImage),
        authorVerified: tweet.authorVerified === true,
        text: sanitizeWhitespace(tweet.tweetText),
        metrics: {
          replies: parseCompactMetric(tweet.metrics.replies),
          reposts: parseCompactMetric(tweet.metrics.reposts),
          likes: parseCompactMetric(tweet.metrics.likes),
          views: parseCompactMetric(tweet.metrics.views),
        },
        media: tweet.mediaImages
          .filter((media) => media.src.length > 0)
          .slice(0, 4)
          .map((media) => ({
            type: media.src.includes('/ext_tw_video_thumb/') ? 'video' : 'photo',
            url: media.src,
            altText: sanitizeWhitespace(media.altText),
          })),
      }
    })
    .filter((tweet) => tweet.id.length > 0)

  return {
    status: tweets.length > 0 ? 'ok' : 'empty',
    tweets: tweets.slice(0, MAX_TWEETS),
  }
}

async function collectTweetsWithRetry(context, candidate) {
  let lastResult = {
    status: 'empty',
    tweets: [],
  }

  for (let attempt = 1; attempt <= MAX_PROFILE_RETRIES; attempt += 1) {
    const page = await context.newPage()

    try {
      const result = await collectTweetsForCandidate(page, candidate)
      lastResult = result

      if (result.tweets.length > 0 || result.status === 'missing-username') {
        return result
      }
    } finally {
      await page.close()
    }

    await sleep(1200)
  }

  return lastResult
}

async function syncCandidateTweets() {
  const candidates = await readCandidates()
  if (candidates.length === 0) {
    throw new Error('No candidate found to sync tweets.')
  }

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    locale: 'fr-FR',
    userAgent:
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 2200 },
  })

  const batch = writeBatch(db)
  const summary = []

  try {
    for (const [index, candidate] of candidates.entries()) {
      if (index > 0) {
        await sleep(1200)
      }

      try {
        const result = await collectTweetsWithRetry(context, candidate)
        summary.push({ candidateId: candidate.id, username: candidate.xUsername, status: result.status, count: result.tweets.length })

        batch.set(
          doc(db, CANDIDATES_COLLECTION, candidate.id),
          {
            xUsername: candidate.xUsername,
            tweetsSyncMeta: {
              lastRunAt: NOW_ISO,
              status: result.status,
              importedCount: result.tweets.length,
            },
            dataLastUpdated: TODAY_ISO,
          },
          { merge: true },
        )

        for (const tweet of result.tweets) {
          batch.set(
            doc(db, TWEETS_COLLECTION, `${candidate.id}-${tweet.id}`),
            {
              id: tweet.id,
              candidateId: candidate.id,
              candidateName: candidate.name,
              authorName: tweet.authorName,
              authorUsername: tweet.authorUsername,
              authorProfileImageUrl: tweet.authorProfileImageUrl,
              authorVerified: tweet.authorVerified,
              text: tweet.text,
              url: tweet.url,
              publishedAt: tweet.publishedAt,
              metrics: tweet.metrics,
              media: tweet.media,
              dataLastUpdated: TODAY_ISO,
              syncedAt: NOW_ISO,
              autoGenerated: true,
            },
            { merge: true },
          )
        }
      } catch (error) {
        summary.push({
          candidateId: candidate.id,
          username: candidate.xUsername,
          status: 'error',
          count: 0,
          error: error instanceof Error ? error.message : String(error),
        })
      }
    }
  } finally {
    await context.close()
    await browser.close()
  }

  if (DRY_RUN) {
    console.log(JSON.stringify({ summary }, null, 2))
    return
  }

  await batch.commit()
  console.log(JSON.stringify({ summary }, null, 2))
}

await syncCandidateTweets()
