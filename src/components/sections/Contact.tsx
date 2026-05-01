import { getTranslations } from "next-intl/server";
import { Mail, MessageCircle } from "lucide-react";
import { SkeuoAnchor } from "@/components/skeuo/Anchor";
import { SkeuoCard } from "@/components/skeuo/Card";
import { profile } from "@/data/profile";

export async function ContactSection() {
  const t = await getTranslations("contact");
  const waHref = `https://wa.me/${profile.whatsappE164.replace("+", "")}`;

  return (
    <section
      id="contact"
      className="scroll-mt-28 border-t border-ink/10 py-20 dark:border-ink/15"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted">
          {t("title")}
        </h2>
        <SkeuoCard className="mt-8 max-w-3xl">
          <p className="text-sm text-muted">{t("hint")}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <SkeuoAnchor href={`mailto:${profile.email}`} variant="primary">
              <Mail className="h-4 w-4" aria-hidden />
              {t("email")}
            </SkeuoAnchor>
            <SkeuoAnchor href={waHref} variant="tertiary" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" aria-hidden />
              {t("whatsapp")}: {profile.whatsappDisplay}
            </SkeuoAnchor>
            <SkeuoAnchor
              href={profile.github}
              variant="ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </SkeuoAnchor>
            <SkeuoAnchor
              href={profile.linkedin}
              variant="ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </SkeuoAnchor>
          </div>
        </SkeuoCard>
      </div>
    </section>
  );
}
