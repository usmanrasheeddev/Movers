import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { Menu, Phone, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Magnetic } from '@/components/motion/Magnetic'

const phone = '055 751 6254'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
  { to: '/track', label: 'Track' },
] as const

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuMounted, setMenuMounted] = useState(false)

  const location = useLocation()
  const onHome = location.pathname === '/'
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    // Robust scroll lock (works on iOS Safari too)
    const scrollY = window.scrollY
    const bodyStyle = document.body.style
    const prev = {
      overflow: bodyStyle.overflow,
      position: bodyStyle.position,
      top: bodyStyle.top,
      width: bodyStyle.width,
    }

    bodyStyle.overflow = 'hidden'
    bodyStyle.position = 'fixed'
    bodyStyle.top = `-${scrollY}px`
    bodyStyle.width = '100%'

    return () => {
      bodyStyle.overflow = prev.overflow
      bodyStyle.position = prev.position
      bodyStyle.top = prev.top
      bodyStyle.width = prev.width
      window.scrollTo(0, scrollY)
    }
  }, [menuOpen])

  const isActive = useMemo(() => {
    const p = location.pathname
    return (to: string) => (to === '/' ? p === '/' : p.startsWith(to))
  }, [location.pathname])

  useEffect(() => {
    if (menuOpen) {
      setMenuMounted(true)
    }
  }, [menuOpen])

  useLayoutEffect(() => {
    if (!menuOpen || !menuMounted) return

    const overlay = overlayRef.current
    const panel = panelRef.current
    if (!overlay || !panel) return

    const prefersReducedMotion = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)'
    )?.matches

    if (prefersReducedMotion) {
      gsap.set(overlay, { autoAlpha: 1 })
      gsap.set(panel, { y: 0, autoAlpha: 1 })
      return
    }

    const tl = gsap.timeline()
    tl.set(overlay, { autoAlpha: 1 })
      .fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.25 })
      .fromTo(
        panel,
        { y: -18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' },
        0
      )

    return () => {
      tl.kill()
    }
  }, [menuOpen, menuMounted])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto max-w-6xl px-4 pt-3 md:px-6">
          <div
            className={cn(
              'flex items-center justify-between rounded-3xl px-4 py-3 transition-all',
              onHome
                ? scrolled
                  ? 'border border-white/15 bg-[linear-gradient(90deg,rgba(232,122,42,0.22),rgba(232,122,42,0.08),rgba(232,122,42,0.18))] shadow-[0_16px_48px_rgba(26,58,58,0.12)] backdrop-blur-xl'
                  : 'bg-transparent'
                : scrolled
                  ? 'glass border border-outline/60 shadow-[0_16px_48px_rgba(26,58,58,0.10)]'
                  : 'bg-transparent'
            )}
          >
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-2xl bg-brand text-background font-black tracking-tight">
                <span className="text-[0.7rem] leading-none">MP</span>
              </span>
              <span
                className={cn(
                  'hidden text-sm font-semibold tracking-tight sm:block',
                  onHome ? 'text-white' : 'text-ink'
                )}
              >
                Movers Packers Dubai
              </span>
            </Link>

            <nav className="hidden items-center gap-6 text-sm md:flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={cn(
                    'relative transition-colors',
                    onHome
                      ? 'text-white/80 hover:text-white'
                      : 'text-inkMuted hover:text-ink',
                    isActive(item.to) && (onHome ? 'text-white' : 'text-ink')
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      'absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-cta transition-transform duration-300',
                      isActive(item.to) && 'scale-x-100'
                    )}
                  />
                </NavLink>
              ))}
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              <Button asChild variant="outline" className="rounded-2xl">
                <a href={`tel:${phone.replace(/\s/g, '')}`}>
                  <Phone className="mr-2 size-4" /> {phone}
                </a>
              </Button>
              <Magnetic>
                <Button asChild variant="cta" size="lg" className="rounded-2xl">
                  <Link to="/booking">Book Now →</Link>
                </Button>
              </Magnetic>
            </div>

            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className={cn('rounded-2xl', onHome && 'text-white hover:text-white')}
                aria-label="Open menu"
                onClick={() => {
                  setMenuMounted(true)
                  setMenuOpen(true)
                }}
              >
                <Menu className="size-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {menuMounted ? (
        <div
          ref={overlayRef}
          className={cn(
            'fixed inset-0 z-[60] block',
            menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
          )}
          style={{ opacity: 0 }}
          aria-hidden={!menuOpen}
        >
          {/* backdrop click target */}
          <button
            className="absolute inset-0 z-0 bg-ink/40"
            aria-label="Close menu overlay"
            onClick={() => setMenuOpen(false)}
          />
          <div
            ref={panelRef}
            className="noise-overlay absolute inset-x-0 top-0 z-10 max-h-[100svh] overflow-y-auto overscroll-contain rounded-b-[2.5rem] bg-background pb-10 pt-5 shadow-[0_24px_80px_rgba(26,58,58,0.18)]"
            style={{ opacity: 0 }}
          >
            <div className="mx-auto max-w-6xl px-5">
              <div className="flex items-center justify-between">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="grid size-9 place-items-center rounded-2xl bg-brand text-background font-black tracking-tight">
                    <span className="text-[0.7rem] leading-none">MP</span>
                  </span>
                  <span className="text-sm font-semibold tracking-tight text-ink">
                    Movers Packers Dubai
                  </span>
                </Link>

                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-2xl"
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                >
                  <X className="size-5" />
                </Button>
              </div>

              <div className="mt-8 grid gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      'rounded-2xl px-3 py-3 text-lg font-semibold tracking-tight text-ink transition-colors',
                      isActive(item.to)
                        ? 'bg-muted'
                        : 'hover:bg-muted/70'
                    )}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-8 grid gap-3">
                <Button asChild variant="outline" size="lg" className="rounded-2xl">
                  <a href={`tel:${phone.replace(/\s/g, '')}`}>
                    <Phone className="mr-2 size-4" /> Call {phone}
                  </a>
                </Button>
                <Button
                  asChild
                  variant="cta"
                  size="lg"
                  className="rounded-2xl"
                >
                  <Link to="/booking">Book Now →</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Unmount after close */}
      <MenuUnmountWatcher
        open={menuOpen}
        onUnmount={() => setMenuMounted(false)}
        overlayRef={overlayRef}
        panelRef={panelRef}
      />
    </>
  )
}

function MenuUnmountWatcher({
  open,
  onUnmount,
  overlayRef,
  panelRef,
}: {
  open: boolean
  onUnmount: () => void
  overlayRef: React.RefObject<HTMLDivElement | null>
  panelRef: React.RefObject<HTMLDivElement | null>
}) {
  useLayoutEffect(() => {
    if (open) return
    const overlay = overlayRef.current
    const panel = panelRef.current
    if (!overlay || !panel) {
      onUnmount()
      return
    }

    const prefersReducedMotion = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)'
    )?.matches

    if (prefersReducedMotion) {
      onUnmount()
      return
    }

    const tl = gsap.timeline({
      onComplete: onUnmount,
    })

    tl.to(panel, { y: -14, opacity: 0, duration: 0.25, ease: 'power2.in' }).to(
      overlay,
      { opacity: 0, duration: 0.2 },
      0
    )

    return () => {
      tl.kill()
    }
  }, [open])

  return null
}
