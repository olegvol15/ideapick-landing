'use client'

import { useEffect, useRef } from 'react'

interface Feature {
  label: string
  title: string
  description: string
  src: string
  alt: string
  /** CSS object-position to focus on the relevant area */
  cropPosition: string
  /** Aspect ratio of the visible crop window */
  cropAspect: string
  flip?: boolean
}

const FEATURES: Feature[] = [
  {
    label: '01',
    title: 'Describe what you want to build',
    description:
      'IdeaPick turns a simple prompt into ranked app opportunities backed by real App Store signals — no spreadsheets, no guesswork.',
    src: '/screenshots/input.png',
    alt: 'IdeaPick generator interface',
    cropPosition: '0% 45%',
    cropAspect: '16/9',
    flip: false,
  },
  {
    label: '02',
    title: 'See opportunity signals instantly',
    description:
      'Each idea comes scored with demand, competition, and monetization signals so you can compare options at a glance.',
    src: '/screenshots/ideas.png',
    alt: 'IdeaPick opportunity scores',
    cropPosition: 'top center',
    cropAspect: '16/9',
    flip: true,
  },
  {
    label: '03',
    title: 'Understand the competitive landscape',
    description:
      'See real competitors, their strengths and weaknesses — so you know exactly where to position your product.',
    src: '/screenshots/competitors.png',
    alt: 'IdeaPick competitor cards',
    cropPosition: 'top center',
    cropAspect: '16/9',
    flip: false,
  },
  {
    label: '04',
    title: 'Analyze idea details',
    description:
      'Get structured idea details, audience insights, and market intelligence to go from validated idea to first launch faster.',
    src: '/screenshots/idea_details.png',
    alt: 'IdeaPick idea details view',
    cropPosition: '0% 30%',
    cropAspect: '16/9',
    flip: true,
  },
  {
    label: '05',
    title: 'Get a build roadmap',
    description:
      'IdeaPick generates a prioritized feature roadmap so you can start building with clarity and ship your first version faster.',
    src: '/screenshots/roadmap.png',
    alt: 'IdeaPick build roadmap',
    cropPosition: 'top center',
    cropAspect: '16/9',
    flip: false,
  },
]

function FeatureBlock({ feature, index }: { feature: Feature; index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const tilt = feature.flip
    ? 'perspective(1100px) rotateY(-3deg) rotateX(1.5deg)'
    : 'perspective(1100px) rotateY(3deg) rotateX(1.5deg)'

  return (
    <div
      ref={ref}
      className="feature-block flex flex-col items-center gap-10 lg:gap-16"
      style={{
        flexDirection: feature.flip ? undefined : undefined,
      }}
    >
      <div
        className={`flex w-full flex-col items-center gap-10 lg:flex-row lg:gap-16 ${
          feature.flip ? 'lg:flex-row-reverse' : ''
        }`}
      >
        {/* Text */}
        <div className="feature-text flex w-full flex-col justify-center lg:w-[38%] lg:shrink-0">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-[#0077b6] dark:text-[#38c5e8]">
            {feature.label}
          </p>
          <h3 className="font-['Manrope'] text-2xl font-extrabold leading-snug text-[#0a3f77] dark:text-[#d0e8fa] sm:text-3xl">
            {feature.title}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-[#3d628b] dark:text-[#7ba8c8]">
            {feature.description}
          </p>
        </div>

        {/* Screenshot */}
        <div className="feature-screenshot relative flex-1 w-full">
          {/* Glow */}
          <div
            className="pointer-events-none absolute inset-0 -z-10 rounded-3xl blur-3xl"
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,119,182,0.22) 0%, rgba(56,197,232,0.10) 50%, transparent 80%)',
              transform: 'scale(1.15)',
            }}
          />

          {/* Frame */}
          <div
            className="overflow-hidden rounded-2xl border border-[#023E8A]/18 bg-white shadow-[0_24px_72px_rgba(2,62,138,0.22),0_4px_16px_rgba(2,62,138,0.10)] dark:border-white/8 dark:bg-[#0a1829] dark:shadow-[0_24px_72px_rgba(0,0,0,0.45)]"
            style={{ transform: tilt, transformOrigin: feature.flip ? 'right center' : 'left center' }}
          >
            {/* Cropped screenshot viewport */}
            <div
              className="w-full overflow-hidden"
              style={{ aspectRatio: feature.cropAspect }}
            >
              <img
                src={feature.src}
                alt={feature.alt}
                className="w-full"
                style={{
                  objectFit: 'cover',
                  objectPosition: feature.cropPosition,
                  height: '100%',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProductPreview() {
  return (
    <section id="screenshots" className="py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="reveal-on-scroll mb-20 text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-[#0077b6] dark:text-[#38c5e8]">
            Inside IdeaPick
          </p>
          <h2 className="font-['Manrope'] text-3xl font-extrabold text-[#0a3f77] dark:text-[#d0e8fa] sm:text-5xl">
            How IdeaPick helps you validate ideas faster
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#3d628b] dark:text-[#7ba8c8]">
            From a single prompt to a validated, roadmap-ready idea — in minutes.
          </p>
        </div>

        {/* Feature blocks */}
        <div className="flex flex-col gap-28 sm:gap-36">
          {FEATURES.map((feature, index) => (
            <FeatureBlock key={feature.label} feature={feature} index={index} />
          ))}
        </div>
      </div>

      <style>{`
        .feature-block .feature-text,
        .feature-block .feature-screenshot {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .feature-block .feature-screenshot {
          transition-delay: 0.12s;
        }
        .feature-block.is-visible .feature-text,
        .feature-block.is-visible .feature-screenshot {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  )
}
