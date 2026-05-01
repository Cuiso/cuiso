import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";

const POSTS_DIR = path.join(process.cwd(), "content/blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  locale: "es" | "en";
};

export function getAllPosts(locale: "es" | "en"): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
  const posts: PostMeta[] = [];

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
    const { data } = matter(raw);

    const loc = data.locale as string | undefined;
    if (loc !== locale) continue;

    posts.push({
      slug,
      title: String(data.title ?? slug),
      description: String(data.description ?? ""),
      date: String(data.date ?? ""),
      locale,
    });
  }

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostSource(slug: string): Promise<string | null> {
  const fullPath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;
  return fs.readFileSync(fullPath, "utf8");
}

export async function renderPost(slug: string) {
  const source = await getPostSource(slug);
  if (!source) return null;

  const { content, frontmatter } = await compileMDX<{
    title: string;
    description: string;
    date: string;
    locale: "es" | "en";
  }>({
    source,
    options: {
      parseFrontmatter: true,
    },
  });

  return { content, frontmatter };
}
