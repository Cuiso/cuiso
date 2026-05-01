"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export function ThemeToggle() {
  const t = useTranslations("theme");
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Required so SSR markup matches first client paint; theme reads storage after mount (next-themes).
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional mount gate for hydration
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <span
        aria-hidden
        className="inline-flex h-9 w-[4.25rem] shrink-0 rounded-full border border-ink/15 bg-gradient-to-b from-surface-card to-surface shadow-[var(--shadow-inset)] dark:border-ink/25"
      />
    );
  }

  const dark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-9 items-center gap-1 rounded-full border border-ink/15 bg-gradient-to-b from-surface-card to-surface p-1 shadow-[var(--shadow-inset)] dark:border-ink/25",
        "focus-skeuo",
      )}
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={t("toggle")}
      title={dark ? t("light") : t("dark")}
    >
      <span
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-full border border-ink/10 shadow-[var(--shadow-raised)] transition-[transform,background] duration-150 dark:border-ink/20",
          !dark &&
            "bg-gradient-to-b from-white to-surface-card dark:from-surface-card dark:to-surface",
        )}
      >
        <Sun className="h-4 w-4 text-ink" aria-hidden />
      </span>
      <span
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-full border border-ink/10 shadow-[var(--shadow-raised)] transition-[transform,background] duration-150 dark:border-ink/20",
          dark && "bg-gradient-to-b from-surface to-surface-card",
        )}
      >
        <Moon className="h-4 w-4 text-ink" aria-hidden />
      </span>
    </button>
  );
}
