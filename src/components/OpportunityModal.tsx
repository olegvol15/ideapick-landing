import { useEffect, useState } from 'react'
import { X, Loader2, ShieldCheck, Wand2 } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Idea, DifficultyLevel, SignalLevel, ValidationResult } from '@/types'
import { computeOpportunityScore } from '@/lib/scoring'

const API_BASE = (import.meta.env.VITE_API_URL as string | undefined) ?? ''

const difficultyBadge: Record<DifficultyLevel, string> = {
  Easy:   'text-emerald-600 border-emerald-500/30 dark:text-emerald-400 dark:border-emerald-400/30',
  Medium: 'text-amber-600   border-amber-500/30   dark:text-amber-400   dark:border-amber-400/30',
  Hard:   'text-rose-600    border-rose-500/30    dark:text-rose-400    dark:border-rose-400/30',
}

const signalColor: Record<SignalLevel, string> = {
  High:   'text-emerald-600 dark:text-emerald-400',
  Medium: 'text-amber-600 dark:text-amber-400',
  Low:    'text-[#6d89a9] dark:text-[#4e6f8a]',
}

const competitionColor: Record<SignalLevel, string> = {
  Low:    'text-emerald-600 dark:text-emerald-400',
  Medium: 'text-amber-600 dark:text-amber-400',
  High:   'text-rose-600 dark:text-rose-400',
}

const DT = 'w-28 shrink-0 text-[9px] font-bold uppercase tracking-widest text-[#8dafc8] dark:text-[#3a5a75] pt-[1px]'
const DD = 'text-sm text-[#0c3f75] dark:text-[#c0daf5] leading-snug'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-[#023E8A]/10 dark:border-white/6 pt-5">
      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8dafc8] dark:text-[#3a5a75] mb-3">{title}</p>
      {children}
    </div>
  )
}

function ScoreBar({ value }: { value: number }) {
  const pct   = Math.max(0, Math.min(100, value))
  const color = pct >= 70 ? 'bg-emerald-500' : pct >= 45 ? 'bg-amber-500' : 'bg-rose-500'
  return (
    <div className="mt-1.5 h-1 w-full rounded-full bg-[#023E8A]/10 dark:bg-white/8">
      <div className={`h-1 rounded-full transition-all duration-700 ${color}`} style={{ width: `${pct}%` }} />
    </div>
  )
}

const REFINE_PRESETS = [
  'Make it simpler',
  'More profitable',
  'B2B focused',
  'AI-focused',
  'Easier to build',
]

interface Props {
  idea: Idea | null
  onClose: () => void
}

export function OpportunityModal({ idea, onClose }: Props) {
  const [displayIdea, setDisplayIdea] = useState<Idea | null>(null)
  const [refining, setRefining]       = useState(false)
  const [validation, setValidation]   = useState<ValidationResult | null>(null)
  const [validating, setValidating]   = useState(false)

  useEffect(() => {
    setDisplayIdea(idea)
    setValidation(null)
  }, [idea])

  // Escape key
  useEffect(() => {
    if (!idea) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [idea, onClose])


  async function handleRefine(preset: string) {
    if (!displayIdea || refining) return
    setRefining(true)
    try {
      const res     = await fetch(`${API_BASE}/api/refine`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea: displayIdea, instruction: preset }),
      })
      const refined = await res.json() as Idea
      setDisplayIdea(refined)
      setValidation(null)
    } finally {
      setRefining(false)
    }
  }

  async function handleValidate() {
    if (!displayIdea || validating) return
    setValidating(true)
    try {
      const res    = await fetch(`${API_BASE}/api/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea: displayIdea }),
      })
      const result = await res.json() as ValidationResult
      setValidation(result)
    } finally {
      setValidating(false)
    }
  }

  const i     = displayIdea
  const score = i ? computeOpportunityScore(i) : 0

  return (
    <AnimatePresence>
      {idea && i && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <div className="min-h-full flex items-start justify-center p-6 sm:p-10">
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-xl rounded-2xl border border-[#023E8A]/15 bg-white shadow-[0_32px_80px_rgba(2,62,138,0.2)] dark:border-white/7 dark:bg-[#0a1829] dark:shadow-[0_32px_80px_rgba(0,0,0,0.5)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 pb-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-sm border px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest ${difficultyBadge[i.difficulty]}`}>
                      {i.difficulty}
                    </span>
                    <span className="text-[10px] text-[#8dafc8] dark:text-[#3a5a75]">{i.confidence}% confidence</span>
                    <span className="text-[10px] text-[#8dafc8] dark:text-[#3a5a75]">·</span>
                    <span className="text-[10px] font-bold text-[#0c3f75] dark:text-[#c0daf5]">{score}/10</span>
                    <span className="text-[10px] text-[#8dafc8] dark:text-[#3a5a75]">score</span>
                  </div>
                  <button
                    onClick={onClose}
                    className="rounded-lg border border-[#023E8A]/15 p-1.5 text-[#6d89a9] hover:text-[#0c3f75] hover:border-[#023E8A]/30 dark:border-white/8 dark:text-[#4e6f8a] dark:hover:text-[#c0daf5] dark:hover:border-white/15 transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>

                <h2 className="text-xl font-bold uppercase tracking-wide text-[#0c3f75] dark:text-[#c0daf5] leading-snug mb-1">
                  {i.title}
                </h2>
                <p className="text-sm text-[#557293] dark:text-[#7ba8c8] leading-relaxed">{i.pitch}</p>
              </div>

              {/* Body */}
              <div className="px-6 pb-6 space-y-5">

                <Section title="Idea Overview">
                  <dl className="space-y-2.5">
                    <div className="flex gap-3">
                      <dt className={DT}>Problem</dt>
                      <dd className={DD}>{i.problem}</dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className={DT}>Audience</dt>
                      <dd className={DD}>{i.audience}</dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className={DT}>Market Gap</dt>
                      <dd className={DD}>{i.gap}</dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className={DT}>Differentiation</dt>
                      <dd className={DD}>{i.differentiation}</dd>
                    </div>
                  </dl>
                </Section>

                <Section title="Market Intelligence">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-lg border border-[#023E8A]/10 bg-[#f0f7ff] p-3 dark:border-white/6 dark:bg-[#060d19]/60">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-[#8dafc8] dark:text-[#3a5a75] mb-1">Demand</p>
                      <p className={`text-sm font-bold ${signalColor[i.marketDemand]}`}>{i.marketDemand}</p>
                    </div>
                    <div className="rounded-lg border border-[#023E8A]/10 bg-[#f0f7ff] p-3 dark:border-white/6 dark:bg-[#060d19]/60">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-[#8dafc8] dark:text-[#3a5a75] mb-1">Competition</p>
                      <p className={`text-sm font-bold ${competitionColor[i.competitionLevel]}`}>{i.competitionLevel}</p>
                    </div>
                    <div className="rounded-lg border border-[#023E8A]/10 bg-[#f0f7ff] p-3 dark:border-white/6 dark:bg-[#060d19]/60">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-[#8dafc8] dark:text-[#3a5a75] mb-1">Monetization</p>
                      <p className={`text-sm font-bold ${signalColor[i.monetizationPotential]}`}>{i.monetizationPotential}</p>
                    </div>
                  </div>
                </Section>

                {/* Refine — disabled, coming soon */}
                <Section title="Refine This Idea">
                  <div className="flex flex-wrap gap-2">
                    {REFINE_PRESETS.map((preset) => (
                      <button
                        key={preset}
                        onClick={() => handleRefine(preset)}
                        disabled
                        className="flex items-center gap-1.5 rounded-lg border border-[#023E8A]/12 bg-[#f0f7ff] px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#8dafc8] opacity-40 cursor-not-allowed dark:border-white/6 dark:bg-[#081527] dark:text-[#3a5a75]"
                        title="Coming soon"
                      >
                        {refining
                          ? <Loader2 className="h-2.5 w-2.5 animate-spin" />
                          : <Wand2    className="h-2.5 w-2.5 opacity-50" />}
                        {preset}
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-[10px] text-[#8dafc8] dark:text-[#3a5a75]">Available in the full app</p>
                </Section>

                {/* Validate — disabled, coming soon */}
                <Section title="Validate Idea">
                  {!validation ? (
                    <div>
                      <button
                        onClick={handleValidate}
                        disabled
                        className="flex items-center gap-2 rounded-lg border border-[#023E8A]/12 bg-[#f0f7ff] px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[#8dafc8] opacity-40 cursor-not-allowed dark:border-white/6 dark:bg-[#081527] dark:text-[#3a5a75]"
                        title="Coming soon"
                      >
                        {validating
                          ? <Loader2    className="h-3 w-3 animate-spin" />
                          : <ShieldCheck className="h-3 w-3 opacity-60" />}
                        {validating ? 'Validating…' : 'Run Validation'}
                      </button>
                      <p className="mt-2 text-[10px] text-[#8dafc8] dark:text-[#3a5a75]">Available in the full app</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-[#8dafc8] dark:text-[#3a5a75]">Viability Score</span>
                          <span className="text-xs font-bold text-[#0c3f75] dark:text-[#c0daf5]">{validation.score}/100</span>
                        </div>
                        <ScoreBar value={validation.score} />
                      </div>

                      <p className="text-xs text-[#557293] dark:text-[#7ba8c8] leading-relaxed border-l-2 border-[#0077b6]/30 pl-3 italic">
                        {validation.verdict}
                      </p>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-widest text-emerald-600/70 dark:text-emerald-500/70 mb-2">Signals</p>
                          <ul className="space-y-1.5">
                            {validation.signals.map((s, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-[11px] text-[#557293] dark:text-[#7ba8c8] leading-snug">
                                <span className="mt-[4px] h-[3px] w-[3px] shrink-0 rounded-full bg-emerald-500/50" />
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-widest text-rose-500/70 mb-2">Risks</p>
                          <ul className="space-y-1.5">
                            {validation.risks.map((r, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-[11px] text-[#557293] dark:text-[#7ba8c8] leading-snug">
                                <span className="mt-[4px] h-[3px] w-[3px] shrink-0 rounded-full bg-rose-500/50" />
                                {r}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <button
                        onClick={() => setValidation(null)}
                        className="text-[10px] text-[#8dafc8] dark:text-[#3a5a75] hover:text-[#6d89a9] dark:hover:text-[#4e6f8a] transition-colors"
                      >
                        Clear validation
                      </button>
                    </div>
                  )}
                </Section>

              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
