export default function VideoDemo() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <p className="reveal-on-scroll mb-3 font-mono text-xs uppercase tracking-wide text-[#0077b6] dark:text-[#38c5e8]">Demo</p>
        <h2 className="reveal-on-scroll font-['Manrope'] text-3xl font-extrabold text-[#0a3f77] dark:text-[#d0e8fa] sm:text-5xl">
          See IdeaPick in action
        </h2>
        <p className="reveal-on-scroll mt-3 text-[#567392] dark:text-[#7ba8c8]">A quick walkthrough from prompt to roadmap.</p>

        <div className="reveal-on-scroll mt-8 flex aspect-video w-full items-center justify-center rounded-3xl border border-[#023E8A]/14 bg-white/70 shadow-[0_20px_56px_rgba(2,62,138,0.14)] dark:border-white/7 dark:bg-[#0a1829]/70">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#023E8A]/18 bg-[#eff8fc] text-2xl dark:border-white/8 dark:bg-[#081527]">
              🎬
            </span>
            <p className="font-['Manrope'] text-xl font-bold text-[#0a3f77] dark:text-[#d0e8fa]">Coming soon</p>
            <p className="text-sm text-[#567392] dark:text-[#7ba8c8]">Product demo video is on its way.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
