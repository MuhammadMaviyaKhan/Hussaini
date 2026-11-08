import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import MasoomCard from '../components/MasoomCard'
import Ornament from '../components/Ornament'
import { masoomeen, masoomeenStats } from '../data/masoomeen'

const eras = ['All', ...new Set(masoomeen.map((person) => person.era))]

export default function Masoomeen() {
  const [activeEra, setActiveEra] = useState('All')
  const filtered = useMemo(
    () => (activeEra === 'All' ? masoomeen : masoomeen.filter((person) => person.era === activeEra)),
    [activeEra],
  )

  return (
    <>
      <Seo
        title="The 14 Masoomeen"
        description="The lives of the 14 Infallibles: the Prophet Muhammad ﷺ, Fatima al-Zahra, and the twelve Imams. Explore their names, dates, biographies, teachings and shrines."
      />

      <PageHero
        eyebrow="The fourteen infallibles"
        arabic="الْمَعْصُومُون"
        title="A chain of guidance,"
        titleAccent="from the Prophet to the Awaited One."
        intro="Fourteen lives, one path. The Prophet Muhammad ﷺ, his daughter Fatima, and the twelve Imams form the household whose words and witness have guided the community for generations."
        image="/images/imam-reza-shrine.jpg"
        imageAlt="The shrine of Imam Reza in Mashhad, Iran."
        breadcrumb={[{ label: 'The 14 Masoomeen' }]}
        imageCaption="The shrine of Imam Reza · Mashhad, Iran"
      >
        <a href="#the-fourteen" className="btn btn--gold">
          Explore the fourteen <ArrowRight size={16} />
        </a>
        <Link to="/ahlulbayt" className="btn btn--glass">
          Who are the Ahlulbayt? <ArrowUpRight size={16} />
        </Link>
      </PageHero>

      <section className="section section--masoomeen-stats">
        <div className="container">
          <div className="masoomeen-stats">
            {masoomeenStats.map((stat) => (
              <div className="masoomeen-stat" key={stat.label}>
                <span className="masoomeen-stat__arabic arabic" dir="rtl" lang="ar">{stat.arabic}</span>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
            <div className="masoomeen-stat masoomeen-stat--text">
              <span className="masoomeen-stat__arabic arabic" dir="rtl" lang="ar">أَهْلُ الْبَيْت</span>
              <strong>The Household</strong>
              <span>One family · One message</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--masoomeen" id="the-fourteen">
        <div className="container">
          <SectionHeading
            eyebrow="The Infallibles"
            arabic="مَعْصُومُون"
            title={<>The fourteen <em>lights.</em></>}
            intro="Select a life to read the biography, the events that shaped it, the teachings preserved from it, and the place associated with its memory."
            align="center"
          />

          <div className="era-filter" role="group" aria-label="Filter by era">
            {eras.map((era) => (
              <button
                key={era}
                type="button"
                className={`era-filter__button ${activeEra === era ? 'is-active' : ''}`}
                onClick={() => setActiveEra(era)}
                aria-pressed={activeEra === era}
              >
                {era}
                <span>
                  {era === 'All'
                    ? masoomeen.length
                    : masoomeen.filter((person) => person.era === era).length}
                </span>
              </button>
            ))}
          </div>

          <div className="masoom-grid">
            {filtered.map((person, index) => (
              <Reveal key={person.slug} delay={(index % 4) * 0.04}>
                <MasoomCard person={person} index={filtered.indexOf(person)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--infallibility">
        <div className="container infallibility-panel">
          <Reveal className="infallibility-panel__body">
            <span className="eyebrow"><Sparkles size={13} /> What “Infallible” means</span>
            <h2 className="display">Protected in guidance, <em>not removed from the world.</em></h2>
            <div className="prose">
              <p>
                Shia Muslims describe the Prophet, Fatima, and the twelve Imams as ma‘sum —
                protected from sin and error in the transmission of the religion. This is not a
                claim that they did not experience hunger, grief, persecution, or death. It is a
                trust in the clarity of the guidance they carried.
              </p>
              <p>
                Their lives were fully human: they married, worked, taught, suffered, and were
                buried. What distinguishes them is fidelity — a lifelong refusal to separate what
                they knew from how they lived.
              </p>
            </div>
            <Ornament />
          </Reveal>
          <Reveal className="infallibility-panel__quote" delay={0.08}>
            <span className="arabic" dir="rtl" lang="ar">اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَآلِ مُحَمَّد</span>
            <p>
              “O Allah, send blessings upon Muhammad and the family of Muhammad.”
            </p>
            <span className="infallibility-panel__source">The salawat · recited throughout the tradition</span>
          </Reveal>
        </div>
      </section>

      <section className="section section--lineage">
        <div className="container">
          <SectionHeading
            eyebrow="The chain of the Imamate"
            arabic="الْأَئِمَّةُ الِاثْنَا عَشَر"
            title={<>Twelve Imams, <em>one lineage.</em></>}
            intro="After the Prophet, Shia Muslims follow twelve Imams from his household, beginning with Ali and ending with Muhammad al-Mahdi, the awaited Imam."
            align="center"
          />
          <div className="lineage-rail">
            {masoomeen
              .filter((person) => person.order !== 1 && person.slug !== 'fatima-zahra')
              .map((person, index) => (
                <Link to={`/masoomeen/${person.slug}`} className="lineage-node" key={person.slug}>
                  <span className="lineage-node__dot" aria-hidden="true" />
                  <span className="lineage-node__order">{String(index + 1).padStart(2, '0')}</span>
                  <strong>{person.shortName}</strong>
                  <small>{person.arabicTitle.split(' ').slice(0, 2).join(' ')}</small>
                </Link>
              ))}
          </div>
          <Reveal className="lineage-cta">
            <Link to="/karbala" className="btn btn--gold">
              Continue to Karbala <ArrowRight size={16} />
            </Link>
            <Link to="/duas" className="btn btn--ghost">
              Read their supplications
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
