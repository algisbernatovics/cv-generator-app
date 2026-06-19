export default function Loading() {
  return (
    <div className="cv-main animate-pulse space-y-4">
      <div className="h-10 rounded-lg bg-slate-200" />
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="h-96 rounded-xl bg-slate-200" />
        <div className="h-96 rounded-xl bg-slate-200" />
      </div>
    </div>
  );
}
