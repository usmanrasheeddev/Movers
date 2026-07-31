import { type PropsWithChildren, useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'

export function RouteTransition({ children }: PropsWithChildren) {
  const location = useLocation()
  const rootRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const el = rootRef.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)'
    )?.matches

    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 10 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          clearProps: 'transform',
        }
      )
    }, el)

    return () => ctx.revert()
  }, [location.pathname])

  return (
    <div ref={rootRef} data-route={location.pathname}>
      {children}
    </div>
  )
}
