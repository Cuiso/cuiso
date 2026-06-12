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
      <main className="mx-auto max-w-2xl px-5 py-16">
        <h1 className="text-[22px] font-bold tracking-tight text-ink">
          {t("subtitle")}
        </h1>

        {posts.length === 0 ? (
          <p className="mt-6 text-ash">{t("empty")}</p>
        ) : (
          <ul className="mt-8 space-y-4">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="block rounded-2xl bg-surface-card p-6 transition-colors hover:bg-[#e6e8ec] focus-ring"
                >
                  <span className="text-[16px] font-semibold tracking-tight text-ink">
                    {p.title}
                  </span>
                  <span className="mt-1 block text-[14px] leading-relaxed text-ash">
                    {p.description}
                  </span>
                  <span className="mt-3 block font-mono text-[12px] text-ash">
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
            className="text-[14px] font-medium text-ash transition-colors hover:text-ink focus-ring"
          >
            {t("back")}
          </Link>
        </p>
      </main>
      <Footer />
    </>
  );
}
