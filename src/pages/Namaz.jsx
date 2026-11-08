import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  Clock3,
  Compass,
  Droplets,
  Moon,
  MoonStar,
  Sun,
  Sunrise,
  Sunset,
  Volume2,
} from 'lucide-react'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import Ornament from '../components/Ornament'
import {
  adhanText,
  dailyPrayers,
  namazFaqs,
  prayerSteps,
  prayerTexts,
} from '../data/prayers'

const prayerIcons = { dawn: Sunrise, sun: Sun, afternoon: Sun, sunset: Sunset, night: MoonStar }

const prerequisites = [
  { icon: Droplets, title: 'Purity', text: 'A valid wudu or ghusl, clean clothes, and a clean place of prayer.', to: '/wudu', link: 'Wudu guide' },
  { icon: Compass, title: 'The qibla', text: 'Face the direction of the Kaaba in Mecca. A reliable app or compass is sufficient.', to: null },
  { icon: Clock3, title: 'The time', text: 'Each prayer has an appointed window. Begin after the time has entered.', to: '/calendar', link: 'Prayer times & calendar' },
  { icon: Moon, title: 'Intention', text: 'Make the intention in the heart to offer this prayer for the sake of Allah.', to: null },
]

export default function Namaz() {
  const [activeStep, setActiveStep] = useState(0)
  const [openFaq, setOpenFaq] = useState(0)
  const step = prayerSteps[activeStep]

  return (
    <>
      <Seo
        title="Shia Namaz Guide"
        description="A step-by-step guide to the five daily prayers in the Ja'fari school: prayer times, rak'ahs, wudu, qibla, ruku', sujud, qunut, tashahhud and salam."
      />

      <PageHero
        eyebrow="The daily prayer"
        arabic="الصَّلَاة"
        title="Five moments that"
        titleAccent="reorient the day."
        intro="Salah is the pillar of a life turned toward God. This guide introduces the five daily prayers, the movements, and the words of the Ja‘fari school with care for the beginner."
        image="/images/imam-ali-shrine.jpg"
        imageAlt="The shrine of Imam Ali in Najaf, Iraq."
        breadcrumb={[{ label: 'Namaz Guide' }]}
        imageCaption="The shrine of Imam Ali · Najaf, Iraq"
      >
        <a href="#prayer-steps" className="btn btn--gold">
          Learn the steps <ArrowRight size={16} />
        </a>
        <Link to="/wudu" className="btn btn--glass">
          Start with wudu <Droplets size={16} />
        </Link>
      </PageHero>

      <section className="section section--prayers">
        <div className="container">
          <SectionHeading
            eyebrow="The five prayers"
            arabic="الصَّلَوَاتُ الْخَمْس"
            title={<>Seventeen rak‘ahs, <em>one orientation.</em></>}
            intro="The obligatory prayers together make seventeen rak‘ahs each day. Their times follow the movement of the sun."
            align="center"
          />
          <div className="prayer-cards">
            {dailyPrayers.map((prayer, index) => {
              const Icon = prayerIcons[prayer.icon] || Sun
              return (
                <Reveal className="prayer-card" key={prayer.name} delay={index * 0.04}>
                  <span className="prayer-card__icon"><Icon size={20} /></span>
                  <div className="prayer-card__head">
                    <h3>{prayer.name}</h3>
                    <span className="prayer-card__arabic arabic" dir="rtl" lang="ar">{prayer.arabic}</span>
                  </div>
                  <p className="prayer-card__time">{prayer.time}</p>
                  <div className="prayer-card__rakats">
                    <strong>{prayer.rakats}</strong>
                    <span>rak‘ahs</span>
                  </div>
                  <p className="prayer-card__note">{prayer.note}</p>
                </Reveal>
              )
            })}
          </div>
          <div className="prayer-totals">
            <span><strong>17</strong> daily obligatory rak‘ahs</span>
            <span><strong>5</strong> appointed times</span>
            <span><strong>1</strong> direction · the qibla</span>
          </div>
        </div>
      </section>

      <section className="section section--prerequisites">
        <div className="container">
          <SectionHeading
            eyebrow="Before you begin"
            arabic="شُرُوطُ الصَّلَاة"
            title={<>Prepare the body <em>and the attention.</em></>}
            intro="The outward conditions of prayer are a doorway into its inward purpose. Begin with what is within your capacity and learn as you go."
          />
          <div className="prerequisite-grid">
            {prerequisites.map(({ icon: Icon, title, text, to, link }, index) => (
              <Reveal className="prerequisite-card" key={title} delay={index * 0.04}>
                <Icon size={20} />
                <span className="prerequisite-card__number">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                {to && <Link to={to} className="text-link">{link} <ArrowUpRight size={13} /></Link>}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--prayer-steps" id="prayer-steps">
        <div className="container">
          <SectionHeading
            eyebrow="The prayer, step by step"
            arabic="أَفْعَالُ الصَّلَاة"
            title={<>From takbir <em>to salam.</em></>}
            intro="Select a movement to read its description and a practical detail. This is an introduction; local teaching and your marja‘ remain essential."
            align="center"
          />
          <div className="prayer-stepper">
            <div className="prayer-stepper__list" role="tablist" aria-label="Prayer steps">
              {prayerSteps.map((item, index) => (
                <button
                  key={item.number}
                  type="button"
                  role="tab"
                  aria-selected={activeStep === index}
                  className={`prayer-step-button ${activeStep === index ? 'is-active' : ''}`}
                  onClick={() => setActiveStep(index)}
                >
                  <span>{item.number}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <small>{item.arabic}</small>
                  </div>
                </button>
              ))}
            </div>

            <div className="prayer-stepper__panel" role="tabpanel" key={step.number}>
              <span className="prayer-stepper__number">{step.number}</span>
              <span className="prayer-stepper__arabic arabic" dir="rtl" lang="ar">{step.arabic}</span>
              <h3 className="display">{step.title}</h3>
              <p className="prayer-stepper__text">{step.text}</p>
              <div className="prayer-stepper__detail">
                <Check size={15} />
                <p>{step.detail}</p>
              </div>
              <div className="prayer-stepper__controls">
                <button type="button" className="btn btn--ghost btn--small" onClick={() => setActiveStep((value) => Math.max(0, value - 1))} disabled={activeStep === 0}>
                  Previous
                </button>
                <span>{activeStep + 1} / {prayerSteps.length}</span>
                <button type="button" className="btn btn--gold btn--small" onClick={() => setActiveStep((value) => Math.min(prayerSteps.length - 1, value + 1))} disabled={activeStep === prayerSteps.length - 1}>
                  Next step
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--prayer-texts">
        <div className="container">
          <SectionHeading
            eyebrow="The words of prayer"
            arabic="أَذْكَارُ الصَّلَاة"
            title={<>What is <em>recited.</em></>}
            intro="Open each section to read the Arabic, a transliteration, and an English rendering of the central recitations."
          />
          <div className="prayer-texts">
            {prayerTexts.map((text, index) => (
              <details className="prayer-text" key={text.title} open={index === 0}>
                <summary>
                  <span className="prayer-text__number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="prayer-text__title">{text.title}</span>
                  <span className="prayer-text__arabic arabic" dir="rtl" lang="ar">{text.arabic.split(' ').slice(0, 3).join(' ')}</span>
                  <ChevronDown size={17} />
                </summary>
                <div className="prayer-text__body">
                  <p className="prayer-text__arabic-full arabic" dir="rtl" lang="ar">{text.arabic}</p>
                  <div className="prayer-text__transliteration">
                    <span>Transliteration</span>
                    <p>{text.transliteration}</p>
                  </div>
                  <div className="prayer-text__english">
                    <span>Meaning</span>
                    <p>{text.english}</p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--adhan">
        <div className="container adhan-split">
          <Reveal className="adhan-split__intro">
            <SectionHeading
              eyebrow="The call to prayer"
              arabic="الْأَذَان"
              title={<>An invitation <em>to the best of deeds.</em></>}
              intro="The Shia adhan includes the phrase Hayya ‘ala khayr al-‘amal — come to the best of deeds. It is a call to turn from distraction toward what matters."
            />
            <div className="adhan-split__note">
              <Volume2 size={19} />
              <p>The adhan is recommended before the obligatory prayer; the iqamah is the immediate call before beginning.</p>
            </div>
            <Link to="/duas" className="text-link">Explore the supplications <ArrowUpRight size={14} /></Link>
          </Reveal>
          <Reveal className="adhan-card" delay={0.08}>
            <div className="adhan-card__head">
              <span>Phrase</span>
              <span>Repeat</span>
            </div>
            {adhanText.map((line, index) => (
              <div className="adhan-line" key={`${line.arabic}-${index}`}>
                <div>
                  <span className="adhan-line__arabic arabic" dir="rtl" lang="ar">{line.arabic}</span>
                  <small>{line.english}</small>
                </div>
                <span className="adhan-line__repeat">{line.repeat}×</span>
              </div>
            ))}
            <Ornament />
          </Reveal>
        </div>
      </section>

      <section className="section section--namaz-faq">
        <div className="container faq-layout">
          <div className="faq-layout__intro">
            <SectionHeading
              eyebrow="Practical guidance"
              arabic="أَسْئِلَةُ الصَّلَاة"
              title={<>Questions <em>before you pray.</em></>}
              intro="A few common questions answered with reference to the Ja‘fari school. For your specific situation, follow your marja‘."
            />
            <BookOpen size={26} className="faq-layout__icon" aria-hidden="true" />
            <p className="faq-layout__note">
              Combining prayers, travel rulings, and missed prayers each have detailed conditions.
              This page offers a general introduction only.
            </p>
            <Link to="/wudu" className="btn btn--outline">Read the wudu guide <ArrowRight size={15} /></Link>
          </div>
          <div className="accordion">
            {namazFaqs.map((faq, index) => {
              const isOpen = openFaq === index
              return (
                <div className={`accordion__item ${isOpen ? 'is-open' : ''}`} key={faq.q}>
                  <button type="button" onClick={() => setOpenFaq(isOpen ? -1 : index)} aria-expanded={isOpen}>
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

      <section className="section section--cross-link">
        <div className="container cross-link-panel">
          <div>
            <span className="eyebrow">A quiet practice</span>
            <h2 className="display">Remember <em>after the prayer.</em></h2>
            <p>
              The tasbeeh of Fatima al-Zahra and the dhikr that follow the prayer extend its
              presence into the rest of the day.
            </p>
          </div>
          <Link to="/tasbeeh" className="btn btn--gold">Open the digital tasbeeh <ArrowRight size={16} /></Link>
        </div>
      </section>
    </>
  )
}
