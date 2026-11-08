import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  ChevronDown,
  Copy,
  ExternalLink,
  Headphones,
  Languages,
  List,
  Maximize2,
  Minimize2,
  Minus,
  Plus,
  Quote,
} from 'lucide-react'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import Ornament from '../components/Ornament'
import GeometricPattern from '../components/GeometricPattern'
import { supplications } from '../data/supplications'
import { useBookmarks, useLocalStorage } from '../hooks/useLocalStorage'
import NotFound from './NotFound'

const languageOptions = [
  { key: 'arabic', label: 'العربية', english: 'Arabic' },
  { key: 'transliteration', label: 'Transliteration', english: 'Transliteration' },
  { key: 'english', label: 'English', english: 'English' },
  { key: 'urdu', label: 'اردو', english: 'Urdu' },
]

async function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return
    } catch {
      // Fall through to the selection-based method when clipboard permission is unavailable.
    }
  }

  const area = document.createElement('textarea')
  area.value = text
  area.setAttribute('readonly', '')
  area.style.position = 'fixed'
  area.style.opacity = '0'
  document.body.appendChild(area)
  area.select()
  const copied = document.execCommand('copy')
  document.body.removeChild(area)
  if (!copied) throw new Error('Copy command was rejected')
}

function ReaderTools({
  languages,
  toggleLanguage,
  arabicSize,
  setArabicSize,
  isReading,
  toggleReading,
  className = '',
}) {
  return (
    <div className={`reader-tools ${className}`} aria-label="Reading controls">
      <div className="reader-tools__group">
        <span className="reader-tools__label"><Languages size={14} /> Languages</span>
        <div className="reader-tools__chips">
          {languageOptions.map((option) => (
            <button
              key={option.key}
              type="button"
              className={`reader-chip ${languages[option.key] ? 'is-active' : ''}`}
              onClick={() => toggleLanguage(option.key)}
              aria-pressed={languages[option.key]}
              title={`${languages[option.key] ? 'Hide' : 'Show'} ${option.english}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="reader-tools__group reader-tools__group--type">
        <span className="reader-tools__label">Arabic size</span>
        <div className="reader-font-control">
          <button
            type="button"
            onClick={() => setArabicSize((size) => Math.max(26, size - 2))}
            disabled={arabicSize <= 26}
            aria-label="Decrease Arabic font size"
          >
            <Minus size={14} />
          </button>
          <input
            type="range"
            min="26"
            max="52"
            step="1"
            value={arabicSize}
            onChange={(event) => setArabicSize(Number(event.target.value))}
            aria-label="Arabic font size"
          />
          <button
            type="button"
            onClick={() => setArabicSize((size) => Math.min(52, size + 2))}
            disabled={arabicSize >= 52}
            aria-label="Increase Arabic font size"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      <button
        type="button"
        className={`reader-tools__mode ${isReading ? 'is-active' : ''}`}
        onClick={toggleReading}
        aria-pressed={isReading}
      >
        {isReading ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
        <span>{isReading ? 'Exit reading mode' : 'Reading mode'}</span>
      </button>
    </div>
  )
}

export default function SupplicationReader({ type = 'dua' }) {
  const { slug } = useParams()
  const item = supplications.find((entry) => entry.slug === slug && entry.type === type)
  const siblings = useMemo(() => supplications.filter((entry) => entry.type === type), [type])
  const { isBookmarked, toggleBookmark } = useBookmarks()
  const [languages, setLanguages] = useLocalStorage('hussaini:reader-languages', {
    arabic: true,
    transliteration: true,
    english: true,
    urdu: true,
  })
  const [arabicSize, setArabicSize] = useLocalStorage('hussaini:arabic-size', 34)
  const [isReading, setIsReading] = useState(false)
  const [toast, setToast] = useState('')
  const [tocOpen, setTocOpen] = useState(false)
  const toastTimer = useRef(null)
  const articleRef = useRef(null)

  const index = item ? siblings.findIndex((entry) => entry.slug === item.slug) : -1
  const previous = index > 0 ? siblings[index - 1] : null
  const next = index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : null
  const saved = item ? isBookmarked(item.slug) : false

  useEffect(() => {
    document.body.classList.toggle('reader-mode', isReading)
    return () => document.body.classList.remove('reader-mode')
  }, [isReading])

  useEffect(() => {
    if (!isReading) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setIsReading(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isReading])

  useEffect(() => () => {
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
  }, [])

  if (!item) return <NotFound />

  const notify = (message) => {
    setToast(message)
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(''), 2400)
  }

  const toggleLanguage = (key) => {
    setLanguages((current) => ({ ...current, [key]: !current[key] }))
  }

  const visibleText = (passage) => {
    const parts = []
    if (languages.arabic) parts.push(passage.arabic)
    if (languages.transliteration) parts.push(passage.transliteration)
    if (languages.english) parts.push(passage.english)
    if (languages.urdu) parts.push(passage.urdu)
    return parts.join('\n\n')
  }

  const copyPassage = async (passage, passageIndex) => {
    try {
      await copyToClipboard(`${passage.label ? `${passage.label}\n\n` : ''}${visibleText(passage)}`)
      notify(`Passage ${passageIndex + 1} copied`)
    } catch {
      notify('Copy was blocked by your browser')
    }
  }

  const copyAll = async () => {
    try {
      const text = [
        item.title,
        item.arabicTitle,
        item.attributedTo,
        '',
        ...item.passages.map((passage, passageIndex) => {
          const heading = `— ${passage.label || `Passage ${passageIndex + 1}`} —`
          return `${heading}\n\n${visibleText(passage)}`
        }),
        '',
        `Source: ${item.source}`,
        item.sourceUrl,
      ].join('\n')
      await copyToClipboard(text)
      notify('The full reading was copied')
    } catch {
      notify('Copy was blocked by your browser')
    }
  }

  const scrollToPassage = (passageIndex) => {
    setTocOpen(false)
    // Let the mobile contents panel collapse before measuring the passage position.
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const target = document.getElementById(`passage-${passageIndex}`)
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    })
  }

  return (
    <div className={`reader-page ${isReading ? 'is-reading' : ''}`} style={{ '--reader-arabic-size': `${arabicSize}px` }}>
      <Seo
        title={`${item.title} — Reader`}
        description={`${item.title} (${item.arabicTitle}). ${item.summary} Read with Arabic, transliteration, English and Urdu.`}
      />

      <div className="reader-topbar">
        <div className="container reader-topbar__inner">
          <Link to={type === 'ziyarat' ? '/ziyarat' : '/duas'} className="reader-topbar__back">
            <ArrowLeft size={15} />
            <span>{type === 'ziyarat' ? 'All ziyarat' : 'All duas'}</span>
          </Link>
          <div className="reader-topbar__title">
            <span>{item.title}</span>
            <small>{item.attributedTo}</small>
          </div>
          <div className="reader-topbar__actions">
            <button
              type="button"
              className={`reader-icon-button ${saved ? 'is-saved' : ''}`}
              onClick={() => {
                toggleBookmark(item.slug)
                notify(saved ? 'Bookmark removed' : 'Saved to your bookmarks')
              }}
              aria-pressed={saved}
              aria-label={saved ? 'Remove bookmark' : 'Bookmark this reading'}
            >
              <Bookmark size={16} fill={saved ? 'currentColor' : 'none'} />
              <span>{saved ? 'Saved' : 'Save'}</span>
            </button>
            <button
              type="button"
              className={`reader-icon-button reader-icon-button--mode ${isReading ? 'is-active' : ''}`}
              onClick={() => setIsReading((value) => !value)}
              aria-pressed={isReading}
              aria-label={isReading ? 'Exit reading mode' : 'Enter reading mode'}
            >
              {isReading ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              <span className="reader-icon-button__wide">{isReading ? 'Exit' : 'Read'}</span>
            </button>
          </div>
        </div>
      </div>

      <header className="reader-hero">
        <div className="reader-hero__pattern" aria-hidden="true">
          <GeometricPattern opacity={0.12} />
        </div>
        <div className="container reader-hero__inner">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span><span className="breadcrumb__sep">/</span><Link to={type === 'ziyarat' ? '/ziyarat' : '/duas'}>{type === 'ziyarat' ? 'Ziyarat' : 'Duas'}</Link></span>
            <span><span className="breadcrumb__sep">/</span><span aria-current="page">{item.title}</span></span>
          </nav>

          <div className="reader-hero__content">
            <span className="tag tag--gold">{type === 'ziyarat' ? 'Ziyarat' : 'Dua'}</span>
            <span className="reader-hero__arabic arabic" dir="rtl" lang="ar">{item.arabicTitle}</span>
            <h1 className="display">{item.title}</h1>
            <p className="reader-hero__subtitle">{item.subtitle}</p>
            <div className="reader-hero__meta">
              <span>{item.attributedTo}</span>
              <span>{item.occasion}</span>
              <span>{item.readingTime}</span>
            </div>
          </div>

          <div className="reader-hero__actions">
            <button type="button" className={`btn ${saved ? 'btn--gold' : 'btn--outline'}`} onClick={() => {
              toggleBookmark(item.slug)
              notify(saved ? 'Bookmark removed' : 'Saved to your bookmarks')
            }}>
              <Bookmark size={16} fill={saved ? 'currentColor' : 'none'} /> {saved ? 'Saved' : 'Bookmark'}
            </button>
            <button type="button" className="btn btn--ghost" onClick={copyAll}>
              <Copy size={16} /> Copy reading
            </button>
          </div>
        </div>
      </header>

      <section className="reader-body">
        <div className="container reader-layout">
          <aside className={`reader-aside ${tocOpen ? 'is-open' : ''}`} aria-label="Reading guide">
            <button type="button" className="reader-aside__toggle" onClick={() => setTocOpen((value) => !value)} aria-expanded={tocOpen}>
              <List size={16} />
              <span>Passages</span>
              <small>{item.passages.length}</small>
              <ChevronDown size={15} className={tocOpen ? 'rotate' : ''} />
            </button>
            <nav className="reader-toc" aria-label="Passages">
              {item.passages.map((passage, passageIndex) => (
                <button key={`${passage.label}-${passageIndex}`} type="button" onClick={() => scrollToPassage(passageIndex)}>
                  <span>{String(passageIndex + 1).padStart(2, '0')}</span>
                  <small>{passage.label || `Passage ${passageIndex + 1}`}</small>
                </button>
              ))}
            </nav>

            <div className="reader-source">
              <span className="reader-source__eyebrow"><Headphones size={14} /> Listen & source</span>
              <p>{item.source}</p>
              {item.audio && (
                <audio controls preload="none" src={item.audio} className="reader-audio">
                  Your browser does not support the audio element.
                </audio>
              )}
              <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="text-link">
                Complete text & audio <ExternalLink size={13} />
              </a>
            </div>

            <div className="reader-bookmark-note">
              <Bookmark size={14} />
              <span>Your bookmark is stored only in this browser.</span>
            </div>
          </aside>

          <article className="reader-article" ref={articleRef}>
            <Reveal className="reader-intro">
              <p className="reader-intro__summary">{item.summary}</p>
              <div className="reader-intro__meta">
                <span><strong>Attributed to</strong> {item.attributedTo}</span>
                {item.narrator && <span><strong>Narrated by</strong> {item.narrator}</span>}
                <span><strong>Occasion</strong> {item.occasion}</span>
              </div>
              {item.isExcerpt && (
                <p className="reader-intro__excerpt">
                  <Quote size={14} />
                  <span>
                    This edition presents {item.passages.length} selected passages. The complete
                    text and audio are available at{' '}
                    <a href={item.sourceUrl} target="_blank" rel="noreferrer">Duas.org</a>.
                  </span>
                </p>
              )}
            </Reveal>

            <ReaderTools
              languages={languages}
              toggleLanguage={toggleLanguage}
              arabicSize={arabicSize}
              setArabicSize={setArabicSize}
              isReading={isReading}
              toggleReading={() => setIsReading((value) => !value)}
              className="reader-tools--inline"
            />

            <div className="reader-passages">
              {item.passages.map((passage, passageIndex) => (
                <section
                  className="reader-passage"
                  id={`passage-${passageIndex}`}
                  key={`${passage.label}-${passageIndex}`}
                  aria-labelledby={`passage-title-${passageIndex}`}
                >
                  <header className="reader-passage__head">
                    <span className="reader-passage__number">{String(passageIndex + 1).padStart(2, '0')}</span>
                    <h2 id={`passage-title-${passageIndex}`}>{passage.label || `Passage ${passageIndex + 1}`}</h2>
                    <button
                      type="button"
                      className="reader-passage__copy"
                      onClick={() => copyPassage(passage, passageIndex)}
                      aria-label={`Copy passage ${passageIndex + 1}`}
                    >
                      <Copy size={14} />
                      <span>Copy</span>
                    </button>
                  </header>

                  <div className="reader-passage__body">
                    {languages.arabic && (
                      <div className="reader-lang reader-lang--arabic">
                        <span className="reader-lang__label">Arabic</span>
                        <p className="arabic" dir="rtl" lang="ar">{passage.arabic}</p>
                      </div>
                    )}
                    {languages.transliteration && (
                      <div className="reader-lang reader-lang--transliteration">
                        <span className="reader-lang__label">Transliteration</span>
                        <p>{passage.transliteration}</p>
                      </div>
                    )}
                    {languages.english && (
                      <div className="reader-lang reader-lang--english">
                        <span className="reader-lang__label">English</span>
                        <p>{passage.english}</p>
                      </div>
                    )}
                    {languages.urdu && (
                      <div className="reader-lang reader-lang--urdu">
                        <span className="reader-lang__label">Urdu</span>
                        <p className="urdu" dir="rtl" lang="ur">{passage.urdu}</p>
                      </div>
                    )}
                    {!languages.arabic && !languages.transliteration && !languages.english && !languages.urdu && (
                      <p className="reader-passage__empty">Choose at least one language to display this passage.</p>
                    )}
                  </div>
                </section>
              ))}
            </div>

            <div className="reader-end">
              <Ornament />
              <span className="arabic" dir="rtl" lang="ar">اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَآلِ مُحَمَّد</span>
              <p>May the reading be accepted, and may it leave the heart softer than it found it.</p>
              <div className="reader-end__actions">
                <button type="button" className="btn btn--ghost btn--small" onClick={copyAll}>
                  <Copy size={15} /> Copy the reading
                </button>
                <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="btn btn--ghost btn--small">
                  Complete source <ExternalLink size={14} />
                </a>
              </div>
            </div>

            <nav className="reader-nav" aria-label="Previous and next readings">
              {previous ? (
                <Link to={`/${type === 'ziyarat' ? 'ziyarat' : 'duas'}/${previous.slug}`} className="reader-nav__item reader-nav__item--prev">
                  <ArrowLeft size={17} />
                  <span>
                    <small>Previous</small>
                    <strong>{previous.title}</strong>
                  </span>
                </Link>
              ) : <span />}
              {next ? (
                <Link to={`/${type === 'ziyarat' ? 'ziyarat' : 'duas'}/${next.slug}`} className="reader-nav__item reader-nav__item--next">
                  <span>
                    <small>Next</small>
                    <strong>{next.title}</strong>
                  </span>
                  <ArrowRight size={17} />
                </Link>
              ) : <span />}
            </nav>
          </article>
        </div>
      </section>

      {createPortal(
        <>
          <ReaderTools
            languages={languages}
            toggleLanguage={toggleLanguage}
            arabicSize={arabicSize}
            setArabicSize={setArabicSize}
            isReading={isReading}
            toggleReading={() => setIsReading(false)}
            className="reader-tools--floating"
          />

          <div className={`reader-toast ${toast ? 'is-visible' : ''}`} role="status" aria-live="polite">
            {toast && <><Check size={15} /> {toast}</>}
          </div>
        </>,
        document.body,
      )}
    </div>
  )
}
