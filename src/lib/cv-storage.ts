import { emptyCV, type CVData } from "@/lib/cv-types";

const STORAGE_KEY = "cv-generator-v2";

export function readCVFromStorage(): CVData {
  if (typeof window === "undefined") {
    return emptyCV;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return emptyCV;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<CVData>;

    return {
      profile: { ...emptyCV.profile, ...parsed.profile },
      experiences: Array.isArray(parsed.experiences) ? parsed.experiences : [],
    };
  } catch {
    return emptyCV;
  }
}

export function writeCVToStorage(data: CVData): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function clearCVStorage(): void {
  window.localStorage.removeItem(STORAGE_KEY);
}
