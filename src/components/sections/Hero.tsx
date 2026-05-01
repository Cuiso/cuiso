import { getTranslations } from "next-intl/server";
import { profile } from "@/data/profile";
import { HeroClient } from "./HeroClient";

export async function HeroSection() {
  const t = await getTranslations("hero");
  const tSkills = await getTranslations("skills");

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
