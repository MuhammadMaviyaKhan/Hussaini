import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Droplets,
  Info,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import Ornament from '../components/Ornament'
import { wuduConditions, wuduNullifiers, wuduSteps } from '../data/prayers'

export default function Wudu() {
  return (
    <>
      <Seo
        title="Wudu Guide"
        description="A step-by-step guide to wudu in the Ja'fari school: intention, washing the hands, mouth, nose, face and arms, and wiping the head and feet, with conditions and nullifiers."
      />

      <PageHero
        eyebrow="Ritual purification"
        arabic="الْوُضُوء"
        title="Purity is the doorway"
        titleAccent="to presence."
        intro="Wudu is the washing and wiping that prepares the body for prayer, recitation, and the touch of the sacred. It is a small discipline that gathers the scattered self."
        image="/images/askari-shrine.jpg"
        imageAlt="The Al-Askari shrine in Samarra, Iraq."
        breadcrumb={[{ label: 'Wudu Guide' }]}
        imageCaption="Al-Askari shrine · Samarra, Iraq"
      >
        <a href="#wudu-steps" className="btn btn--gold">
          Learn the steps <ArrowRight size={16} />
        </a>
        <Link to="/namaz" className="btn btn--glass">
          Continue to namaz <ArrowUpRight size={16} />
        </Link>
      </PageHero>

      <section className="section section--wudu-intro">
        <div className="container wudu-intro">
          <Reveal className="wudu-intro__body">
            <SectionHeading
              eyebrow="Before the water"
              arabic="النِّيَّة"
              title={<>Begin with <em>intention.</em></>}
              intro="The outward act begins with an inward turn. Make the intention in your heart to perform wudu for the sake of Allah, seeking purity for worship."
            />
            <div className="prose">
              <p>
                In the Ja‘fari school, wudu consists of washing the face and both arms, and wiping
                the head and both feet, performed in sequence and without a long interruption. The
                steps below follow the widely taught sequence.
              </p>
              <p>
                The details of validity can differ with circumstances. Where you are uncertain about
                a specific situation — illness, travel, water scarcity, or a barrier on the skin —
                consult your marja‘ or a qualified teacher.
              </p>
            </div>
            <div className="wudu-intro__pill">
              <Sparkles size={17} />
              <span>The intention is internal; no specific formula must be spoken.</span>
            </div>
          </Reveal>
          <Reveal className="wudu-intro__visual" delay={0.08}>
            <div className="wudu-rings" aria-hidden="true">
              <span className="wudu-rings__ring wudu-rings__ring--1" />
              <span className="wudu-rings__ring wudu-rings__ring--2" />
              <span className="wudu-rings__ring wudu-rings__ring--3" />
              <span className="wudu-rings__drop"><Droplets size={30} /></span>
              <span className="wudu-rings__arabic arabic" dir="rtl" lang="ar">مَاء</span>
            </div>
            <p className="wudu-intro__caption">Water · intention · presence</p>
            <Ornament />
          </Reveal>
        </div>
      </section>

      <section className="section section--wudu-steps" id="wudu-steps">
        <div className="container">
          <SectionHeading
            eyebrow="The sequence"
            arabic="خُطُوَاتُ الْوُضُوء"
            title={<>Nine steps, <em>one purification.</em></>}
            intro="Read through the sequence, or return to a single step as you learn. The intention is an inward condition; rinsing the mouth and nose is recommended, while the face, arms, head, and feet are the essential acts."
            align="center"
          />

          <div className="wudu-steps">
            {wuduSteps.map((step, index) => (
              <Reveal className="wudu-step" key={step.number} delay={(index % 3) * 0.03}>
                <div className="wudu-step__marker">
                  <span>{step.number}</span>
                  {index < wuduSteps.length - 1 && <span className="wudu-step__line" aria-hidden="true" />}
                </div>
                <div className="wudu-step__card">
                  <div className="wudu-step__head">
                    <div>
                      <h3>{step.title}</h3>
                      <span className="wudu-step__arabic arabic" dir="rtl" lang="ar">{step.arabic}</span>
                    </div>
                    {index === 0
                      ? <span className="tag tag--outline">Condition</span>
                      : index < 4
                        ? <span className="tag tag--outline">Recommended</span>
                        : <span className="tag tag--gold">Essential</span>}
                  </div>
                  <p>{step.text}</p>
                  <div className="wudu-step__note">
                    <Info size={14} />
                    <span>{step.note}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--wudu-rules">
        <div className="container">
          <SectionHeading
            eyebrow="Keeping the wudu"
            arabic="أَحْكَامُ الْوُضُوء"
            title={<>Conditions and <em>nullifiers.</em></>}
            intro="These are the general conditions for validity and the common acts that break wudu. They are offered as an introduction, not a substitute for detailed legal guidance."
            align="center"
          />
          <div className="rules-grid">
            <Reveal className="rules-card rules-card--valid">
              <div className="rules-card__head">
                <ShieldCheck size={20} />
                <h3>Conditions for validity</h3>
              </div>
              <ul>
                {wuduConditions.map((condition) => (
                  <li key={condition}>
                    <Check size={14} />
                    <span>{condition}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="rules-card rules-card--null">
              <div className="rules-card__head">
                <X size={20} />
                <h3>What breaks wudu</h3>
              </div>
              <ul>
                {wuduNullifiers.map((item) => (
                  <li key={item}>
                    <span className="rules-card__dash" aria-hidden="true">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal className="wudu-note">
            <Info size={18} />
            <div>
              <strong>A note on differences</strong>
              <p>
                Wudu rulings vary in detail between schools of jurisprudence and even between
                jurists within a school. In the Ja‘fari tradition, the feet are wiped rather than
                washed. Follow the guidance of your marja‘ and learn the practice in the company of
                a knowledgeable teacher.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--wudu-practice">
        <div className="container practice-panel">
          <div className="practice-panel__body">
            <span className="eyebrow">After wudu</span>
            <h2 className="display">The prayer is <em>ready for you.</em></h2>
            <p>
              With the body purified, turn to the qibla, make the intention for the prayer, and
              begin. The guide to namaz takes you through the movements and words.
            </p>
            <div className="practice-panel__actions">
              <Link to="/namaz" className="btn btn--gold">
                Namaz guide <ArrowRight size={16} />
              </Link>
              <Link to="/tasbeeh" className="btn btn--ghost">
                Digital tasbeeh
              </Link>
            </div>
          </div>
          <div className="practice-panel__watermark arabic" dir="rtl" lang="ar" aria-hidden="true">الْوُضُوء</div>
        </div>
      </section>
    </>
  )
}
