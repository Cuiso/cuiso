import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "w-full rounded-lg border border-hairline bg-surface px-3 py-2.5 text-[15px] text-ink outline-none transition-colors",
        "placeholder:text-mist focus-ring focus:border-charcoal",
        className,
      )}
      {...props}
    />
  ),
);

Input.displayName = "Input";
