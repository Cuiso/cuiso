import { gsap } from "@/lib/gsap";

const DEFAULT_DURATION = 0.38;
const DEFAULT_EASE = "power2.inOut";

export function positionSegmentedPill(
  pill: HTMLElement,
  target: HTMLElement,
  options: {
    animate: boolean;
    onComplete?: () => void;
    duration?: number;
  },
) {
  const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = target;
  const props = {
    x: offsetLeft,
    y: offsetTop,
    width: offsetWidth,
    height: offsetHeight,
  };
  gsap.killTweensOf(pill);
  const onComplete = options.onComplete;
  if (options.animate) {
    gsap.to(pill, {
      ...props,
      duration: options.duration ?? DEFAULT_DURATION,
      ease: DEFAULT_EASE,
      onComplete,
    });
  } else {
    gsap.set(pill, props);
    onComplete?.();
  }
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
