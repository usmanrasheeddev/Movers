import { useLayoutEffect, useRef, useState } from 'react'
import { Seo } from '@/components/seo/Seo'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getSupabase } from '@/lib/supabase'
import { toast } from 'sonner'
import gsap from 'gsap'
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MessageCircle,
} from 'lucide-react'

type BookingDetails = {
  id: string
  booking_id: string
  service_type: string
  pickup_address: string
  dropoff_address: string
  schedule_at: string
  status: string
  item_details: string
}

const steps = [
  { label: 'Submitted', desc: 'Booking received' },
  { label: 'Confirmed', desc: 'Schedule & slot reserved' },
  { label: 'In Transit', desc: 'Movers are on their way' },
  { label: 'Completed', desc: 'Move complete & successful' },
]

export default function Track() {
  const [trackingId, setTrackingId] = useState('')
  const [booking, setBooking] = useState<BookingDetails | null>(null)
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const cardRef = useRef<HTMLDivElement | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!trackingId.trim()) {
      toast.error('Please enter a tracking ID')
      return
    }

    const cleanId = trackingId.trim().toUpperCase()

    setLoading(true)
    setBooking(null)
    setHasSearched(false)

    try {
      const sb = getSupabase()
      if (!sb) {
        toast.error('Tracking service is currently unavailable. Please try again later.')
        return
      }

      const { data, error } = await sb
        .from('bookings')
        .select('id, booking_id, service_type, pickup_address, dropoff_address, schedule_at, status, item_details')
        .eq('booking_id', cleanId)
        .maybeSingle()

      if (error) throw error

      if (!data) {
        toast.error('Booking not found. Double-check your Tracking ID.')
      } else {
        setBooking(data as BookingDetails)
      }
      setHasSearched(true)
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to retrieve tracking details')
    } finally {
      setLoading(false)
    }
  }

  useLayoutEffect(() => {
    if (!booking) return
    const el = cardRef.current
    if (!el) return

    gsap.fromTo(
      el,
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
    )
  }, [booking])

  // Get active step index based on booking status
  const getActiveStep = (status: string) => {
    switch (status) {
      case 'new':
        return 0
      case 'confirmed':
        return 1
      case 'in_progress':
        return 2
      case 'completed':
        return 3
      default:
        return 0
    }
  }

  const activeStep = booking ? getActiveStep(booking.status) : 0
  const isCancelled = booking?.status === 'cancelled'

  return (
    <div className="bg-background">
      <Seo
        title="Track Your Move — Movers Packers Dubai"
        description="Check your relocation status in real-time. Enter your booking or tracking ID to see live updates."
        canonicalPath="/track"
      />

      <section className="mx-auto max-w-4xl px-5 py-14 md:px-6 md:py-20">
        <div className="text-center">
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
            Track Your Relocation
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-inkMuted md:text-base">
            Check your slot reservation, status updates, and moving pipeline live.
          </p>
        </div>

        {/* Tracking Input Card */}
        <div className="mx-auto mt-10 max-w-xl">
          <Card className="rounded-[2.5rem] border-outline/70 bg-background shadow-[0_18px_50px_rgba(26,58,58,0.06)]">
            <CardContent className="pt-6">
              <form onSubmit={handleSearch} className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="grid w-full gap-2">
                  <Label htmlFor="trackingId" className="font-semibold text-ink">
                    Enter Tracking ID / Booking ID
                  </Label>
                  <Input
                    id="trackingId"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder="e.g. MPD-20260528-ABCD"
                    className="h-12 rounded-2xl uppercase tracking-wider"
                  />
                </div>
                <Button
                  type="submit"
                  variant="cta"
                  size="lg"
                  className="h-12 rounded-2xl sm:shrink-0"
                  disabled={loading}
                >
                  <Search className="mr-2 size-4" />
                  {loading ? 'Searching...' : 'Track'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Search Results Display */}
        {hasSearched && booking && (
          <div ref={cardRef} className="mt-10 space-y-6">
            <Card className="rounded-[2.5rem] border-outline/70 bg-background shadow-[0_18px_50px_rgba(26,58,58,0.06)] overflow-hidden">
              <div className="border-b border-outline/70 bg-muted/30 px-6 py-5 md:px-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-inkMuted">
                      Relocation Tracking ID
                    </span>
                    <h2 className="text-xl font-extrabold tracking-tight text-ink md:text-2xl">
                      {booking.booking_id}
                    </h2>
                  </div>
                  <div className="rounded-2xl border border-outline/70 bg-background px-4 py-2 text-xs font-bold text-ink">
                    Type: <span className="text-cta">{booking.service_type}</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-6 md:p-8">
                {/* Timeline Pipeline */}
                {isCancelled ? (
                  <div className="rounded-3xl border border-destructive/20 bg-destructive/5 p-5 text-center flex flex-col items-center gap-3">
                    <XCircle className="size-10 text-destructive" />
                    <div>
                      <h3 className="font-extrabold text-ink text-base">Booking Cancelled</h3>
                      <p className="text-sm text-inkMuted mt-1">
                        This booking inquiry has been marked as cancelled. If this is a mistake, please reach support.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-inkMuted mb-6">
                      Relocation Pipeline Progress
                    </h3>

                    {/* Progress line indicator */}
                    <div className="relative flex flex-col gap-6 md:flex-row md:justify-between md:gap-0">
                      {/* Timeline connecting bar (desktop only) */}
                      <div className="absolute top-[17px] left-8 right-8 hidden h-1 bg-outline/40 md:block z-0">
                        <div
                          className="h-full bg-success transition-all duration-500 ease-out"
                          style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
                        />
                      </div>

                      {steps.map((s, idx) => {
                        const isDone = idx <= activeStep
                        const isCurrent = idx === activeStep
                        return (
                          <div
                            key={idx}
                            className="relative z-10 flex items-start gap-4 md:flex-col md:items-center md:text-center md:gap-2"
                          >
                            {/* Step bubble marker */}
                            <span
                              className={`flex size-9 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                                isDone
                                  ? 'border-success bg-success text-background'
                                  : 'border-outline/80 bg-background text-inkMuted'
                              } ${isCurrent ? 'ring-4 ring-success/20 animate-pulseScale' : ''}`}
                            >
                              {isDone ? (
                                <CheckCircle2 className="size-5 shrink-0" />
                              ) : (
                                <Clock className="size-4 shrink-0" />
                              )}
                            </span>

                            <div>
                              <p
                                className={`text-sm font-bold tracking-tight transition-colors duration-300 ${
                                  isDone ? 'text-ink' : 'text-inkMuted'
                                }`}
                              >
                                {s.label}
                              </p>
                              <p className="text-xs text-inkMuted mt-0.5 max-w-[150px]">
                                {s.desc}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                <hr className="my-8 border-outline/70" />

                {/* Details grid layout */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="rounded-3xl border border-outline/70 bg-muted/40 p-5">
                    <h3 className="font-semibold text-ink text-sm flex items-center gap-2">
                      <MapPin className="size-4 text-brand" /> Pickup & Dropoff Address
                    </h3>
                    <div className="mt-3 text-xs leading-relaxed text-inkMuted">
                      <p className="font-semibold text-ink">From:</p>
                      <p className="mt-0.5">{booking.pickup_address}</p>
                      <p className="mt-3 font-semibold text-ink">To:</p>
                      <p className="mt-0.5">{booking.dropoff_address}</p>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-outline/70 bg-muted/40 p-5 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-ink text-sm flex items-center gap-2">
                        <Calendar className="size-4 text-brand" /> Relocation Schedule
                      </h3>
                      <p className="mt-3 text-sm font-semibold text-ink">
                        {new Date(booking.schedule_at).toLocaleDateString(undefined, {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="text-xs text-inkMuted mt-1">
                        Time Slot:{' '}
                        {new Date(booking.schedule_at).toLocaleTimeString(undefined, {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>

                    <div className="mt-4 border-t border-outline/50 pt-3 text-xs text-inkMuted leading-relaxed">
                      <span className="font-semibold text-ink">Items:</span> {booking.item_details}
                    </div>
                  </div>
                </div>

                {/* Live WhatsApp Inquiry CTA */}
                <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-[2rem] border border-brand/20 bg-brand/5 p-5 sm:flex-row text-center sm:text-left">
                  <div className="flex flex-col gap-1">
                    <h4 className="font-extrabold text-ink text-sm">Have a quick question about this status?</h4>
                    <p className="text-xs text-inkMuted">Text our dispatcher directly on WhatsApp for live support.</p>
                  </div>
                  <Button asChild variant="outline" className="rounded-2xl shrink-0 bg-background border-brand/35 hover:bg-muted">
                    <a
                      href={`https://wa.me/971557516254?text=${encodeURIComponent(
                        `Hi, I have a question about my booking status. Tracking ID: ${booking.booking_id}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-2 size-4 text-success" />
                      Chat with support
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Empty Search Feedback */}
        {hasSearched && !booking && (
          <div className="mx-auto mt-10 max-w-md rounded-3xl border border-outline/70 bg-background p-8 text-center flex flex-col items-center gap-3">
            <AlertCircle className="size-8 text-inkMuted" />
            <h3 className="font-extrabold text-ink text-base">No Booking Found</h3>
            <p className="text-xs text-inkMuted">
              We couldn't find a record matching that Tracking ID. Please double check spelling or locate your booking confirmation copy.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
