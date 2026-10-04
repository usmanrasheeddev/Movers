import { memo } from 'react'
import { MapPin, Calendar, User, Phone, MessageCircle, Mail } from 'lucide-react'
import type { BookingRow } from '@/types/admin'
import { buildCustomerWhatsAppLink } from '@/lib/admin-utils'
import { BookingPhotoGallery } from './BookingPhotoGallery'

type BookingDetailViewProps = {
  booking: BookingRow
}

export const BookingDetailView = memo(function BookingDetailView({
  booking,
}: BookingDetailViewProps) {
  const waLink = buildCustomerWhatsAppLink(
    booking.contact_phone,
    booking.contact_name,
    booking.booking_id
  )

  return (
    <div className="grid gap-3.5 text-xs mt-1">
      {/* Overview Stats */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <div className="rounded-xl border border-outline/70 bg-muted/20 p-2.5">
          <p className="text-[8px] uppercase font-bold text-inkMuted tracking-wider">Service</p>
          <p className="font-bold text-ink text-xs mt-0.5 truncate" title={booking.service_type}>
            {booking.service_type}
          </p>
        </div>

        <div className="rounded-xl border border-outline/70 bg-muted/20 p-2.5">
          <p className="text-[8px] uppercase font-bold text-inkMuted tracking-wider">Payment</p>
          <p className="font-bold text-ink text-xs mt-0.5 uppercase">
            {booking.payment_method.replace(/_/g, ' ')}
          </p>
        </div>

        <div className="rounded-xl border border-outline/70 bg-muted/20 p-2.5">
          <p className="text-[8px] uppercase font-bold text-inkMuted tracking-wider">Booking ID</p>
          <p className="font-bold text-emerald-600 text-xs mt-0.5 select-all font-mono">
            {booking.booking_id}
          </p>
        </div>

        <div className="rounded-xl border border-outline/70 bg-muted/20 p-2.5">
          <p className="text-[8px] uppercase font-bold text-inkMuted tracking-wider">Created</p>
          <p className="font-bold text-ink text-xs mt-0.5 truncate">
            {new Date(booking.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Route Addresses */}
      <div className="rounded-xl border border-outline/70 bg-muted/20 p-4 space-y-3">
        <h4 className="font-extrabold text-ink text-[10px] uppercase tracking-wider flex items-center gap-1.5">
          <MapPin className="size-3.5 text-emerald-600" /> Addresses
        </h4>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-0.5">
            <span className="font-extrabold text-[8px] uppercase text-amber-600 tracking-wider">Pickup From:</span>
            <p className="font-semibold text-ink leading-relaxed">{booking.pickup_address}</p>
          </div>
          <div className="space-y-0.5">
            <span className="font-extrabold text-[8px] uppercase text-emerald-600 tracking-wider">Deliver To:</span>
            <p className="font-semibold text-ink leading-relaxed">{booking.dropoff_address}</p>
          </div>
        </div>
      </div>

      {/* Date & Time Slot */}
      <div className="rounded-xl border border-outline/70 bg-muted/20 p-3 flex items-center gap-2.5">
        <Calendar className="size-4 text-emerald-600 shrink-0" />
        <div>
          <p className="font-bold text-ink">
            {new Date(booking.schedule_at).toLocaleDateString(undefined, {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p className="text-inkMuted text-[10px] mt-0.5">
            Confirmed Time Slot:{' '}
            <span className="font-semibold text-ink">
              {new Date(booking.schedule_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </p>
        </div>
      </div>

      {/* Items Details */}
      <div className="rounded-xl border border-outline/70 bg-muted/20 p-3">
        <p className="text-[8px] uppercase font-bold text-inkMuted tracking-wider mb-1">Items / Notes</p>
        <p className="leading-relaxed whitespace-pre-wrap text-ink font-semibold">
          {booking.item_details}
        </p>
      </div>

      {/* Photos */}
      {booking.photo_paths && booking.photo_paths.length > 0 ? (
        <BookingPhotoGallery photoPaths={booking.photo_paths} />
      ) : null}

      {/* Customer Action Hub */}
      <div className="rounded-xl border border-outline/70 bg-card p-4 space-y-4">
        <h4 className="font-extrabold text-ink text-[10px] uppercase tracking-wider flex items-center gap-1.5 border-b border-outline/50 pb-2">
          <User className="size-3.5 text-emerald-600" /> Client Contact Panel
        </h4>

        <div className="grid gap-3.5 text-[11px] grid-cols-1 sm:grid-cols-3">
          <div className="space-y-0.5">
            <span className="text-[8px] uppercase font-bold text-inkMuted tracking-wider">Client Name</span>
            <p className="font-extrabold text-ink text-xs">{booking.contact_name}</p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[8px] uppercase font-bold text-inkMuted tracking-wider">Phone Number</span>
            <p className="font-extrabold text-ink text-xs select-all">{booking.contact_phone}</p>
          </div>
          <div className="space-y-0.5 break-all">
            <span className="text-[8px] uppercase font-bold text-inkMuted tracking-wider">Email Address</span>
            <p className="font-extrabold text-ink text-xs select-all">{booking.contact_email}</p>
          </div>
        </div>

        <div className="grid gap-2 grid-cols-1 sm:grid-cols-3 pt-2">
          {/* Call */}
          <a
            href={`tel:${booking.contact_phone.replace(/\s/g, '')}`}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-outline/75 bg-background px-3 py-2 hover:bg-muted/30 font-bold text-ink text-xs transition-colors"
          >
            <Phone className="size-3.5 text-emerald-600" /> Call Client
          </a>

          {/* Direct WhatsApp */}
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-success/35 bg-success/5 px-3 py-2 hover:bg-success/10 font-bold text-success text-xs transition-colors"
          >
            <MessageCircle className="size-3.5 text-success" /> WhatsApp Chat
          </a>

          {/* Direct Email */}
          <a
            href={`mailto:${booking.contact_email}?subject=Relocation Booking ${booking.booking_id}`}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-outline/75 bg-background px-3 py-2 hover:bg-muted/30 font-bold text-ink text-xs transition-colors"
          >
            <Mail className="size-3.5 text-emerald-600" /> Send Email
          </a>
        </div>
      </div>
    </div>
  )
})
