"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Anchor } from "@/components/ui/Anchor";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/data/profile";
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
 * Per-letter fade: `each` ≈ `duration` so letters don’t all dissolve at once (scrub).
 * Rodriguez: strict sequence (no inter-letter overlap — smoother scrub reverse).
 */
const MORPH_LETTER_RODRIGUEZ = { duration: 0.2, each: 0.2 } as const;
/** Ease for Angelo/Rodriguez letter fades and wrap width (softer than linear under scrub). */
const MORPH_SURNAME_EASE = "sine.inOut";

const MORPH_SCRAMBLE_SLOT_STAGGER = 0.12;

const MORPH_DUR = {
  wrapCollapse: 0.35,
  namePadding: 0.5,
  scramble: 0.65,
  settle: 0.3,
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

  const rodSpan = letterStaggerSpan(
    RODRIGUEZ_CHARS.length,
    MORPH_LETTER_RODRIGUEZ.each,
    MORPH_LETTER_RODRIGUEZ.duration,
  );
  const tRodriguezChars = idle;
  // The wrap collapse ends exactly as the last letter finishes fading. Ending it
  // any later leaves a wide, empty box that shoves the name off-centre until it
  // snaps back — visible whenever scrub leaves the playhead inside that window.
  const tRodriguezWrap = tRodriguezChars + rodSpan - w;
  const afterRodWrap = tRodriguezWrap + w;

  // Join: collapse inter-word gaps while the whole word scrambles "Luis Angelo"
  // → "cuisangelo" in one continuous left-to-right sweep.
  const tJoin = afterRodWrap + g;
  const scrambleSpan =
    (NAME_SLOTS.length + ANGELO_CHARS.length - 1) *
      MORPH_SCRAMBLE_SLOT_STAGGER +
    MORPH_DUR.scramble;
  // Settle scale finishes as the last letter resolves.
  const tSettle = tJoin + scrambleSpan - MORPH_DUR.settle;

  return {
    tRodriguezChars,
    tRodriguezWrap,
    tJoin,
    tSettle,
  };
}

const MORPH_T = buildMorphTimes();

interface Props {
  greeting: string;
  fullName: string;
  roleLabels: string[];
  rolesLine: string;
  ctaContact: string;
  ctaCv: string;
  cvAria: string;
}

export function HeroClient({
  greeting,
  fullName,
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

  const handleRef = useRef<HTMLParagraphElement>(null);
  const roleTextRef = useRef<HTMLSpanElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);

  const roleLabelsRef = useRef(roleLabels);
  useEffect(() => {
    roleLabelsRef.current = roleLabels;
  }, [roleLabels]);

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
            const firstAngelo = angeloChars[0];
            if (firstAngelo) firstAngelo.textContent = "a";
            gsap.set(angeloChars, { autoAlpha: 1 });
            gsap.set(angeloWrapRef.current, {
              autoAlpha: 1,
              paddingRight: 0,
              fontFamily: "var(--font-mono, ui-monospace, monospace)",
              fontWeight: 700,
            });
            angeloWrapRef.current?.classList.add("text-primary");
            gsap.set(rodriguezWrapRef.current, {
              autoAlpha: 0,
              display: "none",
            });
            gsap.set(nameWrapRef.current, { paddingRight: 0 });
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
              const labels = roleLabelsRef.current;
              const next = (idx + 1) % labels.length;
              gsap
                .timeline({
                  onComplete: () => {
                    idx = next;
                    gsap.delayedCall(1.8, cycle);
                  },
                })
                .add(eraseWord())
                .add(typeWord(labels[next] ?? ""));
            };
            el.textContent = "";
            typeWord(roleLabelsRef.current[0] ?? "");
            gsap.delayedCall(2.2, cycle);
          });

          let rodriguezWrapFullWidth = 0;

          // Until true, morph progress stays 0 (avoids ST + scroll restoration during intro).
          let entranceFinished = false;

          /**
           * Measure the natural Rodriguez wrap width without touching morph timeline
           * progress. Temporarily forcing progress to 0 (old approach) changes layout
           * height and breaks ScrollTrigger when scrolling back up past the pin.
           */
          function captureRodriguezWrapWidth() {
            const rod = rodriguezWrapRef.current;
            if (!rod) return;
            gsap.set(rod, { clearProps: "width,maxWidth" });
            rodriguezWrapFullWidth = rod.offsetWidth;
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
              onUpdate: () => {
                if (!entranceFinished) morphTl.progress(0);
              },
            },
          });

          entrance.eventCallback("onComplete", () => {
            entranceFinished = true;
            captureRodriguezWrapWidth();
            ScrollTrigger.refresh();
          });

          // "Angelo" stays as the brand suffix: drop the gap so it joins "cuis",
          // then scramble + restyle each letter with the same distortion as the
          // name, so "Luis Angelo" resolves into "cuisangelo" in one sweep.
          if (angeloWrapRef.current) {
            morphTl.fromTo(
              angeloWrapRef.current,
              { paddingRight: NAME_GAP_EM },
              {
                paddingRight: 0,
                duration: MORPH_DUR.namePadding,
                ease: "power2.inOut",
                immediateRender: false,
              },
              MORPH_T.tJoin,
            );
          }
          angeloChars.forEach((ch, i) => {
            // Continue the name's stagger so the whole word sweeps left to right.
            const start =
              MORPH_T.tJoin +
              (nameSlots.length + i) * MORPH_SCRAMBLE_SLOT_STAGGER;
            morphTl.to(
              ch,
              {
                duration: MORPH_DUR.scramble,
                ease: "none",
                scrambleText: {
                  text: ANGELO_CHARS[i]?.toLowerCase() ?? "",
                  chars: "upperAndLowerCase",
                  speed: 0.6,
                  revealDelay: 0,
                },
              },
              start,
            );
            morphTl.to(
              ch,
              {
                fontFamily:
                  "var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)",
                fontWeight: 700,
                duration: MORPH_DUR.scramble,
                ease: "power2.inOut",
                onComplete: () => ch.classList.add("text-primary"),
                onReverseComplete: () => ch.classList.remove("text-primary"),
              },
              start,
            );
          });

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
              MORPH_T.tJoin,
            );
          }
          nameSlots.forEach((slot, i) => {
            const target = NAME_SLOTS[i];
            if (!target) return;
            const start = MORPH_T.tJoin + i * MORPH_SCRAMBLE_SLOT_STAGGER;
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
            [...nameSlots, ...angeloChars],
            { scale: 1.04 },
            {
              scale: 1,
              duration: MORPH_DUR.settle,
              ease: "power2.out",
              stagger: 0.02,
            },
            MORPH_T.tSettle,
          );

          if (typeof document !== "undefined" && "fonts" in document) {
            document.fonts.ready.then(() => {
              if (!entranceFinished) return;
              // Only remeasure if still at morph start — else avoid layout thrash.
              if (morphTl.progress() <= 0.01) captureRodriguezWrapWidth();
              ScrollTrigger.refresh();
            });
          }
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [] },
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
        <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-5 text-center">
          <Image
            src="/avatar.jpg"
            alt={fullName}
            width={80}
            height={80}
            priority
            className="mb-7 h-20 w-20 rounded-full object-cover ring-1 ring-black/5"
          />

          <p
            ref={greetRef}
            className="font-mono text-[13px] tracking-tight text-ash"
          >
            {greeting}
          </p>

          <h1
            className="mt-3 relative font-sans font-bold tracking-[-0.02em] text-ink text-[clamp(2rem,9vw,3.5rem)] leading-[1.05]"
            style={{ perspective: "1400px" }}
          >
            <span
              aria-hidden="true"
              className="flex items-baseline justify-center whitespace-nowrap"
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
                    style={{ transformStyle: "preserve-3d", willChange: "transform, filter" }}
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
            </span>
          </h1>

          <p
            ref={descRef}
            className="mt-5 max-w-md text-[17px] leading-snug text-ash md:text-[19px]"
          >
            {rolesLine}
          </p>

          <p
            ref={handleRef}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-charcoal px-4 py-2 font-mono text-[13px] text-white"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#30d158]" aria-hidden />
            <span ref={roleTextRef} />
            <span
              ref={caretRef}
              aria-hidden="true"
              className="inline-block h-[1em] w-[0.5em] align-[-0.15em] bg-white/70"
            />
          </p>

          <div
            ref={ctasRef}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
          >
            <Anchor href="#contact" variant="primary">
              {ctaContact} <ChevronRight className="h-4 w-4" aria-hidden />
            </Anchor>
            <Anchor
              href="/cv.pdf"
              variant="secondary"
              download
              aria-label={cvAria}
            >
              {ctaCv}
            </Anchor>
          </div>

          <div className="mt-7 flex items-center gap-2">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-card text-ink/70 transition-colors hover:text-ink focus-ring"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-card text-ink/70 transition-colors hover:text-ink focus-ring"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
