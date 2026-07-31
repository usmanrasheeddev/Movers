export function generateBookingId() {
  const d = new Date()
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `MPD-${yyyy}${mm}${dd}-${rand}`
}

export function buildWhatsAppMessage(input: {
  bookingId: string
  serviceType: string
  pickup: string
  dropoff: string
  scheduleLabel: string
  phone: string
}) {
  return [
    `Booking ID: ${input.bookingId}`,
    `Service: ${input.serviceType}`,
    `Pickup: ${input.pickup}`,
    `Dropoff: ${input.dropoff}`,
    `Schedule: ${input.scheduleLabel}`,
    `Customer phone: ${input.phone}`,
  ].join('\n')
}

export function buildWhatsAppLink(message: string, phoneE164 = '971557516254') {
  const text = encodeURIComponent(message)
  return `https://wa.me/${phoneE164}?text=${text}`
}
