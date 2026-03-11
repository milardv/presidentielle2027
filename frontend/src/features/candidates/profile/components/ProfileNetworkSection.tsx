import type { Core } from 'cytoscape'
import { Flag, Landmark, Users } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import CytoscapeComponent from 'react-cytoscapejs'
import type { CandidateNetworkRelation } from '../../../../data/candidateTypes'
import { formatFrenchDate, getCandidatePartyAccentColor } from '../../shared/candidateUi'
import { ProfileSectionHeading } from './ProfileSectionHeading'

interface ProfileNetworkSectionProps {
  candidateId: string
  candidateName: string
  candidateParty: string
  candidatePhotoUrl?: string
  entries: CandidateNetworkRelation[]
}

type NetworkTone = 'ally' | 'institution' | 'rival'

interface NetworkViewEntry {
  id: string
  actor: string
  role: string
  relation: string
  tone: NetworkTone
  imageUrl: string | null
  source: CandidateNetworkRelation['source']
}

function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function classifyNetworkTone(entry: CandidateNetworkRelation): NetworkTone {
  const haystack = normalizeText(`${entry.actor} ${entry.role} ${entry.relation}`)

  const rivalKeywords = ['rival', 'advers', 'oppos', 'contre', 'face', 'concurr', 'rapport de force', 'match']
  if (rivalKeywords.some((keyword) => haystack.includes(keyword))) {
    return 'rival'
  }

  const institutionKeywords = [
    'assemblee',
    'parlement',
    'senat',
    'ministere',
    'gouvernement',
    'ville',
    'region',
    'commission',
    'chancellerie',
    'matignon',
    'maire',
    'senateur',
    'depute',
    'territorial',
  ]
  if (institutionKeywords.some((keyword) => haystack.includes(keyword))) {
    return 'institution'
  }

  return 'ally'
}

function buildNetworkEntries(candidateId: string, entries: CandidateNetworkRelation[]): NetworkViewEntry[] {
  return entries.map((entry, index) => ({
    id: `${candidateId}-network-${index}`,
    actor: entry.actor,
    role: entry.role,
    relation: entry.relation,
    tone: entry.tone ?? classifyNetworkTone(entry),
    imageUrl: entry.imageUrl ?? null,
    source: entry.source,
  }))
}

function getToneLabel(tone: NetworkTone): string {
  switch (tone) {
    case 'ally':
      return 'Alliance'
    case 'institution':
      return 'Appui'
    case 'rival':
      return 'Rival'
  }
}

function getToneColor(tone: NetworkTone): string {
  switch (tone) {
    case 'ally':
      return '#0f766e'
    case 'institution':
      return '#2563eb'
    case 'rival':
      return '#dc2626'
  }
}

function getToneIcon(tone: NetworkTone) {
  switch (tone) {
    case 'ally':
      return <Users className="h-[16px] w-[16px]" />
    case 'institution':
      return <Landmark className="h-[16px] w-[16px]" />
    case 'rival':
      return <Flag className="h-[16px] w-[16px]" />
  }
}

function buildElements(
  candidateId: string,
  candidateName: string,
  candidatePhotoUrl: string | undefined,
  entries: NetworkViewEntry[],
) {
  const candidateNodeId = `${candidateId}-network-center`
  const radius = entries.length >= 4 ? 360 : 320

  const nodes = entries.map((entry, index) => {
    const angle = (-Math.PI / 2) + (index * 2 * Math.PI) / Math.max(entries.length, 1)

    return {
      data: {
        id: entry.id,
        label: entry.actor,
        subtitle: entry.role,
        tone: entry.tone,
        imageUrl: entry.imageUrl ?? '',
      },
      position: {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      },
    }
  })

  const edges = entries.map((entry) => ({
    data: {
      id: `${candidateNodeId}-${entry.id}`,
      source: candidateNodeId,
      target: entry.id,
      tone: entry.tone,
    },
  }))

  return [
    {
      data: {
        id: candidateNodeId,
        label: candidateName,
        subtitle: 'Candidat',
        tone: 'candidate',
        imageUrl: candidatePhotoUrl ?? '',
      },
      position: { x: 0, y: 0 },
      locked: true,
      grabbable: false,
      selectable: false,
    },
    ...nodes,
    ...edges,
  ]
}

export function ProfileNetworkSection({
  candidateId,
  candidateName,
  candidateParty,
  candidatePhotoUrl,
  entries,
}: ProfileNetworkSectionProps) {
  const cyRef = useRef<Core | null>(null)
  const candidateAccentColor = getCandidatePartyAccentColor(candidateParty)
  const networkEntries = useMemo(() => buildNetworkEntries(candidateId, entries), [candidateId, entries])
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(networkEntries[0]?.id ?? null)

  useEffect(() => {
    setSelectedEntryId(networkEntries[0]?.id ?? null)
  }, [networkEntries])

  const selectedEntry = networkEntries.find((entry) => entry.id === selectedEntryId) ?? networkEntries[0] ?? null
  const elements = useMemo(
    () => buildElements(candidateId, candidateName, candidatePhotoUrl, networkEntries),
    [candidateId, candidateName, candidatePhotoUrl, networkEntries],
  )

  useEffect(() => {
    const cy = cyRef.current
    if (!cy) {
      return
    }

    const handleTap = (event: { target: { id: () => string } }) => {
      const tappedId = event.target.id()
      if (tappedId.endsWith('-network-center')) {
        return
      }

      setSelectedEntryId(tappedId)
    }

    cy.on('tap', 'node', handleTap)
    cy.fit(cy.elements(), 56)
    cy.center()

    return () => {
      cy.off('tap', 'node', handleTap)
    }
  }, [elements])

  const stylesheet = useMemo(
    () => [
      {
        selector: 'node',
        style: {
          'background-color': '#ffffff',
          'background-image': 'data(imageUrl)',
          'background-fit': 'cover',
          'background-clip': 'node',
          'background-opacity': 1,
          'border-width': 3,
          'border-color': '#cbd5e1',
          'label': 'data(label)',
          'text-wrap': 'wrap',
          'text-max-width': 132,
          'text-valign': 'bottom',
          'text-halign': 'center',
          'text-margin-y': 92,
          'font-size': 12,
          'font-weight': 700,
          color: '#0f172a',
          width: 120,
          height: 120,
          'overlay-opacity': 0,
        },
      },
      {
        selector: 'node[tone = "candidate"]',
        style: {
          'background-color': candidateAccentColor,
          'border-color': candidateAccentColor,
          color: '#0f172a',
          width: 164,
          height: 164,
          'font-size': 14,
          'text-max-width': 180,
          'text-margin-y': 116,
        },
      },
      {
        selector: 'node[tone = "ally"]',
        style: {
          'border-color': getToneColor('ally'),
          'background-color': '#f0fdfa',
        },
      },
      {
        selector: 'node[tone = "institution"]',
        style: {
          'border-color': getToneColor('institution'),
          'background-color': '#eff6ff',
        },
      },
      {
        selector: 'node[tone = "rival"]',
        style: {
          'border-color': getToneColor('rival'),
          'background-color': '#fef2f2',
        },
      },
      {
        selector: 'node:selected',
        style: {
          'border-width': 4,
        },
      },
      {
        selector: 'edge',
        style: {
          width: 3,
          'curve-style': 'bezier',
          'line-color': '#cbd5e1',
          opacity: 0.9,
          'overlay-opacity': 0,
        },
      },
      {
        selector: 'edge[tone = "ally"]',
        style: {
          'line-color': getToneColor('ally'),
        },
      },
      {
        selector: 'edge[tone = "institution"]',
        style: {
          'line-color': getToneColor('institution'),
        },
      },
      {
        selector: 'edge[tone = "rival"]',
        style: {
          'line-color': getToneColor('rival'),
          'line-style': 'dashed',
        },
      },
    ],
    [candidateAccentColor],
  )

  return (
    <section id="reseau" className="scroll-mt-40">
      <ProfileSectionHeading icon="group" title="Réseau politique" />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)]">
        <article className="overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/94 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <div className="border-b border-slate-200/80 px-5 py-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">Cartographie</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Le graphe distingue les alliances, les appuis institutionnels et les relations de rivalité à partir des données sourcées du candidat.
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
              Molette ou pincement pour zoomer. Glisser pour déplacer la vue.
            </p>
          </div>

          <div className="h-[40rem] bg-[radial-gradient(circle_at_top,_rgba(26,34,127,0.06),_transparent_48%)] p-2 sm:h-[46rem] sm:p-4">
            <CytoscapeComponent
              elements={elements}
              stylesheet={stylesheet}
              layout={{ name: 'preset', fit: true, padding: 56 }}
              cy={(cy: Core) => {
                cyRef.current = cy
              }}
              autolock
              minZoom={0.55}
              maxZoom={2.2}
              wheelSensitivity={0.18}
              zoomingEnabled
              userZoomingEnabled
              panningEnabled
              userPanningEnabled
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </article>

        <div className="grid gap-4">
          <article className="rounded-[1.75rem] border border-slate-200/80 bg-white/94 p-5 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Lecture</p>

            <div className="mt-4 grid gap-3">
              {(['ally', 'institution', 'rival'] as const).map((tone) => (
                <div
                  key={tone}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/80 px-4 py-3"
                >
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full text-white"
                    style={{ backgroundColor: getToneColor(tone) }}
                  >
                    {getToneIcon(tone)}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-slate-950">{getToneLabel(tone)}</p>
                    <p className="text-xs text-slate-500">
                      {tone === 'ally'
                        ? 'Partis, mouvements, relais ou soutiens politiques.'
                        : tone === 'institution'
                          ? 'Fonctions, mandats et points d’appui institutionnels.'
                          : 'Concurrence, rapport de force ou opposition politique.'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          {selectedEntry ? (
            <article className="rounded-[1.75rem] border border-slate-200/80 bg-white/94 p-5 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Lien sélectionné</p>

              <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                  {selectedEntry.imageUrl ? (
                    <img
                      src={selectedEntry.imageUrl}
                      alt={selectedEntry.actor}
                      className="mb-3 h-14 w-14 rounded-2xl border border-slate-200 bg-white object-cover p-2"
                      loading="lazy"
                    />
                  ) : null}
                  <h4 className="text-xl font-black tracking-tight text-slate-950">{selectedEntry.actor}</h4>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                    {selectedEntry.role}
                  </p>
                </div>
                <span
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em]"
                  style={{
                    backgroundColor: `${getToneColor(selectedEntry.tone)}1A`,
                    color: getToneColor(selectedEntry.tone),
                  }}
                >
                  {getToneIcon(selectedEntry.tone)}
                  {getToneLabel(selectedEntry.tone)}
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-700">{selectedEntry.relation}</p>

              <div className="mt-4 flex flex-col gap-2 text-sm text-slate-500">
                <span>{formatFrenchDate(selectedEntry.source.date)}</span>
                <a
                  href={selectedEntry.source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-primary hover:underline"
                >
                  Source : {selectedEntry.source.label}
                </a>
              </div>
            </article>
          ) : null}

          <article className="rounded-[1.75rem] border border-slate-200/80 bg-white/94 p-5 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Relations sourcées</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {networkEntries.map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => setSelectedEntryId(entry.id)}
                  className={`rounded-full border px-3 py-2 text-left text-xs font-semibold transition ${
                    selectedEntry?.id === entry.id
                      ? 'border-primary bg-primary/8 text-primary'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  {entry.actor}
                </button>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
