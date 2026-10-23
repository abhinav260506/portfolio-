import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import SpotlightCard from '../components/reactbits/SpotlightCard/SpotlightCard'
import { experience } from '../data'
import './Experience.css'

const PHASES = ['Recon', 'Scan', 'Exploit', 'Report', 'Harden']

export default function Experience() {
  const root = useRef(null)

  useGSAP(
    () => {
      gsap.from('.xp-phase', {
        autoAlpha: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.xp-phases', start: 'top 85%' },
      })
      gsap.fromTo(
        '.xp-phases-line',
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.xp-phases', start: 'top 85%', end: 'top 45%', scrub: true } }
      )
      gsap.from('.xp-point', {
        autoAlpha: 0,
        x: -24,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.xp-card', start: 'top 70%' },
      })
    },
    { scope: root }
  )

  return (
    <section id="experience" className="section experience grid-bg" ref={root}>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">02 / engagement log</span>
          <h2 className="h2">
            In the <span className="accent">field</span>
            <span className="outline"> — VA/PT</span>
          </h2>
        </div>

        <div className="xp-phases" aria-label="Engagement methodology">
          <div className="xp-phases-line" />
          {PHASES.map((p, i) => (
            <div className="xp-phase" key={p}>
              <span className="xp-node" />
              <span className="xp-pn">0{i + 1}</span>
              <span className="xp-pl">{p}</span>
            </div>
          ))}
        </div>

        {experience.map(x => (
          <SpotlightCard key={x.company} className="hud xp-card" spotlightColor="rgba(0, 255, 65, 0.18)" intensity={0.2} spotlightSize={420}>
            <div className="xp-inner">
              <div className="xp-meta">
                <div className="xp-id">ENGAGEMENT #01 · REMOTE</div>
                <h3 className="xp-role">{x.role}</h3>
                <div className="xp-company">@ {x.company}</div>
                <div className="xp-loc">{x.location}</div>
                <div className="xp-scope">
                  <span className="xp-label">SCOPE</span>
                  {x.scope.map(s => (
                    <span className="tag" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
                <div className="xp-scope">
                  <span className="xp-label">TOOLING</span>
                  {x.tools.map(s => (
                    <span className="tag" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <ul className="xp-points">
                {x.points.map((p, i) => (
                  <li className="xp-point" key={i}>
                    <span className="xp-bullet">0x{(i + 1).toString(16).padStart(2, '0').toUpperCase()}</span>
                    <p>{p}</p>
                  </li>
                ))}
              </ul>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  )
}
