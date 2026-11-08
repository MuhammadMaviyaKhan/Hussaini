import { Link } from 'react-router-dom'
import { ArrowUpRight, Clock } from 'lucide-react'

export default function SupplicationCard({ item, index = 0 }) {
  return (
    <Link
      to={`/${item.type === 'ziyarat' ? 'ziyarat' : 'duas'}/${item.slug}`}
      className="supplication-card"
      style={{ '--card-index': index }}
    >
      <div className="supplication-card__top">
        <span className="tag tag--gold">{item.type === 'ziyarat' ? 'Ziyarat' : 'Dua'}</span>
        <ArrowUpRight size={18} className="supplication-card__arrow" aria-hidden="true" />
      </div>
      <div className="supplication-card__arabic arabic" dir="rtl">{item.arabicTitle}</div>
      <h3 className="supplication-card__title">{item.title}</h3>
      <p className="supplication-card__subtitle">{item.subtitle}</p>
      <p className="supplication-card__summary">{item.summary}</p>
      <div className="supplication-card__footer">
        <span>{item.attributedTo.replace(' (a)', '').replace(' (aj)', '')}</span>
        <span className="supplication-card__time"><Clock size={13} /> {item.readingTime.replace(' · selected passages', '').replace(' · complete in this edition', '')}</span>
      </div>
    </Link>
  )
}
