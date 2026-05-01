"use client";

import { useRef } from "react";
import { ChevronRight } from "lucide-react";
import { SkeuoAnchor } from "@/components/skeuo/Anchor";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

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

/** Serif → mono slots; equal length for ScrambleText. */
const NAME_SLOTS = [
  { from: "L", to: "c" },
  { from: "u", to: "u" },
  { from: "i", to: "i" },
  { from: "s", to: "s" },
] as const;

const NAME_GAP_EM = "0.28em";

const MORPH_SCROLL = {
  end: "+=2400",
  /** Seconds for the timeline to ease toward the scroll position; higher = softer on fast wheel. */
  scrub: 2,
  anticipatePin: 1,
} as const;

/**
 * First surname tween must start after t=0 so ScrollTrigger at progress 0
 * does not apply the morph "from" state (autoAlpha 1) during the intro.
 */
const MORPH_IDLE_PAD = 0.02;

/** Gap after a wrap finishes (before the next surname’s letter block). */
const MORPH_PHASE_GAP = 0.1;

/**
 * Start wrap width slightly before the letter stagger ends so scrub reverse isn’t
 * “empty box expands, then letters pop in”.
 */
const MORPH_WRAP_OVERLAP_INTO_LETTERS = 0.2;

/**
 * Per-letter fade: `each` ≈ `duration` so letters don’t all dissolve at once (scrub).
 * Both surnames: strict sequence (no inter-letter overlap — smoother scrub reverse).
 */
const MORPH_LETTER_ANGELO = { duration: 0.22, each: 0.22 } as const;
const MORPH_LETTER_RODRIGUEZ = { duration: 0.2, each: 0.2 } as const;
/** Ease for Angelo/Rodriguez letter fades and wrap width (softer than linear under scrub). */
const MORPH_SURNAME_EASE = "sine.inOut";

/** Deltas after `namePadding` start (unchanged feel vs previous timeline). */
const MORPH_SETTLE_AFTER_NAME_PADDING = 0.65;
const MORPH_MONO_O_AFTER_SETTLE = 0.35;

const MORPH_SCRAMBLE_SLOT_STAGGER = 0.12;

const MORPH_DUR = {
  wrapCollapse: 0.35,
  namePadding: 0.5,
  scramble: 0.65,
  settle: 0.3,
  monoO: 0.4,
} as const;

function letterStaggerSpan(
  charCount: number,
  each: number,
  duration: number,
) {
  if (charCount <= 1) return duration;
  return (charCount - 1) * each + duration;
}

function buildMorphTimes() {
  const w = MORPH_DUR.wrapCollapse;
  const g = MORPH_PHASE_GAP;
  const idle = MORPH_IDLE_PAD;
  const overlap = MORPH_WRAP_OVERLAP_INTO_LETTERS;

  const angSpan = letterStaggerSpan(
    ANGELO_CHARS.length,
    MORPH_LETTER_ANGELO.each,
    MORPH_LETTER_ANGELO.duration,
  );
  const tAngeloChars = idle;
  const tAngeloWrap = idle + angSpan - overlap;
  const afterAngeloWrap = tAngeloWrap + w;

  const rodSpan = letterStaggerSpan(
    RODRIGUEZ_CHARS.length,
    MORPH_LETTER_RODRIGUEZ.each,
    MORPH_LETTER_RODRIGUEZ.duration,
  );
  const tRodriguezChars = afterAngeloWrap + g;
  const tRodriguezWrap = tRodriguezChars + rodSpan - overlap;
  const afterRodWrap = tRodriguezWrap + w;

  const tNamePadding = afterRodWrap + g;
  const tSettle = tNamePadding + MORPH_SETTLE_AFTER_NAME_PADDING;
  const tMonoO = tSettle + MORPH_MONO_O_AFTER_SETTLE;

  return {
    tAngeloChars,
    tAngeloWrap,
    tRodriguezChars,
    tRodriguezWrap,
    tNamePadding,
    tSettle,
    tMonoO,
  };
}

const MORPH_T = buildMorphTimes();

interface Props {
  greeting: string;
  fullName: string;
  handle: string;
  roleLabels: string[];
  rolesLine: string;
  ctaContact: string;
  ctaCv: string;
  cvAria: string;
}

export function HeroClient({
  greeting,
  fullName,
  handle,
  roleLabels,
  rolesLine,
  ctaContact,
  ctaCv,
  cvAria,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const greetRef = useRef<HTMLParagraphElement>(null);

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
            nameSlots.forEach((el, i) => {
              const slot = NAME_SLOTS[i];
              if (slot) el.textContent = slot.to;
            });
            gsap.set(nameSlots, {
              autoAlpha: 1,
              fontFamily: "var(--font-mono, ui-monospace, monospace)",
            });
            nameSlots.forEach((el) => el.classList.add("text-primary"));
            gsap.set([angeloWrapRef.current, rodriguezWrapRef.current], {
              autoAlpha: 0,
              display: "none",
            });
            gsap.set(nameWrapRef.current, { paddingRight: 0 });
            gsap.set(oWrapRef.current, { autoAlpha: 1 });
            return;
          }

          gsap.set([greetRef.current, handleRef.current, descRef.current], {
            autoAlpha: 0,
            y: 20,
          });
          gsap.set(ctaBtns, { autoAlpha: 0, y: 16 });

          gsap.set(nameSlots, {
            autoAlpha: 0,
            y: 50,
            rotationX: -55,
            filter: "blur(6px)",
            transformOrigin: "left center",
          });
          gsap.set([...angeloChars, ...rodriguezChars], {
            autoAlpha: 0,
          });

          gsap.set(oWrapRef.current, { autoAlpha: 0 });

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

          if (caretRef.current) {
            gsap.to(caretRef.current, {
              autoAlpha: 0,
              duration: 0.55,
              repeat: -1,
              yoyo: true,
              ease: "steps(1)",
            });
          }

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
              const next = (idx + 1) % roleLabels.length;
              gsap
                .timeline({
                  onComplete: () => {
                    idx = next;
                    gsap.delayedCall(1.8, cycle);
                  },
                })
                .add(eraseWord())
                .add(typeWord(roleLabels[next]));
            };
            el.textContent = "";
            typeWord(roleLabels[0] ?? "");
            gsap.delayedCall(2.2, cycle);
          });

          let rodriguezWrapFullWidth = 0;
          let angeloWrapFullWidth = 0;

          // Until true, morph progress stays 0 (avoids ST + scroll restoration during intro).
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

          function addMorphWrapCollapse(
            tl: gsap.core.Timeline,
            wrap: HTMLSpanElement,
            getFullWidth: () => number,
            position: number,
          ) {
            tl.fromTo(
              wrap,
              {
                width: () => {
                  const w = getFullWidth();
                  return w > 0 ? w : wrap.offsetWidth;
                },
                paddingRight: NAME_GAP_EM,
              },
              {
                width: 0,
                paddingRight: 0,
                duration: MORPH_DUR.wrapCollapse,
                ease: MORPH_SURNAME_EASE,
                immediateRender: false,
              },
              position,
            );
          }

          const morphTl = gsap.timeline({
            scrollTrigger: {
              trigger: pinWrapRef.current,
              start: "top top",
              end: MORPH_SCROLL.end,
              pin: pinWrapRef.current,
              pinSpacing: true,
              scrub: MORPH_SCROLL.scrub,
              anticipatePin: MORPH_SCROLL.anticipatePin,
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

          if (angeloChars.length) {
            morphTl.fromTo(
              angeloChars,
              { autoAlpha: 1 },
              {
                autoAlpha: 0,
                duration: MORPH_LETTER_ANGELO.duration,
                stagger: { each: MORPH_LETTER_ANGELO.each, from: "end" },
                ease: MORPH_SURNAME_EASE,
                immediateRender: false,
              },
              MORPH_T.tAngeloChars,
            );
          }
          if (angeloWrapRef.current) {
            addMorphWrapCollapse(
              morphTl,
              angeloWrapRef.current,
              () => angeloWrapFullWidth,
              MORPH_T.tAngeloWrap,
            );
          }

          if (rodriguezChars.length) {
            morphTl.fromTo(
              rodriguezChars,
              { autoAlpha: 1 },
              {
                autoAlpha: 0,
                duration: MORPH_LETTER_RODRIGUEZ.duration,
                stagger: { each: MORPH_LETTER_RODRIGUEZ.each, from: "end" },
                ease: MORPH_SURNAME_EASE,
                immediateRender: false,
              },
              MORPH_T.tRodriguezChars,
            );
          }
          if (rodriguezWrapRef.current) {
            addMorphWrapCollapse(
              morphTl,
              rodriguezWrapRef.current,
              () => rodriguezWrapFullWidth,
              MORPH_T.tRodriguezWrap,
            );
          }

          if (nameWrapRef.current) {
            morphTl.fromTo(
              nameWrapRef.current,
              { paddingRight: NAME_GAP_EM },
              {
                paddingRight: 0,
                duration: MORPH_DUR.namePadding,
                ease: "power2.inOut",
                immediateRender: false,
              },
              MORPH_T.tNamePadding,
            );
          }
          nameSlots.forEach((slot, i) => {
            const target = NAME_SLOTS[i];
            if (!target) return;
            const start =
              MORPH_T.tNamePadding + i * MORPH_SCRAMBLE_SLOT_STAGGER;
            morphTl.to(
              slot,
              {
                duration: MORPH_DUR.scramble,
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
                fontFamily:
                  "var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)",
                fontWeight: 700,
                duration: MORPH_DUR.scramble,
                ease: "power2.inOut",
                onComplete: () => slot.classList.add("text-primary"),
                onReverseComplete: () => slot.classList.remove("text-primary"),
              },
              start,
            );
          });

          morphTl.fromTo(
            nameSlots,
            { scale: 1.04 },
            {
              scale: 1,
              duration: MORPH_DUR.settle,
              ease: "power2.out",
              stagger: 0.02,
            },
            MORPH_T.tSettle,
          );

          morphTl.fromTo(
            oWrapRef.current,
            { autoAlpha: 0 },
            {
              autoAlpha: 1,
              duration: MORPH_DUR.monoO,
              ease: "power2.out",
              immediateRender: false,
            },
            MORPH_T.tMonoO,
          );

          if (typeof document !== "undefined" && "fonts" in document) {
            document.fonts.ready.then(() => ScrollTrigger.refresh());
          }
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [roleLabels] },
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
            className="mt-4 relative font-serif font-semibold tracking-tight text-ink text-[clamp(2rem,7.5vw,5.5rem)] leading-[1.2]"
            style={{ perspective: "1400px" }}
          >
            <span
              aria-hidden="true"
              className="flex items-baseline whitespace-nowrap"
            >
              <span
                ref={nameWrapRef}
                className="inline-flex items-baseline"
                style={{ paddingRight: NAME_GAP_EM }}
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

              <span
                ref={angeloWrapRef}
                className="inline-flex items-baseline overflow-hidden whitespace-nowrap will-change-transform"
                style={{
                  paddingRight: NAME_GAP_EM,
                  paddingBottom: "0.18em",
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

              <span
                ref={rodriguezWrapRef}
                className="inline-flex items-baseline overflow-hidden whitespace-nowrap will-change-transform"
                style={{
                  paddingRight: NAME_GAP_EM,
                  paddingBottom: "0.18em",
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
            <span ref={roleTextRef} className="text-secondary" />
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
