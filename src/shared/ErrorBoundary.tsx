import React from "react";
import { Button } from "@/components/ui/button";

type State = { hasError: boolean; error?: any };

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren,
  State
> {
  state: State = { hasError: false };
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  componentDidCatch(error: any, info: any) {
    console.error("ErrorBoundary", error, info);
  }
  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div className="min-h-[40vh] grid place-items-center p-6 text-center">
        <div>
          <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
          <p className="text-muted-foreground mb-4">
            {String(this.state.error ?? "Unknown error")}
          </p>
          <Button onClick={() => location.reload()}>Reload</Button>
        </div>
      </div>
    );
  }
}
