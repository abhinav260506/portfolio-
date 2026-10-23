import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import CountUp from '../components/reactbits/CountUp/CountUp'
import { profile, stats, languages } from '../data'
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
      gsap.from('.stat', {
        y: 40,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.stats', start: 'top 85%' },
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
        <div className="stats">
          {stats.map(s => (
            <div className="stat" key={s.label}>
              <div className="stat-v">
                {s.prefix}
                <CountUp to={s.value} duration={2.2} />
                {s.suffix}
              </div>
              <div className="stat-l">{s.label}</div>
            </div>
          ))}
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
              <span>~/profile.json</span>
              <span className="wt-hash">utf-8 · read-only</span>
            </div>
            <pre className="wt-body">
              <span className="p">$</span> cat profile.json{'\n'}
              {'{'}
              {'\n  '}
              <span className="k">"name"</span>: <span className="s">"{profile.name}"</span>,{'\n  '}
              <span className="k">"focus"</span>: [<span className="s">"VA/PT"</span>, <span className="s">"LLM Red Teaming"</span>, <span className="s">"AI Security"</span>],{'\n  '}
              <span className="k">"currently"</span>: <span className="s">"B.Tech CSE @ VIT Chennai"</span>,{'\n  '}
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
