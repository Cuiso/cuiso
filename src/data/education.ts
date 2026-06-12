import type { Locale } from "next-intl";

export type Degree = {
  id: string;
  school: Record<Locale, string>;
  degree: Record<Locale, string>;
  detail: Record<Locale, string>;
};

export const education: Degree[] = [
  {
    id: "hanyang",
    school: {
      es: "Hanyang Cyber University · Seúl, Corea del Sur",
      en: "Hanyang Cyber University · Seoul, South Korea",
    },
    degree: {
      es: "Bachiller en AI Engineering — programa internacional con UNI",
      en: "Bachelor in AI Engineering — international program with UNI",
    },
    detail: {
      es: "2025 — 2026. Estancia presencial en Seúl programada para Q4 2026.",
      en: "2025 — 2026. On-site stay in Seoul scheduled for Q4 2026.",
    },
  },
  {
    id: "uni",
    school: {
      es: "Universidad Nacional de Ingeniería (UNI) · Lima, Perú",
      en: "National University of Engineering (UNI) · Lima, Peru",
    },
    degree: {
      es: "Bachiller en Ingeniería de Sistemas — décimo superior",
      en: "Bachelor in Systems Engineering — top decile",
    },
    detail: {
      es: "2021 — 2025 (FIIS). Investigador en LabIAR (2024) e IIFIIS — NLP (2023).",
      en: "2021 — 2025 (FIIS). Researcher at LabIAR (2024) and IIFIIS — NLP (2023).",
    },
  },
];
