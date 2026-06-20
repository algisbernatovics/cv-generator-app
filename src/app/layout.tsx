import "./globals.css";
import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CV Builder",
  description: "Create a clean resume on your phone or desktop. Auto-saved in your browser.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className={spaceGrotesk.className}>
        {children}
        <div id="cv-datepicker-portal" />
      </body>
    </html>
  );
}
