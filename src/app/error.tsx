"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="app-shell">
      <main className="app-main">
        <section className="panel">
          <h2 className="panel-title">Something went wrong</h2>
          <p className="panel-note">Your saved resume should still be in this browser.</p>
          <button type="button" className="btn btn-primary" onClick={reset}>
            Try again
          </button>
        </section>
      </main>
    </div>
  );
}
