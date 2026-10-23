import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import SpotlightCard from '../components/reactbits/SpotlightCard/SpotlightCard'
import GlitchText from '../components/reactbits/GlitchText/GlitchText'
import { projects } from '../data'
import './Projects.css'

function AttackChain({ chain }) {
  return (
    <div className="chain" aria-label={`Pipeline: ${chain.join(' to ')}`}>
      {chain.map((c, i) => (
        <div className="chain-step" key={c}>
          <div className="chain-node">
            <span className="chain-idx">L{i + 1}</span>
            <span className="chain-name">{c}</span>
          </div>
          {i < chain.length - 1 && (
            <div className="chain-link" aria-hidden="true">
              <span className="chain-packet" style={{ animationDelay: `${i * 0.45}s` }} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function CaseFile({ p, index }) {
  return (
    <article className="case">
      <SpotlightCard className="hud case-card" spotlightColor="rgba(0, 255, 65, 0.16)" intensity={0.22} spotlightSize={520}>
        <div className="case-inner">
          <header className="case-head">
            <div className="case-id">
              <span>{p.id}</span>
              <span className={`sev sev-${p.severity.toLowerCase()}`}>{p.severity}</span>
            </div>
            <span className="case-period">{p.period}</span>
          </header>

          <div className="case-title-row">
            <div>
              <h3 className="case-name">{p.name}</h3>
              <p className="case-tag">{p.tagline}</p>
            </div>
            <div className="case-metric">
              <span className="cm-v">{p.metric.value}</span>
              <span className="cm-l">{p.metric.label}</span>
            </div>
          </div>

          <p className="case-summary">{p.summary}</p>

          <AttackChain chain={p.chain} />

          <div className="case-body">
            <ul className="case-points">
              {p.points.map((pt, i) => (
                <li key={i}>
                  <span className="cp-i">›</span>
                  {pt}
                </li>
              ))}
            </ul>
            <div className="case-threats">
              <div className="ct-head">THREATS MODELLED</div>
              {p.attacks.map(a => (
                <div className="ct-row" key={a}>
                  <span className="ct-x">✕</span>
                  <span className="ct-name">{a}</span>
                  <span className="ct-s">MITIGATED</span>
                </div>
              ))}
            </div>
          </div>

          <footer className="case-stack">
            {p.stack.map(s => (
              <span className="tag" key={s}>
                {s}
              </span>
            ))}
            <span className="case-count">
              {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </span>
          </footer>
        </div>
      </SpotlightCard>
    </article>
  )
}

export default function Projects() {
  const root = useRef(null)
  const track = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Desktop: pin the section and scroll the case files horizontally.
      mm.add('(min-width: 1025px) and (prefers-reduced-motion: no-preference)', () => {
        const distance = () => track.current.scrollWidth - window.innerWidth
        const tween = gsap.to(track.current, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: '.proj-pin',
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        })
        gsap.to('.proj-progress-fill', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: '.proj-pin', start: 'top top', end: () => `+=${distance()}`, scrub: true, invalidateOnRefresh: true },
        })
        gsap.utils.toArray('.case').forEach(el => {
          gsap.from(el.querySelectorAll('.chain-node'), {
            autoAlpha: 0,
            y: 16,
            stagger: 0.08,
            duration: 0.5,
            scrollTrigger: { trigger: el, containerAnimation: tween, start: 'left 75%' },
          })
        })
      })

      // Mobile / reduced motion: simple stacked reveal.
      mm.add('(max-width: 1024px), (prefers-reduced-motion: reduce)', () => {
        gsap.utils.toArray('.case').forEach(el => {
          gsap.from(el, { autoAlpha: 0, y: 50, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } })
        })
      })
    },
    { scope: root }
  )

  return (
    <section id="projects" className="projects" ref={root}>
      <div className="proj-pin">
        <div className="proj-track" ref={track}>
          <div className="proj-intro">
            <span className="eyebrow">03 / case files</span>
            <div className="proj-glitch">
              <GlitchText speed={0.6} enableShadows shadowColors={['#ff3333', '#00e5ff']} intensity={0.45} offset={6} className="proj-glitch-text">
                CLASSIFIED
              </GlitchText>
            </div>
            <h2 className="h2">
              Research that <span className="accent">attacks</span> AI
              <br />
              <span className="outline">so it can be trusted.</span>
            </h2>
            <p className="lead">
              Three systems built around the newest attack surface in security: LLMs, retrieval pipelines and autonomous agents. Each one is
              offensive by design — I simulate the attack, then build the defense.
            </p>
            <div className="proj-hint">
              <span>SCROLL</span>
              <span className="proj-hint-line" />
              <span>→</span>
            </div>
          </div>

          {projects.map((p, i) => (
            <CaseFile p={p} index={i} key={p.id} />
          ))}
        </div>
        <div className="proj-progress" aria-hidden="true">
          <div className="proj-progress-fill" />
        </div>
      </div>
    </section>
  )
}
