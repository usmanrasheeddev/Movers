import { useLayoutEffect, useRef } from 'react'
import { Bolt, Armchair, Recycle, MapPin, ShieldCheck, Star } from 'lucide-react'
import { ensureScrollTrigger, gsap } from '@/lib/gsap'

const pillars = [
  {
    code: '01',
    title: 'Same-Day Scheduling',
    arabic: 'خدمة في نفس اليوم',
    body: 'Priority slots for urgent moves across Dubai — without sacrificing packing care or quality.',
    icon: Bolt,
  },
  {
    code: '02',
    title: 'Complete Heavy Lifting',
    arabic: 'رفع وتغليف متكامل',
    body: 'Furniture wrapping, stairs carrying, truck loading, and exact room placement handled end-to-end.',
    icon: Armchair,
  },
  {
    code: '03',
    title: 'Responsible Disposal',
    arabic: 'تخلص مسؤول من النفايات',
    body: 'Proper sorting, recycling, and donation-first practices for unwanted items & packing materials.',
    icon: Recycle,
  },
  {
    code: '04',
    title: 'Full Dubai Coverage',
    arabic: 'تغطية شاملة في دبي',
    body: 'From Marina towers to Mirdif villas & Business Bay offices — we navigate all community permits.',
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
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.08,
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
      <div className="mx-auto max-w-6xl px-5 md:px-6 space-y-12">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cta/30 bg-orange-100/70 px-3.5 py-1 text-xs font-bold text-cta">
              <ShieldCheck className="size-3.5" />
              <span>THE MOVERS PACKERS DIFFERENCE</span>
            </div>
            <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-ink sm:text-4xl md:text-5xl">
              Premium service. Zero chaos.
            </h2>
            <p dir="rtl" className="mt-2 text-base font-semibold text-inkMuted">
              خدمة مميزة ومنظمة بدون أي فوضى
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-inkMuted md:text-base">
              Moving your home or office should feel calm, structured, and surprisingly effortless. Our Dubai-trained crew arrives equipped with heavy-duty padding, tool sets, and clear instructions.
            </p>
          </div>

          <div className="rounded-[2.25rem] border border-outline/70 bg-white p-7 md:p-8 shadow-[0_12px_40px_rgba(26,58,58,0.04)] relative">
            <div className="flex items-center gap-1 text-cta mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
              <span className="ml-2 text-xs font-bold text-ink">4.9 / 5.0 Rating</span>
            </div>
            <p className="font-serif text-lg italic text-ink leading-relaxed">
              “Our crew arrives fully prepared with protective wrapping — and leaves your space spotless.”
            </p>
            <p className="mt-3 text-xs font-semibold text-inkMuted">
              Verified Dubai Relocation Guarantee • Licensed & Insured Crew
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="pillar-card rounded-[2rem] border border-outline/70 bg-white p-6 shadow-[0_12px_35px_rgba(26,58,58,0.04)] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-cta/40 hover:shadow-[0_20px_55px_rgba(232,122,42,0.1)]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="grid size-12 place-items-center rounded-2xl bg-orange-100/70 text-cta">
                    <p.icon className="size-6" />
                  </div>
                  <span className="font-mono text-xs font-extrabold text-inkMuted/60 bg-muted px-2.5 py-1 rounded-full">
                    {p.code}
                  </span>
                </div>

                <h3 className="mt-5 text-base font-extrabold tracking-tight text-ink">
                  {p.title}
                </h3>
                <p dir="rtl" className="mt-1 text-xs font-semibold text-inkMuted">
                  {p.arabic}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-inkMuted">
                  {p.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
