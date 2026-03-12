import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

const FEATURES = [
  'Unlimited idea exploration (fair usage)',
  'Demand, competition, and monetization signals',
  'Competitor analysis',
  'Save and compare opportunities',
  'Build plans for product ideas',
]

export default function PricingPage() {
  return (
    <main className="pt-24">
      <section className="py-14">
        <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
          <p className="reveal-on-scroll mb-3 font-mono text-xs uppercase tracking-wide text-[#0077b6] dark:text-[#38c5e8]">Pricing</p>
          <h1 className="reveal-on-scroll font-['Manrope'] text-4xl font-extrabold text-[#0a3f77] dark:text-[#d0e8fa] sm:text-6xl">
            Simple pricing for builders
          </h1>
          <p className="reveal-on-scroll mt-4 text-lg text-[#587596] dark:text-[#7ba8c8]">
            One plan. Everything you need to validate ideas before building.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">

          {/* Early adopter banner */}
          <div className="reveal-on-scroll mb-5 overflow-hidden rounded-2xl border border-[#0077b6]/25 bg-gradient-to-br from-[#e0f4fc] to-[#caeaf8] px-6 py-5 dark:border-[#38c5e8]/20 dark:from-[#0a2540] dark:to-[#0d2f50]">
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-full bg-[#0077b6] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-white">
                Limited spots
              </span>
              <p className="font-mono text-xs uppercase tracking-widest text-[#0077b6] dark:text-[#38c5e8]">
                Early adopter offer
              </p>
            </div>
            <p className="text-[#1a3050] dark:text-[#c0daf5]">
              Join the waitlist and get IdeaPick for{' '}
              <span className="font-['Manrope'] text-2xl font-extrabold text-[#0077b6] dark:text-[#38c5e8]">$10&nbsp;/&nbsp;month</span>
              {' '}instead of $19&nbsp;/&nbsp;month.
            </p>
            <p className="mt-1 text-sm text-[#3d628b] dark:text-[#7ba8c8]">
              This price will be locked forever for early users.
            </p>
            <Button
              asChild
              className="mt-4 border-[#0077B6] bg-[#0077B6] text-white shadow-[0_8px_24px_rgba(0,119,182,0.30)] hover:bg-[#0368a0]"
            >
              <a href="/#final-cta">Join Waitlist</a>
            </Button>

            {/* Social proof */}
            <div className="mt-4 flex flex-col gap-1.5">
              <div className="flex items-center gap-3">
                <div className="flex">
                  {[
                    'https://api.dicebear.com/9.x/personas/svg?seed=alex&backgroundColor=b6e3f4',
                    'https://api.dicebear.com/9.x/personas/svg?seed=sam&backgroundColor=c0aede',
                    'https://api.dicebear.com/9.x/personas/svg?seed=jordan&backgroundColor=ffd5dc',
                    'https://api.dicebear.com/9.x/personas/svg?seed=casey&backgroundColor=d1f4cc',
                    'https://api.dicebear.com/9.x/personas/svg?seed=taylor&backgroundColor=ffeaa7',
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt=""
                      className="h-7 w-7 rounded-full border-2 border-[#e0f4fc] object-cover dark:border-[#0a2540]"
                      style={{ marginLeft: i === 0 ? 0 : '-8px' }}
                    />
                  ))}
                </div>
                <p className="text-sm font-medium text-[#1a3050] dark:text-[#c0daf5]">
                  Join <span className="font-bold">120+</span> builders already on the waitlist
                </p>
              </div>
              <p className="text-xs text-[#3d628b] dark:text-[#7ba8c8]">
                Early adopters get the lowest price we will ever offer.
              </p>
            </div>
          </div>

          {/* Pricing card */}
          <Card className="reveal-on-scroll rounded-3xl border-[#023E8A]/16 bg-white/90 shadow-[0_14px_40px_rgba(2,62,138,0.10)] dark:border-white/7 dark:bg-[#0a1829]" style={{ transitionDelay: '80ms' }}>
            <CardContent className="p-7">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-['Manrope'] text-xl font-bold text-[#0e457e] dark:text-[#c0daf5]">IdeaPick Pro</h2>
                  <p className="mt-2 font-['Manrope'] text-5xl font-extrabold leading-none text-[#0077b6] dark:text-[#38c5e8]">
                    $19
                    <span className="ml-1.5 text-base font-medium text-[#6c89a9] dark:text-[#4e6f8a]">/ month</span>
                  </p>
                </div>
              </div>

              <ul className="mt-6 space-y-3">
                {FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[#4f6d8d] dark:text-[#7ba8c8]">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#35b6d6]" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button className="mt-7 w-full border-[#0077B6] bg-[#0077B6] text-white hover:bg-[#0368a0]">
                Start when we launch
              </Button>
              <p className="mt-2 text-center text-xs text-[#7ba8c8]">Cancel anytime</p>
            </CardContent>
          </Card>

          <p className="reveal-on-scroll mt-6 text-center text-sm text-[#7ba8c8] dark:text-[#4e6f8a]" style={{ transitionDelay: '160ms' }}>
            Cheaper than building the wrong startup.
          </p>

        </div>
      </section>
    </main>
  )
}
