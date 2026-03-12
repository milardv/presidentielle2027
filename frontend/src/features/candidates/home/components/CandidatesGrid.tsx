import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import type { Candidate } from '../../../../data/candidateTypes'
import { CandidateCard } from './CandidateCard'

interface CandidatesGridProps {
  candidates: Candidate[]
}

export function CandidatesGrid({ candidates }: CandidatesGridProps) {
  const railRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const dragStateRef = useRef<{ startX: number; startScrollLeft: number } | null>(null)
  const scrollMomentumTimeoutRef = useRef<number | null>(null)
  const buttonMomentumTimeoutRef = useRef<number | null>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [thumbWidth, setThumbWidth] = useState(0)
  const [thumbOffset, setThumbOffset] = useState(0)
  const [isDraggingThumb, setIsDraggingThumb] = useState(false)
  const [isThumbActive, setIsThumbActive] = useState(false)
  const [activeButton, setActiveButton] = useState<'left' | 'right' | null>(null)

  const getThumbGeometry = useCallback(() => {
    const rail = railRef.current
    const track = trackRef.current

    if (!rail || !track) {
      return { thumbWidth: 0, thumbTravel: 0, maxScrollLeft: 0 }
    }

    const maxScrollLeft = Math.max(rail.scrollWidth - rail.clientWidth, 0)
    const trackWidth = track.clientWidth
    const thumbWidth = maxScrollLeft > 0 ? Math.max(trackWidth * (rail.clientWidth / rail.scrollWidth), 88) : trackWidth
    const thumbTravel = Math.max(trackWidth - thumbWidth, 0)

    return { thumbWidth, thumbTravel, maxScrollLeft }
  }, [])

  const updateScrollState = useCallback(() => {
    const rail = railRef.current

    if (!rail) {
      setCanScrollLeft(false)
      setCanScrollRight(false)
      setThumbWidth(0)
      setThumbOffset(0)
      return
    }

    const { thumbWidth, thumbTravel, maxScrollLeft } = getThumbGeometry()
    setCanScrollLeft(rail.scrollLeft > 8)
    setCanScrollRight(maxScrollLeft - rail.scrollLeft > 8)
    setThumbWidth(thumbWidth)
    setThumbOffset(maxScrollLeft > 0 ? (rail.scrollLeft / maxScrollLeft) * thumbTravel : 0)
  }, [getThumbGeometry])

  useEffect(() => {
    updateScrollState()

    const rail = railRef.current

    if (!rail) {
      return
    }

    const handleRailScroll = () => {
      updateScrollState()
      setIsThumbActive(true)

      if (scrollMomentumTimeoutRef.current !== null) {
        window.clearTimeout(scrollMomentumTimeoutRef.current)
      }

      scrollMomentumTimeoutRef.current = window.setTimeout(() => {
        setIsThumbActive(false)
        scrollMomentumTimeoutRef.current = null
      }, 180)
    }

    rail.addEventListener('scroll', handleRailScroll, { passive: true })
    window.addEventListener('resize', updateScrollState)

    return () => {
      rail.removeEventListener('scroll', handleRailScroll)
      window.removeEventListener('resize', updateScrollState)

      if (scrollMomentumTimeoutRef.current !== null) {
        window.clearTimeout(scrollMomentumTimeoutRef.current)
        scrollMomentumTimeoutRef.current = null
      }

      if (buttonMomentumTimeoutRef.current !== null) {
        window.clearTimeout(buttonMomentumTimeoutRef.current)
        buttonMomentumTimeoutRef.current = null
      }
    }
  }, [candidates.length, updateScrollState])

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const dragState = dragStateRef.current
      const rail = railRef.current

      if (!dragState || !rail) {
        return
      }

      const { thumbTravel, maxScrollLeft } = getThumbGeometry()

      if (thumbTravel <= 0 || maxScrollLeft <= 0) {
        return
      }

      const deltaX = event.clientX - dragState.startX
      const nextScrollLeft = dragState.startScrollLeft + (deltaX / thumbTravel) * maxScrollLeft
      rail.scrollLeft = Math.max(0, Math.min(maxScrollLeft, nextScrollLeft))
    }

    const stopDragging = () => {
      dragStateRef.current = null
      setIsDraggingThumb(false)
      setIsThumbActive(false)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', stopDragging)
    window.addEventListener('pointercancel', stopDragging)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', stopDragging)
      window.removeEventListener('pointercancel', stopDragging)
    }
  }, [getThumbGeometry])

  const scrollRail = (direction: 'left' | 'right') => {
    const rail = railRef.current

    if (!rail) {
      return
    }

    rail.scrollBy({
      left: direction === 'right' ? rail.clientWidth * 0.8 : rail.clientWidth * -0.8,
      behavior: 'smooth',
    })

    setActiveButton(direction)

    if (buttonMomentumTimeoutRef.current !== null) {
      window.clearTimeout(buttonMomentumTimeoutRef.current)
    }

    buttonMomentumTimeoutRef.current = window.setTimeout(() => {
      setActiveButton(null)
      buttonMomentumTimeoutRef.current = null
    }, 220)
  }

  const handleTrackClick = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) {
      return
    }

    const rail = railRef.current
    const track = trackRef.current

    if (!rail || !track) {
      return
    }

    const { thumbWidth, thumbTravel, maxScrollLeft } = getThumbGeometry()

    if (thumbTravel <= 0 || maxScrollLeft <= 0) {
      return
    }

    const bounds = track.getBoundingClientRect()
    const clickX = event.clientX - bounds.left
    const nextThumbOffset = Math.max(0, Math.min(thumbTravel, clickX - thumbWidth / 2))
    rail.scrollTo({
      left: (nextThumbOffset / thumbTravel) * maxScrollLeft,
      behavior: 'smooth',
    })
  }

  const handleThumbPointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const rail = railRef.current

    if (!rail) {
      return
    }

    dragStateRef.current = {
      startX: event.clientX,
      startScrollLeft: rail.scrollLeft,
    }
    setIsDraggingThumb(true)
    setIsThumbActive(true)
    event.preventDefault()
  }

  return (
    <section id="home-candidates" className="py-10">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">Prétendants à la présidence</h2>
        </div>

        <div className="flex items-center gap-3">
          <p className="text-sm font-semibold text-slate-500">Glissez horizontalement pour parcourir tous les profils.</p>

          <div className="hidden items-center gap-2 lg:flex">
            <button
              type="button"
              onClick={() => scrollRail('left')}
              disabled={!canScrollLeft}
              className={`group inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-all duration-200 hover:-translate-x-0.5 hover:border-primary/30 hover:text-primary hover:shadow-[0_10px_18px_rgba(26,34,127,0.10)] disabled:cursor-not-allowed disabled:opacity-35 ${
                activeButton === 'left' ? 'scale-[1.06] border-primary/40 text-primary shadow-[0_14px_24px_rgba(26,34,127,0.16)]' : ''
              }`}
              aria-label="Voir les candidats précédents"
            >
              <ChevronLeft
                className={`h-5 w-5 transition-transform duration-200 ${
                  activeButton === 'left' ? '-translate-x-0.5 scale-105' : 'group-hover:-translate-x-0.5'
                }`}
              />
            </button>
            <button
              type="button"
              onClick={() => scrollRail('right')}
              disabled={!canScrollRight}
              className={`group inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-all duration-200 hover:translate-x-0.5 hover:border-primary/30 hover:text-primary hover:shadow-[0_10px_18px_rgba(26,34,127,0.10)] disabled:cursor-not-allowed disabled:opacity-35 ${
                activeButton === 'right' ? 'scale-[1.06] border-primary/40 text-primary shadow-[0_14px_24px_rgba(26,34,127,0.16)]' : ''
              }`}
              aria-label="Voir les candidats suivants"
            >
              <ChevronRight
                className={`h-5 w-5 transition-transform duration-200 ${
                  activeButton === 'right' ? 'translate-x-0.5 scale-105' : 'group-hover:translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="candidate-rail-shell pb-2">
        <div
          ref={railRef}
          className="candidate-rail-scrollbar overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-px-0 px-1 pb-2"
        >
          <div className="flex gap-5 pr-8 sm:pr-12">
            {candidates.map((candidate, index) => (
              <CandidateCard key={candidate.id} candidate={candidate} variant="rail" revealIndex={index} />
            ))}
            <div aria-hidden="true" className="w-3 shrink-0 sm:w-6" />
          </div>
        </div>

        <div
          ref={trackRef}
          onPointerDown={handleTrackClick}
          className="candidate-rail-track mt-4 hidden lg:block"
          aria-hidden="true"
        >
          <button
            type="button"
            onPointerDown={handleThumbPointerDown}
            className={`candidate-rail-thumb ${
              isDraggingThumb ? 'candidate-rail-thumb-dragging' : ''
            } ${isThumbActive ? 'candidate-rail-thumb-active' : ''}`}
            style={{
              width: `${thumbWidth}px`,
              left: `${thumbOffset}px`,
            }}
            aria-label="Faire défiler les candidats"
          />
        </div>
      </div>
    </section>
  )
}
