import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Bookmark, Compass, Footprints, HeartHandshake, MoonStar } from 'lucide-react'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import SupplicationCard from '../components/SupplicationCard'
import Ornament from '../components/Ornament'
import { supplications } from '../data/supplications'
import { useBookmarks } from '../hooks/useLocalStorage'

const adab = [
  {
    icon: Footprints,
    title: 'Journey with intention',
    text: 'Ziyarat begins before the journey. Set an intention for remembrance, reconciliation, and a heart willing to be changed.',
  },
  {
    icon: Compass,
    title: 'Turn toward the shrine',
    text: 'Where physically present, observe the reverence of the place. Where distant, face the direction of the shrine with attention.',
  },
  {
    icon: HeartHandshake,
    title: 'Greet, then listen',
    text: 'Begin with the salutation. Read slowly enough to hear what the words are asking of you, not only what they say.',
  },
  {
    icon: MoonStar,
    title: 'Carry the visit home',
    text: 'The visit ends when the words end, but its purpose continues: a life more just, more merciful, more awake.',
  },
]

const shrines = [
  { title: 'Karbala', detail: 'Imam Hussain & Hazrat Abbas', image: '/images/hero-karbala.jpg', to: '/masoomeen/imam-hussain' },
  { title: 'Najaf', detail: 'Imam Ali', image: '/images/imam-ali-shrine.jpg', to: '/masoomeen/imam-ali' },
  { title: 'Mashhad', detail: 'Imam Reza', image: '/images/imam-reza-shrine.jpg', to: '/masoomeen/imam-reza' },
  { title: 'Samarra', detail: 'Imam al-Hadi & Imam al-Askari', image: '/images/askari-shrine.jpg', to: '/masoomeen/imam-askari' },
]

export default function Ziyarat() {
  const ziyarats = useMemo(() => supplications.filter((item) => item.type === 'ziyarat'), [])
  const { bookmarks } = useBookmarks()
  const [tag, setTag] = useState('All')
  const tags = useMemo(() => ['All', ...new Set(ziyarats.flatMap((item) => item.tags || []))], [ziyarats])
  const filtered = tag === 'All' ? ziyarats : ziyarats.filter((item) => item.tags?.includes(tag))
  const saved = ziyarats.filter((item) => bookmarks.includes(item.slug))

  return (
    <>
      <Seo
        title="Ziyarat"
        description="Recite the ziyarat of the Ahlulbayt — Ziyarat Ashura, Ziyarat Waritha, Ziyarat Aal-e-Yasin and Ziyarat Jamia Kabira — with Arabic, transliteration, English and Urdu."
      />

      <PageHero
        eyebrow="Visitation & salutation"
        arabic="زِيَارَة"
        title="A greeting carried"
        titleAccent="across distance and time."
        intro="Ziyarat is the language of presence: a salutation to the Prophet’s household, a renewal of allegiance, and a conversation with the lives that still shape our own."
        image="/images/abbas-shrine.jpg"
        imageAlt="The shrine of Hazrat Abbas in Karbala, Iraq."
        breadcrumb={[{ label: 'Ziyarat' }]}
        imageCaption="The shrine of Hazrat Abbas · Karbala, Iraq"
      >
        <a href="#ziyarat-library" className="btn btn--gold">
          Enter the ziyarat library <ArrowRight size={16} />
        </a>
        <Link to="/duas" className="btn btn--glass">
          Duas <ArrowUpRight size={16} />
        </Link>
      </PageHero>

      <section className="section section--ziyarat-intro">
        <div className="container ziyarat-intro">
          <Reveal className="ziyarat-intro__body">
            <SectionHeading
              eyebrow="What is ziyarat?"
              arabic="السَّلَامُ عَلَيْكُم"
              title={<>A visit made with <em>the heart.</em></>}
              intro="The word ziyarat comes from the root meaning to visit. It is the practice of greeting the Prophet, the Imams, and the righteous, recalling their station before God, and renewing one’s commitment to the path they served."
            />
            <div className="prose">
              <p>
                Ziyarat is not worship of the created. It is a salutation to those whom God has
                honoured, a remembrance of their sacrifices, and a pledge to carry their message.
                The texts move between praise, grief, intercession, and resolve.
              </p>
              <p>
                The most widely recited is Ziyarat Ashura, read on the day of Ashura and at other
                times of need. The Ziyarat Jamia Kabira, narrated from Imam al-Hadi, is a profound
                meditation on the station of the Imams and the meaning of wilaya.
              </p>
            </div>
            <Ornament />
          </Reveal>

          <Reveal className="ziyarat-intro__salutation" delay={0.1}>
            <div className="salutation-card">
              <span className="salutation-card__arabic arabic" dir="rtl" lang="ar">
                السَّلَامُ عَلَيْكَ يَا أَبَا عَبْدِ اللَّهِ الْحُسَيْنَ
              </span>
              <p>Peace be upon you, O Abu ‘Abdillah al-Hussain.</p>
              <span className="salutation-card__source">The opening salutation of Ziyarat Ashura</span>
              <div className="salutation-card__stars" aria-hidden="true">✦ ✦ ✦</div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--adab">
        <div className="container">
          <SectionHeading
            eyebrow="The manner of the visit"
            arabic="آدَابُ الزِّيَارَة"
            title={<>Four movements of <em>attention.</em></>}
            intro="These are invitations to presence, not a legal checklist. For the detailed rulings of ziyarat, follow your marja‘ and local scholars."
            align="center"
          />
          <div className="adab-grid">
            {adab.map(({ icon: Icon, title, text }, index) => (
              <Reveal className="adab-card" key={title} delay={index * 0.05}>
                <span className="adab-card__number">0{index + 1}</span>
                <Icon size={21} />
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--library" id="ziyarat-library">
        <div className="container">
          <div className="section-heading-row">
            <SectionHeading
              eyebrow="The collection"
              arabic="زِيَارَات"
              title={<>Four <em>visitations.</em></>}
              intro="Read with Arabic, transliteration, English, and Urdu — with adjustable type, reading mode, and private bookmarks."
            />
            <div className="library-count">
              <strong>{ziyarats.length}</strong>
              <span>ziyarat</span>
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
                  <Link key={item.slug} to={`/ziyarat/${item.slug}`} className="saved-chip">
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

          <Reveal className="source-note">
            <strong>About this edition</strong>
            <p>
              The ziyarat texts are transcribed from Duas.org. Where the complete text is lengthy,
              this edition presents selected passages and clearly labels them, linking to the
              complete text and audio. Urdu renderings were prepared for this edition from the
              English translation as a reading aid.
            </p>
            <a href="https://www.duas.org" target="_blank" rel="noreferrer" className="text-link">
              Visit Duas.org <ArrowUpRight size={14} />
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section section--shrines">
        <div className="container">
          <SectionHeading
            eyebrow="Places of remembrance"
            arabic="مَشَاهِد"
            title={<>The shrines that hold <em>the story.</em></>}
            intro="Architecture cannot contain a life, but these places gather the memory of the household for millions of visitors each year."
            align="center"
          />
          <div className="shrine-strip">
            {shrines.map((shrine, index) => (
              <Reveal key={shrine.title} delay={index * 0.05}>
                <Link to={shrine.to} className="shrine-tile">
                  <img src={shrine.image} alt={`${shrine.title} — ${shrine.detail}`} loading="lazy" />
                  <span className="shrine-tile__veil" aria-hidden="true" />
                  <div className="shrine-tile__body">
                    <span>{shrine.detail}</span>
                    <strong>{shrine.title}</strong>
                    <ArrowUpRight size={16} />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--cross-link">
        <div className="container cross-link-panel">
          <div>
            <span className="eyebrow">The season of remembrance</span>
            <h2 className="display">Enter <em>Muharram.</em></h2>
            <p>
              The days of Muharram frame the central ziyarat of the year. Discover the meaning of
              Ashura, the journey of the captives, and the etiquette of mourning.
            </p>
          </div>
          <Link to="/muharram" className="btn btn--gold">
            Explore Muharram <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
