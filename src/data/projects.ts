import type { Locale } from "next-intl";

export type Project = {
  id: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  href: string;
  source?: string;
  tags: string[];
};

const linkedin = "https://www.linkedin.com/in/luis-rodriguez-cuiso";

export const projects: Project[] = [
  {
    id: "healthia",
    title: {
      es: "Healthia — Microsoft AI Agents Hackathon 2025",
      en: "Healthia — Microsoft AI Agents Hackathon 2025",
    },
    description: {
      es: "Premio Best Java Agent. Agente que combina IA generativa, datos de wearables y servicios cloud para planes de salud y ejercicio personalizados, motivación gamificada y recomendaciones en tiempo real.",
      en: "Best Java Agent winner. An intelligent agent blending generative AI, wearable data, and cloud services for personalized health and workout plans, gamified motivation, and real-time recommendations.",
    },
    href: linkedin,
    tags: ["Java", "AI agents", "Cloud"],
  },
  {
    id: "yapecillo",
    title: {
      es: "Yapecillo — Innovathon Social BCP 2024",
      en: "Yapecillo — BCP Social Innovathon 2024",
    },
    description: {
      es: "Primer puesto. Propuesta para ampliar el alcance e inclusión financiera de los jóvenes en Yape, con foco en seguridad y velocidad de transacciones.",
      en: "First place. A concept to broaden reach and financial inclusion for younger users on Yape, emphasizing transaction security and speed.",
    },
    href: linkedin,
    tags: ["FinTech", "CX", "Hackathon"],
  },
  {
    id: "aprendo",
    title: {
      es: "Aprendo — IA Hackathon UCSUR 2024",
      en: "Aprendo — UCSUR AI Hackathon 2024",
    },
    description: {
      es: "Tercer puesto en el desafío de mejora de la educación superior con IA: material didáctico para docentes y señales predictivas para prevenir deserción; arquitectura escalable en AWS.",
      en: "Third place in the higher-education AI challenge: tooling for teachers to create learning materials and predictive signals to reduce dropout, on a scalable AWS architecture.",
    },
    href: linkedin,
    tags: ["EdTech", "GenAI", "AWS"],
  },
  {
    id: "virtualsellers",
    title: {
      es: "VirtualSellers — LLM Hackathon Mistral AI 2024",
      en: "VirtualSellers — Mistral AI LLM Hackathon 2024",
    },
    description: {
      es: "Finalistas entre más de 150 equipos de España y Latinoamérica. CRM que centraliza y automatiza WhatsApp y correo con IA generativa para gestión de tickets; desplegado en AWS.",
      en: "Finalists among 150+ teams from Spain and Latin America. A CRM that centralizes WhatsApp and email with generative AI for ticket handling, deployed on AWS.",
    },
    href: linkedin,
    tags: ["LLM", "CRM", "AWS"],
  },
];
