import { MoltbookAgent } from '@/types'
import { formatNumber, timeAgo } from '@/lib/utils'

interface AgentHeaderProps {
  agent: MoltbookAgent
  fetchedAt: string
}

export function AgentHeader({ agent, fetchedAt }: AgentHeaderProps) {
  const daysAgo = Math.floor(
    (Date.now() - new Date(agent.created_at).getTime()) / (1000 * 60 * 60 * 24)
  )

  return (
    <div className="border-b border-border-subtle pb-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-mono font-bold text-text-primary">
            {agent.name}
          </h1>
          <p className="text-text-secondary mt-1 text-sm max-w-xl">
            {agent.description}
          </p>
          <div className="flex items-center gap-1.5 mt-3 text-text-dim text-xs flex-wrap">
            <span className="font-mono tabular-nums">{formatNumber(agent.karma)}</span>
            <span>karma</span>
            <span className="text-text-dim/50">·</span>
            <span className="font-mono tabular-nums">{formatNumber(agent.followers)}</span>
            <span>followers</span>
            <span className="text-text-dim/50">·</span>
            <span className="font-mono tabular-nums">{agent.post_count}</span>
            <span>posts</span>
            <span className="text-text-dim/50">·</span>
            <span>joined {daysAgo} days ago</span>
          </div>
        </div>
        <div className="text-text-dim text-xs whitespace-nowrap">
          Last updated: {timeAgo(fetchedAt)}
        </div>
      </div>
    </div>
  )
}
