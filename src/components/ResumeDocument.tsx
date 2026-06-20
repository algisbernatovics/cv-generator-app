import {
  formatJobDates,
  formatEducationDates,
  parseSkillLines,
  type ResumeData,
} from "@/lib/resume";

interface ResumeDocumentProps {
  data: ResumeData;
  id?: string;
  className?: string;
}

export function ResumeDocument({ data, id, className = "" }: ResumeDocumentProps) {
  const { profile, jobs, education } = data;
  const name = profile.name.trim() || "Your Name";
  const summary = profile.summary.trim();
  const skills = parseSkillLines(profile.skills);

  const contactParts = [profile.email, profile.phone, profile.website]
    .map((value) => value.trim())
    .filter(Boolean);

  const location = profile.location.trim();

  return (
    <article id={id} className={`cv-document ${className}`.trim()}>
      <header className="cv-document__header">
        <h1 className="cv-document__name">{name}</h1>
        {location ? <p className="cv-document__location">{location}</p> : null}
        {contactParts.length > 0 ? (
          <p className="cv-document__contact">{contactParts.join("  |  ")}</p>
        ) : !location ? (
          <p className="cv-document__hint">Add contact details in the editor.</p>
        ) : null}
      </header>

      <section className="cv-document__section">
        <h2 className="cv-document__section-title">Professional Summary</h2>
        {summary ? (
          <p className="cv-document__text">{summary}</p>
        ) : (
          <p className="cv-document__hint">Write 2–3 sentences about your experience and goals.</p>
        )}
      </section>

      <section className="cv-document__section">
        <h2 className="cv-document__section-title">Work Experience</h2>

        {jobs.length === 0 ? (
          <p className="cv-document__hint">List jobs in reverse chronological order (newest first).</p>
        ) : (
          <ul className="cv-document__jobs">
            {jobs.map((job) => (
              <li key={job.id} className="cv-document__job">
                <div className="cv-document__job-top">
                  <p className="cv-document__job-heading">
                    <strong>{job.title}</strong>
                    <span className="cv-document__job-sep"> — </span>
                    <span>{job.company}</span>
                  </p>
                  <p className="cv-document__job-dates">{formatJobDates(job)}</p>
                </div>

                {job.details ? (
                  <ul className="cv-document__bullets">
                    {job.details
                      .split("\n")
                      .map((line) => line.trim())
                      .filter(Boolean)
                      .map((line, index) => (
                        <li key={`${job.id}-${index}`}>{line.replace(/^[•\-–]\s*/, "")}</li>
                      ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="cv-document__section">
        <h2 className="cv-document__section-title">Education</h2>

        {education.length === 0 ? (
          <p className="cv-document__hint">Add degrees, certifications, or training programs.</p>
        ) : (
          <ul className="cv-document__jobs">
            {education.map((entry) => (
              <li key={entry.id} className="cv-document__job">
                <div className="cv-document__job-top">
                  <p className="cv-document__job-heading">
                    <strong>{entry.degree}</strong>
                    <span className="cv-document__job-sep"> — </span>
                    <span>{entry.school}</span>
                  </p>
                  <p className="cv-document__job-dates">{formatEducationDates(entry)}</p>
                </div>

                {entry.details ? (
                  <ul className="cv-document__bullets">
                    {entry.details
                      .split("\n")
                      .map((line) => line.trim())
                      .filter(Boolean)
                      .map((line, index) => (
                        <li key={`${entry.id}-${index}`}>{line.replace(/^[•\-–]\s*/, "")}</li>
                      ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="cv-document__section">
        <h2 className="cv-document__section-title">Skills</h2>
        {skills.length > 0 ? (
          <p className="cv-document__skills">{skills.join("  •  ")}</p>
        ) : (
          <p className="cv-document__hint">List technical and soft skills relevant to your target role.</p>
        )}
      </section>
    </article>
  );
}
