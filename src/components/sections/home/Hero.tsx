import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Star, ShieldCheck, Clock, CheckCircle2, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Magnetic } from '@/components/motion/Magnetic'
import { SplitText } from '@/components/motion/SplitText'
import { Link } from 'react-router-dom'

import v1 from '@/assets/web-images/v1.mp4'
import heroPoster from '@/assets/web-images/poster.png'

const phone = '055 751 6254'

const trust = [
  { icon: Star, label: '★ 4.9 Google Rating' },
  { icon: CheckCircle2, label: '500+ Moves Completed' },
  { icon: Clock, label: 'Same Day Service' },
  { icon: ShieldCheck, label: 'Licensed & Insured' },
] as const

const heroBlinkLines = [
  'You just point.',
  'We pack, lift, and deliver.',
  'We handle it all.',
] as const

export function Hero() {
  const rootRef = useRef<HTMLElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const [blinkLineIndex, setBlinkLineIndex] = useState(0)
  const [typeCharCount, setTypeCharCount] = useState(0)
  const [videoSrc, setVideoSrc] = useState<string | undefined>(undefined)

  useEffect(() => {
    // Defer loading the large video file until after the landing page has initially rendered
    const timer = setTimeout(() => {
      setVideoSrc(v1)
    }, 400)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !videoSrc) return

    const onCanPlay = () => {
      setVideoReady(true)
      void video.play().catch(() => {
        // Ignore autoplay rejections (browser policy / low power mode)
      })
    }

    if (video.readyState >= 2) onCanPlay()
    video.addEventListener('canplay', onCanPlay)
    return () => video.removeEventListener('canplay', onCanPlay)
  }, [videoSrc])

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reducedNow =
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
    setPrefersReducedMotion((prev) => (prev === reducedNow ? prev : reducedNow))

    const ctx = gsap.context(() => {
      if (!reducedNow) {
        gsap.fromTo(
          '.hero-char',
          { y: 44, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.014,
          }
        )

        gsap.fromTo(
          '.hero-fade',
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: 0.2,
            ease: 'power2.out',
            stagger: 0.08,
          }
        )

        gsap.fromTo(
          '.hero-badge',
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.35,
            ease: 'power2.out',
            stagger: 0.07,
          }
        )

        gsap.fromTo(
          '.hero-cta',
          { scale: 0.98 },
          {
            scale: 1,
            duration: 0.55,
            delay: 0.55,
            ease: 'elastic.out(1, 0.6)',
          }
        )

      }
    }, root)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const line = heroBlinkLines[blinkLineIndex]
    if (prefersReducedMotion) {
      setTypeCharCount(line.length)
      return
    }

    setTypeCharCount(0)

    const timers: number[] = []
    const charDelayMs = 55
    const holdMs = 800
    const gapMs = 180

    for (let i = 0; i < line.length; i += 1) {
      timers.push(
        window.setTimeout(() => {
          setTypeCharCount(i + 1)
        }, charDelayMs * (i + 1))
      )
    }

    const sentenceMs = charDelayMs * line.length
    timers.push(
      window.setTimeout(() => {
        setTypeCharCount(0)
      }, sentenceMs + holdMs)
    )
    timers.push(
      window.setTimeout(() => {
        setBlinkLineIndex((current) => (current + 1) % heroBlinkLines.length)
      }, sentenceMs + holdMs + gapMs)
    )

    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [blinkLineIndex, prefersReducedMotion])

  return (
    <section
      ref={rootRef}
      className="relative isolate min-h-[100svh] overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-black bg-cover bg-center"
        style={{ backgroundImage: `url(${heroPoster})` }}
      >
        <video
          ref={videoRef}
          className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            videoReady ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroPoster}
          disablePictureInPicture
          aria-hidden="true"
          tabIndex={-1}
          src={videoSrc}
        />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl items-center px-5 pt-24 pb-16 md:py-20">
        <div className="w-full max-w-2xl text-left">
          <h1 className="mt-6 text-balance text-[2.5rem] leading-[1.08] font-extrabold tracking-tight text-white sm:text-5xl sm:leading-[0.95] md:text-6xl">
            <SplitText
              text="Dubai’s easiest move."
              className="block"
              charClassName="hero-char"
            />
            <span className="mt-3 block text-cta min-h-[44px] sm:min-h-0" aria-live="polite">
              <span
                className="block text-3xl font-semibold leading-tight md:text-4xl"
              >
                {heroBlinkLines[blinkLineIndex].slice(0, typeCharCount) ||
                  '\u00A0'}
              </span>
            </span>
          </h1>

          <p
            dir="rtl"
            className="hero-fade mt-3 max-w-xl text-sm text-white/80"
          >
            نقل سريع وآمن في دبي — نحن نهتم بكل شيء.
          </p>

          <p className="hero-fade mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/85 md:text-lg">
            Professional movers, packers, junk removal and delivery services in
            Dubai. From a single item to full villa relocation — we handle
            everything.
          </p>

          <div className="hero-fade mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Magnetic className="hero-cta w-full sm:w-auto">
              <Button
                asChild
                variant="cta"
                size="lg"
                className="h-12 rounded-2xl px-6 text-base w-full sm:w-auto justify-center"
              >
                <Link to="/booking">Book Now →</Link>
              </Button>
            </Magnetic>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 rounded-2xl border-white/25 bg-white/5 px-6 text-base text-white hover:bg-white/10 w-full sm:w-auto justify-center"
            >
              <a href={`tel:${phone.replace(/\s/g, '')}`}>
                <Phone className="mr-2 size-4 shrink-0" /> Call {phone}
              </a>
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {trust.map((t) => (
              <div
                key={t.label}
                className="hero-badge rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md px-3 py-3 text-xs text-white/90 shadow-sm transition-all hover:bg-white/15"
              >
                <div className="flex items-center gap-2">
                  <t.icon className="size-4 text-cta shrink-0" />
                  <span className="font-medium tracking-tight text-[11px] sm:text-xs">{t.label}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="hero-fade mt-8 font-serif text-lg italic text-white/80 md:text-xl">
            “It should feel effortless — because we do the hard part.”
          </p>
        </div>

        <div className="hidden flex-1 md:block" />
      </div>

      {/* Warm bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
