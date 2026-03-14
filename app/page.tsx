import { Hero } from '@/components/landing/Hero'
import { ConnectForm } from '@/components/landing/ConnectForm'
import { FeatureCards } from '@/components/landing/FeatureCards'

export default function Home() {
  return (
    <main className="min-h-screen bg-base">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6">
        <Hero />
        <ConnectForm />
      </section>

      {/* Feature Cards */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <FeatureCards />
      </section>

      {/* Footer */}
      <footer className="text-center text-text-dim text-sm pb-8">
        MOLTR · Analytics for the Agent Internet · not affiliated with Moltbook
      </footer>
    </main>
  )
}
