import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Seo } from '@/components/seo/Seo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { AddressMapSelectInput } from '@/components/forms/AddressMapSelectInput'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import gsap from 'gsap'
import confetti from 'canvas-confetti'
import { generateBookingId } from '@/lib/booking'
import { CheckCircle2, Copy, UploadCloud, X } from 'lucide-react'
import { requireSupabase } from '@/lib/supabase'

const serviceTypes = [
  'Apartment Movers',
  'Villa Movers',
  'Office Movers',
  'Junk Removal',
  'Bike / Car Delivery',
  'Large Item Delivery',
] as const

const schema = z.object({
  customerName: z.string().min(2, 'Enter your name.'),
  customerEmail: z.string().email('Enter a valid email.'),
  customerPhone: z.string().min(7, 'Enter a phone number.'),
  serviceType: z.enum(serviceTypes, { message: 'Select a service type.' }),
  pickupAddress: z.string().min(4, 'Enter a pickup address.'),
  dropoffAddress: z.string().min(4, 'Enter a dropoff address.'),
  scheduleDate: z.string().min(1, 'Pick a date.'),
  scheduleTime: z.string().min(1, 'Pick a time.'),
  itemDetails: z.string().min(10, 'Add a few details (items, floor, notes).'),
})

type FormValues = z.infer<typeof schema>

type Step = {
  title: string
  description: string
  fields: Array<keyof FormValues>
}

const steps: Step[] = [
  {
    title: 'Your details',
    description: 'Confirm your contact details for the booking.',
    fields: ['customerName', 'customerEmail', 'customerPhone'],
  },
  {
    title: 'Service type',
    description: 'What can we help you move?',
    fields: ['serviceType'],
  },
  {
    title: 'Pickup & dropoff',
    description: 'Where are we picking up and delivering?',
    fields: ['pickupAddress', 'dropoffAddress'],
  },
  {
    title: 'Schedule',
    description: 'Pick a date and time that works for you.',
    fields: ['scheduleDate', 'scheduleTime'],
  },
  {
    title: 'Item details & photos',
    description: 'Anything we should know? Upload photos of your items for an accurate quote.',
    fields: ['itemDetails'],
  },
]

export default function Booking() {
  const [stepIndex, setStepIndex] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [bookingId, setBookingId] = useState<string | null>(null)
  const [photos, setPhotos] = useState<File[]>([])

  const stepRef = useRef<HTMLDivElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const progressValue = useMemo(() => {
    const total = steps.length
    return Math.round(((stepIndex + 1) / total) * 100)
  }, [stepIndex])

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      serviceType: undefined,
      pickupAddress: '',
      dropoffAddress: '',
      scheduleDate: '',
      scheduleTime: '',
      itemDetails: '',
    },
    mode: 'onTouched',
  })



  useLayoutEffect(() => {
    const el = stepRef.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)'
    )?.matches
    if (prefersReducedMotion) return

    gsap.fromTo(
      el,
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' }
    )
  }, [stepIndex])

  const next = async () => {
    const fields = steps[stepIndex]?.fields ?? []
    const ok = await form.trigger(fields)
    if (!ok) return
    setStepIndex((s) => Math.min(steps.length - 1, s + 1))
  }

  const back = () => setStepIndex((s) => Math.max(0, s - 1))

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitting(true)

    try {
      const nextBookingId = generateBookingId()
      const sb = requireSupabase()
      let photoPaths: string[] = []

      if (photos.length) {
        const bucket = 'booking-photos'
        const folder = `${nextBookingId}`

        for (const file of photos) {
          const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
          const path = `${folder}/${Date.now()}-${safeName}`
          const { error } = await sb.storage.from(bucket).upload(path, file, {
            upsert: false,
            contentType: file.type || undefined,
          })
          if (error) throw error
          photoPaths.push(path)
        }
      }

      const scheduleAtIso = new Date(`${values.scheduleDate}T${values.scheduleTime}`).toISOString()

      const { error } = await sb.from('bookings').insert({
        booking_id: nextBookingId,
        service_type: values.serviceType,
        pickup_address: values.pickupAddress,
        dropoff_address: values.dropoffAddress,
        schedule_at: scheduleAtIso,
        item_details: values.itemDetails,
        contact_name: values.customerName,
        contact_phone: values.customerPhone,
        contact_email: values.customerEmail,
        payment_method: 'cash_on_delivery',
        photo_paths: photoPaths,
        status: 'new',
        source: 'web',
      })
      if (error) throw error

      // Trigger Resend email API
      const res = await fetch('/api/send-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: nextBookingId,
          serviceType: values.serviceType,
          pickupAddress: values.pickupAddress,
          dropoffAddress: values.dropoffAddress,
          scheduleDate: values.scheduleDate,
          scheduleTime: values.scheduleTime,
          itemDetails: values.itemDetails,
          customerName: values.customerName,
          customerEmail: values.customerEmail,
          customerPhone: values.customerPhone,
        }),
      })

      const payload = await res.json().catch(() => null)
      if (!res.ok || !payload?.ok) {
        throw new Error(payload?.error?.message ?? 'Failed to send booking email')
      }

      setBookingId(nextBookingId)
      toast.success('Booking submitted! We sent your request to our team.')

      confetti({
        particleCount: 80,
        spread: 55,
        origin: { y: 0.65 },
        colors: ['#E87A2A', '#1A3A3A', '#F4F1EA'],
      })
    } catch (e: any) {
      const msg = e?.message ?? 'Something went wrong. Please try again.'
      toast.error(msg)
    } finally {
      setSubmitting(false)
    }
  })

  const step = steps[stepIndex]

  return (
    <div className="bg-background">
      <Seo
        title="Booking / Quote — Movers Packers Dubai"
        description="Get a free estimate and book premium moving services in Dubai with a smooth multi-step form."
        canonicalPath="/booking"
      />

      <section className="mx-auto max-w-4xl px-5 py-14 md:px-6 md:py-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              Booking / Quote
            </h1>
            <p dir="rtl" className="mt-2 text-sm text-inkMuted">
              الحجز / عرض السعر
            </p>
            <p className="mt-3 max-w-2xl text-sm text-inkMuted md:text-base">
              Premium experience, simple steps. Fill this in — we’ll confirm fast.
            </p>
          </div>

          <div className="rounded-2xl border border-outline/70 bg-background px-4 py-3 text-xs font-semibold text-inkMuted">
            Progress: {progressValue}%
          </div>
        </div>

        <div className="mt-6">
          <Progress value={progressValue} className="h-2" />
        </div>

        {bookingId ? (
          <Card className="mt-8 rounded-[2.5rem] border-outline/70 bg-background shadow-[0_18px_50px_rgba(26,58,58,0.06)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-ink">
                <CheckCircle2 className="size-6 text-success" /> Booking confirmed
              </CardTitle>
              <p className="mt-2 text-sm text-inkMuted">
                Your booking ID is <span className="font-semibold text-ink">{bookingId}</span>.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  variant="cta"
                  size="lg"
                  className="rounded-2xl"
                  onClick={() => {
                    const msg = `Booking ID: ${bookingId}`
                    navigator.clipboard.writeText(msg).then(() => {
                      toast.success('Booking ID copied')
                    })
                  }}
                >
                  <Copy className="mr-2 size-4" /> Copy Booking ID
                </Button>
              </div>

              <Button
                variant="ghost"
                size="lg"
                className="rounded-2xl"
                onClick={() => {
                  setBookingId(null)
                  form.reset()
                  setStepIndex(0)
                  setPhotos([])
                }}
              >
                Create another booking
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="mt-8 rounded-[2.5rem] border-outline/70 bg-background shadow-[0_18px_50px_rgba(26,58,58,0.06)]">
            <CardHeader>
              <CardTitle className="text-xl font-extrabold tracking-tight text-ink">
                Step {stepIndex + 1} of {steps.length}: {step.title}
              </CardTitle>
              <p className="mt-2 text-sm text-inkMuted">{step.description}</p>
            </CardHeader>

            <CardContent>
              <div className="mb-6 rounded-2xl border border-outline/70 bg-muted/40 p-4 text-sm text-inkMuted flex justify-between items-center">
                <div>
                  <p className="font-semibold text-ink">Payment Method</p>
                  <p className="text-xs text-inkMuted mt-1">Cash on delivery (COD) / Pay after service completion</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-cta/10 px-2.5 py-0.5 text-xs font-semibold text-cta">
                  No advance payment
                </span>
              </div>

              <form onSubmit={onSubmit} className="grid gap-6">
                <div ref={stepRef} className="grid gap-4">
                  {stepIndex === 0 ? (
                    <>
                      <div className="grid gap-2">
                        <Label htmlFor="customerName">Name</Label>
                        <Input
                          id="customerName"
                          className="h-12 rounded-2xl"
                          value={form.watch('customerName')}
                          onChange={(e) =>
                            form.setValue('customerName', e.target.value, {
                              shouldValidate: true,
                            })
                          }
                          placeholder="Your name"
                        />
                        {form.formState.errors.customerName ? (
                          <p className="text-sm text-destructive">
                            {form.formState.errors.customerName.message}
                          </p>
                        ) : null}
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="customerEmail">Email</Label>
                        <Input
                          id="customerEmail"
                          type="email"
                          className="h-12 rounded-2xl"
                          value={form.watch('customerEmail')}
                          onChange={(e) =>
                            form.setValue('customerEmail', e.target.value, {
                              shouldValidate: true,
                            })
                          }
                          placeholder="you@example.com"
                        />
                        {form.formState.errors.customerEmail ? (
                          <p className="text-sm text-destructive">
                            {form.formState.errors.customerEmail.message}
                          </p>
                        ) : null}
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="customerPhone">Phone</Label>
                        <Input
                          id="customerPhone"
                          className="h-12 rounded-2xl"
                          value={form.watch('customerPhone')}
                          onChange={(e) =>
                            form.setValue('customerPhone', e.target.value, {
                              shouldValidate: true,
                            })
                          }
                          placeholder="050 000 0000"
                        />
                        {form.formState.errors.customerPhone ? (
                          <p className="text-sm text-destructive">
                            {form.formState.errors.customerPhone.message}
                          </p>
                        ) : null}
                      </div>
                    </>
                  ) : null}

                  {stepIndex === 1 ? (
                    <div className="grid gap-2">
                      <Label>Service Type</Label>
                      <Select
                        value={form.watch('serviceType')}
                        onValueChange={(v) => form.setValue('serviceType', v as any, { shouldValidate: true })}
                      >
                        <SelectTrigger className="h-12 rounded-2xl">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceTypes.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {form.formState.errors.serviceType ? (
                        <p className="text-sm text-destructive">
                          {form.formState.errors.serviceType.message}
                        </p>
                      ) : null}
                    </div>
                  ) : null}

                  {stepIndex === 2 ? (
                    <>
                      <div className="grid gap-2">
                        <Label>Pickup</Label>
                        <AddressMapSelectInput
                          value={form.watch('pickupAddress')}
                          onChange={(v) =>
                            form.setValue('pickupAddress', v, { shouldValidate: true })
                          }
                          placeholder="Pickup address"
                        />
                        {form.formState.errors.pickupAddress ? (
                          <p className="text-sm text-destructive">
                            {form.formState.errors.pickupAddress.message}
                          </p>
                        ) : null}
                      </div>

                      <div className="grid gap-2">
                        <Label>Dropoff</Label>
                        <AddressMapSelectInput
                          value={form.watch('dropoffAddress')}
                          onChange={(v) =>
                            form.setValue('dropoffAddress', v, { shouldValidate: true })
                          }
                          placeholder="Dropoff address"
                        />
                        {form.formState.errors.dropoffAddress ? (
                          <p className="text-sm text-destructive">
                            {form.formState.errors.dropoffAddress.message}
                          </p>
                        ) : null}
                      </div>
                    </>
                  ) : null}

                  {stepIndex === 3 ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="scheduleDate">Date</Label>
                        <Input
                          id="scheduleDate"
                          type="date"
                          className="h-12 rounded-2xl"
                          value={form.watch('scheduleDate')}
                          onChange={(e) =>
                            form.setValue('scheduleDate', e.target.value, {
                              shouldValidate: true,
                            })
                          }
                        />
                        {form.formState.errors.scheduleDate ? (
                          <p className="text-sm text-destructive">
                            {form.formState.errors.scheduleDate.message}
                          </p>
                        ) : null}
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="scheduleTime">Time</Label>
                        <Input
                          id="scheduleTime"
                          type="time"
                          className="h-12 rounded-2xl"
                          value={form.watch('scheduleTime')}
                          onChange={(e) =>
                            form.setValue('scheduleTime', e.target.value, {
                              shouldValidate: true,
                            })
                          }
                        />
                        {form.formState.errors.scheduleTime ? (
                          <p className="text-sm text-destructive">
                            {form.formState.errors.scheduleTime.message}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  ) : null}

                  {stepIndex === 4 ? (
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="itemDetails">Item Details</Label>
                        <Textarea
                          id="itemDetails"
                          rows={5}
                          className="rounded-2xl"
                          placeholder="Example: 1BR apartment, 3rd floor with elevator, sofa + fragile TV, need packing."
                          value={form.watch('itemDetails')}
                          onChange={(e) =>
                            form.setValue('itemDetails', e.target.value, {
                              shouldValidate: true,
                            })
                          }
                        />
                        {form.formState.errors.itemDetails ? (
                          <p className="text-sm text-destructive">
                            {form.formState.errors.itemDetails.message}
                          </p>
                        ) : null}
                      </div>

                      {/* Premium Photo Upload Section */}
                      <div className="grid gap-2 mt-2">
                        <Label>Photos of items (optional)</Label>
                        <div
                          className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-outline/70 bg-muted/20 p-6 text-center cursor-pointer hover:border-cta/50 hover:bg-muted/30 transition-all"
                          onClick={() => fileInputRef.current?.click()}
                          onDragOver={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                          }}
                          onDrop={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            const files = e.dataTransfer.files
                            if (files && files.length) {
                              const validFiles = Array.from(files).filter(f => f.type.startsWith('image/'))
                              setPhotos(prev => [...prev, ...validFiles])
                            }
                          }}
                        >
                          <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const files = e.target.files
                              if (files && files.length) {
                                setPhotos(prev => [...prev, ...Array.from(files)])
                              }
                            }}
                          />
                          <UploadCloud className="size-8 text-inkMuted mb-2" />
                          <p className="text-sm font-semibold text-ink">Click or drag images to upload</p>
                          <p className="text-xs text-inkMuted mt-1">Supports PNG, JPG, JPEG (Max 10MB each)</p>
                        </div>

                        {photos.length > 0 ? (
                          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {photos.map((file, idx) => {
                              const url = URL.createObjectURL(file)
                              return (
                                <div key={idx} className="group relative rounded-xl border border-outline/70 overflow-hidden aspect-square bg-muted">
                                  <img
                                    src={url}
                                    alt={file.name}
                                    className="w-full h-full object-cover"
                                    onLoad={() => URL.revokeObjectURL(url)}
                                  />
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setPhotos(prev => prev.filter((_, i) => i !== idx))
                                    }}
                                    className="absolute top-1.5 right-1.5 p-1 rounded-full bg-background/80 hover:bg-background text-ink shadow-sm transition-all opacity-90 group-hover:opacity-100"
                                  >
                                    <X className="size-3.5" />
                                  </button>
                                </div>
                              )
                            })}
                          </div>
                        ) : null}
                      </div>

                      <div className="mt-4 rounded-2xl border border-outline/70 bg-muted/40 p-4 text-sm text-inkMuted">
                        <p className="font-semibold text-ink">Review</p>
                        <p className="mt-2">
                          <span className="font-semibold">Service:</span>{' '}
                          {form.getValues('serviceType')}
                        </p>
                        <p className="mt-1">
                          <span className="font-semibold">Pickup:</span>{' '}
                          {form.getValues('pickupAddress')}
                        </p>
                        <p className="mt-1">
                          <span className="font-semibold">Dropoff:</span>{' '}
                          {form.getValues('dropoffAddress')}
                        </p>
                        <p className="mt-1">
                          <span className="font-semibold">Schedule:</span>{' '}
                          {form.getValues('scheduleDate')} {form.getValues('scheduleTime')}
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Button
                    type="button"
                    variant="ghost"
                    size="lg"
                    className="rounded-2xl"
                    onClick={back}
                    disabled={stepIndex === 0 || submitting}
                  >
                    Back
                  </Button>

                  <div className="flex gap-3">
                    {stepIndex < steps.length - 1 ? (
                      <Button
                        type="button"
                        variant="cta"
                        size="lg"
                        className="rounded-2xl"
                        onClick={next}
                        disabled={submitting}
                      >
                        Next →
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        variant="cta"
                        size="lg"
                        className="rounded-2xl"
                        disabled={submitting}
                      >
                        {submitting ? 'Submitting…' : 'Submit booking →'}
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  )
}
