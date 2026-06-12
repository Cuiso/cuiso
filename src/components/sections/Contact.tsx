"use client";

import { useTranslations } from "next-intl";
import { Mail, MessageCircle } from "lucide-react";
import { Anchor } from "@/components/ui/Anchor";
import { profile } from "@/data/profile";

export function ContactSection() {
  const t = useTranslations("contact");
  const waHref = `https://wa.me/${profile.whatsappE164.replace("+", "")}`;

  return (
    <section id="contact" className="scroll-mt-20 py-12 pb-20">
      <div className="mx-auto max-w-2xl px-5">
        <h2 className="text-[22px] font-bold tracking-tight text-ink">
          {t("title")}
        </h2>
        <p data-reveal className="mt-4 text-[16px] leading-relaxed text-ash">
          {t("hint")}
        </p>
        <div data-reveal className="mt-6 flex flex-wrap gap-3">
          <Anchor href={`mailto:${profile.email}`} variant="primary">
            <Mail className="h-4 w-4" aria-hidden />
            {t("email")}
          </Anchor>
          <Anchor
            href={waHref}
            variant="secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            {t("whatsapp")}: {profile.whatsappDisplay}
          </Anchor>
          <Anchor
            href={profile.github}
            variant="tertiary"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Anchor>
          <Anchor
            href={profile.linkedin}
            variant="tertiary"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </Anchor>
        </div>
      </div>
    </section>
  );
}
