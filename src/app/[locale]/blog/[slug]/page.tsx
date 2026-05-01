import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { renderPost } from "@/lib/mdx";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const result = await renderPost(slug);
  if (!result) return { title: "Not found" };
  const fm = result.frontmatter as {
    title?: string;
    description?: string;
    locale?: string;
  };
  if (fm.locale !== locale) return { title: "Not found" };

  return {
    title: `${fm.title ?? slug} · Cuiso`,
    description: fm.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const result = await renderPost(slug);
  if (!result) notFound();

  const fm = result.frontmatter as {
    title?: string;
    description?: string;
    date?: string;
    locale?: string;
  };

  if (fm.locale !== locale) notFound();

  const t = await getTranslations("blog");

  return (
    <>
      <Nav />
      <article className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <header className="border-b border-ink/10 pb-8 dark:border-ink/15">
          <h1 className="text-3xl font-bold text-ink">{fm.title}</h1>
          <p className="mt-2 text-muted">{fm.description}</p>
          <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-wider text-primary">
            {t("posted")}: {fm.date}
          </p>
        </header>
        <div className="prose-mdx mt-10">{result.content}</div>
        <p className="mt-12">
          <Link
            href="/blog"
            className="inline-flex rounded-md border border-ink/15 bg-gradient-to-b from-surface-card to-surface px-3 py-2 text-sm font-semibold text-ink shadow-[var(--shadow-raised)] dark:border-ink/25 focus-skeuo"
          >
            {t("title")}
          </Link>
        </p>
      </article>
      <Footer />
    </>
  );
}
