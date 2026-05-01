import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getAllPosts } from "@/lib/mdx";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return {
    title: `${t("title")} · Cuiso`,
    description: t("subtitle"),
  };
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params;
  const loc = locale as "es" | "en";
  const t = await getTranslations("blog");
  const posts = getAllPosts(loc);

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted">
          {t("title")}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-ink">{t("subtitle")}</h1>

        {posts.length === 0 ? (
          <p className="mt-8 text-muted">{t("empty")}</p>
        ) : (
          <ul className="mt-10 space-y-4">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="block rounded-xl border border-ink/10 bg-surface-card p-4 shadow-[var(--shadow-raised)] transition-transform duration-150 hover:-translate-y-0.5 dark:border-ink/20 focus-skeuo"
                >
                  <span className="font-semibold text-ink">{p.title}</span>
                  <span className="mt-1 block text-sm text-muted">{p.description}</span>
                  <span className="mt-2 block font-mono text-[0.65rem] uppercase tracking-wider text-primary">
                    {t("posted")}: {p.date}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-12">
          <Link
            href="/"
            className="inline-flex rounded-md border border-ink/15 bg-gradient-to-b from-surface-card to-surface px-3 py-2 text-sm font-semibold text-ink shadow-[var(--shadow-raised)] dark:border-ink/25 focus-skeuo"
          >
            {t("back")}
          </Link>
        </p>
      </main>
      <Footer />
    </>
  );
}
