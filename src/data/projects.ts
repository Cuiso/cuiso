import type { Locale } from "next-intl";

export type Project = {
  id: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  href: string;
  source?: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    id: "sample-ai-console",
    title: {
      es: "Consola de IA (ejemplo)",
      en: "AI Console (sample)",
    },
    description: {
      es: "Panel skeuomórfico de ejemplo para orquestar prompts, trazas y costos.",
      en: "Sample skeuomorphic dashboard to orchestrate prompts, traces, and cost.",
    },
    href: "https://github.com/cuiso",
    source: "https://github.com/cuiso",
    tags: ["Next.js", "AI", "UX"],
  },
];
