export default function Footer() {
  return (
    <footer className="border-t border-[#023E8A]/12 bg-white/70 dark:border-white/7 dark:bg-[#060d19]">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6">
        <div className="inline-flex items-center gap-2 text-lg font-extrabold tracking-tight text-[#0d427a] dark:text-[#d0e8fa]">
          <img src="/favicon.svg" alt="IdeaPick logo" className="h-6 w-6 rounded-md" />
          <span>IDEA<span className="text-[#0077b6] dark:text-[#38c5e8]">PICK</span></span>
        </div>

        <nav className="flex items-center gap-5">
          {[
            { label: 'Privacy Policy', to: '/privacy' },
            { label: 'Terms of Service', to: '/terms' },
          ].map((link) => (
            <button
              key={link.to}
              onClick={() => {
                const w = window as Window & { __navigate?: (to: string) => void }
                if (w.__navigate) w.__navigate(link.to)
                else window.location.href = link.to
              }}
              className="text-xs text-[#63809f] transition-colors hover:text-[#0077b6] dark:text-[#4e6f8a] dark:hover:text-[#38c5e8]"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              const w = window as Window & { __navigate?: (to: string) => void }
              if (w.__navigate) w.__navigate('/contact')
              else window.location.href = '/contact'
            }}
            className="text-xs text-[#63809f] transition-colors hover:text-[#0077b6] dark:text-[#4e6f8a] dark:hover:text-[#38c5e8]"
          >
            Contact
          </button>
        </nav>

        <p className="font-mono text-[10px] uppercase tracking-wide text-[#63809f] dark:text-[#3a5a75]">
          © 2026 IdeaPick
        </p>
      </div>
    </footer>
  )
}
