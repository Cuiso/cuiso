"use client";

import { type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type ToggleProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  pressed: boolean;
  onPressedChange?: (next: boolean) => void;
  label: string;
};

export function Toggle({
  pressed,
  onPressedChange,
  label,
  className,
  disabled,
  ...props
}: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={pressed}
      aria-label={label}
      disabled={disabled}
      className={cn(
        "relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200 focus-ring disabled:opacity-50",
        pressed ? "bg-charcoal" : "bg-pebble",
        className,
      )}
      onClick={() => onPressedChange?.(!pressed)}
      {...props}
    >
      <span
        className={cn(
          "absolute top-0.5 block h-6 w-6 rounded-full bg-white transition-transform duration-200",
          pressed ? "translate-x-[1.375rem]" : "translate-x-0.5",
        )}
      />
    </button>
  );
}
