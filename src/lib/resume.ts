export interface ResumeProfile {
  name: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  skills: string;
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

export interface ResumeEducation {
  id: string;
  degree: string;
  school: string;
  start: string;
  end: string;
  current: boolean;
  details: string;
}

export interface ResumeData {
  profile: ResumeProfile;
  jobs: ResumeJob[];
  education: ResumeEducation[];
}

export const emptyProfile: ResumeProfile = {
  name: "",
  summary: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  skills: "",
};

export const emptyResume: ResumeData = {
  profile: emptyProfile,
  jobs: [],
  education: [],
};

export function newId(prefix: string): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${prefix}-${Date.now()}`;
}

export function newJobId(): string {
  return newId("job");
}

export function newEducationId(): string {
  return newId("edu");
}

const STORAGE_KEY = "cv-resume-v3";

function isValidMonthParts(year: number, month: number): boolean {
  return Number.isInteger(year) && Number.isInteger(month) && month >= 1 && month <= 12 && year >= 1950 && year <= 2100;
}

/** Normalize stored dates to HTML month input format (YYYY-MM). */
export function normalizeMonthValue(value: string): string {
  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  const isoMatch = trimmed.match(/^(\d{4})-(\d{2})$/);

  if (isoMatch) {
    const year = Number(isoMatch[1]);
    const month = Number(isoMatch[2]);

    return isValidMonthParts(year, month) ? `${isoMatch[1]}-${isoMatch[2]}` : "";
  }

  const dotted = trimmed.match(/^(\d{1,2})\.(\d{1,2})\.(\d{2,4})$/);

  if (dotted) {
    const month = Number(dotted[2]);
    const rawYear = Number(dotted[3]);
    const year = rawYear < 100 ? 2000 + rawYear : rawYear;

    if (isValidMonthParts(year, month)) {
      return `${year}-${String(month).padStart(2, "0")}`;
    }
  }

  const yearOnly = trimmed.match(/^(\d{4})$/);

  if (yearOnly) {
    const year = Number(yearOnly[1]);

    if (year >= 1950 && year <= 2100) {
      return `${yearOnly[1]}-01`;
    }
  }

  return "";
}

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

    const jobs = Array.isArray(parsed.jobs)
      ? parsed.jobs.map((job) => ({
          ...job,
          start: normalizeMonthValue(job.start ?? ""),
          end: normalizeMonthValue(job.end ?? ""),
        }))
      : [];

    const education = Array.isArray(parsed.education)
      ? parsed.education.map((entry) => ({
          ...entry,
          start: normalizeMonthValue(entry.start ?? ""),
          end: normalizeMonthValue(entry.end ?? ""),
        }))
      : [];

    return {
      profile: { ...emptyProfile, ...parsed.profile },
      jobs,
      education,
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
  const normalized = normalizeMonthValue(value);

  if (!normalized) {
    return "";
  }

  const [year, month] = normalized.split("-").map(Number);

  if (!isValidMonthParts(year, month)) {
    return "";
  }

  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(
    new Date(year, month - 1, 1)
  );
}

export function formatDateRange(start: string, end: string, current: boolean): string {
  const startLabel = formatMonth(start);

  if (!startLabel) {
    return "";
  }

  if (current) {
    return `${startLabel} – Present`;
  }

  const endLabel = formatMonth(end);

  return endLabel ? `${startLabel} – ${endLabel}` : startLabel;
}

export function formatJobDates(job: ResumeJob): string {
  return formatDateRange(job.start, job.end, job.current);
}

export function formatEducationDates(entry: ResumeEducation): string {
  return formatDateRange(entry.start, entry.end, entry.current);
}

export function parseSkillLines(skills: string): string[] {
  return skills
    .split(/\n|,/)
    .map((line) => line.trim())
    .filter(Boolean);
}
