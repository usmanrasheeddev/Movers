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
} from 'lucide-react'

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

export default function Services() {
  return (
    <div className="bg-background">
      <Seo
        title="Services — Movers Packers Dubai"
        description="Apartment movers, villa movers, office movers, junk removal and delivery services across Dubai."
        canonicalPath="/services"
      />

      <section className="mx-auto max-w-6xl px-5 py-14 md:px-6 md:py-20">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              Services built for real Dubai moves
            </h1>
            <p dir="rtl" className="mt-2 text-sm text-inkMuted">
              خدمات مصممة لنقل دبي الحقيقي
            </p>
            <p className="mt-4 max-w-xl text-sm text-inkMuted md:text-base">
              Choose what you need — single item, full relocation, delivery, or
              disposal. We arrive prepared, move carefully, and keep things
              calm.
            </p>
          </div>
          <div className="flex gap-3 md:justify-end">
            <Button asChild variant="cta" size="lg" className="rounded-2xl">
              <Link to="/booking">Book Now →</Link>
            </Button>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Card
              key={s.title}
              className="rounded-3xl border-outline/70 bg-background shadow-[0_18px_50px_rgba(26,58,58,0.06)]"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="grid size-12 place-items-center rounded-2xl bg-muted text-brand">
                    <s.icon className="size-5" />
                  </div>
                  <Link
                    to="/booking"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-cta"
                  >
                    Book <ArrowRight className="size-4" />
                  </Link>
                </div>
                <CardTitle className="mt-4 text-lg font-bold tracking-tight text-ink">
                  {s.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
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
      </section>
    </div>
  )
}
