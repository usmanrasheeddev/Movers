import { Seo } from '@/components/seo/Seo'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  ShieldCheck,
  Sparkles,
  Timer,
  Truck,
  Star,
  CheckCircle2,
  MapPin,
  Phone,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import image1 from '@/assets/web-images/image1.png'
import image3 from '@/assets/web-images/img3.png'

const phone = '055 751 6254'

const highlights = [
  { value: '4.9★', label: 'Google rating', sub: 'Trusted reviews', icon: Star },
  { value: '500+', label: 'Moves completed', sub: 'Across Dubai', icon: CheckCircle2 },
  { value: 'Same-day', label: 'Fast scheduling', sub: 'When available', icon: Timer },
  { value: 'All Dubai', label: 'Coverage', sub: 'Marina to Mirdif', icon: MapPin },
] as const

const values = [
  {
    title: 'Careful handling',
    body: 'We treat your home and furniture like high-value inventory — wrapped, protected, and moved carefully.',
    icon: Sparkles,
  },
  {
    title: 'Licensed & insured',
    body: 'Clear communication, professional crew, and a process that builds trust from the first call.',
    icon: ShieldCheck,
  },
  {
    title: 'Fast scheduling',
    body: 'Same-day and next-day availability where possible — without sacrificing quality.',
    icon: Timer,
  },
  {
    title: 'Logistics-first',
    body: 'We plan the move so your day stays calm — from wrapping to placement.',
    icon: Truck,
  },
] as const

const expectations = [
  'Professional crew in clean uniform',
  'Premium wrapping and protection',
  'Clear pricing and confirmation',
  'Respectful, careful handling',
] as const

const steps = [
  {
    title: 'Plan & confirm',
    body: 'We confirm scope, access, and timing so there are no surprises.',
  },
  {
    title: 'Pack & protect',
    body: 'Furniture wrapping, careful labeling, and protective materials.',
  },
  {
    title: 'Move & place',
    body: 'We load, deliver, and place items exactly where you want them.',
  },
] as const

export default function About() {
  return (
    <div className="bg-background">
      <Seo
        title="About — Movers Packers Dubai"
        description="A premium moving experience in Dubai — clean, careful, fast, and trustworthy."
        canonicalPath="/about"
      />

      <section className="mx-auto max-w-6xl px-5 py-14 md:px-6 md:py-20">
        <div className="rounded-[2.75rem] border border-outline/70 bg-[radial-gradient(900px_500px_at_85%_0%,rgba(232,122,42,0.18),transparent_60%),linear-gradient(135deg,rgba(244,241,234,0.95),rgba(244,241,234,0.7))] p-8 md:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-inkMuted">
                About Movers Packers Dubai
              </p>
              <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
                Premium moving, without the chaos
              </h1>
              <p dir="rtl" className="mt-2 text-sm text-inkMuted">
                نقل مميز بدون فوضى
              </p>
              <p className="mt-4 max-w-xl text-sm text-inkMuted md:text-base">
                Movers Packers Dubai is built for modern schedules — fast booking,
                careful handling, clean wrapping, and a process that feels
                effortless.
              </p>
              <p className="mt-4 max-w-xl font-serif text-lg italic text-ink">
                “Luxury service, approachable team.”
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="cta" size="lg" className="rounded-2xl">
                  <Link to="/booking">Book Now →</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-2xl">
                  <a href={`tel:${phone.replace(/\s/g, '')}`}>
                    <Phone className="mr-2 size-4" /> Call {phone}
                  </a>
                </Button>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/90">
              <div className="aspect-[4/3] w-full">
                <img
                  src={image1}
                  alt="Premium packing and careful handling"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-5">
                <p className="text-sm font-semibold text-ink">
                  Clean, careful wrapping
                </p>
                <p className="mt-1 text-xs text-inkMuted">
                  Protection, placement, and a crew that treats your home with
                  care.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h) => (
            <div
              key={h.label}
              className="rounded-2xl border border-outline/70 bg-white px-4 py-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-extrabold text-ink">{h.value}</span>
                <span className="grid size-9 place-items-center rounded-2xl bg-muted text-brand">
                  <h.icon className="size-4" />
                </span>
              </div>
              <p className="mt-2 text-sm font-semibold text-ink">{h.label}</p>
              <p className="mt-1 text-xs text-inkMuted">{h.sub}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="rounded-[2.5rem] border border-outline/70 bg-white p-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-ink">
              What you can expect
            </h2>
            <p dir="rtl" className="mt-2 text-sm text-inkMuted">
              تجربة نقل مرتبة وهادئة
            </p>
            <ul className="mt-4 space-y-2 text-sm text-inkMuted">
              {expectations.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>

            <div className="mt-6 grid gap-3">
              {steps.map((step, idx) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-outline/70 bg-background px-4 py-3"
                >
                  <p className="text-xs font-semibold text-inkMuted">
                    0{idx + 1}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-ink">
                    {step.title}
                  </p>
                  <p className="mt-1 text-xs text-inkMuted">{step.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2.5rem] border border-outline/70 bg-white">
            <div className="aspect-[4/3] w-full">
              <img
                src={image3}
                alt="Professional moving crew and branded truck"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-5">
              <p className="text-sm font-semibold text-ink">
                Friendly crew, professional service
              </p>
              <p className="mt-1 text-xs text-inkMuted">
                Clear communication and a calm, organized move.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <Card
              key={v.title}
              className="rounded-3xl border-outline/70 bg-background shadow-[0_18px_50px_rgba(26,58,58,0.06)]"
            >
              <CardContent className="p-6">
                <div className="grid size-12 place-items-center rounded-2xl bg-muted text-brand">
                  <v.icon className="size-5" />
                </div>
                <h3 className="mt-5 text-base font-bold tracking-tight text-ink">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-inkMuted">
                  {v.body}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
