import { DatabaseZap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BackendOffline() {
  return (
    <div className="flex h-full min-h-[70vh] flex-col items-center justify-center rounded-3xl border border-red-500/10 bg-slate-900/40 p-6 text-center shadow-2xl backdrop-blur-md">
      <div className="relative mb-6">
        <div className="absolute -inset-4 animate-pulse rounded-full bg-red-500/20 blur-xl"></div>
        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-slate-950/80 border border-red-500/20 text-red-400 shadow-xl">
          <DatabaseZap className="h-10 w-10" />
        </div>
      </div>
      <h1 className="mb-2 text-3xl font-semibold tracking-tight text-white">
        Backend Not Connected
      </h1>
      <p className="max-w-md text-slate-400 mb-6">
        Convex development server is not running.
      </p>
      
      <div className="text-left bg-slate-950/50 p-6 rounded-2xl border border-white/5 w-full max-w-lg mb-6 shadow-inner">
        <h3 className="text-white font-medium mb-3">How to fix this:</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm text-slate-400">
          <li>Open your terminal</li>
          <li className="font-mono text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded inline-block">npx convex dev</li>
          <li>Login to your Convex account if prompted</li>
          <li>Wait until code generation completes</li>
          <li>Refresh this browser page</li>
        </ol>
      </div>

      <Button 
        onClick={() => window.location.reload()} 
        className="bg-white text-slate-950 hover:bg-slate-200"
      >
        Refresh Page
      </Button>
    </div>
  );
}
