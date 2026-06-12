"use client";

import { useLocale, useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import { education } from "@/data/education";

export function EducationSection() {
  const t = useTranslations("education");
  const locale = useLocale();
  const loc = locale as "es" | "en";

  return (
    <section id="education" className="scroll-mt-20 py-12">
      <div className="mx-auto max-w-2xl px-5">
        <h2 className="text-[22px] font-bold tracking-tight text-ink">
          {t("title")}
        </h2>
        <div className="mt-6 space-y-4">
          {education.map((d) => (
            <Card key={d.id}>
              <h3 className="text-[16px] font-semibold tracking-tight text-ink">
                {d.degree[loc]}
              </h3>
              <p className="mt-1 text-[14px] font-medium text-ash">
                {d.school[loc]}
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-ash">
                {d.detail[loc]}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
