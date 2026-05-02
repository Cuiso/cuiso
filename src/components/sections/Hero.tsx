"use client";

import { useTranslations } from "next-intl";
import { profile } from "@/data/profile";
import { HeroClient } from "./HeroClient";

export function HeroSection() {
  const t = useTranslations("hero");
  const tSkills = useTranslations("skills");

  return (
    <HeroClient
      greeting={t("greeting")}
      fullName={profile.name}
      handle={profile.handle}
      roleLabels={[
        tSkills("ai"),
        tSkills("cloud"),
        tSkills("software"),
        tSkills("design"),
      ]}
      rolesLine={t("rolesLine")}
      ctaContact={t("ctaContact")}
      ctaCv={t("ctaCv")}
      cvAria={t("cvAria")}
    />
  );
}
