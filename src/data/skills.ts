import type { Locale } from "next-intl";

const labels: Record<
  Locale,
  { ai: string; cloud: string; software: string; design: string }
> = {
  es: { ai: "IA", cloud: "Cloud", software: "Software", design: "Design" },
  en: { ai: "AI", cloud: "Cloud", software: "Software", design: "Design" },
};

export function getSkillGroups(locale: Locale) {
  const l = labels[locale] ?? labels.en;
  return [
    {
      key: "ai" as const,
      title: l.ai,
      items: [
        "Python · PyTorch · TensorFlow · LangChain · LangGraph · Pinecone",
        "LLM · RAG · Whisper / WhisperX · Docling · OCR (Tesseract)",
        "Visión por computadora · evaluación de prompts",
      ],
    },
    {
      key: "cloud" as const,
      title: l.cloud,
      items: [
        "AWS · Azure · GCP",
        "Docker · Terraform · CI/CD · Spark (ETL)",
      ],
    },
    {
      key: "software" as const,
      title: l.software,
      items: [
        "Java · C++ · JavaScript · TypeScript",
        "FastAPI · Flask · Express.js · Next.js · React · Angular",
        "MySQL · PostgreSQL · MongoDB · SQLite",
      ],
    },
    {
      key: "design" as const,
      title: l.design,
      items: [
        locale === "es"
          ? "UX/UI (proyectos web y producto)"
          : "UX/UI (web and product work)",
        locale === "es"
          ? "Prototipado y escritura de experiencia"
          : "Prototyping and UX writing",
        locale === "es" ? "Inglés C1" : "English C1",
      ],
    },
  ];
}
