import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  MapPin,
  Quote,
  ScrollText,
  Star,
} from 'lucide-react'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import Ornament from '../components/Ornament'
import GeometricPattern from '../components/GeometricPattern'
import { getAdjacentMasoom, getMasoom } from '../data/masoomeen'
import NotFound from './NotFound'

export default function MasoomDetail() {
  const { slug } = useParams()
  const person = getMasoom(slug)

  if (!person) return <NotFound />

  const { previous, next } = getAdjacentMasoom(slug)
  const imageAlt = `The resting place associated with ${person.englishName} — ${person.burial}.`

  return (
    <>
      <Seo
        title={person.englishName}
        description={`${person.englishName} — ${person.title}. ${person.summary}`}
      />

      <section className="masoom-hero">
        <div
          className="masoom-hero__media"
          style={{ backgroundImage: `url(${person.shrineImage})` }}
          aria-hidden="true"
        />
        <div className="masoom-hero__veil" aria-hidden="true" />
        <GeometricPattern className="masoom-hero__pattern" opacity={0.1} />
        <div className="container masoom-hero__inner">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span><span className="breadcrumb__sep">/</span><Link to="/masoomeen">The 14 Masoomeen</Link></span>
            <span><span className="breadcrumb__sep">/</span><span aria-current="page">{person.englishName}</span></span>
          </nav>

          <div className="masoom-hero__content">
            <div className="masoom-hero__order" aria-hidden="true">
              <span>{String(person.order).padStart(2, '0')}</span>
              <small>of 14</small>
            </div>
            <div className="masoom-hero__titles">
              <span className="masoom-hero__eyebrow">{person.era}</span>
              <span className="masoom-hero__arabic arabic" dir="rtl" lang="ar">{person.arabicName}</span>
              <h1 className="display">{person.englishName}</h1>
              <p className="masoom-hero__urdu urdu" dir="rtl" lang="ur">{person.urduName}</p>
              <p className="masoom-hero__title"><Star size={14} /> {person.title} · {person.honorific}</p>
            </div>
          </div>

          <div className="masoom-hero__meta">
            <div>
              <span className="masoom-hero__meta-label">Born</span>
              <strong>{person.birth}</strong>
              <small>{person.birthGregorian} · {person.birthPlace}</small>
            </div>
            <div>
              <span className="masoom-hero__meta-label">Passed</span>
              <strong>{person.death}</strong>
              <small>{person.deathGregorian}{person.deathPlace ? ` · ${person.deathPlace}` : ''}</small>
            </div>
            <div>
              <span className="masoom-hero__meta-label">Resting place</span>
              <strong>{person.burial}</strong>
              <small>{person.age}</small>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--masoom-body">
        <div className="container masoom-layout">
          <aside className="masoom-aside">
            <Reveal className="masoom-facts">
              <span className="masoom-facts__eyebrow">The life in brief</span>
              <dl>
                <div><dt>Kunya</dt><dd>{person.kunya}</dd></div>
                <div><dt>Father</dt><dd>{person.father}</dd></div>
                <div><dt>Mother</dt><dd>{person.mother}</dd></div>
                <div><dt>Era</dt><dd>{person.era}</dd></div>
                <div><dt>Role</dt><dd>{person.role}</dd></div>
                <div><dt>Age</dt><dd>{person.age}</dd></div>
              </dl>
              <Ornament />
              <Link to="/masoomeen" className="text-link">
                <ArrowLeft size={14} /> All fourteen
              </Link>
            </Reveal>

            <Reveal className="masoom-aside__related" delay={0.06}>
              <span className="masoom-aside__eyebrow">Continue reading</span>
              <Link to="/hadith" className="aside-link">
                <BookOpen size={16} /> Hadith collection
                <ArrowUpRight size={14} />
              </Link>
              <Link to="/duas" className="aside-link">
                <ScrollText size={16} /> Duas & ziyarat
                <ArrowUpRight size={14} />
              </Link>
              <Link to="/calendar" className="aside-link">
                <CalendarDays size={16} /> Sacred dates
                <ArrowUpRight size={14} />
              </Link>
            </Reveal>
          </aside>

          <div className="masoom-main">
            <Reveal className="masoom-intro">
              <span className="eyebrow">Introduction</span>
              <p className="masoom-intro__summary">{person.summary}</p>
            </Reveal>

            <Reveal className="masoom-section">
              <SectionHeading
                eyebrow="Biography"
                title={<>The life and <em>context.</em></>}
              />
              <div className="prose">
                {person.biography.map((paragraph) => <p key={paragraph.slice(0, 24)}>{paragraph}</p>)}
              </div>
            </Reveal>

            <Reveal className="masoom-section">
              <SectionHeading
                eyebrow="Timeline"
                title={<>Events that <em>shaped the path.</em></>}
              />
              <div className="masoom-timeline">
                {person.events.map((event) => (
                  <div className="masoom-timeline__item" key={`${event.year}-${event.text.slice(0, 20)}`}>
                    <span className="masoom-timeline__year">{event.year}</span>
                    <span className="masoom-timeline__dot" aria-hidden="true" />
                    <p>{event.text}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="masoom-section">
              <SectionHeading
                eyebrow="Teachings"
                title={<>What the life <em>teaches.</em></>}
              />
              <div className="teaching-grid">
                {person.teachings.map((teaching, index) => (
                  <div className="teaching-card" key={teaching}>
                    <span className="teaching-card__number">0{index + 1}</span>
                    <p>{teaching}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            {person.quotes?.length > 0 && (
              <Reveal className="masoom-section">
                <SectionHeading
                  eyebrow="In their own words"
                  title={<>Words that <em>remain.</em></>}
                  intro="Each quotation is presented with its cited source. Reports described as attributed in later collections are labelled as such."
                />
                <div className="quote-stack">
                  {person.quotes.map((quote) => (
                    <blockquote className="quote-card" key={quote.text.slice(0, 30)}>
                      <Quote size={20} className="quote-card__icon" aria-hidden="true" />
                      <p>{quote.text}</p>
                      <footer>
                        <span>{quote.source}</span>
                        {quote.context && <small>{quote.context}</small>}
                      </footer>
                    </blockquote>
                  ))}
                </div>
              </Reveal>
            )}

            <Reveal className="masoom-legacy">
              <span className="eyebrow">Legacy</span>
              <p>{person.legacy}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="masoom-shrine">
        <div className="container masoom-shrine__inner">
          <Reveal className="masoom-shrine__media">
            <img src={person.shrineImage} alt={imageAlt} loading="lazy" />
            <div className="masoom-shrine__veil" aria-hidden="true" />
          </Reveal>
          <Reveal className="masoom-shrine__body" delay={0.08}>
            <span className="eyebrow"><MapPin size={13} /> Place of remembrance</span>
            <h2 className="display">{person.burial}</h2>
            <p>
              {person.deathPlace
                ? `${person.deathPlace} is associated with the memory of ${person.englishName}. The photograph is offered as a quiet point of orientation, not as a claim of certainty where historical reports differ.`
                : 'The resting place of this member of the household is remembered across the tradition. The photograph is offered as a quiet point of orientation.'}
            </p>
            <span className="masoom-shrine__note">Photography via Wikimedia Commons · See image credits.</span>
          </Reveal>
        </div>
      </section>

      <section className="section section--masoom-nav">
        <div className="container masoom-nav">
          {previous ? (
            <Link to={`/masoomeen/${previous.slug}`} className="masoom-nav__item masoom-nav__item--prev">
              <ArrowLeft size={17} />
              <span>
                <small>Previous</small>
                <strong>{previous.englishName}</strong>
              </span>
            </Link>
          ) : (
            <span className="masoom-nav__empty" />
          )}
          {next ? (
            <Link to={`/masoomeen/${next.slug}`} className="masoom-nav__item masoom-nav__item--next">
              <span>
                <small>Next</small>
                <strong>{next.englishName}</strong>
              </span>
              <ArrowRight size={17} />
            </Link>
          ) : (
            <span className="masoom-nav__empty" />
          )}
        </div>
      </section>
    </>
  )
}
