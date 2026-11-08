import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Compass } from 'lucide-react'
import Seo from '../components/Seo'
import Ornament from '../components/Ornament'
import GeometricPattern from '../components/GeometricPattern'

const suggestions = [
  { label: 'The 14 Masoomeen', to: '/masoomeen' },
  { label: 'Read a dua', to: '/duas' },
  { label: 'Karbala history', to: '/karbala' },
  { label: 'The Qur’an', to: '/quran' },
]

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="The page you were looking for could not be found." />
      <section className="not-found">
        <GeometricPattern className="not-found__pattern" opacity={0.12} />
        <div className="container not-found__inner">
          <span className="not-found__code arabic" dir="rtl" lang="ar">٤٠٤</span>
          <span className="not-found__eyebrow"><Compass size={14} /> A turn in the path</span>
          <h1 className="display">The page has <em>wandered.</em></h1>
          <p className="not-found__arabic arabic" dir="rtl" lang="ar">
            الصَّفْحَةُ الَّتِي تَبْحَثُ عَنْهَا غَيْرُ مَوْجُودَة
          </p>
          <p className="not-found__text">
            What you were looking for is not here — perhaps a mistyped address, a page moved, or a
            link that has aged. Return to the sanctuary, or begin again with one of these paths.
          </p>
          <div className="not-found__actions">
            <Link to="/" className="btn btn--gold"><ArrowLeft size={16} /> Return home</Link>
            <Link to="/contact" className="btn btn--ghost">Report a broken link</Link>
          </div>
          <Ornament />
          <div className="not-found__links">
            {suggestions.map((item) => (
              <Link key={item.to} to={item.to}>
                {item.label} <ArrowUpRight size={13} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
