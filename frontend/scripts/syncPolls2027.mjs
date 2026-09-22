import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { initializeApp } from 'firebase/app'
import { collection, doc, getDocs, getFirestore, writeBatch } from 'firebase/firestore'
import { getFirebaseConfig } from './firebaseConfig.mjs'

const FIRST_ROUND_COLLECTION = 'polls_2027'
const SECOND_ROUND_COLLECTION = 'polls_second_round_2027'
const SNAPSHOT_PATH = resolve(new URL('..', import.meta.url).pathname, 'src/data/pollsSnapshot.json')
const SOURCE_PAGE = 'https://en.wikipedia.org/wiki/Opinion_polling_for_the_2027_French_presidential_election'
const DATA_LAST_UPDATED = new Date().toISOString().slice(0, 10)
const DRY_RUN = process.argv.includes('--dry-run')
const RESET_COLLECTION = process.argv.includes('--reset')

const MONTHS = {
  jan: '01', january: '01', feb: '02', february: '02', mar: '03', march: '03', apr: '04', april: '04',
  may: '05', jun: '06', june: '06', jul: '07', july: '07', aug: '08', august: '08', sep: '09', sept: '09',
  september: '09', oct: '10', october: '10', nov: '11', november: '11', dec: '12', december: '12',
}

const SECTION_LABELS_FR = {
  'Since September 2026': 'Depuis septembre 2026',
  'July 2026 – August 2026': 'Juillet – août 2026',
  'January 2026 – June 2026': 'Janvier – juin 2026',
  'March – December 2025': 'Mars – décembre 2025',
  'March 2023 – March 2025': 'Mars 2023 – mars 2025',
}

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function toIsoDate(day, month, year) {
  const monthValue = MONTHS[month.toLowerCase()]
  if (!monthValue) {
    throw new Error(`Unsupported month: ${month}`)
  }
  return `${year}-${monthValue}-${String(day).padStart(2, '0')}`
}

function parseFieldwork(line) {
  const range = line.match(/\{\{Opdrts\|(\d*)\|(\d{1,2})\|([A-Za-z]+)\|(\d{4})\|year\}\}/)
  if (range) {
    const [, startDay, endDay, month, year] = range
    return {
      fieldworkStart: toIsoDate(startDay || endDay, month, year),
      fieldworkEnd: toIsoDate(endDay, month, year),
    }
  }

  const single = line.match(/\{\{[dD]ts\|(\d{1,2})\|([A-Za-z]+)\|(\d{4})\}\}/)
  if (single) {
    const [, day, month, year] = single
    const date = toIsoDate(day, month, year)
    return { fieldworkStart: date, fieldworkEnd: date }
  }

  return null
}

function cellContent(line) {
  return line.replace(/^\|+/, '').split('|').pop().trim()
}

function parseSampleSize(line) {
  const match = cellContent(line).match(/([\d,.]+)/)
  return match ? Number.parseInt(match[1].replace(/[,.]/g, ''), 10) : 0
}

function parseScore(line) {
  const content = cellContent(line).replace(/'''/g, '').replace(/\{\{[^}]*\}\}/g, '').trim()
  if (!content || /^[–—-]$/.test(content)) {
    return null
  }
  if (/^<\s*1\s*%?$/.test(content)) {
    return 0.5
  }
  const match = content.match(/(\d+(?:[.,]\d+)?)\s*%?/)
  return match ? Number.parseFloat(match[1].replace(',', '.')) : null
}

function parseRowspan(line) {
  const match = line.match(/rowspan=?"?(\d+)"?/)
  return match ? Number.parseInt(match[1], 10) : 1
}

function parseHeaderCandidates(headerLines) {
  const candidates = []
  for (const line of headerLines) {
    if (line.includes('[[File:') || line.includes('party color')) {
      continue
    }
    const link = line.match(/\[\[([^\]|]+)(?:\|[^\]]*)?\]\]/)
    if (!link) {
      continue
    }
    const name = link[1].trim()
    candidates.push({ id: slugify(name), name })
  }
  return candidates
}

function splitBlocks(bodyLines) {
  const blocks = []
  let current = []
  for (const line of bodyLines) {
    if (line.startsWith('|-') || line.startsWith('|}')) {
      if (current.length > 0) {
        blocks.push(current)
      }
      current = []
      continue
    }
    if (line.startsWith('|')) {
      current.push(line)
    }
  }
  if (current.length > 0) {
    blocks.push(current)
  }
  return blocks
}

function buildScenario(candidates, cells, index) {
  const scores = candidates
    .map((candidate, cellIndex) => ({ ...candidate, score: parseScore(cells[cellIndex]) }))
    .filter((entry) => entry.score !== null)
    .map((entry) => ({ candidateId: entry.id, candidateName: entry.name, score: entry.score }))
    .sort((a, b) => b.score - a.score)

  return {
    id: `scenario-${index + 1}`,
    label: scores.slice(0, 4).map((entry) => `${entry.candidateName} ${entry.score}%`).join(' / '),
    scores,
    leader: scores[0] ?? null,
    runnerUp: scores[1] ?? null,
  }
}

function parseTable(sectionText) {
  const lines = sectionText.split('\n').map((line) => line.trim()).filter(Boolean)
  const tableStart = lines.findIndex((line) => line.startsWith('{|'))
  if (tableStart === -1) {
    return { candidates: [], studies: [] }
  }

  const firstDataRow = lines.findIndex((line, index) => index > tableStart && line.startsWith('|') && line.includes('[http'))
  if (firstDataRow === -1) {
    return { candidates: [], studies: [] }
  }

  const candidates = parseHeaderCandidates(lines.slice(tableStart, firstDataRow).filter((line) => line.startsWith('!')))
  const blocks = splitBlocks(lines.slice(firstDataRow))
  const studies = []
  let current = null
  let remainingRows = 0

  for (const block of blocks) {
    const isStudyStart = block[0].includes('[http')
    if (isStudyStart) {
      const link = block[0].match(/\[(https?:\/\/[^\s\]]+)\s+([^\]]+)\]/)
      const fieldwork = block[1] ? parseFieldwork(block[1]) : null
      if (!link || !fieldwork) {
        current = null
        remainingRows = 0
        continue
      }

      current = {
        pollster: link[2].trim(),
        sourceLabel: link[2].trim(),
        sourceUrl: link[1],
        sampleSize: block[2] ? parseSampleSize(block[2]) : 0,
        ...fieldwork,
        scenarioRows: [],
      }
      remainingRows = parseRowspan(block[0])
      studies.push(current)

      const cells = block.slice(3)
      if (cells.length === candidates.length) {
        current.scenarioRows.push(cells)
      }
      remainingRows -= 1
      continue
    }

    const isEvent = block.some((line) => line.includes('colspan') || /\{\{(Opdrts|[dD]ts)\|/.test(line))
    if (isEvent) {
      continue
    }

    if (current && remainingRows > 0 && block.length === candidates.length) {
      current.scenarioRows.push(block)
      remainingRows -= 1
    }
  }

  return {
    candidates,
    studies: studies
      .map((study) => ({
        ...study,
        scenarios: study.scenarioRows
          .map((cells, index) => buildScenario(candidates, cells, index))
          .filter((scenario) => scenario.scores.length > 0),
      }))
      .filter((study) => study.scenarios.length > 0),
  }
}

function extractBlock(wikitext, startHeading, endHeading) {
  const start = wikitext.indexOf(startHeading)
  const end = wikitext.indexOf(endHeading, start + 1)
  if (start === -1 || end === -1) {
    throw new Error(`Unable to isolate block ${startHeading}.`)
  }
  return wikitext.slice(start, end)
}

function splitSubsections(block, level) {
  const marker = '='.repeat(level)
  const pattern = new RegExp(`^${marker}\\s*([^=].*?)\\s*${marker}\\s*$`, 'gm')
  const sections = []
  let match
  while ((match = pattern.exec(block)) !== null) {
    sections.push({ title: match[1].trim(), start: match.index + match[0].length })
  }
  return sections.map((section, index) => ({
    title: section.title,
    text: block.slice(section.start, sections[index + 1]?.start ?? block.length).split(/^={2,3}[^=]/m)[0],
  }))
}

function dedupeIds(items) {
  const seen = new Map()
  return items.map((item) => {
    const count = (seen.get(item.id) ?? 0) + 1
    seen.set(item.id, count)
    return count === 1 ? item : { ...item, id: `${item.id}-${count}` }
  })
}

function parseFirstRound(wikitext) {
  const block = extractBlock(wikitext, '== First round ==', '== Second round ==')
  const studies = splitSubsections(block, 3).flatMap((section) => {
    const { studies: parsed } = parseTable(section.text)
    return parsed.map((study) => ({
      id: `${slugify(study.pollster)}-${study.fieldworkEnd}`,
      pollster: study.pollster,
      sourceLabel: study.sourceLabel,
      sourceUrl: study.sourceUrl,
      sectionLabel: SECTION_LABELS_FR[section.title] ?? section.title,
      sampleSize: study.sampleSize,
      fieldworkStart: study.fieldworkStart,
      fieldworkEnd: study.fieldworkEnd,
      scenarios: study.scenarios,
      dataLastUpdated: DATA_LAST_UPDATED,
    }))
  })

  return dedupeIds(studies).sort((a, b) => (a.fieldworkEnd < b.fieldworkEnd ? 1 : -1))
}

function parseSecondRound(wikitext) {
  const block = extractBlock(wikitext, '== Second round ==', '== Scenario polling ==')
  const activeBlock = block.split(/^===\s*Declined to be candidates\s*===/m)[0]
  const matchups = []
  const polls = []

  for (const section of splitSubsections(activeBlock, 3)) {
    const { candidates, studies } = parseTable(section.text)
    if (candidates.length !== 2 || studies.length === 0) {
      continue
    }

    const matchupId = slugify(section.title.replace(/\bvs\.?\b/i, 'vs'))
    const matchupLabel = section.title.replace(/\s*vs\.\s*/i, ' vs ')
    matchups.push({ id: matchupId, label: matchupLabel, candidates })

    for (const study of studies) {
      const scores = study.scenarios[0].scores
      polls.push({
        id: `${matchupId}-${slugify(study.pollster)}-${study.fieldworkEnd}`,
        matchupId,
        matchupLabel,
        pollster: study.pollster,
        sourceLabel: study.sourceLabel,
        sourceUrl: study.sourceUrl,
        sampleSize: study.sampleSize,
        fieldworkStart: study.fieldworkStart,
        fieldworkEnd: study.fieldworkEnd,
        scores,
        winnerId: scores.length === 2 && scores[0].score !== scores[1].score ? scores[0].candidateId : null,
        dataLastUpdated: DATA_LAST_UPDATED,
      })
    }
  }

  return { matchups, polls: dedupeIds(polls).sort((a, b) => (a.fieldworkEnd < b.fieldworkEnd ? 1 : -1)) }
}

function buildSnapshot(firstRound, secondRound) {
  return {
    generatedAt: DATA_LAST_UPDATED,
    source: { label: 'Wikipédia – Opinion polling for the 2027 French presidential election', url: SOURCE_PAGE },
    firstRound: {
      studyCount: firstRound.length,
      latestFieldworkEnd: firstRound[0]?.fieldworkEnd ?? null,
      studies: firstRound.slice(0, 6).map(({ id, pollster, sourceUrl, sampleSize, fieldworkStart, fieldworkEnd, scenarios }) => ({
        id,
        pollster,
        sourceUrl,
        sampleSize,
        fieldworkStart,
        fieldworkEnd,
        scenarios: scenarios.map(({ label, scores }) => ({ label, scores })),
      })),
    },
    secondRound: {
      matchups: secondRound.matchups.map((matchup) => ({
        ...matchup,
        polls: secondRound.polls
          .filter((poll) => poll.matchupId === matchup.id)
          .slice(0, 4)
          .map(({ pollster, sourceUrl, sampleSize, fieldworkStart, fieldworkEnd, scores }) => ({
            pollster,
            sourceUrl,
            sampleSize,
            fieldworkStart,
            fieldworkEnd,
            scores,
          })),
      })),
    },
  }
}

async function fetchWikitext() {
  const response = await fetch(
    'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles=Opinion_polling_for_the_2027_French_presidential_election&rvslots=main&rvprop=content&format=json',
    { headers: { 'User-Agent': 'presidentielle2027-site/1.0 (polls sync)' } },
  )
  if (!response.ok) {
    throw new Error(`Wikipedia API returned ${response.status}`)
  }
  const payload = await response.json()
  const page = Object.values(payload.query.pages)[0]
  const wikitext = page?.revisions?.[0]?.slots?.main?.['*']
  if (typeof wikitext !== 'string') {
    throw new Error('Wikipedia wikitext payload is missing.')
  }
  return wikitext
}

async function replaceCollection(db, collectionName, documents) {
  const batch = writeBatch(db)
  if (RESET_COLLECTION) {
    const existing = await getDocs(collection(db, collectionName))
    existing.forEach((entry) => batch.delete(entry.ref))
  }
  for (const document of documents) {
    batch.set(doc(db, collectionName, document.id), document)
  }
  await batch.commit()
}

async function main() {
  const wikitext = await fetchWikitext()
  const firstRound = parseFirstRound(wikitext)
  const secondRound = parseSecondRound(wikitext)

  if (firstRound.length === 0) {
    throw new Error('No first-round poll study was parsed from the source page.')
  }

  const snapshot = buildSnapshot(firstRound, secondRound)
  await writeFile(SNAPSHOT_PATH, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8')

  const scenarioCount = firstRound.reduce((total, study) => total + study.scenarios.length, 0)
  console.log(`First round: ${firstRound.length} studies, ${scenarioCount} scenarios, latest fieldwork ${firstRound[0].fieldworkEnd}.`)
  console.log(`Second round: ${secondRound.matchups.length} matchups, ${secondRound.polls.length} polls.`)
  console.log(`Snapshot written to ${SNAPSHOT_PATH}.`)

  if (DRY_RUN) {
    console.log(JSON.stringify({ latestStudy: firstRound[0], matchups: secondRound.matchups.map((m) => m.label) }, null, 2))
    return
  }

  const db = getFirestore(initializeApp(getFirebaseConfig()))
  await replaceCollection(db, FIRST_ROUND_COLLECTION, firstRound)
  await replaceCollection(db, SECOND_ROUND_COLLECTION, secondRound.polls)
  console.log(`Synced ${firstRound.length} first-round studies and ${secondRound.polls.length} second-round polls into Firestore.`)
}

await main()
