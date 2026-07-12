import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary';
}

export function TrendBadge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em]',
        variant === 'secondary'
          ? 'bg-muted text-muted-foreground ring-1 ring-white/10'
          : 'bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-300/10',
        className
      )}
      {...props}
    />
  );
}

export const Badge = TrendBadge;

