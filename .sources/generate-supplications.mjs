import fs from 'node:fs'
import path from 'node:path'

const dir = path.resolve('.sources')

const definitions = [
  {
    file: 'dua-kumayl',
    slug: 'dua-kumayl',
    type: 'dua',
    title: 'Dua Kumayl',
    arabicTitle: 'دُعَاءُ كُمَيْل',
    subtitle: 'The Supplication of Kumayl',
    attributedTo: 'Imam Ali ibn Abi Talib (a)',
    narrator: 'Kumayl ibn Ziyad al-Nakha‘i',
    occasion: 'The eve of Friday; also monthly or once a year',
    summary:
      'A vast and intimate supplication taught by Imam Ali to his companion Kumayl. It moves from the majesty of the Divine attributes to the confession of the soul, the plea for forgiveness, and the longing to remain near God.',
    source: 'Misbah al-Mutahajjid — Shaykh al-Tusi (d. 460 AH)',
    sourceLabel: 'Full text & audio · Duas.org',
    sourceUrl: 'https://www.duas.org/dua-kumayl.html',
    audio: 'https://mp3.duas.org/kumayl_abdulhay.mp3',
    readingTime: '14 min · selected passages',
    tags: ['Mercy', 'Forgiveness', 'Night'],
    featured: true,
    isExcerpt: true,
    ranges: [
      [0, 14, 'The Mercy That Embraces All Things'],
      [15, 21, 'Forgive the Sins That Withhold Supplication'],
      [22, 28, 'A Prayer for Nearness and Gratitude'],
      [29, 39, 'The Question of One in Utter Need'],
      [50, 55, 'My Trial Is Great, My Actions Are Few'],
      [56, 63, 'Do Not Veil My Supplication'],
      [64, 65, 'Who Is There Besides You?'],
      [73, 80, 'I Have Come to You, Regretful'],
      [81, 86, 'Accept My Excuse; Have Mercy on My Weakness'],
      [114, 122, 'How Could I Bear Separation From You?'],
      [219, 221, 'Make My Tongue Remember You'],
      [227, 235, 'I Have Turned My Face Toward You'],
      [236, 248, 'Your Name Is a Remedy'],
    ],
  },
  {
    file: 'dua-tawassul',
    slug: 'dua-tawassul',
    type: 'dua',
    title: 'Dua Tawassul',
    arabicTitle: 'دُعَاءُ التَّوَسُّل',
    subtitle: 'The Supplication of Seeking Intercession',
    attributedTo: 'Transmitted from the Ahlulbayt; widely attributed to Imam Hasan al-Askari (a)',
    narrator: 'Classical supplication collections',
    occasion: 'Tuesdays, and whenever one seeks nearness through the Ahlulbayt',
    summary:
      'A supplication that turns toward God through the Prophet and his purified Household, asking each of the Fourteen Infallibles to intercede. It is a meditation on love, nearness, and the living bond between the believer and the Ahlulbayt.',
    source: 'Bihar al-Anwar; Mafatih al-Jinan',
    sourceLabel: 'Full text & audio · Duas.org',
    sourceUrl: 'https://www.duas.org/dua-tawassul.html',
    audio: 'https://mp3.duas.org/Misc%20Duas/2_Tawassul.mp3',
    readingTime: '7 min · selected passages',
    tags: ['Intercession', 'Ahlulbayt', 'Nearness'],
    featured: true,
    isExcerpt: true,
    ranges: [
      [0, 11, 'Through the Prophet of Mercy'],
      [12, 21, 'Through Amir al-Mu’minin'],
      [22, 30, 'Through Fatima al-Zahra'],
      [31, 41, 'Through Imam Hasan al-Mujtaba'],
      [42, 52, 'Through Imam Hussain, the Martyr'],
      [141, 151, 'Through the Living Imam'],
      [152, 168, 'A Final Plea of Intercession'],
    ],
  },
  {
    file: 'dua-nudbah',
    slug: 'dua-nudbah',
    type: 'dua',
    title: 'Dua Nudba',
    arabicTitle: 'دُعَاءُ النُّدْبَة',
    subtitle: 'The Supplication of Lamentation',
    attributedTo: 'Narrated through Sayyid ibn Tawus in Iqbal al-A‘mal',
    narrator: 'A Friday supplication of longing for the Imam of the Age',
    occasion: 'Friday mornings and the days of Eid',
    summary:
      'A heartfelt lament for the hidden Imam and a remembrance of the guiding Household. It recalls the favours bestowed upon the prophets and the Ahlulbayt, then gives voice to the ache of waiting for the promised deliverance.',
    source: 'Iqbal al-A‘mal — Sayyid ibn Tawus (d. 664 AH)',
    sourceLabel: 'Full text & audio · Duas.org',
    sourceUrl: 'https://www.duas.org/dua-nudbah.html',
    audio: 'https://mp3.duas.org/Nudba_AbdulHayyQambar.mp3',
    readingTime: '13 min · selected passages',
    tags: ['Longing', 'Imam Mahdi', 'Friday'],
    featured: true,
    isExcerpt: true,
    ranges: [
      [0, 2, 'Praise and Salutation'],
      [3, 21, 'The Chosen Friends of God'],
      [48, 55, 'The Beloved Prophet'],
      [74, 90, 'The Household of Purification'],
      [92, 98, 'The Declaration at Ghadir'],
      [168, 186, 'Let the Weepers Weep'],
      [187, 200, 'Where Is the Remnant of Allah?'],
      [207, 217, 'The Door of Allah, the Blood of Karbala'],
      [218, 224, 'Son of the Chosen Prophet'],
      [257, 266, 'Where Has Farness Taken You?'],
      [272, 293, 'When Will We See You?'],
      [294, 312, 'A Plea to See the Master'],
      [330, 362, 'Establish the Truth Through Him'],
    ],
  },
  {
    file: 'dua-faraj-dua-azumal-bala-imam-mahdi',
    slug: 'dua-faraj',
    type: 'dua',
    title: 'Dua al-Faraj',
    arabicTitle: 'دُعَاءُ الْفَرَج',
    subtitle: 'The Supplication for Relief',
    attributedTo: 'Attributed to Imam Muhammad al-Mahdi (aj)',
    narrator: 'The living Imam of the Age',
    occasion: 'In times of distress; for the reappearance of the Imam',
    summary:
      'A short, urgent cry for relief when calamity presses and the horizon seems closed. The supplicant calls upon God through the Household of the Prophet and turns toward the Master of the Age for deliverance.',
    source: 'Sahifa Mahdiya; Duas.org',
    sourceLabel: 'Full text & audio · Duas.org',
    sourceUrl: 'https://www.duas.org/dua-faraj-dua-azumal-bala-imam-mahdi.html',
    audio: '',
    readingTime: '3 min · complete in this edition',
    tags: ['Relief', 'Distress', 'Imam Mahdi'],
    featured: true,
    isExcerpt: false,
    ranges: [
      [0, 4, 'When the Calamity Grows Great'],
      [5, 7, 'Through the Possessors of Authority'],
      [8, 10, 'O Muhammad, O Ali'],
      [11, 13, 'Help, Rescue, This Moment'],
    ],
  },
  {
    file: 'ziyarat-imam-hussain-ashura',
    slug: 'ziyarat-ashura',
    type: 'ziyarat',
    title: 'Ziyarat Ashura',
    arabicTitle: 'زِيَارَةُ عَاشُورَاء',
    subtitle: 'The Visitation of Imam Hussain on Ashura',
    attributedTo: 'Imam Muhammad al-Baqir (a), taught to Safwan al-Jammal',
    narrator: 'Safwan al-Jammal',
    occasion: 'The day of Ashura; daily; forty days for a particular need',
    summary:
      'The most celebrated visitation of Imam Hussain. It opens with salutations to the martyr of Karbala, declares loyalty to him and repudiation of his oppressors, and asks God for nearness, steadfastness, and the intercession of the Imam.',
    source: 'Kamil al-Ziyarat; Misbah al-Mutahajjid; Mafatih al-Jinan',
    sourceLabel: 'Full text & audio · Duas.org',
    sourceUrl: 'https://www.duas.org/ziyarat-imam-hussain-ashura.html',
    audio: 'https://mp3.duas.org/ziyarat-ashura-imam-hussain.mp3',
    readingTime: '12 min · selected passages',
    tags: ['Ashura', 'Karbala', 'Loyalty'],
    featured: true,
    isExcerpt: true,
    ranges: [
      [1, 7, 'Salutations Upon the Son of the Messenger'],
      [8, 11, 'Peace Upon the Souls in Your Courtyard'],
      [12, 17, 'A Calamity That Filled the Heavens'],
      [18, 26, 'Repudiation of the Foundations of Oppression'],
      [27, 31, 'Peace With Those at Peace With You'],
      [36, 44, 'May My Father and Mother Be Ransomed for You'],
      [45, 52, 'Nearness Through Loyalty and Repudiation'],
      [61, 70, 'A Firm Step of Truth'],
      [84, 86, 'A Life and Death Like Muhammad’s Household'],
      [87, 99, 'The Day the Umayyads Rejoiced'],
      [100, 113, 'The Foremost Oppressor and His Followers'],
      [114, 119, 'A Farewell That Is Not the Last'],
      [133, 139, 'Praise in Misfortune and the Intercession of Hussain'],
    ],
  },
  {
    file: 'ziyarat-waritha-imam-husain',
    slug: 'ziyarat-waritha',
    type: 'ziyarat',
    title: 'Ziyarat Waritha',
    arabicTitle: 'زِيَارَةُ وَارِث',
    subtitle: 'The Visitation of the Inheritor',
    attributedTo: 'Transmitted in the classical ziyarat collections',
    narrator: 'A visitation of Imam Hussain (a)',
    occasion: 'Thursday night and Friday; any time of visitation',
    summary:
      'A visitation that names Imam Hussain as the inheritor of the prophets, the light carried through purified generations, and the Imam of guidance. It joins testimony, loyalty, and a plea to be gathered with him in this world and the next.',
    source: 'Mafatih al-Jinan; Kamil al-Ziyarat',
    sourceLabel: 'Full text & audio · Duas.org',
    sourceUrl: 'https://www.duas.org/ziyarat-waritha-imam-husain.html',
    audio: 'https://mp3.duas.org/ziyarat/ziarat-warisa.mp3',
    readingTime: '6 min · complete in this edition',
    tags: ['Imam Hussain', 'Inheritance', 'Visitation'],
    featured: true,
    isExcerpt: false,
    ranges: [
      [0, 6, 'Inheritor of the Prophets'],
      [7, 10, 'Son of Muhammad, Ali, Fatima and Khadija'],
      [11, 20, 'The Vengeance of Allah and the Killer’s Curse'],
      [21, 30, 'Light in Loins and Purified Wombs'],
      [31, 40, 'The Imams of Your Progeny and the Return'],
      [41, 58, 'At Your Shrine, Asking to Remain With You'],
    ],
  },
  {
    file: 'ziyarat-aal-e-yasin',
    slug: 'ziyarat-aal-e-yasin',
    type: 'ziyarat',
    title: 'Ziyarat Aal-e-Yasin',
    arabicTitle: 'زِيَارَةُ آلِ يَاسِين',
    subtitle: 'The Visitation of the Household of Yasin',
    attributedTo: 'A visitation of Imam al-Mahdi (aj), transmitted in the classical collections',
    narrator: 'The Household of Yasin',
    occasion: 'Fridays and any time of remembrance',
    summary:
      'A luminous visitation addressed to the Imam of the Age. It salutes him as the caller to God, the door of Allah, the argument of Allah, and the promised one, and affirms faith in the Imams, the return, and the final reckoning.',
    source: 'Mafatih al-Jinan; Bihar al-Anwar',
    sourceLabel: 'Full text & audio · Duas.org',
    sourceUrl: 'https://www.duas.org/ziyarat-aal-e-yasin.html',
    audio: 'https://mp3.duas.org/Ziyarat-Ale-Yasin.mp3',
    readingTime: '7 min · complete in this edition',
    tags: ['Imam Mahdi', 'Friday', 'Allegiance'],
    featured: false,
    isExcerpt: false,
    ranges: [
      [0, 6, 'Peace Upon the Household of Yasin'],
      [7, 13, 'The Covenant, the Promise, the Pennon'],
      [14, 23, 'Peace at Every Hour'],
      [24, 31, 'The Entrusted Imam and the Testimony'],
      [32, 44, 'Witness to the Imams'],
      [45, 51, 'The First and the Last; the Return'],
      [52, 60, 'The Resurrection and the Balance'],
      [61, 69, 'The Truth You Accept, the Wrong You Reject'],
      [70, 76, 'A Soul That Believes, a Love That Is Sincere'],
    ],
  },
  {
    file: 'ziyarat-jamia-kabeera',
    slug: 'ziyarat-jamia-kabira',
    type: 'ziyarat',
    title: 'Ziyarat Jamia Kabira',
    arabicTitle: 'الزِّيَارَةُ الْجَامِعَةُ الْكَبِيرَة',
    subtitle: 'The Major Comprehensive Visitation',
    attributedTo: 'Taught by Imam Ali al-Hadi (a)',
    narrator: 'A visitation for all the Imams',
    occasion: 'Visiting any of the Imams; especially at their shrines',
    summary:
      'The most sublime comprehensive visitation of the Ahlulbayt. It gathers the doctrines of divine unity, prophethood, Imamate, infallibility, and obedience into a single act of witness, and ends with a plea for intercession.',
    source: 'Man la yahduruhu al-Faqih, vol. 2, ch. 159 — Shaykh al-Saduq',
    sourceLabel: 'Full text & audio · Duas.org',
    sourceUrl: 'https://www.duas.org/ziyarat-jamia-kabeera.html',
    audio: 'https://mp3.duas.org/ziyarah%20jamia%20-%20hojarat.mp3',
    readingTime: '13 min · selected passages',
    tags: ['Imamate', 'Doctrine', 'Visitation'],
    featured: true,
    isExcerpt: true,
    ranges: [
      [0, 19, 'Household of Prophethood'],
      [20, 31, 'The Imams of Guidance'],
      [32, 50, 'Bearers of the Book, Honoured Servants'],
      [62, 73, 'The Witness of Divine Unity and Prophethood'],
      [74, 90, 'Infallible, Chosen, Purified'],
      [101, 120, 'Preserved from Error, Devoted to God'],
      [362, 380, 'Through You We Were Brought Out of Humiliation'],
      [389, 401, 'Intercession and the Obedience of the Imams'],
      [402, 411, 'The Closing Plea'],
    ],
  },
]

async function translate(text) {
  const url =
    'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ur&dt=t&q=' +
    encodeURIComponent(text)
  const res = await fetch(url)
  if (!res.ok) throw new Error('translate failed ' + res.status)
  const data = await res.json()
  return data[0].map((part) => part[0]).join('').trim()
}

function joinSegments(segments, from, to, key) {
  return segments
    .slice(from, to + 1)
    .map((s) => s[key] || '')
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .replace(/ <b>.*?<\/b>/g, '')
    .trim()
}

const out = []

for (const def of definitions) {
  const source = JSON.parse(fs.readFileSync(path.join(dir, def.file + '.json'), 'utf8'))
  const segments = source.duas[0].segments || []
  const passages = []
  for (const [from, to, label] of def.ranges) {
    const english = joinSegments(segments, from, to, 'translation')
    // Skip API artefacts such as "undefined"
    const cleanEnglish = english
      .replace(/\bundefined\b/g, '')
      .replace(/\s+/g, ' ')
      .trim()
    const arabic = joinSegments(segments, from, to, 'arabic')
    const transliteration = joinSegments(segments, from, to, 'transliteration')
    process.stdout.write(`  translating ${def.slug} ${from}-${to}... `)
    let urdu = ''
    try {
      urdu = await translate(cleanEnglish)
    } catch (err) {
      console.error('FAILED', err.message)
    }
    console.log('ok')
    passages.push({ label, arabic, transliteration, english: cleanEnglish, urdu })
  }
  const { file: _file, ranges: _ranges, ...meta } = def
  out.push({ ...meta, passages })
}

const header = `// ─────────────────────────────────────────────────────────────
// HUSSAINI · Supplication & Ziyarat reader content
//
// Arabic, transliteration and English are reproduced from the
// Duas.org open supplication archive (data_v2). Each entry links
// to its full source and audio. Urdu renderings are prepared for
// this edition from the English translation. Passages marked as
// excerpts are a curated reading edition, not the complete text.
// ─────────────────────────────────────────────────────────────

`
const body = `export const supplications = ${JSON.stringify(out, null, 2)}

export const duas = supplications.filter((item) => item.type === 'dua')
export const ziyarat = supplications.filter((item) => item.type === 'ziyarat')
export const featuredSupplications = supplications.filter((item) => item.featured)

export const getSupplication = (slug) =>
  supplications.find((item) => item.slug === slug)

export const getAdjacentSupplication = (slug) => {
  const index = supplications.findIndex((item) => item.slug === slug)
  if (index < 0) return { previous: null, next: null }
  return {
    previous: index > 0 ? supplications[index - 1] : null,
    next: index < supplications.length - 1 ? supplications[index + 1] : null,
  }
}
`

fs.mkdirSync('src/data', { recursive: true })
fs.writeFileSync('src/data/supplications.js', header + body, 'utf8')
console.log(`\nWrote ${out.length} supplications with ${out.reduce((n, x) => n + x.passages.length, 0)} passages.`)
