"use client";

import { useState } from "react";
import type { CVExperience } from "@/lib/cv-types";
import { formatExperienceDates } from "@/lib/format-date";
import { Button } from "@/components/ui/Button";
import { SectionCard } from "@/components/ui/SectionCard";
import { ExperienceForm } from "@/components/cv/ExperienceForm";

interface ExperienceEditorProps {
  experiences: CVExperience[];
  onAdd: (experience: Omit<CVExperience, "id">) => void;
  onUpdate: (id: string, experience: Omit<CVExperience, "id">) => void;
  onDelete: (id: string) => void;
}

export function ExperienceEditor({
  experiences,
  onAdd,
  onUpdate,
  onDelete,
}: ExperienceEditorProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const editing = experiences.find((item) => item.id === editingId) ?? null;

  function handleSave(experience: Omit<CVExperience, "id">) {
    if (editing) {
      onUpdate(editing.id, experience);
      setEditingId(null);
      return;
    }

    onAdd(experience);
  }

  return (
    <SectionCard
      title="Work experience"
      description="Add roles in reverse chronological order — newest first works best."
    >
      {experiences.length > 0 ? (
        <ul className="space-y-3">
          {experiences.map((item) => (
            <li
              key={item.id}
              className="rounded-xl border border-line bg-canvas/60 p-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="font-semibold text-ink">{item.jobTitle}</p>
                  <p className="text-sm text-muted">{item.company}</p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-muted">
                    {formatExperienceDates(item.startDate, item.endDate, item.isCurrent)}
                  </p>
                </div>

                <div className="flex shrink-0 gap-2">
                  <Button
                    variant="secondary"
                    className="min-h-10 px-3"
                    onClick={() => setEditingId(item.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="min-h-10 px-3"
                    onClick={() => {
                      if (editingId === item.id) {
                        setEditingId(null);
                      }
                      onDelete(item.id);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-xl border border-dashed border-line bg-canvas/50 px-4 py-6 text-center text-sm text-muted">
          No roles added yet. Use the form below to add your first job.
        </p>
      )}

      <ExperienceForm
        editing={editing}
        onSave={handleSave}
        onCancel={() => setEditingId(null)}
      />
    </SectionCard>
  );
}
