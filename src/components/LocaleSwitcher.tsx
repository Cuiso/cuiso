"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";

export function LocaleSwitcher() {
  const t = useTranslations("locale");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className="flex items-center gap-1 rounded-full border border-ink/15 bg-gradient-to-b from-surface-card to-surface p-1 shadow-[var(--shadow-inset)] dark:border-ink/25"
      role="group"
      aria-label={t("switch")}
    >
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => router.replace(pathname, { locale: loc })}
          className={cn(
            "rounded-full px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider transition-[transform,box-shadow] duration-150 focus-skeuo",
            loc === locale
              ? "border border-ink/10 bg-gradient-to-b from-primary/20 to-primary/10 text-ink shadow-[var(--shadow-raised)]"
              : "text-muted hover:text-ink",
          )}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
