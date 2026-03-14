import { getSubmoltColor } from '@/lib/utils'
import clsx from 'clsx'

interface BadgeProps {
  submolt: string
  className?: string
}

export function Badge({ submolt, className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs border',
        getSubmoltColor(submolt),
        className
      )}
    >
      {submolt}
    </span>
  )
}
