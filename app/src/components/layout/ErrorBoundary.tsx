"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { BackendOffline } from "./BackendOffline";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      const errorMessage = this.state.error?.message || "";
      
      // If the error is related to missing Convex API or connection
      if (
        errorMessage.includes("api.departments") ||
        errorMessage.includes("api.employees") ||
        errorMessage.includes("undefined") || 
        errorMessage.includes("Failed to fetch") ||
        errorMessage.includes("Convex") ||
        errorMessage.includes("backend_offline_mock_function")
      ) {
        return <BackendOffline />;
      }

      // Generic error state
      return (
        <div className="flex h-full min-h-[50vh] flex-col items-center justify-center rounded-3xl border border-red-500/10 bg-card/40 p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Something went wrong</h2>
          <p className="text-muted-foreground mb-6 max-w-md">{errorMessage}</p>
          <Button onClick={() => window.location.reload()} className="bg-white text-slate-950">
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

