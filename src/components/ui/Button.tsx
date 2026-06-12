import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "ghost";

const variantClass: Record<ButtonVariant, string> = {
  // Devfolio's signature: a single dark charcoal pill.
  primary: "bg-charcoal text-white hover:bg-[#373b47]",
  secondary:
    "border border-[#d7dade] text-ink hover:bg-surface-card",
  tertiary: "bg-surface-card text-ink hover:bg-[#e6e8ec]",
  ghost: "text-ink/80 hover:text-ink hover:underline underline-offset-2",
};

const baseClass =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 " +
  "text-[15px] font-medium leading-none transition-colors duration-200 " +
  "disabled:pointer-events-none disabled:opacity-40 focus-ring";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(baseClass, variantClass[variant], className)}
      {...props}
    />
  ),
);

Button.displayName = "Button";

export function buttonClasses(
  variant: ButtonVariant = "primary",
  className?: string,
) {
  return cn(baseClass, variantClass[variant], className);
}
