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
        const el = wrapRef.current;
        if (!el) return;

        const cards = el.querySelectorAll<HTMLElement>("[data-reveal]");
        if (!cards.length) return;

        gsap.set(cards, { y: 14, autoAlpha: 0 });

        ScrollTrigger.batch(cards, {
          start: "top 88%",
          onEnter: (batch) =>
            gsap.to(batch, {
              y: 0,
              autoAlpha: 1,
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.06,
              overwrite: true,
            }),
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        const el = wrapRef.current;
        if (!el) return;
        const cards = el.querySelectorAll<HTMLElement>("[data-reveal]");
        gsap.set(cards, { autoAlpha: 1, y: 0 });
      });

      return () => mm.revert();
    },
    { scope: wrapRef },
  );

  return <div ref={wrapRef}>{children}</div>;
}

export { ScrollTrigger };
