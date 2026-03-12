import { useEffect, useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import ProductPreview from './components/ProductPreview'
import VideoDemo from './components/VideoDemo'
import HowItWorksMini from './components/HowItWorksMini'
import FaqSection from './components/FaqSection'
import FounderSection from './components/FounderSection'
import FinalCta from './components/FinalCta'
import PricingPage from './components/PricingPage'
import AboutPage from './components/AboutPage'
import ContactPage from './components/ContactPage'
import PrivacyPage from './components/PrivacyPage'
import TermsPage from './components/TermsPage'
import Footer from './components/Footer'

function getPath() {
  return window.location.pathname.replace(/\/+$/, '') || '/'
}

export default function App() {
  const [path, setPath] = useState(getPath)
  const [visible, setVisible] = useState(true)

  // Client-side navigation
  useEffect(() => {
    const onPop = () => {
      setVisible(false)
      setTimeout(() => { setPath(getPath()); setVisible(true) }, 180)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // Expose navigate for Nav links
  useEffect(() => {
    const w = window as Window & { __navigate?: (to: string) => void }
    w.__navigate = (to: string) => {
      if (getPath() === to) return
      setVisible(false)
      setTimeout(() => {
        window.history.pushState(null, '', to)
        setPath(to)
        window.scrollTo(0, 0)
        setVisible(true)
      }, 180)
    }
  }, [])

  // Re-run reveal observer whenever the route changes
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('.reveal-on-scroll'))
    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [path])

  const isPricingPage = path === '/pricing'
  const isAboutPage = path === '/about'
  const isContactPage = path === '/contact'
  const isPrivacyPage = path === '/privacy'
  const isTermsPage = path === '/terms'

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 180ms ease',
      }}
    >
      <Nav />
      {isPricingPage ? (
        <PricingPage />
      ) : isAboutPage ? (
        <AboutPage />
      ) : isContactPage ? (
        <ContactPage />
      ) : isPrivacyPage ? (
        <PrivacyPage />
      ) : isTermsPage ? (
        <TermsPage />
      ) : (
        <>
          <Hero />
          <ProductPreview />
          <VideoDemo />
          <HowItWorksMini />
          <FaqSection />
          <FounderSection />
          <FinalCta />
          <div id="pricing" />
        </>
      )}
      <Footer />
    </div>
  )
}
