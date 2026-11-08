// ─────────────────────────────────────────────────────────────
// HUSSAINI · Hadith collection
// Arabic texts and references are drawn from established
// collections. Translations are rendered for this edition.
// ─────────────────────────────────────────────────────────────

export const hadithCategories = [
  'All',
  'Faith',
  'Knowledge',
  'Character',
  'Justice',
  'Family',
  'Prayer',
  'Service',
]

export const hadiths = [
  {
    id: 'intentions',
    figure: 'Prophet Muhammad ﷺ',
    category: 'Faith',
    arabic: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى.',
    english:
      'Actions are judged by intentions, and every person will have only what they intended.',
    source: 'Sahih al-Bukhari; Sahih Muslim',
    context: 'The opening hadith of many collections of prophetic tradition.',
  },
  {
    id: 'best-to-family',
    figure: 'Prophet Muhammad ﷺ',
    category: 'Family',
    arabic: 'خَيْرُكُمْ خَيْرُكُمْ لِأَهْلِهِ، وَأَنَا خَيْرُكُمْ لِأَهْلِي.',
    english:
      'The best of you are those who are best to their families, and I am the best of you to my family.',
    source: 'Sunan al-Tirmidhi',
    context: 'On the moral measure of a person at home.',
  },
  {
    id: 'thaqalayn',
    figure: 'Prophet Muhammad ﷺ',
    category: 'Faith',
    arabic:
      'إِنِّي تَارِكٌ فِيكُمُ الثَّقَلَيْنِ: كِتَابَ اللَّهِ وَعِتْرَتِي أَهْلَ بَيْتِي، مَا إِنْ تَمَسَّكْتُمْ بِهِمَا لَنْ تَضِلُّوا بَعْدِي.',
    english:
      'I leave among you two weighty things: the Book of Allah and my progeny, my family. If you hold fast to them, you will never go astray after me.',
    source: 'Sahih Muslim, Kitab al-Fada’il; Musnad Ahmad',
    context: 'The Prophet’s counsel concerning the Qur’an and the Ahlulbayt.',
  },
  {
    id: 'love-for-brother',
    figure: 'Prophet Muhammad ﷺ',
    category: 'Character',
    arabic: 'لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ.',
    english:
      'None of you truly believes until he loves for his brother what he loves for himself.',
    source: 'Sahih al-Bukhari; Sahih Muslim',
    context: 'A foundation of Islamic ethics and social responsibility.',
  },
  {
    id: 'beauty',
    figure: 'Prophet Muhammad ﷺ',
    category: 'Character',
    arabic: 'إِنَّ اللَّهَ جَمِيلٌ يُحِبُّ الْجَمَالَ.',
    english: 'Indeed Allah is beautiful and loves beauty.',
    source: 'Sahih Muslim',
    context: 'On beauty, dignity, and the aesthetics of faith.',
  },
  {
    id: 'anger',
    figure: 'Prophet Muhammad ﷺ',
    category: 'Character',
    arabic:
      'لَيْسَ الشَّدِيدُ بِالصُّرَعَةِ، إِنَّمَا الشَّدِيدُ الَّذِي يَمْلِكُ نَفْسَهُ عِنْدَ الْغَضَبِ.',
    english:
      'The strong one is not the one who overcomes people by force; the strong one is the one who controls himself when angry.',
    source: 'Sahih al-Bukhari; Sahih Muslim',
    context: 'On self-mastery as the highest strength.',
  },
  {
    id: 'value-of-person',
    figure: 'Imam Ali (a)',
    category: 'Knowledge',
    arabic: 'قِيمَةُ كُلِّ امْرِئٍ مَا يَعْلَمُ.',
    english: 'The value of every person is what they know.',
    source: 'Nahj al-Balagha, wisdom of Imam Ali',
    context: 'A concise statement on knowledge and human worth.',
  },
  {
    id: 'not-a-slave',
    figure: 'Imam Ali (a)',
    category: 'Justice',
    arabic: 'وَلَا تَكُنْ عَبْدَ غَيْرِكَ وَقَدْ جَعَلَكَ اللَّهُ حُرًّا.',
    english:
      'Do not be a slave to anyone other than God, for He has made you free.',
    source: 'Nahj al-Balagha, Letter 31',
    context: 'From the Imam’s counsel to his son Hasan.',
  },
  {
    id: 'two-kinds',
    figure: 'Imam Ali (a)',
    category: 'Justice',
    arabic:
      'النَّاسُ صِنْفَانِ: إِمَّا أَخٌ لَكَ فِي الدِّينِ، أَوْ نَظِيرٌ لَكَ فِي الْخَلْقِ.',
    english:
      'People are of two kinds: either a brother to you in religion, or your equal in creation.',
    source: 'Nahj al-Balagha, Letter 53',
    context: 'From the covenant of governance given to Malik al-Ashtar.',
  },
  {
    id: 'faith-purifies',
    figure: 'Fatima al-Zahra (a)',
    category: 'Faith',
    arabic:
      'جَعَلَ اللَّهُ الْإِيمَانَ تَطْهِيرًا لَكُمْ مِنَ الشِّرْكِ، وَالصَّلَاةَ تَنْزِيهًا لَكُمْ عَنِ الْكِبْرِ.',
    english:
      'Allah has made faith a purification for you from polytheism, and prayer a safeguard against arrogance.',
    source: 'The Sermon of Fadak · al-Ihtijaj',
    context: 'From the Lady Fatima’s address after the Prophet’s passing.',
  },
  {
    id: 'ridha-of-allah',
    figure: 'Imam Hussain (a)',
    category: 'Faith',
    arabic:
      'مَنْ طَلَبَ رِضَا اللَّهِ بِسَخَطِ النَّاسِ كَفَاهُ اللَّهُ أَمْرَ النَّاسِ.',
    english:
      'Whoever seeks the pleasure of Allah by displeasing people, Allah will suffice him in the affairs of people.',
    source: 'Bihar al-Anwar',
    context: 'On sincerity and trust in God over public approval.',
  },
  {
    id: 'right-of-mother',
    figure: 'Imam Ali Zayn al-Abidin (a)',
    category: 'Family',
    arabic:
      'أَمَّا حَقُّ أُمِّكَ فَأَنْ تَعْلَمَ أَنَّهَا حَمَلَتْكَ حَيْثُ لَا يَحْمِلُ أَحَدٌ أَحَدًا، وَأَطْعَمَتْكَ مِنْ ثَمَرَةِ قَلْبِهَا.',
    english:
      'As for the right of your mother: know that she carried you as no one carries anyone, and fed you from the fruit of her heart.',
    source: 'Risalat al-Huquq · Imam Zayn al-Abidin',
    context: 'From the earliest systematic treatise on rights.',
  },
  {
    id: 'ornaments',
    figure: 'Imam Ja‘far al-Sadiq (a)',
    category: 'Character',
    arabic: 'كُونُوا لَنَا زَيْنًا وَلَا تَكُونُوا عَلَيْنَا شَيْنًا.',
    english: 'Be an ornament for us, and do not be a blemish upon us.',
    source: 'al-Kafi',
    context: 'The believer’s conduct as a reflection of the school.',
  },
  {
    id: 'gratitude',
    figure: 'Imam Ali al-Rida (a)',
    category: 'Service',
    arabic: 'مَنْ لَمْ يَشْكُرِ الْمُحْسِنَ مِنَ النَّاسِ لَمْ يَشْكُرِ اللَّهَ.',
    english:
      'Whoever does not thank the person who does good to them has not thanked Allah.',
    source: 'Bihar al-Anwar',
    context: 'On gratitude as a spiritual and social duty.',
  },
  {
    id: 'refer-to-narrators',
    figure: 'Imam Muhammad al-Mahdi (aj)',
    category: 'Knowledge',
    arabic:
      'وَأَمَّا الْحَوَادِثُ الْوَاقِعَةُ فَارْجِعُوا فِيهَا إِلَى رُوَاةِ حَدِيثِنَا، فَإِنَّهُمْ حُجَّتِي عَلَيْكُمْ، وَأَنَا حُجَّةُ اللَّهِ عَلَيْهِمْ.',
    english:
      'As for the events that will occur, refer to the narrators of our traditions, for they are my proof upon you, and I am the proof of Allah upon them.',
    source: 'Kamal al-Din wa Tamam al-Ni‘mah',
    context: 'The Imam’s guidance during the occultation.',
  },
]

export const hadithFigures = ['All', ...new Set(hadiths.map((item) => item.figure))]
