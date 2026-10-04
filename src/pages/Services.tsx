import { Seo } from '@/components/seo/Seo'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Building2,
  Home,
  BriefcaseBusiness,
  Trash2,
  Bike,
  Package,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Star,
  Clock,
} from 'lucide-react'
import servicesBg from '@/assets/web-images/servicesBackground.png'
import servicesCardBg from '@/assets/web-images/servicescardbackground.png'

const services = [
  {
    title: 'Apartment Movers',
    icon: Building2,
    points: ['Packing & wrapping', 'Furniture disassembly', 'Fast relocation'],
  },
  {
    title: 'Villa Movers',
    icon: Home,
    points: ['Room-by-room labeling', 'Premium materials', 'Careful placement'],
  },
  {
    title: 'Office Movers',
    icon: BriefcaseBusiness,
    points: ['After-hours options', 'Organized packing', 'Minimal downtime'],
  },
  {
    title: 'Junk Removal',
    icon: Trash2,
    points: ['Responsible disposal', 'Donation-first sorting', 'Quick pickups'],
  },
  {
    title: 'Bike / Car Delivery',
    icon: Bike,
    points: ['Secure transport', 'Photo proof', 'Careful handling'],
  },
  {
    title: 'Large Item Delivery',
    icon: Package,
    points: ['Heavy lifting', 'Protective wrapping', 'Safe loading'],
  },
] as const

/**
 * Top-right SVG component rendering a subtle, thin orange architectural skyline pattern
 * inspired by Dubai's iconic skyscraper silhouettes (Burj Khalifa, Museum of the Future, Dubai Frame).
 */
function DubaiSkylineCornerPattern() {
  return (
    <div className="pointer-events-none absolute right-3 top-3 z-0 overflow-hidden rounded-tr-2xl opacity-0 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-x-0">
      <svg
        viewBox="0 0 160 55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-14 w-36 text-cta/40 transition-transform duration-500 group-hover:scale-105"
      >
        {/* Subtle orange architectural skyline line art stroke */}
        <path
          d="M 5 50 L 155 50 M 12 50 V 38 H 20 V 50 M 24 50 V 32 H 32 V 50 M 38 50 V 22 H 42 V 10 H 45 V 3 H 47 V 10 H 50 V 22 H 54 V 50 M 60 50 V 30 H 64 Q 72 18 80 30 H 84 V 50 M 90 50 V 34 H 94 V 26 H 98 V 34 H 102 V 50 M 108 50 V 16 H 112 V 9 H 114 V 16 H 118 V 50 M 124 50 V 32 H 130 V 50 M 136 50 V 40 H 144 V 50"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Top spire accent glowing dot */}
        <circle cx="46" cy="4" r="2" fill="currentColor" className="animate-pulse" />
        <circle cx="113" cy="10" r="1.5" fill="currentColor" />
      </svg>
    </div>
  )
}

export default function Services() {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Services — Movers Packers Dubai"
        description="Apartment movers, villa movers, office movers, junk removal and delivery services across Dubai."
        canonicalPath="/services"
      />

      {/* Hero Header Section with Background Image servicesBackground.png */}
      <section className="-mt-24 relative overflow-hidden border-b border-outline/60 bg-[#FAF7F2] pt-28 pb-16 md:pt-32 md:pb-24">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <img
            src={servicesBg}
            alt="Dubai relocation background"
            className="h-full w-full object-cover object-right"
          />
          {/* Subtle gradient overlay to keep left-hand text crisp */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/90 to-transparent md:w-[68%]" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-6">
          <div className="flex max-w-2xl flex-col items-start gap-4">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-cta/30 bg-orange-100/70 px-3.5 py-1 text-xs font-bold text-cta">
              <Sparkles className="size-3.5" />
              <span>PREMIUM DUBAI RELOCATION SERVICES</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-ink sm:text-5xl md:text-6xl">
              Services built for real{' '}
              <span className="block font-serif italic text-cta font-normal mt-1 sm:inline">
                Dubai moves
              </span>
            </h1>

            {/* Arabic Subtitle */}
            <p dir="rtl" className="text-sm font-semibold text-inkMuted">
              خدمات نقل احترافية ومصممة خصيصاً لدبي
            </p>

            {/* Description Paragraph */}
            <p className="text-sm text-inkMuted md:text-base leading-relaxed">
              From single furniture items to multi-bedroom luxury villas and corporate offices — we arrive equipped, move carefully, and deliver zero stress.
            </p>

            {/* Trust Badges */}
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs font-bold text-ink">
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-outline/70 bg-card/90 backdrop-blur-sm px-3 py-1.5 shadow-sm">
                <Star className="size-3.5 fill-amber-400 text-amber-400" /> 4.9★ Rated
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-outline/70 bg-card/90 backdrop-blur-sm px-3 py-1.5 shadow-sm">
                <ShieldCheck className="size-3.5 text-emerald-600" /> Licensed & Insured
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-outline/70 bg-card/90 backdrop-blur-sm px-3 py-1.5 shadow-sm">
                <Clock className="size-3.5 text-cta" /> Same-Day Availability
              </span>
            </div>

            {/* Bottom Action Row: Book Your Move Button + Customer Profiles */}
            <div className="mt-4 flex flex-wrap items-center gap-4 pt-2">
              <Button
                asChild
                variant="cta"
                size="lg"
                className="rounded-2xl font-bold shadow-lg shadow-cta/25 px-6 py-3"
              >
                <Link to="/booking">Book Your Move →</Link>
              </Button>

              <div className="hidden sm:block h-9 w-px bg-outline/70" />

              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5 overflow-hidden">
                  <img
                    className="inline-block size-9 rounded-full ring-2 ring-white object-cover shadow-sm"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="Customer 1"
                  />
                  <img
                    className="inline-block size-9 rounded-full ring-2 ring-white object-cover shadow-sm"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                    alt="Customer 2"
                  />
                  <img
                    className="inline-block size-9 rounded-full ring-2 ring-white object-cover shadow-sm"
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
                    alt="Customer 3"
                  />
                </div>
                <div className="flex flex-col text-xs leading-tight">
                  <span className="font-extrabold text-ink">Trusted by 10,000+</span>
                  <span className="text-[11px] font-medium text-inkMuted">Happy Customers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section with Background Image servicescardbackground.png */}
      <section className="relative overflow-hidden border-b border-outline/60 bg-background py-16 md:py-20">
        {/* Section Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={servicesCardBg}
            alt="Services cards background"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Card
                key={s.title}
                className="group relative overflow-hidden rounded-3xl border-outline/70 bg-background shadow-[0_18px_50px_rgba(26,58,58,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-cta/50 hover:shadow-[0_24px_60px_rgba(232,122,42,0.12)]"
              >
                {/* Top-right Dubai Architectural Skyline Pattern (Reveals on Cursor Hover) */}
                <DubaiSkylineCornerPattern />

                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="grid size-12 place-items-center rounded-2xl bg-muted text-brand transition-colors duration-300 group-hover:bg-cta group-hover:text-white">
                      <s.icon className="size-5" />
                    </div>
                    <Link
                      to="/booking"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-cta"
                    >
                      Book <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                  <CardTitle className="mt-4 text-lg font-bold tracking-tight text-ink transition-colors duration-200 group-hover:text-cta">
                    {s.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <ul className="space-y-2 text-sm text-inkMuted">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-cta" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 rounded-[2.5rem] border border-outline/70 bg-muted p-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-ink">
              Not sure which service fits?
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-inkMuted md:text-base">
              Start the booking form and describe what you need — we’ll recommend
              the right option and confirm the estimate.
            </p>
            <div className="mt-6">
              <Button asChild variant="cta" size="lg" className="rounded-2xl">
                <Link to="/booking">Get Free Estimate →</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
