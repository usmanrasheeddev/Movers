import { useLayoutEffect, useRef } from 'react'
import { ensureScrollTrigger, gsap } from '@/lib/gsap'

const steps = [
  {
    title: 'Tell us what you need',
    body: 'Pick a service, add pickup & dropoff, and share any details.',
  },
  {
    title: 'Get free estimate',
    body: 'We confirm the scope and give a clear price — no surprises.',
  },
  {
    title: 'Sit back while we move it',
    body: 'We pack, wrap, lift, load, and deliver — clean and careful.',
  },
] as const

export function ProcessSection() {
  const rootRef = useRef<HTMLElement | null>(null)
  const pathRef = useRef<SVGPathElement | null>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    const path = pathRef.current
    if (!root || !path) return

    const prefersReducedMotion = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)'
    )?.matches
    if (prefersReducedMotion) return

    ensureScrollTrigger()

    const length = path.getTotalLength()
    path.style.strokeDasharray = `${length}`
    path.style.strokeDashoffset = `${length}`

    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: root,
          start: 'top 70%',
        },
      })

      gsap.fromTo(
        '.process-card',
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: root,
            start: 'top 70%',
          },
        }
      )
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="bg-background">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-24">
        <div>
          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
            Moving made ridiculously easy
          </h2>
          <p dir="rtl" className="mt-2 text-sm text-inkMuted">
            النقل أصبح أسهل من أي وقت.
          </p>
          <p className="mt-3 max-w-2xl text-sm text-inkMuted md:text-base">
            A simple process — with premium execution.
          </p>
        </div>

        <div className="relative mt-10">
          <svg
            className="pointer-events-none absolute left-4 top-6 hidden h-[220px] w-[36px] md:block"
            viewBox="0 0 36 220"
            fill="none"
          >
            <path
              ref={pathRef}
              d="M18 8 C18 52 18 52 18 96 C18 140 18 140 18 184"
              stroke="rgba(232, 122, 42, 0.55)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="6 8"
            />
          </svg>

          <div className="grid gap-4 md:pl-16">
            {steps.map((s, idx) => (
              <div
                key={s.title}
                className={
                  'process-card rounded-3xl border border-outline/70 border-l-4 border-l-brand bg-background p-5 md:p-6 shadow-[0_18px_60px_rgba(26,58,58,0.06)] transition-all hover:border-outline'
                }
                style={{
                  transform: `translateY(${idx % 2 === 0 ? 0 : 6}px)`,
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="grid size-11 place-items-center rounded-2xl bg-muted text-brand shrink-0">
                    <span className="text-sm font-extrabold">0{idx + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-ink">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-inkMuted">
                      {s.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
