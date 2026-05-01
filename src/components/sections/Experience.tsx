import { getLocale, getTranslations } from "next-intl/server";
import { SkeuoCard } from "@/components/skeuo/Card";
import { experience } from "@/data/experience";

export async function ExperienceSection() {
  const t = await getTranslations("experience");
  const locale = await getLocale();
  const loc = locale as "es" | "en";

  return (
    <section
      id="experience"
      className="scroll-mt-28 border-y border-ink/10 py-20 dark:border-ink/15"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted">
          {t("title")}
        </h2>
        <div className="relative mt-10 space-y-8 md:pl-8">
          <div
            className="absolute left-2 top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-primary via-tertiary to-secondary md:block"
            aria-hidden
          />
          {experience.map((role) => (
            <SkeuoCard key={role.id} className="relative md:ml-4">
              <span className="absolute -left-6 top-6 hidden h-3 w-3 rounded-full border border-primary bg-surface shadow-[var(--shadow-raised)] md:inline-block" />
              <p className="font-mono text-[0.65rem] uppercase tracking-wider text-secondary">
                {role.period[loc]}
              </p>
              <h3 className="mt-1 text-xl font-bold text-ink">{role.title[loc]}</h3>
              <p className="text-sm font-semibold text-muted">{role.company}</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-ink/85">
                {role.bullets[loc].map((b, bi) => (
                  <li key={`${role.id}-${bi}`}>{b}</li>
                ))}
              </ul>
            </SkeuoCard>
          ))}
        </div>
      </div>
    </section>
  );
}
