import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, BookOpen, Heart, Scale, Sparkles } from 'lucide-react'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import Ornament from '../components/Ornament'
import { masoomeen } from '../data/masoomeen'
import { values } from '../data/site'

const quranicFoundations = [
  {
    reference: 'Surah al-Ahzab · 33:33',
    arabic: 'إِنَّمَا يُرِيدُ اللَّهُ لِيُذْهِبَ عَنكُمُ الرِّجْسَ أَهْلَ الْبَيْتِ وَيُطَهِّرَكُمْ تَطْهِيرًا',
    english:
      'Allah’s wish is but to remove uncleanness far from you, O Folk of the Household, and cleanse you with a thorough cleansing.',
    note: 'The verse of purification, understood by the Prophet’s household and their followers as referring to the Five of the Cloak and the Imams after them.',
  },
  {
    reference: 'Surah ash-Shura · 42:23',
    arabic: 'قُل لَّا أَسْأَلُكُمْ عَلَيْهِ أَجْرًا إِلَّا الْمَوَدَّةَ فِي الْقُرْبَىٰ',
    english:
      'Say: I ask of you no fee therefor, save loving-kindness among kinsfolk.',
    note: 'The love of the near kin is presented in the Qur’an not as a favour to the Prophet, but as a path of gratitude for guidance.',
  },
  {
    reference: 'Surah Aal ‘Imran · 3:61',
    arabic: 'فَقُلْ تَعَالَوْا نَدْعُ أَبْنَاءَنَا وَأَبْنَاءَكُمْ وَنِسَاءَنَا وَنِسَاءَكُمْ وَأَنفُسَنَا وَأَنفُسَكُمْ',
    english:
      'Say: Come, let us call our sons and your sons, and our women and your women, and our selves and your selves…',
    note: 'The verse of the mubahala. The Prophet brought Ali, Fatima, Hasan and Hussain as the family of the Prophet — the Ahlulbayt.',
  },
]

const fiveOfTheCloak = masoomeen.filter((person) => person.order <= 5)

export default function AboutAhlulbayt() {
  return (
    <>
      <Seo
        title="About Ahlulbayt"
        description="Who are the Ahlulbayt? Discover the household of the Prophet Muhammad ﷺ through the Qur'an, the hadith of the cloak and Thaqalayn, and the lives of the Fourteen Infallibles."
      />

      <PageHero
        eyebrow="The household of the Prophet"
        arabic="أَهْلُ الْبَيْت"
        title="The family of the Prophet,"
        titleAccent="the light of every age."
        intro="The Ahlulbayt are the household of the Prophet Muhammad ﷺ — the people of the cloak, the line of the twelve Imams, and the family whose remembrance has carried the prophetic message through fourteen centuries."
        image="/images/imam-ali-shrine.jpg"
        imageAlt="The shrine of Imam Ali in Najaf, Iraq."
        breadcrumb={[{ label: 'About Ahlulbayt' }]}
        imageCaption="The shrine of Imam Ali · Najaf, Iraq"
      >
        <Link to="/masoomeen" className="btn btn--gold">
          Meet the 14 Masoomeen <ArrowRight size={16} />
        </Link>
        <Link to="/karbala" className="btn btn--glass">
          The witness of Karbala <ArrowUpRight size={16} />
        </Link>
      </PageHero>

      <section className="section section--intro">
        <div className="container">
          <div className="ahlulbayt-definition">
            <Reveal className="ahlulbayt-definition__lead">
              <SectionHeading
                eyebrow="A household, not a dynasty"
                arabic="بَيْتُ النُّبُوَّة"
                title={<>What does <em>Ahlulbayt</em> mean?</>}
                intro="In Arabic, Ahl al-Bayt means the people of the house — the family at the centre of a household. In the language of the Qur’an and the Prophet’s tradition, it refers to those whom Allah purified and whom the Prophet raised as the inheritors of his guidance."
              />
              <div className="prose">
                <p>
                  The term is not a claim of worldly nobility. It is a description of a spiritual
                  responsibility. The Ahlulbayt are the family through whom the Prophet’s message
                  was preserved, taught, and embodied: his cousin and son-in-law Ali ibn Abi Talib,
                  his daughter Fatima al-Zahra, their sons Hasan and Hussain, and the nine Imams
                  from the line of Hussain.
                </p>
                <p>
                  Shia Muslims hold that the Prophet explicitly joined the Book of Allah and his
                  family as two inseparable trusts for the community. To love the Ahlulbayt is to
                  follow the path they taught: worship of the One God, justice toward every person,
                  and a life shaped by the example of the Prophet.
                </p>
              </div>
              <div className="ahlulbayt-definition__actions">
                <Link to="/masoomeen" className="btn btn--outline">
                  Read their lives <ArrowRight size={16} />
                </Link>
                <Link to="/hadith" className="text-link">
                  Read the Prophetic traditions <ArrowUpRight size={15} />
                </Link>
              </div>
            </Reveal>

            <Reveal className="ahlulbayt-definition__card" delay={0.1}>
              <div className="creedal-card">
                <span className="creedal-card__eyebrow">The Prophet’s counsel</span>
                <span className="creedal-card__arabic arabic" dir="rtl" lang="ar">
                  إِنِّي تَارِكٌ فِيكُمُ الثَّقَلَيْنِ: كِتَابَ اللَّهِ وَعِتْرَتِي أَهْلَ بَيْتِي
                </span>
                <p>
                  “I leave among you two weighty things: the Book of Allah and my progeny, my
                  family. If you hold fast to them, you will never go astray after me.”
                </p>
                <span className="creedal-card__source">
                  Hadith al-Thaqalayn · Sahih Muslim, Kitab al-Fada’il
                </span>
                <div className="creedal-card__seal" aria-hidden="true">
                  <svg viewBox="0 0 120 120" fill="none">
                    <path d="M60 6 70 40 104 30 94 64 116 74 82 84 92 118 60 98 28 118 38 84 4 74 26 64 16 30 50 40Z" stroke="currentColor" strokeWidth=".7" />
                    <circle cx="60" cy="62" r="30" stroke="currentColor" strokeWidth=".6" opacity=".6" />
                  </svg>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--foundations">
        <div className="container">
          <SectionHeading
            eyebrow="Grounded in revelation"
            arabic="فِي الْقُرْآنِ وَالسُّنَّة"
            title={<>Three <em>foundations.</em></>}
            intro="The place of the Ahlulbayt is not a later invention. It is rooted in the Qur’an, confirmed by the Prophet, and embodied in the lives of the Imams."
            align="center"
          />
          <div className="foundation-grid">
            {quranicFoundations.map((foundation, index) => (
              <Reveal className="foundation-card" key={foundation.reference} delay={index * 0.07}>
                <span className="foundation-card__number">0{index + 1}</span>
                <span className="tag tag--gold">{foundation.reference}</span>
                <p className="foundation-card__arabic arabic" dir="rtl" lang="ar">{foundation.arabic}</p>
                <p className="foundation-card__english">{foundation.english}</p>
                <p className="foundation-card__note">{foundation.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--five">
        <div className="container">
          <div className="five-split">
            <Reveal className="five-split__intro">
              <SectionHeading
                eyebrow="The people of the cloak"
                arabic="أَصْحَابُ الْكِسَاء"
                title={<>Five beneath <em>one cloak.</em></>}
                intro="The Prophet gathered Ali, Fatima, Hasan and Hussain beneath his cloak and prayed for their purification. This moment is narrated in both Sunni and Shia sources, and it names the family at the heart of the tradition."
              />
              <p className="five-split__note">
                From this household came the twelve Imams — nine after Hussain — whose guidance
                forms the continuous chain of the Shia Imamate.
              </p>
              <Link to="/masoomeen" className="btn btn--outline">
                Trace the full lineage <ArrowRight size={16} />
              </Link>
            </Reveal>
            <div className="five-split__list">
              {fiveOfTheCloak.map((person, index) => (
                <Reveal key={person.slug} delay={index * 0.05}>
                  <Link to={`/masoomeen/${person.slug}`} className="cloak-row">
                    <span className="cloak-row__order">{String(person.order).padStart(2, '0')}</span>
                    <div className="cloak-row__body">
                      <span className="cloak-row__arabic arabic" dir="rtl" lang="ar">
                        {person.arabicName.split(' عَلَيْهِ')[0].split(' عَلَيْهَا')[0].split(' عَجَّلَ')[0]}
                      </span>
                      <strong>{person.englishName}</strong>
                      <small>{person.title}</small>
                    </div>
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--loving">
        <div className="container">
          <div className="loving-panel">
            <div className="loving-panel__pattern" aria-hidden="true" />
            <Reveal className="loving-panel__content">
              <span className="eyebrow"><Heart size={13} /> Love and following</span>
              <h2 className="display">Love is the beginning, <em>not the end.</em></h2>
              <p>
                The Qur’an speaks of the love of the near kin as a path of gratitude. The Prophet’s
                family did not ask for a following built on sentiment alone; they asked for a life
                shaped by truth, mercy, and justice. Their love is honoured by walking the way they
                walked.
              </p>
              <div className="loving-panel__pillars">
                <div>
                  <BookOpen size={18} />
                  <span>Rooted in the Book</span>
                </div>
                <div>
                  <Scale size={18} />
                  <span>Measured by justice</span>
                </div>
                <div>
                  <Sparkles size={18} />
                  <span>Carried in remembrance</span>
                </div>
              </div>
              <Ornament />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--values">
        <div className="container">
          <SectionHeading
            eyebrow="The shape of the path"
            arabic="الْإِيمَانُ وَالْعَمَل"
            title={<>Virtues the household <em>lived.</em></>}
            intro="The Ahlulbayt taught by example. These six values recur across their words and lives — a practical inheritance for any reader."
            align="center"
          />
          <div className="value-cards">
            {values.map((value, index) => (
              <Reveal className="value-card" key={value.english} delay={index * 0.04}>
                <span className="value-card__arabic arabic" dir="rtl" lang="ar">{value.arabic}</span>
                <h3>{value.english}</h3>
                <p>{value.note}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="values-cta">
            <p>Continue into the lives that carried these virtues.</p>
            <div>
              <Link to="/masoomeen" className="btn btn--gold">
                The 14 Masoomeen <ArrowRight size={16} />
              </Link>
              <Link to="/about" className="btn btn--ghost">
                Our editorial principles
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
