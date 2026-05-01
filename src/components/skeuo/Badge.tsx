import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type SkeuoBadgeTone = "primary" | "secondary" | "tertiary" | "neutral";

const toneClass: Record<SkeuoBadgeTone, string> = {
  primary:
    "border border-[#1d4ed8]/70 bg-gradient-to-b from-[#2563eb]/25 to-[#1e40af]/20 text-ink",
  secondary:
    "border border-[#991b1b]/50 bg-gradient-to-b from-[#dc2626]/20 to-[#b91c1c]/15 text-ink",
  tertiary:
    "border border-[#166534]/50 bg-gradient-to-b from-[#16a34a]/20 to-[#15803d]/15 text-ink",
  neutral:
    "border border-ink/15 bg-surface text-ink dark:border-ink/25",
};

export type SkeuoBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: SkeuoBadgeTone;
};

export function SkeuoBadge({
  className,
  tone = "neutral",
  ...props
}: SkeuoBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium shadow-[var(--shadow-raised)]",
        toneClass[tone],
        className,
      )}
      {...props}
    />
  );
}
