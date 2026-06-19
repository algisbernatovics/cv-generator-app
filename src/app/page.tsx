"use client";

import CVGenerator from "../components/CVGenerator";
import "./page.css";

export default function HomePage() {
  return (
    <div className="cv-page">
      <header className="cv-header">
        <h1>CV Generator</h1>
        <p style={{ margin: "0.35rem 0 0", opacity: 0.85, fontSize: "0.95rem" }}>
          Fill in your details and preview your CV instantly.
        </p>
      </header>
      <main className="cv-main">
        <CVGenerator />
      </main>
    </div>
  );
}
