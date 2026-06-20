const DEFAULT_SITE_URL = "https://cv-generator-app-dun.vercel.app";

export const siteName = "CV Builder";

export const siteTitle = "CV Builder — Free Online Resume Maker";

export const siteDescription =
  "Build a clean, ATS-friendly CV in your browser. Mobile editor, live preview, and one-click PDF download. Auto-saved locally — no account required.";

export const siteKeywords = [
  "cv builder",
  "resume maker",
  "free cv generator",
  "online resume builder",
  "pdf resume",
  "ats resume",
  "curriculum vitae",
  "job application",
];

export const gaMeasurementId = process.env.NEXT_PUBLIC_GA_ID ?? "G-1FETL3KTPN";

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

  if (fromEnv) {
    return fromEnv;
  }

  if (process.env.VERCEL_ENV === "production") {
    if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
      return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
    }

    return DEFAULT_SITE_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return DEFAULT_SITE_URL;
}
