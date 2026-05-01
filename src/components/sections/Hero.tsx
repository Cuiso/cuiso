import { getTranslations } from "next-intl/server";
import { ChevronRight } from "lucide-react";
import { SkeuoAnchor } from "@/components/skeuo/Anchor";
import { profile } from "@/data/profile";

export async function HeroSection() {
  const t = await getTranslations("hero");

  return (
    <section
      id="hero"
      className="scroll-mt-28 border-b border-ink/10 py-20 dark:border-ink/15"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted">
          {t("greeting")}
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
          {profile.name}
        </h1>
        <p className="mt-2 font-mono text-sm font-medium text-primary">
          {profile.handle} · {profile.roles.join(" · ")}
        </p>
        <p className="mt-6 max-w-2xl text-lg text-ink/90">{t("rolesLine")}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <SkeuoAnchor href="#contact" variant="primary">
            {t("ctaContact")} <ChevronRight className="h-4 w-4" aria-hidden />
          </SkeuoAnchor>
          <SkeuoAnchor
            href="/cv.pdf"
            variant="secondary"
            download
            aria-label={t("cvAria")}
          >
            {t("ctaCv")}
          </SkeuoAnchor>
        </div>
      </div>
    </section>
  );
}
