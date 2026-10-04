import { useEffect, useMemo, useRef, useState } from 'react'
import { Star, ShieldCheck } from 'lucide-react'

const testimonials = [
  {
    name: 'Ayesha K.',
    location: 'Dubai Marina',
    type: '2BR Villa Move',
    text: 'Fast, careful, and super professional. The wrapping was clean and they protected every corner of our furniture.',
  },
  {
    name: 'Omar R.',
    location: 'Downtown Dubai',
    type: 'Apartment Relocation',
    text: 'Booked in the morning, moved by evening. Smoothest move I’ve ever experienced in Dubai.',
  },
  {
    name: 'Sana M.',
    location: 'Palm Jumeirah',
    type: 'Luxury Penthouse',
    text: 'They handled a large sectional sofa + fragile electronics with zero drama. Highly recommended!',
  },
  {
    name: 'Bilal H.',
    location: 'Business Bay',
    type: 'Corporate Office',
    text: 'Office move was perfectly organized and labeled. Zero operational downtime for our team.',
  },
  {
    name: 'Noura A.',
    location: 'Dubai Hills',
    type: '3BR Villa Relocation',
    text: 'Very respectful and punctual crew. Everything arrived spotless and placed right where we asked.',
  },
  {
    name: 'Hamza T.',
    location: 'Mirdif',
    type: 'Single Item Delivery',
    text: 'Clear upfront pricing, careful lifting, and they even helped re-assemble our dining table.',
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

        // Infinite loop check
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

  const scheduleResume = () => {
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current)
    }
    resumeTimerRef.current = window.setTimeout(() => {
      setIsPaused(false)
    }, 1200)
  }

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
    const walk = (x - startX.current) * 1.5
    container.scrollLeft = scrollLeftStart.current - walk
  }

  const handleMouseUpOrLeave = () => {
    if (isDragging.current) {
      isDragging.current = false
      scheduleResume()
    }
  }

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
    <section className="relative bg-[#FAF7F2] py-20 md:py-28 overflow-hidden border-t border-outline/50">
      <div className="mx-auto max-w-6xl px-5 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-cta">
              // VERIFIED REVIEWS
            </span>
            <h2 className="mt-2 text-balance text-3xl font-extrabold tracking-tight text-ink sm:text-4xl md:text-5xl">
              Loved by busy Dubai residents
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-inkMuted md:text-base">
              Real feedback from customers across Dubai Marina, Palm Jumeirah, Downtown, and Mirdif.
            </p>
          </div>

          <div className="inline-flex items-center gap-3 rounded-2xl border border-outline/70 bg-white px-4 py-3 shadow-sm shrink-0">
            <ShieldCheck className="size-5 text-cta" />
            <div>
              <p className="text-xs font-extrabold text-ink">4.9 / 5.0 Average Rating</p>
              <p className="text-[11px] text-inkMuted">Google Verified Customers</p>
            </div>
          </div>
        </div>

        {/* Marquee container */}
        <div
          ref={containerRef}
          className="mt-12 overflow-x-auto rounded-[2.5rem] border border-outline/70 bg-white/70 p-2 select-none cursor-grab active:cursor-grabbing scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
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
                className="w-[320px] shrink-0 rounded-3xl border border-outline/70 bg-white p-6 shadow-[0_12px_35px_rgba(26,58,58,0.04)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-cta">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="size-4 fill-current" />
                      ))}
                    </div>
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-semibold text-inkMuted">
                      {t.location}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-inkMuted relative pl-3 border-l-2 border-cta/40">
                    “{t.text}”
                  </p>
                </div>

                <div className="mt-6 border-t border-outline/40 pt-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-extrabold text-ink">{t.name}</p>
                    <p className="text-[11px] text-inkMuted">{t.type}</p>
                  </div>
                  <span className="grid size-8 place-items-center rounded-full bg-orange-100/70 text-cta text-xs font-bold font-mono">
                    {t.name[0]}
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
