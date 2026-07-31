import { type PropsWithChildren, useMemo, useRef } from 'react'
import { cn } from '@/lib/utils'

type MagneticProps = PropsWithChildren<{
  className?: string
  strength?: number
}>

export function Magnetic({ children, className, strength = 0.18 }: MagneticProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)

  const isCoarsePointer = useMemo(() => {
    if (typeof window === 'undefined') return true
    return window.matchMedia?.('(pointer: coarse)')?.matches ?? true
  }, [])

  return (
    <div
      ref={rootRef}
      className={cn('inline-block', className)}
      onMouseMove={(e) => {
        if (isCoarsePointer) return
        const el = rootRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        const translateX = Math.max(-1, Math.min(1, x)) * rect.width * strength
        const translateY = Math.max(-1, Math.min(1, y)) * rect.height * strength
        el.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`
      }}
      onMouseLeave={() => {
        const el = rootRef.current
        if (!el) return
        el.style.transform = 'translate3d(0,0,0)'
      }}
      style={{ willChange: 'transform', transition: 'transform 240ms ease' }}
    >
      {children}
    </div>
  )
}
