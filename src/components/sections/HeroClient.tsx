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
          // Angelo / Rodriguez chars start invisible. Pure opacity fade keeps
          // the entrance and the scroll-reverse visually identical.
          gsap.set([...angeloChars, ...rodriguezChars], {
            autoAlpha: 0,
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
                duration: 0.5,
                stagger: 0.05,
                ease: "none",
              },
              "-=0.65",
            )
            .to(
              rodriguezChars,
              {
                autoAlpha: 1,
                duration: 0.5,
                stagger: 0.04,
                ease: "none",
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
          // Pure opacity fade per letter. Identical visual whether played
          // forward (scroll down) or reversed (scroll up / page entrance).

          // Measured px widths — avoids width:"auto" in scrubbed fromTo (bad reverse).
          let rodriguezWrapFullWidth = 0;
          let angeloWrapFullWidth = 0;

          // Until the intro finishes, morph must stay at progress 0. Otherwise
          // ScrollTrigger (e.g. scroll restoration) can run the Angelo dissolve;
          // stagger from "end" then leaves only "o" visibly at full opacity.
          let entranceFinished = false;

          function captureSurnameWrapWidths(morphTimeline: gsap.core.Timeline) {
            const rod = rodriguezWrapRef.current;
            const ang = angeloWrapRef.current;
            if (!rod || !ang) return;
            const saved = entranceFinished ? morphTimeline.progress() : 0;
            morphTimeline.progress(0);
            gsap.set([rod, ang], { clearProps: "width,maxWidth" });
            rodriguezWrapFullWidth = rod.offsetWidth;
            angeloWrapFullWidth = ang.offsetWidth;
            morphTimeline.progress(saved);
          }

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
              invalidateOnRefresh: true,
              onRefresh: () => captureSurnameWrapWidths(morphTl),
              onUpdate: () => {
                if (!entranceFinished) morphTl.progress(0);
              },
            },
          });

          entrance.eventCallback("onComplete", () => {
            entranceFinished = true;
            captureSurnameWrapWidths(morphTl);
            ScrollTrigger.refresh();
          });

          // Tiny offset so morph does not apply "from" (autoAlpha: 1) at timeline 0.
          // Otherwise ScrollTrigger at scroll start forces Angelo letters visible and
          // wipes entrance gsap.set before the intro finishes (notably the final "o").
          const morphIdlePad = 0.02;

          // Stage 0 → 1: Angelo first — wrap collapse pulls Rodriguez next to Luis
          // ("Luis Angelo Rodriguez" → "Luis Rodriguez" with Rodriguez sliding left).
          // Stagger from end = right-to-left fade.
          if (angeloChars.length) {
            morphTl.fromTo(
              angeloChars,
              { autoAlpha: 1 },
              {
                autoAlpha: 0,
                duration: 0.5,
                stagger: { each: 0.06, from: "end" },
                ease: "none",
                immediateRender: false,
              },
              morphIdlePad,
            );
          }
          if (angeloWrapRef.current) {
            morphTl.fromTo(
              angeloWrapRef.current,
              {
                width: () =>
                  angeloWrapFullWidth > 0
                    ? angeloWrapFullWidth
                    : (angeloWrapRef.current?.offsetWidth ?? 0),
                paddingRight: "0.28em",
              },
              {
                width: 0,
                paddingRight: 0,
                duration: 0.35,
                ease: "power2.inOut",
                immediateRender: false,
              },
              0.95,
            );
          }

          // Stage 1 → 2: Rodriguez dissolves, then collapses (after Angelo is gone)
          if (rodriguezChars.length) {
            morphTl.fromTo(
              rodriguezChars,
              { autoAlpha: 1 },
              {
                autoAlpha: 0,
                duration: 0.5,
                stagger: { each: 0.045, from: "end" },
                ease: "none",
                immediateRender: false,
              },
              1.4,
            );
          }
          if (rodriguezWrapRef.current) {
            morphTl.fromTo(
              rodriguezWrapRef.current,
              {
                width: () =>
                  rodriguezWrapFullWidth > 0
                    ? rodriguezWrapFullWidth
                    : (rodriguezWrapRef.current?.offsetWidth ?? 0),
                paddingRight: "0.28em",
              },
              {
                width: 0,
                paddingRight: 0,
                duration: 0.35,
                ease: "power2.inOut",
                immediateRender: false,
              },
              2.3,
            );
          }

          // Stage 2 → 3: Luis → Cuis scramble per slot
          // Collapse the trailing padding so "cuis" sits flush with the "o".
          if (nameWrapRef.current) {
            morphTl.fromTo(
              nameWrapRef.current,
              { paddingRight: "0.28em" },
              {
                paddingRight: 0,
                duration: 0.5,
                ease: "power2.inOut",
                immediateRender: false,
              },
              2.75,
            );
          }
          // Each slot scrambles through random characters and lands on the
          // mono target character. Color + font transition simultaneously.
          nameSlots.forEach((slot, i) => {
            const target = NAME_SLOTS[i];
            if (!target) return;
            const start = 2.75 + i * 0.12;
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
            3.4,
          );

          // Stage 3.4: "o" appears in place — fromTo keeps autoAlpha 0 before this
          // segment (avoids stray "Luis…o" after refresh / ST scrub at progress 0).
          morphTl.fromTo(
            oWrapRef.current,
            { autoAlpha: 0 },
            {
              autoAlpha: 1,
              duration: 0.4,
              ease: "power2.out",
              immediateRender: false,
            },
            3.75,
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
                    className="inline-block opacity-0 will-change-transform"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {slot.from}
                  </span>
                ))}
              </span>

              {/* Angelo — letter by letter */}
              <span
                ref={angeloWrapRef}
                className="inline-flex items-baseline overflow-hidden whitespace-nowrap will-change-transform"
                style={{
                  paddingRight: "0.28em",
                  clipPath: "inset(-100% 0 -100% 0)",
                }}
              >
                {ANGELO_CHARS.map((ch, i) => (
                  <span
                    key={i}
                    ref={(el) => {
                      angeloCharRefs.current[i] = el;
                    }}
                    className="inline-block opacity-0 will-change-transform"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {ch}
                  </span>
                ))}
              </span>

              {/* Rodriguez — letter by letter */}
              <span
                ref={rodriguezWrapRef}
                className="inline-flex items-baseline overflow-hidden whitespace-nowrap will-change-transform"
                style={{
                  paddingRight: "0.28em",
                  clipPath: "inset(-100% 0 -100% 0)",
                }}
              >
                {RODRIGUEZ_CHARS.map((ch, i) => (
                  <span
                    key={i}
                    ref={(el) => {
                      rodriguezCharRefs.current[i] = el;
                    }}
                    className="inline-block opacity-0 will-change-transform"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {ch}
                  </span>
                ))}
              </span>

              {/* The "o" — appears in place at the end of "cuis" */}
              <span
                ref={oWrapRef}
                className="inline-block opacity-0 font-mono font-bold text-primary will-change-transform"
                aria-hidden="true"
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
