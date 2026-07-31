import { Seo } from '@/components/seo/Seo'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

const phone = '055 751 6254'

export default function Contact() {
  const [sending, setSending] = useState(false)

  return (
    <div className="bg-background">
      <Seo
        title="Contact — Movers Packers Dubai"
        description="Contact Movers Packers Dubai for premium moving, packing, delivery and junk removal in Dubai."
        canonicalPath="/contact"
      />

      <section className="mx-auto max-w-6xl px-5 py-14 md:px-6 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              Contact
            </h1>
            <p dir="rtl" className="mt-2 text-sm text-inkMuted">
              تواصل معنا
            </p>
            <p className="mt-4 max-w-xl text-sm text-inkMuted md:text-base">
              Prefer WhatsApp or a quick call? We’ll confirm availability and
              estimate fast.
            </p>

            <div className="mt-8 grid gap-3">
              <a
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-3 rounded-2xl border border-outline/70 bg-background px-4 py-3 text-sm font-semibold text-ink hover:bg-muted"
              >
                <span className="grid size-10 place-items-center rounded-2xl bg-muted text-brand">
                  <Phone className="size-4" />
                </span>
                {phone}
              </a>

              <a
                href="https://wa.me/971557516254"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-2xl border border-outline/70 bg-background px-4 py-3 text-sm font-semibold text-ink hover:bg-muted"
              >
                <span className="grid size-10 place-items-center rounded-2xl bg-muted text-brand">
                  <MessageCircle className="size-4" />
                </span>
                WhatsApp
              </a>

              <div className="inline-flex items-center gap-3 rounded-2xl border border-outline/70 bg-background px-4 py-3 text-sm font-semibold text-ink">
                <span className="grid size-10 place-items-center rounded-2xl bg-muted text-brand">
                  <MapPin className="size-4" />
                </span>
                Anywhere in Dubai
              </div>

              <div className="inline-flex items-center gap-3 rounded-2xl border border-outline/70 bg-background px-4 py-3 text-sm font-semibold text-ink">
                <span className="grid size-10 place-items-center rounded-2xl bg-muted text-brand">
                  <Mail className="size-4" />
                </span>
                support@moverspackersdubai.example
              </div>
            </div>

            <p className="mt-6 font-serif text-lg italic text-ink">
              “A premium move starts with a calm conversation.”
            </p>
          </div>

          <Card className="rounded-[2.5rem] border-outline/70 bg-background shadow-[0_18px_50px_rgba(26,58,58,0.06)]">
            <CardContent className="p-6 md:p-8">
              <p className="text-lg font-bold tracking-tight text-ink">
                Send a message
              </p>
              <p className="mt-2 text-sm text-inkMuted">
                For fastest response, use WhatsApp. We will reply as soon as we
                can.
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-outline/70 bg-background px-4 py-2 text-xs font-semibold text-ink hover:bg-muted"
                >
                  <Phone className="size-4" />
                  Call {phone}
                </a>
                <a
                  href="https://wa.me/971557516254"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-outline/70 bg-background px-4 py-2 text-xs font-semibold text-ink hover:bg-muted"
                >
                  <MessageCircle className="size-4" />
                  WhatsApp
                </a>
              </div>

              <form
                className="mt-6 grid gap-4"
                onSubmit={async (e) => {
                  e.preventDefault()
                  const form = e.currentTarget
                  const data = new FormData(form)
                  const name = String(data.get('name') ?? '').trim()
                  const phoneValue = String(data.get('phone') ?? '').trim()
                  const message = String(data.get('message') ?? '').trim()
                  if (!name || !message) {
                    toast.error('Please fill in your name and message.')
                    return
                  }

                  setSending(true)
                  try {
                    const res = await fetch('/api/send-contact', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        name,
                        phone: phoneValue,
                        message,
                      }),
                    })

                    const payload = await res.json().catch(() => null)
                    if (!res.ok || !payload?.ok) {
                      throw new Error(payload?.error?.message ?? 'Failed to send message')
                    }

                    toast.success('Thanks! Your message has been sent.')
                    form.reset()
                  } catch (err: any) {
                    toast.error(err?.message ?? 'Something went wrong. Please try again.')
                  } finally {
                    setSending(false)
                  }
                }}
              >
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" placeholder="Your name" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input id="phone" name="phone" placeholder="050 000 0000" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us what you need moved, pickup/dropoff, and preferred date/time."
                    rows={5}
                  />
                </div>

                <Button
                  type="submit"
                  variant="cta"
                  size="lg"
                  className="mt-2 rounded-2xl"
                  disabled={sending}
                >
                  {sending ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
