import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  inset?: boolean;
};

export function Card({
  className,
  inset = false,
  children,
  ...props
}: CardProps) {
  return (
    <div
      data-reveal
      className={cn(
        "relative rounded-2xl bg-surface-card text-ink",
        inset && "bg-surface-card",
        className,
      )}
      {...props}
    >
      <div className="p-6">{children}</div>
    </div>
  );
}
