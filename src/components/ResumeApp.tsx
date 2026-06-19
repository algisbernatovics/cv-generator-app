"use client";

import { useEffect, useRef, useState } from "react";
import {
  clearResumeStorage,
  emptyResume,
  formatJobDates,
  loadResume,
  newJobId,
  saveResume,
  type ResumeData,
  type ResumeJob,
  type ResumeProfile,
} from "@/lib/resume";

type Tab = "edit" | "preview";

const emptyJob = {
  title: "",
  company: "",
  start: "",
  end: "",
  current: false,
  details: "",
};

export function ResumeApp() {
  const [data, setData] = useState<ResumeData>(emptyResume);
  const [tab, setTab] = useState<Tab>("edit");
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [jobDraft, setJobDraft] = useState(emptyJob);
  const touched = useRef(false);
  const ready = useRef(false);

  useEffect(() => {
    const stored = loadResume();

    if (!touched.current) {
      setData(stored);
    }

    ready.current = true;
  }, []);

  useEffect(() => {
    if (!ready.current) {
      return;
    }

    saveResume(data);
  }, [data]);

  function updateProfile(field: keyof ResumeProfile, value: string) {
    touched.current = true;
    setData((current) => ({
      ...current,
      profile: { ...current.profile, [field]: value },
    }));
  }

  function resetAll() {
    if (!window.confirm("Clear everything and start over?")) {
      return;
    }

    touched.current = false;
    setData(emptyResume);
    setEditingJobId(null);
    setJobDraft(emptyJob);
    clearResumeStorage();
  }

  function startEditJob(job: ResumeJob) {
    setEditingJobId(job.id);
    setJobDraft({
      title: job.title,
      company: job.company,
      start: job.start,
      end: job.end,
      current: job.current,
      details: job.details,
    });
    setTab("edit");
  }

  function cancelJobForm() {
    setEditingJobId(null);
    setJobDraft(emptyJob);
  }

  function saveJob() {
    const title = jobDraft.title.trim();
    const company = jobDraft.company.trim();

    if (!title || !company || !jobDraft.start || (!jobDraft.current && !jobDraft.end)) {
      return;
    }

    touched.current = true;

    const payload: ResumeJob = {
      id: editingJobId ?? newJobId(),
      title,
      company,
      start: jobDraft.start,
      end: jobDraft.current ? "" : jobDraft.end,
      current: jobDraft.current,
      details: jobDraft.details.trim(),
    };

    setData((current) => {
      if (editingJobId) {
        return {
          ...current,
          jobs: current.jobs.map((job) => (job.id === editingJobId ? payload : job)),
        };
      }

      return { ...current, jobs: [payload, ...current.jobs] };
    });

    cancelJobForm();
  }

  function deleteJob(id: string) {
    touched.current = true;
    setData((current) => ({
      ...current,
      jobs: current.jobs.filter((job) => job.id !== id),
    }));

    if (editingJobId === id) {
      cancelJobForm();
    }
  }

  function printResume() {
    setTab("preview");
    window.setTimeout(() => window.print(), 120);
  }

  const profile = data.profile;
  const canSaveJob =
    jobDraft.title.trim().length > 0 &&
    jobDraft.company.trim().length > 0 &&
    jobDraft.start.length > 0 &&
    (jobDraft.current || jobDraft.end.length > 0);

  return (
    <div className="app-shell">
      <header className="app-header print-hidden">
        <div className="app-header-inner">
          <div>
            <p className="app-kicker">Resume builder</p>
            <h1 className="app-title">Build your CV</h1>
          </div>
          <button type="button" className="btn btn-ghost hidden sm:inline-flex" onClick={resetAll}>
            Reset
          </button>
        </div>
      </header>

      <main className="app-main">
        {tab === "edit" ? (
          <div className="editor-stack print-hidden">
            <section className="panel">
              <h2 className="panel-title">About you</h2>
              <div className="field-grid">
                <label className="field field-full">
                  <span>Full name</span>
                  <input
                    value={profile.name}
                    onChange={(event) => updateProfile("name", event.target.value)}
                    placeholder="Jane Doe"
                    autoComplete="name"
                  />
                </label>

                <label className="field field-full">
                  <span>Professional summary</span>
                  <textarea
                    rows={4}
                    value={profile.summary}
                    onChange={(event) => updateProfile("summary", event.target.value)}
                    placeholder="Brief overview of your experience and goals."
                  />
                </label>

                <label className="field">
                  <span>Email</span>
                  <input
                    type="email"
                    inputMode="email"
                    value={profile.email}
                    onChange={(event) => updateProfile("email", event.target.value)}
                    placeholder="jane@example.com"
                    autoComplete="email"
                  />
                </label>

                <label className="field">
                  <span>Phone</span>
                  <input
                    type="tel"
                    inputMode="tel"
                    value={profile.phone}
                    onChange={(event) => updateProfile("phone", event.target.value)}
                    placeholder="+1 555 0100"
                    autoComplete="tel"
                  />
                </label>

                <label className="field">
                  <span>Location</span>
                  <input
                    value={profile.location}
                    onChange={(event) => updateProfile("location", event.target.value)}
                    placeholder="City, Country"
                  />
                </label>

                <label className="field">
                  <span>Website</span>
                  <input
                    type="url"
                    inputMode="url"
                    value={profile.website}
                    onChange={(event) => updateProfile("website", event.target.value)}
                    placeholder="https://example.com"
                  />
                </label>
              </div>
            </section>

            <section className="panel">
              <div className="panel-head">
                <h2 className="panel-title">Work experience</h2>
                <p className="panel-note">Newest roles first works best.</p>
              </div>

              {data.jobs.length > 0 ? (
                <ul className="job-list">
                  {data.jobs.map((job) => (
                    <li key={job.id} className="job-item">
                      <div>
                        <p className="job-item-title">{job.title}</p>
                        <p className="job-item-company">{job.company}</p>
                        <p className="job-item-dates">{formatJobDates(job)}</p>
                      </div>
                      <div className="job-item-actions">
                        <button type="button" className="btn btn-small" onClick={() => startEditJob(job)}>
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-small btn-danger"
                          onClick={() => deleteJob(job.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="empty-note">No roles yet. Add your first job below.</p>
              )}

              <div className="job-form">
                <p className="job-form-label">{editingJobId ? "Edit role" : "Add role"}</p>

                <label className="field field-full">
                  <span>Job title</span>
                  <input
                    value={jobDraft.title}
                    onChange={(event) => setJobDraft((current) => ({ ...current, title: event.target.value }))}
                    placeholder="Product Designer"
                  />
                </label>

                <label className="field field-full">
                  <span>Company</span>
                  <input
                    value={jobDraft.company}
                    onChange={(event) => setJobDraft((current) => ({ ...current, company: event.target.value }))}
                    placeholder="Acme Inc."
                  />
                </label>

                <div className="field-row">
                  <label className="field">
                    <span>Start</span>
                    <input
                      type="month"
                      value={jobDraft.start}
                      onChange={(event) => setJobDraft((current) => ({ ...current, start: event.target.value }))}
                    />
                  </label>

                  <label className="field">
                    <span>End</span>
                    <input
                      type="month"
                      value={jobDraft.end}
                      disabled={jobDraft.current}
                      onChange={(event) => setJobDraft((current) => ({ ...current, end: event.target.value }))}
                    />
                  </label>
                </div>

                <label className="checkbox-row">
                  <input
                    type="checkbox"
                    checked={jobDraft.current}
                    onChange={(event) =>
                      setJobDraft((current) => ({
                        ...current,
                        current: event.target.checked,
                        end: event.target.checked ? "" : current.end,
                      }))
                    }
                  />
                  <span>I still work here</span>
                </label>

                <label className="field field-full">
                  <span>Description</span>
                  <textarea
                    rows={4}
                    value={jobDraft.details}
                    onChange={(event) => setJobDraft((current) => ({ ...current, details: event.target.value }))}
                    placeholder="What you did and what you achieved."
                  />
                </label>

                <div className="form-actions">
                  <button type="button" className="btn btn-primary" disabled={!canSaveJob} onClick={saveJob}>
                    {editingJobId ? "Save role" : "Add role"}
                  </button>
                  {editingJobId ? (
                    <button type="button" className="btn btn-ghost" onClick={cancelJobForm}>
                      Cancel
                    </button>
                  ) : null}
                </div>
              </div>
            </section>

            <button type="button" className="btn btn-secondary w-full sm:hidden" onClick={() => setTab("preview")}>
              Open preview
            </button>
          </div>
        ) : (
          <article id="resume-preview" className="resume-preview">
            <header className="resume-header">
              <h2>{profile.name.trim() || "Your Name"}</h2>
              <p className="resume-contact">
                {[profile.email, profile.phone, profile.location, profile.website]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </header>

            <section>
              <h3>Summary</h3>
              <p>{profile.summary.trim() || "Your summary appears here."}</p>
            </section>

            <section>
              <h3>Experience</h3>
              {data.jobs.length === 0 ? (
                <p className="resume-muted">Add work experience in the editor.</p>
              ) : (
                <ul className="resume-jobs">
                  {data.jobs.map((job) => (
                    <li key={job.id}>
                      <div className="resume-job-head">
                        <div>
                          <strong>{job.title}</strong>
                          <span>{job.company}</span>
                        </div>
                        <time>{formatJobDates(job)}</time>
                      </div>
                      {job.details ? <p>{job.details}</p> : null}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </article>
        )}
      </main>

      <nav className="mobile-nav print-hidden" aria-label="App navigation">
        <button
          type="button"
          className={tab === "edit" ? "mobile-nav-btn active" : "mobile-nav-btn"}
          onClick={() => setTab("edit")}
        >
          Edit
        </button>
        <button
          type="button"
          className={tab === "preview" ? "mobile-nav-btn active" : "mobile-nav-btn"}
          onClick={() => setTab("preview")}
        >
          Preview
        </button>
        <button type="button" className="mobile-nav-btn accent" onClick={printResume}>
          PDF
        </button>
      </nav>

      <aside className="desktop-preview print-hidden" aria-label="Live preview">
        <div className="desktop-preview-head">
          <p>Live preview</p>
          <button type="button" className="btn btn-small btn-primary" onClick={printResume}>
            Print / PDF
          </button>
        </div>
        <article className="resume-preview resume-preview-compact">
          <header className="resume-header">
            <h2>{profile.name.trim() || "Your Name"}</h2>
            <p className="resume-contact">
              {[profile.email, profile.phone, profile.location, profile.website]
                .filter(Boolean)
                .join(" · ")}
            </p>
          </header>

          <section>
            <h3>Summary</h3>
            <p>{profile.summary.trim() || "Your summary appears here."}</p>
          </section>

          <section>
            <h3>Experience</h3>
            {data.jobs.length === 0 ? (
              <p className="resume-muted">Add work experience in the editor.</p>
            ) : (
              <ul className="resume-jobs">
                {data.jobs.map((job) => (
                  <li key={job.id}>
                    <div className="resume-job-head">
                      <div>
                        <strong>{job.title}</strong>
                        <span>{job.company}</span>
                      </div>
                      <time>{formatJobDates(job)}</time>
                    </div>
                    {job.details ? <p>{job.details}</p> : null}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </article>
      </aside>
    </div>
  );
}
