export default function PrivacyPage() {
  return (
    <main className="pt-24">
      <section className="py-14 sm:py-16">
        <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
          <h1 className="font-['Manrope'] text-5xl font-extrabold tracking-tight text-[#0a0a12] dark:text-[#d0e8fa] sm:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-[#7ba8c8]">Last updated: March 2026</p>

          <div className="mt-10 space-y-8 text-[#4f6d8d] dark:text-[#a0c4e0]">
            <Section title="Overview">
              IdeaPick ("we", "us", "our") is committed to protecting your privacy. This policy explains what data we collect, how we use it, and your rights regarding that data.
            </Section>

            <Section title="Information We Collect">
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li><strong className="text-[#0a3f77] dark:text-[#c0daf5]">Email address</strong> - when you join the waitlist or contact us.</li>
                <li><strong className="text-[#0a3f77] dark:text-[#c0daf5]">Prompts and inputs</strong> - text you enter into the idea generator, used solely to generate results.</li>
                <li><strong className="text-[#0a3f77] dark:text-[#c0daf5]">Usage data</strong> - basic analytics such as page views and session duration, collected anonymously.</li>
                <li><strong className="text-[#0a3f77] dark:text-[#c0daf5]">Local storage</strong> - a flag stored in your browser to track free usage limits. No personal data is stored here.</li>
              </ul>
            </Section>

            <Section title="How We Use Your Data">
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>To operate and improve the IdeaPick service.</li>
                <li>To send you product updates and launch notifications (only if you signed up for the waitlist).</li>
                <li>To respond to support and contact requests.</li>
                <li>We do not sell, rent, or share your personal data with third parties for marketing purposes.</li>
              </ul>
            </Section>

            <Section title="Third-Party Services">
              We use the following services which may process your data:
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li><strong className="text-[#0a3f77] dark:text-[#c0daf5]">Formspree</strong> - handles form submissions (waitlist, contact). Subject to Formspree's privacy policy.</li>
                <li><strong className="text-[#0a3f77] dark:text-[#c0daf5]">OpenAI / Groq</strong> - powers idea generation. Prompts may be processed by their APIs.</li>
              </ul>
            </Section>

            <Section title="Cookies">
              IdeaPick does not use tracking cookies. We use browser localStorage only for functional purposes (e.g., remembering your theme preference and free usage state).
            </Section>

            <Section title="Data Retention">
              Waitlist emails are retained until you unsubscribe. Contact form submissions are retained for up to 12 months. You may request deletion of your data at any time.
            </Section>

            <Section title="Your Rights">
              You have the right to access, correct, or delete your personal data at any time. To exercise these rights, contact us at{' '}
              <a href="mailto:hello@ideapick.app" className="text-[#0077b6] hover:underline dark:text-[#38c5e8]">hello@ideapick.app</a>.
            </Section>

            <Section title="Changes to This Policy">
              We may update this policy from time to time. The latest version will always be available at this URL with the updated date shown above.
            </Section>

            <Section title="Contact">
              Questions about this policy? Reach us at{' '}
              <a href="mailto:hello@ideapick.app" className="text-[#0077b6] hover:underline dark:text-[#38c5e8]">hello@ideapick.app</a>.
            </Section>
          </div>
        </div>
      </section>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-['Manrope'] text-xl font-bold text-[#0a3f77] dark:text-[#c0daf5]">{title}</h2>
      <div className="mt-2 leading-relaxed">{children}</div>
    </div>
  )
}
