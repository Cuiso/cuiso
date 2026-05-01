import { getTranslations } from "next-intl/server";
import { profile } from "@/data/profile";
import { HeroClient } from "./HeroClient";

export async function HeroSection() {
  const t = await getTranslations("hero");

  return (
    <HeroClient
      greeting={t("greeting")}
      fullName={profile.name}
      handle={profile.handle}
      rolesLine={t("rolesLine")}
      ctaContact={t("ctaContact")}
      ctaCv={t("ctaCv")}
      cvAria={t("cvAria")}
    />
  );
}
