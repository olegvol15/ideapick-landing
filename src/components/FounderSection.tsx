import { Button } from './ui/button'

const CARDS = [
  {
    avatar: 'https://api.dicebear.com/9.x/personas/svg?seed=marc&backgroundColor=b6e3f4',
    handle: '@marc_builds',
    text: 'Spent 6 months building a SaaS.\n\nLaunched yesterday.\n\n0 users.',
    rotate: '-1.5deg',
  },
  {
    avatar: 'https://api.dicebear.com/9.x/personas/svg?seed=jsmith&backgroundColor=c0aede',
    handle: '@jsmith_indie',
    text: 'The biggest mistake indie devs make is building before validating the idea.',
    rotate: '1deg',
  },
  {
    avatar: 'https://api.dicebear.com/9.x/personas/svg?seed=andreessen&backgroundColor=ffd5dc',
    handle: '@andreessen',
    text: "Most startups fail not because they can't build the product, but because they build the wrong product.",
    rotate: '1.2deg',
  },
  {
    avatar: 'https://api.dicebear.com/9.x/personas/svg?seed=dvassallo&backgroundColor=d1f4cc',
    handle: '@dvassallo',
    text: 'Validate before you build. Every time. No exceptions.',
    rotate: '-0.8deg',
  },
]

export default function FounderSection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="reveal-on-scroll flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">

          {/* Left — founder text */}
          <div className="flex-1">
            <h2 className="font-['Manrope'] text-4xl font-extrabold text-[#0a3f77] dark:text-[#d0e8fa] sm:text-5xl">
              Hi, I'm Oleh 👋
            </h2>

            <div className="mt-6 space-y-4 text-lg leading-relaxed text-[#4f6d8d] dark:text-[#7ba8c8]">
              <p>I built IdeaPick to solve a problem I faced myself.</p>
              <p>
                I saw too many indie developers - including me - spend months building apps nobody wanted.
                Not because the code was bad, but because the{' '}
                <strong className="font-semibold text-[#0a3f77] dark:text-[#c0daf5]">idea wasn't the right one</strong>.
              </p>
              <p>
                IdeaPick is a place to brainstorm, explore ideas, and quickly understand whether something is worth building.
              </p>
              <p>The tool I wish I had before starting my previous projects.</p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <div className="h-12 w-12 overflow-hidden rounded-full ring-2 ring-[#023E8A]/14 shadow-md dark:ring-white/10">
                <img src="/founder-photo.jpg" alt="Oleg Volostnykh" className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="font-semibold text-[#0a3f77] dark:text-[#d0e8fa]">Oleh Volostnykh</p>
                <p className="text-sm text-[#7ba8c8]">Founder, IdeaPick</p>
              </div>
              <div className="flex gap-2">
                <Button asChild variant="secondary" size="sm" className="dark:border-white/10 dark:bg-white/6 dark:text-[#c0daf5] dark:hover:bg-white/10">
                  <a href="https://x.com/olegvolo15" target="_blank" rel="noreferrer">X</a>
                </Button>
                <Button asChild variant="secondary" size="sm" className="dark:border-white/10 dark:bg-white/6 dark:text-[#c0daf5] dark:hover:bg-white/10">
                  <a href="https://www.linkedin.com/in/oleh-volostnykh/" target="_blank" rel="noreferrer">LinkedIn</a>
                </Button>
                <Button asChild variant="secondary" size="sm" className="dark:border-white/10 dark:bg-white/6 dark:text-[#c0daf5] dark:hover:bg-white/10">
                  <a href="https://github.com/olegvol15" target="_blank" rel="noreferrer">GitHub</a>
                </Button>
              </div>
            </div>
          </div>

          {/* Right — card grid */}
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:w-[480px] lg:shrink-0">
            {CARDS.map((card, i) => (
              <div
                key={i}
                className="founder-card rounded-2xl border border-[#023E8A]/12 bg-white/90 p-5 shadow-[0_4px_20px_rgba(2,62,138,0.08)] dark:border-white/8 dark:bg-[#0a1829]/90"
                style={{ transform: `rotate(${card.rotate})` }}
              >
                <div className="mb-3 flex items-center gap-2.5">
                  <img src={card.avatar} alt={card.handle} className="h-8 w-8 shrink-0 rounded-full object-cover" />
                  <span className="text-xs font-medium text-[#7ba8c8]">{card.handle}</span>
                  <span className="ml-auto text-[10px] text-[#aac4d8] dark:text-[#4e6f8a]">𝕏</span>
                </div>
                <p className="whitespace-pre-line text-sm leading-relaxed text-[#1a3050] dark:text-[#c0daf5]">
                  {card.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>

    </section>
  )
}
