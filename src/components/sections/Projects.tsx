"use client";

import { useLocale, useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";
import { SkeuoBadge } from "@/components/skeuo/Badge";
import { SkeuoCard } from "@/components/skeuo/Card";
import { projects } from "@/data/projects";

const tone = ["primary", "secondary", "tertiary"] as const;

export function ProjectsSection() {
  const t = useTranslations("projects");
  const locale = useLocale();
  const loc = locale as "es" | "en";

  return (
    <section id="projects" className="scroll-mt-28 py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted">
          {t("title")}
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <SkeuoCard key={p.id}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-ink">{p.title[loc]}</h3>
                  <p className="mt-2 text-sm text-ink/85 leading-relaxed">
                    {p.description[loc]}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((tag, j) => (
                  <SkeuoBadge key={tag} tone={tone[j % tone.length]}>
                    {tag}
                  </SkeuoBadge>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-md border border-ink/15 bg-gradient-to-b from-surface to-surface-card px-3 py-1.5 text-xs font-semibold text-ink shadow-[var(--shadow-raised)] active:translate-y-px active:shadow-[var(--shadow-pressed)] dark:border-ink/25 focus-skeuo"
                >
                  {t("view")} <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
                {p.source ? (
                  <a
                    href={p.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-md border border-ink/15 px-3 py-1.5 text-xs font-semibold text-muted shadow-[var(--shadow-inset)] hover:text-ink dark:border-ink/25 focus-skeuo"
                  >
                    {t("source")}
                  </a>
                ) : null}
              </div>
            </SkeuoCard>
          ))}
        </div>
      </div>
    </section>
  );
}
