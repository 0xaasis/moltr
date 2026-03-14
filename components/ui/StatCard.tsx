'use client'

import { LucideIcon } from 'lucide-react'
import clsx from 'clsx'

interface StatCardProps {
  label: string
  value: string
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
  icon: LucideIcon
  iconColor: string
  iconBg: string
}

export function StatCard({
  label,
  value,
  change,
  changeType,
  icon: Icon,
  iconColor,
  iconBg,
}: StatCardProps) {
  return (
    <div className="bg-card border border-border-subtle rounded-xl p-5">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-text-dim text-xs uppercase tracking-wider mb-2">
            {label}
          </p>
          <p className="text-3xl font-mono font-bold text-text-primary tabular-nums">
            {value}
          </p>
          <div className="flex items-center gap-1.5 mt-2">
            <span
              className={clsx('inline-block w-1.5 h-1.5 rounded-full', {
                'bg-positive': changeType === 'positive',
                'bg-negative': changeType === 'negative',
                'bg-text-secondary': changeType === 'neutral',
              })}
            />
            <span
              className={clsx('text-sm', {
                'text-positive': changeType === 'positive',
                'text-negative': changeType === 'negative',
                'text-text-secondary': changeType === 'neutral',
              })}
            >
              {change}
            </span>
          </div>
        </div>
        <div className={clsx('p-2 rounded-lg', iconBg)}>
          <Icon size={24} className={iconColor} />
        </div>
      </div>
    </div>
  )
}
