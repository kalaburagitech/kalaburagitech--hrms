import { CalendarDays, Users, Trophy, FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { TrendBadge } from '@/components/ui/badge';

const stats = [
  { label: "Total Employees", value: "1,284", icon: Users, trend: "+8% this month" },
  { label: "Today’s Attendance", value: "1,062", icon: CalendarDays, trend: "+2.7%" },
  { label: "Active Leave", value: "48", icon: Trophy, trend: "Stable" },
  { label: "Open Documents", value: "72", icon: FileText, trend: "+14 new" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="px-6 py-6 lg:px-8">
        <div className="rounded-4xl border border-white/10 bg-slate-900/70 p-8 backdrop-blur-xl shadow-2xl shadow-slate-950/30">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">KalaburagiTech HRMS</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Executive dashboard</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-400 sm:text-base">A premium employee experience platform with real-time insights, attendance, and workforce analytics.</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => (
              <Card key={item.label} className="overflow-hidden p-6 ring-1 ring-white/5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-400">{item.label}</p>
                    <p className="mt-3 text-3xl font-semibold text-white">{item.value}</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-cyan-500/10 text-cyan-300">
                    <item.icon className="h-5 w-5" />
                  </div>
                </div>
                <TrendBadge>{item.trend}</TrendBadge>
              </Card>
            ))}
          </div>

          <div className="mt-8 grid gap-4 xl:grid-cols-[1.6fr_1fr]">
            <Card className="min-h-[18rem] p-6">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Payroll Summary</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">This month</h2>
                </div>
                <TrendBadge variant="secondary">Forecast positive</TrendBadge>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-950/60 p-5">
                  <p className="text-sm text-slate-400">Total payout</p>
                  <p className="mt-3 text-3xl font-semibold text-white">₹12.4M</p>
                </div>
                <div className="rounded-3xl bg-slate-950/60 p-5">
                  <p className="text-sm text-slate-400">Pending approvals</p>
                  <p className="mt-3 text-3xl font-semibold text-white">18</p>
                </div>
              </div>
            </Card>

            <Card className="grid min-h-[18rem] gap-4 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Announcements</p>
                  <h2 className="mt-2 text-xl font-semibold text-white">Realtime updates</h2>
                </div>
                <TrendBadge variant="secondary">Live</TrendBadge>
              </div>
              <div className="space-y-4">
                <article className="rounded-3xl bg-slate-950/70 p-4">
                  <p className="text-sm text-slate-400">Finance team approved the May payroll schedule.</p>
                  <p className="mt-2 text-sm font-medium text-white">Payroll processing now live.</p>
                </article>
                <article className="rounded-3xl bg-slate-950/70 p-4">
                  <p className="text-sm text-slate-400">Field HR announced a late-entry policy update.</p>
                  <p className="mt-2 text-sm font-medium text-white">Employees notified via email.</p>
                </article>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
