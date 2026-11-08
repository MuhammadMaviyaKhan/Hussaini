import fs from 'node:fs'

const selected = [1, 2, 36, 55, 67, 78, 94, 97, 103, 108, 110, 112, 113, 114]
const verses = [
  '2:255',
  '33:33',
  '42:23',
  '5:55',
  '4:59',
  '3:103',
  '24:35',
  '94:5',
  '94:6',
  '2:186',
  '40:60',
  '13:28',
  '49:13',
  '16:90',
]

const metaRes = await fetch('https://api.alquran.cloud/v1/surah')
const meta = (await metaRes.json()).data.map((s) => ({
  number: s.number,
  name: s.name,
  englishName: s.englishName,
  meaning: s.englishNameTranslation,
  revelation: s.revelationType,
  verses: s.numberOfAyahs,
}))

const surahs = []
for (const n of selected) {
  const res = await fetch(
    `https://api.alquran.cloud/v1/surah/${n}/editions/quran-uthmani,en.pickthall`,
  )
  const data = (await res.json()).data
  const [ar, en] = data
  const ayahs = ar.ayahs.map((a, i) => ({
    n: a.numberInSurah,
    arabic: a.text.replace(/^\uFEFF/, '').trim(),
    english: en.ayahs[i].text.trim(),
  }))
  surahs.push({
    number: ar.number,
    name: ar.name,
    englishName: ar.englishName,
    meaning: ar.englishNameTranslation,
    revelation: ar.revelationType,
    verses: ar.numberOfAyahs,
    ayahs,
  })
  console.log('surah', n, ayahs.length)
}

const reflectionVerses = []
for (const ref of verses) {
  const res = await fetch(
    `https://api.alquran.cloud/v1/ayah/${ref}/editions/quran-uthmani,en.pickthall`,
  )
  const data = (await res.json()).data
  const [ar, en] = data
  reflectionVerses.push({
    reference: ref,
    arabic: ar.text.replace(/^\uFEFF/, '').trim(),
    english: en.text.trim(),
    surah: ar.surah.englishName,
    surahNumber: ar.surah.number,
    ayah: ar.numberInSurah,
  })
  console.log('ayah', ref)
}

const banner = `// ─────────────────────────────────────────────────────────────
// HUSSAINI · Qur'an explorer
// Arabic: Tanzil Uthmani text via AlQuran Cloud.
// English: Marmaduke Pickthall, The Meaning of the Glorious Koran
// (1930), a public-domain translation. Local library contains
// fourteen complete surahs; other surahs load from the API.
// ─────────────────────────────────────────────────────────────

`
const body = `export const surahIndex = ${JSON.stringify(meta, null, 2)}

export const localSurahs = ${JSON.stringify(surahs, null, 2)}

export const reflectionVerses = ${JSON.stringify(reflectionVerses, null, 2)}

export const getLocalSurah = (number) =>
  localSurahs.find((surah) => surah.number === Number(number))

export const quranStats = {
  surahs: 114,
  verses: 6236,
  juz: 30,
  translatedBy: 'Marmaduke Pickthall (1930)',
  arabicSource: 'Tanzil Uthmani text via AlQuran Cloud',
}
`

fs.writeFileSync('src/data/quran.js', banner + body, 'utf8')
console.log('wrote quran.js')
