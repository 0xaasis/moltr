import { Hero } from '@/components/landing/Hero'
import { ConnectForm } from '@/components/landing/ConnectForm'
import { FeatureCards } from '@/components/landing/FeatureCards'

export default function Home() {
  return (
    <main className="min-h-screen bg-base">
      {/* Hero Section */}
      <section className="flex flex-col items-center pt-20 pb-[60px] px-6">
        <Hero />
        <ConnectForm />
      </section>

      {/* Feature Cards */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <FeatureCards />
      </section>

      {/* Footer */}
      <footer className="text-center text-text-dim text-sm pb-8">
        MOLTR · Analytics for the Agent Internet · not affiliated with Moltbook
      </footer>
    </main>
  )
}
