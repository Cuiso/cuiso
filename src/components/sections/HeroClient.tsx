"use client";

import { useRef } from "react";
import { ChevronRight } from "lucide-react";
import { SkeuoAnchor } from "@/components/skeuo/Anchor";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const ROLES = ["AI", "Cloud", "Software", "Design"] as const;
const LUIS_CHARS = ["L", "u", "i", "s"] as const;
const CUIS_CHARS = ["c", "u", "i", "s"] as const;

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

  // Layer A — serif/ink
  const layerARef = useRef<HTMLSpanElement>(null);
  const luisSerifRef = useRef<HTMLSpanElement>(null);
  const luisCharRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const angeloRef = useRef<HTMLSpanElement>(null);
  const rodriguezRef = useRef<HTMLSpanElement>(null);

  // Layer B — mono/primary (Cuiso)
  const cuisRef = useRef<HTMLSpanElement>(null);
  const cuisCharRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const oWrapRef = useRef<HTMLSpanElement>(null);
  const oCharRef = useRef<HTMLSpanElement>(null);
  const oHaloRef = useRef<SVGCircleElement>(null);
  const oHaloOuterRef = useRef<SVGCircleElement>(null);

  const progressBarRef = useRef<HTMLDivElement>(null);
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
          const luisChars = luisCharRefs.current.filter(
            (el): el is HTMLSpanElement => el !== null,
          );
          const cuisChars = cuisCharRefs.current.filter(
            (el): el is HTMLSpanElement => el !== null,
          );
          const formalWords = [
            luisSerifRef.current,
            angeloRef.current,
            rodriguezRef.current,
          ].filter(Boolean) as HTMLSpanElement[];

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
            gsap.set(layerARef.current, { autoAlpha: 0 });
            gsap.set([angeloRef.current, rodriguezRef.current], {
              autoAlpha: 0,
              width: 0,
              paddingRight: 0,
            });
            gsap.set([cuisRef.current, oWrapRef.current], { autoAlpha: 1 });
            gsap.set([...cuisChars, oCharRef.current], {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              rotationX: 0,
            });
            return;
          }

          // ── Initial state ──────────────────────────────────────────────
          gsap.set([greetRef.current, handleRef.current, descRef.current], {
            autoAlpha: 0,
            y: 20,
          });
          gsap.set(ctaBtns, { autoAlpha: 0, y: 16 });
          gsap.set(formalWords, {
            autoAlpha: 0,
            y: 60,
            rotationX: -55,
            filter: "blur(8px)",
            transformOrigin: "left center",
          });
          // Layer B chars start hidden, slightly above and rotated forward
          gsap.set(cuisChars, {
            autoAlpha: 0,
            y: -30,
            rotationX: 60,
            scale: 0.85,
            filter: "blur(4px)",
            transformOrigin: "50% 50% -20",
          });
          // o starts hidden
          gsap.set(oWrapRef.current, { autoAlpha: 0 });
          gsap.set(oCharRef.current, {
            scale: 0.4,
            y: -18,
            filter: "blur(8px)",
            transformOrigin: "50% 50%",
          });
          if (oHaloRef.current) {
            gsap.set(oHaloRef.current, {
              attr: { r: 30, "stroke-opacity": 0, "stroke-width": 6 },
            });
          }
          if (oHaloOuterRef.current) {
            gsap.set(oHaloOuterRef.current, {
              attr: { r: 30, "stroke-opacity": 0, "stroke-width": 4 },
            });
          }

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
              formalWords,
              {
                autoAlpha: 1,
                y: 0,
                rotationX: 0,
                filter: "blur(0px)",
                duration: 0.95,
                stagger: 0.09,
              },
              "-=0.2",
            )
            .to(
              handleRef.current,
              { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out" },
              "-=0.55",
            )
            .to(
              descRef.current,
              { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out" },
              "-=0.4",
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

          // ── Scroll-linked morph timeline ──────────────────────────────
          const collapseVars = {
            autoAlpha: 0,
            width: 0,
            paddingRight: 0,
            scale: 0.6,
            rotationY: -30,
            letterSpacing: "-0.05em",
            filter: "blur(6px)",
            duration: 0.95,
            ease: "power3.inOut",
            transformOrigin: "left center",
          } as const;

          const morphTl = gsap.timeline({
            scrollTrigger: {
              trigger: pinWrapRef.current,
              start: "top top",
              end: "+=2200",
              pin: pinWrapRef.current,
              pinSpacing: true,
              scrub: 1,
              anticipatePin: 1,
              onUpdate: (self) => {
                if (progressBarRef.current) {
                  gsap.set(progressBarRef.current, { scaleX: self.progress });
                }
              },
            },
          });

          // Stage 0→1: Angelo collapses
          if (angeloRef.current) {
            morphTl.to(angeloRef.current, collapseVars, 0);
          }
          // Stage 1→2: Rodriguez collapses
          if (rodriguezRef.current) {
            morphTl.to(rodriguezRef.current, collapseVars, 1);
          }

          // Stage 2→3: Luis (serif/ink) → Cuis (mono/primary)
          // Same-slot synchronized flip: serif chars rotate UP and away while
          // mono chars rotate IN from above. Tightly staggered (L→c first).
          if (luisChars.length) {
            morphTl.to(
              luisChars,
              {
                rotationX: -90,
                y: 28,
                scale: 1.05,
                autoAlpha: 0,
                filter: "blur(4px)",
                duration: 0.55,
                stagger: 0.05,
                ease: "power3.in",
                transformOrigin: "50% 50% -20",
              },
              2,
            );
          }
          if (cuisChars.length) {
            morphTl.to(
              cuisChars,
              {
                rotationX: 0,
                y: 0,
                scale: 1,
                autoAlpha: 1,
                filter: "blur(0px)",
                duration: 0.55,
                stagger: 0.05,
                ease: "power3.out",
              },
              2.2,
            );
          }

          // Stage 3 → 3.4: "Cuis" breathing (pause beat ~250ms)
          if (cuisRef.current) {
            morphTl.to(
              cuisRef.current,
              {
                scale: 1.025,
                duration: 0.18,
                ease: "sine.inOut",
                transformOrigin: "left center",
              },
              3.0,
            );
            morphTl.to(
              cuisRef.current,
              { scale: 1, duration: 0.22, ease: "sine.inOut" },
              3.18,
            );
          }

          // Stage 3.4 → 4: "o" hero reveal (distinct mechanism: drop-in + halo rings)
          morphTl.to(
            oWrapRef.current,
            { autoAlpha: 1, duration: 0.05 },
            3.4,
          );
          morphTl.to(
            oCharRef.current,
            {
              scale: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.5,
              ease: "back.out(2.4)",
            },
            3.42,
          );
          // Halo ring — inner (faster, brighter)
          if (oHaloRef.current) {
            morphTl.to(
              oHaloRef.current,
              {
                attr: { r: 75, "stroke-opacity": 0.7, "stroke-width": 3 },
                duration: 0.22,
                ease: "power2.out",
              },
              3.55,
            );
            morphTl.to(
              oHaloRef.current,
              {
                attr: { r: 130, "stroke-opacity": 0, "stroke-width": 1 },
                duration: 0.3,
                ease: "power2.out",
              },
              3.77,
            );
          }
          // Halo ring — outer (slower, wider ripple)
          if (oHaloOuterRef.current) {
            morphTl.to(
              oHaloOuterRef.current,
              {
                attr: { r: 100, "stroke-opacity": 0.45, "stroke-width": 2 },
                duration: 0.3,
                ease: "power2.out",
              },
              3.65,
            );
            morphTl.to(
              oHaloOuterRef.current,
              {
                attr: { r: 180, "stroke-opacity": 0, "stroke-width": 1 },
                duration: 0.35,
                ease: "power2.out",
              },
              3.95,
            );
          }
          // Settle micro-bounce on "o"
          morphTl.to(
            oCharRef.current,
            {
              scale: 1.08,
              duration: 0.08,
              ease: "power2.out",
            },
            3.9,
          );
          morphTl.to(
            oCharRef.current,
            {
              scale: 1,
              duration: 0.18,
              ease: "back.out(3)",
            },
            3.98,
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
      className="scroll-mt-28 border-b border-ink/10 dark:border-ink/15"
    >
      <div
        ref={pinWrapRef}
        className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden py-20 md:py-28"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 top-0 h-[3px] bg-ink/5"
        >
          <div
            ref={progressBarRef}
            className="h-full origin-left bg-gradient-to-r from-primary via-primary to-secondary"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
          <p
            ref={greetRef}
            className="font-mono text-xs uppercase tracking-[0.25em] text-muted"
          >
            {greeting}
          </p>

          <h1
            className="mt-4 relative"
            style={{ perspective: "1400px" }}
          >
            {/* Layer A — formal name (serif/ink) */}
            <span
              ref={layerARef}
              aria-hidden="true"
              className="font-serif font-semibold tracking-tight text-ink text-[clamp(2rem,7.5vw,5.5rem)] leading-[1.1] flex items-baseline whitespace-nowrap will-change-transform"
            >
              <span
                ref={luisSerifRef}
                className="inline-flex items-baseline will-change-transform"
                style={{ paddingRight: "0.28em" }}
              >
                {LUIS_CHARS.map((ch, i) => (
                  <span
                    key={i}
                    ref={(el) => {
                      luisCharRefs.current[i] = el;
                    }}
                    className="inline-block will-change-transform"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {ch}
                  </span>
                ))}
              </span>
              <span
                ref={angeloRef}
                className="inline-block whitespace-nowrap overflow-hidden will-change-transform"
                style={{ paddingRight: "0.28em" }}
              >
                Angelo
              </span>
              <span
                ref={rodriguezRef}
                className="inline-block whitespace-nowrap overflow-hidden will-change-transform"
                style={{ paddingRight: "0.28em" }}
              >
                Rodriguez
              </span>
            </span>

            {/* Layer B — handle (mono/primary), absolute overlay */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 font-mono font-bold tracking-tight text-primary text-[clamp(2rem,7.5vw,5.5rem)] leading-[1.1] flex items-baseline whitespace-nowrap"
            >
              <span
                ref={cuisRef}
                className="inline-flex items-baseline will-change-transform"
              >
                {CUIS_CHARS.map((ch, i) => (
                  <span
                    key={i}
                    ref={(el) => {
                      cuisCharRefs.current[i] = el;
                    }}
                    className="inline-block will-change-transform"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {ch}
                  </span>
                ))}
              </span>
              <span
                ref={oWrapRef}
                className="relative inline-block will-change-transform"
              >
                <svg
                  viewBox="0 0 200 200"
                  preserveAspectRatio="xMidYMid meet"
                  className="absolute left-1/2 top-1/2 z-0 h-[280%] w-[280%] -translate-x-1/2 -translate-y-1/2 overflow-visible pointer-events-none"
                  aria-hidden="true"
                >
                  <circle
                    ref={oHaloOuterRef}
                    cx="100"
                    cy="100"
                    r="30"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="4"
                    strokeOpacity="0"
                  />
                  <circle
                    ref={oHaloRef}
                    cx="100"
                    cy="100"
                    r="30"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="6"
                    strokeOpacity="0"
                  />
                </svg>
                <span
                  ref={oCharRef}
                  className="relative z-10 inline-block will-change-transform"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  o
                </span>
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
