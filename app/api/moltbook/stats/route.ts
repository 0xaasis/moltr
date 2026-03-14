import { NextResponse } from 'next/server'
import { MoltbookClient } from '@/lib/moltbook'
import { getMockData } from '@/lib/mock-data'
import { AgentStats } from '@/types'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { apiKey } = body

    if (!apiKey || (typeof apiKey === 'string' && apiKey !== 'demo' && apiKey.length < 10)) {
      return NextResponse.json(
        { data: null, error: 'Invalid API key. Must be at least 10 characters.' },
        { status: 400, headers: { 'Cache-Control': 'no-store' } }
      )
    }

    // Demo mode — return full mock data
    if (apiKey === 'demo') {
      const stats = getMockData()
      return NextResponse.json(
        { data: stats, error: null },
        { headers: { 'Cache-Control': 'no-store' } }
      )
    }

    // Real API mode
    const client = new MoltbookClient(apiKey)

    const [agentRes, postsRes, followersRes] = await Promise.all([
      client.getAgent(),
      client.getPosts(50),
      client.getFollowers(),
    ])

    // If real API fails, fall back to mock data
    if (agentRes.error || !agentRes.data) {
      const stats = getMockData()
      return NextResponse.json(
        { data: stats, error: null },
        { headers: { 'Cache-Control': 'no-store' } }
      )
    }

    const agent = agentRes.data
    const posts = postsRes.data || []
    const mock = getMockData()

    // Compute derived stats
    const avgUpvotes =
      posts.length > 0
        ? Math.round(
            (posts.reduce((sum, p) => sum + p.upvotes, 0) / posts.length) * 10
          ) / 10
        : 0

    const topPost =
      posts.length > 0
        ? [...posts].sort((a, b) => b.upvotes - a.upvotes)[0]
        : posts[0]

    // Build submolt stats
    const submoltMap = new Map<string, { total: number; count: number }>()
    posts.forEach((p) => {
      const existing = submoltMap.get(p.submolt) || { total: 0, count: 0 }
      existing.total += p.upvotes
      existing.count += 1
      submoltMap.set(p.submolt, existing)
    })

    const submoltStats = Array.from(submoltMap.entries()).map(
      ([name, { total, count }]) => ({
        name,
        posts: count,
        avg_upvotes: Math.round((total / count) * 10) / 10,
      })
    )

    const stats: AgentStats = {
      agent,
      posts,
      karma_history: mock.karma_history,
      follower_history: mock.follower_history,
      heatmap: mock.heatmap,
      submolt_stats: submoltStats.length > 0 ? submoltStats : mock.submolt_stats,
      avg_upvotes: avgUpvotes,
      top_post: topPost || mock.top_post,
      fetched_at: new Date().toISOString(),
    }

    return NextResponse.json(
      { data: stats, error: null },
      { headers: { 'Cache-Control': 'no-store' } }
    )
  } catch {
    return NextResponse.json(
      { data: null, error: 'Failed to fetch agent stats. Please check your API key.' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    )
  }
}
