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

const MONTH_NAMES: Record<string, number> = {
  jan: 1,
  january: 1,
  feb: 2,
  february: 2,
  mar: 3,
  march: 3,
  apr: 4,
  april: 4,
  may: 5,
  jun: 6,
  june: 6,
  jul: 7,
  july: 7,
  aug: 8,
  august: 8,
  sep: 9,
  sept: 9,
  september: 9,
  oct: 10,
  october: 10,
  nov: 11,
  november: 11,
  dec: 12,
  december: 12,
};

function isValidMonthParts(year: number, month: number): boolean {
  return Number.isInteger(year) && Number.isInteger(month) && month >= 1 && month <= 12 && year >= 1950 && year <= 2100;
}

function toMonthValue(year: number, month: number): string {
  if (!isValidMonthParts(year, month)) {
    return "";
  }

  return `${year}-${String(month).padStart(2, "0")}`;
}

function expandYear(rawYear: number): number {
  return rawYear < 100 ? 2000 + rawYear : rawYear;
}

/** Normalize manual date text to internal format (YYYY-MM). */
export function normalizeMonthValue(value: string): string {
  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  const isoMatch = trimmed.match(/^(\d{4})-(\d{1,2})$/);

  if (isoMatch) {
    return toMonthValue(Number(isoMatch[1]), Number(isoMatch[2]));
  }

  const yearFirst = trimmed.match(/^(\d{4})[/.](\d{1,2})$/);

  if (yearFirst) {
    return toMonthValue(Number(yearFirst[1]), Number(yearFirst[2]));
  }

  const monthFirst = trimmed.match(/^(\d{1,2})[/.](\d{2,4})$/);

  if (monthFirst) {
    return toMonthValue(expandYear(Number(monthFirst[2])), Number(monthFirst[1]));
  }

  const dottedDayMonth = trimmed.match(/^(\d{1,2})\.(\d{1,2})\.(\d{2,4})$/);

  if (dottedDayMonth) {
    return toMonthValue(expandYear(Number(dottedDayMonth[3])), Number(dottedDayMonth[2]));
  }

  const namedMonth = trimmed.match(/^([a-zA-Z]+)\s+(\d{4})$/);

  if (namedMonth) {
    const month = MONTH_NAMES[namedMonth[1].toLowerCase()];

    if (month) {
      return toMonthValue(Number(namedMonth[2]), month);
    }
  }

  const yearOnly = trimmed.match(/^(\d{4})$/);

  if (yearOnly) {
    return toMonthValue(Number(yearOnly[1]), 1);
  }

  return "";
}

export function isValidMonthInput(value: string): boolean {
  return normalizeMonthValue(value) !== "";
}

export function parseMonthValue(value: string): Date | null {
  const normalized = normalizeMonthValue(value);

  if (!normalized) {
    return null;
  }

  const [year, month] = normalized.split("-").map(Number);

  if (!isValidMonthParts(year, month)) {
    return null;
  }

  return new Date(year, month - 1, 1);
}

export function dateToMonthValue(date: Date): string {
  return toMonthValue(date.getFullYear(), date.getMonth() + 1);
}

/** Friendly label for editing stored dates in a text field. */
export function formatMonthForInput(value: string): string {
  const formatted = formatMonth(value);

  return formatted || value.trim();
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
