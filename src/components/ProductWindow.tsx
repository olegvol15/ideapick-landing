import { useState, useEffect } from 'react'
import { Loader2, Sparkles, AlertTriangle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Textarea } from './ui/textarea'
import { ResultsTabs } from './ResultsTabs'
import type { GenerateResponse, ProductType, Difficulty } from '@/types'

const API_BASE = (import.meta.env.VITE_API_URL as string | undefined) ?? ''

type Phase = 'idle' | 'thinking' | 'generating' | 'streaming' | 'done' | 'gate' | 'error'

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

// ─── Gate helpers ──────────────────────────────────────────────────────────────

function getUsed(): boolean {
  try { return localStorage.getItem('ideapick_used') === '1' } catch { return false }
}

function markUsed(): void {
  try { localStorage.setItem('ideapick_used', '1') } catch { /* ignore */ }
}

// ─── Cycling placeholder ───────────────────────────────────────────────────────

const EXAMPLE_PROMPTS = [
  'I know React and Laravel and want to build something for developers...',
  'I want to build a productivity app for remote teams...',
  'I know Python and machine learning, looking for AI tool ideas...',
  'I want to build a mobile app for fitness tracking...',
  'I have experience in e-commerce and want to build a SaaS...',
]

function useCyclingPlaceholder() {
  const [text, setText] = useState('')
  const [promptIdx, setPromptIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = EXAMPLE_PROMPTS[promptIdx]
    const typeSpeed = isDeleting ? 18 : 38
    const pauseDelay = !isDeleting && text === current ? 1800 : 0

    const id = setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, text.length + 1))
        if (text.length + 1 === current.length) setIsDeleting(true)
      } else {
        setText(current.slice(0, text.length - 1))
        if (text.length - 1 === 0) {
          setIsDeleting(false)
          setPromptIdx(i => (i + 1) % EXAMPLE_PROMPTS.length)
        }
      }
    }, pauseDelay || typeSpeed)

    return () => clearTimeout(id)
  }, [text, isDeleting, promptIdx])

  return text
}

// ─── Inner components ──────────────────────────────────────────────────────────

function ThinkingIndicator({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="flex items-center gap-[5px]">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block h-[7px] w-[7px] rounded-full bg-[#0077b6] dark:bg-[#38c5e8]"
            animate={{ opacity: [0.25, 1, 0.25], scale: [0.75, 1, 0.75] }}
            transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
          />
        ))}
      </div>
      <span className="text-sm text-[#6d89a9] dark:text-[#4e6f8a]">{label}</span>
    </div>
  )
}

function ResearchSkeletons() {
  return (
    <div>
      <div className="flex border-b border-[#023E8A]/12 dark:border-white/7 mb-6">
        {['Opportunities', 'Market', 'Competitors'].map((label, i) => (
          <div
            key={label}
            className={`px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest ${
              i === 0 ? 'text-[#0077b6] dark:text-[#38c5e8] border-b-2 border-[#0077b6] dark:border-[#38c5e8]' : 'text-[#8dafc8] dark:text-[#3a5a75]'
            }`}
          >
            {label}
          </div>
        ))}
      </div>
      <div className="grid gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-xl border border-[#023E8A]/12 bg-white p-5 dark:border-white/7 dark:bg-[#0a1829]">
            <div className="flex items-start justify-between gap-3 mb-2">
              <Skeleton className="h-4 w-2/5" />
              <Skeleton className="h-4 w-12 shrink-0" />
            </div>
            <Skeleton className="h-3 w-3/4 mb-3" />
            <div className="space-y-2 mb-4">
              <div className="flex gap-2"><Skeleton className="h-3 w-14 shrink-0" /><Skeleton className="h-3 flex-1" /></div>
              <div className="flex gap-2"><Skeleton className="h-3 w-14 shrink-0" /><Skeleton className="h-3 flex-1" /></div>
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main ──────────────────────────────────────────────────────────────────────

export default function ProductWindow() {
  const [prompt, setPrompt] = useState('')
  const [productType, setProductType] = useState<ProductType | ''>('')
  const [difficulty, setDifficulty] = useState<Difficulty | ''>('')
  const [result, setResult] = useState<GenerateResponse | null>(null)
  const [phase, setPhase] = useState<Phase>('idle')
  const [visibleCount, setVisibleCount] = useState(0)
  const [errorMsg, setErrorMsg] = useState('')

  const cyclingPlaceholder = useCyclingPlaceholder()
  const isGenerating = phase === 'thinking' || phase === 'generating' || phase === 'streaming'

  async function handleGenerate() {
    if (!prompt.trim() || isGenerating) return

    // Gate: already used the free generation
    if (getUsed()) {
      setPhase('gate')
      return
    }

    setPhase('thinking')
    setResult(null)
    setVisibleCount(0)
    setErrorMsg('')
    await wait(800)

    setPhase('generating')
    markUsed()

    let data: GenerateResponse
    try {
      const res = await fetch(`${API_BASE}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, productType, difficulty }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error((body as { error?: string }).error ?? 'Something went wrong')
      }

      data = await res.json() as GenerateResponse
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
      setPhase('error')
      return
    }

    setResult(data)
    setPhase('streaming')

    for (let i = 0; i < data.ideas.length; i++) {
      if (i > 0) await wait(380)
      setVisibleCount(i + 1)
    }

    setPhase('done')
  }

  return (
    <div className="overflow-hidden rounded-[1.6rem] border border-[#023E8A]/15 bg-white/93 shadow-[0_28px_80px_rgba(2,62,138,0.2)] dark:border-white/7 dark:bg-[#060d19]/80">
      {/* Browser chrome */}
      <div className="flex items-center gap-3 border-b border-[#023E8A]/10 bg-[#eff8fc] px-4 py-3 dark:border-white/6 dark:bg-[#081527]">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 rounded-md border border-[#023E8A]/14 bg-white/80 px-3 py-1 text-center font-mono text-[11px] text-[#46688e] dark:border-white/8 dark:bg-white/5 dark:text-[#4e6f8a]">
          ideapick.app
        </div>
      </div>

      {/* App UI */}
      <div className="bg-white/93 p-5 dark:bg-[#060d19]/80 sm:p-6">

        {/* Input */}
        <Textarea
          rows={4}
          className="min-h-[120px] rounded-xl border-[#023E8A]/15 bg-[#f8fdff] text-sm leading-relaxed text-[#12395f] placeholder:text-[#7ba8c8] dark:border-white/7 dark:bg-[#081527] dark:text-[#c0daf5] dark:placeholder:text-[#3a5a75]"
          placeholder={cyclingPlaceholder}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.metaKey || e.ctrlKey) && handleGenerate()}
        />

        {/* Filters + Button */}
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-1 gap-2.5">
            <div className="flex-1">
              <Select value={productType || undefined} onValueChange={(v) => setProductType(v as ProductType)}>
                <SelectTrigger className="h-11 border-[#023E8A]/15 bg-white dark:border-white/7 dark:bg-[#081527] dark:text-[#c0daf5]">
                  <SelectValue placeholder="Product Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SaaS">SaaS</SelectItem>
                  <SelectItem value="AI Tool">AI Tool</SelectItem>
                  <SelectItem value="Mobile App">Mobile App</SelectItem>
                  <SelectItem value="Chrome Extension">Chrome Extension</SelectItem>
                  <SelectItem value="Dev Tool">Dev Tool</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Select value={difficulty || undefined} onValueChange={(v) => setDifficulty(v as Difficulty)}>
                <SelectTrigger className="h-11 border-[#023E8A]/15 bg-white dark:border-white/7 dark:bg-[#081527] dark:text-[#c0daf5]">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="h-11 w-full sm:w-auto"
          >
            {isGenerating
              ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Researching...</>
              : 'Find Opportunities →'}
          </Button>
        </div>

        {/* Results area */}
        <AnimatePresence mode="wait">

          {/* Idle */}
          {phase === 'idle' && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="mt-10 flex flex-col items-center gap-5 rounded-xl border border-dashed border-[#023E8A]/15 px-8 py-20 text-center dark:border-white/8"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#023E8A]/20 bg-[#CAF0F8]/60 text-[#0077b6] dark:border-white/8 dark:bg-[#0077b6]/10 dark:text-[#38c5e8]">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-[#154978] dark:text-[#c0daf5]">Your research will appear here</p>
                <p className="text-xs leading-relaxed text-[#5a7596] dark:text-[#4e6f8a]">
                  Describe your skills or a problem above,<br />then click Find Opportunities.
                </p>
              </div>
            </motion.div>
          )}

          {/* Thinking */}
          {phase === 'thinking' && (
            <motion.div
              key="thinking"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-10 flex justify-center"
            >
              <ThinkingIndicator label="Analyzing your prompt…" />
            </motion.div>
          )}

          {/* Generating — skeleton */}
          {phase === 'generating' && (
            <motion.div
              key="generating"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-8"
            >
              <ResearchSkeletons />
            </motion.div>
          )}

          {/* Results */}
          {(phase === 'streaming' || phase === 'done') && result && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="mt-8"
            >
              <ResultsTabs result={result} visibleCount={visibleCount} />
            </motion.div>
          )}

          {/* Gate — used free generation */}
          {phase === 'gate' && (
            <motion.div
              key="gate"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-10 flex flex-col items-center gap-5 rounded-xl border border-[#0077B6]/20 bg-[#f7fcff] px-8 py-16 text-center dark:border-[#0077B6]/20 dark:bg-[#0a1829]"
            >
              <p className="text-xl text-[#0077b6] dark:text-[#38c5e8]">✦</p>
              <div className="space-y-2">
                <p className="font-['Manrope'] text-xl font-bold text-[#0a3f77] dark:text-[#c0daf5]">You've used your free idea.</p>
                <p className="max-w-md text-sm text-[#587596] dark:text-[#7ba8c8]">
                  Join the waitlist to generate more ideas and get early access.
                </p>
              </div>
              <a
                href="#final-cta"
                className="mt-1 inline-flex items-center gap-1.5 rounded-lg bg-[#0077B6] px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white transition-all hover:bg-[#0368a0]"
              >
                Join Waitlist →
              </a>
            </motion.div>
          )}

          {/* Error */}
          {phase === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-10 flex flex-col items-center gap-4 rounded-xl border border-red-500/20 bg-red-50/60 px-8 py-12 text-center dark:border-red-500/15 dark:bg-red-500/5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-red-500/30 bg-red-50 dark:bg-red-500/10">
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </div>
              <div className="space-y-1.5">
                <p className="text-sm font-semibold text-[#154978] dark:text-[#c0daf5]">Research failed</p>
                <p className="text-xs leading-relaxed text-[#5a7596] dark:text-[#4e6f8a]">{errorMsg}</p>
              </div>
              <button
                onClick={() => { setPhase('idle'); setErrorMsg('') }}
                className="mt-1 text-xs font-bold uppercase tracking-widest text-[#0077b6] dark:text-[#38c5e8] hover:brightness-125 transition-all"
              >
                Try again →
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}
