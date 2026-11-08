import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  Droplets,
  HeartHandshake,
  Landmark,
  MoonStar,
  Users,
} from 'lucide-react'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import Ornament from '../components/Ornament'
import { muharramEtiquette, muharramFaqs, muharramTimeline } from '../data/karbala'

const waysToObserve = [
  {
    icon: Users,
    title: 'Gather for majlis',
    text: 'Join a gathering of remembrance where the events of Karbala are narrated, the Qur’an is recited, and the household is honoured.',
  },
  {
    icon: MoonStar,
    title: 'Recite Ziyarat Ashura',
    text: 'The ziyarat of Ashura is read on the day and throughout the year. It joins salutation, grief, and a pledge against injustice.',
  },
  {
    icon: Droplets,
    title: 'Give water and food',
    text: 'In memory of the thirst of Karbala, provide water, milk, or a meal to those in need — beginning with the vulnerable near you.',
  },
  {
    icon: HeartHandshake,
    title: 'Stand with the oppressed',
    text: 'Karbala is a call to action. Support a family, speak for a wronged person, or examine where silence has become complicity.',
  },
]

const importantDays = [
  { day: '1', title: 'Islamic New Year', text: 'The Hijri year begins in a spirit of reflection.' },
  { day: '7', title: 'The water is blocked', text: 'The siege tightens; water is cut off from the camp.' },
  { day: '9', title: 'Tasu‘a', text: 'The eve of Ashura, marked with prayer and remembrance.' },
  { day: '10', title: 'Ashura', text: 'The martyrdom of Imam Hussain and his companions.' },
  { day: '20 Safar', title: 'Arba‘een', text: 'The fortieth day, the largest annual visitation.' },
]

export default function Muharram() {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <>
      <Seo
        title="Muharram"
        description="Muharram and Ashura: the meaning of the month, the days of remembrance, the etiquette of mourning, and how communities honour Imam Hussain and the martyrs of Karbala."
      />

      <PageHero
        eyebrow="The month of remembrance"
        arabic="مُحَرَّمُ الْحَرَام"
        title="When grief becomes"
        titleAccent="a form of worship."
        intro="Muharram opens the Hijri year and holds the deepest wound of the Shia community: the martyrdom of Imam Hussain and his companions at Karbala. It is a season of remembrance, patience, and resolve."
        image="/images/ashura.jpg"
        imageAlt="Muharram mourning gathering in Tehran, Iran."
        breadcrumb={[{ label: 'Muharram' }]}
        imageCaption="Ashura mourning · Tehran, Iran"
      >
        <a href="#muharram-timeline" className="btn btn--gold">
          The days of Muharram <CalendarDays size={16} />
        </a>
        <Link to="/ziyarat/ziyarat-ashura" className="btn btn--glass">
          Ziyarat Ashura <ArrowUpRight size={16} />
        </Link>
      </PageHero>

      <section className="section section--muharram-intro">
        <div className="container muharram-intro">
          <Reveal className="muharram-intro__body">
            <SectionHeading
              eyebrow="The sacred month"
              arabic="شَهْرُ الْحُسَيْن"
              title={<>A season set apart for <em>remembrance.</em></>}
              intro="Muharram is the first month of the Islamic year and one of the four sacred months. For Shia Muslims, it is also the month in which the grandson of the Prophet was killed at Karbala."
            />
            <div className="prose">
              <p>
                The new year does not begin with celebration, but with a turn toward the truth of
                Karbala. Communities gather in majalis, recite the Qur’an and ziyarat, narrate the
                events of Ashura, and renew their commitment to the values for which the Imam stood.
              </p>
              <p>
                Mourning in this tradition is not despair. It is love disciplined by memory: a way
                of refusing to let the deaths of the innocent be forgotten and a way of placing
                grief at the service of justice.
              </p>
            </div>
            <div className="muharram-intro__actions">
              <Link to="/karbala" className="btn btn--outline">
                Read the history of Karbala <ArrowRight size={16} />
              </Link>
              <Link to="/calendar" className="text-link">
                Muharram in the calendar <ArrowUpRight size={15} />
              </Link>
            </div>
          </Reveal>

          <Reveal className="muharram-intro__days" delay={0.08}>
            <span className="muharram-intro__days-title">The month at a glance</span>
            {importantDays.map((day) => (
              <div className="muharram-day" key={day.title}>
                <span className="muharram-day__date">{day.day}<small>{day.day === '20 Safar' ? '' : 'Muharram'}</small></span>
                <div>
                  <strong>{day.title}</strong>
                  <p>{day.text}</p>
                </div>
              </div>
            ))}
            <Ornament />
          </Reveal>
        </div>
      </section>

      <section className="section section--muharram-timeline" id="muharram-timeline">
        <div className="container">
          <SectionHeading
            eyebrow="The rhythm of the month"
            arabic="أَيَّامُ الْمُحَرَّم"
            title={<>From the new moon to <em>Arba‘een.</em></>}
            intro="The days of Muharram build toward Ashura and continue into Safar with the remembrance of the captives and the fortieth day."
            align="center"
          />
          <div className="muharram-timeline">
            {muharramTimeline.map((event, index) => (
              <Reveal className={`muharram-step ${index === 4 ? 'is-highlight' : ''}`} key={event.title} delay={(index % 3) * 0.05}>
                <span className="muharram-step__day">{event.day}</span>
                <span className="muharram-step__line" aria-hidden="true" />
                <span className="muharram-step__dot" aria-hidden="true" />
                <h3>{event.title}</h3>
                <p>{event.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--observe">
        <div className="container">
          <SectionHeading
            eyebrow="Ways to observe"
            arabic="أَعْمَالُ الْمُحَرَّم"
            title={<>Make the remembrance <em>purposeful.</em></>}
            intro="There is no single required script for a life of remembrance. These are invitations to join memory with action."
            align="center"
          />
          <div className="observe-grid">
            {waysToObserve.map(({ icon: Icon, title, text }, index) => (
              <Reveal className="observe-card" key={title} delay={index * 0.05}>
                <span className="observe-card__icon"><Icon size={20} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--etiquette">
        <div className="container etiquette-split">
          <Reveal className="etiquette-split__intro">
            <SectionHeading
              eyebrow="The manner of mourning"
              arabic="أَدَبُ الْعَزَاء"
              title={<>Grief with <em>dignity.</em></>}
              intro="The tradition of remembrance has always been accompanied by ethical care: for accuracy, for the vulnerable, and for the unity of the community."
            />
            <div className="etiquette-split__quote">
              <span className="arabic" dir="rtl" lang="ar">الْحُسَيْنُ مِنِّي وَأَنَا مِنَ الْحُسَيْن</span>
              <p>“Hussain is from me, and I am from Hussain.”</p>
              <small>Prophet Muhammad ﷺ · Sunan al-Tirmidhi</small>
            </div>
          </Reveal>
          <div className="etiquette-list">
            {muharramEtiquette.map((item, index) => (
              <Reveal className="etiquette-item" key={item.title} delay={index * 0.04}>
                <span className="etiquette-item__number">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--muharram-faq">
        <div className="container faq-layout">
          <div className="faq-layout__intro">
            <SectionHeading
              eyebrow="Questions & clarity"
              arabic="أَسْئِلَة"
              title={<>Understanding <em>Muharram.</em></>}
              intro="A few common questions asked by readers encountering the season of remembrance for the first time."
            />
            <Landmark size={26} className="faq-layout__icon" aria-hidden="true" />
            <p className="faq-layout__note">
              For rulings and local practice, consult your marja‘ and the scholars of your
              community.
            </p>
          </div>
          <div className="accordion">
            {muharramFaqs.map((faq, index) => {
              const isOpen = openFaq === index
              return (
                <div className={`accordion__item ${isOpen ? 'is-open' : ''}`} key={faq.q}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={18} className={isOpen ? 'rotate' : ''} />
                  </button>
                  <div className="accordion__answer">
                    <p>{faq.a}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section section--cross-link section--cross-link--sorrow">
        <div className="container cross-link-panel">
          <div>
            <span className="eyebrow">Continue the remembrance</span>
            <h2 className="display">The words of <em>ziyarat.</em></h2>
            <p>
              Ziyarat Ashura gives language to grief and resolve. Read it with Arabic,
              transliteration, English, and Urdu, or listen to the complete recitation.
            </p>
          </div>
          <div className="cross-link-panel__actions">
            <Link to="/ziyarat/ziyarat-ashura" className="btn btn--gold">
              Recite Ziyarat Ashura <ArrowRight size={16} />
            </Link>
            <Link to="/duas" className="btn btn--ghost">
              Explore duas
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
