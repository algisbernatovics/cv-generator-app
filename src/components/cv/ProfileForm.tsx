"use client";

import type { CVProfile } from "@/lib/cv-types";
import { Field } from "@/components/ui/Field";
import { TextAreaField } from "@/components/ui/TextAreaField";
import { SectionCard } from "@/components/ui/SectionCard";

interface ProfileFormProps {
  profile: CVProfile;
  onChange: (field: keyof CVProfile, value: string) => void;
}

export function ProfileForm({ profile, onChange }: ProfileFormProps) {
  return (
    <SectionCard
      title="Profile"
      description="Your name, contact details, and a short professional summary."
    >
      <Field
        label="Full name"
        value={profile.name}
        onChange={(event) => onChange("name", event.target.value)}
        placeholder="Jane Doe"
        autoComplete="name"
      />

      <TextAreaField
        label="Summary"
        value={profile.summary}
        onChange={(event) => onChange("summary", event.target.value)}
        placeholder="Two or three sentences about your experience and goals."
      />

      <Field
        label="Email"
        type="email"
        inputMode="email"
        value={profile.email}
        onChange={(event) => onChange("email", event.target.value)}
        placeholder="jane@example.com"
        autoComplete="email"
      />

      <Field
        label="Phone"
        type="tel"
        inputMode="tel"
        value={profile.phone}
        onChange={(event) => onChange("phone", event.target.value)}
        placeholder="+1 555 0100"
        autoComplete="tel"
      />

      <Field
        label="Location"
        value={profile.location}
        onChange={(event) => onChange("location", event.target.value)}
        placeholder="City, Country"
        autoComplete="address-level2"
      />

      <Field
        label="Website"
        type="url"
        inputMode="url"
        value={profile.website}
        onChange={(event) => onChange("website", event.target.value)}
        placeholder="https://your-site.com"
      />
    </SectionCard>
  );
}
