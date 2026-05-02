import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type SkeuoButtonVariant = "primary" | "secondary" | "tertiary" | "ghost";

const variantClass: Record<SkeuoButtonVariant, string> = {
  primary:
    "border border-[#0a1530]/90 bg-gradient-to-b from-[#1d3b6f] to-[#0a1530] text-white hover:brightness-[1.06]",
  secondary:
    "border border-[#7a1a2d]/80 bg-gradient-to-b from-[#b22a45] to-[#7a1a2d] text-white hover:brightness-[1.06]",
  tertiary:
    "border border-[#25613e]/80 bg-gradient-to-b from-[#3a8a5d] to-[#25613e] text-white hover:brightness-[1.06]",
  ghost:
    "border border-ink/15 bg-gradient-to-b from-surface-card to-surface text-ink dark:border-ink/25",
};

const baseClass =
  "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold " +
  "shadow-[var(--shadow-raised)] transition-[transform,filter,box-shadow] duration-150 " +
  "active:translate-y-px active:shadow-[var(--shadow-pressed)] " +
  "disabled:pointer-events-none disabled:opacity-50 focus-skeuo";

export type SkeuoButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: SkeuoButtonVariant;
};

export const SkeuoButton = forwardRef<HTMLButtonElement, SkeuoButtonProps>(
  ({ className, variant = "primary", type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(baseClass, variantClass[variant], className)}
      {...props}
    />
  ),
);

SkeuoButton.displayName = "SkeuoButton";

export function skeuoButtonClasses(
  variant: SkeuoButtonVariant = "primary",
  className?: string,
) {
  return cn(baseClass, variantClass[variant], className);
}
