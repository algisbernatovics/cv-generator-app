import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CV Builder",
  description: "Create a clean resume on your phone or desktop. Auto-saved in your browser.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${inter.variable} ${inter.className}`}>
        {children}
        <div id="cv-datepicker-portal" />
      </body>
    </html>
  );
}
