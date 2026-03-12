import ProductWindow from './ProductWindow'
import { Button } from './ui/button'
import ParticleCanvas from './ParticleCanvas'

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-40 pb-30 sm:pt-52 sm:pb-36">
      {/* Light bg gradients */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_66%_46%_at_50%_34%,rgba(255,255,255,0.99)_0%,rgba(239,250,255,0.96)_30%,rgba(214,238,250,0.84)_58%,rgba(170,202,224,0.72)_100%)] dark:opacity-0" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_92%_70%_at_50%_42%,transparent_36%,rgba(2,62,138,0.12)_100%)] dark:opacity-0" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] dark:opacity-[0.04] [background-image:linear-gradient(to_right,rgba(2,62,138,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(2,62,138,0.06)_1px,transparent_1px)] [background-size:48px_48px]" />

      {/* Dark bg gradient */}
      <div className="pointer-events-none absolute inset-0 opacity-0 dark:opacity-100 bg-[radial-gradient(ellipse_66%_46%_at_50%_34%,rgba(0,96,160,0.18)_0%,rgba(6,13,25,0)_70%)]" />

      <div className="absolute inset-0 z-[1]">
        <ParticleCanvas />
        <div
          className="hero-ambient-motion pointer-events-none absolute left-[4%] top-[18%] h-[24rem] w-[24rem] rounded-full blur-3xl animate-[hero-float_20s_ease-in-out_infinite]"
          style={{ background: 'radial-gradient(circle, rgba(0,119,182,0.56) 0%, rgba(144,224,239,0.28) 42%, transparent 76%)' }}
        />
        <div
          className="hero-ambient-motion pointer-events-none absolute right-[5%] top-[12%] h-[30rem] w-[30rem] rounded-full blur-3xl animate-[hero-float_24s_ease-in-out_infinite]"
          style={{
            animationDelay: '-4s',
            background: 'radial-gradient(circle, rgba(144,224,239,0.48) 0%, rgba(0,119,182,0.2) 50%, transparent 78%)',
          }}
        />
        <div
          className="hero-ambient-motion pointer-events-none absolute bottom-[1%] left-1/2 h-[22rem] w-[22rem] -translate-x-1/2 rounded-full blur-3xl animate-[hero-float_22s_ease-in-out_infinite]"
          style={{
            animationDelay: '-8s',
            background: 'radial-gradient(circle, rgba(202,240,248,0.56) 0%, rgba(144,224,239,0.2) 44%, transparent 78%)',
          }}
        />
        <div
          className="hero-ambient-motion pointer-events-none absolute left-1/2 top-[56%] h-[26rem] w-[34rem] -translate-x-1/2 rounded-full blur-[64px] animate-[hero-float_26s_ease-in-out_infinite]"
          style={{
            animationDelay: '-11s',
            background: 'radial-gradient(circle, rgba(0,119,182,0.24) 0%, rgba(144,224,239,0.16) 48%, transparent 78%)',
          }}
        />
      </div>

      <div className="relative z-[2] mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 font-mono text-xs uppercase tracking-wider text-[#0077b6] dark:text-[#38c5e8]">
            Idea validation for indie builders
          </p>
          <h1 className="text-balance font-['Manrope'] text-4xl font-extrabold leading-tight tracking-tight text-[#022f6b] dark:text-[#d0e8fa] sm:text-5xl lg:text-6xl">
            Find your next big app idea
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-[#3d628b] dark:text-[#7ba8c8]">
            Turn one prompt into real product opportunities - SaaS, AI tools, mobile apps and more - with real market signals.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="border-[#0077B6] bg-[#0077B6] px-7 text-white shadow-[0_16px_38px_rgba(0,119,182,0.38)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#0368a0]"
            >
              <a href="#generator">Try IdeaPick free</a>
            </Button>
            <Button asChild variant="secondary" size="lg" className="bg-white/92 px-7 hover:bg-white dark:bg-white/8 dark:text-[#d0e8fa] dark:hover:bg-white/14 dark:border-white/10">
              <a href="#final-cta">Join the waitlist</a>
            </Button>
          </div>
        </div>

        <div id="generator" className="reveal-on-scroll is-visible relative mt-13 sm:mt-18">
          <div className="pointer-events-none absolute inset-x-8 -top-12 h-60 rounded-full bg-[radial-gradient(circle,rgba(0,119,182,0.3)_0%,rgba(144,224,239,0.22)_36%,transparent_74%)] blur-3xl sm:inset-x-20 sm:h-72" />
          <p className="mb-3 font-mono text-[11px] uppercase tracking-wide text-[#537198] dark:text-[#4e6f8a]">
            Interactive generator
          </p>
          <div className="relative rounded-[2.45rem] border border-[#023E8A]/18 bg-white/90 p-6 shadow-[0_34px_120px_rgba(2,62,138,0.28),0_12px_30px_rgba(2,62,138,0.14)] backdrop-blur-[2px] dark:border-white/7 dark:bg-[#0a1829]/90 dark:shadow-[0_34px_120px_rgba(0,0,0,0.5)] sm:p-7">
            <ProductWindow />
          </div>
        </div>
      </div>
    </section>
  )
}
