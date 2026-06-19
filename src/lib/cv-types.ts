export interface CVProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
}

export interface CVExperience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

export interface CVData {
  profile: CVProfile;
  experiences: CVExperience[];
}

export const emptyProfile: CVProfile = {
  name: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  summary: "",
};

export const emptyCV: CVData = {
  profile: emptyProfile,
  experiences: [],
};

export function createExperienceId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `exp-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
