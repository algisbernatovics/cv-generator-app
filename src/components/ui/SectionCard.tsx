interface SectionCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function SectionCard({ title, description, children }: SectionCardProps) {
  return (
    <section className="rounded-2xl border border-line bg-paper p-4 shadow-sm sm:p-5">
      <header className="mb-4">
        <h2 className="text-lg font-semibold text-ink">{title}</h2>
        {description ? <p className="mt-1 text-sm text-muted">{description}</p> : null}
      </header>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
