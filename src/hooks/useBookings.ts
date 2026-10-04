import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { requireSupabase } from '@/lib/supabase'
import type { BookingRow } from '@/types/admin'
import { BOOKING_SELECT_FIELDS, BOOKING_FETCH_LIMIT } from '@/types/admin'

export type BookingStats = {
  total: number
  pending: number
  confirmed: number
  active: number
  completed: number
  cancelled: number
}

/**
 * Custom hook encapsulating all booking data management:
 * - Fetching from Supabase
 * - In-memory search & status filtering
 * - Sorted results (newest first)
 * - Computed stats for filter tabs
 * - Optimistic status updates
 */
export function useBookings() {
  const [rows, setRows] = useState<BookingRow[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const sb = requireSupabase()
      const { data, error } = await sb
        .from('bookings')
        .select(BOOKING_SELECT_FIELDS)
        .limit(BOOKING_FETCH_LIMIT)

      if (error) throw error
      setRows((data ?? []) as BookingRow[])
    } catch (e: any) {
      toast.error(e?.message ?? 'Failed to load bookings')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  // Compute stats via single-pass reduce
  const stats = useMemo<BookingStats>(() => {
    const counts: BookingStats = {
      total: rows.length,
      pending: 0,
      confirmed: 0,
      active: 0,
      completed: 0,
      cancelled: 0,
    }
    for (const b of rows) {
      switch (b.status) {
        case 'new':
          counts.pending++
          break
        case 'confirmed':
          counts.confirmed++
          break
        case 'in_progress':
          counts.active++
          break
        case 'completed':
          counts.completed++
          break
        case 'cancelled':
          counts.cancelled++
          break
      }
    }
    return counts
  }, [rows])

  // Filter + sort (newest first)
  const filteredRows = useMemo(() => {
    const needle = searchTerm.trim().toLowerCase()

    return rows
      .filter((b) => {
        if (statusFilter !== 'all' && b.status !== statusFilter) return false
        if (dateFilter) {
          const bookingDate = new Date(b.schedule_at).toISOString().slice(0, 10)
          if (bookingDate !== dateFilter) return false
        }
        if (needle) {
          return (
            b.booking_id.toLowerCase().includes(needle) ||
            b.contact_name.toLowerCase().includes(needle) ||
            (b.contact_phone && b.contact_phone.includes(needle)) ||
            (b.contact_email && b.contact_email.toLowerCase().includes(needle)) ||
            b.service_type.toLowerCase().includes(needle)
          )
        }
        return true
      })
      .sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
  }, [rows, searchTerm, statusFilter, dateFilter])

  // Optimistic status update
  const updateStatus = useCallback(async (bookingId: string, nextStatus: string) => {
    try {
      const sb = requireSupabase()
      const { error } = await sb
        .from('bookings')
        .update({ status: nextStatus })
        .eq('id', bookingId)
      if (error) throw error

      setRows((prev) =>
        prev.map((r) => (r.id === bookingId ? { ...r, status: nextStatus } : r))
      )
      toast.success('Booking status updated')
    } catch (e: any) {
      toast.error(e?.message ?? 'Failed to update status')
    }
  }, [])

  return {
    rows: filteredRows,
    allRows: rows,
    loading,
    stats,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter,
    reload: load,
    updateStatus,
  } as const
}
