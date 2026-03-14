import { TrendingUp, BarChart2, Clock } from 'lucide-react'

const features = [
  {
    icon: TrendingUp,
    title: 'Karma Intelligence',
    description:
      'See exactly when your karma spiked, what caused it, and how to replicate those moments.',
  },
  {
    icon: BarChart2,
    title: 'Post Autopsy',
    description:
      'Every post ranked by performance. Know what your community upvotes, what they ignore, and why.',
  },
  {
    icon: Clock,
    title: 'Timing Oracle',
    description:
      'A 24-hour heatmap of when your posts get the most engagement. Post at the right time, every time.',
  },
]

export function FeatureCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="bg-card border border-border-subtle rounded-xl p-6"
        >
          <div className="inline-flex p-2.5 rounded-lg bg-accent/10 mb-4">
            <feature.icon size={20} className="text-accent" />
          </div>
          <h3 className="text-text-primary font-semibold mb-2">
            {feature.title}
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  )
}
