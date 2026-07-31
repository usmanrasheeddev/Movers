import { Link } from 'react-router-dom'
import {
  Building2,
  Home,
  BriefcaseBusiness,
  Trash2,
  Bike,
  Package,
  ArrowRight,
} from 'lucide-react'
import { useLayoutEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { ensureScrollTrigger, gsap } from '@/lib/gsap'

const services = [
  {
    title: 'Apartment Movers',
    desc: 'Clean, careful packing and fast moves — studios to penthouses.',
    icon: Building2,
  },
  {
    title: 'Villa Movers',
    desc: 'Room-by-room packing, furniture wrapping, and stress-free relocation.',
    icon: Home,
  },
  {
    title: 'Office Movers',
    desc: 'After-hours moves, labeled packing, and zero downtime mindset.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Junk Removal',
    desc: 'Responsible disposal and donation-first sorting where possible.',
    icon: Trash2,
  },
  {
    title: 'Bike / Car Delivery',
    desc: 'Safe pickup & dropoff with photo proof and careful handling.',
    icon: Bike,
  },
  {
    title: 'Large Item Delivery',
    desc: 'Sofas, appliances, and heavy items — lifted and secured properly.',
    icon: Package,
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
        { y: 18, opacity: 0 },
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
    <section ref={rootRef} id="services" className="bg-background">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-24">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-balance text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
              What can we help you move?
            </h2>
            <p dir="rtl" className="mt-2 text-sm text-inkMuted">
              ماذا تحتاج أن ننقل؟
            </p>
            <p className="mt-3 max-w-2xl text-sm text-inkMuted md:text-base">
              Choose a service, get a fast estimate, and let our team handle the
              lifting, wrapping, and logistics.
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-cta"
          >
            View all services <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.title}
              to="/booking"
              className={cn(
                'service-card group relative overflow-hidden rounded-3xl border border-outline/70 bg-background p-5 md:p-6 transition-all',
                'active:scale-[0.98] hover:-translate-y-1 hover:border-outline hover:shadow-[0_22px_60px_rgba(26,58,58,0.10)]'
              )}
            >
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -right-16 -top-16 size-44 rounded-full bg-cta/15 blur-2xl" />
                <div className="absolute -left-20 bottom-0 size-44 rounded-full bg-brand/10 blur-2xl" />
              </div>

              <div className="relative">
                <div className="flex items-start justify-between">
                  <div className="grid size-12 place-items-center rounded-2xl bg-muted text-brand">
                    <s.icon className="size-5" />
                  </div>
                </div>

                <h3 className="mt-5 text-lg font-bold tracking-tight text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-inkMuted">
                  {s.desc}
                </p>

                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink">
                  <span>Learn more</span>
                  <span className="relative h-px w-10 overflow-hidden rounded-full bg-outline">
                    <span className="absolute inset-0 origin-left scale-x-0 bg-cta transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
