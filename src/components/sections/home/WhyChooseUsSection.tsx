import { useLayoutEffect, useRef } from 'react'
import { Bolt, Armchair, Recycle, MapPin } from 'lucide-react'
import { ensureScrollTrigger, gsap } from '@/lib/gsap'

const pillars = [
  {
    title: 'Same-Day Service',
    body: 'Quick slots when you need it now — without rushing the quality.',
    icon: Bolt,
  },
  {
    title: 'We Do All The Heavy Lifting',
    body: 'Wrapping, carrying, loading, and placing — handled end-to-end.',
    icon: Armchair,
  },
  {
    title: 'Responsible Disposal',
    body: 'We sort, recycle, and dispose properly — Dubai-friendly practices.',
    icon: Recycle,
  },
  {
    title: 'Anywhere in Dubai',
    body: 'Marina to Mirdif — apartments, villas, offices, and pickups.',
    icon: MapPin,
  },
] as const

export function WhyChooseUsSection() {
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
        '.pillar-card',
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: root,
            start: 'top 75%',
          },
        }
      )
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="bg-background">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-24">
        <div className="grid gap-10 md:grid-cols-2 md:items-end">
          <div>
            <h2 className="text-balance text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
              Premium service. Zero chaos.
            </h2>
            <p dir="rtl" className="mt-2 text-sm text-inkMuted">
              خدمة مميزة بدون فوضى.
            </p>
            <p className="mt-3 max-w-xl text-sm text-inkMuted md:text-base">
              The experience should feel calm, professional, and surprisingly
              smooth.
            </p>
          </div>

          <div className="rounded-3xl border border-outline/70 bg-background p-6">
            <p className="font-serif text-lg italic text-ink">
              “Our team arrives prepared — and leaves your space spotless.”
            </p>
            <p className="mt-2 text-sm text-inkMuted">
              Premium wrapping materials, careful handling, and a logistics-first
              approach.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="pillar-card rounded-3xl border border-outline/70 bg-background p-5 md:p-6 transition-all hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(26,58,58,0.10)]"
            >
              <div className="grid size-12 place-items-center rounded-2xl bg-muted text-brand">
                <p.icon className="size-5" />
              </div>
              <h3 className="mt-5 text-base font-bold tracking-tight text-ink">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-inkMuted">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
