import { TrendingUp, ArrowRight } from 'lucide-react'
import type { MarketContext, Gap } from '@/types'

interface MarketDashboardProps {
  marketContext: MarketContext
  gaps: Gap[]
}

function ScoreBar({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, value))
  const color = pct >= 70 ? 'bg-emerald-500' : pct >= 45 ? 'bg-amber-500' : 'bg-rose-500'
  return (
    <div className="mt-2 h-1.5 w-full rounded-full bg-[#023E8A]/10 dark:bg-white/8">
      <div className={`h-1.5 rounded-full transition-all duration-700 ${color}`} style={{ width: `${pct}%` }} />
    </div>
  )
}

function StatBox({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-[#023E8A]/10 bg-[#f0f7ff] p-4 dark:border-white/6 dark:bg-[#060d19]/60">
      <p className="text-[9px] font-bold uppercase tracking-widest text-[#8dafc8] dark:text-[#3a5a75] mb-1.5">{label}</p>
      <p className="text-base font-bold text-[#0c3f75] dark:text-[#c0daf5] leading-none">{value}</p>
      {sub && <p className="mt-1 text-[10px] text-[#6d89a9] dark:text-[#4e6f8a]">{sub}</p>}
    </div>
  )
}

export function MarketDashboard({ marketContext, gaps }: MarketDashboardProps) {
  const { theme, marketCondition, opportunityScore, marketSize, growthRate, signals, mainPatterns, competitorsFound } = marketContext
  const topGap = gaps?.[0]

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-[#023E8A]/12 bg-white p-5 dark:border-white/7 dark:bg-[#0a1829]">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-3.5 w-3.5 text-[#0077b6]/70 dark:text-[#38c5e8]/70" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6d89a9] dark:text-[#4e6f8a]">Market Overview</span>
          <span className="ml-auto text-[10px] text-[#8dafc8] dark:text-[#3a5a75]">{competitorsFound} sources</span>
        </div>

        <p className="text-sm font-bold text-[#0c3f75] dark:text-[#c0daf5] mb-0.5">{theme}</p>
        <p className="text-xs text-[#6d89a9] dark:text-[#4e6f8a] mb-4">{marketCondition}</p>

        <div className="mb-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#8dafc8] dark:text-[#3a5a75]">Opportunity Score</span>
            <span className="text-xs font-bold text-[#0c3f75] dark:text-[#c0daf5]">{opportunityScore}/100</span>
          </div>
          <ScoreBar value={opportunityScore} />
        </div>

        <div className="grid grid-cols-3 gap-2.5 mt-4">
          <StatBox label="Market Size" value={marketSize} />
          <StatBox label="Growth Rate" value={growthRate} />
          <StatBox label="Competition" value={marketCondition.split(' ')[0]} sub={`${competitorsFound} found`} />
        </div>
      </div>

      {signals?.length > 0 && (
        <div className="rounded-xl border border-[#023E8A]/12 bg-white p-5 dark:border-white/7 dark:bg-[#0a1829]">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6d89a9] dark:text-[#4e6f8a] mb-3">Market Signals</p>
          <ul className="space-y-2.5">
            {signals.map((s, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-[#557293] dark:text-[#7ba8c8] leading-relaxed">
                <ArrowRight className="h-3 w-3 shrink-0 mt-0.5 text-[#0077b6]/60 dark:text-[#38c5e8]/60" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {mainPatterns?.length > 0 && (
        <div className="rounded-xl border border-[#023E8A]/12 bg-white p-5 dark:border-white/7 dark:bg-[#0a1829]">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6d89a9] dark:text-[#4e6f8a] mb-3">Key Patterns</p>
          <ul className="space-y-2">
            {mainPatterns.map((p, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-[#6d89a9] dark:text-[#4e6f8a] leading-relaxed">
                <span className="mt-[5px] h-[4px] w-[4px] shrink-0 rounded-full bg-[#023E8A]/20 dark:bg-white/20" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      )}

      {topGap && (
        <div className="rounded-xl border border-[#0077b6]/20 bg-[#CAF0F8]/30 p-5 dark:border-[#38c5e8]/15 dark:bg-[#0077b6]/[0.06]">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0077b6]/70 dark:text-[#38c5e8]/60 mb-2">Top Opportunity Gap</p>
          <p className="text-sm font-semibold text-[#0c3f75] dark:text-[#c0daf5] mb-3">{topGap.title}</p>
          <dl className="space-y-1.5">
            <div className="flex gap-3">
              <dt className="w-20 shrink-0 text-[9px] font-bold uppercase tracking-widest text-[#8dafc8] dark:text-[#3a5a75] pt-[1px]">Currently</dt>
              <dd className="text-xs text-[#6d89a9] dark:text-[#4e6f8a] leading-snug">{topGap.currentMarket}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-20 shrink-0 text-[9px] font-bold uppercase tracking-widest text-[#8dafc8] dark:text-[#3a5a75] pt-[1px]">Missing</dt>
              <dd className="text-xs text-[#6d89a9] dark:text-[#4e6f8a] leading-snug">{topGap.missing}</dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  )
}
