import { useCallback } from 'react'
import { Seo } from '@/components/seo/Seo'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import {
  RefreshCw,
  Image as ImageIcon,
  Loader2,
  Search,
  Download,
} from 'lucide-react'

import { useBookings } from '@/hooks/useBookings'
import { exportBookingsCsv } from '@/lib/admin-utils'
import { StatusPicker } from '@/components/admin/StatusPicker'
import { BookingDetailView } from '@/components/admin/BookingDetailView'

export default function AdminPanel() {
  const {
    rows: filteredAndSortedRows,
    loading,
    stats,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter,
    reload,
    updateStatus,
  } = useBookings()

  // Horizontal Quick selection tab items with live counts
  const selectionTabs = [
    { value: 'all', label: 'All', count: stats.total },
    { value: 'new', label: 'New', count: stats.pending },
    { value: 'confirmed', label: 'Confirmed', count: stats.confirmed },
    { value: 'in_progress', label: 'In Progress', count: stats.active },
    { value: 'completed', label: 'Completed', count: stats.completed },
    { value: 'cancelled', label: 'Cancelled', count: stats.cancelled },
  ]

  // CSV Export Utility
  const handleExportCsv = useCallback(() => {
    if (filteredAndSortedRows.length === 0) {
      toast.error('No data available to export.')
      return
    }
    const exportedCount = exportBookingsCsv([...filteredAndSortedRows])
    toast.success(`Exported ${exportedCount} bookings successfully.`)
  }, [filteredAndSortedRows])

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <Seo title="Admin — Movers Packers Dubai" canonicalPath="/admin" />

      {/* Header Info */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink">
            Bookings Manager
          </h1>
          <p className="text-xs text-inkMuted">
            Review incoming moving requests and track dispatch status.
          </p>
        </div>
      </div>

      {/* Simplified Search & Utility Bar */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between pt-1">
        <div className="flex flex-col sm:flex-row gap-2 w-full md:max-w-2xl">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-inkMuted" />
            <Input
              type="text"
              placeholder="Search booking ID, customer name, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-9 rounded-xl bg-card border-outline/70 text-xs w-full"
            />
          </div>

          {/* Date Filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-[10px] font-bold text-inkMuted uppercase tracking-wider whitespace-nowrap shrink-0">
              Filter by Date:
            </span>
            <div className="relative w-full sm:w-[160px] flex items-center">
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="h-9 rounded-xl bg-card border-outline/70 text-xs w-full text-ink font-semibold"
              />
              {dateFilter && (
                <button
                  type="button"
                  onClick={() => setDateFilter('')}
                  className="absolute right-8 text-[10px] font-bold text-inkMuted hover:text-ink"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <Button
            onClick={handleExportCsv}
            variant="outline"
            className="h-9 rounded-xl border-outline/70 bg-card hover:bg-muted/50 text-ink text-xs font-semibold"
            disabled={filteredAndSortedRows.length === 0}
          >
            <Download className="mr-2 size-3.5" />
            Export CSV
          </Button>

          <Button
            variant="outline"
            className="h-9 rounded-xl border-outline/70 bg-card hover:bg-muted/50 text-ink text-xs font-semibold"
            onClick={reload}
            disabled={loading}
          >
            <RefreshCw className={`mr-2 size-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Desktop View: Static Selection List / Quick Filters (Consolidated counts) */}
      <div className="hidden md:flex border-b border-outline/70 flex-wrap gap-1 text-xs">
        {selectionTabs.map((tab) => {
          const isActive = statusFilter === tab.value
          return (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={`px-4 py-2.5 font-bold uppercase tracking-wider transition-all -mb-px border-b-2 text-[10px] ${
                isActive
                  ? 'border-emerald-600 text-emerald-600 font-extrabold'
                  : 'border-transparent text-inkMuted hover:text-ink hover:border-outline/50'
              }`}
            >
              {tab.label} <span className="ml-0.5 opacity-60 font-semibold">({tab.count})</span>
            </button>
          )
        })}
      </div>

      {/* Mobile View: Dropdown Filter */}
      <div className="block md:hidden space-y-1.5">
        <span className="text-[10px] font-bold text-inkMuted uppercase tracking-wider block">
          Filter by Status
        </span>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full h-9 rounded-xl bg-card border border-outline/70 text-xs font-semibold text-ink px-3 justify-between">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent className="bg-card border border-outline/70 text-ink rounded-xl">
            {selectionTabs.map((tab) => (
              <SelectItem
                key={tab.value}
                value={tab.value}
                className="text-xs font-semibold hover:bg-muted/50 rounded-lg cursor-pointer"
              >
                {tab.label} ({tab.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Data Loader */}
      {loading ? (
        <div className="min-h-[200px] border border-outline/70 bg-card rounded-2xl flex flex-col items-center justify-center gap-2">
          <Loader2 className="size-6 animate-spin text-emerald-600" />
          <p className="text-xs font-semibold text-inkMuted">Retrieving secure databases...</p>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-hidden rounded-2xl border border-outline/70 bg-card shadow-sm">
            <Table>
              <TableHeader className="bg-muted/20">
                <TableRow className="border-outline/70">
                  <TableHead className="py-3 pl-5 text-[10px] uppercase font-extrabold text-inkMuted tracking-wider">Booking ID</TableHead>
                  <TableHead className="py-3 text-[10px] uppercase font-extrabold text-inkMuted tracking-wider">Service Type</TableHead>
                  <TableHead className="py-3 text-[10px] uppercase font-extrabold text-inkMuted tracking-wider">Schedule Date</TableHead>
                  <TableHead className="py-3 text-[10px] uppercase font-extrabold text-inkMuted tracking-wider">Client Name</TableHead>
                  <TableHead className="py-3 text-[10px] uppercase font-extrabold text-inkMuted tracking-wider w-[160px]">Status</TableHead>
                  <TableHead className="py-3 pr-5 text-right text-[10px] uppercase font-extrabold text-inkMuted tracking-wider">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedRows.map((b) => (
                  <TableRow key={b.id} className="border-outline/50 hover:bg-muted/5 transition-colors">
                    <TableCell className="py-3 pl-5">
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-ink tracking-tight">{b.booking_id}</p>
                        <p className="text-[9px] font-semibold text-inkMuted">
                          {new Date(b.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </TableCell>
                    
                    <TableCell className="py-3">
                      <p className="text-xs font-semibold text-ink">{b.service_type}</p>
                      {b.photo_paths && b.photo_paths.length > 0 ? (
                        <span className="inline-flex items-center text-[9px] text-emerald-600/80 font-semibold mt-0.5 gap-0.5">
                          <ImageIcon className="size-2.5" />
                          <span>Photos ({b.photo_paths.length})</span>
                        </span>
                      ) : null}
                    </TableCell>
                    
                    <TableCell className="py-3">
                      <div className="text-xs font-semibold text-ink">
                        {new Date(b.schedule_at).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                        <span className="text-[10px] text-inkMuted font-medium ml-1">
                          {new Date(b.schedule_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </TableCell>
                    
                    <TableCell className="py-3">
                      <p className="text-xs font-semibold text-ink">{b.contact_name}</p>
                      <p className="text-[10px] text-inkMuted font-medium">{b.contact_phone}</p>
                    </TableCell>
                    
                    <TableCell className="py-3">
                      <StatusPicker
                        value={b.status}
                        onChange={(next) => updateStatus(b.id, next)}
                      />
                    </TableCell>
                    
                    <TableCell className="py-3 pr-5 text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="rounded-xl h-7 border-outline/80 bg-background text-ink text-[11px] font-bold hover:bg-muted px-3">
                            View details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-xl rounded-2xl p-0 max-h-[85vh] flex flex-col overflow-hidden border-outline/70 bg-card">
                          <DialogHeader className="border-b border-outline/50 p-5 pb-3">
                            <div className="flex flex-wrap items-center justify-between gap-3 pr-6">
                              <div>
                                <span className="text-[9px] uppercase font-bold text-inkMuted tracking-wider">Relocation Sheet</span>
                                <DialogTitle className="text-lg font-black text-ink mt-0.5">
                                  {b.booking_id}
                                </DialogTitle>
                              </div>
                              <div className="flex items-center px-2.5 py-1 bg-muted rounded-lg text-xs font-bold text-ink border border-outline/50">
                                <span>{b.status.toUpperCase()}</span>
                              </div>
                            </div>
                          </DialogHeader>

                          <div className="flex-1 overflow-y-auto p-5 pt-0 min-h-0" data-lenis-prevent>
                            <BookingDetailView booking={b} />
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}

                {filteredAndSortedRows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-12 text-center text-xs font-semibold text-inkMuted">
                      No records match the active filter.
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Grid View */}
          <div className="block md:hidden space-y-3">
            {filteredAndSortedRows.map((b) => (
              <Card key={b.id} className="rounded-2xl border border-outline/70 bg-card p-3 space-y-3 shadow-none">
                <div className="flex items-center justify-between border-b border-outline/50 pb-2">
                  <div>
                    <h4 className="text-xs font-bold text-ink">{b.booking_id}</h4>
                    <p className="text-[9px] text-inkMuted mt-0.5">
                      {new Date(b.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center text-[10px] font-bold text-ink">
                    <span>{b.status}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] leading-relaxed">
                  <div>
                    <p className="font-bold text-inkMuted uppercase text-[8px] tracking-wider">Service</p>
                    <p className="font-semibold text-ink mt-0.5">{b.service_type}</p>
                  </div>
                  <div>
                    <p className="font-bold text-inkMuted uppercase text-[8px] tracking-wider">Schedule</p>
                    <p className="font-semibold text-ink mt-0.5">{new Date(b.schedule_at).toLocaleDateString()} @ {new Date(b.schedule_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="font-bold text-inkMuted uppercase text-[8px] tracking-wider">Customer</p>
                    <p className="font-semibold text-ink mt-0.5">{b.contact_name} ({b.contact_phone})</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-outline/50">
                  <div className="flex-1">
                    <StatusPicker
                      value={b.status}
                      onChange={(next) => updateStatus(b.id, next)}
                    />
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="rounded-xl h-8 border-outline/80 bg-background text-ink font-bold text-xs">
                        Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-xl rounded-2xl p-0 max-h-[85vh] flex flex-col overflow-hidden border-outline/70 bg-card">
                      <DialogHeader className="border-b border-outline/50 p-4 pb-2">
                        <div className="flex flex-wrap items-center justify-between gap-2 pr-6">
                          <div>
                            <span className="text-[9px] uppercase font-bold text-inkMuted tracking-wider">Relocation detail</span>
                            <DialogTitle className="text-base font-black text-ink mt-0.5">
                              {b.booking_id}
                            </DialogTitle>
                          </div>
                          <div className="flex items-center px-2 py-0.5 bg-muted rounded-md text-[10px] font-bold text-ink border border-outline/50">
                            <span>{b.status}</span>
                          </div>
                        </div>
                      </DialogHeader>

                      <div className="flex-1 overflow-y-auto p-4 pt-0 min-h-0" data-lenis-prevent>
                        <BookingDetailView booking={b} />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </Card>
            ))}

            {filteredAndSortedRows.length === 0 ? (
              <div className="py-10 text-center rounded-2xl border border-outline/70 bg-card text-xs font-semibold text-inkMuted">
                No bookings found.
              </div>
            ) : null}
          </div>
        </>
      )}
    </div>
  )
}
