import { profile } from '../data'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-row">
        <span>
          © {new Date().getFullYear()} {profile.short}
        </span>
        <span className="footer-mid">
          <span className="pulse-dot" /> all systems nominal · no vulnerabilities were harmed in the making of this site
        </span>
        <span>Built with React · GSAP · Lenis · React Bits</span>
      </div>
    </footer>
  )
}
