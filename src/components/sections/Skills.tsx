"use client";

import { useLocale, useTranslations } from "next-intl";
import { Chip } from "@/components/ui/Chip";
import { getSkillGroups } from "@/data/skills";

export function SkillsSection() {
  const t = useTranslations("skills");
  const locale = useLocale();
  const groups = getSkillGroups(locale as "es" | "en");

  return (
    <section id="skills" className="scroll-mt-20 py-12">
      <div className="mx-auto max-w-2xl px-5">
        <h2 className="text-[22px] font-bold tracking-tight text-ink">
          {t("title")}
        </h2>
        <div className="mt-6 space-y-5">
          {groups.map((g) => (
            <div key={g.key} data-reveal>
              <p className="text-[13px] font-semibold text-ink">{g.title}</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li key={item}>
                    <Chip>{item}</Chip>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
