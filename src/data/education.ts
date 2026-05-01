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
      es: "Universidad Nacional de Ingeniería (UNI)",
      en: "National University of Engineering (UNI)",
    },
    degree: {
      es: "Ingeniería de Sistemas",
      en: "Systems Engineering",
    },
    detail: {
      es: "Facultad de Ingeniería Industrial y de Sistemas — formación en sistemas y producto.",
      en: "Faculty of Industrial and Systems Engineering — systems and product foundations.",
    },
  },
];
