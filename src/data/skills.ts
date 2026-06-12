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
        "LLMs (OpenAI · Anthropic · Gemini · Mistral) · LangChain · LangGraph",
        "Sistemas multiagente · RAG · embeddings · Pinecone · guardrails · AI FinOps",
        "WhisperX · Microsoft Presidio · PyTorch · TensorFlow · YOLO · OCR",
      ],
    },
    {
      key: "cloud" as const,
      title: l.cloud,
      items: [
        "AWS · GCP · Azure — productivización multi-cloud",
        "Managed AI: Bedrock · Bedrock Data Automation",
        "Terraform · Docker · CI/CD · Airflow · Grafana",
      ],
    },
    {
      key: "software" as const,
      title: l.software,
      items: [
        "Python · Java · TypeScript · JavaScript · C++",
        "FastAPI · Flask · Express.js · Next.js · React · Flutter",
        "PostgreSQL · MySQL · MongoDB · SQL avanzado · Power BI",
      ],
    },
    {
      key: "design" as const,
      title: l.design,
      items: [
        locale === "es"
          ? "Design Engineering: sistemas de diseño y UX/UI para herramientas internas"
          : "Design Engineering: design systems and UX/UI for internal tools",
        locale === "es"
          ? "AI-first development: rules, skills y agentes de código"
          : "AI-first development: rules, skills, and coding agents",
        locale === "es"
          ? "Español nativo · Inglés C1 (lectura/escritura)"
          : "Spanish native · English C1 (reading/writing)",
      ],
    },
  ];
}
