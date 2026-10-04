import { memo, useEffect, useState } from 'react'
import { requireSupabase } from '@/lib/supabase'
import { Loader2, Image as ImageIcon, Maximize2 } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'

type BookingPhotoGalleryProps = {
  photoPaths: string[]
}

export const BookingPhotoGallery = memo(function BookingPhotoGallery({
  photoPaths,
}: BookingPhotoGalleryProps) {
  const [urls, setUrls] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [activePhoto, setActivePhoto] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    const fetchUrls = async () => {
      setLoading(true)
      try {
        const sb = requireSupabase()
        const { data, error } = await sb.storage
          .from('booking-photos')
          .createSignedUrls(photoPaths, 3600)

        if (error) throw error
        if (active && data) {
          setUrls(
            data
              .map((item) => item.signedUrl)
              .filter((url): url is string => url !== null)
          )
        }
      } catch (err) {
        console.error('Failed to get signed URLs', err)
      } finally {
        if (active) setLoading(false)
      }
    }

    fetchUrls()
    return () => {
      active = false
    }
  }, [photoPaths])

  if (loading) {
    return (
      <div className="rounded-xl border border-outline/70 bg-muted/40 p-3 flex items-center justify-center gap-1.5">
        <Loader2 className="size-3 animate-spin text-cta" />
        <span className="text-[10px] text-inkMuted">Loading booking photos...</span>
      </div>
    )
  }

  if (urls.length === 0) return null

  return (
    <div className="rounded-xl border border-outline/70 bg-muted/40 p-3">
      <p className="font-semibold text-ink mb-2 flex items-center gap-1.5 text-xs">
        <ImageIcon className="size-3.5 text-emerald-600" /> Uploaded Photos ({urls.length})
      </p>

      <div className="grid grid-cols-3 gap-1.5">
        {urls.map((url, idx) => (
          <div
            key={idx}
            className="group relative aspect-square overflow-hidden rounded-lg border border-outline/70 bg-background cursor-pointer"
            onClick={() => setActivePhoto(url)}
          >
            <img
              src={url}
              alt={`Booking upload ${idx + 1}`}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Maximize2 className="size-3.5 text-white" />
            </div>
          </div>
        ))}
      </div>

      {activePhoto && (
        <Dialog open={!!activePhoto} onOpenChange={() => setActivePhoto(null)}>
          <DialogContent className="max-w-2xl border-none bg-ink/95 p-0 overflow-hidden rounded-xl flex items-center justify-center">
            <div className="relative w-full h-[75vh] p-1 flex items-center justify-center">
              <img
                src={activePhoto}
                alt="Enlarged view"
                className="max-h-full max-w-full object-contain rounded-md"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
})
