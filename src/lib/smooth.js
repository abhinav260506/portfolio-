import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis = null

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Lenis drives the scroll; GSAP's ticker drives Lenis so ScrollTrigger stays in sync.
export function startSmoothScroll() {
  if (prefersReducedMotion()) return () => {}
  lenis = new Lenis({ duration: 1.15, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = time => lenis.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  return () => {
    gsap.ticker.remove(tick)
    lenis.destroy()
    lenis = null
  }
}

export function scrollTo(target) {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.4 })
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}

export const stopScroll = () => lenis?.stop()
export const resumeScroll = () => lenis?.start()
