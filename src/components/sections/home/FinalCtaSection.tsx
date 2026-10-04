import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Magnetic } from '@/components/motion/Magnetic'
import { Phone, MessageCircle, ArrowRight, ShieldCheck, Clock } from 'lucide-react'

const phone = '055 751 6254'

export function FinalCtaSection() {
  return (
    <section className="relative bg-[#FAF7F2] py-20 md:py-28 overflow-hidden border-t border-outline/50">
      <div className="mx-auto max-w-6xl px-5 md:px-6">
        <div className="relative overflow-hidden rounded-[2.75rem] border border-outline/70 bg-[radial-gradient(1000px_500px_at_15%_10%,rgba(232,122,42,0.22),transparent_60%),radial-gradient(900px_500px_at_85%_90%,rgba(26,58,58,0.14),transparent_55%),linear-gradient(135deg,#FAF7F2,#F4F1EA)] p-8 md:p-14 shadow-lg">
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            <div className="max-w-xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-cta/30 bg-orange-100/80 px-3.5 py-1 text-xs font-bold text-cta">
                <Clock className="size-3.5" />
                <span>ONLINE NOW — DISPATCH READY</span>
              </div>

              <h2 className="text-balance text-3xl font-extrabold tracking-tight text-ink sm:text-4xl md:text-5xl">
                Ready to move stress-free in Dubai?
              </h2>
              
              <p dir="rtl" className="text-base font-semibold text-inkMuted">
                احصل على عرض سعر سريع وانتقل بكل راحة وأمان اليوم
              </p>

              <p className="text-sm leading-relaxed text-inkMuted md:text-base">
                Get an instant estimate, reserve your date/time slot, and let our uniformed crew handle all packing, lifting, and safe delivery.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-bold text-ink">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-cta" /> No Advance Deposit
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-cta" /> Cash On Delivery
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-cta" /> 100% Insured
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col shrink-0 min-w-[240px]">
              <Magnetic>
                <Button
                  asChild
                  variant="cta"
                  size="lg"
                  className="h-13 rounded-2xl px-6 text-base font-bold shadow-md w-full"
                >
                  <a
                    href="https://wa.me/971557516254"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle className="mr-2 size-5" /> Instant WhatsApp Quote
                  </a>
                </Button>
              </Magnetic>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-13 rounded-2xl px-6 text-base font-bold border-outline/80 bg-white hover:bg-muted w-full"
              >
                <a href={`tel:${phone.replace(/\s/g, '')}`}>
                  <Phone className="mr-2 size-5 text-brand" /> Direct Call {phone}
                </a>
              </Button>

              <Button
                asChild
                variant="ghost"
                size="lg"
                className="h-12 rounded-2xl px-6 text-sm font-bold text-ink hover:text-cta w-full"
              >
                <Link to="/booking">
                  Online Booking Form <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
