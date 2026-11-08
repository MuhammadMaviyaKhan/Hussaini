import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUp, Check, Mail, MapPin, Send } from 'lucide-react'
import { footerColumns, socialLinks, siteMeta } from '../data/site'
import GeometricPattern from './GeometricPattern'
import Ornament from './Ornament'

function InstagramIcon({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

function YoutubeIcon({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10 9.2v5.6l4.8-2.8Z" fill="currentColor" stroke="none" />
    </svg>
  )
}

function XIcon({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="M4.5 4.5 19.5 19.5M19.5 4.5 4.5 19.5" />
    </svg>
  )
}

const socialIcons = {
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  x: XIcon,
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const subscribe = (event) => {
    event.preventDefault()
    if (!email.trim()) return
    try {
      window.localStorage.setItem('hussaini:friday-list', JSON.stringify({ email: email.trim(), at: Date.now() }))
    } catch {
      // A static preview can still confirm the intent.
    }
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="site-footer">
      <div className="footer-cta">
        <GeometricPattern className="footer-cta__pattern" opacity={0.14} />
        <div className="container footer-cta__inner">
          <div>
            <span className="footer-cta__eyebrow">Continue the journey</span>
            <h2 className="display">Let the remembrance <em>continue.</em></h2>
            <p>Read, reflect, and carry the light of the Ahlulbayt into the ordinary moments of your day.</p>
          </div>
          <div className="footer-cta__actions">
            <Link to="/duas/dua-kumayl" className="btn btn--gold">Read Dua Kumayl <ArrowRight size={16} /></Link>
            <Link to="/masoomeen" className="btn btn--ghost">Meet the 14 Masoomeen</Link>
          </div>
        </div>
        <div className="footer-cta__watermark arabic" dir="rtl" aria-hidden="true">يَا حُسَيْن</div>
      </div>

      <div className="site-footer__main">
        <div className="container footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-brand__name">HUSSAINI</Link>
            <span className="footer-brand__tag">The Path of Ahlulbayt</span>
            <p>{siteMeta.description}</p>
            <div className="footer-brand__socials">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.icon]
                return (
                  <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}>
                    <Icon size={17} />
                  </a>
                )
              })}
            </div>
            <form className="footer-subscribe" onSubmit={subscribe}>
              <label htmlFor="footer-email">A Friday reflection, once a week</label>
              {subscribed ? (
                <div className="footer-subscribe__success" role="status">
                  <Check size={16} /> Your intention is recorded. Keep us in your du‘a.
                </div>
              ) : (
                <div className="footer-subscribe__field">
                  <Mail size={16} aria-hidden="true" />
                  <input
                    id="footer-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Your email address"
                    required
                  />
                  <button type="submit" aria-label="Subscribe">
                    <Send size={16} />
                  </button>
                </div>
              )}
            </form>
          </div>

          {footerColumns.map((column) => (
            <div className="footer-column" key={column.title}>
              <h3>{column.title}</h3>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="container footer-contact">
          <Ornament />
          <div className="footer-contact__items">
            <span><Mail size={14} /> {siteMeta.email}</span>
            <span><MapPin size={14} /> {siteMeta.location}</span>
          </div>
          <span className="footer-contact__arabic arabic" dir="rtl">وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ</span>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="container site-footer__bottom-inner">
          <span>© {new Date().getFullYear()} HUSSAINI · A sanctuary of knowledge and remembrance</span>
          <span className="site-footer__bottom-links">
            <Link to="/about#principles">Editorial principles</Link>
            <Link to="/credits">Image credits</Link>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
              <ArrowUp size={14} /> Top
            </button>
          </span>
        </div>
      </div>
    </footer>
  )
}
