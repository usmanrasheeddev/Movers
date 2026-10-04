import { useLayoutEffect, useRef } from 'react'
import { ensureScrollTrigger, gsap } from '@/lib/gsap'
import { MapPin, Navigation } from 'lucide-react'

const locations = [
  { name: 'Dubai Marina', status: 'Units Active' },
  { name: 'Palm Jumeirah', status: 'Permit Ready' },
  { name: 'Downtown Dubai', status: 'Tower Relocation' },
  { name: 'Business Bay', status: 'Corporate Move' },
  { name: 'Dubai Hills', status: 'Villa Slot' },
  { name: 'Arabian Ranches', status: 'Full Villa' },
  { name: 'Mirdif', status: 'Daily Dispatch' },
  { name: 'JLT & JVT', status: 'Express Pickup' },
] as const

export function TrustLogosSection() {
  const rootRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const prefersReducedMotion = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)'
    )?.matches
    if (prefersReducedMotion) return

    ensureScrollTrigger()

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.location-pill',
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.05,
          scrollTrigger: {
            trigger: root,
            start: 'top 85%',
          },
        }
      )
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="relative bg-[#FAF7F2] py-12 border-t border-outline/50">
      <div className="mx-auto max-w-6xl px-5 md:px-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex items-center gap-2">
            <Navigation className="size-4 text-cta" />
            <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-inkMuted">
              DAILY COVERAGE & DISPATCH LOCATIONS
            </span>
          </div>
          <span className="text-xs font-semibold text-inkMuted">
            Building permit compliance & community access ready
          </span>
        </div>

        <div className="flex flex-wrap gap-3">
          {locations.map((l) => (
            <div
              key={l.name}
              className="location-pill group flex items-center gap-3 rounded-2xl border border-outline/70 bg-white px-4 py-2.5 shadow-sm text-sm text-ink transition-all hover:border-cta/50 hover:shadow-md"
            >
              <MapPin className="size-4 text-cta shrink-0" />
              <span className="font-bold tracking-tight">{l.name}</span>
              <span className="h-3 w-px bg-outline" />
              <span className="text-xs font-semibold text-inkMuted/80">
                {l.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
