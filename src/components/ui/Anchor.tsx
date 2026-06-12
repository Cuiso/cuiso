import { type AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { buttonClasses, type ButtonVariant } from "@/components/ui/Button";

export type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonVariant;
};

export function Anchor({
  className,
  variant = "primary",
  ...props
}: AnchorProps) {
  return (
    <a className={cn(buttonClasses(variant), className)} {...props} />
  );
}
