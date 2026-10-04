/** Shape of a single booking row returned from Supabase */
export type BookingRow = {
  id: string
  created_at: string
  booking_id: string
  service_type: string
  pickup_address: string
  dropoff_address: string
  schedule_at: string
  item_details: string
  contact_name: string
  contact_phone: string
  contact_email: string
  payment_method: string
  status: string
  photo_paths: string[] | null
}

export type StatusOption = {
  readonly value: string
  readonly label: string
}

/** All possible booking statuses */
export const BOOKING_STATUSES: readonly StatusOption[] = [
  { value: 'new', label: 'New' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
] as const

/** Columns selected from the bookings table */
export const BOOKING_SELECT_FIELDS =
  'id, created_at, booking_id, service_type, pickup_address, dropoff_address, schedule_at, item_details, contact_name, contact_phone, contact_email, payment_method, status, photo_paths'

/** Maximum number of bookings to fetch per load */
export const BOOKING_FETCH_LIMIT = 200
