import { Link } from 'react-router-dom'
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Compass,
  Eye,
  FileText,
  Heart,
  Image,
  Languages,
  Link2,
  Scale,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import Ornament from '../components/Ornament'
import GeometricPattern from '../components/GeometricPattern'

const principles = [
  {
    icon: Compass,
    title: 'Tawhid before everything',
    text: 'God alone is worshipped. The Ahlulbayt are honoured as the servants and guides of God, never as partners in divinity. Every page is written within this boundary.',
  },
  {
    icon: BookOpen,
    title: 'Sources before sentiment',
    text: 'Where a text is quoted, a source is named. Where a report is attributed in later collections rather than an early one, the reader is told. Beauty is never allowed to outrun truth.',
  },
  {
    icon: FileText,
    title: 'Excerpts are labelled',
    text: 'Some supplications and ziyarat are long. When this edition presents selected passages, it says so clearly and provides a link to the complete text and audio.',
  },
  {
    icon: Image,
    title: 'No depictions of the Masoomeen',
    text: 'The site uses architecture, calligraphy, geometry, and landscape. It does not depict the Prophet, Fatima, or the Imams, in keeping with the reverence of the tradition.',
  },
  {
    icon: Scale,
    title: 'Dignity over spectacle',
    text: 'Karbala is not content. Grief is not a design trend. The visual language aims at stillness, reverence, and clarity rather than sensation.',
  },
  {
    icon: ShieldCheck,
    title: 'Correction is welcome',
    text: 'Errors are possible in any human project. A correction that names a source and an edition is received as a gift, and pages are revised when the evidence warrants it.',
  },
]

const methodology = [
  { icon: Search, title: 'Gather', text: 'Identify the primary text, its editions, and the most reliable available translation.' },
  { icon: CheckCircle2, title: 'Verify', text: 'Compare attributions, dates, and contexts across sources. Mark uncertainty rather than hide it.' },
  { icon: Languages, title: 'Render', text: 'Translate with clarity and reverence. Where a rendering is editorial, label it as such.' },
  { icon: Eye, title: 'Present', text: 'Design for reading: typography, space, and controls that serve attention rather than distract from it.' },
  { icon: Users, title: 'Review', text: 'Invite readers and scholars to identify errors, and revise the record openly.' },
]

const commitments = [
  'No fabricated hadith, supplication, or ziyarat text.',
  'No claim that a provisional translation is the only possible meaning.',
  'No fatwas or binding legal rulings.',
  'No selling of personal data or advertising trackers.',
  'No depictions of the Prophet or the Imams.',
  'No silent use of an image without a credit and licence link.',
]

export default function AboutUs() {
  return (
    <>
      <Seo
        title="About Us"
        description="About HUSSAINI — a digital sanctuary of knowledge, devotion and remembrance dedicated to the Ahlulbayt, with clear editorial principles, sources, and boundaries."
      />

      <PageHero
        eyebrow="About the project"
        arabic="عَنِ الْمَشْرُوع"
        title="Built as a sanctuary,"
        titleAccent="not a stage."
        intro="HUSSAINI is an independent educational project devoted to the Ahlulbayt and the message of Karbala. It exists to make careful reading, reverent design, and reliable sources available in one quiet place."
        image="/images/karbala-city.jpg"
        imageAlt="An aerial view of Karbala, Iraq."
        breadcrumb={[{ label: 'About Us' }]}
        imageCaption="Karbala · Iraq"
      >
        <a href="#principles" className="btn btn--gold">
          Our editorial principles <ArrowRight size={16} />
        </a>
        <Link to="/contact" className="btn btn--glass">
          Write to us
        </Link>
      </PageHero>

      <section className="section section--mission">
        <div className="container mission">
          <Reveal className="mission__body">
            <SectionHeading
              eyebrow="Why this site exists"
              arabic="رِسَالَة"
              title={<>Knowledge with <em>reverence.</em></>}
              intro="The internet is full of fragments: a quote without a source, a story without a context, a shrine photograph without a credit. HUSSAINI began with a simple question — what would it look like to build the opposite?"
            />
            <div className="prose">
              <p>
                The result is a digital sanctuary: a place where the lives of the Fourteen are
                presented with dates and sources, where supplications can be read in Arabic,
                transliteration, English, and Urdu, and where the history of Karbala is told with
                the gravity it deserves.
              </p>
              <p>
                The project is independent and non-commercial. It is not affiliated with a
                particular marja‘, political movement, or institution. Its editorial standard is
                simple: say what can be supported, label what is uncertain, and never let the beauty
                of a page become a substitute for the truth of a claim.
              </p>
            </div>
            <div className="mission__signature">
              <Ornament />
              <span>“Say: My Lord, increase me in knowledge.”</span>
              <small>The Qur’an · Surah Ta-Ha 20:114</small>
            </div>
          </Reveal>

          <Reveal className="mission__panel" delay={0.08}>
            <GeometricPattern className="mission__pattern" opacity={0.12} />
            <span className="eyebrow">At a glance</span>
            <div className="mission__stats">
              <div><strong>14</strong><span>Infallibles presented</span></div>
              <div><strong>8</strong><span>Complete reader texts</span></div>
              <div><strong>114</strong><span>Surahs indexed</span></div>
              <div><strong>20</strong><span>Pages of the sanctuary</span></div>
            </div>
            <div className="mission__links">
              <Link to="/masoomeen" className="text-link">The 14 Masoomeen <ArrowUpRight size={14} /></Link>
              <Link to="/duas" className="text-link">Duas & ziyarat <ArrowUpRight size={14} /></Link>
              <Link to="/karbala" className="text-link">Karbala history <ArrowUpRight size={14} /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--principles" id="principles">
        <div className="container">
          <SectionHeading
            eyebrow="Editorial principles"
            arabic="مَبَادِئُ التَّحْرِير"
            title={<>The rules we <em>hold ourselves to.</em></>}
            intro="These principles shape what is published, how it is labelled, and what is deliberately left out."
            align="center"
          />
          <div className="principle-grid">
            {principles.map(({ icon: Icon, title, text }, index) => (
              <Reveal className="principle-card" key={title} delay={(index % 3) * 0.05}>
                <span className="principle-card__number">{String(index + 1).padStart(2, '0')}</span>
                <Icon size={21} />
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="commitments">
            <div className="commitments__head">
              <span className="eyebrow"><Heart size={13} /> Our commitments</span>
              <h3 className="display">What we will not do.</h3>
            </div>
            <ul>
              {commitments.map((commitment) => (
                <li key={commitment}><CheckCircle2 size={16} /> {commitment}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section section--methodology">
        <div className="container">
          <SectionHeading
            eyebrow="How a page is made"
            arabic="الْمَنْهَجِيَّة"
            title={<>From source <em>to screen.</em></>}
            intro="Every page passes through the same five movements, though not every page requires the same depth of research."
            align="center"
          />
          <div className="methodology-rail">
            {methodology.map(({ icon: Icon, title, text }, index) => (
              <Reveal className="methodology-step" key={title} delay={index * 0.04}>
                <span className="methodology-step__number">{String(index + 1).padStart(2, '0')}</span>
                <span className="methodology-step__icon"><Icon size={19} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--boundaries">
        <div className="container boundaries">
          <Reveal className="boundaries__body">
            <span className="eyebrow"><AlertCircle size={13} /> Clear boundaries</span>
            <h2 className="display">What this site <em>is not.</em></h2>
            <div className="boundaries__grid">
              <div>
                <h3>Not a fatwa office</h3>
                <p>We do not issue religious rulings. For matters of practice, consult your marja‘ or a qualified scholar.</p>
              </div>
              <div>
                <h3>Not a substitute for scholarship</h3>
                <p>Our pages introduce the tradition. They do not replace the study of primary texts with a teacher.</p>
              </div>
              <div>
                <h3>Not affiliated</h3>
                <p>The project is independent of any institution, party, or marja‘. It seeks to serve readers across communities.</p>
              </div>
              <div>
                <h3>Not finished</h3>
                <p>The library grows, translations are revised, and corrections are incorporated. A static page is never the final word.</p>
              </div>
            </div>
            <div className="boundaries__correction">
              <Link2 size={18} />
              <p>
                Found an error? Please include the page, the claim, the source, and the edition in
                your message.
              </p>
              <Link to="/contact" className="btn btn--gold btn--small">Send a correction <ArrowRight size={14} /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--acknowledgements">
        <div className="container acknowledgements">
          <Reveal className="acknowledgements__intro">
            <span className="eyebrow"><Sparkles size={13} /> With gratitude</span>
            <h2 className="display">Standing on <em>generous shoulders.</em></h2>
            <p>
              This project draws on the work of translators, archivists, photographers, and
              volunteers who have made the tradition accessible in the digital age.
            </p>
            <Link to="/credits" className="btn btn--outline">Full credits & licences <ArrowUpRight size={15} /></Link>
          </Reveal>
          <div className="acknowledgements__list">
            <div><strong>Duas.org</strong><span>Supplication and ziyarat texts</span></div>
            <div><strong>Tanzil & AlQuran Cloud</strong><span>Qur’anic Arabic text</span></div>
            <div><strong>Marmaduke Pickthall</strong><span>Public-domain English translation</span></div>
            <div><strong>Al-Islam.org</strong><span>Links to complete translations</span></div>
            <div><strong>Wikimedia Commons</strong><span>Shrine and context photography</span></div>
          </div>
        </div>
      </section>
    </>
  )
}
