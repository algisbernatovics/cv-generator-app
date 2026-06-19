import type { InputHTMLAttributes } from "react";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
}

export function Field({ label, hint, id, className = "", ...props }: FieldProps) {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <label htmlFor={fieldId} className="block space-y-1.5">
      <span className="text-sm font-medium text-ink">{label}</span>
      <input
        id={fieldId}
        className={`min-h-11 w-full rounded-xl border border-line bg-paper px-3.5 text-base text-ink shadow-sm placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 ${className}`}
        {...props}
      />
      {hint ? <span className="block text-xs text-muted">{hint}</span> : null}
    </label>
  );
}
