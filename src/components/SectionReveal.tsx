"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

interface Props {
  children: ReactNode;
}

export function SectionReveal({ children }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const section = wrapRef.current?.querySelector("section");
        if (!section) return;

        const container = section.querySelector<HTMLElement>(":scope > div");
        if (!container) return;

        const items = Array.from(container.children);

        gsap.from(items, {
          y: 36,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            once: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: wrapRef },
  );

  // Thin wrapper — no style impact, just provides the ref
  return <div ref={wrapRef}>{children}</div>;
}

// Re-export ScrollTrigger so callers can refresh if needed
export { ScrollTrigger };
