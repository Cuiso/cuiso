import { type AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { skeuoButtonClasses, type SkeuoButtonVariant } from "@/components/skeuo/Button";

export type SkeuoAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: SkeuoButtonVariant;
};

export function SkeuoAnchor({
  className,
  variant = "primary",
  ...props
}: SkeuoAnchorProps) {
  return (
    <a className={cn(skeuoButtonClasses(variant), className)} {...props} />
  );
}
