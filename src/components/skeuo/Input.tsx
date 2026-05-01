import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type SkeuoInputProps = InputHTMLAttributes<HTMLInputElement>;

export const SkeuoInput = forwardRef<HTMLInputElement, SkeuoInputProps>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "w-full rounded-md border border-ink/15 bg-surface px-3 py-2.5 text-sm text-ink shadow-[var(--shadow-inset)] outline-none",
        "placeholder:text-muted dark:border-ink/25",
        "focus-skeuo focus:border-primary/60",
        className,
      )}
      {...props}
    />
  ),
);

SkeuoInput.displayName = "SkeuoInput";
