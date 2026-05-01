"use client";

import { useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import {
  positionSegmentedPill,
  prefersReducedMotion,
} from "@/lib/segmentedPill";

export function LocaleSwitcher() {
  const t = useTranslations("locale");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const trackRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const buttonRefs = useRef<Partial<Record<string, HTMLButtonElement>>>({});
  const [busy, setBusy] = useState(false);

  useGSAP(
    () => {
      const pill = pillRef.current;
      const activeBtn = buttonRefs.current[locale];
      if (!pill || !activeBtn) return;
      gsap.killTweensOf(pill);
      positionSegmentedPill(pill, activeBtn, { animate: false });
    },
    { dependencies: [locale], scope: trackRef, revertOnUpdate: true },
  );

  function handleSelect(targetLocale: string) {
    if (targetLocale === locale || busy) return;
    const pill = pillRef.current;
    const targetBtn = buttonRefs.current[targetLocale];
    if (!pill || !targetBtn) return;

    setBusy(true);
    const reduced = prefersReducedMotion();
    positionSegmentedPill(pill, targetBtn, {
      animate: !reduced,
      onComplete: () => {
        router.replace(pathname, { locale: targetLocale });
        setBusy(false);
      },
    });
  }

  return (
    <div
      ref={trackRef}
      className="relative inline-flex h-9 shrink-0 items-center gap-1 rounded-full border border-ink/15 bg-gradient-to-b from-surface-card to-surface p-1 shadow-[var(--shadow-inset)] dark:border-ink/25"
      role="group"
      aria-label={t("switch")}
    >
      <span
        ref={pillRef}
        aria-hidden
        className="pointer-events-none absolute z-0 rounded-full border border-ink/10 bg-gradient-to-b from-primary/20 to-primary/10 shadow-[var(--shadow-raised)] will-change-transform"
        style={{ left: 0, top: 0 }}
      />
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          disabled={busy}
          ref={(el) => {
            if (el) buttonRefs.current[loc] = el;
            else delete buttonRefs.current[loc];
          }}
          onClick={() => handleSelect(loc)}
          className={cn(
            "relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-[0.65rem] uppercase tracking-wider focus-skeuo disabled:opacity-60",
            loc === locale ? "text-ink" : "text-muted hover:text-ink",
          )}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
