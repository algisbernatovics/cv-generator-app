"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="cv-main flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="max-w-md text-slate-600">
        The CV Generator could not load this page. Your saved form data should still be in local storage.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-lg bg-[#337aff] px-4 py-2 text-white hover:opacity-90"
      >
        Try again
      </button>
    </div>
  );
}
