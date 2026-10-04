import { Link } from 'react-router-dom'
import {
  Building2,
  Home,
  BriefcaseBusiness,
  Trash2,
  Bike,
  Package,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react'
import { useLayoutEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { ensureScrollTrigger, gsap } from '@/lib/gsap'

const services = [
  {
    title: 'Apartment Movers',
    arabic: 'نقل شقق دبي',
    badge: 'POPULAR SLOT',
    price: 'From 299 AED',
    desc: 'Clean, careful packing, disassembly, and fast moves — from studios to luxury penthouses.',
    icon: Building2,
    highlights: ['Furniture disassembly', 'Stretch wrapping', 'Elevator access management'],
  },
  {
    title: 'Villa Movers',
    arabic: 'نقل فلل دبي',
    badge: 'WHITE-GLOVE',
    price: 'Custom Quote',
    desc: 'Room-by-room packing, fragile item wrapping, and stress-free full villa relocation.',
    icon: Home,
    highlights: ['Multi-room labeling', 'Heavy furniture care', 'Garden & patio transport'],
  },
  {
    title: 'Office Movers',
    arabic: 'نقل مكاتب وشركات',
    badge: 'ZERO DOWNTIME',
    price: 'Corporate Rate',
    desc: 'After-hours & weekend moves, labeled IT packing, and zero operational downtime.',
    icon: BriefcaseBusiness,
    highlights: ['IT & desk labeling', 'After-hours slots', 'Fast setup at new office'],
  },
  {
    title: 'Junk Removal',
    arabic: 'إزالة المخلفات والأثاث',
    badge: 'ECO SORTING',
    price: 'Fast Pickup',
    desc: 'Responsible furniture disposal and donation-first sorting across all Dubai areas.',
    icon: Trash2,
    highlights: ['Donation sorting', 'Same-day pickup', 'Responsible recycling'],
  },
  {
    title: 'Bike / Car Delivery',
    arabic: 'نقل سيارات ودراجات',
    badge: 'SECURED FLEET',
    price: 'Safe Transport',
    desc: 'Safe vehicle pickup & dropoff with photo proof and dedicated enclosed transport.',
    icon: Bike,
    highlights: ['Photo inspection', 'Door-to-door delivery', 'Secured strapping'],
  },
  {
    title: 'Large Item Delivery',
    arabic: 'نقل قطع كبيرة',
    badge: 'SAME-DAY DISPATCH',
    price: 'Single Item Rate',
    desc: 'Sofas, refrigerators, heavy appliances, and single items lifted and placed safely.',
    icon: Package,
    highlights: ['Two-person crew', 'Protective blankets', 'Placement in room'],
  },
] as const

export function ServicesSection() {
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
        '.service-card',
        { y: 22, opacity: 0 },
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
    <section ref={rootRef} id="services" className="relative bg-[#FAF7F2] py-20 md:py-28 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-40 right-0 size-[600px] rounded-full bg-cta/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 size-[500px] rounded-full bg-brand/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 md:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cta/30 bg-orange-100/70 px-3.5 py-1 text-xs font-bold text-cta">
              <Sparkles className="size-3.5" />
              <span>DUBAI RELOCATION SERVICES</span>
            </div>
            <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-ink sm:text-4xl md:text-5xl">
              What can we move for you today?
            </h2>
            <p dir="rtl" className="mt-2 text-base font-semibold text-inkMuted">
              خدمات نقل احترافية متكاملة لجميع احتياجاتك في دبي
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-2xl border border-outline/70 bg-white px-5 py-2.5 text-sm font-bold text-ink shadow-sm transition-all hover:bg-muted hover:border-outline"
          >
            <span>Explore All Services</span>
            <ArrowRight className="size-4 text-cta" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.title}
              to="/booking"
              className={cn(
                'service-card group relative overflow-hidden rounded-[2.25rem] border border-outline/70 bg-white p-6 md:p-7 shadow-[0_12px_40px_rgba(26,58,58,0.04)] transition-all duration-300',
                'active:scale-[0.98] hover:-translate-y-1.5 hover:border-cta/40 hover:shadow-[0_24px_70px_rgba(232,122,42,0.12)]'
              )}
            >
              {/* Subtle card glow on hover */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none">
                <div className="absolute -right-16 -top-16 size-44 rounded-full bg-cta/10 blur-2xl" />
              </div>

              <div className="relative flex flex-col justify-between h-full space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="grid size-12 place-items-center rounded-2xl bg-orange-100/70 text-cta transition-transform duration-300 group-hover:scale-105">
                      <s.icon className="size-6" />
                    </div>
                    <span className="rounded-full bg-muted/80 px-3 py-1 font-mono text-[10px] font-extrabold tracking-wider text-inkMuted">
                      {s.badge}
                    </span>
                  </div>

                  <div className="mt-5">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-xl font-extrabold tracking-tight text-ink group-hover:text-cta transition-colors">
                        {s.title}
                      </h3>
                    </div>
                    <p dir="rtl" className="mt-0.5 text-xs font-semibold text-inkMuted">
                      {s.arabic}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-inkMuted">
                      {s.desc}
                    </p>
                  </div>
                </div>

                {/* Highlights list */}
                <div className="space-y-3 pt-4 border-t border-outline/40">
                  <div className="space-y-2">
                    {s.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2 text-xs font-medium text-ink">
                        <CheckCircle2 className="size-3.5 text-cta shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs font-bold text-ink">
                    <span className="text-cta font-mono">{s.price}</span>
                    <span className="inline-flex items-center gap-1 text-ink group-hover:text-cta transition-colors">
                      Book Slot <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
