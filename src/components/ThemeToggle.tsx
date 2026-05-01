"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import {
  positionSegmentedPill,
  prefersReducedMotion,
} from "@/lib/segmentedPill";

export function ThemeToggle() {
  const t = useTranslations("theme");
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [busy, setBusy] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const lightRef = useRef<HTMLButtonElement>(null);
  const darkRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional mount gate for hydration
    setMounted(true);
  }, []);

  const dark = resolvedTheme === "dark";
  const activeKey = dark ? "dark" : "light";

  useGSAP(
    () => {
      if (!mounted) return;
      const pill = pillRef.current;
      const activeBtn = dark ? darkRef.current : lightRef.current;
      if (!pill || !activeBtn) return;
      gsap.killTweensOf(pill);
      positionSegmentedPill(pill, activeBtn, { animate: false });
    },
    {
      dependencies: [activeKey, mounted],
      scope: trackRef,
      revertOnUpdate: true,
    },
  );

  function selectLight() {
    if (!dark || busy) return;
    const pill = pillRef.current;
    const targetBtn = lightRef.current;
    if (!pill || !targetBtn) return;
    setBusy(true);
    const reduced = prefersReducedMotion();
    positionSegmentedPill(pill, targetBtn, {
      animate: !reduced,
      onComplete: () => {
        setTheme("light");
        setBusy(false);
      },
    });
  }

  function selectDark() {
    if (dark || busy) return;
    const pill = pillRef.current;
    const targetBtn = darkRef.current;
    if (!pill || !targetBtn) return;
    setBusy(true);
    const reduced = prefersReducedMotion();
    positionSegmentedPill(pill, targetBtn, {
      animate: !reduced,
      onComplete: () => {
        setTheme("dark");
        setBusy(false);
      },
    });
  }

  if (!mounted) {
    return (
      <span
        aria-hidden
        className="inline-flex h-9 w-[4.25rem] shrink-0 rounded-full border border-ink/15 bg-gradient-to-b from-surface-card to-surface p-1 shadow-[var(--shadow-inset)] dark:border-ink/25"
      />
    );
  }

  return (
    <div
      ref={trackRef}
      className={cn(
        "relative inline-flex h-9 shrink-0 items-center gap-1 rounded-full border border-ink/15 bg-gradient-to-b from-surface-card to-surface p-1 shadow-[var(--shadow-inset)] dark:border-ink/25",
      )}
      role="group"
      aria-label={t("toggle")}
    >
      <span
        ref={pillRef}
        aria-hidden
        className="pointer-events-none absolute z-0 rounded-full border border-ink/10 bg-gradient-to-b from-primary/20 to-primary/10 shadow-[var(--shadow-raised)] will-change-transform dark:border-ink/20"
        style={{ left: 0, top: 0 }}
      />
      <button
        ref={lightRef}
        type="button"
        disabled={busy}
        onClick={selectLight}
        title={t("light")}
        aria-label={t("light")}
        aria-pressed={!dark}
        className={cn(
          "relative z-10 flex h-7 w-7 items-center justify-center rounded-full focus-skeuo disabled:opacity-60",
          !dark ? "text-ink" : "text-muted hover:text-ink",
        )}
      >
        <Sun className="h-4 w-4" aria-hidden />
      </button>
      <button
        ref={darkRef}
        type="button"
        disabled={busy}
        onClick={selectDark}
        title={t("dark")}
        aria-label={t("dark")}
        aria-pressed={dark}
        className={cn(
          "relative z-10 flex h-7 w-7 items-center justify-center rounded-full focus-skeuo disabled:opacity-60",
          dark ? "text-ink" : "text-muted hover:text-ink",
        )}
      >
        <Moon className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}
