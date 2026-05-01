import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type SkeuoChipProps = HTMLAttributes<HTMLSpanElement> & {
  active?: boolean;
};

export function SkeuoChip({
  className,
  active = false,
  ...props
}: SkeuoChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-ink/12 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-ink dark:border-ink/20",
        active
          ? "bg-gradient-to-b from-tertiary/25 to-tertiary/10 shadow-[var(--shadow-raised)]"
          : "bg-surface-card shadow-[var(--shadow-inset)] text-muted",
        className,
      )}
      {...props}
    />
  );
}
