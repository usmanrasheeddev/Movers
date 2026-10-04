import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let scrollTriggerRegistered = false

export function ensureScrollTrigger() {
  if (scrollTriggerRegistered) return
  if (typeof window === 'undefined') return
  gsap.registerPlugin(ScrollTrigger)
  scrollTriggerRegistered = true
}

export { gsap, ScrollTrigger }
