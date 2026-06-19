const monthFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  year: "numeric",
});

export function formatMonthYear(value: string): string {
  if (!value) {
    return "";
  }

  const [year, month] = value.split("-").map(Number);

  if (!year || !month) {
    return value;
  }

  return monthFormatter.format(new Date(year, month - 1, 1));
}

export function formatExperienceDates(
  startDate: string,
  endDate: string,
  isCurrent: boolean
): string {
  const start = formatMonthYear(startDate);

  if (!start) {
    return "";
  }

  if (isCurrent) {
    return `${start} – Present`;
  }

  const end = formatMonthYear(endDate);

  return end ? `${start} – ${end}` : start;
}
