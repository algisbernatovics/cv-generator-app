import { formatJobDates, type ResumeData } from "@/lib/resume";

interface ResumeDocumentProps {
  data: ResumeData;
  id?: string;
  className?: string;
}

const contactFields = [
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "location", label: "Location" },
  { key: "website", label: "Website" },
] as const;

export function ResumeDocument({ data, id, className = "" }: ResumeDocumentProps) {
  const { profile, jobs } = data;
  const displayName = profile.name.trim() || "Your Name";
  const displaySummary =
    profile.summary.trim() ||
    "Add a short professional summary in the editor to describe your background and goals.";

  const contactRows = contactFields
    .map(({ key, label }) => ({
      label,
      value: profile[key].trim(),
    }))
    .filter((row) => row.value.length > 0);

  return (
    <article id={id} className={`cv-document ${className}`.trim()}>
      <header className="cv-document__header">
        <h1 className="cv-document__name">{displayName}</h1>

        {contactRows.length > 0 ? (
          <dl className="cv-document__contact">
            {contactRows.map((row) => (
              <div key={row.label} className="cv-document__contact-item">
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="cv-document__placeholder">Contact details will appear here.</p>
        )}
      </header>

      <section className="cv-document__section">
        <h2 className="cv-document__section-title">Professional Summary</h2>
        <p className="cv-document__paragraph">{displaySummary}</p>
      </section>

      <section className="cv-document__section">
        <h2 className="cv-document__section-title">Professional Experience</h2>

        {jobs.length === 0 ? (
          <p className="cv-document__placeholder">Work experience entries will appear here.</p>
        ) : (
          <ul className="cv-document__jobs">
            {jobs.map((job) => (
              <li key={job.id} className="cv-document__job">
                <div className="cv-document__job-header">
                  <div className="cv-document__job-meta">
                    <h3 className="cv-document__job-title">{job.title}</h3>
                    <p className="cv-document__job-company">{job.company}</p>
                  </div>
                  <p className="cv-document__job-dates">{formatJobDates(job)}</p>
                </div>

                {job.details ? (
                  <div className="cv-document__job-body">
                    {job.details.split("\n").map((line, index) => {
                      const trimmed = line.trim();

                      if (!trimmed) {
                        return null;
                      }

                      return (
                        <p key={`${job.id}-${index}`} className="cv-document__job-line">
                          {trimmed.startsWith("•") ? trimmed : `• ${trimmed}`}
                        </p>
                      );
                    })}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>
    </article>
  );
}
