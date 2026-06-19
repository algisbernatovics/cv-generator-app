export interface ResumeProfile {
  name: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  website: string;
}

export interface ResumeJob {
  id: string;
  title: string;
  company: string;
  start: string;
  end: string;
  current: boolean;
  details: string;
}

export interface ResumeData {
  profile: ResumeProfile;
  jobs: ResumeJob[];
}

export const emptyProfile: ResumeProfile = {
  name: "",
  summary: "",
  email: "",
  phone: "",
  location: "",
  website: "",
};

export const emptyResume: ResumeData = {
  profile: emptyProfile,
  jobs: [],
};

export function newJobId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `job-${Date.now()}`;
}

const STORAGE_KEY = "cv-resume-v3";

export function loadResume(): ResumeData {
  if (typeof window === "undefined") {
    return emptyResume;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return emptyResume;
    }

    const parsed = JSON.parse(raw) as Partial<ResumeData>;

    return {
      profile: { ...emptyProfile, ...parsed.profile },
      jobs: Array.isArray(parsed.jobs) ? parsed.jobs : [],
    };
  } catch {
    return emptyResume;
  }
}

export function saveResume(data: ResumeData): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function clearResumeStorage(): void {
  window.localStorage.removeItem(STORAGE_KEY);
}

export function formatMonth(value: string): string {
  if (!value) {
    return "";
  }

  const [year, month] = value.split("-").map(Number);

  if (!year || !month) {
    return value;
  }

  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(
    new Date(year, month - 1, 1)
  );
}

export function formatJobDates(job: ResumeJob): string {
  const start = formatMonth(job.start);

  if (!start) {
    return "";
  }

  if (job.current) {
    return `${start} – Present`;
  }

  const end = formatMonth(job.end);

  return end ? `${start} – ${end}` : start;
}
