export default function Loading() {
  return (
    <div className="min-h-screen bg-canvas px-4 py-6">
      <div className="mx-auto max-w-6xl animate-pulse space-y-4">
        <div className="h-14 rounded-2xl bg-line/60" />
        <div className="h-96 rounded-2xl bg-line/60" />
      </div>
    </div>
  );
}
