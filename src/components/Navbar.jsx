import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ChevronDown, Menu, Search, X } from 'lucide-react'
import { navGroups } from '../data/site'
import { useLockBody } from '../hooks/useLocalStorage'
import SearchOverlay from './SearchOverlay'

function BrandMark() {
  return (
    <svg viewBox="0 0 48 48" className="brand-mark" fill="none" aria-hidden="true">
      <path d="M24 2.5 29 16.5 43 11.5 38 25.5 47 31 33 33 35.5 47 24 38 12.5 47 15 33 1 31 10 25.5 5 11.5 19 16.5Z" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="24" cy="24" r="8.5" stroke="currentColor" strokeWidth=".8" opacity=".7" />
      <path d="M24 18.5v11M18.5 24h11" stroke="currentColor" strokeWidth=".8" opacity=".8" />
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState(null)
  const [mobileGroup, setMobileGroup] = useState(null)
  const location = useLocation()
  useLockBody(mobileOpen)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenGroup(null)
    setMobileGroup(null)
  }, [location.pathname])

  useEffect(() => {
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="topline">
          <div className="container topline__inner">
            <span className="topline__bismillah arabic" dir="rtl">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
            <span className="topline__center">A sanctuary of knowledge · devotion · remembrance</span>
            <span className="topline__right"><span className="dot" /> Karbala · 61 AH</span>
          </div>
        </div>
        <div className="nav-shell">
          <div className="container nav-shell__inner">
            <Link to="/" className="brand" aria-label="HUSSAINI home">
              <BrandMark />
              <span className="brand__text">
                <strong>HUSSAINI</strong>
                <small>The Path of Ahlulbayt</small>
              </span>
            </Link>

            <nav className="desktop-nav" aria-label="Primary navigation">
              <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}>
                Home
              </NavLink>
              {navGroups.map((group) => (
                <div
                  key={group.label}
                  className={`nav-group ${openGroup === group.label ? 'is-open' : ''}`}
                  onMouseEnter={() => setOpenGroup(group.label)}
                  onMouseLeave={() => setOpenGroup(null)}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) setOpenGroup(null)
                  }}
                >
                  <button
                    className="nav-link nav-link--button"
                    aria-expanded={openGroup === group.label}
                    aria-haspopup="true"
                    onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}
                  >
                    {group.label}
                    <ChevronDown size={14} aria-hidden="true" />
                  </button>
                  <AnimatePresence>
                    {openGroup === group.label && (
                      <motion.div
                        className="nav-panel"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.22 }}
                      >
                        <div className="nav-panel__eyebrow">{group.label}</div>
                        {group.links.map((link) => (
                          <Link key={link.to} to={link.to} className="nav-panel__link">
                            <span>
                              <strong>{link.label}</strong>
                              <small>{link.description}</small>
                            </span>
                            <ArrowUpRight size={15} aria-hidden="true" />
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}>
                Contact
              </NavLink>
            </nav>

            <div className="nav-actions">
              <button className="nav-search" onClick={() => setSearchOpen(true)} aria-label="Search the site">
                <Search size={17} />
                <span>Search</span>
                <kbd>⌘K</kbd>
              </button>
              <Link to="/masoomeen" className="btn btn--gold btn--small nav-cta">
                Enter the Path <ArrowUpRight size={15} />
              </Link>
              <button
                className="mobile-toggle"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
              >
                <Menu size={23} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="mobile-drawer__head">
              <Link to="/" className="brand" onClick={() => setMobileOpen(false)}>
                <BrandMark />
                <span className="brand__text">
                  <strong>HUSSAINI</strong>
                  <small>The Path of Ahlulbayt</small>
                </span>
              </Link>
              <button className="icon-button" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X size={22} />
              </button>
            </div>
            <div className="mobile-drawer__body">
              <Link to="/" className="mobile-link" onClick={() => setMobileOpen(false)}>Home</Link>
              {navGroups.map((group) => (
                <div className="mobile-group" key={group.label}>
                  <button
                    className="mobile-group__toggle"
                    aria-expanded={mobileGroup === group.label}
                    onClick={() => setMobileGroup(mobileGroup === group.label ? null : group.label)}
                  >
                    {group.label}
                    <ChevronDown size={18} className={mobileGroup === group.label ? 'rotate' : ''} />
                  </button>
                  <AnimatePresence initial={false}>
                    {mobileGroup === group.label && (
                      <motion.div
                        className="mobile-group__links"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        {group.links.map((link) => (
                          <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}>
                            <span>{link.label}</span>
                            <small>{link.description}</small>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <Link to="/contact" className="mobile-link" onClick={() => setMobileOpen(false)}>Contact</Link>
              <button
                className="mobile-search"
                onClick={() => {
                  setMobileOpen(false)
                  setSearchOpen(true)
                }}
              >
                <Search size={18} /> Search the sanctuary
              </button>
              <div className="mobile-drawer__quote">
                <span className="arabic" dir="rtl">يَا حُسَيْن</span>
                <p>Every heart that remembers is a lamp in the dark.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
