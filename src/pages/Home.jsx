import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  ChevronDown,
  MoveDown,
  Quote,
  Sparkles,
} from 'lucide-react'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import Ornament from '../components/Ornament'
import GeometricPattern from '../components/GeometricPattern'
import SupplicationCard from '../components/SupplicationCard'
import { supplications } from '../data/supplications'
import { books } from '../data/books'
import { dailyReflections, values } from '../data/site'
import { karbalaTimeline } from '../data/karbala'

const featuredSupplications = ['dua-kumayl', 'dua-faraj', 'ziyarat-ashura', 'ziyarat-waritha']
const featuredBooks = ['nahj-al-balagha', 'sahifa-sajjadiyya', 'kitab-al-irshad']

const statItems = [
  { value: '14', label: 'Infallibles', detail: 'The household of the Prophet' },
  { value: '61', label: 'AH · Karbala', detail: 'The eternal witness' },
  { value: '114', label: 'Surahs', detail: 'The Book of light' },
  { value: '8', label: 'Devotions', detail: 'Duas & ziyarat' },
]

export default function Home() {
  const reduce = useReducedMotion()
  const [reflectionIndex, setReflectionIndex] = useState(() => new Date().getDate() % dailyReflections.length)
  const featuredDuas = useMemo(
    () => featuredSupplications.map((slug) => supplications.find((item) => item.slug === slug)).filter(Boolean),
    [],
  )
  const featuredBookItems = useMemo(
    () => featuredBooks.map((slug) => books.find((book) => book.slug === slug)).filter(Boolean),
    [],
  )
  const reflection = dailyReflections[reflectionIndex]
  const today = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date())

  return (
    <>
      <Seo
        title={null}
        description="HUSSAINI is a sanctuary of knowledge, devotion and remembrance dedicated to the Ahlulbayt and the timeless message of Karbala. Explore the 14 Masoomeen, Qur'an, Duas, Ziyarat and more."
      />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="home-hero" aria-label="Welcome to HUSSAINI">
        <div className="home-hero__media" aria-hidden="true">
          <img src="/images/hero-karbala.jpg" alt="" fetchPriority="high" />
        </div>
        <div className="home-hero__veil" aria-hidden="true" />
        <GeometricPattern className="home-hero__pattern" opacity={0.09} />
        <div className="home-hero__grain" aria-hidden="true" />

        <div className="container home-hero__inner">
          <motion.div
            className="home-hero__content"
            initial={reduce ? false : { opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="home-hero__eyebrow">
              <span className="home-hero__rule" />
              <span>Karbala · The eternal witness</span>
              <span className="home-hero__rule" />
            </div>

            <div className="home-hero__arabic arabic" dir="rtl" lang="ar">
              يَا حُسَيْن
            </div>

            <h1 className="home-hero__title display">
              The Light of <em>Ahlulbayt</em>
              <span className="home-hero__title-line">Lives Forever</span>
            </h1>

            <p className="home-hero__mission">
              A sanctuary of knowledge, devotion, and remembrance — where the lives of the
              Infallibles, the wisdom of the Qur’an, and the eternal witness of Karbala meet.
            </p>

            <div className="home-hero__actions">
              <Link to="/ahlulbayt" className="btn btn--gold btn--large">
                Explore Ahlulbayt <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
              <Link to="/karbala" className="btn btn--glass btn--large">
                Discover More <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>

          <div className="home-hero__foot">
            <div className="home-hero__stats">
              {statItems.map((stat) => (
                <div className="home-hero__stat" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                  <small>{stat.detail}</small>
                </div>
              ))}
            </div>

            <a href="#ahlulbayt" className="scroll-cue" aria-label="Scroll to the first section">
              <span className="scroll-cue__line" aria-hidden="true" />
              <span className="scroll-cue__text">Enter the path</span>
              <ChevronDown size={16} aria-hidden="true" />
            </a>

            <span className="home-hero__caption">The shrine of Imam Hussain · Karbala, Iraq</span>
          </div>
        </div>
      </section>

      {/* ── Verse band ───────────────────────────────────────── */}
      <section className="quote-band" aria-label="Verse of the Qur'an">
        <div className="quote-band__pattern" aria-hidden="true" />
        <div className="container quote-band__inner">
          <Reveal className="quote-band__content">
            <Quote className="quote-band__icon" size={28} aria-hidden="true" />
            <p className="quote-band__arabic arabic" dir="rtl" lang="ar">
              وَلَا تَحْسَبَنَّ الَّذِينَ قُتِلُوا فِي سَبِيلِ اللَّهِ أَمْوَاتًا ۚ بَلْ أَحْيَاءٌ عِندَ رَبِّهِمْ يُرْزَقُونَ
            </p>
            <p className="quote-band__english">
              “Do not think of those who are killed in the way of Allah as dead. They are alive
              with their Lord, receiving provision.”
            </p>
            <div className="quote-band__meta">
              <Ornament />
              <span>The Qur’an · Surah Aal ‘Imran 3:169</span>
              <Ornament />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── About Ahlulbayt ──────────────────────────────────── */}
      <section className="section section--ahlulbayt" id="ahlulbayt">
        <div className="container intro-split">
          <Reveal className="intro-split__media">
            <div className="image-frame image-frame--portrait">
              <img
                src="/images/imam-ali-shrine.jpg"
                alt="The shrine of Imam Ali in Najaf, Iraq, illuminated at night."
                loading="lazy"
              />
              <div className="image-frame__overlay" aria-hidden="true" />
              <div className="image-frame__caption">
                <span className="arabic" dir="rtl" lang="ar">عَلِيٌّ وَلِيُّ اللَّهِ</span>
                <span>Shrine of Imam Ali · Najaf</span>
              </div>
            </div>
            <div className="intro-split__seal" aria-hidden="true">
              <svg viewBox="0 0 120 120" fill="none">
                <path d="M60 4 70 38 104 28 94 62 116 72 82 82 92 116 60 96 28 116 38 82 4 72 26 62 16 28 50 38Z" stroke="currentColor" strokeWidth=".7" />
                <circle cx="60" cy="60" r="33" stroke="currentColor" strokeWidth=".6" opacity=".6" />
                <circle cx="60" cy="60" r="6" stroke="currentColor" strokeWidth=".8" />
              </svg>
            </div>
          </Reveal>

          <Reveal className="intro-split__body" delay={0.08}>
            <SectionHeading
              eyebrow="The household of the Prophet"
              arabic="أَهْلُ الْبَيْت"
              title={<>A family chosen for guidance, <em>a light for every age.</em></>}
              intro="The Ahlulbayt are the household of the Prophet Muhammad ﷺ — the family whom the Qur’an honours, whose purity is affirmed, and whose love the Prophet made a trust for the community."
            />
            <div className="intro-split__copy">
              <p>
                Across fourteen centuries, their lives have been a school of worship, justice, and
                patience. HUSSAINI gathers their words, the places associated with them, and the
                devotions they taught — presented with care, clarity, and reverence.
              </p>
              <p>
                This is not a place of spectacle. It is a quiet room in a noisy world: a place to
                read, to return, and to remember.
              </p>
            </div>
            <div className="values-rail">
              {values.map((value) => (
                <div className="value-chip" key={value.english}>
                  <span className="value-chip__arabic arabic" dir="rtl" lang="ar">{value.arabic}</span>
                  <span className="value-chip__english">{value.english}</span>
                  <small>{value.note}</small>
                </div>
              ))}
            </div>
            <div className="intro-split__actions">
              <Link to="/ahlulbayt" className="btn btn--outline">
                Discover the household <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link to="/masoomeen" className="text-link">
                Meet the 14 Masoomeen <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Featured paths ───────────────────────────────────── */}
      <section className="section section--featured">
        <div className="container">
          <SectionHeading
            eyebrow="Begin where your heart is called"
            arabic="اِهْدِنَا الصِّرَاطَ الْمُسْتَقِيم"
            title={<>Pathways into the <em>tradition.</em></>}
            intro="Three doors into the same sanctuary — the witness of Karbala, the lives of the Fourteen, and the Book that gathers every chapter of the story."
            align="center"
          />

          <div className="featured-paths">
            <Reveal className="feature-card feature-card--large">
              <Link to="/karbala" className="feature-card__link">
                <div className="feature-card__media">
                  <img
                    src="/images/hero-karbala.jpg"
                    alt="The shrine of Imam Hussain in Karbala."
                    loading="lazy"
                  />
                  <div className="feature-card__veil" aria-hidden="true" />
                </div>
                <div className="feature-card__content">
                  <span className="tag tag--gold">Karbala · 61 AH</span>
                  <h3 className="feature-card__title display">The stand that <em>changed history.</em></h3>
                  <p>
                    From Medina to the plains of Karbala, trace the journey of Imam Hussain and the
                    companions who chose truth over survival.
                  </p>
                  <span className="feature-card__cta">Read the history <ArrowUpRight size={16} /></span>
                </div>
                <span className="feature-card__number" aria-hidden="true">01</span>
              </Link>
            </Reveal>

            <Reveal className="feature-card feature-card--seal" delay={0.06}>
              <Link to="/masoomeen" className="feature-card__link">
                <GeometricPattern className="feature-card__pattern" opacity={0.16} />
                <div className="feature-card__content">
                  <span className="tag tag--outline">The Fourteen</span>
                  <h3 className="feature-card__title display">Lives of the <em>Infallibles.</em></h3>
                  <p>
                    The Prophet, his daughter, and the twelve Imams — a continuous chain of
                    guidance, knowledge, and sacrifice.
                  </p>
                  <div className="feature-card__names arabic" dir="rtl" lang="ar" aria-hidden="true">
                    مُحَمَّد · عَلِيّ · فَاطِمَة · حَسَن · حُسَيْن
                  </div>
                  <span className="feature-card__cta">Meet the household <ArrowUpRight size={16} /></span>
                </div>
                <span className="feature-card__number" aria-hidden="true">02</span>
              </Link>
            </Reveal>

            <Reveal className="feature-card feature-card--quran" delay={0.12}>
              <Link to="/quran" className="feature-card__link">
                <div className="feature-card__media feature-card__media--quran">
                  <img
                    src="/images/quran-manuscript.jpg"
                    alt="An early Qur'an manuscript page."
                    loading="lazy"
                  />
                  <div className="feature-card__veil" aria-hidden="true" />
                </div>
                <div className="feature-card__content">
                  <span className="tag tag--outline">The Book</span>
                  <h3 className="feature-card__title display">Read, listen, <em>reflect.</em></h3>
                  <p>
                    The Qur’an in Arabic with an English translation, verse reflections, and a
                    guided way into its 114 surahs.
                  </p>
                  <span className="feature-card__cta">Open the Qur’an <ArrowUpRight size={16} /></span>
                </div>
                <span className="feature-card__number" aria-hidden="true">03</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Duas & Ziyarat ──────────────────────────────────── */}
      <section className="section section--duas">
        <div className="container">
          <div className="section-heading-row">
            <SectionHeading
              eyebrow="Words that carry the heart"
              arabic="دُعَاء · زِيَارَة"
              title={<>Supplication & <em>visitation.</em></>}
              intro="The Ahlulbayt taught their followers to speak to God in every condition. Read with Arabic, transliteration, English, and Urdu — in a reading space of your own."
            />
            <Link to="/duas" className="btn btn--ghost section-heading-row__cta">
              All duas & ziyarat <ArrowRight size={16} />
            </Link>
          </div>

          <div className="dua-grid">
            {featuredDuas.map((item, index) => (
              <Reveal key={item.slug} delay={index * 0.06}>
                <SupplicationCard item={item} index={index} />
              </Reveal>
            ))}
          </div>

          <Reveal className="dua-feature-note">
            <div className="dua-feature-note__icon"><BookOpen size={20} /></div>
            <div>
              <strong>A reader made for reverence</strong>
              <p>
                Adjust the Arabic type, enter distraction-free reading mode, follow the English and
                Urdu, and keep your place with a bookmark — all stored privately on your device.
              </p>
            </div>
            <Link to="/duas/dua-kumayl" className="text-link">
              Open Dua Kumayl <ArrowUpRight size={15} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Karbala feature ──────────────────────────────────── */}
      <section className="section section--karbala-feature">
        <div className="container karbala-feature">
          <Reveal className="karbala-feature__media">
            <div className="image-frame image-frame--landscape">
              <img
                src="/images/abbas-shrine.jpg"
                alt="The shrine of Hazrat Abbas in Karbala."
                loading="lazy"
              />
              <div className="image-frame__overlay" aria-hidden="true" />
            </div>
            <div className="karbala-feature__badge">
              <span className="arabic" dir="rtl" lang="ar">الْعَبَّاس</span>
              <span>The Moon of the Hashimites</span>
            </div>
          </Reveal>

          <Reveal className="karbala-feature__body" delay={0.08}>
            <SectionHeading
              eyebrow="The witness of Karbala"
              arabic="كَرْبَلَاء"
              title={<>A plain that became <em>a conscience for the world.</em></>}
              intro="In 61 AH, a small caravan stood before an empire. What happened at Karbala was not only a battle — it was a declaration that faith cannot be separated from justice."
            />
            <div className="karbala-feature__timeline">
              {karbalaTimeline.slice(1, 5).map((event) => (
                <div className="timeline-mini" key={event.title}>
                  <span className="timeline-mini__year">{event.year}</span>
                  <div>
                    <strong>{event.title}</strong>
                    <p>{event.text.split('.')[0]}.</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/karbala" className="btn btn--gold">
              Walk through the history <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Daily reflection ─────────────────────────────────── */}
      <section className="section section--reflection">
        <div className="container reflection-panel">
          <div className="reflection-panel__side">
            <span className="eyebrow"><Sparkles size={13} /> Daily reflection</span>
            <div className="reflection-panel__date">
              <CalendarDays size={16} />
              <span>{today}</span>
            </div>
            <p>
              A verse to carry into the hours ahead. Return through the day, or begin again with
              another verse.
            </p>
            <button
              type="button"
              className="btn btn--ghost btn--small"
              onClick={() => setReflectionIndex((current) => (current + 1) % dailyReflections.length)}
            >
              Another reflection <ArrowRight size={15} />
            </button>
          </div>

          <div className="reflection-panel__body" key={reflectionIndex}>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="reflection-panel__arabic arabic" dir="rtl" lang="ar">{reflection.arabic}</p>
              <p className="reflection-panel__english">{reflection.english}</p>
              <div className="reflection-panel__meta">
                <span>{reflection.source}</span>
                <span className="reflection-panel__prompt">{reflection.prompt}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Books strip ──────────────────────────────────────── */}
      <section className="section section--books">
        <div className="container">
          <div className="section-heading-row">
            <SectionHeading
              eyebrow="A library of the tradition"
              arabic="عِلْم · مَعْرِفَة"
              title={<>Books that <em>endure.</em></>}
              intro="From Nahj al-Balagha to the great tafsir traditions, begin a reading life grounded in the sources."
            />
            <Link to="/books" className="btn btn--ghost section-heading-row__cta">
              Enter the library <ArrowRight size={16} />
            </Link>
          </div>

          <div className="book-strip">
            {featuredBookItems.map((book, index) => (
              <Reveal key={book.slug} delay={index * 0.06}>
                <Link to="/books" className="book-tile">
                  <div className="book-tile__cover">
                    <span className="book-tile__category">{book.category}</span>
                    <span className="book-tile__arabic arabic" dir="rtl" lang="ar">{book.arabic}</span>
                    <span className="book-tile__ornament" aria-hidden="true">✦</span>
                  </div>
                  <div className="book-tile__body">
                    <h3>{book.title}</h3>
                    <p>{book.author}</p>
                    <span className="book-tile__note">{book.note}</span>
                  </div>
                  <ArrowUpRight size={17} className="book-tile__arrow" aria-hidden="true" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing invocation ───────────────────────────────── */}
      <section className="closing-invocation">
        <div className="container closing-invocation__inner">
          <Reveal>
            <Ornament />
            <p className="closing-invocation__arabic arabic" dir="rtl" lang="ar">
              السَّلَامُ عَلَيْكَ يَا أَبَا عَبْدِ اللَّهِ الْحُسَيْنَ
            </p>
            <p className="closing-invocation__translation">
              Peace be upon you, O Abu ‘Abdillah al-Hussain.
            </p>
            <div className="closing-invocation__links">
              <Link to="/ziyarat/ziyarat-ashura" className="text-link">
                Recite Ziyarat Ashura <ArrowUpRight size={15} />
              </Link>
              <span className="closing-invocation__dot" aria-hidden="true">·</span>
              <Link to="/muharram" className="text-link">
                Enter the season of Muharram <ArrowUpRight size={15} />
              </Link>
            </div>
          </Reveal>
          <div className="closing-invocation__scroll" aria-hidden="true">
            <MoveDown size={16} />
            <span>Continue into the sanctuary</span>
          </div>
        </div>
      </section>
    </>
  )
}
