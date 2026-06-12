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
      <article className="mx-auto max-w-2xl px-5 py-16">
        <header className="border-b border-hairline pb-8">
          <h1 className="text-[28px] font-bold tracking-tight text-ink">
            {fm.title}
          </h1>
          <p className="mt-2 text-ash">{fm.description}</p>
          <p className="mt-4 font-mono text-[12px] text-ash">
            {t("posted")}: {fm.date}
          </p>
        </header>
        <div className="prose-mdx mt-10">{result.content}</div>
        <p className="mt-12">
          <Link
            href="/blog"
            className="text-[14px] font-medium text-ash transition-colors hover:text-ink focus-ring"
          >
            {t("title")}
          </Link>
        </p>
      </article>
      <Footer />
    </>
  );
}
