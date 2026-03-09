import { initializeApp } from 'firebase/app'
import { collection, doc, getDocs, writeBatch, getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDjCugeUjARO7ObrcR4ao4_53rWSHGGYPQ',
  authDomain: 'presidentielles-f0682.firebaseapp.com',
  projectId: 'presidentielles-f0682',
  storageBucket: 'presidentielles-f0682.firebasestorage.app',
  messagingSenderId: '171363522127',
  appId: '1:171363522127:web:4225ffc2fb1ac427807c3a',
  measurementId: 'G-1V4MQDR9VX',
}

const POLLS_COLLECTION = 'polls_2027'
const DATA_LAST_UPDATED = '2026-03-09'
const DRY_RUN = process.argv.includes('--dry-run')
const RESET_COLLECTION = process.argv.includes('--reset')

const monthMap = {
  Jan: '01',
  Feb: '02',
  Mar: '03',
  Apr: '04',
  May: '05',
  Jun: '06',
  Jul: '07',
  Aug: '08',
  Sep: '09',
  Oct: '10',
  Nov: '11',
  Dec: '12',
}

const candidateOrder = [
  { id: 'nathalie-arthaud', name: 'Nathalie Arthaud' },
  { id: 'philippe-poutou', name: 'Philippe Poutou' },
  { id: 'fabien-roussel', name: 'Fabien Roussel' },
  { id: 'jean-luc-melenchon', name: 'Jean-Luc Melenchon' },
  { id: 'francois-ruffin', name: 'Francois Ruffin' },
  { id: 'olivier-faure', name: 'Olivier Faure' },
  { id: 'francois-hollande', name: 'Francois Hollande' },
  { id: 'raphael-glucksmann', name: 'Raphael Glucksmann' },
  { id: 'marine-tondelier', name: 'Marine Tondelier' },
  { id: 'gabriel-attal', name: 'Gabriel Attal' },
  { id: 'gerald-darmanin', name: 'Gerald Darmanin' },
  { id: 'sebastien-lecornu', name: 'Sebastien Lecornu' },
  { id: 'francois-bayrou', name: 'Francois Bayrou' },
  { id: 'edouard-philippe', name: 'Edouard Philippe' },
  { id: 'dominique-de-villepin', name: 'Dominique de Villepin' },
  { id: 'xavier-bertrand', name: 'Xavier Bertrand' },
  { id: 'laurent-wauquiez', name: 'Laurent Wauquiez' },
  { id: 'bruno-retailleau', name: 'Bruno Retailleau' },
  { id: 'cyril-hanouna', name: 'Cyril Hanouna' },
  { id: 'nicolas-dupont-aignan', name: 'Nicolas Dupont-Aignan' },
  { id: 'jordan-bardella', name: 'Jordan Bardella' },
  { id: 'philippe-de-villiers', name: 'Philippe de Villiers' },
  { id: 'sarah-knafo', name: 'Sarah Knafo' },
  { id: 'eric-zemmour', name: 'Eric Zemmour' },
  { id: 'michel-edouard-leclerc', name: 'Michel-Edouard Leclerc' },
  { id: 'teddy-riner', name: 'Teddy Riner' },
  { id: 'patrick-sebastien', name: 'Patrick Sebastien' },
]

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function toIsoDate(day, month, year) {
  const monthValue = monthMap[month]
  if (!monthValue) {
    throw new Error(`Unsupported month: ${month}`)
  }

  return `${year}-${monthValue}-${String(day).padStart(2, '0')}`
}

function parseFieldwork(line) {
  const rangeMatch = line.match(/\{\{Opdrts\|(\d{0,2})\|(\d{1,2})\|([A-Za-z]{3})\|(\d{4})\|year\}\}/)
  if (rangeMatch) {
    const [, maybeStartDay, endDay, month, year] = rangeMatch
    const startDay = maybeStartDay.length > 0 ? maybeStartDay : endDay
    return {
      fieldworkStart: toIsoDate(startDay, month, year),
      fieldworkEnd: toIsoDate(endDay, month, year),
    }
  }

  const singleMatch = line.match(/\{\{(?:dts|Dts)\|(\d{1,2})\|([A-Za-z]{3})\|(\d{4})\}\}/)
  if (!singleMatch) {
    throw new Error(`Unable to parse fieldwork line: ${line}`)
  }

  const [, day, month, year] = singleMatch
  return {
    fieldworkStart: toIsoDate(day, month, year),
    fieldworkEnd: toIsoDate(day, month, year),
  }
}

function parseSampleSize(line) {
  const match = line.match(/\|\s*(?:rowspan="?\d+"?\s*)?\|?\s*([\d,]+)/)
  if (!match) {
    throw new Error(`Unable to parse sample size line: ${line}`)
  }

  return Number.parseInt(match[1].replace(/,/g, ''), 10)
}

function parseScoreCell(line) {
  const content = line.replace(/^\|\s*/, '').trim()
  if (content === '–' || content === '-' || content === '—' || content === '–') {
    return null
  }

  const numberMatch = content.match(/(\d+(?:\.\d+)?)\s*%/)
  if (numberMatch) {
    return Number.parseFloat(numberMatch[1])
  }

  const fallbackMatch = content.match(/(\d+(?:\.\d+)?)/)
  return fallbackMatch ? Number.parseFloat(fallbackMatch[1]) : null
}

function extractSection(wikitext) {
  const sectionStart = wikitext.indexOf('=== March 2025 onwards ===')
  const sectionEnd = wikitext.indexOf('=== Generic candidates ===')
  if (sectionStart === -1 || sectionEnd === -1 || sectionEnd <= sectionStart) {
    throw new Error('Unable to isolate the current polling section in the Wikipedia wikitext.')
  }

  return wikitext.slice(sectionStart, sectionEnd)
}

function buildScenario(scores, index) {
  const orderedScores = scores
    .filter((entry) => entry.score !== null)
    .map((entry) => ({
      candidateId: entry.id,
      candidateName: entry.name,
      score: entry.score,
    }))
    .sort((first, second) => second.score - first.score)

  const label = orderedScores
    .slice(0, 4)
    .map((entry) => `${entry.candidateName} ${entry.score}%`)
    .join(' / ')

  return {
    id: `scenario-${index + 1}`,
    label,
    scores: orderedScores,
    leader: orderedScores[0] ?? null,
    runnerUp: orderedScores[1] ?? null,
  }
}

function parseStudies(section) {
  const lines = section.split('\n').map((line) => line.trim()).filter(Boolean)
  const studies = []

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    const startMatch = line.match(/^\|\s*rowspan=?"?(\d+)"?.*\|\[(https?:\/\/[^\s]+)\s+([^\]]+)\]$/)
    if (!startMatch) {
      continue
    }

    const [, , sourceUrl, sourceLabel] = startMatch
    const fieldwork = parseFieldwork(lines[index + 1])
    const sampleSize = parseSampleSize(lines[index + 2])

    const rawScenarioRows = []
    let currentScenario = []
    index += 3

    for (; index < lines.length; index += 1) {
      const currentLine = lines[index]
      if (/^\|\s*rowspan=?"?\d+"?.*\|\[https?:\/\//.test(currentLine)) {
        if (currentScenario.length > 0) {
          rawScenarioRows.push(currentScenario)
        }
        index -= 1
        break
      }

      if (currentLine.startsWith('|}')) {
        if (currentScenario.length > 0) {
          rawScenarioRows.push(currentScenario)
        }
        break
      }

      if (currentLine.startsWith('|-')) {
        if (currentScenario.length > 0) {
          rawScenarioRows.push(currentScenario)
          currentScenario = []
        }
        continue
      }

      if (currentLine.startsWith('| colspan=')) {
        continue
      }

      if (currentLine.startsWith('|')) {
        currentScenario.push(parseScoreCell(currentLine))
      }
    }

    const scenarios = rawScenarioRows
      .filter((row) => row.length === candidateOrder.length)
      .map((row, scenarioIndex) =>
        buildScenario(
          candidateOrder.map((candidate, candidateIndex) => ({
            ...candidate,
            score: row[candidateIndex],
          })),
          scenarioIndex,
        ),
      )
      .filter((scenario) => scenario.scores.length > 0)

    studies.push({
      id: `${slugify(sourceLabel)}-${fieldwork.fieldworkEnd}`,
      pollster: sourceLabel,
      sourceLabel,
      sourceUrl,
      sectionLabel: 'March 2025 onwards',
      sampleSize,
      fieldworkStart: fieldwork.fieldworkStart,
      fieldworkEnd: fieldwork.fieldworkEnd,
      dataLastUpdated: DATA_LAST_UPDATED,
      scenarios,
    })
  }

  return studies
}

async function fetchCurrentPollStudies() {
  const response = await fetch(
    'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles=Opinion_polling_for_the_2027_French_presidential_election&rvslots=main&rvprop=content&format=json',
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

  return parseStudies(extractSection(wikitext))
}

async function syncPolls() {
  const studies = await fetchCurrentPollStudies()
  if (studies.length === 0) {
    throw new Error('No poll study was parsed from the source page.')
  }

  if (DRY_RUN) {
    const scenarioCount = studies.reduce((total, study) => total + study.scenarios.length, 0)
    console.log(JSON.stringify({ studies: studies.length, scenarios: scenarioCount, firstStudy: studies[0] }, null, 2))
    return
  }

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  const batch = writeBatch(db)

  if (RESET_COLLECTION) {
    const existingDocs = await getDocs(collection(db, POLLS_COLLECTION))
    existingDocs.forEach((entry) => batch.delete(entry.ref))
  }

  for (const study of studies) {
    batch.set(doc(db, POLLS_COLLECTION, study.id), study)
  }

  await batch.commit()
  console.log(`Synced ${studies.length} poll studies into ${POLLS_COLLECTION}.`)
}

await syncPolls()
