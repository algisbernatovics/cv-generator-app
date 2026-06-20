function sanitizeFilename(name: string): string {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return slug || "resume";
}

export async function exportResumePdf(element: HTMLElement, name: string): Promise<void> {
  const html2pdf = (await import("html2pdf.js")).default;

  await html2pdf()
    .set({
      margin: [12, 14, 12, 14],
      filename: `${sanitizeFilename(name)}.pdf`,
      html2canvas: {
        scale: 2,
        logging: false,
        useCORS: true,
        letterRendering: true,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
    })
    .from(element)
    .save();
}
