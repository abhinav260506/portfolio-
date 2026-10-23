import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { prefersReducedMotion } from '../lib/smooth'
import './Boot.css'

const LINES = [
  ['[  OK  ]', 'Initializing secure kernel modules'],
  ['[  OK  ]', 'Mounting /dev/offensive-security'],
  ['[  OK  ]', 'Loading payloads: recon, vapt, llm-redteam'],
  ['[ WARN ]', 'Untrusted prompt detected → quarantined by Surgical-Guard'],
  ['[  OK  ]', 'RAGShield: 4/4 pipeline layers scanned'],
  ['[  OK  ]', 'Establishing encrypted channel (TLS 1.3 · X25519)'],
  ['[  OK  ]', 'Identity verified: abhinav@sec-ops'],
]

export default function Boot({ onDone }) {
  const root = useRef(null)

  useGSAP(
    () => {
      const finish = () => onDone?.()
      if (prefersReducedMotion()) {
        gsap.set(root.current, { autoAlpha: 0, delay: 0.3, onComplete: finish })
        return
      }
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
      tl.from('.boot-logo', { autoAlpha: 0, y: 12, duration: 0.4 })
        .to('.boot-line', { autoAlpha: 1, duration: 0.01, stagger: 0.16 }, '+=0.1')
        .to('.boot-bar-fill', { scaleX: 1, duration: LINES.length * 0.16 + 0.2, ease: 'none' }, '<')
        .to(
          '.boot-pct',
          {
            innerText: 100,
            snap: { innerText: 1 },
            duration: LINES.length * 0.16 + 0.2,
            ease: 'none',
          },
          '<'
        )
        .to('.boot-granted', { autoAlpha: 1, scale: 1, duration: 0.25, ease: 'back.out(2)' }, '+=0.1')
        .to(root.current, { clipPath: 'inset(0 0 100% 0)', duration: 0.8, ease: 'expo.inOut' }, '+=0.45')
        .add(finish, '-=0.35')

      const skip = () => tl.progress(1)
      window.addEventListener('keydown', skip, { once: true })
      root.current.addEventListener('click', skip, { once: true })
      return () => window.removeEventListener('keydown', skip)
    },
    { scope: root }
  )

  return (
    <div ref={root} className="boot" role="status" aria-label="Loading portfolio">
      <div className="boot-inner">
        <div className="boot-logo">
          <span className="boot-shield" aria-hidden="true">
            <svg viewBox="0 0 64 64">
              <path d="M32 6 54 14v16c0 14-9.5 23.5-22 28C19.5 53.5 10 44 10 30V14z" />
              <path d="M22 32l7 7 13-14" />
            </svg>
          </span>
          <span>SEC-OPS // BOOT SEQUENCE v4.2</span>
        </div>
        <ul className="boot-lines">
          {LINES.map(([s, t]) => (
            <li className="boot-line" key={t}>
              <span className={s.includes('WARN') ? 'warn' : 'ok'}>{s}</span> {t}
            </li>
          ))}
        </ul>
        <div className="boot-bar">
          <div className="boot-bar-fill" />
        </div>
        <div className="boot-meta">
          <span>
            DECRYPTING <span className="boot-pct">0</span>%
          </span>
          <span className="boot-skip">press any key to skip</span>
        </div>
        <div className="boot-granted">ACCESS GRANTED</div>
      </div>
    </div>
  )
}
