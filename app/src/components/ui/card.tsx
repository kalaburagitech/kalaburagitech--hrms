import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rounded-4xl border border-border bg-background/80 shadow-xl shadow-slate-950/20', className)} {...props} />;
}

