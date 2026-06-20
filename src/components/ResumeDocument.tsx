import { formatJobDates, type ResumeData } from "@/lib/resume";

interface ResumeDocumentProps {
  data: ResumeData;
  id?: string;
  className?: string;
}

export function ResumeDocument({ data, id, className = "" }: ResumeDocumentProps) {
  const { profile, jobs } = data;
  const name = profile.name.trim() || "Your Name";
  const summary = profile.summary.trim();

  const contactLine = [profile.email, profile.phone, profile.location, profile.website]
    .map((value) => value.trim())
    .filter(Boolean)
    .join("  ·  ");

  return (
    <article id={id} className={`cv-document ${className}`.trim()}>
      <header className="cv-document__header">
        <h1 className="cv-document__name">{name}</h1>
        {contactLine ? (
          <p className="cv-document__contact">{contactLine}</p>
        ) : (
          <p className="cv-document__hint">Add email, phone, or location in the editor.</p>
        )}
      </header>

      <section className="cv-document__section">
        <h2 className="cv-document__section-title">Summary</h2>
        {summary ? (
          <p className="cv-document__text">{summary}</p>
        ) : (
          <p className="cv-document__hint">Your professional summary will appear here.</p>
        )}
      </section>

      <section className="cv-document__section">
        <h2 className="cv-document__section-title">Experience</h2>

        {jobs.length === 0 ? (
          <p className="cv-document__hint">Add work experience in the editor.</p>
        ) : (
          <ul className="cv-document__jobs">
            {jobs.map((job) => (
              <li key={job.id} className="cv-document__job">
                <div className="cv-document__job-row">
                  <div>
                    <p className="cv-document__job-title">{job.title}</p>
                    <p className="cv-document__job-company">{job.company}</p>
                  </div>
                  <p className="cv-document__job-dates">{formatJobDates(job)}</p>
                </div>

                {job.details ? (
                  <ul className="cv-document__bullets">
                    {job.details
                      .split("\n")
                      .map((line) => line.trim())
                      .filter(Boolean)
                      .map((line, index) => (
                        <li key={`${job.id}-${index}`}>
                          {line.replace(/^[•\-–]\s*/, "")}
                        </li>
                      ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>
    </article>
  );
}
