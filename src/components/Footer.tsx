"use client";

import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/data/profile";

const iconClass =
  "flex h-9 w-9 items-center justify-center rounded-full bg-surface-card text-ink/70 transition-colors hover:text-ink focus-ring";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer>
      <div className="mx-auto max-w-2xl px-5 py-12 text-center">
        <p className="font-mono text-xl font-semibold tracking-tight text-ink">
          cuiso
        </p>
        <div className="mt-5 flex items-center justify-center gap-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={iconClass}
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={iconClass}
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className={iconClass}
          >
            <Mail className="h-4 w-4" aria-hidden />
          </a>
        </div>
        <p className="mt-6 text-[12px] text-ash">
          © {new Date().getFullYear()} {profile.handle} · {t("rights")}
        </p>
      </div>
    </footer>
  );
}
