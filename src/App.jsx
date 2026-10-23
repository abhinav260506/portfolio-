import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import 'lenis/dist/lenis.css'
import TargetCursor from './components/reactbits/TargetCursor/TargetCursor'
import ClickSpark from './components/reactbits/ClickSpark/ClickSpark'
import { startSmoothScroll, stopScroll, resumeScroll } from './lib/smooth'
import Boot from './sections/Boot'
import Nav from './sections/Nav'
import Hero from './sections/Hero'
import About from './sections/About'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Credentials from './sections/Credentials'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const finePointer = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches

export default function App() {
  const [booted, setBooted] = useState(false)
  const [showCursor] = useState(finePointer)
  const progress = useRef(null)

  useEffect(() => {
    const stop = startSmoothScroll()
    stopScroll()
    return stop
  }, [])

  useEffect(() => {
    if (!booted) return
    resumeScroll()
    // fonts and pinned sections change layout after first paint
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, [booted])

  useGSAP(() => {
    gsap.to(progress.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: true },
    })
  })

  return (
    <ClickSpark sparkColor="#00ff41" sparkSize={10} sparkRadius={22} sparkCount={10} duration={420} style={{ height: 'auto' }}>
      {!booted && <Boot onDone={() => setBooted(true)} />}
      {showCursor && <TargetCursor targetSelector="a, button, .cursor-target" cursorColor="#00ff41" spinDuration={2.4} hideDefaultCursor parallaxOn />}
      <div className="scroll-progress" ref={progress} aria-hidden="true" />
      <div className="crt-overlay" aria-hidden="true" />
      <Nav />
      <main>
        <Hero ready={booted} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </ClickSpark>
  )
}
