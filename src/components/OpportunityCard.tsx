import type { Idea, DifficultyLevel, SignalLevel } from '@/types'
import { computeOpportunityScore } from '@/lib/scoring'

const difficultyBadge: Record<DifficultyLevel, string> = {
  Easy:   'text-emerald-600 border-emerald-500/30 dark:text-emerald-400 dark:border-emerald-400/30',
  Medium: 'text-amber-600   border-amber-500/30   dark:text-amber-400   dark:border-amber-400/30',
  Hard:   'text-rose-600    border-rose-500/30    dark:text-rose-400    dark:border-rose-400/30',
}

const signalTag: Record<SignalLevel, string> = {
  High:   'text-emerald-700 border-emerald-500/25 bg-emerald-50   dark:text-emerald-400 dark:border-emerald-400/20 dark:bg-emerald-400/[0.06]',
  Medium: 'text-amber-700   border-amber-500/25   bg-amber-50     dark:text-amber-400   dark:border-amber-400/20   dark:bg-amber-400/[0.06]',
  Low:    'text-[#6d89a9]   border-[#023E8A]/15   bg-[#f0f7ff]   dark:text-[#4e6f8a]   dark:border-white/8        dark:bg-white/4',
}

const competitionTag: Record<SignalLevel, string> = {
  Low:    'text-emerald-700 border-emerald-500/25 bg-emerald-50   dark:text-emerald-400 dark:border-emerald-400/20 dark:bg-emerald-400/[0.06]',
  Medium: 'text-amber-700   border-amber-500/25   bg-amber-50     dark:text-amber-400   dark:border-amber-400/20   dark:bg-amber-400/[0.06]',
  High:   'text-rose-600    border-rose-500/25    bg-rose-50      dark:text-rose-400    dark:border-rose-400/20    dark:bg-rose-400/[0.06]',
}

function Tag({ label, value, style }: { label: string; value: string; style: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded border px-2 py-1 text-[9px] font-bold uppercase tracking-widest ${style}`}>
      <span className="opacity-50">{label}</span>
      <span className="opacity-30">·</span>
      {value}
    </span>
  )
}

const DT = 'w-16 shrink-0 text-[9px] font-bold uppercase tracking-widest text-[#8dafc8] dark:text-[#3a5a75] pt-[1px]'
const DD = 'text-xs text-[#557293] dark:text-[#7ba8c8] leading-snug'

interface OpportunityCardProps extends Idea {
  onExplore: () => void
}

export function OpportunityCard({
  title, pitch, problem, audience, difficulty,
  marketDemand, competitionLevel, onExplore,
  ...rest
}: OpportunityCardProps) {
  const idea = { title, pitch, problem, audience, difficulty, marketDemand, competitionLevel, ...rest } as Idea
  const score = computeOpportunityScore(idea)

  return (
    <div
      className="group rounded-xl border border-[#023E8A]/12 bg-white p-5 transition-colors duration-200 hover:border-[#0077b6]/30 cursor-pointer dark:border-white/7 dark:bg-[#0a1829]"
      onClick={onExplore}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-[14px] font-bold uppercase tracking-wide text-[#0c3f75] dark:text-[#c0daf5] leading-snug">
          {title}
        </h3>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] font-bold text-[#6d89a9] dark:text-[#4e6f8a]">
            <span className="text-[#0c3f75] dark:text-[#c0daf5]">{score}</span>/10
          </span>
          <span className={`rounded-sm border px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest ${difficultyBadge[difficulty]}`}>
            {difficulty}
          </span>
        </div>
      </div>

      <p className="text-xs text-[#6d89a9] dark:text-[#4e6f8a] leading-relaxed line-clamp-1 mb-3">{pitch}</p>

      <dl className="space-y-1.5 mb-4">
        <div className="flex gap-2">
          <dt className={DT}>Problem</dt>
          <dd className={DD}>{problem}</dd>
        </div>
        <div className="flex gap-2">
          <dt className={DT}>Audience</dt>
          <dd className={DD}>{audience}</dd>
        </div>
      </dl>

      <div className="flex flex-wrap items-center gap-2">
        <Tag label="Demand"      value={marketDemand}    style={signalTag[marketDemand]} />
        <Tag label="Competition" value={competitionLevel} style={competitionTag[competitionLevel]} />
        <Tag label="Build"       value={difficulty}       style={signalTag[difficulty === 'Easy' ? 'High' : difficulty === 'Medium' ? 'Medium' : 'Low']} />

        <span className="ml-auto text-[10px] font-bold uppercase tracking-widest text-[#6d89a9] group-hover:text-[#0077b6] dark:text-[#4e6f8a] dark:group-hover:text-[#38c5e8] transition-colors duration-150">
          Explore →
        </span>
      </div>
    </div>
  )
}
