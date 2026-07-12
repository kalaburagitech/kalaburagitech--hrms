import { Settings2, Rocket, Construction } from "lucide-react";

interface ComingSoonProps {
  title: string;
  description?: string;
}

export function ComingSoon({ title, description = "We are currently building this feature. Check back later!" }: ComingSoonProps) {
  return (
    <div className="flex h-full min-h-[60vh] flex-col items-center justify-center rounded-3xl border border-border bg-card/40 p-6 text-center shadow-2xl backdrop-blur-md">
      <div className="relative mb-6">
        <div className="absolute -inset-4 animate-pulse rounded-full bg-cyan-500/20 blur-xl"></div>
        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-background/80 border border-border text-cyan-400 shadow-xl">
          <Construction className="h-10 w-10" />
        </div>
      </div>
      <h1 className="mb-2 text-3xl font-semibold tracking-tight text-foreground">{title}</h1>
      <p className="max-w-md text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

