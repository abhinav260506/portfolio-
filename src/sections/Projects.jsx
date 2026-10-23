import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SpotlightCard from '../components/reactbits/SpotlightCard/SpotlightCard'
import GlitchText from '../components/reactbits/GlitchText/GlitchText'
import { projects, projectCategories, researchStatement } from '../data'
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

function CaseBriefModal({ project, onClose }) {
  if (!project || !project.brief) return null

  const { brief } = project

  return (
    <div className="case-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="case-modal-backdrop" onClick={onClose} />
      <div className="case-modal-panel hud">
        <header className="cmp-header">
          <div className="cmp-eyebrow">
            <span className="pulse-dot" />
            <span>DECLASSIFIED CASE BRIEF // {project.id}</span>
            <span className={`sev sev-${project.severity.toLowerCase()}`}>{project.severity}</span>
            <span className="case-status-badge">{project.status}</span>
          </div>
          <button type="button" className="cmp-close cursor-target" onClick={onClose} aria-label="Close brief" data-cursor-label="close">
            <span>[ ✕ ESC ]</span>
          </button>
        </header>

        <div className="cmp-scroll">
          <div className="cmp-hero">
            <h2 id="modal-title" className="cmp-title">{project.name}</h2>
            <p className="cmp-tagline">{project.tagline}</p>
            <div className="cmp-meta-bar">
              <span><b>TIMELINE:</b> {project.period}</span>
              <span><b>STACK:</b> {project.stack.join(', ')}</span>
              <span><b>PRIMARY METRIC:</b> <span className="accent">{project.metric.value} {project.metric.label}</span></span>
            </div>
          </div>

          {/* Section 01: The Attack & The Loophole */}
          <section className="cmp-section">
            <div className="cmp-sec-head">
              <span className="cmp-sec-idx">01</span>
              <h3>THE ATTACK SCENARIO &amp; THE LOOPHOLE</h3>
            </div>
            <div className="cmp-box alert-box">
              <div className="cmp-box-title">{brief.problem.title}</div>
              <p className="cmp-box-text">{brief.problem.scenario}</p>
              {brief.problem.challenges && (
                <div className="cmp-challenges">
                  <div className="cmp-sub-head">CRITICAL VULNERABILITY CHALLENGES:</div>
                  <ul>
                    {brief.problem.challenges.map((ch, idx) => (
                      <li key={idx}>
                        <span className="ct-x">✕</span>
                        <span>{ch}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          {/* Section 02: Architecture & How It Works */}
          <section className="cmp-section">
            <div className="cmp-sec-head">
              <span className="cmp-sec-idx">02</span>
              <h3>SYSTEM ARCHITECTURE &amp; DEFENSIVE PIPELINE</h3>
            </div>
            <div className="cmp-box">
              <div className="cmp-box-title">{brief.solution.title}</div>
              <div className="cmp-steps">
                {brief.solution.architecture.map(st => (
                  <div className="cmp-step" key={st.step}>
                    <div className="cmp-step-badge">{st.step}</div>
                    <div className="cmp-step-body">{st.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 03: Demonstrated Impact */}
          <section className="cmp-section">
            <div className="cmp-sec-head">
              <span className="cmp-sec-idx">03</span>
              <h3>DEMONSTRATED BENCHMARKS &amp; DEFENSIVE VALUE</h3>
            </div>
            <div className="cmp-box metrics-box">
              <div className="cmp-box-title">{brief.impact.title}</div>
              <ul className="cmp-metrics-list">
                {brief.impact.metrics.map((m, idx) => (
                  <li key={idx}>
                    <span className="cp-i">›</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Modal Actions */}
          <footer className="cmp-footer">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="case-btn cursor-target" data-cursor-label="repo">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>SOURCE REPOSITORY ↗</span>
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer" className="case-btn ghost cursor-target" data-cursor-label="poc">
                <span>VIEW REPO DOCS / POC ↗</span>
              </a>
            )}
            <button type="button" className="case-btn ghost cursor-target" onClick={onClose} data-cursor-label="close">
              <span>CLOSE BRIEF [ESC]</span>
            </button>
          </footer>
        </div>
      </div>
    </div>
  )
}

function CaseFile({ p, index, onOpenBrief }) {
  return (
    <article className="case">
      <SpotlightCard className="hud case-card" spotlightColor="rgba(0, 255, 65, 0.16)" intensity={0.22} spotlightSize={520}>
        <div className="case-inner">
          <header className="case-head">
            <div className="case-id">
              <span>{p.id}</span>
              <span className={`sev sev-${p.severity.toLowerCase()}`}>{p.severity}</span>
              {p.status && <span className="case-status-badge">{p.status}</span>}
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

          <div className="case-actions">
            {p.brief && (
              <button
                type="button"
                className="case-btn brief-btn cursor-target"
                onClick={() => onOpenBrief(p)}
                data-cursor-label="brief"
              >
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                <span>DECLASSIFY BRIEF ↓</span>
              </button>
            )}
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                className="case-btn cursor-target"
                data-cursor-label="repo"
              >
                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>SOURCE REPO ↗</span>
              </a>
            )}
            {p.demo && (
              <a
                href={p.demo}
                target="_blank"
                rel="noreferrer"
                className="case-btn ghost cursor-target"
                data-cursor-label="poc"
              >
                <span>VIEW ARCHITECTURE / POC ↗</span>
              </a>
            )}
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
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [activeBrief, setActiveBrief] = useState(null)

  const filteredProjects = selectedCategory === 'ALL'
    ? projects
    : projects.filter(p => p.category === selectedCategory)

  // Close modal on Escape
  useEffect(() => {
    const handleKey = e => {
      if (e.key === 'Escape') setActiveBrief(null)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeBrief) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeBrief])

  const handleCategoryChange = catId => {
    setSelectedCategory(catId)
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 120)
  }

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Desktop: pin the section and scroll the case files horizontally.
      mm.add('(min-width: 1025px) and (prefers-reduced-motion: no-preference)', () => {
        if (!track.current) return
        const distance = () => Math.max(0, track.current.scrollWidth - window.innerWidth)
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
    { scope: root, dependencies: [selectedCategory] }
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
              Research that <span className="accent">attacks</span> AI &amp; systems
              <br />
              <span className="outline">so they can be hardened.</span>
            </h2>
            <p className="lead">
              Offensive by design — I simulate adversarial vectors across LLMs, multi-agent systems, and cyber-physical infrastructure, then engineer evidence-backed defenses.
            </p>

            {/* Research & Academic Statement Block */}
            <div className="research-box hud">
              <div className="rb-head">
                <span className="pulse-dot" />
                <span>RESEARCH FOCUS &amp; METHODOLOGY</span>
              </div>
              <p className="rb-desc">{researchStatement.statement}</p>
              <div className="rb-pills">
                {researchStatement.focusAreas.map(f => (
                  <span className="rb-pill" key={f}>
                    › {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="proj-filter-wrap">
              <div className="pf-label">FILTER CLASSIFICATION:</div>
              <div className="proj-filters">
                {projectCategories.map(c => {
                  const count = c.id === 'ALL' ? projects.length : projects.filter(p => p.category === c.id).length
                  return (
                    <button
                      key={c.id}
                      type="button"
                      className={`pf-btn cursor-target ${selectedCategory === c.id ? 'active' : ''}`}
                      onClick={() => handleCategoryChange(c.id)}
                      data-cursor-label="filter"
                    >
                      <span>{c.label}</span>
                      <span className="pf-count">{count}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="proj-hint">
              <span>SCROLL CASE FILES</span>
              <span className="proj-hint-line" />
              <span>→</span>
            </div>
          </div>

          {filteredProjects.map((p, i) => (
            <CaseFile p={p} index={i} key={p.id} onOpenBrief={setActiveBrief} />
          ))}
        </div>
        <div className="proj-progress" aria-hidden="true">
          <div className="proj-progress-fill" />
        </div>
      </div>

      {/* Declassified Case Brief Modal */}
      {activeBrief && <CaseBriefModal project={activeBrief} onClose={() => setActiveBrief(null)} />}
    </section>
  )
}
