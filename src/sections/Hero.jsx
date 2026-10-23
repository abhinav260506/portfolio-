import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import FaultyTerminal from '../components/reactbits/FaultyTerminal/FaultyTerminal'
import DecryptedText from '../components/reactbits/DecryptedText/DecryptedText'
import { profile } from '../data'
import { scrollTo, prefersReducedMotion } from '../lib/smooth'
import './Hero.css'

// Scripted demo session shown in the hero console (labelled as a simulation).
const SESSION = [
  { t: 'cmd', v: 'nmap -sV -T4 target.lab' },
  { t: 'out', v: '22/tcp  open  ssh      OpenSSH 8.9' },
  { t: 'out', v: '443/tcp open  https    nginx 1.24' },
  { t: 'cmd', v: './ragshield scan --pipeline demo-rag' },
  { t: 'warn', v: '[!] indirect prompt injection in doc_17.pdf' },
  { t: 'warn', v: '[!] similarity drift +0.31 on poisoned chunk' },
  { t: 'ok', v: '[+] report → severity: CRITICAL · confidence 0.94' },
  { t: 'cmd', v: 'surgical-guard --intercept agent.session' },
  { t: 'ok', v: '[+] role-shift hijack neutralised (I2D) in 61ms' },
  { t: 'cmd', v: 'whoami' },
  { t: 'ok', v: 'abhinav — security engineer, ready to deploy' },
]

function Console() {
  const [lines, setLines] = useState([])
  const [typing, setTyping] = useState('')
  const bodyRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setLines(SESSION)
      return
    }
    let cancelled = false
    const wait = ms => new Promise(r => setTimeout(r, ms))
    const run = async () => {
      await wait(2600)
      while (!cancelled) {
        for (const line of SESSION) {
          if (cancelled) return
          if (line.t === 'cmd') {
            for (let i = 1; i <= line.v.length; i++) {
              if (cancelled) return
              setTyping(line.v.slice(0, i))
              await wait(38 + Math.random() * 40)
            }
            await wait(260)
            setTyping('')
          } else {
            await wait(220)
          }
          setLines(prev => [...prev, line].slice(-9))
        }
        await wait(4200)
        setLines([])
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="hero-console corner-box" aria-label="Simulated security tooling session">
      <div className="hc-bar">
        <span className="dots">
          <i />
          <i />
          <i />
        </span>
        <span>abhinav@kali: ~/engagements</span>
        <span className="hc-sim">SIMULATION</span>
      </div>
      <div className="hc-body" ref={bodyRef}>
        {lines.map((l, i) => (
          <div key={i} className={`hc-line ${l.t}`}>
            {l.t === 'cmd' ? (
              <>
                <span className="ps">$</span> {l.v}
              </>
            ) : (
              l.v
            )}
          </div>
        ))}
        <div className="hc-line cmd">
          <span className="ps">$</span> {typing}
          <span className="caret blink" />
        </div>
      </div>
    </div>
  )
}

const GLYPHS = '01<>/\\#$%&*ABCDEF'

// Cycles through roles with a decrypt/scramble transition.
function RoleRotator() {
  const [text, setText] = useState(profile.roles[0])
  useEffect(() => {
    if (prefersReducedMotion()) return
    let i = 0
    let frame
    const id = setInterval(() => {
      i = (i + 1) % profile.roles.length
      const target = profile.roles[i]
      const start = performance.now()
      clearInterval(frame)
      frame = setInterval(() => {
        // time-based so the reveal finishes on schedule even if frames drop
        const revealed = Math.floor((performance.now() - start) / 45)
        setText(
          target
            .split('')
            .map((c, k) => (k < revealed || c === ' ' ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
            .join('')
        )
        if (revealed >= target.length) clearInterval(frame)
      }, 30)
    }, 3000)
    return () => {
      clearInterval(id)
      clearInterval(frame)
    }
  }, [])
  return (
    <span className="role-rotator" aria-live="polite">
      {text}
    </span>
  )
}

export default function Hero({ ready }) {
  const root = useRef(null)

  useGSAP(
    () => {
      if (!ready) return
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.from('.hero-badge', { autoAlpha: 0, y: 20, duration: 0.8 })
        .from('.hero-name .line-inner', { yPercent: 110, duration: 1.2, stagger: 0.1 }, '-=0.5')
        .from('.hero-sub > *', { autoAlpha: 0, y: 24, duration: 0.9, stagger: 0.08 }, '-=0.8')
        .from('.hero-console', { autoAlpha: 0, x: 40, duration: 1 }, '-=0.9')
        .from('.hero-hud > *', { autoAlpha: 0, duration: 0.6, stagger: 0.05 }, '-=0.6')

      gsap.to('.hero-bg', {
        yPercent: 18,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero-content', {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    },
    { scope: root, dependencies: [ready] }
  )

  const [first, ...rest] = profile.short.split(' ')

  return (
    <section id="top" className="hero" ref={root}>
      <div className="hero-bg" aria-hidden="true">
        <FaultyTerminal
          tint="#00ff41"
          scale={1.6}
          gridMul={[2, 1]}
          digitSize={1.3}
          timeScale={0.4}
          scanlineIntensity={0.5}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={0.8}
          curvature={0.12}
          brightness={0.55}
          mouseReact
          mouseStrength={0.35}
          pageLoadAnimation
          glyphs="characters"
          vignette={0.6}
          dpr={Math.min(1.5, typeof window !== 'undefined' ? window.devicePixelRatio : 1)}
          pause={prefersReducedMotion()}
        />
        <div className="hero-fade" />
      </div>

      <div className="hero-hud" aria-hidden="true">
        <span className="hud tl">LAT 14.75°N · LON 78.55°E</span>
        <span className="hud tr">THREAT LEVEL: <b>CONTAINED</b></span>
        <span className="hud bl">SCROLL TO DECRYPT ↓</span>
        <span className="hud br">PORTFOLIO_v2026.10</span>
      </div>

      <div className="container hero-content">
        <div className="hero-left">
          <div className="hero-badge">
            <span className="pulse-dot" />
            SECURE CHANNEL ESTABLISHED · {profile.location.split(',')[1]?.trim()}, IN
          </div>

          <h1 className="hero-name" aria-label={profile.name}>
            <span className="line">
              <span className="line-inner">
                <DecryptedText text={first} animateOn="hover" speed={40} maxIterations={14} className="hn-real" encryptedClassName="hn-enc" />
              </span>
            </span>
            <span className="line">
              <span className="line-inner accent">
                <DecryptedText text={rest.join(' ')} animateOn="hover" speed={40} maxIterations={14} className="hn-real" encryptedClassName="hn-enc" />
                <span className="hn-dot">.</span>
              </span>
            </span>
          </h1>

          <div className="hero-sub">
            <p className="hero-role">
              <span className="gt">&gt;</span> <RoleRotator />
            </p>
            <p className="hero-summary">{profile.summary}</p>
            <div className="hero-ctas">
              <a href="#projects" className="btn solid cursor-target" data-cursor-label="view work" onClick={e => (e.preventDefault(), scrollTo('#projects'))}>
                View case files
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
              <a href={profile.resume} target="_blank" rel="noreferrer" className="btn cursor-target" data-cursor-label="pdf">
                Download résumé
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 4v12m0 0l-5-5m5 5l5-5M4 20h16" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <Console />
      </div>
    </section>
  )
}
