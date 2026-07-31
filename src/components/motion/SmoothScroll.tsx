import { type PropsWithChildren, useEffect } from 'react'
import Lenis from 'lenis'
import { ensureScrollTrigger, ScrollTrigger } from '@/lib/gsap'

let gsapRegistered = false

export function SmoothScroll({ children }: PropsWithChildren) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReducedMotion =
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false

    // Mobile/touch devices often feel worse with JS smooth-scroll and can
    // conflict with scroll locking (e.g., mobile nav). Prefer native scrolling.
    const isCoarsePointer =
      window.matchMedia?.('(pointer: coarse)')?.matches ?? false
    const isSmallScreen =
      window.matchMedia?.('(max-width: 1023px)')?.matches ?? false

    if (prefersReducedMotion || isCoarsePointer || isSmallScreen) return

    if (!gsapRegistered) {
      ensureScrollTrigger()
      gsapRegistered = true
    }

    const lenis = new Lenis({
      duration: 0.55,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      // Touch is handled natively (we disable Lenis on coarse pointers anyway).
      syncTouch: false,
      touchMultiplier: 1,
      wheelMultiplier: 1.5,
    })

    lenis.on('scroll', () => ScrollTrigger.update())

    let rafId = 0
    const raf = (timeMs: number) => {
      lenis.raf(timeMs)
      rafId = window.requestAnimationFrame(raf)
    }
    rafId = window.requestAnimationFrame(raf)

    // Keep ScrollTrigger measurements accurate
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('resize', refresh)
    queueMicrotask(refresh)

    return () => {
      window.removeEventListener('resize', refresh)
      window.cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
