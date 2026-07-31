import { Link } from 'react-router-dom'
import { Phone, Sparkles, MessageCircle } from 'lucide-react'

const phone = '055 751 6254'

export function Footer() {
  return (
    <footer className="border-t border-outline/70 bg-background/60">
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-ink hover:opacity-90"
            >
              <span className="grid size-9 place-items-center rounded-2xl bg-brand text-background">
                <Sparkles className="size-4" />
              </span>
              <span className="text-sm font-semibold tracking-tight">
                Movers Packers Dubai
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-inkMuted">
              Premium moving, packing, junk removal and delivery services across
              Dubai — calm, fast, and fully handled.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 text-sm">
            <div className="space-y-2">
              <p className="font-semibold text-ink">Pages</p>
              <ul className="space-y-2 text-inkMuted">
                <li>
                  <Link to="/services" className="hover:text-ink">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-ink">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-ink">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-ink">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/track" className="hover:text-ink">
                    Track Booking
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-ink">Get a quote</p>
              <ul className="space-y-2 text-inkMuted">
                <li>
                  <Link to="/booking" className="hover:text-ink">
                    Booking / Quote
                  </Link>
                </li>
                <li>
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-2 hover:text-ink"
                  >
                    <Phone className="size-4" /> {phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/971557516254`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 hover:text-ink"
                  >
                    <MessageCircle className="size-4" /> WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="rounded-3xl border border-outline/70 bg-background/70 p-5">
            <p className="text-sm font-semibold text-ink">
              Dubai’s easiest move.
            </p>
            <p dir="rtl" className="mt-1 text-sm text-inkMuted">
              أسهل تجربة نقل في دبي.
            </p>
            <p className="mt-2 text-sm text-inkMuted">
              Same-day availability, licensed & insured, and a team that treats
              your home like a showroom.
            </p>
            <p className="mt-4 text-xs text-inkMuted">
              © {new Date().getFullYear()} Movers Packers Dubai. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
