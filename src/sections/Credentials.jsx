import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { certifications, education, platforms } from '../data'
import './Credentials.css'

export default function Credentials() {
  const root = useRef(null)

  useGSAP(
    () => {
      gsap.from('.cred-row', {
        autoAlpha: 0,
        y: 30,
        stagger: 0.08,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.cred-list', start: 'top 80%' },
      })
      gsap.from('.edu-item', {
        autoAlpha: 0,
        x: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.edu', start: 'top 80%' },
      })
      gsap.from('.platform-item', {
        autoAlpha: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.platforms-box', start: 'top 85%' },
      })
    },
    { scope: root }
  )

  return (
    <section id="credentials" className="section credentials" ref={root}>
      <div className="container cred-grid">
        <div>
          <div className="section-head">
            <span className="eyebrow">05 / credentials</span>
            <h2 className="h2">
              Verified <span className="accent">&amp; signed.</span>
            </h2>
          </div>
          <ol className="cred-list">
            {certifications.map((c, i) => {
              const Tag = c.url ? 'a' : 'div'
              return (
                <li key={c.title}>
                  <Tag
                    className={`cred-row ${c.url ? 'cursor-target' : ''}`}
                    {...(c.url ? { href: c.url, target: '_blank', rel: 'noreferrer', 'data-cursor-label': 'verify' } : {})}
                  >
                    <span className="cred-i">{String(i + 1).padStart(2, '0')}</span>
                    <span className="cred-main">
                      <span className="cred-title">{c.title}</span>
                      <span className="cred-issuer">{c.issuer}</span>
                    </span>
                    <span className={`cred-status ${c.url ? 'ok' : ''}`}>{c.url ? 'VERIFY ↗' : 'COMPLETED'}</span>
                  </Tag>
                </li>
              )
            })}
          </ol>
        </div>

        <aside className="cred-aside">
          <div className="platforms-box">
            <div className="platforms-head">
              <span>ARENA // HANDS-ON LABS</span>
              <span className="platforms-sub">ACTIVE</span>
            </div>
            <div className="platforms-list">
              {platforms.map(p => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="platform-item cursor-target"
                  data-cursor-label="view lab"
                >
                  <div className="platform-top">
                    <span className="platform-tag">{p.tag}</span>
                    <span className="platform-badge">{p.badge}</span>
                  </div>
                  <div className="platform-name">{p.name}</div>
                  <div className="platform-role">{p.role}</div>
                  <div className="platform-stats">{p.stats}</div>
                  <div className="platform-foot">
                    <span className="platform-handle">@{p.handle}</span>
                    <span className="platform-link">VIEW PROFILE ↗</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="edu">
            <div className="edu-head">EDUCATION.LOG</div>
            {education.map(e => (
              <div className="edu-item" key={e.school}>
                <div className="edu-period">{e.period}</div>
                <div className="edu-school">{e.school}</div>
                <div className="edu-detail">{e.detail}</div>
                <div className="edu-foot">
                  <span className="edu-score">{e.score}</span>
                  <span className="edu-place">{e.place}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  )
}
