"use client";

import { Button } from "@/components/ui/Button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-canvas px-4 text-center">
      <h1 className="text-2xl font-semibold text-ink">Something went wrong</h1>
      <p className="max-w-md text-muted">
        The CV builder could not load. Your saved data should still be in this browser.
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
