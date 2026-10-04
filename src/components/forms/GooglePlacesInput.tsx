import { useEffect, useId, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { MapPin, Loader2 } from 'lucide-react'

let googlePlacesLoader: Promise<void> | null = null

function loadGooglePlaces(apiKey: string) {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.google?.maps?.places) return Promise.resolve()
  if (googlePlacesLoader) return googlePlacesLoader

  googlePlacesLoader = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-google-places="true"]'
    )
    if (existing) {
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', () => reject(new Error('Failed to load Google Places')))
      return
    }

    const script = document.createElement('script')
    script.dataset.googlePlaces = 'true'
    script.async = true
    script.defer = true
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      apiKey
    )}&libraries=places`
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Google Places'))
    document.head.appendChild(script)
  })

  return googlePlacesLoader
}

declare global {
  interface Window {
    google?: any
  }
}

type GooglePlacesInputProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  name?: string
  id?: string
  autoComplete?: string
}

export function GooglePlacesInput({
  value,
  onChange,
  placeholder,
  className,
  disabled,
  name,
  id,
  autoComplete,
}: GooglePlacesInputProps) {
  const autoId = useId()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const key = import.meta.env.VITE_GOOGLE_PLACES_API_KEY as string | undefined

  // Free OpenStreetMap Autocomplete States
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // 1. Google Places Implementation
  useEffect(() => {
    const el = inputRef.current
    if (!el || !key) return

    let autocomplete: any
    let listener: any

    loadGooglePlaces(key)
      .then(() => {
        if (!window.google?.maps?.places?.Autocomplete) return
        autocomplete = new window.google.maps.places.Autocomplete(el, {
          types: ['geocode'],
          componentRestrictions: { country: 'ae' },
        })
        listener = autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace()
          const next = place?.formatted_address || el.value
          onChange(next)
        })
      })
      .catch(() => {
        // fallback
      })

    return () => {
      if (listener?.remove) listener.remove()
    }
  }, [key, onChange])

  // 2. OpenStreetMap Nominatim Implementation (Free fallback)
  useEffect(() => {
    if (key) return // If Google Key exists, don't use OSM query
    if (!value || value.length < 3 || !isOpen) {
      setSuggestions([])
      return
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            value
          )}&countrycodes=ae&limit=5&addressdetails=1`,
          {
            headers: {
              'Accept-Language': 'en',
              'User-Agent': 'MoversPackersDubaiWebsite/1.0',
            },
          }
        )
        if (!response.ok) throw new Error('OSM geocoding failed')
        const data = await response.json()
        const formatted = data.map((item: any) => item.display_name)
        setSuggestions(formatted)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }, 400) // 400ms debounce

    return () => clearTimeout(delayDebounce)
  }, [value, key, isOpen])

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className="relative w-full">
      <Input
        ref={inputRef}
        id={id ?? autoId}
        name={name}
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
          if (!key) setIsOpen(true)
        }}
        onFocus={() => {
          if (!key) setIsOpen(true)
        }}
        placeholder={placeholder}
        className={cn(className)}
        disabled={disabled}
        autoComplete={autoComplete}
      />

      {/* Free Dropdown Suggestions menu (rendered only when Google API Key is not set) */}
      {!key && isOpen && (value.length >= 3 || loading) ? (
        <div className="absolute left-0 right-0 z-50 mt-2 max-h-60 overflow-y-auto rounded-2xl border border-outline/70 bg-background p-2 shadow-[0_12px_30px_rgba(26,58,58,0.08)] backdrop-blur-md">
          {loading ? (
            <div className="flex items-center justify-center gap-2 py-4 text-sm text-inkMuted">
              <Loader2 className="size-4 animate-spin text-cta" />
              <span>Searching addresses...</span>
            </div>
          ) : suggestions.length === 0 ? (
            <div className="py-3 text-center text-xs text-inkMuted">
              No UAE locations found for "{value}"
            </div>
          ) : (
            <ul className="flex flex-col gap-0.5">
              {suggestions.map((s, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    className="flex w-full items-start gap-2.5 rounded-xl px-3 py-2.5 text-left text-xs font-medium text-ink transition-colors hover:bg-muted/70 hover:text-cta"
                    onClick={() => {
                      onChange(s)
                      setIsOpen(false)
                    }}
                  >
                    <MapPin className="mt-0.5 size-3.5 shrink-0 text-inkMuted" />
                    <span className="line-clamp-2">{s}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  )
}

