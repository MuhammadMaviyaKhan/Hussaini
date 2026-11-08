// ─────────────────────────────────────────────────────────────
// HUSSAINI · Islamic Books Library
// Titles, authors and descriptions are drawn from established
// works of the Shia intellectual tradition.
// ─────────────────────────────────────────────────────────────

export const bookCategories = [
  'All',
  'Hadith & Wisdom',
  'Supplication',
  'History',
  'Theology',
  'Tafsir',
]

export const books = [
  {
    slug: 'nahj-al-balagha',
    title: 'Nahj al-Balagha',
    arabic: 'نَهْجُ الْبَلَاغَة',
    author: 'Sharif al-Radi',
    era: '10th century CE',
    category: 'Hadith & Wisdom',
    description:
      'The celebrated collection of sermons, letters, and maxims of Imam Ali, gathered by Sharif al-Radi. A masterpiece of Arabic eloquence and a manual of justice, piety, and governance.',
    link: 'https://www.al-islam.org/nahjul-balagha-part-1-sermons',
    note: 'Sermons · Letters · Wisdom',
  },
  {
    slug: 'al-kafi',
    title: 'Al-Kafi',
    arabic: 'الْكَافِي',
    author: 'Shaykh al-Kulayni',
    era: '10th century CE',
    category: 'Hadith & Wisdom',
    description:
      'One of the four foundational collections of Shia hadith. Its eight volumes gather traditions on belief, law, ethics, and the life of the community.',
    link: 'https://www.al-islam.org/al-kafi-vol-1',
    note: 'Hadith · Eight volumes',
  },
  {
    slug: 'sahifa-sajjadiyya',
    title: 'Sahifa Sajjadiyya',
    arabic: 'الصَّحِيفَةُ السَّجَّادِيَّة',
    author: 'Imam Ali Zayn al-Abidin (a)',
    era: '7th–8th century CE',
    category: 'Supplication',
    description:
      'The “Psalms of the Household of the Prophet.” A collection of luminous supplications on forgiveness, gratitude, family, illness, and the ethics of power.',
    link: 'https://www.al-islam.org/sahifa-al-sajjadiyya',
    note: 'Supplication · 54 prayers',
  },
  {
    slug: 'mafatih-al-jinan',
    title: 'Mafatih al-Jinan',
    arabic: 'مَفَاتِيحُ الْجِنَان',
    author: 'Shaykh Abbas Qummi',
    era: '20th century CE',
    category: 'Supplication',
    description:
      'The most widely used devotional manual in the Shia world. It gathers supplications, ziyarat, and acts of worship for every month, season, and occasion.',
    link: 'https://www.duas.org/mafatih.htm',
    note: 'Devotional manual',
  },
  {
    slug: 'kitab-al-irshad',
    title: 'Kitab al-Irshad',
    arabic: 'كِتَابُ الْإِرْشَاد',
    author: 'Shaykh al-Mufid',
    era: '11th century CE',
    category: 'History',
    description:
      'A foundational account of the lives of the Twelve Imams. Shaykh al-Mufid combines historical narration with theological reflection on the Imamate.',
    link: 'https://www.al-islam.org/kitab-al-irshad-shaykh-al-mufid',
    note: 'Biography · The Twelve Imams',
  },
  {
    slug: 'man-la-yahduruhu-al-faqih',
    title: 'Man La Yahduruhu al-Faqih',
    arabic: 'مَنْ لَا يَحْضُرُهُ الْفَقِيه',
    author: 'Shaykh al-Saduq',
    era: '10th century CE',
    category: 'Hadith & Wisdom',
    description:
      'One of the four major Shia hadith collections, written as a practical legal and ethical reference for the believer. It is the source of the Jamia Kabira visitation.',
    link: 'https://www.al-islam.org/man-la-yahduruhu-al-faqih',
    note: 'Law · Hadith',
  },
  {
    slug: 'bihar-al-anwar',
    title: 'Bihar al-Anwar',
    arabic: 'بِحَارُ الْأَنْوَار',
    author: 'Allama Muhammad Baqir al-Majlisi',
    era: '17th century CE',
    category: 'History',
    description:
      'A vast encyclopaedia of Shia tradition, covering the prophets, the Ahlulbayt, theology, ethics, history, and the unseen. Its hundred-plus volumes are a landmark of compilation.',
    link: 'https://www.al-islam.org/bihar-al-anwar',
    note: 'Encyclopaedia · 110 volumes',
  },
  {
    slug: 'al-mizan',
    title: 'Al-Mizan fi Tafsir al-Qur’an',
    arabic: 'الْمِيزَانُ فِي تَفْسِيرِ الْقُرْآن',
    author: 'Allama Muhammad Husayn al-Tabataba’i',
    era: '20th century CE',
    category: 'Tafsir',
    description:
      'A monumental Qur’anic commentary known for its method of interpreting the Qur’an by the Qur’an itself. It joins classical scholarship with philosophical and social insight.',
    link: 'https://www.al-islam.org/al-mizan',
    note: 'Tafsir · 20 volumes',
  },
  {
    slug: 'kamil-al-ziyarat',
    title: 'Kamil al-Ziyarat',
    arabic: 'كَامِلُ الزِّيَارَات',
    author: 'Ibn Qulawayh al-Qummi',
    era: '10th century CE',
    category: 'Supplication',
    description:
      'A classical collection of ziyarat and traditions on visitation, including the famous Ziyarat Ashura. It is a key source for the devotional geography of Shia Islam.',
    link: 'https://www.al-islam.org/kamil-al-ziyarat',
    note: 'Ziyarat · Pilgrimage',
  },
  {
    slug: 'shiite-creed',
    title: 'A Shi‘ite Creed',
    arabic: 'الِاعْتِقَادَات',
    author: 'Shaykh al-Saduq',
    era: '10th century CE',
    category: 'Theology',
    description:
      'A concise statement of Imami belief by one of the greatest scholars of Qom. It addresses divine unity, prophethood, the Imamate, and the return.',
    link: 'https://www.al-islam.org/shiite-creed-shaykh-saduq',
    note: 'Theology · Doctrine',
  },
  {
    slug: 'risalat-al-huquq',
    title: 'Risalat al-Huquq',
    arabic: 'رِسَالَةُ الْحُقُوق',
    author: 'Imam Ali Zayn al-Abidin (a)',
    era: '7th–8th century CE',
    category: 'Theology',
    description:
      'A pioneering treatise on rights: the rights of God, the self, parents, children, neighbours, teachers, and the wider community. A foundation of Islamic ethics.',
    link: 'https://www.al-islam.org/risalat-al-huquq-treatise-rights',
    note: 'Ethics · Rights',
  },
  {
    slug: 'the-message',
    title: 'The Message',
    arabic: 'الرِّسَالَة',
    author: 'Ayatullah Ja‘far Subhani',
    era: '20th century CE',
    category: 'History',
    description:
      'A scholarly biography of the Prophet Muhammad that situates his life within the social and spiritual history of Arabia and the wider prophetic tradition.',
    link: 'https://www.al-islam.org/message',
    note: 'Biography · Prophetic history',
  },
]
