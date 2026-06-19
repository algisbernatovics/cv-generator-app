"use client";

import { useEffect, useRef, useState } from "react";
import PersonalInfoInputCard from "./PersonalInfoInputCard";
import PersonalInfoOutputCard from "./PersonalInfoOutput";
import WorkExperienceInputCard from "./WorkExperienceInputCard";
import WorkExperienceOutput from "./WorkExperienceOutput";

export interface Experience {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface CVFormState {
  name: string;
  email: string;
  phoneNumber: string;
  objective: string;
  website: string;
  location: string;
  experiences: Experience[];
}

const STORAGE_KEY = "cv-generator-form-v1";

const defaultState: CVFormState = {
  name: "",
  email: "",
  phoneNumber: "",
  objective: "",
  website: "",
  location: "",
  experiences: [],
};

const formFields: (keyof CVFormState)[] = [
  "name",
  "email",
  "phoneNumber",
  "objective",
  "website",
  "location",
  "experiences",
];

function readStoredState(): CVFormState {
  if (typeof window === "undefined") {
    return defaultState;
  }

  const saved = window.localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return defaultState;
  }

  try {
    return { ...defaultState, ...(JSON.parse(saved) as Partial<CVFormState>) };
  } catch {
    return defaultState;
  }
}

const CVGenerator = () => {
  const [name, setName] = useState(defaultState.name);
  const [email, setEmail] = useState(defaultState.email);
  const [phoneNumber, setPhoneNumber] = useState(defaultState.phoneNumber);
  const [objective, setObjective] = useState(defaultState.objective);
  const [website, setWebsite] = useState(defaultState.website);
  const [location, setLocation] = useState(defaultState.location);
  const [experiences, setExperiences] = useState<Experience[]>(defaultState.experiences);
  const [editExperience, setEditExperience] = useState<Experience | null>(null);
  const [editExperienceIndex, setEditExperienceIndex] = useState<number | null>(
    null
  );
  const [hydrated, setHydrated] = useState(false);
  const editedFields = useRef<Partial<Record<keyof CVFormState, true>>>({});

  const markFieldEdited = (field: keyof CVFormState) => {
    editedFields.current[field] = true;
  };

  useEffect(() => {
    const stored = readStoredState();
    const edited = editedFields.current;

    setName((current) => (edited.name ? current : stored.name));
    setEmail((current) => (edited.email ? current : stored.email));
    setPhoneNumber((current) =>
      edited.phoneNumber ? current : stored.phoneNumber
    );
    setObjective((current) => (edited.objective ? current : stored.objective));
    setWebsite((current) => (edited.website ? current : stored.website));
    setLocation((current) => (edited.location ? current : stored.location));
    setExperiences((current) =>
      edited.experiences ? current : stored.experiences
    );
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    const payload: CVFormState = {
      name,
      email,
      phoneNumber,
      objective,
      website,
      location,
      experiences,
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [
    hydrated,
    name,
    email,
    phoneNumber,
    objective,
    website,
    location,
    experiences,
  ]);

  const handleAddExperience = (experience: Experience) => {
    markFieldEdited("experiences");
    setExperiences((current) => [...current, experience]);
  };

  const handleSaveExperience = (index: number, experience: Experience) => {
    markFieldEdited("experiences");
    setExperiences((current) => {
      const updated = [...current];
      updated[index] = experience;
      return updated;
    });
    setEditExperience(null);
    setEditExperienceIndex(null);
  };

  const handleEditExperience = (experience: Experience, index: number) => {
    setEditExperience(experience);
    setEditExperienceIndex(index);
  };

  const handleDeleteExperience = (index: number) => {
    markFieldEdited("experiences");
    setExperiences((current) => current.filter((_, i) => i !== index));
  };

  const handleClearForm = () => {
    formFields.forEach(markFieldEdited);
    setName("");
    setEmail("");
    setPhoneNumber("");
    setObjective("");
    setWebsite("");
    setLocation("");
    setExperiences([]);
    setEditExperience(null);
    setEditExperienceIndex(null);
    window.localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleClearForm}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          Clear form
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2 lg:items-start">
        <section aria-label="CV editor" className="space-y-4">
          <PersonalInfoInputCard
            name={name}
            email={email}
            website={website}
            phoneNumber={phoneNumber}
            location={location}
            objective={objective}
            onChangeName={(e) => {
              markFieldEdited("name");
              setName(e.target.value);
            }}
            onChangeObjective={(e) => {
              markFieldEdited("objective");
              setObjective(e.target.value);
            }}
            onChangeEmail={(e) => {
              markFieldEdited("email");
              setEmail(e.target.value);
            }}
            onChangeWebsite={(e) => {
              markFieldEdited("website");
              setWebsite(e.target.value);
            }}
            onChangePhoneNumber={(e) => {
              markFieldEdited("phoneNumber");
              setPhoneNumber(e.target.value);
            }}
            onChangeLocation={(e) => {
              markFieldEdited("location");
              setLocation(e.target.value);
            }}
          />

          <WorkExperienceInputCard
            onAddExperience={handleAddExperience}
            onSaveExperience={handleSaveExperience}
            editExperience={editExperience}
            editExperienceIndex={editExperienceIndex}
            setEditExperience={setEditExperience}
          />
        </section>

        <section
          aria-label="CV preview"
          className="rounded-xl border border-slate-200 bg-white p-2 shadow-sm lg:sticky lg:top-4"
        >
          <PersonalInfoOutputCard
            name={name}
            email={email}
            website={website}
            phoneNumber={phoneNumber}
            location={location}
            objective={objective}
          />

          <WorkExperienceOutput
            experiences={experiences}
            onEditExperience={handleEditExperience}
            onDeleteExperience={handleDeleteExperience}
          />
        </section>
      </div>
    </div>
  );
};

export default CVGenerator;
