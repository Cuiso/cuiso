"use client";

import { useTranslations } from "next-intl";

export function AboutSection() {
  const t = useTranslations("about");

  return (
    <section id="about" className="scroll-mt-20 py-12">
      <div className="mx-auto max-w-2xl px-5">
        <h2 className="text-[22px] font-bold tracking-tight text-ink">
          {t("title")}
        </h2>
        <p
          data-reveal
          className="mt-5 text-[16px] leading-relaxed text-ash"
        >
          {t("body")}
        </p>
      </div>
    </section>
  );
}
