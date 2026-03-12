import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('https://formspree.io/f/xpqjgvdr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) { setStatus('success'); setEmail('') }
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0077B6]/12 dark:bg-[#0077B6]/20">
          <svg className="h-5 w-5 text-[#0077B6] dark:text-[#38c5e8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="font-semibold text-[#0a3f77] dark:text-[#c0daf5]">You're on the list!</p>
        <p className="text-sm text-[#4a6a8a] dark:text-[#7ba8c8]">We'll reach out as soon as a spot opens up.</p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md">
      <form
        onSubmit={handleSubmit}
        className="flex w-full items-center gap-2 rounded-2xl border border-[#023E8A]/14 bg-white/90 p-2 dark:border-white/8 dark:bg-white/5"
      >
        <Input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
          className="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 placeholder:text-[#8aaac4] dark:text-[#c0daf5] dark:placeholder:text-[#3a5a75]"
        />
        <Button
          type="submit"
          disabled={status === 'loading'}
          className="shrink-0 rounded-xl bg-[#0077B6] px-5 font-semibold text-white shadow-[0_4px_20px_rgba(0,119,182,0.35)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#0368a0] disabled:opacity-60"
        >
          {status === 'loading' ? 'Joining…' : 'Get notified'}
        </Button>
      </form>
      {status === 'error' && (
        <p className="mt-2 text-center text-xs text-red-500 dark:text-red-400">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  )
}
