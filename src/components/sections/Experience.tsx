"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { experience } from "@/data/experience";

const initials = (s: string) =>
  s
    .split("·")[0]
    .split("(")[0]
    .replace(/[^A-Za-z]/g, "")
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
              <span className="absolute left-5 top-6 flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white text-[11px] font-semibold text-ink">
                {role.logo ? (
                  <Image
                    src={role.logo}
                    alt={role.company}
                    width={24}
                    height={24}
                    className="h-6 w-6 object-contain"
                  />
                ) : (
                  initials(role.company)
                )}
              </span>
              <p className="text-[13px] italic text-ash">{role.period[loc]}</p>
              <h3 className="mt-1 text-[15px] font-semibold tracking-tight text-ink">
                {role.title[loc]}
              </h3>
              <p className="text-[13px] text-ash">{role.company}</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-4 text-[14px] leading-relaxed text-ash">
                {role.bullets[loc].slice(0, 2).map((b, bi) => (
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
