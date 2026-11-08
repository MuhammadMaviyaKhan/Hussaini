import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, BookMarked, ExternalLink, Library, Search } from 'lucide-react'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import Ornament from '../components/Ornament'
import { bookCategories, books } from '../data/books'

const readingPaths = [
  {
    label: 'Begin with wisdom',
    arabic: 'الْحِكْمَة',
    books: ['Nahj al-Balagha', 'Sahifa Sajjadiyya', 'Risalat al-Huquq'],
    text: 'Two classics of eloquence and prayer, and a treatise on the rights that bind every person to every other.',
  },
  {
    label: 'Understand the story',
    arabic: 'التَّارِيخ',
    books: ['Kitab al-Irshad', 'The Message', 'Bihar al-Anwar'],
    text: 'The lives of the Imams and the prophetic story, told through the scholarship of the tradition.',
  },
  {
    label: 'Go deeper',
    arabic: 'الْعِلْم',
    books: ['Al-Mizan fi Tafsir al-Qur’an', 'Al-Kafi', 'Man La Yahduruhu al-Faqih'],
    text: 'Tafsir, hadith, and law for the reader ready to sit with the sources over a longer season.',
  },
]

export default function Books() {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return books.filter((book) => {
      const matchesCategory = category === 'All' || book.category === category
      if (!matchesCategory) return false
      if (!q) return true
      return `${book.title} ${book.author} ${book.category} ${book.description}`.toLowerCase().includes(q)
    })
  }, [category, query])

  return (
    <>
      <Seo
        title="Islamic Books Library"
        description="A curated library of Shia Islamic books: Nahj al-Balagha, Sahifa Sajjadiyya, Al-Kafi, Al-Mizan, Kitab al-Irshad and more, with links to complete translations."
      />

      <PageHero
        eyebrow="The HUSSAINI library"
        arabic="مَكْتَبَة"
        title="A reading life"
        titleAccent="rooted in the sources."
        intro="From the sermons of Imam Ali to the tafsir of Allama Tabataba’i, these works form a library for the seeker, the student, and the household."
        image="/images/quran-manuscript.jpg"
        imageAlt="A page from an early Qur'an manuscript."
        breadcrumb={[{ label: 'Books Library' }]}
        imageCaption="An early Qur’an manuscript · Birmingham, UK"
      >
        <a href="#library" className="btn btn--gold">
          Enter the library <ArrowRight size={16} />
        </a>
        <Link to="/hadith" className="btn btn--glass">
          Read hadith online
        </Link>
      </PageHero>

      <section className="section section--library-stats">
        <div className="container library-stats">
          <div><Library size={20} /><strong>{books.length}</strong><span>Curated works</span></div>
          <div><BookMarked size={20} /><strong>{bookCategories.length - 1}</strong><span>Categories</span></div>
          <div><span className="arabic" dir="rtl" lang="ar">عِلْم</span><strong>14</strong><span>Centuries of scholarship</span></div>
          <div><span className="arabic" dir="rtl" lang="ar">قِرَاءَة</span><strong>∞</strong><span>A lifetime of return</span></div>
        </div>
      </section>

      <section className="section section--library" id="library">
        <div className="container">
          <SectionHeading
            eyebrow="The collection"
            arabic="الْكُتُب"
            title={<>Twelve works to <em>begin with.</em></>}
            intro="Each work is linked to a complete translation or the publisher’s edition where available. External links open in a new tab."
            align="center"
          />

          <div className="books-toolbar">
            <div className="books-search">
              <Search size={16} />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search the library…"
                aria-label="Search books"
              />
            </div>
            <div className="books-categories">
              {bookCategories.map((item) => (
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

          <div className="books-grid">
            {filtered.map((book, index) => (
              <Reveal className="library-card" key={book.slug} delay={(index % 3) * 0.05}>
                <div className="library-card__cover">
                  <span className="library-card__cover-category">{book.category}</span>
                  <span className="library-card__cover-arabic arabic" dir="rtl" lang="ar">{book.arabic}</span>
                  <span className="library-card__cover-rule" aria-hidden="true" />
                  <span className="library-card__cover-title">{book.title}</span>
                  <span className="library-card__cover-star" aria-hidden="true">✦</span>
                </div>
                <div className="library-card__body">
                  <span className="library-card__era">{book.era}</span>
                  <h3>{book.title}</h3>
                  <p className="library-card__author">{book.author}</p>
                  <p className="library-card__description">{book.description}</p>
                  <div className="library-card__footer">
                    <span className="tag tag--outline">{book.note}</span>
                    <a href={book.link} target="_blank" rel="noreferrer">
                      Read <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="books-empty">No book matches that search. Try another title or category.</p>
          )}

          <Reveal className="library-source-note">
            <strong>On translations & editions</strong>
            <p>
              HUSSAINI does not host copyrighted translations. When a complete translation is
              available through Al-Islam.org or another publisher, it is linked directly. Where a
              work exists in many editions, readers are encouraged to consult a recognised print
              edition and a qualified teacher.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--reading-paths">
        <div className="container">
          <SectionHeading
            eyebrow="Where to begin"
            arabic="مَسَارَاتُ الْقِرَاءَة"
            title={<>Three reading <em>paths.</em></>}
            intro="A library can overwhelm. These paths offer a modest sequence for different seasons of life."
            align="center"
          />
          <div className="path-grid">
            {readingPaths.map((path, index) => (
              <Reveal className="path-card" key={path.label} delay={index * 0.06}>
                <span className="path-card__number">0{index + 1}</span>
                <span className="path-card__arabic arabic" dir="rtl" lang="ar">{path.arabic}</span>
                <h3>{path.label}</h3>
                <p>{path.text}</p>
                <ul>
                  {path.books.map((book) => <li key={book}>{book}</li>)}
                </ul>
              </Reveal>
            ))}
          </div>
          <Reveal className="reading-paths__cta">
            <Ornament />
            <p>Looking for devotional reading instead?</p>
            <div>
              <Link to="/duas" className="btn btn--gold">Duas & ziyarat <ArrowRight size={16} /></Link>
              <Link to="/quran" className="btn btn--ghost">Open the Qur’an</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--sources-cta">
        <div className="container sources-cta">
          <div>
            <span className="eyebrow">A note on scholarship</span>
            <h2 className="display">Read widely. <em>Verify carefully.</em></h2>
            <p>
              This library is an orientation, not a substitute for scholarship. Dates, attributions,
              and translations differ across editions. Where a question of law or creed arises,
              consult a qualified scholar.
            </p>
          </div>
          <Link to="/about#principles" className="btn btn--gold">
            Our editorial principles <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
