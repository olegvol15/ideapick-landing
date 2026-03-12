import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import type { CompetitorAnalysis } from '@/types'

function CompetitorLogo({ domain, name }: { domain: string; name: string }) {
  const [src, setSrc] = useState(`https://logo.clearbit.com/${domain}`)
  const [dead, setDead] = useState(false)

  if (dead) {
    return (
      <div className="h-10 w-10 shrink-0 rounded-xl border border-[#023E8A]/15 bg-[#f0f7ff] dark:border-white/8 dark:bg-[#081527] flex items-center justify-center text-sm font-bold text-[#6d89a9] dark:text-[#4e6f8a] uppercase select-none">
        {name[0] ?? '?'}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt=""
      className="h-10 w-10 shrink-0 rounded-xl border border-[#023E8A]/15 bg-[#f0f7ff] dark:border-white/8 dark:bg-[#081527] object-contain p-1"
      onError={() => {
        if (src.includes('clearbit')) {
          setSrc(`https://www.google.com/s2/favicons?domain=${domain}&sz=64`)
        } else {
          setDead(true)
        }
      }}
    />
  )
}

function CompetitorCard({ name, domain, url, strengths, weaknesses }: CompetitorAnalysis) {
  return (
    <div className="rounded-xl border border-[#023E8A]/12 bg-white p-5 dark:border-white/7 dark:bg-[#0a1829]">
      <div className="flex items-center gap-3 mb-4">
        <CompetitorLogo domain={domain} name={name} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-[#0c3f75] dark:text-[#c0daf5] leading-snug">{name}</p>
          <p className="text-[11px] text-[#8dafc8] dark:text-[#3a5a75] mt-0.5">{domain}</p>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-[#8dafc8] dark:text-[#3a5a75] hover:text-[#0077b6] dark:hover:text-[#38c5e8] transition-colors duration-150"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-emerald-600/70 dark:text-emerald-500/70 mb-2">Strengths</p>
          <ul className="space-y-1.5">
            {strengths.map((s) => (
              <li key={s} className="flex items-start gap-2 text-[11px] text-[#557293] dark:text-[#7ba8c8] leading-snug">
                <span className="mt-[4px] h-[3px] w-[3px] shrink-0 rounded-full bg-emerald-500/50" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-rose-500/70 mb-2">Weaknesses</p>
          <ul className="space-y-1.5">
            {weaknesses.map((w) => (
              <li key={w} className="flex items-start gap-2 text-[11px] text-[#557293] dark:text-[#7ba8c8] leading-snug">
                <span className="mt-[4px] h-[3px] w-[3px] shrink-0 rounded-full bg-rose-500/50" />
                {w}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export function CompetitorsList({ competitors }: { competitors: CompetitorAnalysis[] }) {
  if (!competitors?.length) {
    return (
      <p className="text-xs text-[#6d89a9] dark:text-[#4e6f8a] py-6 text-center">
        No competitor data available — analysis based on training knowledge
      </p>
    )
  }

  return (
    <div className="grid gap-3">
      {competitors.slice(0, 4).map((c) => (
        <CompetitorCard key={c.url} {...c} />
      ))}
    </div>
  )
}
