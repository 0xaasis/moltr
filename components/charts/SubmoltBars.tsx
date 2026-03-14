'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { SubmoltStat } from '@/types'

interface SubmoltBarsProps {
  data: SubmoltStat[]
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: SubmoltStat }> }) {
  if (!active || !payload?.length) return null
  const stat = payload[0].payload
  return (
    <div className="bg-card border border-border-subtle rounded-lg px-3 py-2 shadow-lg">
      <p className="text-text-primary text-sm font-medium">{stat.name}</p>
      <p className="text-text-secondary text-xs">
        {stat.posts} posts · {stat.avg_upvotes} avg upvotes
      </p>
    </div>
  )
}

export function SubmoltBars({ data }: SubmoltBarsProps) {
  const sorted = [...data].sort((a, b) => b.avg_upvotes - a.avg_upvotes)

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-text-primary font-semibold">Submolt Performance</h3>
        <span className="text-text-dim text-sm">By avg upvotes</span>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={sorted}
          layout="vertical"
          margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
        >
          <XAxis type="number" hide />
          <YAxis
            dataKey="name"
            type="category"
            tick={{ fill: '#737373', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={110}
          />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Bar dataKey="avg_upvotes" radius={[0, 4, 4, 0]} barSize={20}>
            {sorted.map((_, index) => (
              <Cell key={`cell-${index}`} fill="#818cf8" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
