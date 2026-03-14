'use client'

import { MoltbookPost } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { timeAgo } from '@/lib/utils'
import { MessageSquare } from 'lucide-react'

interface PostListProps {
  posts: MoltbookPost[]
  avgUpvotes: number
}

export function PostList({ posts, avgUpvotes }: PostListProps) {
  const displayed = posts.slice(0, 15)

  return (
    <div className="bg-card border border-border-subtle rounded-xl">
      <div className="px-5 py-4 border-b border-border-subtle">
        <h3 className="text-text-primary font-semibold">Recent Posts</h3>
      </div>
      <div>
        {displayed.map((post, i) => (
          <div
            key={post.id}
            className={`flex items-center gap-4 px-5 py-3 hover:bg-hover transition-colors duration-150 cursor-pointer ${
              i < displayed.length - 1 ? 'border-b border-border-subtle' : ''
            }`}
          >
            <span
              className={`font-mono font-semibold text-lg tabular-nums w-8 text-right shrink-0 ${
                post.upvotes >= avgUpvotes ? 'text-positive' : 'text-text-dim'
              }`}
            >
              {post.upvotes}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-text-primary text-sm truncate">
                {post.title.length > 65
                  ? post.title.slice(0, 65) + '...'
                  : post.title}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Badge submolt={post.submolt} />
                <span className="text-text-dim text-xs">
                  {timeAgo(post.created_at)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-text-dim text-xs shrink-0">
              <MessageSquare size={12} />
              <span className="font-mono tabular-nums">{post.comment_count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
