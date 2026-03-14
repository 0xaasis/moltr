'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { AgentStats } from '@/types'
import { Navbar } from '@/components/dashboard/Navbar'
import { AgentHeader } from '@/components/dashboard/AgentHeader'
import { DashboardSkeleton } from '@/components/dashboard/DashboardSkeleton'
import { PostList } from '@/components/dashboard/PostList'
import { StatCard } from '@/components/ui/StatCard'
import { KarmaChart } from '@/components/charts/KarmaChart'
import { FollowerChart } from '@/components/charts/FollowerChart'
import { SubmoltBars } from '@/components/charts/SubmoltBars'
import { PostHeatmap } from '@/components/charts/PostHeatmap'
import { formatNumber } from '@/lib/utils'
import { Zap, Users, FileText, ArrowUp, AlertCircle } from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const [stats, setStats] = useState<AgentStats | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchStats = useCallback(async () => {
    const apiKey = localStorage.getItem('moltr_api_key')
    if (!apiKey) {
      router.push('/')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/moltbook/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey }),
      })

      const json = await res.json()

      if (!res.ok || json.error) {
        setError(json.error || 'Unknown error occurred')
        return
      }

      setStats(json.data)
    } catch {
      setError('Failed to connect to MOLTR. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  if (loading) return <DashboardSkeleton />

  if (error || !stats) {
    return (
      <div className="min-h-screen bg-base flex items-center justify-center px-6">
        <div className="bg-card border border-border-subtle rounded-xl p-8 max-w-md w-full text-center">
          <AlertCircle size={40} className="text-negative mx-auto mb-4" />
          <h2 className="text-text-primary font-semibold text-lg mb-2">
            Couldn&apos;t reach your agent
          </h2>
          <p className="text-text-secondary text-sm mb-6">
            {error || 'An unknown error occurred.'}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={fetchStats}
              className="bg-accent hover:bg-accent/90 text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-all duration-150 cursor-pointer"
            >
              Try again
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('moltr_api_key')
                router.push('/')
              }}
              className="border border-border-subtle hover:border-border-active text-text-secondary font-medium text-sm px-5 py-2.5 rounded-lg transition-all duration-150 cursor-pointer"
            >
              Change API key
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base">
      <Navbar agentName={stats.agent.name} />

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <AgentHeader agent={stats.agent} fetchedAt={stats.fetched_at} />

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Karma"
            value={formatNumber(stats.agent.karma)}
            change="+12.4% this week"
            changeType="positive"
            icon={Zap}
            iconColor="text-amber-400"
            iconBg="bg-amber-400/10"
          />
          <StatCard
            label="Followers"
            value={formatNumber(stats.agent.followers)}
            change="+8 this week"
            changeType="positive"
            icon={Users}
            iconColor="text-blue-400"
            iconBg="bg-blue-400/10"
          />
          <StatCard
            label="Posts (30 days)"
            value={String(stats.posts.length)}
            change={`avg ${(stats.posts.length / 30).toFixed(1)}/day`}
            changeType="neutral"
            icon={FileText}
            iconColor="text-purple-400"
            iconBg="bg-purple-400/10"
          />
          <StatCard
            label="Avg Upvotes"
            value={stats.avg_upvotes.toFixed(1)}
            change="+2.1 vs last month"
            changeType="positive"
            icon={ArrowUp}
            iconColor="text-positive"
            iconBg="bg-positive/10"
          />
        </div>

        {/* Karma Chart */}
        <div className="bg-card border border-border-subtle rounded-xl p-6">
          <KarmaChart data={stats.karma_history} />
        </div>

        {/* Post List + Submolt Bars */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <PostList posts={stats.posts} avgUpvotes={stats.avg_upvotes} />
          </div>
          <div className="lg:col-span-2 bg-card border border-border-subtle rounded-xl p-6">
            <SubmoltBars data={stats.submolt_stats} />
          </div>
        </div>

        {/* Heatmap + Follower Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-9 gap-6">
          <div className="lg:col-span-5 bg-card border border-border-subtle rounded-xl p-6">
            <PostHeatmap data={stats.heatmap} />
          </div>
          <div className="lg:col-span-4 bg-card border border-border-subtle rounded-xl p-6">
            <FollowerChart data={stats.follower_history} />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-text-dim text-sm pb-4">
          MOLTR · Analytics for the Agent Internet
        </div>
      </div>
    </div>
  )
}
