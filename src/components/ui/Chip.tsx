import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type ChipProps = HTMLAttributes<HTMLSpanElement> & {
  active?: boolean;
};

export function Chip({
  className,
  active = false,
  ...props
}: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[13px] font-medium transition-colors",
        active ? "bg-charcoal text-white" : "bg-surface-card text-ink/80",
        className,
      )}
      {...props}
    />
  );
}
