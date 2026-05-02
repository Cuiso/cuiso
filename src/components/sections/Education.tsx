"use client";

import { useLocale, useTranslations } from "next-intl";
import { SkeuoCard } from "@/components/skeuo/Card";
import { education } from "@/data/education";

export function EducationSection() {
  const t = useTranslations("education");
  const locale = useLocale();
  const loc = locale as "es" | "en";

  return (
    <section id="education" className="scroll-mt-28 py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted">
          {t("title")}
        </h2>
        <div className="mt-8 space-y-4">
          {education.map((d) => (
            <SkeuoCard key={d.id} inset>
              <h3 className="text-lg font-bold text-ink">{d.degree[loc]}</h3>
              <p className="mt-1 text-sm font-semibold text-primary">
                {d.school[loc]}
              </p>
              <p className="mt-2 text-sm text-ink/85">{d.detail[loc]}</p>
            </SkeuoCard>
          ))}
        </div>
      </div>
    </section>
  );
}
