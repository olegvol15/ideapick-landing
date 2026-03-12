import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import ThemeToggle from './ThemeToggle'

function navigate(to: string) {
  const w = window as Window & { __navigate?: (to: string) => void }
  if (w.__navigate) w.__navigate(to)
  else window.location.href = to
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isHome = typeof window !== 'undefined' && (window.location.pathname === '/' || window.location.pathname === '')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return
    const handler = () => setMenuOpen(false)
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [menuOpen])

  function handleWaitlist() {
    setMenuOpen(false)
    if (isHome) {
      document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => {
        document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })
      }, 400)
    }
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-[#023E8A]/10 bg-white/75 py-3 shadow-[0_2px_16px_rgba(2,62,138,0.07)] backdrop-blur-md dark:border-white/7 dark:bg-[#060d19]/85'
          : 'border-b border-transparent bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 sm:px-10">
        <a
          className="inline-flex cursor-pointer items-center gap-2.5 text-lg font-extrabold tracking-tight text-[#0c3c76] dark:text-[#d0e8fa]"
          onClick={(e) => { e.preventDefault(); navigate('/') }}
          href="/"
        >
          <img src="/favicon.svg" alt="IdeaPick logo" className="h-6 w-6 rounded-md" />
          <span>IDEA<span className="text-[#0077b6] dark:text-[#38c5e8]">PICK</span></span>
        </a>

        <nav className="flex items-center gap-1">
          {/* Desktop links */}
          <div className="hidden sm:flex items-center gap-1">
            <Button variant="ghost" size="sm" className="rounded-full px-4 text-sm text-[#2f5a8a] hover:bg-[#023E8A]/6 hover:text-[#0a3f77] dark:text-[#7ba8c8] dark:hover:bg-white/8 dark:hover:text-[#d0e8fa]" onClick={() => navigate('/about')}>
              About
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full px-4 text-sm text-[#2f5a8a] hover:bg-[#023E8A]/6 hover:text-[#0a3f77] dark:text-[#7ba8c8] dark:hover:bg-white/8 dark:hover:text-[#d0e8fa]" onClick={() => navigate('/pricing')}>
              Pricing
            </Button>
          </div>

          {/* Desktop: Join waitlist */}
          <Button
            size="sm"
            className="hidden sm:inline-flex ml-1 rounded-full bg-[#0077B6] px-4 text-sm text-white shadow-[0_4px_14px_rgba(0,119,182,0.35)] transition duration-200 hover:-translate-y-px hover:bg-[#0368a0]"
            onClick={handleWaitlist}
          >
            Join waitlist
          </Button>

          <ThemeToggle />

          {/* Mobile: hamburger */}
          <div className="relative sm:hidden" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="ml-1 flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full hover:bg-[#023E8A]/6 dark:hover:bg-white/8 transition-colors"
              aria-label="Menu"
            >
              <span className={`block h-[2px] w-5 rounded-full bg-[#0c3c76] dark:bg-[#d0e8fa] transition-all duration-200 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
              <span className={`block h-[2px] w-5 rounded-full bg-[#0c3c76] dark:bg-[#d0e8fa] transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-[2px] w-5 rounded-full bg-[#0c3c76] dark:bg-[#d0e8fa] transition-all duration-200 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-12 w-52 rounded-2xl border border-[#023E8A]/12 bg-white/95 py-2 shadow-[0_8px_32px_rgba(2,62,138,0.15)] backdrop-blur-md dark:border-white/8 dark:bg-[#081527]/95">
                <button
                  onClick={() => { setMenuOpen(false); navigate('/about') }}
                  className="w-full px-5 py-3 text-left text-sm font-medium text-[#2f5a8a] hover:bg-[#023E8A]/6 dark:text-[#7ba8c8] dark:hover:bg-white/8"
                >
                  About
                </button>
                <button
                  onClick={() => { setMenuOpen(false); navigate('/pricing') }}
                  className="w-full px-5 py-3 text-left text-sm font-medium text-[#2f5a8a] hover:bg-[#023E8A]/6 dark:text-[#7ba8c8] dark:hover:bg-white/8"
                >
                  Pricing
                </button>
                <div className="mx-3 my-2 border-t border-[#023E8A]/10 dark:border-white/8" />
                <div className="px-3 pb-1">
                  <button
                    onClick={handleWaitlist}
                    className="w-full rounded-full bg-[#0077B6] py-2.5 text-sm font-bold text-white shadow-[0_4px_14px_rgba(0,119,182,0.35)] hover:bg-[#0368a0]"
                  >
                    Join waitlist
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
