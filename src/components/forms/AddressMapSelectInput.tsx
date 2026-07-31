import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type AddressMapSelectInputProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  name?: string
  id?: string
}

type SearchResult = {
  display_name: string
  lat: string
  lon: string
  place_id: number
}

const defaultCenter: [number, number] = [25.2048, 55.2708]
const defaultZoom = 11

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

export function AddressMapSelectInput({
  value,
  onChange,
  placeholder,
  className,
  disabled,
  name,
  id,
}: AddressMapSelectInputProps) {
  const [query, setQuery] = useState(value)
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [position, setPosition] = useState<[number, number]>(defaultCenter)
  const [zoom, setZoom] = useState(defaultZoom)
  const mapRef = useRef<L.Map | null>(null)
  const markerRef = useRef<L.Marker | null>(null)
  const mapContainerRef = useRef<HTMLDivElement | null>(null)

  const bounds = useMemo(
    () =>
      L.latLngBounds(L.latLng(24.8, 54.6), L.latLng(25.6, 55.6)),
    []
  )

  useEffect(() => {
    setQuery(value)
  }, [value])

  useEffect(() => {
    if (disabled) return
    const trimmed = query.trim()
    if (trimmed.length < 3) {
      setResults([])
      setLoading(false)
      setError(null)
      return
    }

    const controller = new AbortController()
    const timeout = window.setTimeout(async () => {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=6&countrycodes=ae&bounded=1&viewbox=54.6,25.6,55.6,24.8&q=${encodeURIComponent(
            trimmed
          )}`,
          {
            signal: controller.signal,
            headers: { 'Accept-Language': 'en' },
          }
        )

        if (!res.ok) throw new Error('Search failed')
        const data = (await res.json()) as SearchResult[]
        setResults(data)
      } catch (err: any) {
        if (err?.name === 'AbortError') return
        setError(err?.message ?? 'Search failed')
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 350)

    return () => {
      controller.abort()
      window.clearTimeout(timeout)
    }
  }, [disabled, query])

  const selectResult = useCallback((result: SearchResult) => {
    const nextValue = result.display_name
    const nextPos: [number, number] = [Number(result.lat), Number(result.lon)]
    setQuery(nextValue)
    onChange(nextValue)
    setPosition(nextPos)
    setZoom(16)
    setResults([])
  }, [onChange])

  const reverseLookup = useCallback(async (coords: [number, number]) => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords[0]}&lon=${coords[1]}&zoom=18&addressdetails=1&countrycodes=ae`,
        {
          headers: { 'Accept-Language': 'en' },
        }
      )

      if (!res.ok) throw new Error('Reverse lookup failed')
      const data = (await res.json()) as { display_name?: string }
      if (data.display_name) {
        onChange(data.display_name)
        setQuery(data.display_name)
      }
    } catch (err: any) {
      setError(err?.message ?? 'Reverse lookup failed')
    } finally {
      setLoading(false)
    }
  }, [onChange])

  const handlePick = useCallback((coords: [number, number]) => {
    if (disabled) return
    setPosition(coords)
    setZoom(16)
    void reverseLookup(coords)
  }, [disabled, reverseLookup])

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    const map = L.map(mapContainerRef.current, {
      zoomControl: true,
      scrollWheelZoom: false,
    })
    mapRef.current = map

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map)

    map.fitBounds(bounds, { padding: [12, 12] })

    const marker = L.marker(defaultCenter).addTo(map)
    markerRef.current = marker

    // Invalidate size after initial render to fix partial gray tile loading issues
    setTimeout(() => {
      map.invalidateSize()
    }, 100)

    return () => {
      map.off()
      map.remove()
      mapRef.current = null
      markerRef.current = null
    }
  }, [bounds])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    const onClick = (event: L.LeafletMouseEvent) => {
      if (disabled) return
      handlePick([event.latlng.lat, event.latlng.lng])
    }

    map.on('click', onClick)
    return () => {
      map.off('click', onClick)
    }
  }, [disabled, handlePick])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    map.setView(position, zoom, { animate: true })
    markerRef.current?.setLatLng(position)
  }, [position, zoom])

  return (
    <div className="grid gap-3">
      <div className="relative">
        <Input
          id={id}
          name={name}
          value={query}
          onChange={(event) => {
            const next = event.target.value
            setQuery(next)
            onChange(next)
          }}
          placeholder={placeholder}
          className={cn('h-12 rounded-2xl', className)}
          disabled={disabled}
          autoComplete="off"
        />

        {results.length ? (
          <div className="absolute z-10 mt-2 w-full rounded-2xl border border-outline/70 bg-background p-2 text-xs text-inkMuted shadow-[0_18px_60px_rgba(26,58,58,0.12)]">
            {results.map((result) => (
              <button
                key={result.place_id}
                type="button"
                className="w-full rounded-xl px-3 py-2 text-left hover:bg-muted"
                onClick={() => selectResult(result)}
              >
                {result.display_name}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {loading ? <div className="text-xs text-inkMuted">Searching…</div> : null}
      {error ? <div className="text-xs text-destructive">{error}</div> : null}

      <div className="overflow-hidden rounded-2xl border border-outline/70">
        <div ref={mapContainerRef} className="h-56 w-full" />
      </div>

      <p className="text-xs text-inkMuted">
        Select an address from the list or click the Dubai map to drop a pin.
      </p>
    </div>
  )
}
