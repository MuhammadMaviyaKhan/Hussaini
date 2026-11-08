import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollProgress from './ScrollProgress'

export default function Layout() {
  const { pathname } = useLocation()
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <ScrollProgress />
      <Navbar />
      <main id="main" className="site-main" key={pathname}>
        <div className="page-enter">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  )
}
