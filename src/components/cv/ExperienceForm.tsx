"use client";

import { useEffect, useState } from "react";
import type { CVExperience } from "@/lib/cv-types";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { TextAreaField } from "@/components/ui/TextAreaField";

const emptyDraft = {
  jobTitle: "",
  company: "",
  startDate: "",
  endDate: "",
  isCurrent: false,
  description: "",
};

interface ExperienceFormProps {
  editing: CVExperience | null;
  onSave: (experience: Omit<CVExperience, "id">) => void;
  onCancel: () => void;
}

export function ExperienceForm({ editing, onSave, onCancel }: ExperienceFormProps) {
  const [draft, setDraft] = useState(emptyDraft);

  useEffect(() => {
    if (editing) {
      setDraft({
        jobTitle: editing.jobTitle,
        company: editing.company,
        startDate: editing.startDate,
        endDate: editing.endDate,
        isCurrent: editing.isCurrent,
        description: editing.description,
      });
      return;
    }

    setDraft(emptyDraft);
  }, [editing]);

  const canSave =
    draft.jobTitle.trim().length > 0 &&
    draft.company.trim().length > 0 &&
    draft.startDate.length > 0 &&
    (draft.isCurrent || draft.endDate.length > 0);

  function handleSubmit() {
    if (!canSave) {
      return;
    }

    onSave({
      jobTitle: draft.jobTitle.trim(),
      company: draft.company.trim(),
      startDate: draft.startDate,
      endDate: draft.isCurrent ? "" : draft.endDate,
      isCurrent: draft.isCurrent,
      description: draft.description.trim(),
    });

    if (!editing) {
      setDraft(emptyDraft);
    }
  }

  return (
    <div className="space-y-4 rounded-xl border border-dashed border-line bg-canvas/70 p-4">
      <Field
        label="Job title"
        value={draft.jobTitle}
        onChange={(event) => setDraft((current) => ({ ...current, jobTitle: event.target.value }))}
        placeholder="Senior Developer"
      />

      <Field
        label="Company"
        value={draft.company}
        onChange={(event) => setDraft((current) => ({ ...current, company: event.target.value }))}
        placeholder="Acme Inc."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-ink">Start date</span>
          <input
            type="month"
            value={draft.startDate}
            onChange={(event) =>
              setDraft((current) => ({ ...current, startDate: event.target.value }))
            }
            className="min-h-11 w-full rounded-xl border border-line bg-paper px-3.5 text-base text-ink shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </label>

        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-ink">End date</span>
          <input
            type="month"
            value={draft.endDate}
            disabled={draft.isCurrent}
            onChange={(event) =>
              setDraft((current) => ({ ...current, endDate: event.target.value }))
            }
            className="min-h-11 w-full rounded-xl border border-line bg-paper px-3.5 text-base text-ink shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:bg-canvas disabled:text-muted"
          />
        </label>
      </div>

      <label className="flex min-h-11 items-center gap-3 rounded-xl border border-line bg-paper px-3.5">
        <input
          type="checkbox"
          checked={draft.isCurrent}
          onChange={(event) =>
            setDraft((current) => ({
              ...current,
              isCurrent: event.target.checked,
              endDate: event.target.checked ? "" : current.endDate,
            }))
          }
          className="size-4 rounded border-line text-accent focus:ring-accent/30"
        />
        <span className="text-sm font-medium text-ink">I currently work here</span>
      </label>

      <TextAreaField
        label="Description"
        value={draft.description}
        onChange={(event) =>
          setDraft((current) => ({ ...current, description: event.target.value }))
        }
        placeholder="Key responsibilities and achievements."
      />

      <div className="flex flex-wrap gap-2">
        <Button onClick={handleSubmit} disabled={!canSave}>
          {editing ? "Save changes" : "Add experience"}
        </Button>
        {editing ? (
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        ) : null}
      </div>
    </div>
  );
}
