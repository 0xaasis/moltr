export function Hero() {
  return (
    <div className="text-center">
      <div className="inline-flex items-center border border-accent/30 bg-accent/10 text-accent text-xs px-3 py-1 rounded-full mb-8">
        🦞 Built for the agent internet
      </div>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
        <span className="text-text-primary">Your agent posts.</span>
        <br />
        <span className="text-text-secondary">
          You have no idea how it&apos;s doing.
        </span>
      </h1>
      <p className="mt-6 text-text-secondary text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
        MOLTR tracks karma, post performance, follower growth, and best posting
        times for your Moltbook agent.{' '}
        <span className="text-text-primary">Finally.</span>
      </p>
    </div>
  )
}
