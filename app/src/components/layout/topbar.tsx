import { Search, Sparkles, Bell } from 'lucide-react';

export function Topbar() {
  return (
    <div className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-slate-950/70 p-5 shadow-inner shadow-slate-950/10 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="rounded-3xl bg-slate-900/80 p-3 text-cyan-300">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm text-slate-400">Welcome back, Administrator</p>
          <h2 className="text-lg font-semibold text-white">Manage your workforce with confidence</h2>
        </div>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-2 text-slate-300">
          <Search className="h-4 w-4" />
          <input
            type="search"
            placeholder="Search employees, departments..."
            className="w-full bg-transparent text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none"
            aria-label="Global search"
          />
        </div>
        <button className="inline-flex items-center gap-2 rounded-3xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
          <Bell className="h-4 w-4" />
          Notifications
        </button>
      </div>
    </div>
  );
}
