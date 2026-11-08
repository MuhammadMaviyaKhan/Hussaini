import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  HeartHandshake,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import Ornament from '../components/Ornament'
import { siteMeta, socialLinks } from '../data/site'

const topics = [
  'A question about the site',
  'A content correction',
  'Permission & attribution',
  'Collaboration & contribution',
  'A personal reflection',
]

const reasons = [
  { icon: MessageCircle, title: 'Ask a question', text: 'A question about a page, a source, or the way something is presented.' },
  { icon: ShieldCheck, title: 'Correct the record', text: 'If you find an error, an unsupported attribution, or an awkward translation, tell us.' },
  { icon: HeartHandshake, title: 'Build with us', text: 'Writers, translators, scholars, and designers are welcome to write with humility.' },
]

const faqs = [
  {
    q: 'How soon will I receive a reply?',
    a: 'Messages are reviewed in the order they arrive. A considered reply may take a few days; corrections with sources are prioritised.',
  },
  {
    q: 'Can I submit a correction with a source?',
    a: 'Yes. Please include the edition, volume, page, and a link where possible. Corrections that identify a clear error are always welcome, even when the answer is not immediate.',
  },
  {
    q: 'Can I reuse material from HUSSAINI?',
    a: 'The design and original writing are offered for personal and educational use with attribution. Photographs remain under their own licences; see the image credits page for details.',
  },
  {
    q: 'Do you offer religious rulings?',
    a: 'No. HUSSAINI is an educational project, not a source of fatwa. For questions of law and practice, consult a qualified scholar or your marja‘.',
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', topic: topics[0], message: '' })
  const [sent, setSent] = useState(false)
  const [reference, setReference] = useState('')
  const [openFaq, setOpenFaq] = useState(0)

  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }))

  const submit = (event) => {
    event.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return
    const created = `HS-${Date.now().toString().slice(-6)}`
    try {
      const existing = JSON.parse(window.localStorage.getItem('hussaini:contact-messages') || '[]')
      window.localStorage.setItem(
        'hussaini:contact-messages',
        JSON.stringify([...existing, { ...form, reference: created, at: new Date().toISOString() }]),
      )
    } catch {
      // The confirmation below still records the intent for this visit.
    }
    setReference(created)
    setSent(true)
    setForm({ name: '', email: '', topic: topics[0], message: '' })
  }

  const mailto = `mailto:${siteMeta.email}?subject=${encodeURIComponent('HUSSAINI — message from the website')}`

  return (
    <>
      <Seo
        title="Contact Us"
        description="Contact the HUSSAINI team with a question, a correction, a permission request, or a contribution. We read every message with care."
      />

      <PageHero
        eyebrow="Speak with the team"
        arabic="السَّلَامُ عَلَيْكُم"
        title="A conversation"
        titleAccent="begins with salam."
        intro="Questions, corrections, contributions, and quiet reflections are all welcome. If something on this site has helped or troubled you, write to us with care."
        breadcrumb={[{ label: 'Contact' }]}
      >
        <a href="#contact-form" className="btn btn--gold">
          Write a message <ArrowRight size={16} />
        </a>
        <a href={mailto} className="btn btn--glass">
          Email directly <Mail size={16} />
        </a>
      </PageHero>

      <section className="section section--contact-reasons">
        <div className="container">
          <div className="contact-reasons">
            {reasons.map(({ icon: Icon, title, text }, index) => (
              <Reveal className="contact-reason" key={title} delay={index * 0.05}>
                <Icon size={20} />
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--contact" id="contact-form">
        <div className="container contact-layout">
          <Reveal className="contact-intro">
            <SectionHeading
              eyebrow="Write to us"
              arabic="كِتَابَة"
              title={<>What is on <em>your heart?</em></>}
              intro="A short note is enough. If you are sending a correction, please include the source and the page you are writing about."
            />
            <div className="contact-info">
              <a href={mailto} className="contact-info__item">
                <span className="contact-info__icon"><Mail size={18} /></span>
                <span>
                  <small>Email</small>
                  <strong>{siteMeta.email}</strong>
                </span>
                <ArrowUpRight size={15} />
              </a>
              <div className="contact-info__item">
                <span className="contact-info__icon"><MapPin size={18} /></span>
                <span>
                  <small>Where we are</small>
                  <strong>{siteMeta.location}</strong>
                </span>
              </div>
              <div className="contact-info__item">
                <span className="contact-info__icon"><Sparkles size={18} /></span>
                <span>
                  <small>Response</small>
                  <strong>Read with care; replies may take a few days.</strong>
                </span>
              </div>
            </div>
            <div className="contact-socials">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
                  {social.label} <ArrowUpRight size={13} />
                </a>
              ))}
            </div>
            <Ornament />
          </Reveal>

          <Reveal className="contact-form-panel" delay={0.08}>
            {sent ? (
              <div className="contact-success" role="status">
                <span className="contact-success__icon"><Check size={26} /></span>
                <span className="eyebrow">Message recorded</span>
                <h2 className="display">Thank you for writing.</h2>
                <p>
                  Your message has been stored on this device with the reference{' '}
                  <strong>{reference}</strong>. This preview has no live inbox — to make sure it
                  reaches the team, send it directly by email.
                </p>
                <div className="contact-success__actions">
                  <a href={mailto} className="btn btn--gold">Send by email <Mail size={16} /></a>
                  <button type="button" className="btn btn--ghost" onClick={() => setSent(false)}>
                    Write another
                  </button>
                </div>
                <Ornament />
              </div>
            ) : (
              <form className="contact-form" onSubmit={submit}>
                <div className="contact-form__head">
                  <span className="eyebrow">The message</span>
                  <h2 className="display">A few details first.</h2>
                  <p>All fields marked required help us reply with context.</p>
                </div>

                <div className="form-grid">
                  <label className="field">
                    <span>Your name <em>*</em></span>
                    <input
                      type="text"
                      value={form.name}
                      onChange={update('name')}
                      placeholder="How may we address you?"
                      required
                      autoComplete="name"
                    />
                  </label>
                  <label className="field">
                    <span>Email <em>*</em></span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={update('email')}
                      placeholder="you@example.com"
                      required
                      autoComplete="email"
                    />
                  </label>
                </div>

                <label className="field">
                  <span>What is this about?</span>
                  <select value={form.topic} onChange={update('topic')}>
                    {topics.map((topic) => <option key={topic}>{topic}</option>)}
                  </select>
                </label>

                <label className="field">
                  <span>Your message <em>*</em></span>
                  <textarea
                    rows="7"
                    value={form.message}
                    onChange={update('message')}
                    placeholder="Write with the same care you would bring to a letter…"
                    required
                  />
                  <small>{form.message.length} characters · please include a source for corrections.</small>
                </label>

                <div className="contact-form__foot">
                  <p>
                    <ShieldCheck size={14} /> Your details are stored locally in this preview and
                    are never sent to a third party.
                  </p>
                  <button type="submit" className="btn btn--gold">
                    Send message <Send size={16} />
                  </button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      <section className="section section--contact-faq">
        <div className="container faq-layout">
          <div className="faq-layout__intro">
            <SectionHeading
              eyebrow="Before you write"
              arabic="أَسْئِلَة"
              title={<>A few <em>answers.</em></>}
              intro="Some questions arrive often enough to deserve a place on the page."
            />
            <p className="faq-layout__note">
              HUSSAINI is an educational project, not a fatwa office. For rulings, consult your
              marja‘.
            </p>
            <Link to="/about" className="btn btn--outline">About our principles <ArrowRight size={15} /></Link>
          </div>
          <div className="accordion">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index
              return (
                <div className={`accordion__item ${isOpen ? 'is-open' : ''}`} key={faq.q}>
                  <button type="button" onClick={() => setOpenFaq(isOpen ? -1 : index)} aria-expanded={isOpen}>
                    <span>{faq.q}</span>
                    <ChevronDown size={18} className={isOpen ? 'rotate' : ''} />
                  </button>
                  <div className="accordion__answer"><p>{faq.a}</p></div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
