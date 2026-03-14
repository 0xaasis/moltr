'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { TimeSeriesPoint } from '@/types'
import { formatDate, formatNumber } from '@/lib/utils'

interface KarmaChartProps {
  data: TimeSeriesPoint[]
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-card border border-border-subtle rounded-lg px-3 py-2 shadow-lg">
      <p className="text-text-secondary text-xs">{label ? formatDate(label) : ''}</p>
      <p className="text-text-primary font-mono font-semibold text-sm tabular-nums">
        {formatNumber(payload[0].value)}
      </p>
    </div>
  )
}

export function KarmaChart({ data }: KarmaChartProps) {
  const filtered = data.filter((_, i) => i % 1 === 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-text-primary font-semibold">Karma Growth</h3>
        <span className="text-text-dim text-sm">Last 90 days</span>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={filtered} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="karmaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#818cf8" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#818cf8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="none"
            vertical={false}
            stroke="#1a1a1a"
          />
          <XAxis
            dataKey="date"
            tickFormatter={(v) => formatDate(v)}
            tick={{ fill: '#404040', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            interval={14}
          />
          <YAxis
            orientation="right"
            tickFormatter={(v) => formatNumber(v)}
            tick={{ fill: '#404040', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={45}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#818cf8"
            strokeWidth={2}
            fill="url(#karmaGradient)"
            dot={false}
            activeDot={{ fill: '#818cf8', stroke: '#ffffff', strokeWidth: 2, r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
