import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Camera, ExternalLink, FileText, Landmark, Type } from 'lucide-react'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import Ornament from '../components/Ornament'
import { imageCredits } from '../data/site'

const contentSources = [
  {
    name: 'Duas.org',
    type: 'Supplication & ziyarat texts',
    text: 'Arabic, transliteration, and English texts for Dua Kumayl, Tawassul, Nudba, Faraj, Ziyarat Ashura, Waritha, Aal-e-Yasin, and Jamia Kabira. Each reader links to the complete source and audio.',
    href: 'https://www.duas.org',
  },
  {
    name: 'Tanzil & AlQuran Cloud',
    type: 'Qur’anic Arabic text',
    text: 'The Uthmani Arabic text used in the Qur’an explorer is sourced through the AlQuran Cloud API from the Tanzil project.',
    href: 'https://tanzil.net',
  },
  {
    name: 'Marmaduke Pickthall',
    type: 'English Qur’an translation',
    text: 'The Meaning of the Glorious Koran (1930), a public-domain English translation, is used for the verse renderings.',
    href: 'https://en.wikipedia.org/wiki/The_Meaning_of_the_Glorious_Koran',
  },
  {
    name: 'Al-Islam.org',
    type: 'Book links & translations',
    text: 'The books library points readers to complete translations and editions hosted by the Ahlul Bayt Digital Islamic Library Project and other publishers.',
    href: 'https://www.al-islam.org',
  },
  {
    name: 'Hadith collections',
    type: 'Prophetic & Imami traditions',
    text: 'Hadith are cited to their collections: Sahih al-Bukhari, Sahih Muslim, Sunan al-Tirmidhi, Nahj al-Balagha, al-Kafi, Bihar al-Anwar, and others as noted on each entry.',
    href: '/hadith',
  },
  {
    name: 'Wikimedia Commons',
    type: 'Photography',
    text: 'All photographs of shrines and context images are used under the licences listed below, with attribution to their authors.',
    href: 'https://commons.wikimedia.org',
  },
]

const typefaces = [
  { name: 'Cormorant Garamond', use: 'Display headings', license: 'SIL Open Font License', href: 'https://fonts.google.com/specimen/Cormorant+Garamond' },
  { name: 'Manrope', use: 'Body text & interface', license: 'SIL Open Font License', href: 'https://fonts.google.com/specimen/Manrope' },
  { name: 'Amiri', use: 'Arabic text', license: 'SIL Open Font License', href: 'https://fonts.google.com/specimen/Amiri' },
  { name: 'Noto Nastaliq Urdu', use: 'Urdu text', license: 'SIL Open Font License', href: 'https://fonts.google.com/noto/specimen/Noto+Nastaliq+Urdu' },
  { name: 'Reem Kufi', use: 'Arabic display accents', license: 'SIL Open Font License', href: 'https://fonts.google.com/specimen/Reem+Kufi' },
]

export default function Credits() {
  return (
    <>
      <Seo
        title="Image Credits"
        description="Photography, typography, and content source credits for HUSSAINI, with licence links for every image used on the site."
      />

      <PageHero
        eyebrow="Credits & licences"
        arabic="شُكْرٌ وَتَقْدِير"
        title="Everything here"
        titleAccent="was made by someone."
        intro="This site stands on the work of photographers, translators, archivists, and communities. The credits below name them and link to the licences under which their work is used."
        breadcrumb={[{ label: 'Image Credits' }]}
        compact
      >
        <Link to="/about#principles" className="btn btn--gold">
          Our editorial principles <ArrowRight size={16} />
        </Link>
      </PageHero>

      <section className="section section--credits-images">
        <div className="container">
          <SectionHeading
            eyebrow="Photography"
            arabic="الصُّوَر"
            title={<>Shrines & <em>context.</em></>}
            intro="Photographs are used to evoke place, never as a claim of certainty where historical reports differ. Each image retains its original licence."
          />
          <div className="credits-grid">
            {imageCredits.map((credit, index) => (
              <Reveal className="credit-card" key={credit.file} delay={(index % 3) * 0.04}>
                <div className="credit-card__image">
                  <img src={`/images/${credit.file}`} alt={credit.note} loading="lazy" />
                </div>
                <div className="credit-card__body">
                  <span className="credit-card__file">{credit.file}</span>
                  <h3>{credit.title}</h3>
                  <p className="credit-card__author">by {credit.author}</p>
                  <p className="credit-card__note">{credit.note}</p>
                  <div className="credit-card__links">
                    <a href={credit.licenseUrl} target="_blank" rel="noreferrer">
                      {credit.license} <ExternalLink size={12} />
                    </a>
                    <a href={credit.source} target="_blank" rel="noreferrer">
                      Source <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="credits-disclaimer">
            <Camera size={15} />
            If you are a rights holder and believe an image has been credited incorrectly, please
            contact us so the record can be corrected promptly.
          </p>
        </div>
      </section>

      <section className="section section--content-sources">
        <div className="container">
          <SectionHeading
            eyebrow="Texts & scholarship"
            arabic="الْمَصَادِر"
            title={<>Sources behind <em>the words.</em></>}
            intro="The site links to complete texts wherever possible. Where a work is excerpted, the reader is told, and the source remains one click away."
            align="center"
          />
          <div className="source-grid">
            {contentSources.map((source, index) => {
              const external = source.href.startsWith('http')
              return (
                <Reveal className="source-card" key={source.name} delay={(index % 3) * 0.04}>
                  <span className="source-card__icon">
                    {source.type.includes('Photograph') ? <Camera size={18} /> : source.type.includes('Text') || source.type.includes('translation') ? <FileText size={18} /> : <Landmark size={18} />}
                  </span>
                  <span className="source-card__type">{source.type}</span>
                  <h3>{source.name}</h3>
                  <p>{source.text}</p>
                  {external ? (
                    <a href={source.href} target="_blank" rel="noreferrer" className="text-link">
                      Visit source <ExternalLink size={13} />
                    </a>
                  ) : (
                    <Link to={source.href} className="text-link">View on HUSSAINI <ArrowUpRight size={13} /></Link>
                  )}
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section section--typography">
        <div className="container typography">
          <div className="typography__intro">
            <SectionHeading
              eyebrow="Typography"
              arabic="الْخَط"
              title={<>Letters that <em>carry the voice.</em></>}
              intro="The typefaces were chosen for legibility, dignity, and the needs of Arabic and Urdu readers. All are bundled locally and served under open licences."
            />
            <Ornament />
            <div className="typography__sample arabic" dir="rtl" lang="ar">
              وَقُل رَّبِّ زِدْنِي عِلْمًا
            </div>
            <div className="typography__sample typography__sample--urdu urdu" dir="rtl" lang="ur">
              یا حسین
            </div>
          </div>
          <div className="typography__list">
            {typefaces.map((font) => (
              <div className="typeface" key={font.name}>
                <Type size={15} />
                <div>
                  <strong>{font.name}</strong>
                  <span>{font.use}</span>
                </div>
                <a href={font.href} target="_blank" rel="noreferrer">{font.license} <ExternalLink size={11} /></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--license-note">
        <div className="container license-note">
          <div>
            <span className="eyebrow">Reuse</span>
            <h2 className="display">Use with <em>attribution.</em></h2>
            <p>
              Original writing and design may be shared for personal and educational use with a
              link to HUSSAINI. Photographs remain under their stated licences; some require
              share-alike or attribution to the original author. When in doubt, follow the licence
              linked on each credit.
            </p>
          </div>
          <Link to="/contact" className="btn btn--gold">Ask about reuse <ArrowRight size={16} /></Link>
        </div>
      </section>
    </>
  )
}
