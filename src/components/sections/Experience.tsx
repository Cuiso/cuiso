"use client";

import { useLocale, useTranslations } from "next-intl";
import { experience } from "@/data/experience";

const initials = (s: string) =>
  s
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export function ExperienceSection() {
  const t = useTranslations("experience");
  const locale = useLocale();
  const loc = locale as "es" | "en";

  return (
    <section id="experience" className="scroll-mt-20 py-12">
      <div className="mx-auto max-w-2xl px-5">
        <h2 className="text-[22px] font-bold tracking-tight text-ink">
          {t("title")}
        </h2>
        <div className="mt-6 space-y-4">
          {experience.map((role) => (
            <div
              key={role.id}
              data-reveal
              className="relative rounded-2xl bg-surface-card p-6 pl-16"
            >
              <span className="absolute left-5 top-6 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[11px] font-semibold text-ink">
                {initials(role.company)}
              </span>
              <p className="text-[13px] italic text-ash">{role.period[loc]}</p>
              <h3 className="mt-1 text-[16px] font-semibold tracking-tight text-ink">
                {role.title[loc]}{" "}
                <span className="font-normal text-ash">· {role.company}</span>
              </h3>
              <ul className="mt-3 list-disc space-y-1.5 pl-4 text-[14px] leading-relaxed text-ash">
                {role.bullets[loc].map((b, bi) => (
                  <li key={`${role.id}-${bi}`}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
