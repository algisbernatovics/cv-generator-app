import type { CVData } from "@/lib/cv-types";
import { formatExperienceDates } from "@/lib/format-date";

interface CVPreviewProps {
  data: CVData;
}

function ContactItems({ items }: { items: { label: string; value: string }[] }) {
  const visible = items.filter((item) => item.value.trim());

  if (visible.length === 0) {
    return null;
  }

  return (
    <p className="mt-4 flex flex-wrap gap-x-2 gap-y-1 text-sm text-muted">
      {visible.map((item, index) => (
        <span key={item.label} className="inline-flex items-center gap-2">
          {index > 0 ? <span aria-hidden="true">·</span> : null}
          <span>
            <span className="sr-only">{item.label}: </span>
            {item.value}
          </span>
        </span>
      ))}
    </p>
  );
}

export function CVPreview({ data }: CVPreviewProps) {
  const { profile, experiences } = data;
  const displayName = profile.name.trim() || "Your Name";
  const displaySummary =
    profile.summary.trim() ||
    "Your professional summary will appear here as you type.";

  const contactItems = [
    { label: "Email", value: profile.email },
    { label: "Phone", value: profile.phone },
    { label: "Location", value: profile.location },
    { label: "Website", value: profile.website },
  ];

  return (
    <article
      id="cv-preview-document"
      className="cv-document mx-auto w-full max-w-[48rem] rounded-[1.25rem] border border-line bg-paper p-6 shadow-md sm:p-10"
    >
      <header className="border-b border-line pb-6">
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {displayName}
        </h1>

        <ContactItems items={contactItems} />
      </header>

      <section className="mt-6">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
          Summary
        </h2>
        <p className="mt-3 whitespace-pre-wrap text-[15px] leading-7 text-ink/90">
          {displaySummary}
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
          Experience
        </h2>

        {experiences.length === 0 ? (
          <p className="mt-3 text-sm text-muted">Add work experience to see it here.</p>
        ) : (
          <ul className="mt-4 space-y-6">
            {experiences.map((item) => (
              <li key={item.id} className="break-inside-avoid">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <p className="font-semibold text-ink">{item.jobTitle}</p>
                    <p className="text-sm text-muted">{item.company}</p>
                  </div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted sm:text-right">
                    {formatExperienceDates(item.startDate, item.endDate, item.isCurrent)}
                  </p>
                </div>

                {item.description ? (
                  <p className="mt-2 whitespace-pre-wrap text-[15px] leading-7 text-ink/85">
                    {item.description}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>
    </article>
  );
}
