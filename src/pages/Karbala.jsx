import { Link } from 'react-router-dom'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Droplets,
  Landmark,
  MapPin,
  Quote,
  Users,
} from 'lucide-react'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import Ornament from '../components/Ornament'
import GeometricPattern from '../components/GeometricPattern'
import { karbalaFigures, karbalaLessons, karbalaTimeline } from '../data/karbala'

const figureSlugs = {
  'Imam Hussain': 'imam-hussain',
  'Hazrat Abbas': null,
  'Hazrat Ali Akbar': null,
  'Zaynab bint Ali': null,
}

const keyFacts = [
  { icon: CalendarDays, label: 'The day', value: '10 Muharram, 61 AH', detail: '680 CE' },
  { icon: MapPin, label: 'The place', value: 'Karbala, Iraq', detail: 'On the Euphrates plain' },
  { icon: Users, label: 'The caravan', value: 'The Imam’s family & companions', detail: 'A small, resolute community' },
  { icon: Droplets, label: 'The trial', value: 'Water was cut off', detail: 'Children and infants among the besieged' },
]

export default function Karbala() {
  return (
    <>
      <Seo
        title="Karbala History"
        description="The history of Karbala: Imam Hussain's stand against Yazid, the martyrdom of Hazrat Abbas and Hazrat Ali Akbar, the captivity of Zaynab, and the lessons of Ashura."
      />

      <PageHero
        eyebrow="The eternal witness · 61 AH"
        arabic="كَرْبَلَاء"
        title="A stand for truth,"
        titleAccent="written in blood and memory."
        intro="In the year 61 AH, Imam Hussain ibn Ali and a small caravan stood before the Umayyad empire. Karbala is the story of that stand — and of the conscience it awakened in history."
        image="/images/hero-karbala.jpg"
        imageAlt="The shrine of Imam Hussain in Karbala, Iraq."
        breadcrumb={[{ label: 'Karbala History' }]}
        imageCaption="The shrine of Imam Hussain · Karbala, Iraq"
      >
        <a href="#timeline" className="btn btn--gold">
          Follow the story <ArrowDown size={16} />
        </a>
        <Link to="/ziyarat/ziyarat-ashura" className="btn btn--glass">
          Ziyarat Ashura <ArrowUpRight size={16} />
        </Link>
      </PageHero>

      <section className="section section--karbala-facts">
        <div className="container">
          <div className="karbala-facts">
            {keyFacts.map(({ icon: Icon, label, value, detail }) => (
              <div className="karbala-fact" key={label}>
                <Icon size={18} />
                <span>{label}</span>
                <strong>{value}</strong>
                <small>{detail}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--karbala-opening">
        <div className="container karbala-opening">
          <Reveal className="karbala-opening__body">
            <SectionHeading
              eyebrow="Why Karbala matters"
              arabic="الْحَقُّ وَالْبَاطِل"
              title={<>The choice between <em>allegiance and conscience.</em></>}
              intro="Karbala was not a struggle for land or treasure. It was a confrontation between a community’s conscience and a power that demanded religious legitimacy for injustice."
            />
            <div className="prose">
              <p>
                After the death of Mu‘awiya, his son Yazid assumed the caliphate and sought
                allegiance from Imam Hussain, the grandson of the Prophet. To give that allegiance
                would have placed the Prophet’s family behind a rule the Imam judged to be a
                corruption of the prophetic order.
              </p>
              <p>
                The Imam left Medina for Mecca and then set out toward Kufa, whose people had
                invited him. His caravan was intercepted at Karbala and surrounded. On the tenth of
                Muharram, after the water supply was cut and negotiations failed, the Imam and his
                companions were killed. The women and children were taken captive.
              </p>
              <p>
                What appeared to be a defeat became a moral witness. The memory of Karbala has
                continued to confront tyranny, to comfort the oppressed, and to call the believer to
                a life that does not separate faith from justice.
              </p>
            </div>
            <Ornament />
          </Reveal>
          <Reveal className="karbala-opening__quote" delay={0.08}>
            <Quote size={24} />
            <p>
              “I have risen to seek reform in the ummah of my grandfather. I desire to enjoin good,
              forbid evil, and follow the way of my grandfather and father.”
            </p>
            <span>Imam Hussain · Treatise on the rising, Bihar al-Anwar, vol. 44</span>
            <div className="karbala-opening__pattern" aria-hidden="true">
              <GeometricPattern opacity={0.14} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--timeline" id="timeline">
        <div className="container">
          <SectionHeading
            eyebrow="From Medina to Ashura"
            arabic="رِحْلَةُ الْحُسَيْن"
            title={<>The journey, <em>step by step.</em></>}
            intro="A chronological account drawn from the established outlines of the Karbala narrative. Dates are given in the Hijri calendar."
            align="center"
          />
          <div className="karbala-timeline">
            <div className="karbala-timeline__line" aria-hidden="true" />
            {karbalaTimeline.map((event, index) => (
              <Reveal className={`karbala-timeline__item ${index % 2 === 0 ? 'is-left' : 'is-right'}`} key={event.title} delay={0.03 * (index % 3)}>
                <div className="karbala-timeline__marker" aria-hidden="true">
                  <span />
                </div>
                <div className="karbala-timeline__card">
                  <span className="karbala-timeline__year">{event.year}</span>
                  <h3>{event.title}</h3>
                  <p>{event.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--figures">
        <div className="container">
          <SectionHeading
            eyebrow="The people of Karbala"
            arabic="أَصْحَابُ الْحُسَيْن"
            title={<>Lives that stood <em>at the centre.</em></>}
            intro="Karbala was carried by a family and a small community. These are four of the figures whose faith, courage, and grief are remembered."
            align="center"
          />

          <div className="karbala-figures">
            {karbalaFigures.map((figure, index) => {
              const slug = figureSlugs[figure.name]
              return (
                <Reveal
                  className={`figure-panel ${index % 2 === 0 ? 'figure-panel--media-left' : 'figure-panel--media-right'}`}
                  key={figure.name}
                  delay={index * 0.04}
                >
                  <div className="figure-panel__media">
                    <img src={figure.image} alt={`A place of remembrance associated with ${figure.name}.`} loading="lazy" />
                    <div className="figure-panel__veil" aria-hidden="true" />
                    <span className="figure-panel__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="figure-panel__body">
                    <span className="figure-panel__arabic arabic" dir="rtl" lang="ar">{figure.arabic}</span>
                    <span className="tag tag--gold">{figure.role}</span>
                    <h3 className="display">{figure.name}</h3>
                    <p>{figure.text}</p>
                    {slug ? (
                      <Link to={`/masoomeen/${slug}`} className="text-link">
                        Read the life of Imam Hussain <ArrowUpRight size={15} />
                      </Link>
                    ) : (
                      <Link to="/muharram" className="text-link">
                        Remember in Muharram <ArrowUpRight size={15} />
                      </Link>
                    )}
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section section--lessons">
        <div className="container">
          <SectionHeading
            eyebrow="What Karbala teaches"
            arabic="دُرُوسُ كَرْبَلَاء"
            title={<>A message that <em>outlives its age.</em></>}
            intro="The lessons of Karbala are not confined to a battlefield. They ask questions of every generation, every community, and every conscience."
            align="center"
          />
          <div className="lesson-grid">
            {karbalaLessons.map((lesson, index) => (
              <Reveal className="lesson-card" key={lesson.title} delay={(index % 3) * 0.05}>
                <span className="lesson-card__number">{String(index + 1).padStart(2, '0')}</span>
                <span className="lesson-card__arabic arabic" dir="rtl" lang="ar">{lesson.arabic}</span>
                <h3>{lesson.title}</h3>
                <p>{lesson.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--karbala-shrine">
        <div className="container karbala-shrine">
          <Reveal className="karbala-shrine__media">
            <img src="/images/karbala-city.jpg" alt="An aerial view of Karbala and the shrine complex." loading="lazy" />
            <div className="karbala-shrine__veil" aria-hidden="true" />
            <div className="karbala-shrine__label">
              <Landmark size={16} />
              <span>Karbala · Iraq</span>
            </div>
          </Reveal>
          <Reveal className="karbala-shrine__body" delay={0.08}>
            <span className="eyebrow">The shrine today</span>
            <h2 className="display">A city shaped by <em>remembrance.</em></h2>
            <p>
              Each year, millions of pilgrims walk to Karbala for Arba‘een, the fortieth day after
              Ashura. The shrines of Imam Hussain and Hazrat Abbas stand at the heart of the city,
              surrounded by a community whose life is organised around visitation and service.
            </p>
            <p>
              The photograph is offered as a place of orientation, not as a substitute for the
              journey. For those who cannot travel, the ziyarat texts remain a way of turning the
              heart toward Karbala.
            </p>
            <div className="karbala-shrine__actions">
              <Link to="/ziyarat/ziyarat-waritha" className="btn btn--gold">
                Read Ziyarat Waritha <ArrowRight size={16} />
              </Link>
              <Link to="/calendar" className="btn btn--ghost">
                Arba‘een & the calendar
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="closing-invocation closing-invocation--karbala">
        <div className="container closing-invocation__inner">
          <Reveal>
            <Ornament />
            <p className="closing-invocation__arabic arabic" dir="rtl" lang="ar">
              السَّلَامُ عَلَى الْحُسَيْنِ وَعَلَى عَلِيِّ بْنِ الْحُسَيْنِ وَعَلَى أَوْلَادِ الْحُسَيْنِ
            </p>
            <p className="closing-invocation__translation">
              Peace be upon Hussain, upon Ali the son of Hussain, and upon the children of Hussain.
            </p>
            <div className="closing-invocation__links">
              <Link to="/muharram" className="text-link">
                Enter the season of Muharram <ArrowUpRight size={15} />
              </Link>
              <span className="closing-invocation__dot" aria-hidden="true">·</span>
              <Link to="/ziyarat/ziyarat-ashura" className="text-link">
                Recite Ziyarat Ashura <ArrowUpRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
