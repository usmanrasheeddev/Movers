import { useEffect, useMemo, useRef, useState } from 'react'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Ayesha K.',
    text: 'Fast, careful, and super professional. The wrapping was premium and clean.',
  },
  {
    name: 'Omar R.',
    text: 'Booked in the morning, moved by evening. Smoothest move I’ve had in Dubai.',
  },
  {
    name: 'Sana M.',
    text: 'They handled a large sofa + appliances with zero drama. Highly recommend.',
  },
  {
    name: 'Bilal H.',
    text: 'Office move was organized and labeled. Minimal downtime, great crew.',
  },
  {
    name: 'Noura A.',
    text: 'Very respectful team, punctual, and everything arrived spotless.',
  },
  {
    name: 'Hamza T.',
    text: 'Clear pricing, careful lifting, and they even helped with placement.',
  },
] as const

export function TestimonialsMarquee() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeftStart = useRef(0)
  const resumeTimerRef = useRef<number | null>(null)

  // Triple elements for seamless loop
  const items = useMemo(() => [...testimonials, ...testimonials, ...testimonials], [])

  // Auto-scroll loop
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let animationFrameId: number
    const speed = 0.65 // pixels per frame

    const scroll = () => {
      if (!isPaused && !isDragging.current) {
        container.scrollLeft += speed

        // Infinite loop check: when we scroll past 2/3 of the items, reset back to 1/3
        const oneThirdWidth = container.scrollWidth / 3
        if (container.scrollLeft >= oneThirdWidth * 2) {
          container.scrollLeft = oneThirdWidth
        }
      }
      animationFrameId = requestAnimationFrame(scroll)
    }

    animationFrameId = requestAnimationFrame(scroll)
    return () => {
      cancelAnimationFrame(animationFrameId)
      if (resumeTimerRef.current) {
        window.clearTimeout(resumeTimerRef.current)
      }
    }
  }, [isPaused])

  // Helper to schedule auto-scroll resumption
  const scheduleResume = () => {
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current)
    }
    resumeTimerRef.current = window.setTimeout(() => {
      setIsPaused(false)
    }, 1200)
  }

  // Mouse Drag Handlers (Desktop support)
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = containerRef.current
    if (!container) return
    isDragging.current = true
    setIsPaused(true)
    startX.current = e.pageX - container.offsetLeft
    scrollLeftStart.current = container.scrollLeft
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return
    const container = containerRef.current
    if (!container) return
    e.preventDefault()
    const x = e.pageX - container.offsetLeft
    const walk = (x - startX.current) * 1.5 // Multiplier for drag speed
    container.scrollLeft = scrollLeftStart.current - walk
  }

  const handleMouseUpOrLeave = () => {
    if (isDragging.current) {
      isDragging.current = false
      scheduleResume()
    }
  }

  // Touch Swipe Handlers (Mobile support to temporarily pause loop)
  const handleTouchStart = () => {
    setIsPaused(true)
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current)
    }
  }

  const handleTouchEnd = () => {
    scheduleResume()
  }

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-24">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-balance text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
              Loved by busy Dubai schedules
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-inkMuted md:text-base">
              Smooth moves with premium handling — verified by customers.
            </p>
          </div>
          <div className="hidden rounded-2xl border border-outline/70 bg-background px-4 py-2 text-xs font-semibold text-inkMuted md:flex">
            Google reviews • 4.9 average
          </div>
        </div>

        {/* Scrollable Container with hidden scrollbars and grab cursor */}
        <div
          ref={containerRef}
          className="mt-10 overflow-x-auto rounded-3xl border border-outline/70 bg-background/60 select-none cursor-grab active:cursor-grabbing scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex w-max gap-4 px-4 py-6">
            {items.map((t, idx) => (
              <div
                key={`${t.name}-${idx}`}
                className="w-[290px] shrink-0 rounded-3xl border border-outline/70 bg-background p-5 shadow-[0_18px_50px_rgba(26,58,58,0.06)]"
              >
                <div className="flex items-center gap-1 text-cta">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-inkMuted">
                  “{t.text}”
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <span className="rounded-full border border-outline/70 bg-muted px-3 py-1 text-[10px] font-semibold text-inkMuted">
                    Google
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
