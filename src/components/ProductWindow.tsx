import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Textarea } from './ui/textarea'
import type { ProductType, Difficulty } from '@/types'

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

// ─── Main ──────────────────────────────────────────────────────────────────────

export default function ProductWindow() {
  const [prompt, setPrompt] = useState('')
  const [productType, setProductType] = useState<ProductType | ''>('')
  const [difficulty, setDifficulty] = useState<Difficulty | ''>('')

  const cyclingPlaceholder = useCyclingPlaceholder()

  function handleGenerate() {
    document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })
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
            disabled={!prompt.trim()}
            className="h-11 w-full sm:w-auto"
          >
            Find Opportunities →
          </Button>
        </div>
      </div>
    </div>
  )
}
