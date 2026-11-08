import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Check,
  CircleDot,
  Minus,
  RotateCcw,
  Sparkles,
  Target,
  Vibrate,
} from 'lucide-react'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Ornament from '../components/Ornament'
import GeometricPattern from '../components/GeometricPattern'
import { tasbeehDhikr } from '../data/prayers'
import { useLocalStorage } from '../hooks/useLocalStorage'

const targetOptions = [33, 34, 100, 1000]
const todayKey = () => {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}

export default function Tasbeeh() {
  const [dhikrId, setDhikrId] = useLocalStorage('hussaini:tasbeeh-dhikr', 'subhanallah')
  const [target, setTarget] = useLocalStorage('hussaini:tasbeeh-target', 33)
  const [session, setSession] = useLocalStorage('hussaini:tasbeeh-session', {
    date: todayKey(),
    count: 0,
    rounds: 0,
    total: 0,
  })
  const [justTapped, setJustTapped] = useState(false)

  const dhikr = tasbeehDhikr.find((item) => item.id === dhikrId) || tasbeehDhikr[0]

  useEffect(() => {
    if (session.date !== todayKey()) {
      setSession({ date: todayKey(), count: 0, rounds: 0, total: 0 })
    }
  }, [session.date, setSession])

  useEffect(() => {
    if (!justTapped) return undefined
    const timer = window.setTimeout(() => setJustTapped(false), 180)
    return () => window.clearTimeout(timer)
  }, [justTapped])

  const progress = Math.min(session.count / target, 1)
  const complete = session.count >= target
  const circumference = 2 * Math.PI * 96
  const dashOffset = circumference * (1 - progress)

  const todayLabel = useMemo(
    () => new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }),
    [],
  )

  const update = (patch) => {
    setSession((current) => ({
      ...(current.date === todayKey() ? current : { date: todayKey(), count: 0, rounds: 0, total: 0 }),
      ...patch,
    }))
  }

  const tap = () => {
    if (navigator.vibrate) navigator.vibrate(8)
    setJustTapped(true)
    if (complete) {
      update({ count: 1, total: session.total + 1 })
      return
    }
    const nextCount = session.count + 1
    update({
      count: nextCount,
      total: session.total + 1,
      rounds: nextCount >= target ? session.rounds + 1 : session.rounds,
    })
  }

  const decrement = () => {
    update({ count: Math.max(0, session.count - 1), total: Math.max(0, session.total - 1) })
  }

  const reset = () => {
    update({ count: 0, rounds: 0, total: 0 })
  }

  const chooseTarget = (value) => {
    setTarget(value)
    update({ count: 0 })
  }

  const onKeyDown = (event) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault()
      tap()
    }
  }

  return (
    <>
      <Seo
        title="Digital Tasbeeh"
        description="A quiet digital tasbeeh counter for Subhan Allah, Alhamdulillah, Allahu Akbar, salawat and more. Set your target, count your rounds, and keep a private daily record."
      />

      <PageHero
        eyebrow="A quiet place of remembrance"
        arabic="التَّسْبِيح"
        title="Let the tongue rest"
        titleAccent="on the name of God."
        intro="A digital tasbeeh is only a tool. Its worth is in the attention it gathers. Choose a dhikr, set a target, and return to the words with a calm and present heart."
        breadcrumb={[{ label: 'Digital Tasbeeh' }]}
      >
        <a href="#tasbeeh" className="btn btn--gold">
          Begin counting <ArrowRight size={16} />
        </a>
        <Link to="/namaz" className="btn btn--glass">
          The prayer guide
        </Link>
      </PageHero>

      <section className="section section--tasbeeh" id="tasbeeh">
        <div className="container tasbeeh-layout">
          <div className="tasbeeh-main">
            <Reveal className="tasbeeh-dhikr">
              <span className="eyebrow"><Sparkles size={13} /> Choose a remembrance</span>
              <div className="dhikr-grid">
                {tasbeehDhikr.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`dhikr-chip ${dhikrId === item.id ? 'is-active' : ''}`}
                    onClick={() => {
                      setDhikrId(item.id)
                      setTarget(item.defaultTarget)
                      update({ count: 0 })
                    }}
                    aria-pressed={dhikrId === item.id}
                  >
                    <span className="dhikr-chip__arabic arabic" dir="rtl" lang="ar">{item.arabic}</span>
                    <span className="dhikr-chip__transliteration">{item.transliteration}</span>
                    <small>{item.meaning}</small>
                  </button>
                ))}
              </div>
            </Reveal>

            <Reveal className="tasbeeh-counter-panel" delay={0.06}>
              <GeometricPattern className="tasbeeh-counter-panel__pattern" opacity={0.1} />
              <div className="tasbeeh-counter__head">
                <div>
                  <span className="eyebrow">Now remembering</span>
                  <h2 className="display">{dhikr.transliteration}</h2>
                  <p>{dhikr.meaning}</p>
                </div>
                <span className="tasbeeh-counter__target">
                  <Target size={14} /> Target {target}
                </span>
              </div>

              <div className="tasbeeh-counter">
                <div className="tasbeeh-ring" style={{ '--ring-offset': `${dashOffset}`, '--ring-circumference': `${circumference}` }}>
                  <svg viewBox="0 0 220 220" aria-hidden="true">
                    <circle className="tasbeeh-ring__track" cx="110" cy="110" r="96" />
                    <circle className="tasbeeh-ring__progress" cx="110" cy="110" r="96" />
                  </svg>
                  <button
                    type="button"
                    className={`tasbeeh-tap ${justTapped ? 'is-tapped' : ''} ${complete ? 'is-complete' : ''}`}
                    onClick={tap}
                    onKeyDown={onKeyDown}
                    aria-label={`Count ${dhikr.transliteration}. Current count ${session.count} of ${target}.`}
                  >
                    <span className="tasbeeh-tap__arabic arabic" dir="rtl" lang="ar">{dhikr.arabic}</span>
                    <span className="tasbeeh-tap__count">{session.count}</span>
                    <span className="tasbeeh-tap__of">of {target}</span>
                    <span className="tasbeeh-tap__hint">{complete ? 'Tap to begin a new round' : 'Tap to remember'}</span>
                  </button>
                </div>

                <div className="tasbeeh-stats">
                  <div>
                    <strong>{session.rounds}</strong>
                    <span>Rounds complete</span>
                  </div>
                  <div>
                    <strong>{session.total}</strong>
                    <span>Total today</span>
                  </div>
                  <div>
                    <strong>{Math.round(progress * 100)}%</strong>
                    <span>Current round</span>
                  </div>
                </div>

                <div className="tasbeeh-actions">
                  <button type="button" className="tasbeeh-action" onClick={decrement} disabled={session.count === 0} aria-label="Decrease count">
                    <Minus size={17} /> Undo
                  </button>
                  <button type="button" className="tasbeeh-action tasbeeh-action--reset" onClick={reset}>
                    <RotateCcw size={16} /> Reset session
                  </button>
                  <span className="tasbeeh-actions__date">{todayLabel}</span>
                </div>

                {complete && (
                  <div className="tasbeeh-complete" role="status">
                    <Check size={16} />
                    <span>Round complete — may it be accepted.</span>
                  </div>
                )}
              </div>
            </Reveal>
          </div>

          <aside className="tasbeeh-aside">
            <Reveal className="tasbeeh-target">
              <span className="eyebrow"><CircleDot size={13} /> Set your target</span>
              <h2 className="display">How many?</h2>
              <div className="tasbeeh-target__options">
                {targetOptions.map((value) => (
                  <button
                    key={value}
                    type="button"
                    className={`target-button ${target === value ? 'is-active' : ''}`}
                    onClick={() => chooseTarget(value)}
                    aria-pressed={target === value}
                  >
                    {value}
                  </button>
                ))}
              </div>
              <label className="tasbeeh-target__custom">
                <span>Custom target</span>
                <input
                  type="number"
                  min="1"
                  max="9999"
                  value={target}
                  onChange={(event) => {
                    const value = Math.max(1, Math.min(9999, Number(event.target.value) || 1))
                    chooseTarget(value)
                  }}
                />
              </label>
              <Ornament />
              <div className="tasbeeh-aside__hint">
                <Vibrate size={15} />
                <span>Where supported, the device gives a light tap with each count.</span>
              </div>
            </Reveal>

            <Reveal className="tasbeeh-guide" delay={0.08}>
              <span className="eyebrow">The tasbeeh of Fatima al-Zahra</span>
              <p>
                After the obligatory prayer, it is commonly recommended to recite:
              </p>
              <ul>
                <li><span className="arabic" dir="rtl" lang="ar">سُبْحَانَ اللَّهِ</span><strong>33×</strong></li>
                <li><span className="arabic" dir="rtl" lang="ar">الْحَمْدُ لِلَّهِ</span><strong>33×</strong></li>
                <li><span className="arabic" dir="rtl" lang="ar">اللَّهُ أَكْبَرُ</span><strong>34×</strong></li>
              </ul>
              <Link to="/namaz" className="text-link">After the prayer <ArrowRight size={13} /></Link>
            </Reveal>

            <Reveal className="tasbeeh-privacy" delay={0.12}>
              <h3>Private by design</h3>
              <p>Your count, target, and daily total are stored only in this browser. Clearing site data resets them.</p>
            </Reveal>
          </aside>
        </div>
      </section>

      <section className="section section--tasbeeh-quote">
        <div className="container tasbeeh-quote">
          <Reveal>
            <Ornament />
            <p className="tasbeeh-quote__arabic arabic" dir="rtl" lang="ar">
              أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ
            </p>
            <p className="tasbeeh-quote__english">
              “Verily, in the remembrance of Allah do hearts find rest.”
            </p>
            <span>The Qur’an · Surah ar-Ra‘d 13:28</span>
            <div>
              <Link to="/duas" className="btn btn--ghost btn--small">Continue with dua <ArrowRight size={14} /></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
