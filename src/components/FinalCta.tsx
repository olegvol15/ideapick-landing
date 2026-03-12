import { useEffect, useState } from 'react'
import WaitlistForm from './WaitlistForm'

const LAUNCH_DATE = new Date('2026-06-01T00:00:00Z')

function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now())
    return {
      days:    Math.floor(diff / 86_400_000),
      hours:   Math.floor((diff % 86_400_000) / 3_600_000),
      minutes: Math.floor((diff % 3_600_000)  / 60_000),
      seconds: Math.floor((diff % 60_000)     / 1_000),
    }
  }
  const [time, setTime] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setTime(calc), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

const AVATARS = [
  { initials: 'AK', bg: '#1d4ed8' },
  { initials: 'MR', bg: '#7c3aed' },
  { initials: 'JS', bg: '#0369a1' },
]

export default function FinalCta() {
  const { days, hours, minutes, seconds } = useCountdown(LAUNCH_DATE)

  return (
    <section id="final-cta" className="py-20 sm:py-28">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        {/* Card — matches the hero generator window */}
        <div className="reveal-on-scroll relative overflow-hidden rounded-[2.45rem] border border-[#023E8A]/18 bg-white/90 p-10 text-center shadow-[0_34px_120px_rgba(2,62,138,0.28),0_12px_30px_rgba(2,62,138,0.14)] backdrop-blur-[2px] dark:border-white/7 dark:bg-[#0a1829] dark:shadow-[0_34px_120px_rgba(0,0,0,0.5)] sm:p-14">

          <h2 className="font-['Manrope'] text-4xl font-extrabold tracking-tight text-[#022f6b] dark:text-[#d0e8fa] sm:text-6xl">
            Join the waitlist
          </h2>
          <p className="mx-auto mt-4 max-w-sm text-base leading-relaxed text-[#3d628b] dark:text-[#7ba8c8]">
            Get exclusive early access to IdeaPick and stay informed about launch updates.
          </p>

          {/* Form */}
          <div className="mt-8 flex justify-center">
            <WaitlistForm />
          </div>

          {/* Social proof */}
          <div className="mt-7 flex items-center justify-center gap-3">
            <div className="flex -space-x-2.5">
              {AVATARS.map((a) => (
                <div
                  key={a.initials}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold text-white ring-2 ring-white"
                  style={{ background: a.bg }}
                >
                  {a.initials}
                </div>
              ))}
            </div>
            <p className="text-sm text-[#4a6a8a] dark:text-[#7ba8c8]">Early builders already joined</p>
          </div>

          {/* Countdown */}
          <div className="mt-8 flex items-start justify-center divide-x divide-[#023E8A]/12 dark:divide-white/8">
            {[
              { value: days,    label: 'days'    },
              { value: hours,   label: 'hours'   },
              { value: minutes, label: 'minutes' },
              { value: seconds, label: 'seconds' },
            ].map(({ value, label }) => (
              <div key={label} className="flex min-w-[72px] flex-col items-center px-4">
                <span className="font-['Manrope'] text-4xl font-extrabold tabular-nums text-[#0077B6] dark:text-[#38c5e8] sm:text-5xl">
                  {String(value).padStart(2, '0')}
                </span>
                <span className="mt-1 text-[10px] uppercase tracking-widest text-[#7a9ab8] dark:text-[#4e6f8a]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
