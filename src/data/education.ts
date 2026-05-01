import type { Locale } from "next-intl";

export type Degree = {
  id: string;
  school: Record<Locale, string>;
  degree: Record<Locale, string>;
  detail: Record<Locale, string>;
};

export const education: Degree[] = [
  {
    id: "uni",
    school: {
      es: "Universidad Nacional de Ingeniería (UNI) · Lima, Perú",
      en: "National University of Engineering (UNI) · Lima, Peru",
    },
    degree: {
      es: "Ingeniería de Sistemas — décimo superior",
      en: "Systems Engineering — top decile",
    },
    detail: {
      es: "Marzo 2021 — diciembre 2025 (FIIS). Alumno investigador LabIAR (2024). Alumno investigador en proyecto de NLP — IIFIIS (2023). Voluntario del área de Sistemas — Centro Cultural Núcleo FIIS (2023–2024).",
      en: "Mar 2021 — Dec 2025 (FIIS). LabIAR research student (2024). NLP research project — IIFIIS (2023). Systems volunteer — Centro Cultural Núcleo FIIS (2023–2024).",
    },
  },
];
