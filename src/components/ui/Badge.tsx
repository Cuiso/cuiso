import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type BadgeTone = "primary" | "secondary" | "tertiary" | "neutral";

const toneClass: Record<BadgeTone, string> = {
  primary: "bg-surface-card text-ink/80",
  secondary: "bg-surface-card text-ash",
  tertiary: "bg-surface-card text-ash",
  neutral: "bg-surface-card text-ash",
};

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
};

export function Badge({
  className,
  tone = "neutral",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        toneClass[tone],
        className,
      )}
      {...props}
    />
  );
}
