import type { ButtonHTMLAttributes } from "react";

const variants = {
  primary:
    "bg-ink text-paper hover:bg-ink/90 focus-visible:ring-ink/40 disabled:bg-ink/50",
  secondary:
    "border border-line bg-paper text-ink hover:bg-canvas focus-visible:ring-ink/20",
  ghost: "text-muted hover:bg-canvas focus-visible:ring-ink/20",
  danger:
    "border border-danger/30 bg-danger/5 text-danger hover:bg-danger/10 focus-visible:ring-danger/30",
} as const;

type Variant = keyof typeof variants;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex min-h-11 items-center justify-center rounded-xl px-4 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
