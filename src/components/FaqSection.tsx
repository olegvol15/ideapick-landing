import { Card, CardContent } from './ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'

const FAQS = [
  {
    q: 'How does IdeaPick validate app ideas?',
    a: 'It combines your prompt with live App Store market signals like demand, competition, and monetization patterns.',
  },
  {
    q: 'Is IdeaPick only for mobile apps?',
    a: 'No. You can explore SaaS, AI tools, mobile products, extensions, and developer tools from the same workflow.',
  },
  {
    q: 'Can I try it before paying?',
    a: 'Yes. You can start with the free flow and upgrade when you want deeper analysis and unlimited generation.',
  },
  {
    q: 'Do I need technical skills to use it?',
    a: 'No. You can use plain language prompts. IdeaPick is designed for both technical and non-technical founders.',
  },
]

export default function FaqSection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <p className="reveal-on-scroll mb-3 font-mono text-xs uppercase tracking-wide text-[#0077b6] dark:text-[#38c5e8]">
          FAQ
        </p>
        <h2 className="reveal-on-scroll font-['Manrope'] text-3xl font-extrabold text-[#0a3f77] dark:text-[#d0e8fa] sm:text-5xl">
          Frequently asked questions
        </h2>

        <Card className="reveal-on-scroll mt-7 rounded-3xl border-[#023E8A]/14 bg-white/82 p-2 dark:border-white/7 dark:bg-[#0a1829] sm:p-4">
          <CardContent className="p-0">
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, idx) => (
                <AccordionItem key={faq.q} value={`item-${idx}`} className="dark:border-white/7">
                  <AccordionTrigger className="dark:text-[#c0daf5] dark:hover:text-[#d0e8fa]">{faq.q}</AccordionTrigger>
                  <AccordionContent className="dark:text-[#7ba8c8]">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
