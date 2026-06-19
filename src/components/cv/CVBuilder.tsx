"use client";

import { useState } from "react";
import { useCVForm } from "@/hooks/use-cv-form";
import { ProfileForm } from "@/components/cv/ProfileForm";
import { ExperienceEditor } from "@/components/cv/ExperienceEditor";
import { CVPreview } from "@/components/cv/CVPreview";
import { Button } from "@/components/ui/Button";

type MobileView = "edit" | "preview";

export function CVBuilder() {
  const { data, hydrated, updateProfile, addExperience, updateExperience, deleteExperience, reset } =
    useCVForm();
  const [mobileView, setMobileView] = useState<MobileView>("edit");

  function handlePrint() {
    window.print();
  }

  function handleReset() {
    if (window.confirm("Clear all CV data? This cannot be undone.")) {
      reset();
    }
  }

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-6xl animate-pulse space-y-4 px-4 py-6">
        <div className="h-12 rounded-2xl bg-line/60" />
        <div className="h-80 rounded-2xl bg-line/60" />
        <div className="h-80 rounded-2xl bg-line/60" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas pb-24 lg:pb-8">
      <header className="sticky top-0 z-20 border-b border-line bg-canvas/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              CV Builder
            </p>
            <h1 className="text-lg font-semibold text-ink sm:text-xl">Create your resume</h1>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <Button variant="secondary" onClick={handleReset}>
              Clear
            </Button>
            <Button onClick={handlePrint}>Print / PDF</Button>
          </div>
        </div>

        <div className="border-t border-line px-4 py-2 lg:hidden">
          <div
            className="mx-auto grid max-w-md grid-cols-2 gap-1 rounded-xl bg-paper p-1 shadow-sm"
            role="tablist"
            aria-label="Editor or preview"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mobileView === "edit"}
              onClick={() => setMobileView("edit")}
              className={`min-h-11 rounded-lg text-sm font-semibold transition ${
                mobileView === "edit"
                  ? "bg-ink text-paper shadow-sm"
                  : "text-muted hover:text-ink"
              }`}
            >
              Edit
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mobileView === "preview"}
              onClick={() => setMobileView("preview")}
              className={`min-h-11 rounded-lg text-sm font-semibold transition ${
                mobileView === "preview"
                  ? "bg-ink text-paper shadow-sm"
                  : "text-muted hover:text-ink"
              }`}
            >
              Preview
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-2 lg:items-start lg:gap-8">
        <section
          aria-label="CV editor"
          className={`space-y-4 ${mobileView === "preview" ? "hidden lg:block" : ""}`}
        >
          <ProfileForm profile={data.profile} onChange={updateProfile} />
          <ExperienceEditor
            experiences={data.experiences}
            onAdd={addExperience}
            onUpdate={updateExperience}
            onDelete={deleteExperience}
          />

          <div className="flex gap-2 lg:hidden">
            <Button variant="secondary" className="flex-1" onClick={handleReset}>
              Clear
            </Button>
            <Button className="flex-1" onClick={() => setMobileView("preview")}>
              Preview CV
            </Button>
          </div>
        </section>

        <section
          aria-label="CV preview"
          className={`lg:sticky lg:top-28 ${mobileView === "edit" ? "hidden lg:block" : ""}`}
        >
          <div className="mb-3 hidden items-center justify-between lg:flex">
            <p className="text-sm font-medium text-muted">Live preview</p>
            <Button variant="secondary" className="min-h-10" onClick={handlePrint}>
              Print / PDF
            </Button>
          </div>
          <CVPreview data={data} />
        </section>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-paper/95 p-3 backdrop-blur sm:hidden">
        <div className="mx-auto flex max-w-md gap-2">
          <Button variant="secondary" className="flex-1" onClick={handleReset}>
            Clear
          </Button>
          <Button className="flex-1" onClick={handlePrint}>
            Print / PDF
          </Button>
        </div>
      </div>
    </div>
  );
}
