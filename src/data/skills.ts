import type { Locale } from "next-intl";

const labels: Record<
  Locale,
  { ai: string; cloud: string; software: string; design: string }
> = {
  es: { ai: "IA", cloud: "Cloud", software: "Software", design: "Diseño" },
  en: { ai: "AI", cloud: "Cloud", software: "Software", design: "Design" },
};

export function getSkillGroups(locale: Locale) {
  const l = labels[locale] ?? labels.en;
  return [
    {
      key: "ai" as const,
      title: l.ai,
      items: [
        "LLM apps · RAG",
        "Prompt / eval loops",
        "Python · TypeScript",
      ],
    },
    {
      key: "cloud" as const,
      title: l.cloud,
      items: ["AWS / GCP basics", "Containers", "CI/CD"],
    },
    {
      key: "software" as const,
      title: l.software,
      items: ["Next.js · React", "APIs · Postgres", "Testing"],
    },
    {
      key: "design" as const,
      title: l.design,
      items: ["Design systems", "UX writing", "Prototyping"],
    },
  ];
}
