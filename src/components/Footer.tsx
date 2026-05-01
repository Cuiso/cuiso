import { getTranslations } from "next-intl/server";
import { profile } from "@/data/profile";

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="border-t border-ink/10 py-8 text-center dark:border-ink/15">
      <p className="text-xs text-muted">
        © {new Date().getFullYear()} {profile.handle} · {t("rights")}
      </p>
    </footer>
  );
}
