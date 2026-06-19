import type { TextareaHTMLAttributes } from "react";

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
}

export function TextAreaField({
  label,
  hint,
  id,
  className = "",
  ...props
}: TextAreaFieldProps) {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <label htmlFor={fieldId} className="block space-y-1.5">
      <span className="text-sm font-medium text-ink">{label}</span>
      <textarea
        id={fieldId}
        className={`min-h-[7rem] w-full resize-y rounded-xl border border-line bg-paper px-3.5 py-3 text-base text-ink shadow-sm placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 ${className}`}
        {...props}
      />
      {hint ? <span className="block text-xs text-muted">{hint}</span> : null}
    </label>
  );
}
