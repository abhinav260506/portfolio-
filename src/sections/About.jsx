import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { profile, education, languages } from '../data'
import './About.css'

const MANIFESTO =
  'Every system tells a story about how it can fail. I read those stories — in web apps, networks, cloud configs and now in the prompts, embeddings and agents behind modern AI — and turn them into fixes before an attacker does.'

export default function About() {
  const root = useRef(null)

  useGSAP(
    () => {
      gsap.fromTo(
        '.manifesto .w',
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: { trigger: '.manifesto', start: 'top 80%', end: 'bottom 45%', scrub: true },
        }
      )
      gsap.from('.edu-box', {
        y: 40,
        autoAlpha: 0,
        stagger: 0.09,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.edu-strip', start: 'top 85%' },
      })
      gsap.from('.whoami-term', {
        clipPath: 'inset(0 0 100% 0)',
        duration: 1.2,
        ease: 'expo.inOut',
        scrollTrigger: { trigger: '.whoami-term', start: 'top 80%' },
      })
    },
    { scope: root }
  )

  return (
    <section id="about" className="section about" ref={root}>
      <div className="container">
        <div className="edu-strip" id="education" aria-label="Education details">
          <div className="edu-strip-bar">
            <div className="esb-left">
              <span className="pulse-dot" />
              <span className="esb-title">ACADEMIC_LOG // EDUCATION.LOG</span>
            </div>
            <span className="esb-badge">VERIFIED CREDENTIALS</span>
          </div>

          <div className="edu-strip-grid">
            {education.map((edu, idx) => (
              <div className="edu-box corner-box" key={edu.school}>
                <div className="eb-header">
                  <span className="eb-idx">0{idx + 1} // RECORD</span>
                  <span className={`eb-status ${idx === 0 ? 'is-current' : ''}`}>
                    {idx === 0 ? 'CURRENT DEGREE' : 'COMPLETED'}
                  </span>
                </div>

                <div className="eb-score-row">
                  <div className="eb-score">{edu.score}</div>
                  <div className="eb-score-type">
                    {idx === 0 ? 'CURRENT CGPA' : idx === 1 ? 'INTERMEDIATE' : 'BOARD GPA'}
                  </div>
                </div>

                <div className="eb-school">{edu.school}</div>
                <div className="eb-detail">{edu.detail}</div>

                <div className="eb-footer">
                  <span className="eb-period">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    {edu.period}
                  </span>
                  <span className="eb-place">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {edu.place}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="about-grid">
          <div>
            <div className="section-head">
              <span className="eyebrow">01 / whoami</span>
              <h2 className="h2">
                Offense-minded.
                <br />
                <span className="accent">AI-native.</span>
              </h2>
            </div>
            <p className="manifesto">
              {MANIFESTO.split(' ').map((w, i) => (
                <span className="w" key={i}>
                  {w}{' '}
                </span>
              ))}
            </p>
          </div>

          <div className="whoami-term corner-box">
            <div className="wt-bar">
              <div className="wt-bar-left">
                <img src="/profile.jpg" alt="Abhinav Gunda" className="wt-avatar" />
                <span>~/profile.json</span>
              </div>
              <span className="wt-hash">utf-8 · verified</span>
            </div>
            <pre className="wt-body">
              <span className="p">$</span> cat profile.json{'\n'}
              {'{'}
              {'\n  '}
              <span className="k">"name"</span>: <span className="s">"{profile.name}"</span>,{'\n  '}
              <span className="k">"identity"</span>: <span className="s">"VERIFIED_OPERATIVE"</span>,{'\n  '}
              <span className="k">"focus"</span>: [<span className="s">"VA/PT"</span>, <span className="s">"LLM Red Teaming"</span>, <span className="s">"AI Security"</span>],{'\n  '}
              <span className="k">"education"</span>: <span className="s">"B.Tech CSE @ VIT Chennai (CGPA 7.95)"</span>,{'\n  '}
              <span className="k">"experience"</span>: <span className="s">"Security Engineer Intern"</span>,{'\n  '}
              <span className="k">"base"</span>: <span className="s">"{profile.location}"</span>,{'\n  '}
              <span className="k">"languages"</span>: [{languages.map((l, i) => (
                <span key={l}>
                  <span className="s">"{l.split(' ')[0]}"</span>
                  {i < languages.length - 1 ? ', ' : ''}
                </span>
              ))}],{'\n  '}
              <span className="k">"status"</span>: <span className="g">"open_to_work"</span>
              {'\n}'}
              {'\n'}
              <span className="p">$</span> <span className="blink">█</span>
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}
