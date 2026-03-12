import { Card, CardContent } from './ui/card'

export default function AboutPage() {
  return (
    <main className="pt-24">
      <section className="py-14 sm:py-16">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
          <h1 className="reveal-on-scroll text-center font-['Manrope'] text-4xl font-extrabold tracking-tight text-[#0a0a12] dark:text-[#d0e8fa] sm:text-6xl">
            Why IdeaPick exists
          </h1>
          <p className="reveal-on-scroll mt-3 text-center text-xl text-[#6a6a72] dark:text-[#7ba8c8]" style={{ transitionDelay: '80ms' }}>
            A little bit about why I built it
          </p>

          <Card className="reveal-on-scroll mt-10 rounded-3xl border-[#023E8A]/10 bg-white/72 dark:border-white/7 dark:bg-[#0a1829]" style={{ transitionDelay: '160ms' }}>
            <CardContent className="space-y-6 p-6 text-lg leading-relaxed text-[#3f3f46] dark:text-[#a0c4e0] sm:p-10">
              <h2 className="font-['Manrope'] text-4xl font-bold text-[#101018] dark:text-[#d0e8fa]">Hi, I'm Oleh 👋</h2>

              <p>
                I built IdeaPick after running into the same problem many indie developers face: spending months
                building something that nobody actually wants.
              </p>
              <p>
                I did this myself more than once. The code was fine, the product worked - but the idea simply
                didn't have enough demand.
              </p>
              <p>
                When I looked for tools to help with this, most of them felt either too generic or too
                complicated. I wanted something practical: a place where you can quickly explore ideas,
                understand the market, and decide whether something is worth building.
              </p>
              <p>
                IdeaPick is designed as a lightweight workspace for brainstorming and evaluating product ideas.
                You start with a simple prompt, and the system helps you explore opportunities, analyze
                competitors, and understand the potential of the idea before committing time to building it.
              </p>

              <div>
                <p className="mb-3 font-semibold text-[#101018] dark:text-[#d0e8fa]">The product is built around a few core principles:</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0077b6]" />Use real market data instead of guesswork.</li>
                  <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0077b6]" />Make idea exploration fast enough to use daily.</li>
                  <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0077b6]" />Focus on practical signals, not long reports.</li>
                </ul>
              </div>

              <p>Instead of spending weeks building and hoping it works, the goal is to help you quickly understand:</p>
              <ul className="space-y-2 pl-4">
                <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0077b6]" />Whether the idea has demand.</li>
                <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0077b6]" />Who the competitors are.</li>
                <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0077b6]" />Where the opportunity might be.</li>
                <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0077b6]" />What a first version could look like.</li>
              </ul>

              <p>
                IdeaPick is the tool I wish I had before starting my previous projects. If it saves you
                even a few weeks of building the wrong thing, it already did its job.
              </p>
              <p>Thanks for checking it out.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
