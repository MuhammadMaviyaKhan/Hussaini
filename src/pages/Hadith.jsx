import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, BookOpen, Check, Copy, Quote, Search, ShieldCheck } from 'lucide-react'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import Ornament from '../components/Ornament'
import { hadithCategories, hadithFigures, hadiths } from '../data/hadith'

function copyText(text) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text)
  return Promise.resolve()
}

const featured = hadiths.find((hadith) => hadith.id === 'thaqalayn') || hadiths[0]
const methods = [
  {
    title: 'The chain',
    arabic: 'الْإِسْنَاد',
    text: 'A hadith is transmitted through a chain of narrators. Scholars examine the character, memory, and continuity of that chain before accepting a report.',
  },
  {
    title: 'The text',
    arabic: 'الْمَتْن',
    text: 'The wording is compared across chains and collections. A report that contradicts the Qur’an or established theology is not accepted merely because it is famous.',
  },
  {
    title: 'The context',
    arabic: 'السِّيَاق',
    text: 'A saying is read within its occasion, audience, and literary form. Context protects the reader from turning wisdom into a slogan.',
  },
]

export default function Hadith() {
  const [category, setCategory] = useState('All')
  const [figure, setFigure] = useState('All')
  const [query, setQuery] = useState('')
  const [copied, setCopied] = useState(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return hadiths.filter((hadith) => {
      const matchesCategory = category === 'All' || hadith.category === category
      const matchesFigure = figure === 'All' || hadith.figure === figure
      if (!matchesCategory || !matchesFigure) return false
      if (!q) return true
      return `${hadith.arabic} ${hadith.english} ${hadith.figure} ${hadith.source} ${hadith.category}`.toLowerCase().includes(q)
    })
  }, [category, figure, query])

  const copyHadith = async (hadith) => {
    await copyText(`${hadith.arabic}\n\n${hadith.english}\n\n— ${hadith.figure}, ${hadith.source}`)
    setCopied(hadith.id)
    window.setTimeout(() => setCopied(null), 1800)
  }

  return (
    <>
      <Seo
        title="Hadith"
        description="Wisdom from the Prophet Muhammad ﷺ and the Ahlulbayt: a curated hadith collection with Arabic, English, sources, and context for reading with care."
      />

      <PageHero
        eyebrow="Wisdom of the household"
        arabic="الْحَدِيث"
        title="Words that guide"
        titleAccent="when the noise fades."
        intro="Hadith preserve the speech of the Prophet and the Imams: short sayings, long counsels, and quiet instructions that have shaped the lives of believers for generations."
        image="/images/kadhimiya.jpg"
        imageAlt="The Al-Kadhimiya shrine in Baghdad, Iraq."
        breadcrumb={[{ label: 'Hadith' }]}
        imageCaption="Al-Kadhimiya shrine · Baghdad, Iraq"
      >
        <a href="#hadith-collection" className="btn btn--gold">
          Enter the collection <ArrowRight size={16} />
        </a>
        <Link to="/books" className="btn btn--glass">
          Hadith collections in the library
        </Link>
      </PageHero>

      <section className="section section--hadith-featured">
        <div className="container hadith-featured">
          <Reveal className="hadith-featured__label">
            <span className="eyebrow"><Quote size={13} /> The two weighty things</span>
            <h2 className="display">A trust for <em>every generation.</em></h2>
            <p>
              The Prophet’s final counsel to the community joins the Book of Allah and his family.
              This hadith is the foundation of the Shia understanding of guidance after the
              Prophet.
            </p>
            <Link to="/ahlulbayt" className="text-link">
              Why the household matters <ArrowUpRight size={15} />
            </Link>
          </Reveal>
          <Reveal className="hadith-featured__card" delay={0.08}>
            <span className="arabic" dir="rtl" lang="ar">{featured.arabic}</span>
            <p>{featured.english}</p>
            <div>
              <strong>{featured.figure}</strong>
              <span>{featured.source}</span>
            </div>
            <Ornament />
          </Reveal>
        </div>
      </section>

      <section className="section section--hadith-collection" id="hadith-collection">
        <div className="container">
          <SectionHeading
            eyebrow="The collection"
            arabic="أَحَادِيثُ مُخْتَارَة"
            title={<>A treasury of <em>guidance.</em></>}
            intro="Filter by theme or by the figure who spoke the words. Each entry includes its Arabic text, an English rendering, and its cited source."
            align="center"
          />

          <div className="hadith-controls">
            <div className="hadith-search">
              <Search size={16} />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search a word, a theme, a source…"
                aria-label="Search hadith"
              />
            </div>
            <div className="hadith-figure-filter">
              <button
                type="button"
                className={`filter-chip ${figure === 'All' ? 'is-active' : ''}`}
                onClick={() => setFigure('All')}
              >
                All voices
              </button>
              {hadithFigures.map((name) => (
                <button
                  key={name}
                  type="button"
                  className={`filter-chip ${figure === name ? 'is-active' : ''}`}
                  onClick={() => setFigure(name)}
                >
                  {name.replace(' ﷺ', '').replace(' (a)', '').replace(' (aj)', '')}
                </button>
              ))}
            </div>
            <div className="hadith-category-filter">
              {hadithCategories.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`filter-chip ${category === item ? 'is-active' : ''}`}
                  onClick={() => setCategory(item)}
                  aria-pressed={category === item}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="hadith-grid">
            {filtered.map((hadith, index) => (
              <Reveal className="hadith-card" key={hadith.id} delay={(index % 3) * 0.05}>
                <div className="hadith-card__head">
                  <span className={`tag tag--${hadith.category.toLowerCase()}`}>{hadith.category}</span>
                  <button
                    type="button"
                    className="hadith-card__copy"
                    onClick={() => copyHadith(hadith)}
                    aria-label="Copy this hadith"
                  >
                    {copied === hadith.id ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copied === hadith.id ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p className="hadith-card__arabic arabic" dir="rtl" lang="ar">{hadith.arabic}</p>
                <p className="hadith-card__english">{hadith.english}</p>
                <div className="hadith-card__foot">
                  <span className="hadith-card__figure">{hadith.figure}</span>
                  <span className="hadith-card__source">{hadith.source}</span>
                  {hadith.context && <p>{hadith.context}</p>}
                </div>
              </Reveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="hadith-empty">No hadith matches those filters. Try another word or theme.</p>
          )}
        </div>
      </section>

      <section className="section section--hadith-method">
        <div className="container">
          <div className="method-head">
            <SectionHeading
              eyebrow="Reading with care"
              arabic="عِلْمُ الْحَدِيث"
              title={<>A tradition that <em>asks for care.</em></>}
              intro="Not every report is equal. The scholarly tradition developed a rigorous method for preserving and evaluating hadith — a method worth carrying into the way we read online."
            />
            <div className="method-head__seal">
              <ShieldCheck size={24} />
              <span>Verified sources, cited</span>
              <small>Every entry in this collection is presented with a source.</small>
            </div>
          </div>
          <div className="method-grid">
            {methods.map((method, index) => (
              <Reveal className="method-card" key={method.title} delay={index * 0.05}>
                <span className="method-card__number">0{index + 1}</span>
                <span className="method-card__arabic arabic" dir="rtl" lang="ar">{method.arabic}</span>
                <h3>{method.title}</h3>
                <p>{method.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="method-note">
            <BookOpen size={19} />
            <div>
              <strong>About the translations</strong>
              <p>
                The English renderings are working translations prepared for this edition. They
                aim at clarity rather than literal equivalence; where the Arabic admits several
                meanings, the reader should consult a qualified scholar and the fuller commentary
                tradition. Narrations from the Prophet ﷺ are cited to their Sunni collections where
                the report is shared; narrations from the Imams are cited to Shia collections.
              </p>
            </div>
            <Link to="/books" className="text-link">Explore the library <ArrowUpRight size={14} /></Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
