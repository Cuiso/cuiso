"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

const SECTION_IDS = [
  "hero",
  "about",
  "skills",
  "projects",
  "experience",
  "education",
  "contact",
] as const;

export function Nav() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      Boolean,
    ) as HTMLElement[];
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const linkClass = (id: string) =>
    cn(
      "rounded-full px-2.5 py-1 text-xs font-medium transition-colors duration-150 focus-skeuo",
      active === id
        ? "bg-gradient-to-b from-primary/25 to-primary/10 text-ink shadow-[var(--shadow-raised)]"
        : "text-muted hover:text-ink",
    );

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 md:px-6">
      <nav
        className="mx-auto flex max-w-6xl items-center gap-3 rounded-full border border-ink/10 bg-surface-card/90 px-3 py-2 shadow-[var(--shadow-nav)] backdrop-blur-sm dark:border-ink/20"
        aria-label="Main"
      >
        <a
          href="#hero"
          className="mr-1 shrink-0 rounded-full px-2 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-ink focus-skeuo"
        >
          Cuiso
        </a>

        <div className="hidden flex-1 flex-wrap items-center gap-1 md:flex">
          <a href="#about" className={linkClass("about")}>
            {t("about")}
          </a>
          <a href="#skills" className={linkClass("skills")}>
            {t("skills")}
          </a>
          <a href="#projects" className={linkClass("projects")}>
            {t("projects")}
          </a>
          <a href="#experience" className={linkClass("experience")}>
            {t("experience")}
          </a>
          <a href="#education" className={linkClass("education")}>
            {t("education")}
          </a>
          <a href="#contact" className={linkClass("contact")}>
            {t("contact")}
          </a>
          <Link href="/blog" className="text-muted hover:text-ink">
            <span
              className={cn(
                "rounded-full px-2.5 py-1 text-xs font-medium focus-skeuo",
              )}
            >
              {t("blog")}
            </span>
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 bg-gradient-to-b from-surface-card to-surface shadow-[var(--shadow-raised)] md:hidden dark:border-ink/25 focus-skeuo"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t("closeMenu") : t("openMenu")}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div
          id="mobile-nav"
          className="mx-auto mt-3 flex max-w-6xl flex-col gap-2 rounded-2xl border border-ink/10 bg-surface-card/95 p-4 shadow-[var(--shadow-raised)] md:hidden dark:border-ink/20"
        >
          {[
            ["about", t("about")] as const,
            ["skills", t("skills")] as const,
            ["projects", t("projects")] as const,
            ["experience", t("experience")] as const,
            ["education", t("education")] as const,
            ["contact", t("contact")] as const,
          ].map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink shadow-[var(--shadow-inset)]"
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
          <Link
            href="/blog"
            className="rounded-lg px-3 py-2 text-sm font-medium text-ink shadow-[var(--shadow-inset)]"
            onClick={() => setOpen(false)}
          >
            {t("blog")}
          </Link>
        </div>
      ) : null}
    </header>
  );
}
