"use client";

import { useLocale, useTranslations } from "next-intl";
import { SkeuoCard } from "@/components/skeuo/Card";
import { SkeuoChip } from "@/components/skeuo/Chip";
import { getSkillGroups } from "@/data/skills";

export function SkillsSection() {
  const t = useTranslations("skills");
  const locale = useLocale();
  const groups = getSkillGroups(locale as "es" | "en");

  return (
    <section
      id="skills"
      className="scroll-mt-28 border-y border-ink/10 py-20 dark:border-ink/15"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted">
          {t("title")}
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {groups.map((g) => (
            <SkeuoCard key={g.key}>
              <p className="font-mono text-[0.65rem] uppercase tracking-wider text-primary">
                {g.title}
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li key={item}>
                    <SkeuoChip>{item}</SkeuoChip>
                  </li>
                ))}
              </ul>
            </SkeuoCard>
          ))}
        </div>
      </div>
    </section>
  );
}
