import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rounded-4xl border border-white/10 bg-slate-950/80 shadow-xl shadow-slate-950/20', className)} {...props} />;
}
