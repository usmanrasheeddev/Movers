import { useLayoutEffect, useRef } from 'react'
import { ensureScrollTrigger, gsap } from '@/lib/gsap'

const logos = [
  { name: 'Dubai Marina', tag: 'Areas' },
  { name: 'JLT', tag: 'Areas' },
  { name: 'Business Bay', tag: 'Areas' },
  { name: 'Dubai Hills', tag: 'Areas' },
  { name: 'Palm Jumeirah', tag: 'Areas' },
  { name: 'Mirdif', tag: 'Areas' },
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
        '.logo-pill',
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.06,
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
    <section ref={rootRef} className="bg-background">
      <div className="mx-auto max-w-6xl px-5 pb-8 md:px-6 md:pb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-inkMuted">
          As seen across Dubai
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {logos.map((l) => (
            <div
              key={l.name}
              className="logo-pill group flex items-center gap-3 rounded-full border border-outline/70 bg-background px-4 py-2 text-sm text-inkMuted transition-colors hover:bg-muted hover:text-ink"
            >
              <span className="text-xs font-semibold text-inkMuted/70 group-hover:text-inkMuted">
                {l.tag}
              </span>
              <span className="h-4 w-px bg-outline" />
              <span className="font-semibold tracking-tight">{l.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
