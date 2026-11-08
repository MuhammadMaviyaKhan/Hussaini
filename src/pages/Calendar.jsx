import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays, ChevronDown, MoonStar, Sunset } from 'lucide-react'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import Ornament from '../components/Ornament'
import {
  calendarFaqs,
  calendarNotes,
  islamicMonths,
  islamicObservances,
} from '../data/calendar'

const hijriNumeric = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
})

const hijriLong = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

function getHijriParts(date) {
  const parts = hijriNumeric.formatToParts(date)
  const value = (type) => Number(parts.find((part) => part.type === type)?.value || 0)
  return { day: value('day'), month: value('month'), year: value('year') }
}

const typeLabels = {
  season: 'Season',
  remembrance: 'Remembrance',
  martyrdom: 'Martyrdom',
  birth: 'Birth',
  festival: 'Festival',
}

export default function Calendar() {
  const today = useMemo(() => new Date(), [])
  const todayHijri = useMemo(() => getHijriParts(today), [today])
  const [activeMonth, setActiveMonth] = useState(todayHijri.month || 1)
  const [openFaq, setOpenFaq] = useState(0)

  const upcoming = useMemo(() => {
    const found = []
    const seen = new Set()
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    for (let offset = 0; offset < 420; offset += 1) {
      const date = new Date(start)
      date.setDate(start.getDate() + offset)
      const { day, month, year } = getHijriParts(date)
      const matches = islamicObservances.filter((item) => item.day === day && item.month === month)
      for (const observance of matches) {
        const key = `${observance.month}-${observance.day}`
        if (seen.has(key)) continue
        seen.add(key)
        found.push({
          ...observance,
          date,
          year,
          daysAway: offset,
          gregorian: date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        })
      }
    }
    return found.slice(0, 6)
  }, [today])

  const monthObservances = islamicObservances.filter((item) => item.month === activeMonth)
  const currentMonthName = islamicMonths.find((month) => month.number === todayHijri.month)
  const activeMonthData = islamicMonths.find((month) => month.number === activeMonth)

  const isToday = (observance) =>
    observance.month === todayHijri.month && observance.day === todayHijri.day

  return (
    <>
      <Seo
        title="Islamic Calendar"
        description="Today's Hijri date, the twelve Islamic months, and the sacred observances of the Shia calendar — Muharram, Ramadan, Ashura, Arba'een, Eid al-Ghadir and more."
      />

      <PageHero
        eyebrow="Sacred time"
        arabic="التَّقْوِيمُ الْهِجْرِي"
        title="The year measured by"
        titleAccent="mercy and remembrance."
        intro="From the new moon of Muharram to the farewell of Dhu al-Hijjah, the Islamic calendar gathers the community around the moments that shape its memory."
        image="/images/ashura.jpg"
        imageAlt="A Muharram gathering under the night sky."
        breadcrumb={[{ label: 'Islamic Calendar' }]}
        imageCaption="Ashura remembrance · Tehran, Iran"
      />

      <section className="section section--calendar-today">
        <div className="container today-panel">
          <Reveal className="today-panel__date">
            <span className="today-panel__eyebrow"><CalendarDays size={14} /> Today</span>
            <div className="today-panel__hijri">
              <span className="today-panel__day">{todayHijri.day}</span>
              <div>
                <strong>{currentMonthName?.name || 'Hijri month'}</strong>
                <span>{todayHijri.year} AH</span>
              </div>
            </div>
            <span className="today-panel__arabic arabic" dir="rtl" lang="ar">
              {currentMonthName?.arabic || 'الْهِجْرَة'}
            </span>
            <p>{hijriLong.format(today)}</p>
            <small>
              Gregorian: {today.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </small>
          </Reveal>

          <div className="today-panel__upcoming">
            <div className="today-panel__upcoming-head">
              <span className="eyebrow"><MoonStar size={13} /> Approaching</span>
              <h2 className="display">The next observances</h2>
            </div>
            <div className="upcoming-list">
              {upcoming.map((item) => {
                const month = islamicMonths.find((entry) => entry.number === item.month)
                return (
                  <div className={`upcoming-item ${isToday(item) ? 'is-today' : ''}`} key={`${item.month}-${item.day}-${item.title}`}>
                    <div className="upcoming-item__date">
                      <strong>{item.day}</strong>
                      <span title={month?.name}>{month?.short || month?.name}</span>
                    </div>
                    <div className="upcoming-item__body">
                      <strong>{item.title}</strong>
                      <small>{item.gregorian} · {item.daysAway === 0 ? 'Today' : item.daysAway === 1 ? 'Tomorrow' : `In ${item.daysAway} days`}</small>
                    </div>
                    <span className={`tag tag--${item.type}`}>{typeLabels[item.type] || item.type}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="container calendar-today-note">
          <Sunset size={15} />
          <p>The Islamic day begins at sunset. Dates are calculated with the Umm al-Qura convention and may differ from local moon sighting by a day.</p>
        </div>
      </section>

      <section className="section section--calendar-months">
        <div className="container">
          <SectionHeading
            eyebrow="The twelve months"
            arabic="الْأَشْهُرُ الْهِجْرِيَّة"
            title={<>A year of <em>sacred seasons.</em></>}
            intro="Choose a month to see the observances remembered within it."
            align="center"
          />

          <div className="month-tabs" role="tablist" aria-label="Islamic months">
            {islamicMonths.map((month) => (
              <button
                key={month.number}
                type="button"
                role="tab"
                aria-selected={activeMonth === month.number}
                className={`month-tab ${activeMonth === month.number ? 'is-active' : ''} ${todayHijri.month === month.number ? 'is-current' : ''}`}
                onClick={() => setActiveMonth(month.number)}
              >
                <span className="month-tab__number">{String(month.number).padStart(2, '0')}</span>
                <span className="month-tab__name">{month.name}</span>
                <span className="month-tab__arabic arabic" dir="rtl" lang="ar">{month.arabic}</span>
              </button>
            ))}
          </div>

          <div className="month-panel" role="tabpanel">
            <div className="month-panel__head">
              <div>
                <span className="eyebrow">Month {String(activeMonth).padStart(2, '0')}</span>
                <h3 className="display">{activeMonthData?.name}</h3>
                <p>{activeMonthData?.meaning}</p>
              </div>
              <span className="month-panel__arabic arabic" dir="rtl" lang="ar">{activeMonthData?.arabic}</span>
            </div>
            <div className="observance-list">
              {monthObservances.map((observance) => (
                <div className={`observance-row ${isToday(observance) ? 'is-today' : ''}`} key={observance.title}>
                  <span className="observance-row__day">{observance.day}</span>
                  <div className="observance-row__body">
                    <div>
                      <strong>{observance.title}</strong>
                      {isToday(observance) && <span className="tag tag--gold">Today</span>}
                    </div>
                    <span className="observance-row__arabic arabic" dir="rtl" lang="ar">{observance.arabic}</span>
                    <p>{observance.description}</p>
                  </div>
                  <span className={`tag tag--${observance.type}`}>{typeLabels[observance.type] || observance.type}</span>
                </div>
              ))}
              {monthObservances.length === 0 && (
                <p className="observance-list__empty">No specific observance is listed for this month in the HUSSAINI calendar.</p>
              )}
            </div>
          </div>

          <div className="calendar-notes">
            {calendarNotes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--calendar-faq">
        <div className="container">
          <div className="calendar-faq">
            <div className="calendar-faq__intro">
              <SectionHeading
                eyebrow="Calendar questions"
                arabic="مَسَائِلُ التَّقْوِيم"
                title={<>Reading the <em>dates.</em></>}
              />
              <Ornament />
              <div className="calendar-faq__links">
                <Link to="/muharram" className="text-link">Muharram & Ashura <ArrowRight size={14} /></Link>
                <Link to="/ziyarat/ziyarat-ashura" className="text-link">Ziyarat Ashura <ArrowRight size={14} /></Link>
              </div>
            </div>
            <div className="accordion">
              {calendarFaqs.map((faq, index) => {
                const isOpen = openFaq === index
                return (
                  <div className={`accordion__item ${isOpen ? 'is-open' : ''}`} key={faq.q}>
                    <button type="button" onClick={() => setOpenFaq(isOpen ? -1 : index)} aria-expanded={isOpen}>
                      <span>{faq.q}</span>
                      <ChevronDown size={18} className={isOpen ? 'rotate' : ''} />
                    </button>
                    <div className="accordion__answer">
                      <p>{faq.a}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
