import { useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('https://formspree.io/f/mnjgjaeq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      if (res.ok) {
        setStatus('success')
        setName(''); setEmail(''); setMessage('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="pt-24">
      <section className="min-h-[calc(100vh-80px)] py-14 sm:py-16">
        <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">

          <h1 className="font-['Manrope'] text-5xl font-extrabold tracking-tight text-[#0a0a12] dark:text-[#d0e8fa] sm:text-6xl">
            Contact us
          </h1>
          <p className="mt-6 text-base leading-relaxed text-[#587596] dark:text-[#7ba8c8]">
            Have a question or just want to say hi?<br />
            We'd love to hear from you.
          </p>

          {status === 'success' ? (
            <div className="mt-12 flex flex-col items-center gap-3 rounded-2xl border border-[#023E8A]/14 bg-white/82 py-14 text-center dark:border-white/7 dark:bg-[#0a1829]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0077B6]/12 dark:bg-[#0077B6]/20">
                <svg className="h-6 w-6 text-[#0077B6] dark:text-[#38c5e8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-['Manrope'] text-xl font-bold text-[#0a3f77] dark:text-[#c0daf5]">Message sent!</p>
              <p className="text-sm text-[#587596] dark:text-[#7ba8c8]">We'll get back to you as soon as possible.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-12 space-y-6">
              {/* Name + Email row */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#3d628b] dark:text-[#7ba8c8]">Name</label>
                  <Input
                    required
                    placeholder="Oleh"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    disabled={status === 'loading'}
                    className="rounded-xl border-[#023E8A]/15 bg-[#f4fafd] text-[#12395f] placeholder:text-[#9ab4cc] dark:border-white/7 dark:bg-white/5 dark:text-[#c0daf5] dark:placeholder:text-[#3a5a75]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#3d628b] dark:text-[#7ba8c8]">Email</label>
                  <Input
                    type="email"
                    required
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={status === 'loading'}
                    className="rounded-xl border-[#023E8A]/15 bg-[#f4fafd] text-[#12395f] placeholder:text-[#9ab4cc] dark:border-white/7 dark:bg-white/5 dark:text-[#c0daf5] dark:placeholder:text-[#3a5a75]"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#3d628b] dark:text-[#7ba8c8]">Message</label>
                <Textarea
                  required
                  placeholder="Your message..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  disabled={status === 'loading'}
                  className="min-h-[160px] rounded-xl border-[#023E8A]/15 bg-[#f4fafd] text-[#12395f] placeholder:text-[#9ab4cc] dark:border-white/7 dark:bg-white/5 dark:text-[#c0daf5] dark:placeholder:text-[#3a5a75]"
                />
              </div>

              {status === 'error' && (
                <p className="text-sm text-red-500 dark:text-red-400">Something went wrong. Please try again.</p>
              )}

              <Button
                type="submit"
                disabled={status === 'loading'}
                className="h-13 w-full rounded-xl bg-[#0a1929] text-base font-semibold text-white transition hover:bg-[#0d2540] disabled:opacity-60 dark:bg-white/90 dark:text-[#0a1929] dark:hover:bg-white"
              >
                {status === 'loading' ? 'Sending…' : 'Submit'}
              </Button>
            </form>
          )}

        </div>
      </section>
    </main>
  )
}
