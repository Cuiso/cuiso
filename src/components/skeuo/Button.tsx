import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type SkeuoButtonVariant = "primary" | "secondary" | "tertiary" | "ghost";

const variantClass: Record<SkeuoButtonVariant, string> = {
  primary:
    "border border-[#1d4ed8]/90 bg-gradient-to-b from-[#2563eb] to-[#1e40af] text-white hover:brightness-[1.04]",
  secondary:
    "border border-[#991b1b]/80 bg-gradient-to-b from-[#dc2626] to-[#b91c1c] text-white hover:brightness-[1.04]",
  tertiary:
    "border border-[#166534]/80 bg-gradient-to-b from-[#15803d] to-[#14532d] text-white hover:brightness-[1.04]",
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
