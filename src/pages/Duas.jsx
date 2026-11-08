import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Bookmark, Languages, Maximize2, SlidersHorizontal } from 'lucide-react'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import SupplicationCard from '../components/SupplicationCard'
import Ornament from '../components/Ornament'
import { supplications } from '../data/supplications'
import { useBookmarks } from '../hooks/useLocalStorage'

const features = [
  { icon: Languages, title: 'Four languages', text: 'Arabic, transliteration, English and Urdu — shown together or one at a time.' },
  { icon: SlidersHorizontal, title: 'Your reading type', text: 'Adjust the Arabic size for comfort, from intimate to expansive.' },
  { icon: Maximize2, title: 'Reading mode', text: 'A quiet, distraction-free space that keeps only the words before you.' },
  { icon: Bookmark, title: 'Private bookmarks', text: 'Save a supplication on your device and return to it without an account.' },
]

export default function Duas() {
  const duas = useMemo(() => supplications.filter((item) => item.type === 'dua'), [])
  const { bookmarks } = useBookmarks()
  const [tag, setTag] = useState('All')
  const tags = useMemo(() => ['All', ...new Set(duas.flatMap((item) => item.tags || []))], [duas])
  const filtered = tag === 'All' ? duas : duas.filter((item) => item.tags?.includes(tag))
  const saved = duas.filter((item) => bookmarks.includes(item.slug))
  const featured = duas.find((item) => item.slug === 'dua-kumayl') || duas[0]

  return (
    <>
      <Seo
        title="Duas"
        description="Read the supplications of the Ahlulbayt — Dua Kumayl, Dua Tawassul, Dua Nudba and Dua al-Faraj — with Arabic, transliteration, English and Urdu."
      />

      <PageHero
        eyebrow="Supplication of the household"
        arabic="الدُّعَاءُ سِلَاحُ الْمُؤْمِن"
        title="The believer’s weapon,"
        titleAccent="the heart’s quiet return."
        intro="The Ahlulbayt taught their followers to speak to God in every condition: in need, in gratitude, in longing, and in the dark. Read their supplications with care and space."
        image="/images/kadhimiya.jpg"
        imageAlt="The Al-Kadhimiya shrine in Baghdad, Iraq."
        breadcrumb={[{ label: 'Duas' }]}
        imageCaption="Al-Kadhimiya shrine · Baghdad, Iraq"
      >
        <a href="#dua-library" className="btn btn--gold">
          Enter the dua library <ArrowRight size={16} />
        </a>
        <Link to="/ziyarat" className="btn btn--glass">
          Ziyarat <ArrowUpRight size={16} />
        </Link>
      </PageHero>

      <section className="section section--library-intro">
        <div className="container">
          <div className="library-note">
            <div className="library-note__seal" aria-hidden="true">
              <span className="arabic" dir="rtl" lang="ar">دُعَاء</span>
            </div>
            <div className="library-note__body">
              <span className="eyebrow">A reader made for reverence</span>
              <h2 className="display">Read slowly. <em>Return often.</em></h2>
              <p>
                Every reader in the HUSSAINI library is built for the way a supplication is actually
                read: with attention. Choose the languages you need, set the Arabic type to your
                comfort, and enter a quiet mode when the world is too loud.
              </p>
            </div>
            <div className="library-note__features">
              {features.map(({ icon: Icon, title, text }) => (
                <div className="library-feature" key={title}>
                  <Icon size={17} />
                  <div>
                    <strong>{title}</strong>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--library" id="dua-library">
        <div className="container">
          <div className="section-heading-row">
            <SectionHeading
              eyebrow="The collection"
              arabic="أَدْعِيَة"
              title={<>Four <em>supplications.</em></>}
              intro="Selections from the treasury of Shia devotional literature, presented with their sources and links to the complete text and audio."
            />
            <div className="library-count">
              <strong>{duas.length}</strong>
              <span>duas</span>
            </div>
          </div>

          {saved.length > 0 && (
            <Reveal className="saved-strip">
              <div className="saved-strip__head">
                <Bookmark size={15} />
                <span>Saved on this device</span>
              </div>
              <div className="saved-strip__links">
                {saved.map((item) => (
                  <Link key={item.slug} to={`/duas/${item.slug}`} className="saved-chip">
                    {item.title} <ArrowUpRight size={13} />
                  </Link>
                ))}
              </div>
            </Reveal>
          )}

          <div className="library-filter">
            {tags.map((item) => (
              <button
                key={item}
                type="button"
                className={`filter-chip ${tag === item ? 'is-active' : ''}`}
                onClick={() => setTag(item)}
                aria-pressed={tag === item}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="dua-grid dua-grid--library">
            {filtered.map((item, index) => (
              <Reveal key={item.slug} delay={index * 0.05}>
                <SupplicationCard item={item} index={index} />
              </Reveal>
            ))}
          </div>

          {featured && (
            <Reveal className="featured-devotion">
              <div className="featured-devotion__pattern" aria-hidden="true" />
              <div className="featured-devotion__content">
                <span className="tag tag--gold">Begin here</span>
                <span className="featured-devotion__arabic arabic" dir="rtl" lang="ar">{featured.arabicTitle}</span>
                <h3 className="display">{featured.title}</h3>
                <p>{featured.summary}</p>
                <div className="featured-devotion__meta">
                  <span>{featured.attributedTo}</span>
                  <span>{featured.occasion}</span>
                  <span>{featured.readingTime}</span>
                </div>
                <Link to={`/duas/${featured.slug}`} className="btn btn--gold">
                  Read with presence <ArrowRight size={16} />
                </Link>
              </div>
              <div className="featured-devotion__aside">
                <Ornament />
                <span className="arabic" dir="rtl" lang="ar">يَا حَيُّ يَا قَيُّوم</span>
                <p>“O Living, O Sustaining.”</p>
                <small>A name of God invoked in the supplications</small>
              </div>
            </Reveal>
          )}

          <Reveal className="source-note">
            <strong>About this edition</strong>
            <p>
              Supplications are transcribed from Duas.org. Where the complete text is lengthy, this
              edition presents selected passages and clearly labels them; a link to the complete
              text and audio is provided in each reader. The Urdu renderings were prepared for this
              edition from the English translation. They are offered as an aid, not as a substitute
              for the original Arabic.
            </p>
            <a href="https://www.duas.org" target="_blank" rel="noreferrer" className="text-link">
              Visit Duas.org <ArrowUpRight size={14} />
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section section--cross-link">
        <div className="container cross-link-panel">
          <div>
            <span className="eyebrow">Visitation</span>
            <h2 className="display">Ziyarat is <em>presence.</em></h2>
            <p>
              The ziyarat texts turn the heart toward the shrines and the lives remembered there.
              Recite Ziyarat Ashura, Waritha, Aal-e-Yasin, and the Jamia Kabira.
            </p>
          </div>
          <Link to="/ziyarat" className="btn btn--gold">
            Enter the ziyarat library <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
