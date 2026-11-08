import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'

const Home = lazy(() => import('./pages/Home'))
const AboutAhlulbayt = lazy(() => import('./pages/AboutAhlulbayt'))
const Masoomeen = lazy(() => import('./pages/Masoomeen'))
const MasoomDetail = lazy(() => import('./pages/MasoomDetail'))
const Quran = lazy(() => import('./pages/Quran'))
const Duas = lazy(() => import('./pages/Duas'))
const Ziyarat = lazy(() => import('./pages/Ziyarat'))
const SupplicationReader = lazy(() => import('./pages/SupplicationReader'))
const Karbala = lazy(() => import('./pages/Karbala'))
const Muharram = lazy(() => import('./pages/Muharram'))
const Calendar = lazy(() => import('./pages/Calendar'))
const Hadith = lazy(() => import('./pages/Hadith'))
const Books = lazy(() => import('./pages/Books'))
const Namaz = lazy(() => import('./pages/Namaz'))
const Wudu = lazy(() => import('./pages/Wudu'))
const Tasbeeh = lazy(() => import('./pages/Tasbeeh'))
const Contact = lazy(() => import('./pages/Contact'))
const AboutUs = lazy(() => import('./pages/AboutUs'))
const Credits = lazy(() => import('./pages/Credits'))
const NotFound = lazy(() => import('./pages/NotFound'))

function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-live="polite">
      <span className="page-loader__star">✦</span>
      <span className="arabic" dir="rtl">يَا حُسَيْن</span>
      <span className="page-loader__text">Preparing the sanctuary…</span>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="ahlulbayt" element={<AboutAhlulbayt />} />
            <Route path="masoomeen" element={<Masoomeen />} />
            <Route path="masoomeen/:slug" element={<MasoomDetail />} />
            <Route path="quran" element={<Quran />} />
            <Route path="duas" element={<Duas />} />
            <Route path="ziyarat" element={<Ziyarat />} />
            <Route path="duas/:slug" element={<SupplicationReader key="dua" type="dua" />} />
            <Route path="ziyarat/:slug" element={<SupplicationReader key="ziyarat" type="ziyarat" />} />
            <Route path="karbala" element={<Karbala />} />
            <Route path="muharram" element={<Muharram />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="hadith" element={<Hadith />} />
            <Route path="books" element={<Books />} />
            <Route path="namaz" element={<Namaz />} />
            <Route path="wudu" element={<Wudu />} />
            <Route path="tasbeeh" element={<Tasbeeh />} />
            <Route path="contact" element={<Contact />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="credits" element={<Credits />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
