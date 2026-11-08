// ─────────────────────────────────────────────────────────────
// HUSSAINI · Prayer, wudu and tasbeeh guides
// Presented according to the Ja‘fari school. Minor details of
// practice may vary; follow the guidance of your marja‘.
// ─────────────────────────────────────────────────────────────

export const dailyPrayers = [
  {
    name: 'Fajr',
    arabic: 'الْفَجْر',
    time: 'From true dawn until sunrise',
    rakats: 2,
    note: 'Two rak‘ahs, offered before sunrise.',
    icon: 'dawn',
  },
  {
    name: 'Dhuhr',
    arabic: 'الظُّهْر',
    time: 'After the sun passes its zenith',
    rakats: 4,
    note: 'Four rak‘ahs, after midday.',
    icon: 'sun',
  },
  {
    name: 'Asr',
    arabic: 'الْعَصْر',
    time: 'After Dhuhr until sunset',
    rakats: 4,
    note: 'Four rak‘ahs, in the afternoon.',
    icon: 'afternoon',
  },
  {
    name: 'Maghrib',
    arabic: 'الْمَغْرِب',
    time: 'After sunset',
    rakats: 3,
    note: 'Three rak‘ahs, after the sun sets.',
    icon: 'sunset',
  },
  {
    name: 'Isha',
    arabic: 'الْعِشَاء',
    time: 'After Maghrib until midnight',
    rakats: 4,
    note: 'Four rak‘ahs, in the night.',
    icon: 'night',
  },
]

export const prayerSteps = [
  {
    number: '01',
    title: 'Purification',
    arabic: 'الطَّهَارَة',
    text: 'Begin with a valid wudu or ghusl, clean clothes, and a clean place of prayer. Face the qibla, the direction of the Kaaba in Mecca.',
    detail: 'The body, clothing, and place of prostration must be free from ritual impurity.',
  },
  {
    number: '02',
    title: 'Adhan and Iqamah',
    arabic: 'الْأَذَانُ وَالْإِقَامَة',
    text: 'The call to prayer and the immediate call before beginning are recommended. They orient the heart toward worship and announce the prayer.',
    detail: 'The Shia adhan includes the phrase “Hayya ‘ala khayr al-‘amal” — come to the best of deeds.',
  },
  {
    number: '03',
    title: 'Intention and Takbir',
    arabic: 'النِّيَّةُ وَالتَّكْبِير',
    text: 'Make the intention in your heart to pray this prayer for the sake of Allah. Raise both hands and say “Allahu Akbar.”',
    detail: 'The intention does not need to be spoken aloud; the conscious orientation of the heart is sufficient.',
  },
  {
    number: '04',
    title: 'Standing and Fatiha',
    arabic: 'الْقِيَامُ وَالْفَاتِحَة',
    text: 'Stand facing the qibla and recite Surah al-Fatiha, followed by another surah in the first two rak‘ahs.',
    detail: 'Recite slowly and with presence. The Fatiha is the opening of the Book and the heart of every prayer.',
  },
  {
    number: '05',
    title: 'Ruku‘',
    arabic: 'الرُّكُوع',
    text: 'Bow with the palms on the knees and the back level. Glorify Allah: “Subhana Rabbi al-‘Azimi wa bi-hamdih.”',
    detail: 'Rise upright, then move to prostration.',
  },
  {
    number: '06',
    title: 'Sujud',
    arabic: 'السُّجُود',
    text: 'Prostrate on earth, stone, or a clean natural surface. Glorify Allah: “Subhana Rabbi al-A‘la wa bi-hamdih.”',
    detail: 'The forehead, palms, knees, and toes touch the ground. Two prostrations are offered in each rak‘ah.',
  },
  {
    number: '07',
    title: 'Qunut',
    arabic: 'الْقُنُوت',
    text: 'In the second rak‘ah, before the ruku‘, raise the hands in supplication. Recite a du‘a, salawat, or Qur’anic verse.',
    detail: 'Qunut is recommended, not obligatory. A simple supplication from the heart is sufficient.',
  },
  {
    number: '08',
    title: 'Tashahhud',
    arabic: 'التَّشَهُّد',
    text: 'After the two prostrations of the second and final rak‘ah, sit and recite the testimony of faith and the salawat.',
    detail: 'The testimony affirms the oneness of God and the messengership of Muhammad, and invokes blessings on his family.',
  },
  {
    number: '09',
    title: 'Salam',
    arabic: 'السَّلَام',
    text: 'Complete the prayer with the words of peace: “Assalamu ‘alaykum wa rahmatullahi wa barakatuh.”',
    detail: 'After the salam, remain seated for a moment of silent remembrance and supplication.',
  },
]

export const prayerTexts = [
  {
    title: 'Opening Takbir',
    arabic: 'اللَّهُ أَكْبَرُ',
    transliteration: 'Allahu Akbar',
    english: 'Allah is the Greatest.',
  },
  {
    title: 'Surah al-Fatiha',
    arabic:
      'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَٰنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ ۝ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
    transliteration:
      'Bismillahi al-Rahmani al-Rahim. Al-hamdu lillahi Rabbi al-‘alamin. Al-Rahmani al-Rahim. Maliki yawmi al-din. Iyyaka na‘budu wa iyyaka nasta‘in. Ihdina al-sirata al-mustaqim. Sirata alladhina an‘amta ‘alayhim ghayri al-maghdubi ‘alayhim wa la al-dallin.',
    english:
      'In the name of Allah, the Most Merciful, the Most Compassionate. All praise is due to Allah, Lord of the worlds, the Most Merciful, the Most Compassionate, Master of the Day of Judgment. You alone we worship, and You alone we ask for help. Guide us to the straight path, the path of those upon whom You have bestowed favour, not of those who have earned Your anger, nor of those who have gone astray.',
  },
  {
    title: 'Ruku‘',
    arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ وَبِحَمْدِهِ',
    transliteration: 'Subhana Rabbi al-‘Azimi wa bi-hamdih',
    english: 'Glory be to my Lord, the Magnificent, and praise be to Him.',
  },
  {
    title: 'Sujud',
    arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَى وَبِحَمْدِهِ',
    transliteration: 'Subhana Rabbi al-A‘la wa bi-hamdih',
    english: 'Glory be to my Lord, the Most High, and praise be to Him.',
  },
  {
    title: 'Tashahhud',
    arabic:
      'الْحَمْدُ لِلَّهِ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ. اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَآلِ مُحَمَّدٍ.',
    transliteration:
      'Al-hamdu lillah. Ashhadu an la ilaha illa Allahu wahdahu la sharika lah, wa ashhadu anna Muhammadan ‘abduhu wa rasuluh. Allahumma salli ‘ala Muhammadin wa ali Muhammad.',
    english:
      'All praise is due to Allah. I bear witness that there is no god but Allah, One without partner, and I bear witness that Muhammad is His servant and messenger. O Allah, send blessings upon Muhammad and the family of Muhammad.',
  },
  {
    title: 'Qunut',
    arabic:
      'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ. اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَآلِ مُحَمَّدٍ.',
    transliteration:
      'Rabbana atina fi al-dunya hasanatan wa fi al-akhirati hasanatan wa qina ‘adhaba al-nar. Allahumma salli ‘ala Muhammadin wa ali Muhammad.',
    english:
      'Our Lord, grant us good in this world and good in the Hereafter, and protect us from the punishment of the Fire. O Allah, send blessings upon Muhammad and the family of Muhammad.',
  },
  {
    title: 'Closing Salam',
    arabic: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ',
    transliteration: 'Assalamu ‘alaykum wa rahmatullahi wa barakatuh',
    english: 'Peace be upon you, and the mercy of Allah, and His blessings.',
  },
]

export const adhanText = [
  { arabic: 'اللَّهُ أَكْبَرُ', english: 'Allah is the Greatest.', repeat: 4 },
  { arabic: 'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ', english: 'I bear witness that there is no god but Allah.', repeat: 2 },
  { arabic: 'أَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ', english: 'I bear witness that Muhammad is the Messenger of Allah.', repeat: 2 },
  { arabic: 'حَيَّ عَلَى الصَّلَاةِ', english: 'Come to prayer.', repeat: 2 },
  { arabic: 'حَيَّ عَلَى الْفَلَاحِ', english: 'Come to success.', repeat: 2 },
  { arabic: 'حَيَّ عَلَى خَيْرِ الْعَمَلِ', english: 'Come to the best of deeds.', repeat: 2 },
  { arabic: 'اللَّهُ أَكْبَرُ', english: 'Allah is the Greatest.', repeat: 2 },
  { arabic: 'لَا إِلَهَ إِلَّا اللَّهُ', english: 'There is no god but Allah.', repeat: 1 },
]

export const wuduSteps = [
  {
    number: '01',
    title: 'Intention',
    arabic: 'النِّيَّة',
    text: 'Make the intention in your heart to perform wudu for the sake of Allah, seeking purity for worship.',
    note: 'The intention is internal; no specific formula must be spoken.',
  },
  {
    number: '02',
    title: 'Wash the hands',
    arabic: 'غَسْلُ الْيَدَيْن',
    text: 'Wash both hands from the fingertips to the wrists, beginning with the right. Repeat as recommended.',
    note: 'This is a recommended act before the obligatory washing.',
  },
  {
    number: '03',
    title: 'Rinse the mouth',
    arabic: 'الْمَضْمَضَة',
    text: 'Take water into the mouth, rinse, and spit it out. Repeat up to three times.',
    note: 'Recommended, especially before prayer and recitation.',
  },
  {
    number: '04',
    title: 'Rinse the nose',
    arabic: 'الِاسْتِنْشَاق',
    text: 'Draw water gently into the nostrils and blow it out. Repeat up to three times.',
    note: 'Do not draw water too deeply while fasting.',
  },
  {
    number: '05',
    title: 'Wash the face',
    arabic: 'غَسْلُ الْوَجْه',
    text: 'Wash the face from the hairline to the chin, and from the thumb to the middle finger across. Begin from the top and wash downward.',
    note: 'Obligatory once; a second washing is recommended.',
  },
  {
    number: '06',
    title: 'Wash the right arm',
    arabic: 'غَسْلُ الْيَدِ الْيُمْنَى',
    text: 'Wash the right arm from the elbow to the fingertips, ensuring the water reaches the skin.',
    note: 'Obligatory once; a second washing is recommended.',
  },
  {
    number: '07',
    title: 'Wash the left arm',
    arabic: 'غَسْلُ الْيَدِ الْيُسْرَى',
    text: 'Wash the left arm from the elbow to the fingertips in the same manner.',
    note: 'The arms must be washed in order, right then left.',
  },
  {
    number: '08',
    title: 'Wipe the head',
    arabic: 'مَسْحُ الرَّأْس',
    text: 'With the remaining moisture on the right hand, wipe the front quarter of the head from the hairline backward.',
    note: 'Use the moisture of the hand; do not take fresh water.',
  },
  {
    number: '09',
    title: 'Wipe the feet',
    arabic: 'مَسْحُ الْقَدَمَيْن',
    text: 'With the remaining moisture, wipe the right foot from the toes to the ankle, then the left foot in the same way.',
    note: 'In the Ja‘fari school the feet are wiped, not washed.',
  },
]

export const wuduConditions = [
  'The water must be ritually pure (tahir) and permissible to use.',
  'The place, clothing, and body must not be impure in a way that prevents validity.',
  'The face and arms must be uncovered; no barrier such as nail polish or thick cream may prevent water from reaching the skin.',
  'The sequence of washing and wiping must be maintained.',
  'The acts must be performed continuously, without a long interruption.',
  'The intention must be present at the beginning of the wudu.',
]

export const wuduNullifiers = [
  'Urine, stool, or wind from the body.',
  'Sleep that overcomes the senses of hearing and sight.',
  'Loss of consciousness, intoxication, or insanity.',
  'Anything that requires a ghusl, such as major ritual impurity.',
  'Touching a corpse that requires ghusl, according to many jurists.',
]

export const tasbeehDhikr = [
  { id: 'subhanallah', arabic: 'سُبْحَانَ اللَّهِ', transliteration: 'Subhan Allah', meaning: 'Glory be to Allah', defaultTarget: 33 },
  { id: 'alhamdulillah', arabic: 'الْحَمْدُ لِلَّهِ', transliteration: 'Alhamdulillah', meaning: 'All praise is due to Allah', defaultTarget: 33 },
  { id: 'allahuakbar', arabic: 'اللَّهُ أَكْبَرُ', transliteration: 'Allahu Akbar', meaning: 'Allah is the Greatest', defaultTarget: 34 },
  { id: 'salawat', arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَآلِ مُحَمَّدٍ', transliteration: 'Allahumma salli ‘ala Muhammadin wa ali Muhammad', meaning: 'O Allah, send blessings upon Muhammad and his family', defaultTarget: 100 },
  { id: 'tahlil', arabic: 'لَا إِلَهَ إِلَّا اللَّهُ', transliteration: 'La ilaha illa Allah', meaning: 'There is no god but Allah', defaultTarget: 100 },
  { id: 'istighfar', arabic: 'أَسْتَغْفِرُ اللَّهَ', transliteration: 'Astaghfirullah', meaning: 'I seek forgiveness from Allah', defaultTarget: 100 },
  { id: 'yahussain', arabic: 'يَا حُسَيْن', transliteration: 'Ya Hussain', meaning: 'O Hussain', defaultTarget: 100 },
]

export const namazFaqs = [
  {
    q: 'How many rak‘ahs are obligatory each day?',
    a: 'The five daily prayers total seventeen rak‘ahs: Fajr two, Dhuhr four, Asr four, Maghrib three, and Isha four.',
  },
  {
    q: 'Can I combine Dhuhr and Asr, or Maghrib and Isha?',
    a: 'In the Ja‘fari school, combining these prayers is permitted in ordinary circumstances as well as in travel or difficulty, while offering each at its own preferred time is more virtuous. Follow the guidance of your marja‘.',
  },
  {
    q: 'What should I do if I miss a prayer?',
    a: 'A missed obligatory prayer should be offered as qada as soon as possible. The intention is made for the missed prayer, and the same structure is followed.',
  },
  {
    q: 'How do I find the qibla?',
    a: 'Use a reliable qibla app or compass. In most of the world the qibla is toward the Kaaba in Mecca. If you are uncertain, make a reasonable effort and pray with confidence.',
  },
  {
    q: 'What is qunut?',
    a: 'Qunut is a supplication offered in the second rak‘ah before the ruku‘. It is highly recommended and can be as simple as a heartfelt du‘a or a salawat.',
  },
]
