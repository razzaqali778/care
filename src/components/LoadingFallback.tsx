import { Loader2 } from "lucide-react";

export const LoadingFallback = () => (
  <div className="flex min-h-[200px] w-full items-center justify-center">
    <Loader2
      className="h-8 w-8 animate-spin text-primary"
      aria-label="Loading"
    />
    <span className="sr-only">Loading</span>
  </div>
);
