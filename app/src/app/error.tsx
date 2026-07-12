"use client";

import { useEffect } from "react";
import { BackendOffline } from "@/components/layout/BackendOffline";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error Caught:", error);
  }, [error]);

  const errorMessage = error.message || "";
  
  // Detect Convex backend offline
  if (
    errorMessage.includes("api.departments") ||
    errorMessage.includes("api.employees") ||
    errorMessage.includes("undefined") || 
    errorMessage.includes("Failed to fetch") ||
    errorMessage.includes("backend_offline_mock_function")
  ) {
    return (
      <div className="p-6 h-full flex flex-col justify-center">
        <BackendOffline />
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-[70vh] flex-col items-center justify-center rounded-3xl border border-red-500/10 bg-card/40 p-6 text-center">
      <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
      <h2 className="text-xl font-semibold text-foreground mb-2">Something went wrong</h2>
      <p className="text-muted-foreground mb-6 max-w-md">{errorMessage}</p>
      <Button onClick={() => reset()} className="bg-white text-slate-950">
        Try Again
      </Button>
    </div>
  );
}

