import Link from 'next/link';
import { Briefcase, CalendarDays, Clock, FileText, Home, Layers, ShieldCheck, Tags, Users, Wallet } from 'lucide-react';

const nav = [
  { label: 'Dashboard', href: '/', icon: Home },
  { label: 'Employees', href: '/employees', icon: Users },
  { label: 'Departments', href: '/departments', icon: Layers },
  { label: 'Designations', href: '/designations', icon: Tags },
  { label: 'Shifts', href: '/shifts', icon: Clock },
  { label: 'Attendance', href: '/attendance', icon: CalendarDays },
  { label: 'Payroll', href: '/payroll', icon: Wallet },
  { label: 'Announcements', href: '/announcements', icon: FileText },
  { label: 'Settings', href: '/settings', icon: ShieldCheck },
];

export function Sidebar() {
  return (
    <aside className="flex min-h-screen flex-col rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/20">
      <div className="mb-8 flex items-center gap-3 rounded-3xl border border-white/10 bg-slate-900/80 p-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-cyan-500/10 text-cyan-300">
          <Briefcase className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">KalaburagiTech</p>
          <p className="text-base font-semibold text-white">HRMS Suite</p>
        </div>
      </div>

      <nav className="space-y-2">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-slate-900/80 hover:text-white"
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
