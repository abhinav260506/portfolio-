import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import SpotlightCard from '../components/reactbits/SpotlightCard/SpotlightCard'
import DecryptedText from '../components/reactbits/DecryptedText/DecryptedText'
import { skills } from '../data'
import './Skills.css'

const OWASP = [
  ['A03', 'Injection · SQLi'],
  ['A03', 'Cross-Site Scripting'],
  ['A07', 'Broken Authentication'],
  ['LLM01', 'Prompt Injection'],
  ['LLM02', 'Sensitive Info Disclosure'],
  ['LLM08', 'Vector & Embedding Weaknesses'],
]

export default function Skills() {
  const root = useRef(null)

  useGSAP(
    () => {
      gsap.from('.sk-card', {
        autoAlpha: 0,
        y: 60,
        stagger: 0.12,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.sk-grid', start: 'top 80%' },
      })
      gsap.from('.sk-card .tag', {
        autoAlpha: 0,
        scale: 0.8,
        stagger: 0.015,
        duration: 0.4,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: '.sk-grid', start: 'top 70%' },
      })
      const marquee = gsap.to('.owasp-row', { xPercent: -50, repeat: -1, duration: 38, ease: 'none' })
      return () => marquee.kill()
    },
    { scope: root }
  )

  return (
    <section id="skills" className="section skills" ref={root}>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">04 / arsenal</span>
          <h2 className="h2">
            The <span className="accent">toolkit</span>
            <span className="outline"> loaded.</span>
          </h2>
          <p className="lead">Offensive tradecraft, AI-security research, blue-team visibility and the engineering to build it all.</p>
        </div>

        <div className="sk-grid">
          {skills.map((s, i) => (
            <SpotlightCard key={s.code} className={`hud sk-card sk-${i}`} spotlightColor="rgba(0, 255, 65, 0.16)" intensity={0.2}>
              <div className="sk-inner">
                <div className="sk-top">
                  <span className="sk-code">[{s.code}]</span>
                  <span className="sk-n">{String(s.items.length).padStart(2, '0')} modules</span>
                </div>
                <h3 className="sk-title cursor-target" data-cursor-label={s.code.toLowerCase()}>
                  <DecryptedText text={s.group} animateOn="hover" speed={35} maxIterations={10} encryptedClassName="sk-enc" />
                </h3>
                <div className="sk-tags">
                  {s.items.map(it => (
                    <span className="tag" key={it}>
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>

      <div className="owasp" aria-label="Vulnerability classes tested">
        <div className="owasp-label">VULN CLASSES IN SCOPE · OWASP TOP 10 + OWASP LLM TOP 10</div>
        <div className="owasp-track">
          <div className="owasp-row">
            {[...OWASP, ...OWASP, ...OWASP, ...OWASP].map(([c, n], i) => (
              <span className="owasp-item" key={i} aria-hidden={i >= OWASP.length}>
                <b>{c}</b> {n}
                <i>✦</i>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
