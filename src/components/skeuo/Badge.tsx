import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type SkeuoBadgeTone = "primary" | "secondary" | "tertiary" | "neutral";

const toneClass: Record<SkeuoBadgeTone, string> = {
  primary:
    "border border-[#0a1530]/55 bg-gradient-to-b from-[#1d3b6f]/25 to-[#0a1530]/15 text-ink",
  secondary:
    "border border-[#7a1a2d]/55 bg-gradient-to-b from-[#b22a45]/22 to-[#7a1a2d]/15 text-ink",
  tertiary:
    "border border-[#25613e]/55 bg-gradient-to-b from-[#3a8a5d]/25 to-[#25613e]/15 text-ink",
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
