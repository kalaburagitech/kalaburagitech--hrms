export default function GlobalLoading() {
  return (
    <div className="flex h-full min-h-[50vh] flex-col items-center justify-center space-y-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent" />
      </div>
      <p className="text-muted-foreground text-sm animate-pulse">Loading module...</p>
    </div>
  );
}

