"use client";

import { type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type SkeuoToggleProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  pressed: boolean;
  onPressedChange?: (next: boolean) => void;
  label: string;
};

export function SkeuoToggle({
  pressed,
  onPressedChange,
  label,
  className,
  disabled,
  ...props
}: SkeuoToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={pressed}
      aria-label={label}
      disabled={disabled}
      className={cn(
        "relative h-8 w-14 shrink-0 rounded-full border border-ink/15 bg-gradient-to-b from-surface-card to-surface shadow-[var(--shadow-inset)] transition-transform duration-150 dark:border-ink/25",
        "focus-skeuo disabled:opacity-50",
        className,
      )}
      onClick={() => onPressedChange?.(!pressed)}
      {...props}
    >
      <span
        className={cn(
          "absolute top-0.5 block h-7 w-7 rounded-full border border-ink/10 bg-gradient-to-b from-white to-surface-card shadow-[var(--shadow-raised)] transition-[transform,box-shadow] duration-150 dark:from-surface-card dark:to-surface dark:border-ink/20",
          pressed ? "translate-x-6" : "translate-x-0.5",
        )}
      />
    </button>
  );
}
