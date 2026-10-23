import { useEffect, useState } from 'react'
import { scrollTo } from '../lib/smooth'
import { profile } from '../data'
import './Nav.css'

const LINKS = [
  ['01', 'whoami', '#about'],
  ['02', 'engagements', '#experience'],
  ['03', 'case-files', '#projects'],
  ['04', 'arsenal', '#skills'],
  ['05', 'credentials', '#credentials'],
  ['06', 'contact', '#contact'],
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [time, setTime] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fmt = () =>
      setTime(
        new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit' })
      )
    fmt()
    const id = setInterval(fmt, 1000)
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearInterval(id)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const go = (e, href) => {
    e.preventDefault()
    setOpen(false)
    scrollTo(href)
  }

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav-row">
        <a href="#top" className="nav-brand cursor-target" data-cursor-label="root" onClick={e => go(e, '#top')}>
          <span className="nav-prompt">root@{profile.handle}</span>
          <span className="nav-path">:~#</span>
          <span className="blink">_</span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {LINKS.map(([n, label, href]) => (
            <a key={href} href={href} className="cursor-target" onClick={e => go(e, href)}>
              <span className="n">{n}</span>
              {label}
            </a>
          ))}
        </nav>

        <div className="nav-right">
          <span className="nav-clock" title="India Standard Time">
            IST {time}
          </span>
          <a className="nav-status cursor-target" data-cursor-label="hire" href="#contact" onClick={e => go(e, '#contact')}>
            <span className="pulse-dot" />
            OPEN TO WORK
          </a>
          <button className="nav-burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(o => !o)}>
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className="nav-drawer" aria-hidden={!open}>
        {LINKS.map(([n, label, href]) => (
          <a key={href} href={href} tabIndex={open ? 0 : -1} onClick={e => go(e, href)}>
            <span className="n">{n}</span>/{label}
          </a>
        ))}
      </div>
    </header>
  )
}
