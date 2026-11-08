import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowDown,
  ArrowUp,
  BookOpen,
  Check,
  Copy,
  ExternalLink,
  Search,
  Sparkles,
  Type,
} from 'lucide-react'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import Ornament from '../components/Ornament'
import { getLocalSurah, quranStats, reflectionVerses, surahIndex } from '../data/quran'
import { useLocalStorage } from '../hooks/useLocalStorage'

const filters = ['All', 'Meccan', 'Medinan', 'In this edition']

const normalizeSearch = (value) =>
  String(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\u064b-\u065f\u0670]/g, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()

function editDistance(a, b) {
  let previous = Array.from({ length: b.length + 1 }, (_, index) => index)
  for (let i = 1; i <= a.length; i += 1) {
    const current = [i]
    for (let j = 1; j <= b.length; j += 1) {
      current[j] = Math.min(
        previous[j] + 1,
        current[j - 1] + 1,
        previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      )
    }
    previous = current
  }
  return previous[b.length]
}

const surahSearchText = (surah) =>
  normalizeSearch(`${surah.number} ${surah.englishName} ${surah.meaning} ${surah.name}`)

function fuzzyMatchesSurah(searchable, normalizedQuery) {
  if (normalizedQuery.length < 4) return false

  const tokens = searchable.split(' ')
  return normalizedQuery.split(' ').every((term) =>
    tokens.some((token) => {
      if (token.includes(term)) return true
      if (term.length < 4) return false
      return editDistance(token, term) <= (term.length >= 5 ? 2 : 1)
    }),
  )
}

function copyText(text) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text)
  return Promise.resolve()
}

export default function Quran() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(1)
  const [showTranslation, setShowTranslation] = useLocalStorage('hussaini:quran-translation', true)
  const [arabicSize, setArabicSize] = useLocalStorage('hussaini:quran-size', 30)
  const [copiedAyah, setCopiedAyah] = useState(null)

  const filteredSurahs = useMemo(() => {
    const q = normalizeSearch(query)
    const inFilter = surahIndex.filter(
      (surah) =>
        filter === 'All' ||
        (filter === 'In this edition' ? Boolean(getLocalSurah(surah.number)) : surah.revelation === filter),
    )
    if (!q) return inFilter

    const direct = inFilter.filter((surah) => surahSearchText(surah).includes(q))
    if (direct.length > 0) return direct
    return inFilter.filter((surah) => fuzzyMatchesSurah(surahSearchText(surah), q))
  }, [query, filter])

  const surahMeta = surahIndex.find((surah) => surah.number === selected) || surahIndex[0]
  const localSurah = getLocalSurah(selected)
  const availableCount = surahIndex.filter((surah) => getLocalSurah(surah.number)).length

  const selectSurah = (number) => {
    setSelected(number)
    document.getElementById('quran-reader')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const copyAyah = async (ayah) => {
    await copyText(`${ayah.arabic}\n\n${ayah.english}\n\n${surahMeta.englishName} ${surahMeta.number}:${ayah.n}`)
    setCopiedAyah(ayah.n)
    window.setTimeout(() => setCopiedAyah(null), 1800)
  }

  return (
    <>
      <Seo
        title="The Qur’an"
        description="Read the Qur’an with Arabic text and the English translation of Marmaduke Pickthall. Explore all 114 surahs, 14 complete surahs in this edition, and verses for reflection."
      />

      <PageHero
        eyebrow="The book of light"
        arabic="الْقُرْآنُ الْكَرِيم"
        title="A book that reads"
        titleAccent="the reader in return."
        intro="The Qur’an is the primary trust of the Prophet’s household — recited, preserved, and reflected upon in every generation. Read select surahs here in Arabic with an English translation."
        image="/images/quran-manuscript.jpg"
        imageAlt="A page from an early Qur'an manuscript."
        breadcrumb={[{ label: 'Qur’an' }]}
        imageCaption="An early Qur’an manuscript · Birmingham, UK"
      >
        <a href="#quran-reader" className="btn btn--gold">
          Begin reading <ArrowDown size={16} />
        </a>
        <Link to="/hadith" className="btn btn--glass">
          Explore hadith
        </Link>
      </PageHero>

      <section className="section section--quran-stats">
        <div className="container quran-stats">
          <div className="quran-stat">
            <strong>{quranStats.surahs}</strong>
            <span>Surahs</span>
            <small>The chapters of the Book</small>
          </div>
          <div className="quran-stat">
            <strong>{quranStats.verses.toLocaleString('en')}</strong>
            <span>Verses</span>
            <small>In the Uthmani text</small>
          </div>
          <div className="quran-stat">
            <strong>{quranStats.juz}</strong>
            <span>Juz’</span>
            <small>Traditional divisions</small>
          </div>
          <div className="quran-stat">
            <strong>{availableCount}</strong>
            <span>Complete here</span>
            <small>With local English translation</small>
          </div>
        </div>
      </section>

      <section className="section section--quran-explorer" id="quran-reader">
        <div className="container">
          <div className="quran-explorer">
            <aside className="quran-sidebar" aria-label="Surah index">
              <div className="quran-sidebar__head">
                <div>
                  <span className="eyebrow">Surah index</span>
                  <h2 className="display">The 114 chapters</h2>
                </div>
                <span className="quran-sidebar__count">{filteredSurahs.length}</span>
              </div>

              <div className="quran-search">
                <Search size={16} aria-hidden="true" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search a surah…"
                  aria-label="Search surahs"
                />
              </div>

              <div className="quran-filters" role="group" aria-label="Filter surahs">
                {filters.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`filter-chip ${filter === item ? 'is-active' : ''}`}
                    onClick={() => setFilter(item)}
                    aria-pressed={filter === item}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="quran-surah-list">
                {filteredSurahs.map((surah) => {
                  const isLocal = Boolean(getLocalSurah(surah.number))
                  return (
                    <button
                      key={surah.number}
                      type="button"
                      className={`surah-row ${selected === surah.number ? 'is-active' : ''}`}
                      onClick={() => selectSurah(surah.number)}
                    >
                      <span className="surah-row__number">{String(surah.number).padStart(3, '0')}</span>
                      <span className="surah-row__body">
                        <strong>{surah.englishName}</strong>
                        <small>{surah.meaning} · {surah.verses} verses</small>
                      </span>
                      <span className="surah-row__arabic arabic" dir="rtl" lang="ar">{surah.name.replace('سُورَةُ ', '')}</span>
                      {isLocal && <span className="surah-row__dot" title="Complete in this edition" />}
                    </button>
                  )
                })}
                {filteredSurahs.length === 0 && (
                  <p className="quran-empty">No surah matches that search.</p>
                )}
              </div>
              <p className="quran-sidebar__legend"><span className="surah-row__dot" /> Complete in this edition</p>
            </aside>

            <div className="quran-reader">
              <div className="quran-reader__head">
                <div>
                  <span className="quran-reader__eyebrow">Surah {surahMeta.number}</span>
                  <h2 className="display">{surahMeta.englishName}</h2>
                  <p>{surahMeta.meaning} · {surahMeta.revelation} · {surahMeta.verses} verses</p>
                </div>
                <span className="quran-reader__arabic arabic" dir="rtl" lang="ar">{surahMeta.name}</span>
              </div>

              <div className="quran-reader__toolbar">
                <button
                  type="button"
                  className={`filter-chip ${showTranslation ? 'is-active' : ''}`}
                  onClick={() => setShowTranslation((value) => !value)}
                  aria-pressed={showTranslation}
                >
                  <BookOpen size={14} /> Translation
                </button>
                <div className="quran-font">
                  <Type size={14} />
                  <button type="button" onClick={() => setArabicSize((value) => Math.max(22, value - 2))} aria-label="Decrease Arabic size">−</button>
                  <span>{arabicSize}px</span>
                  <button type="button" onClick={() => setArabicSize((value) => Math.min(48, value + 2))} aria-label="Increase Arabic size">+</button>
                </div>
                <a
                  href={`https://quran.com/${surahMeta.number}`}
                  target="_blank"
                  rel="noreferrer"
                  className="quran-reader__external"
                >
                  Listen & compare <ExternalLink size={13} />
                </a>
              </div>

              {localSurah ? (
                <div className="quran-ayat" style={{ '--quran-arabic-size': `${arabicSize}px` }}>
                  {localSurah.number !== 1 && localSurah.number !== 9 && (
                    <div className="quran-bismillah">
                      <span className="arabic" dir="rtl" lang="ar">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
                      <small>In the name of Allah, the Beneficent, the Merciful</small>
                    </div>
                  )}
                  {localSurah.ayahs.map((ayah) => (
                    <div className="ayah" key={ayah.n}>
                      <div className="ayah__meta">
                        <span className="ayah__number">{surahMeta.number}:{ayah.n}</span>
                        <button
                          type="button"
                          className="ayah__copy"
                          onClick={() => copyAyah(ayah)}
                          aria-label={`Copy verse ${surahMeta.number}:${ayah.n}`}
                        >
                          {copiedAyah === ayah.n ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                      </div>
                      <p className="ayah__arabic arabic" dir="rtl" lang="ar">{ayah.arabic}</p>
                      {showTranslation && <p className="ayah__english">{ayah.english}</p>}
                    </div>
                  ))}
                  <div className="quran-reader__end">
                    <Ornament />
                    <span>End of Surah {surahMeta.englishName}</span>
                  </div>
                </div>
              ) : (
                <div className="quran-unavailable">
                  <span className="quran-unavailable__arabic arabic" dir="rtl" lang="ar">{surahMeta.name}</span>
                  <Sparkles size={20} />
                  <h3 className="display">This surah is not yet in the local edition.</h3>
                  <p>
                    HUSSAINI currently includes the complete Arabic text and English translation
                    for {availableCount} surahs. Surah {surahMeta.englishName} is available in full
                    through the external reader below.
                  </p>
                  <div className="quran-unavailable__actions">
                    <a href={`https://quran.com/${surahMeta.number}`} target="_blank" rel="noreferrer" className="btn btn--gold">
                      Read Surah {surahMeta.number} <ExternalLink size={15} />
                    </a>
                    <a href="https://tanzil.net" target="_blank" rel="noreferrer" className="btn btn--ghost">
                      Tanzil text
                    </a>
                  </div>
                  <small>Arabic text: Tanzil Uthmani · Translation: Marmaduke Pickthall (1930)</small>
                </div>
              )}

              <div className="quran-reader__nav">
                <button
                  type="button"
                  onClick={() => selectSurah(Math.max(1, selected - 1))}
                  disabled={selected === 1}
                >
                  <ArrowUp size={14} /> Previous surah
                </button>
                <button
                  type="button"
                  onClick={() => selectSurah(Math.min(114, selected + 1))}
                  disabled={selected === 114}
                >
                  Next surah <ArrowDown size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--reflections">
        <div className="container">
          <SectionHeading
            eyebrow="Verses for the heart"
            arabic="آيَاتٌ لِلتَدَبُّر"
            title={<>Reflections to <em>carry.</em></>}
            intro="Fourteen verses selected for reflection. Choose one and sit with it, or open its surah in the reader."
            align="center"
          />
          <div className="reflection-grid">
            {reflectionVerses.map((verse, index) => (
              <Reveal key={verse.reference} delay={(index % 3) * 0.05}>
                <article className="reflection-card">
                  <div className="reflection-card__head">
                    <span>{verse.surah} · {verse.reference}</span>
                    <span className="arabic" dir="rtl" lang="ar">{verse.surahNumber}</span>
                  </div>
                  <p className="reflection-card__arabic arabic" dir="rtl" lang="ar">{verse.arabic}</p>
                  <p className="reflection-card__english">{verse.english}</p>
                  <button type="button" onClick={() => selectSurah(verse.surahNumber)} className="text-link">
                    Open in the reader <ArrowDown size={13} />
                  </button>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--quran-note">
        <div className="container quran-note">
          <div>
            <span className="eyebrow">About the text</span>
            <h2 className="display">Read with <em>reverence and context.</em></h2>
          </div>
          <div className="prose">
            <p>
              The Arabic text follows the Tanzil Uthmani edition. The English rendering is the
              public-domain translation of Marmaduke Pickthall (1930), chosen for its dignity and
              literal care. A translation is an interpretation, not a replacement for the Arabic.
            </p>
            <p>
              For tafsir and deeper study, consult recognised commentaries and qualified teachers.
              The library section of this site points to classical and contemporary works.
            </p>
            <Link to="/books" className="btn btn--outline">
              Explore tafsir & books
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
