import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ArrowUpRight, X } from 'lucide-react'
import { useLockBody } from '../hooks/useLocalStorage'
import { masoomeen } from '../data/masoomeen'
import { supplications } from '../data/supplications'
import { hadiths } from '../data/hadith'
import { books } from '../data/books'

const staticPages = [
  { title: 'Home', subtitle: 'The Light of Ahlulbayt Lives Forever', to: '/', type: 'Page' },
  { title: 'About Ahlulbayt', subtitle: 'The Household of the Prophet', to: '/ahlulbayt', type: 'Page' },
  { title: '14 Masoomeen', subtitle: 'Lives of the Infallibles', to: '/masoomeen', type: 'Page' },
  { title: 'Qur’an Explorer', subtitle: 'Read, listen and reflect', to: '/quran', type: 'Page' },
  { title: 'Duas', subtitle: 'Supplications of the Ahlulbayt', to: '/duas', type: 'Page' },
  { title: 'Ziyarat', subtitle: 'Visitations and salutations', to: '/ziyarat', type: 'Page' },
  { title: 'Karbala History', subtitle: 'The stand of Imam Hussain', to: '/karbala', type: 'Page' },
  { title: 'Muharram', subtitle: 'Remembering Ashura', to: '/muharram', type: 'Page' },
  { title: 'Islamic Calendar', subtitle: 'Sacred dates and seasons', to: '/calendar', type: 'Page' },
  { title: 'Hadith', subtitle: 'Wisdom from the Household', to: '/hadith', type: 'Page' },
  { title: 'Islamic Books Library', subtitle: 'Classical and modern works', to: '/books', type: 'Page' },
  { title: 'Shia Namaz Guide', subtitle: 'The five daily prayers', to: '/namaz', type: 'Page' },
  { title: 'Wudu Guide', subtitle: 'Ritual purification', to: '/wudu', type: 'Page' },
  { title: 'Digital Tasbeeh', subtitle: 'A quiet place of remembrance', to: '/tasbeeh', type: 'Page' },
  { title: 'Contact Us', subtitle: 'Write to the HUSSAINI team', to: '/contact', type: 'Page' },
  { title: 'About Us', subtitle: 'Our mission and principles', to: '/about', type: 'Page' },
  { title: 'Image Credits', subtitle: 'Photography and licensing', to: '/credits', type: 'Page' },
]

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()
  useLockBody(open)

  const index = useMemo(
    () => [
      ...staticPages,
      ...masoomeen.map((person) => ({
        title: person.englishName,
        subtitle: `${person.title} · ${person.birth}`,
        to: `/masoomeen/${person.slug}`,
        type: 'Masoom',
      })),
      ...supplications.map((item) => ({
        title: item.title,
        subtitle: item.subtitle,
        to: `/${item.type === 'ziyarat' ? 'ziyarat' : 'duas'}/${item.slug}`,
        type: item.type === 'ziyarat' ? 'Ziyarat' : 'Dua',
        arabic: item.arabicTitle,
      })),
      ...hadiths.map((item) => ({
        title: item.figure,
        subtitle: item.english,
        to: '/hadith',
        type: 'Hadith',
      })),
      ...books.map((book) => ({
        title: book.title,
        subtitle: `${book.author} · ${book.category}`,
        to: '/books',
        type: 'Book',
      })),
    ],
    [],
  )

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return index.slice(0, 8)
    return index
      .filter((item) =>
        `${item.title} ${item.subtitle} ${item.type} ${item.arabic || ''}`.toLowerCase().includes(q),
      )
      .slice(0, 12)
  }, [index, query])

  useEffect(() => {
    if (open) {
      setQuery('')
      const timer = window.setTimeout(() => inputRef.current?.focus(), 80)
      return () => window.clearTimeout(timer)
    }
    return undefined
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const go = (to) => {
    onClose()
    navigate(to)
  }

  return (
    <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Search HUSSAINI">
      <button className="search-overlay__backdrop" aria-label="Close search" onClick={onClose} />
      <div className="search-panel">
        <div className="search-panel__bar">
          <Search size={20} aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search the household, supplications, wisdom…"
            aria-label="Search"
          />
          <button className="icon-button" onClick={onClose} aria-label="Close search">
            <X size={20} />
          </button>
        </div>
        <div className="search-panel__meta">
          <span>{query ? `${results.length} result${results.length === 1 ? '' : 's'}` : 'Begin with a word'}</span>
          <span><kbd>esc</kbd> to close</span>
        </div>
        <div className="search-results">
          {results.length === 0 && (
            <div className="search-empty">
              <span className="arabic" dir="rtl">لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ</span>
              <p>No result found. Try a name, a virtue, or a book.</p>
            </div>
          )}
          {results.map((item, i) => (
            <button
              key={`${item.to}-${item.title}-${i}`}
              className="search-result"
              onClick={() => go(item.to)}
            >
              <span className="search-result__type">{item.type}</span>
              <span className="search-result__body">
                <strong>{item.title}</strong>
                <small>{item.subtitle}</small>
              </span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </button>
          ))}
        </div>
        <div className="search-panel__footer">
          <span>Search across the HUSSAINI library</span>
          <span className="search-panel__brand arabic" dir="rtl">يَا حُسَيْن</span>
        </div>
      </div>
    </div>
  )
}
