import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export default function MasoomCard({ person, index = 0 }) {
  return (
    <Link to={`/masoomeen/${person.slug}`} className="masoom-card" style={{ '--card-index': index }}>
      <span className="masoom-card__order">{String(person.order).padStart(2, '0')}</span>
      <div className="masoom-card__seal" aria-hidden="true">
        <svg viewBox="0 0 80 80" fill="none">
          <path d="M40 4 48 26 70 18 62 40 76 48 54 48 62 70 40 60 18 70 26 48 4 40 22 32 18 10 40 24Z" stroke="currentColor" strokeWidth=".9" />
          <circle cx="40" cy="40" r="22" stroke="currentColor" strokeWidth=".7" opacity=".55" />
          <circle cx="40" cy="40" r="4" fill="currentColor" opacity=".8" />
        </svg>
      </div>
      <div className="masoom-card__body">
        <span className="masoom-card__era">{person.era}</span>
        <h3 className="masoom-card__name">{person.shortName}</h3>
        <p className="masoom-card__title">{person.title}</p>
        <p className="masoom-card__arabic arabic" dir="rtl">{person.arabicName.split(' عَلَيْهِ')[0].split(' عَلَيْهَا')[0].split(' عَجَّلَ')[0]}</p>
        <div className="masoom-card__meta">
          <span>{person.birth.split(',')[0]}</span>
          <span>{person.death === 'In occultation; will return' ? 'In occultation' : person.death.split(',')[0]}</span>
        </div>
      </div>
      <ArrowUpRight className="masoom-card__arrow" size={18} aria-hidden="true" />
    </Link>
  )
}
