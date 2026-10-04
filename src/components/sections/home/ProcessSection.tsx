import { useLayoutEffect, useRef } from 'react'
import { ensureScrollTrigger, gsap } from '@/lib/gsap'
import { CheckCircle2, ClipboardList, Calculator, Truck } from 'lucide-react'

const steps = [
  {
    index: '01',
    title: 'Share Move Details',
    arabic: 'حدد التفاصيل',
    body: 'Select your service, pickup & dropoff location, and preferred date/time slot in seconds.',
    icon: ClipboardList,
    checkpoints: ['Online form or WhatsApp', 'Custom date & time', 'No advance deposit'],
  },
  {
    index: '02',
    title: 'Instant Clear Estimate',
    arabic: 'احصل على عرض سعر شفاف',
    body: 'Receive a transparent price estimate based on volume and distance — zero hidden fees on moving day.',
    icon: Calculator,
    checkpoints: ['Transparent item pricing', 'Access permit advice', 'Instant confirmation'],
  },
  {
    index: '03',
    title: 'Relax & Hand Over',
    arabic: 'استمتع بنقل مريح وسلس',
    body: 'Our uniformed Dubai crew arrives equipped to disassemble, wrap, load, transport, and place your items.',
    icon: Truck,
    checkpoints: ['White-glove wrapping', 'Careful loading & placement', 'Final walk-through inspection'],
  },
] as const

export function ProcessSection() {
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
        '.process-card',
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.12,
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
    <section ref={rootRef} className="relative bg-[#FAF7F2] py-20 md:py-28 overflow-hidden border-t border-outline/50">
      <div className="mx-auto max-w-6xl px-5 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-cta">
              // SIMPLE 3-STEP PIPELINE
            </span>
            <h2 className="mt-2 text-balance text-3xl font-extrabold tracking-tight text-ink sm:text-4xl md:text-5xl">
              Moving made ridiculously easy
            </h2>
            <p dir="rtl" className="mt-2 text-base font-semibold text-inkMuted">
              خطوات ثلاث بسيطة لنقل مريح وبدون توتر
            </p>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-inkMuted">
            A streamlined process designed for Dubai schedules — clean wrapping, polite crews, and punctual execution.
          </p>
        </div>

        <div className="mt-8 sm:mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.title}
              className="process-card relative rounded-[2.25rem] border border-outline/70 bg-white p-7 shadow-[0_12px_40px_rgba(26,58,58,0.04)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="grid size-12 place-items-center rounded-2xl bg-orange-100/70 text-cta">
                    <s.icon className="size-6" />
                  </div>
                  <span className="font-mono text-xs font-extrabold text-inkMuted bg-muted px-3 py-1 rounded-full">
                    STEP {s.index}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-extrabold tracking-tight text-ink">
                  {s.title}
                </h3>
                <p dir="rtl" className="mt-1 text-xs font-semibold text-inkMuted">
                  {s.arabic}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-inkMuted">
                  {s.body}
                </p>
              </div>

              <div className="mt-6 border-t border-outline/50 pt-4 space-y-2">
                {s.checkpoints.map((cp) => (
                  <div key={cp} className="flex items-center gap-2 text-xs font-medium text-ink">
                    <CheckCircle2 className="size-3.5 text-cta shrink-0" />
                    <span>{cp}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
