import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Magnetic } from '@/components/motion/Magnetic'
import { Phone, MessageCircle } from 'lucide-react'

const phone = '055 751 6254'

export function FinalCtaSection() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-5 pb-16 md:px-6 md:pb-24">
        <div className="noise-overlay overflow-hidden rounded-[2.5rem] border border-outline/70 bg-[radial-gradient(900px_500px_at_20%_10%,rgba(232,122,42,0.25),transparent_60%),radial-gradient(900px_500px_at_80%_70%,rgba(26,58,58,0.18),transparent_58%),linear-gradient(135deg,rgba(232,122,42,0.18),rgba(244,241,234,0.92))] p-8 md:p-12">
          <div className="max-w-2xl">
            <h2 className="text-balance text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
              Ready to move stress-free?
            </h2>
            <p dir="rtl" className="mt-2 text-sm text-inkMuted">
              جاهز للنقل بدون توتر؟
            </p>
            <p className="mt-3 text-sm text-inkMuted md:text-base">
              Get a fast quote, pick a time, and let our team handle the packing,
              lifting, and delivery.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Magnetic>
                <Button
                  asChild
                  variant="cta"
                  size="lg"
                  className="h-12 rounded-2xl px-6 text-base"
                >
                  <a
                    href="https://wa.me/971557516254"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle className="mr-2 size-4" /> WhatsApp Now
                  </a>
                </Button>
              </Magnetic>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 rounded-2xl px-6 text-base"
              >
                <a href={`tel:${phone.replace(/\s/g, '')}`}>
                  <Phone className="mr-2 size-4" /> Call Us
                </a>
              </Button>

              <Button
                asChild
                variant="ghost"
                size="lg"
                className="h-12 rounded-2xl px-6 text-base"
              >
                <Link to="/booking">Booking / Quote →</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
