"use client";

import { useRef } from "react";
import { ChevronRight } from "lucide-react";
import { SkeuoAnchor } from "@/components/skeuo/Anchor";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const ROLES = ["AI", "Cloud", "Software", "Design"] as const;
const ANGELO_CHARS = ["A", "n", "g", "e", "l", "o"] as const;
const RODRIGUEZ_CHARS = [
  "R",
  "o",
  "d",
  "r",
  "i",
  "g",
  "u",
  "e",
  "z",
] as const;
// Source (serif) and target (mono) characters for the scramble morph.
// Same length keeps slots aligned 1:1.
const NAME_SLOTS = [
  { from: "L", to: "c" },
  { from: "u", to: "u" },
  { from: "i", to: "i" },
  { from: "s", to: "s" },
] as const;

interface Props {
  greeting: string;
  fullName: string;
  handle: string;
  rolesLine: string;
  ctaContact: string;
  ctaCv: string;
  cvAria: string;
}

export function HeroClient({
  greeting,
  fullName,
  handle,
  rolesLine,
  ctaContact,
  ctaCv,
  cvAria,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const greetRef = useRef<HTMLParagraphElement>(null);

  // Name line — single layer, scramble per slot
  const nameWrapRef = useRef<HTMLSpanElement>(null);
  const nameSlotRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const angeloWrapRef = useRef<HTMLSpanElement>(null);
  const angeloCharRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const rodriguezWrapRef = useRef<HTMLSpanElement>(null);
  const rodriguezCharRefs = useRef<Array<HTMLSpanElement | null>>([]);

  const oWrapRef = useRef<HTMLSpanElement>(null);

  const handleRef = useRef<HTMLParagraphElement>(null);
  const roleTextRef = useRef<HTMLSpanElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const reduced = ctx.conditions?.reduced ?? false;
          const ctaBtns = ctasRef.current
            ? Array.from(ctasRef.current.children)
            : [];
          const nameSlots = nameSlotRefs.current.filter(
            (el): el is HTMLSpanElement => el !== null,
          );
          const angeloChars = angeloCharRefs.current.filter(
            (el): el is HTMLSpanElement => el !== null,
          );
          const rodriguezChars = rodriguezCharRefs.current.filter(
            (el): el is HTMLSpanElement => el !== null,
          );

          // Reset slot text to source characters (serif/L u i s).
          nameSlots.forEach((el, i) => {
            const slot = NAME_SLOTS[i];
            if (slot) el.textContent = slot.from;
          });

          if (reduced) {
            gsap.set(
              [
                greetRef.current,
                handleRef.current,
                descRef.current,
                ...ctaBtns,
              ],
              { autoAlpha: 1, y: 0 },
            );
            // Show final state: mono "Cuiso"
            nameSlots.forEach((el, i) => {
              const slot = NAME_SLOTS[i];
              if (slot) el.textContent = slot.to;
            });
            gsap.set(nameSlots, {
              autoAlpha: 1,
              fontFamily: "var(--font-mono, ui-monospace, monospace)",
              color: "var(--color-primary)",
            });
            gsap.set([angeloWrapRef.current, rodriguezWrapRef.current], {
              autoAlpha: 0,
              display: "none",
            });
            gsap.set(nameWrapRef.current, { paddingRight: 0 });
            gsap.set(oWrapRef.current, { autoAlpha: 1 });
            return;
          }

          // ── Initial state ──────────────────────────────────────────────
          gsap.set([greetRef.current, handleRef.current, descRef.current], {
            autoAlpha: 0,
            y: 20,
          });
          gsap.set(ctaBtns, { autoAlpha: 0, y: 16 });

          // Name line: serif chars start hidden, drop in
          gsap.set(nameSlots, {
            autoAlpha: 0,
            y: 50,
            rotationX: -55,
            filter: "blur(6px)",
            transformOrigin: "left center",
          });
          // Angelo / Rodriguez chars start hidden, drop in per char
          gsap.set([...angeloChars, ...rodriguezChars], {
            autoAlpha: 0,
            y: 50,
            rotationX: -55,
            filter: "blur(6px)",
            transformOrigin: "left center",
          });

          gsap.set(oWrapRef.current, { autoAlpha: 0 });

          // ── Entrance timeline ─────────────────────────────────────────
          const entrance = gsap.timeline({
            defaults: { ease: "expo.out" },
          });
          entrance
            .to(greetRef.current, {
              autoAlpha: 1,
              y: 0,
              duration: 0.55,
              ease: "power3.out",
            })
            .to(
              nameSlots,
              {
                autoAlpha: 1,
                y: 0,
                rotationX: 0,
                filter: "blur(0px)",
                duration: 0.85,
                stagger: 0.05,
              },
              "-=0.2",
            )
            .to(
              angeloChars,
              {
                autoAlpha: 1,
                y: 0,
                rotationX: 0,
                filter: "blur(0px)",
                duration: 0.7,
                stagger: 0.04,
              },
              "-=0.65",
            )
            .to(
              rodriguezChars,
              {
                autoAlpha: 1,
                y: 0,
                rotationX: 0,
                filter: "blur(0px)",
                duration: 0.7,
                stagger: 0.035,
              },
              "-=0.55",
            )
            .to(
              handleRef.current,
              { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out" },
              "-=0.45",
            )
            .to(
              descRef.current,
              { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out" },
              "-=0.35",
            )
            .to(
              ctaBtns,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.12,
                ease: "power3.out",
              },
              "-=0.3",
            );

          // ── Caret blink ───────────────────────────────────────────────
          if (caretRef.current) {
            gsap.to(caretRef.current, {
              autoAlpha: 0,
              duration: 0.55,
              repeat: -1,
              yoyo: true,
              ease: "steps(1)",
            });
          }

          // ── Role typing carousel ──────────────────────────────────────
          entrance.call(() => {
            const el = roleTextRef.current;
            if (!el) return;
            let idx = 0;
            const typeWord = (word: string) => {
              const tl = gsap.timeline();
              for (let i = 0; i < word.length; i++) {
                tl.call(
                  () => {
                    el.textContent = word.slice(0, i + 1);
                  },
                  undefined,
                  i * 0.06,
                );
              }
              return tl;
            };
            const eraseWord = () => {
              const current = el.textContent ?? "";
              const len = current.length;
              const tl = gsap.timeline();
              for (let i = len; i > 0; i--) {
                tl.call(
                  () => {
                    el.textContent = current.slice(0, i - 1);
                  },
                  undefined,
                  (len - i) * 0.035,
                );
              }
              return tl;
            };
            const cycle = () => {
              const next = (idx + 1) % ROLES.length;
              gsap
                .timeline({
                  onComplete: () => {
                    idx = next;
                    gsap.delayedCall(1.8, cycle);
                  },
                })
                .add(eraseWord())
                .add(typeWord(ROLES[next]));
            };
            el.textContent = "";
            typeWord(ROLES[0]);
            gsap.delayedCall(2.2, cycle);
          });

          // ── Per-letter dissolve for Angelo / Rodriguez ────────────────
          const dissolveCharVars = {
            autoAlpha: 0,
            y: -22,
            rotationX: 60,
            scale: 1.05,
            filter: "blur(6px)",
            ease: "power2.in",
            transformOrigin: "50% 50% -10",
          } as const;

          // ── Scroll-linked morph timeline ──────────────────────────────
          const morphTl = gsap.timeline({
            scrollTrigger: {
              trigger: pinWrapRef.current,
              start: "top top",
              end: "+=2400",
              pin: pinWrapRef.current,
              pinSpacing: true,
              scrub: 1,
              anticipatePin: 1,
            },
          });

          // Stage 0 → 1: Angelo dissolves letter by letter, then wrapper collapses
          if (angeloChars.length) {
            morphTl.to(
              angeloChars,
              {
                ...dissolveCharVars,
                duration: 0.5,
                stagger: 0.06,
              },
              0,
            );
          }
          if (angeloWrapRef.current) {
            morphTl.to(
              angeloWrapRef.current,
              {
                width: 0,
                paddingRight: 0,
                duration: 0.4,
                ease: "power2.inOut",
              },
              0.7,
            );
          }

          // Stage 1 → 2: Rodriguez dissolves letter by letter, then collapses
          if (rodriguezChars.length) {
            morphTl.to(
              rodriguezChars,
              {
                ...dissolveCharVars,
                duration: 0.5,
                stagger: 0.045,
              },
              1.1,
            );
          }
          if (rodriguezWrapRef.current) {
            morphTl.to(
              rodriguezWrapRef.current,
              {
                width: 0,
                paddingRight: 0,
                duration: 0.4,
                ease: "power2.inOut",
              },
              1.95,
            );
          }

          // Stage 2 → 3: Luis → Cuis scramble per slot
          // Collapse the trailing padding so "cuis" sits flush with the "o".
          if (nameWrapRef.current) {
            morphTl.to(
              nameWrapRef.current,
              {
                paddingRight: 0,
                duration: 0.5,
                ease: "power2.inOut",
              },
              2.4,
            );
          }
          // Each slot scrambles through random characters and lands on the
          // mono target character. Color + font transition simultaneously.
          nameSlots.forEach((slot, i) => {
            const target = NAME_SLOTS[i];
            if (!target) return;
            const start = 2.4 + i * 0.12;
            morphTl.to(
              slot,
              {
                duration: 0.65,
                ease: "none",
                scrambleText: {
                  text: target.to,
                  chars: "upperAndLowerCase",
                  speed: 0.6,
                  revealDelay: 0,
                },
              },
              start,
            );
            morphTl.to(
              slot,
              {
                color: "var(--color-primary)",
                fontFamily:
                  "var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)",
                fontWeight: 700,
                duration: 0.65,
                ease: "power2.inOut",
              },
              start,
            );
          });

          // Stage 3 → 3.4: subtle settle (no aggressive bounce)
          morphTl.fromTo(
            nameSlots,
            { scale: 1.04 },
            { scale: 1, duration: 0.3, ease: "power2.out", stagger: 0.02 },
            3.0,
          );

          // Stage 3.4: "o" appears in place — simple fade-in, no splash
          morphTl.to(
            oWrapRef.current,
            { autoAlpha: 1, duration: 0.4, ease: "power2.out" },
            3.4,
          );

          if (typeof document !== "undefined" && "fonts" in document) {
            document.fonts.ready.then(() => ScrollTrigger.refresh());
          }
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label={fullName}
      className="scroll-mt-28"
    >
      <div
        ref={pinWrapRef}
        className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden py-20 md:py-28"
      >
        <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
          <p
            ref={greetRef}
            className="font-mono text-xs uppercase tracking-[0.25em] text-muted"
          >
            {greeting}
          </p>

          <h1
            className="mt-4 relative font-serif font-semibold tracking-tight text-ink text-[clamp(2rem,7.5vw,5.5rem)] leading-[1.1]"
            style={{ perspective: "1400px" }}
          >
            <span
              aria-hidden="true"
              className="flex items-baseline whitespace-nowrap"
            >
              {/* Slot-shared name: serif "Luis" scrambles into mono primary "cuis" */}
              <span
                ref={nameWrapRef}
                className="inline-flex items-baseline"
                style={{ paddingRight: "0.28em" }}
              >
                {NAME_SLOTS.map((slot, i) => (
                  <span
                    key={i}
                    ref={(el) => {
                      nameSlotRefs.current[i] = el;
                    }}
                    className="inline-block will-change-transform"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {slot.from}
                  </span>
                ))}
              </span>

              {/* Angelo — letter by letter */}
              <span
                ref={angeloWrapRef}
                className="inline-flex items-baseline whitespace-nowrap will-change-transform"
                style={{ paddingRight: "0.28em" }}
              >
                {ANGELO_CHARS.map((ch, i) => (
                  <span
                    key={i}
                    ref={(el) => {
                      angeloCharRefs.current[i] = el;
                    }}
                    className="inline-block will-change-transform"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {ch}
                  </span>
                ))}
              </span>

              {/* Rodriguez — letter by letter */}
              <span
                ref={rodriguezWrapRef}
                className="inline-flex items-baseline whitespace-nowrap will-change-transform"
                style={{ paddingRight: "0.28em" }}
              >
                {RODRIGUEZ_CHARS.map((ch, i) => (
                  <span
                    key={i}
                    ref={(el) => {
                      rodriguezCharRefs.current[i] = el;
                    }}
                    className="inline-block will-change-transform"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {ch}
                  </span>
                ))}
              </span>

              {/* The "o" — appears in place at the end of "cuis" */}
              <span
                ref={oWrapRef}
                className="inline-block font-mono font-bold text-primary will-change-transform"
              >
                o
              </span>
            </span>
          </h1>

          <p
            ref={handleRef}
            className="mt-8 font-mono text-base md:text-lg text-muted"
          >
            <span className="text-primary">{handle.toLowerCase()}</span>
            <span className="text-muted/70">@portfolio</span>
            <span className="text-muted/50">:~$</span>{" "}
            <span className="text-ink/80">role</span>
            <span className="text-muted/60">=</span>
            <span className="text-secondary">&quot;</span>
            <span ref={roleTextRef} className="text-secondary">
              AI
            </span>
            <span className="text-secondary">&quot;</span>
            <span
              ref={caretRef}
              aria-hidden="true"
              className="ml-1 inline-block w-[0.55em] h-[1em] align-[-0.15em] bg-primary"
            />
          </p>

          <p ref={descRef} className="mt-8 max-w-2xl text-lg text-ink/90">
            {rolesLine}
          </p>

          <div
            ref={ctasRef}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <SkeuoAnchor href="#contact" variant="primary">
              {ctaContact} <ChevronRight className="h-4 w-4" aria-hidden />
            </SkeuoAnchor>
            <SkeuoAnchor
              href="/cv.pdf"
              variant="secondary"
              download
              aria-label={cvAria}
            >
              {ctaCv}
            </SkeuoAnchor>
          </div>
        </div>
      </div>
    </section>
  );
}
