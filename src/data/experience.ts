import type { Locale } from "next-intl";

export type Role = {
  id: string;
  company: string;
  title: Record<Locale, string>;
  period: Record<Locale, string>;
  bullets: Record<Locale, string[]>;
};

export const experience: Role[] = [
  {
    id: "sample-role",
    company: "ACME Labs",
    title: {
      es: "Ingeniero de software (ejemplo)",
      en: "Software Engineer (sample)",
    },
    period: {
      es: "2024 — Presente",
      en: "2024 — Present",
    },
    bullets: {
      es: [
        "Arquitectura de features en producto cloud con foco en observabilidad.",
        "Colaboración cross-funcional: diseño, datos e infraestructura.",
      ],
      en: [
        "Feature architecture on a cloud product with a focus on observability.",
        "Cross-functional work: design, data, and infrastructure.",
      ],
    },
  },
];
