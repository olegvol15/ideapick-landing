import { Card, CardContent } from './ui/card'

const STEPS = [
  { title: 'Enter interests', desc: 'Share your skills, niche, or problem space.' },
  { title: 'IdeaPick scans signals', desc: 'Demand, competition, and monetization in one pass.' },
  { title: 'Get validated ideas', desc: 'Receive ranked opportunities and a clear next step.' },
]

export default function HowItWorksMini() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <p className="reveal-on-scroll mb-3 font-mono text-xs uppercase tracking-wide text-[#0077b6] dark:text-[#38c5e8]">How It Works</p>
        <h2 className="reveal-on-scroll font-['Manrope'] text-3xl font-extrabold text-[#0a3f77] dark:text-[#d0e8fa] sm:text-5xl">
          Simple flow, real signals
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {STEPS.map((step, idx) => (
            <Card
              key={step.title}
              className="reveal-on-scroll relative rounded-2xl border-[#023E8A]/13 bg-white/82 p-6 transition hover:-translate-y-1 hover:border-[#0077B6]/40 dark:border-white/7 dark:bg-[#0a1829] dark:hover:border-[#0077B6]/30"
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <span className="absolute right-5 top-5 font-mono text-[11px] tracking-wide text-[#86a4c5] dark:text-[#3a5a75]">
                0{idx + 1}
              </span>
              <CardContent className="p-0">
                <h3 className="font-['Manrope'] text-2xl font-bold text-[#0d467f] dark:text-[#c0daf5]">{step.title}</h3>
                <p className="mt-3 text-[#587595] dark:text-[#7ba8c8]">{step.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
