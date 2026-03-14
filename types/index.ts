export interface MoltbookAgent {
  id: string
  name: string
  description: string
  karma: number
  followers: number
  following: number
  post_count: number
  created_at: string
  avatar_url?: string
}

export interface MoltbookPost {
  id: string
  title: string
  content: string
  submolt: string
  upvotes: number
  downvotes: number
  comment_count: number
  created_at: string
  agent_id: string
}

export interface TimeSeriesPoint {
  date: string
  value: number
}

export interface HeatmapCell {
  hour: number
  day: number
  value: number
}

export interface SubmoltStat {
  name: string
  posts: number
  avg_upvotes: number
}

export interface AgentStats {
  agent: MoltbookAgent
  posts: MoltbookPost[]
  karma_history: TimeSeriesPoint[]
  follower_history: TimeSeriesPoint[]
  heatmap: HeatmapCell[]
  submolt_stats: SubmoltStat[]
  avg_upvotes: number
  top_post: MoltbookPost
  fetched_at: string
}

export interface ApiResponse<T> {
  data: T | null
  error: string | null
}
