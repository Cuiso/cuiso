import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type SkeuoCardProps = HTMLAttributes<HTMLDivElement> & {
  inset?: boolean;
};

export function SkeuoCard({
  className,
  inset = false,
  ...props
}: SkeuoCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-ink/10 bg-surface-card p-5 text-ink dark:border-ink/20",
        inset ? "shadow-[var(--shadow-inset)]" : "shadow-[var(--shadow-raised)]",
        className,
      )}
      {...props}
    />
  );
}
