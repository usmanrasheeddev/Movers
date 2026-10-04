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
} from 'lucide-react'
import type { ComponentType } from 'react'

interface ServiceItem {
  title: string
  desc: string
  icon: ComponentType<{ className?: string }>
  badge?: string
}

const services: ServiceItem[] = [
  {
    title: 'Apartment Movers',
    desc: 'Studios to penthouses — fast & clean.',
    icon: Building2,
    badge: 'Popular',
  },
  {
    title: 'Villa Movers',
    desc: 'Room-by-room packing & full relocation.',
    icon: Home,
    badge: 'Premium',
  },
  {
    title: 'Office Movers',
    desc: 'After-hours move with zero downtime.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Junk Removal',
    desc: 'Responsible disposal & donation sorting.',
    icon: Trash2,
  },
  {
    title: 'Vehicle Delivery',
    desc: 'Safe bike & car transport with photo proof.',
    icon: Bike,
  },
  {
    title: 'Large Item Delivery',
    desc: 'Heavy furniture & appliances lifted & wrapped.',
    icon: Package,
  },
]

interface ServicesMegaMenuProps {
  onClose: () => void
}

export function ServicesMegaMenu({ onClose }: ServicesMegaMenuProps) {
  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[620px] max-w-[92vw] z-50 animate-in fade-in zoom-in-95 duration-200"
      onMouseLeave={onClose}
    >
      <div className="rounded-3xl border border-white/20 bg-background/95 p-5 shadow-[0_24px_70px_rgba(26,58,58,0.18)] backdrop-blur-2xl noise-overlay">
        <div className="flex items-center justify-between border-b border-outline/60 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="grid size-6 place-items-center rounded-lg bg-cta/15 text-cta">
              <Sparkles className="size-3.5" />
            </span>
            <span className="text-xs font-extrabold uppercase tracking-wider text-ink">
              Our Relocation Services
            </span>
          </div>
          <Link
            to="/services"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cta hover:underline"
          >
            Explore all services <ArrowRight className="size-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {services.map((s) => (
            <Link
              key={s.title}
              to="/booking"
              onClick={onClose}
              className="group flex items-start gap-3 rounded-2xl p-3 transition-all duration-200 hover:bg-muted/80 hover:shadow-sm"
            >
              <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-muted text-brand transition-colors duration-200 group-hover:bg-cta group-hover:text-white">
                <s.icon className="size-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold tracking-tight text-ink group-hover:text-cta transition-colors">
                    {s.title}
                  </span>
                  {s.badge && (
                    <span className="rounded-full bg-cta/10 px-2 py-0.5 text-[10px] font-bold text-cta">
                      {s.badge}
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs leading-relaxed text-inkMuted">
                  {s.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between rounded-2xl bg-brand/5 p-3 text-xs">
          <span className="font-semibold text-inkMuted">
            Need a custom quote or immediate help?
          </span>
          <Link
            to="/booking"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 rounded-xl bg-brand px-3 py-1.5 font-bold text-white transition-transform hover:scale-105"
          >
            Get Free Estimate <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
