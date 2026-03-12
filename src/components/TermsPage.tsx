export default function TermsPage() {
  return (
    <main className="pt-24">
      <section className="py-14 sm:py-16">
        <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
          <h1 className="font-['Manrope'] text-5xl font-extrabold tracking-tight text-[#0a0a12] dark:text-[#d0e8fa] sm:text-6xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-sm text-[#7ba8c8]">Last updated: March 2026</p>

          <div className="mt-10 space-y-8 text-[#4f6d8d] dark:text-[#a0c4e0]">
            <Section title="Acceptance of Terms">
              By accessing or using IdeaPick ("the Service"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.
            </Section>

            <Section title="Description of Service">
              IdeaPick is an idea validation tool that uses AI and App Store market signals to help builders discover and evaluate product opportunities. The Service is provided as-is and may change over time.
            </Section>

            <Section title="Free Tier">
              The free tier allows one idea generation per browser session. This limit is enforced via browser localStorage. Circumventing this limit (e.g., by clearing storage repeatedly) is permitted for personal use but not for automated or bulk access.
            </Section>

            <Section title="Acceptable Use">
              You agree not to:
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Use the Service for automated scraping, bulk generation, or API abuse.</li>
                <li>Attempt to reverse-engineer or extract the underlying models or data.</li>
                <li>Submit prompts containing illegal, harmful, or abusive content.</li>
                <li>Resell or redistribute outputs as your own product without meaningful transformation.</li>
              </ul>
            </Section>

            <Section title="Intellectual Property">
              The IdeaPick interface, branding, and code are owned by IdeaPick. AI-generated outputs produced through your prompts are yours to use freely. We make no claim of ownership over them.
            </Section>

            <Section title="Disclaimer of Warranties">
              The Service is provided "as is" without any warranties, express or implied. We do not guarantee the accuracy, completeness, or commercial viability of any generated idea or market signal. Use your own judgment before making business decisions.
            </Section>

            <Section title="Limitation of Liability">
              To the maximum extent permitted by law, IdeaPick shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Service.
            </Section>

            <Section title="Termination">
              We reserve the right to suspend or terminate access to the Service at any time, with or without notice, for violations of these terms or for any other reason at our discretion.
            </Section>

            <Section title="Changes to Terms">
              We may update these terms at any time. Continued use of the Service after changes are posted constitutes acceptance of the revised terms.
            </Section>

            <Section title="Contact">
              Questions about these terms? Contact us at{' '}
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
