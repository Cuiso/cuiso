"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

export function Nav() {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-5 py-4">
        <a
          href="#hero"
          className="font-mono text-[13px] font-semibold tracking-tight text-ink focus-ring"
        >
          cuiso
        </a>
        <div className="flex items-center gap-4">
          <Link
            href="/blog"
            className="text-[13px] font-medium text-ash transition-colors hover:text-ink focus-ring"
          >
            {t("blog")}
          </Link>
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}
