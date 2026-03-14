'use client'

import { useState } from 'react'
import { HeatmapCell } from '@/types'

interface PostHeatmapProps {
  data: HeatmapCell[]
}

const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const hourLabels = [0, 6, 12, 18, 23]

function getCellColor(value: number): string {
  if (value === 0) return 'bg-[#0f0f0f]'
  if (value <= 25) return 'bg-accent/20'
  if (value <= 50) return 'bg-accent/40'
  if (value <= 75) return 'bg-accent/70'
  return 'bg-accent'
}

export function PostHeatmap({ data }: PostHeatmapProps) {
  const [tooltip, setTooltip] = useState<{ cell: HeatmapCell; x: number; y: number } | null>(null)

  const getCell = (day: number, hour: number) =>
    data.find((c) => c.day === day && c.hour === hour)

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-text-primary font-semibold">Posting Heatmap</h3>
        <span className="text-text-dim text-sm">Engagement by time</span>
      </div>

      <div className="relative">
        {/* Hour labels */}
        <div className="flex ml-10 mb-1">
          {Array.from({ length: 24 }, (_, h) => (
            <div
              key={h}
              className="flex-1 text-center text-text-dim text-[10px]"
            >
              {hourLabels.includes(h) ? h : ''}
            </div>
          ))}
        </div>

        {/* Grid */}
        {dayLabels.map((label, day) => (
          <div key={day} className="flex items-center gap-1 mb-1">
            <span className="w-9 text-right text-text-dim text-xs pr-1">
              {label}
            </span>
            <div className="flex flex-1 gap-[2px]">
              {Array.from({ length: 24 }, (_, hour) => {
                const cell = getCell(day, hour)
                const value = cell?.value ?? 0
                return (
                  <div
                    key={hour}
                    className={`flex-1 aspect-square rounded-sm cursor-pointer transition-all duration-150 hover:ring-1 hover:ring-accent/50 ${getCellColor(value)}`}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect()
                      setTooltip({
                        cell: cell || { hour, day, value: 0 },
                        x: rect.left + rect.width / 2,
                        y: rect.top - 8,
                      })
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  />
                )
              })}
            </div>
          </div>
        ))}

        {/* Tooltip */}
        {tooltip && (
          <div
            className="fixed z-50 bg-card border border-border-subtle rounded-lg px-3 py-2 shadow-lg pointer-events-none -translate-x-1/2 -translate-y-full"
            style={{ left: tooltip.x, top: tooltip.y }}
          >
            <p className="text-text-primary text-xs font-medium whitespace-nowrap">
              {dayLabels[tooltip.cell.day]} {tooltip.cell.hour}:00 ·{' '}
              <span className="font-mono tabular-nums">{tooltip.cell.value}</span>{' '}
              engagement score
            </p>
          </div>
        )}

        {/* Legend */}
        <div className="flex items-center justify-end gap-2 mt-3">
          <span className="text-text-dim text-xs">Low</span>
          <div className="flex gap-[2px]">
            <div className="w-3 h-3 rounded-sm bg-[#0f0f0f]" />
            <div className="w-3 h-3 rounded-sm bg-accent/20" />
            <div className="w-3 h-3 rounded-sm bg-accent/40" />
            <div className="w-3 h-3 rounded-sm bg-accent/70" />
            <div className="w-3 h-3 rounded-sm bg-accent" />
          </div>
          <span className="text-text-dim text-xs">High</span>
        </div>
      </div>
    </div>
  )
}
