import type { BookingRow } from '@/types/admin'

/** CSV export headers */
const CSV_HEADERS = [
  'Booking ID',
  'Created At',
  'Service Type',
  'Customer Name',
  'Customer Phone',
  'Customer Email',
  'Pickup Address',
  'Dropoff Address',
  'Schedule At',
  'Status',
  'Payment Method',
] as const

/** Escape a value for CSV (RFC 4180) */
function escapeCsvField(val: unknown): string {
  const str = String(val ?? '').replace(/"/g, '""')
  return `"${str}"`
}

/** Build a CSV blob from booking rows and trigger download */
export function exportBookingsCsv(rows: BookingRow[]): number {
  const lines = [CSV_HEADERS.join(',')]

  for (const b of rows) {
    lines.push(
      [
        b.booking_id,
        new Date(b.created_at).toISOString(),
        b.service_type,
        b.contact_name,
        b.contact_phone,
        b.contact_email,
        b.pickup_address,
        b.dropoff_address,
        new Date(b.schedule_at).toISOString(),
        b.status,
        b.payment_method,
      ]
        .map(escapeCsvField)
        .join(',')
    )
  }

  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `MoversDubai_Bookings_${new Date().toISOString().slice(0, 10)}.csv`
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)

  return rows.length
}

/**
 * Convert a UAE local phone number to E.164 format for WhatsApp.
 * Examples: "055 751 6254" → "971557516254", "+971557516254" → "971557516254"
 */
export function toE164Phone(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  if (digits.startsWith('05')) return '971' + digits.slice(1)
  if (digits.startsWith('5')) return '971' + digits
  return digits || '971557516254'
}

/** Build a WhatsApp deep-link for contacting a customer */
export function buildCustomerWhatsAppLink(
  phone: string,
  customerName: string,
  bookingId: string
): string {
  const e164 = toE164Phone(phone)
  const text = encodeURIComponent(
    `Hi ${customerName}, this is Movers Packers Dubai support regarding your Relocation Booking ID: ${bookingId}.`
  )
  return `https://wa.me/${e164}?text=${text}`
}
