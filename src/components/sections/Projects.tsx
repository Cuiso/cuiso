"use client";

import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { projects } from "@/data/projects";

export function ProjectsSection() {
  const t = useTranslations("projects");
  const locale = useLocale();
  const loc = locale as "es" | "en";

  return (
    <section id="projects" className="scroll-mt-20 py-12">
      <div className="mx-auto max-w-2xl px-5">
        <h2 className="text-[22px] font-bold tracking-tight text-ink">
          {t("title")}
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {projects.map((p) => (
            <a
              key={p.id}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal
              className="group relative block rounded-2xl bg-surface-card p-6 transition-colors hover:bg-[#e6e8ec] focus-ring"
            >
              <ArrowUpRight className="absolute right-5 top-5 h-4 w-4 text-ash transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              <h3 className="pr-6 text-[16px] font-semibold tracking-tight text-ink">
                {p.title[loc]}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ash">
                {p.description[loc]}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
