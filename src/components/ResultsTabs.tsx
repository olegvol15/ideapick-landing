import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { OpportunityCard } from './OpportunityCard'
import { OpportunityModal } from './OpportunityModal'
import { MarketDashboard } from './MarketDashboard'
import { CompetitorsList } from './CompetitorsList'
import type { GenerateResponse, Idea } from '@/types'

type Tab = 'opportunities' | 'market' | 'competitors'

const TABS: { id: Tab; label: string }[] = [
  { id: 'opportunities', label: 'Opportunities' },
  { id: 'market',        label: 'Market' },
  { id: 'competitors',   label: 'Competitors' },
]

interface ResultsTabsProps {
  result: GenerateResponse
  visibleCount: number
}

export function ResultsTabs({ result, visibleCount }: ResultsTabsProps) {
  const [active, setActive] = useState<Tab>('opportunities')
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null)

  return (
    <>
      <div>
        {/* Tab bar */}
        <div className="flex border-b border-[#023E8A]/12 dark:border-white/7 mb-6">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`relative px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors duration-150 ${
                active === tab.id
                  ? 'text-[#0077b6] dark:text-[#38c5e8]'
                  : 'text-[#6d89a9] dark:text-[#4e6f8a] hover:text-[#0c3f75] dark:hover:text-[#c0daf5]'
              }`}
            >
              {tab.label}
              {active === tab.id && (
                <motion.span
                  layoutId="tab-indicator"
                  className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#0077b6] dark:bg-[#38c5e8] rounded-t-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            {active === 'opportunities' && (
              <div className="grid gap-3">
                <AnimatePresence>
                  {result.ideas.slice(0, visibleCount).map((idea) => (
                    <motion.div
                      key={idea.title}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.38, ease: 'easeOut' }}
                    >
                      <OpportunityCard {...idea} onExplore={() => setSelectedIdea(idea)} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {active === 'market' && (
              <MarketDashboard
                marketContext={result.marketContext}
                gaps={result.gaps}
              />
            )}

            {active === 'competitors' && (
              <CompetitorsList competitors={result.competitorAnalysis} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <OpportunityModal idea={selectedIdea} onClose={() => setSelectedIdea(null)} />
    </>
  )
}
