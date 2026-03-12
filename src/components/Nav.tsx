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
  const isHome = typeof window !== 'undefined' && (window.location.pathname === '/' || window.location.pathname === '')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
          <Button variant="ghost" size="sm" className="rounded-full px-4 text-sm text-[#2f5a8a] hover:bg-[#023E8A]/6 hover:text-[#0a3f77] dark:text-[#7ba8c8] dark:hover:bg-white/8 dark:hover:text-[#d0e8fa]" onClick={() => navigate('/about')}>
            About
          </Button>
          <Button variant="ghost" size="sm" className="rounded-full px-4 text-sm text-[#2f5a8a] hover:bg-[#023E8A]/6 hover:text-[#0a3f77] dark:text-[#7ba8c8] dark:hover:bg-white/8 dark:hover:text-[#d0e8fa]" onClick={() => navigate('/pricing')}>
            Pricing
          </Button>
          <Button
            size="sm"
            className="ml-1 rounded-full bg-[#0077B6] px-4 text-sm text-white shadow-[0_4px_14px_rgba(0,119,182,0.35)] transition duration-200 hover:-translate-y-px hover:bg-[#0368a0]"
            onClick={() => {
              if (isHome) {
                document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })
              } else {
                navigate('/')
                setTimeout(() => {
                  document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })
                }, 400)
              }
            }}
          >
            Join waitlist
          </Button>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
