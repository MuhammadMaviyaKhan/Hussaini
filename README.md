# HUSSAINI — The Path of Ahlulbaytؑ

A dark, editorial Shia Islamic information portal built with **React + Vite**. HUSSAINI gathers the Qur’an, the 14 Masoomeen, the great duas and ziyarat, the history of Karbala, Muharram, an Islamic calendar, hadith, a library, ritual guides (namaz and wudu) and a digital tasbeeh — in one sanctuary of knowledge, devotion and remembrance.

> Live locally at `http://localhost:5173` during development.

## Highlights

- **Cinematic dark identity** — `#080909` background, antique gold (`#C6A45A`), emerald accents, Amiri / Reem Kufi / Noto Nastaliq Urdu typography, geometric SVG patterns, and shrine photography under dark veils.
- **16 pages + detail routes** — Home, About Ahlulbayt, 14 Masoomeen (grid + 14 individual detail pages), Qur’an explorer, Duas, Ziyarat, Karbala, Muharram, Islamic calendar, Hadith, Islamic Books Library, Shia Namaz Guide, Wudu Guide, Digital Tasbeeh, Contact, About Us, plus `/credits` and a 404 page.
- **Immersive readers** — every dua/ziyarat supports Arabic (Amiri, adjustable size), Urdu (Nastaliq), English, and transliteration, with a language toggle, reading mode (hides chrome, pins a floating toolbar), copy-to-clipboard, local bookmarks, a table of contents, progress, and per-passage audio/source links.
- **Qur’an explorer** — 114 surahs with fuzzy search, ayah-by-ayah reading, local Uthmani text for 14 complete surahs (source-labelled), and an honest “source pending” state with external links for the rest.
- **14 Masoomeen** — Arabic, Urdu and English names, honorifics, established dates, biographies, events, teachings and symbolic (non-figural) visual design. Unverified quotations are intentionally omitted rather than invented.
- **Honest content stance** — no invented religious text, no fabricated historical facts; excerpts are labelled, complete sources are always linked, and Urdu rendering of classical supplications is marked as a reading aid prepared from English.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | React 19 + Vite 8 (JavaScript, ES modules) |
| Routing | React Router DOM 7 (lazy-loaded routes, `ScrollToTop`) |
| Animation | Framer Motion |
| Icons | Lucide React |
| Fonts | `@fontsource/*` self-hosted (Cormorant Garamond, Manrope, Amiri, Reem Kufi, Noto Nastaliq Urdu) |
| Styling | Hand-written modern CSS in `src/styles/` (11 modules), no Tailwind |
| Backend (optional) | Supabase (`@supabase/supabase-js`) — not required to run |

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run preview  # serve the production build locally
npm run lint     # oxlint (warnings only, no errors)
```

Node 20+ is recommended. The Qur’an explorer chunk is ~277 kB minified and the main bundle is ~683 kB minified — both are within normal Vite budget for this feature set; trim fonts or split routes further if you need smaller payloads.

## Project structure

```
src/
  main.jsx                # app entry, font registration
  App.jsx                 # routes (lazy) + Suspense fallback
  index.css               # imports every style module
  components/             # Navbar, Footer, Layout, SearchOverlay, Seo, PageHero, ...
  pages/                  # one file per page, incl. SupplicationReader, MasoomDetail
  data/                   # supplications (74 curated passages), masoomeen, quran, hadith,
                          # books, calendar, karbala, prayers, site/credits metadata
  styles/                 # base, layout, home, masoomeen, reader, quran, ...
public/images/            # Wikimedia Commons shrine photography (see /credits)
.sources/                 # build-time generators and CDP QA harness (not shipped)
```

`.sources/` contains the review-and-QA tooling used during development (content generators and a Chrome DevTools Protocol screenshot harness). It is not imported by the app and does not ship in `dist/`.

## Content sources and accuracy

- **Duas & Ziyarat (Arabic / transliteration / English)** — reproduced from the Duas.org open supplication archive; each reader deep-links the full source and audio. Several readings are curated **excerpts**, always labelled as such, with the complete text one click away.
- **Urdu** — prepared for this edition **from the English translation**; it is a reading aid and not a substitute for the Arabic. Corrections and scholarly review are welcome (see Contact).
- **Qur’an** — Uthmani text sourced via the AlQuran Cloud API (Tanzil). Sections without a local edition link to Quran.com rather than presenting an unverified rendering.
- **Masoomeen dates/events** — only historically established data is shown; where sources differ, it is stated. No images or depictions of the Masoomeen are used anywhere.
- **Quotes** — selected from verifiable collections (e.g. Sahih Muslim/Bukhari, Nahj al-Balagha, al-Kafi, Bihar al-Anwar, Kamal al-Din, Risalat al-Huquq, al-Ihtijaj); anything we could not source was removed.

This is an independent project and is not affiliated with any seminary, marja’ office, or institution. For fatawa, always consult a qualified scholar.

## Local-only behavior (by design)

- **Contact form / newsletter** — submissions are stored only in the browser’s `localStorage` and clearly say so; nothing is transmitted.
- **Bookmarks, tasbeeh counts, reader language & Arabic size preferences** — also `localStorage`.
- **Placeholder addresses** — `salam@hussaini.path` and the social links in the footer/About are placeholders; replace them with real endpoints before publishing. Set `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` and wire the forms if you want a real backend — the Supabase client is already a dependency.

## Deployment

The build is a static SPA. On any static host (Netlify, Vercel, GitHub Pages, cPanel static hosting), make sure unknown paths fall back to `index.html` (SPA rewrite) because routing is client-side — e.g. `/* /index.html 200` on Netlify.

## Credits

Shrine photography (Imam Hussain shrine, Karbala; the Kadhimayn and Rida shrine gates) is from Wikimedia Commons under its respective licences — full licence links live on the in-app **`/credits`** page. Typography is self-hosted via Fontsource. Arabic texts via Duas.org and Tanzil.

## Disclaimer

HUSSAINI is a devotional and educational resource, not a fatwa service. Ritual practice varies among marja’ references; the namaz and wudu guides summarise the widely known Shia method and link out where appropriate. When in doubt, follow your own marja’.
