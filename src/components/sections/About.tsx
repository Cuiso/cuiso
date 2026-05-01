import { getTranslations } from "next-intl/server";
import { SkeuoCard } from "@/components/skeuo/Card";

export async function AboutSection() {
  const t = await getTranslations("about");

  return (
    <section id="about" className="scroll-mt-28 py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted">
          {t("title")}
        </h2>
        <SkeuoCard className="mt-6 max-w-3xl">
          <p className="text-ink/90 leading-relaxed">{t("body")}</p>
        </SkeuoCard>
      </div>
    </section>
  );
}
