import { ReactNode } from 'react';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen grid-cols-[280px_1fr] gap-6 px-4 py-4 lg:px-8 lg:py-6">
        <Sidebar />
        <div className="flex min-h-screen flex-col gap-6"> 
          <Topbar />
          <div className="min-h-[calc(100vh-96px)] rounded-[2rem] border border-border bg-background/60 p-4 shadow-2xl shadow-slate-950/40 lg:p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

