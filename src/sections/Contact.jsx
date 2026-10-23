import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import LetterGlitch from '../components/reactbits/LetterGlitch/LetterGlitch'
import { profile, projects, skills, certifications, experience } from '../data'
import { scrollTo, prefersReducedMotion } from '../lib/smooth'
import './Contact.css'

const HELP = [
  ['whoami', 'who is behind this terminal'],
  ['experience', 'field engagements'],
  ['projects', 'list case files'],
  ['skills', 'dump the arsenal'],
  ['certs', 'verified credentials'],
  ['contact', 'secure comms channels'],
  ['resume', 'download résumé (PDF)'],
  ['hire', 'initiate recruitment protocol'],
  ['clear', 'clear the screen'],
]

const out = (text, cls = '') => ({ kind: 'out', text, cls })

function run(raw) {
  const cmd = raw.trim().toLowerCase()
  if (!cmd) return []
  switch (cmd) {
    case 'help':
    case '?':
      return [out('available commands:', 'dim'), ...HELP.map(([c, d]) => out(`  ${c.padEnd(12)} ${d}`))]
    case 'whoami':
      return [out(profile.name, 'g'), out(profile.roles.join(' · ')), out(profile.summary, 'dim')]
    case 'experience':
    case 'exp':
      return experience.flatMap(x => [out(`${x.role} @ ${x.company} — ${x.location}`, 'g'), ...x.points.map(p => out(`  › ${p}`, 'dim'))])
    case 'projects':
    case 'ls':
      return projects.flatMap(p => [
        out(`${p.id}  ${p.name.padEnd(24)} [${p.severity}] ${p.status ? `(${p.status})` : ''}`, p.severity === 'CRITICAL' ? 'r' : 'g'),
        out(`   › ${p.tagline}`, 'dim'),
        out(`   › repo: ${p.github}`, 'dim'),
      ])
    case 'skills':
      return skills.map(s => out(`[${s.code}] ${s.items.join(', ')}`))
    case 'certs':
      return certifications.map(c => out(`✓ ${c.title} — ${c.issuer}`, 'g'))
    case 'contact':
      return [out(`email     ${profile.email}`), out(`linkedin  ${profile.linkedin}`), out(`github    ${profile.github}`)]
    case 'resume':
      window.open(profile.resume, '_blank', 'noopener')
      return [out('opening résumé in a new tab…', 'g')]
    case 'hire':
    case 'sudo hire':
    case 'sudo hire abhinav':
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent("Let's talk — security role")}`
      return [out('[sudo] privilege escalation successful ✓', 'g'), out('launching mail client → ' + profile.email)]
    case 'sudo':
    case 'sudo su':
    case 'rm -rf /':
      return [out('nice try. this incident has been logged.', 'r'), out("try 'hire' instead.", 'dim')]
    default:
      return [out(`command not found: ${cmd} — type 'help'`, 'r')]
  }
}

function Terminal() {
  const [history, setHistory] = useState([
    out('secure shell v4.2 — connection encrypted', 'dim'),
    out("type 'help' to list commands, or 'hire' to skip the formalities.", 'g'),
  ])
  const [value, setValue] = useState('')
  const [past, setPast] = useState([])
  const [cursor, setCursor] = useState(-1)
  const body = useRef(null)
  const input = useRef(null)

  useEffect(() => {
    body.current?.scrollTo({ top: body.current.scrollHeight })
  }, [history])

  const submit = e => {
    e.preventDefault()
    const cmd = value
    if (cmd.trim().toLowerCase() === 'clear') {
      setHistory([])
    } else {
      setHistory(h => [...h, { kind: 'cmd', text: cmd }, ...run(cmd)])
    }
    if (cmd.trim()) setPast(p => [cmd, ...p])
    setCursor(-1)
    setValue('')
  }

  const onKey = e => {
    if (e.key === 'ArrowUp' && past.length) {
      e.preventDefault()
      const n = Math.min(cursor + 1, past.length - 1)
      setCursor(n)
      setValue(past[n])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const n = cursor - 1
      setCursor(n)
      setValue(n < 0 ? '' : past[n])
    }
  }

  return (
    <div className="term corner-box" onClick={() => input.current?.focus({ preventScroll: true })}>
      <div className="term-bar">
        <span className="dots">
          <i />
          <i />
          <i />
        </span>
        <span>guest@abhinav-portfolio: ~</span>
        <span className="term-live">INTERACTIVE</span>
      </div>
      <div className="term-body" ref={body} data-lenis-prevent>
        {history.map((l, i) =>
          l.kind === 'cmd' ? (
            <div key={i} className="tl cmd">
              <span className="ps">guest@sec:~$</span> {l.text}
            </div>
          ) : (
            <div key={i} className={`tl ${l.cls}`}>
              {l.text}
            </div>
          )
        )}
        <form onSubmit={submit} className="tl cmd term-form">
          <label htmlFor="term-in" className="ps">
            guest@sec:~$
          </label>
          <input
            id="term-in"
            ref={input}
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={onKey}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
            aria-label="Terminal command"
          />
        </form>
      </div>
      <div className="term-chips">
        {['whoami', 'projects', 'skills', 'certs', 'hire'].map(c => (
          <button
            key={c}
            className="tag cursor-target"
            onClick={e => {
              e.stopPropagation()
              setHistory(h => [...h, { kind: 'cmd', text: c }, ...run(c)])
            }}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  )
}

const ICONS = {
  mail: 'M4 6h16v12H4z M4 7l8 6 8-6',
  linkedin: 'M6 9v9 M6 6v.01 M10 18v-5a3 3 0 0 1 6 0v5 M10 9v9',
  github:
    'M9 19c-4 1.5-4-2-6-2.5m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21',
  file: 'M14 3H6v18h12V7z M14 3v4h4 M9 13h6 M9 17h6',
}

const Icon = ({ d }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" aria-hidden="true">
    <path d={d} />
  </svg>
)

export default function Contact() {
  const root = useRef(null)

  useGSAP(
    () => {
      gsap.from('.contact-title .line-inner', {
        yPercent: 110,
        duration: 1.1,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.contact-title', start: 'top 85%' },
      })
      gsap.from('.c-link', {
        autoAlpha: 0,
        y: 24,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.c-links', start: 'top 90%' },
      })
    },
    { scope: root }
  )

  const links = [
    { k: 'EMAIL', v: profile.email, href: `mailto:${profile.email}`, icon: ICONS.mail },
    { k: 'LINKEDIN', v: 'venkata-abhinav-kumar-gupta', href: profile.linkedin, icon: ICONS.linkedin },
    { k: 'GITHUB', v: 'abhinav260506', href: profile.github, icon: ICONS.github },
    { k: 'RÉSUMÉ', v: 'Download PDF', href: profile.resume, icon: ICONS.file },
  ]

  return (
    <section id="contact" className="section contact" ref={root}>
      <div className="contact-bg" aria-hidden="true">
        <LetterGlitch
          glitchColors={['#0b3d1a', '#00ff41', '#0a7a2a']}
          baseColor="#0b2414"
          fontSize={14}
          glitchAmount={0.4}
          speed={prefersReducedMotion() ? 0 : 0.8}
          centerFade={0.55}
          edgeFade={0.3}
          interactive
          clickEffect="burst"
          backgroundColor="#000000"
          intro={false}
        />
      </div>
      <div className="container contact-inner">
        <div className="contact-left">
          <span className="eyebrow">06 / establish contact</span>
          <h2 className="contact-title">
            <span className="line">
              <span className="line-inner">Let&apos;s secure</span>
            </span>
            <span className="line">
              <span className="line-inner accent">what matters.</span>
            </span>
          </h2>
          <p className="lead">
            Open to security engineering, penetration testing, red-team and AI-security roles and internships. If you need someone who thinks
            like an attacker and builds like an engineer — the channel is open.
          </p>
          <div className="contact-ctas">
            <a className="btn solid cursor-target" data-cursor-label="send" href={`mailto:${profile.email}`}>
              Hire Abhinav
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <button className="btn cursor-target" onClick={() => scrollTo('#top')}>
              Back to top ↑
            </button>
          </div>
        </div>
        <Terminal />
      </div>

      <div className="container c-links-wrap">
        <div className="c-links">
          {links.map(l => (
            <a
              key={l.k}
              className="c-link cursor-target"
              href={l.href}
              target={l.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noreferrer"
              data-cursor-label={l.k.toLowerCase()}
            >
              <Icon d={l.icon} />
              <span className="c-k">{l.k}</span>
              <span className="c-v">{l.v}</span>
              <span className="c-arrow">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
