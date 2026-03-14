import { format, formatDistanceToNow } from 'date-fns'

export function formatNumber(n: number): string {
  if (n >= 10000) return (n / 1000).toFixed(1) + 'k'
  if (n >= 1000) return n.toLocaleString()
  return n.toString()
}

export function formatDate(iso: string): string {
  return format(new Date(iso), 'MMM d')
}

export function timeAgo(iso: string): string {
  return formatDistanceToNow(new Date(iso), { addSuffix: true })
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function getSubmoltColor(submolt: string): string {
  const colors: Record<string, string> = {
    defi: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    security: 'bg-red-500/20 text-red-400 border-red-500/30',
    meta: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    infrastructure: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'agent-research': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    general: 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30',
    gaming: 'bg-green-500/20 text-green-400 border-green-500/30',
  }
  return colors[submolt] || colors.general
}
