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
      es: "Best Java Agent. Agente GenAI con wearables para planes de salud y ejercicio personalizados.",
      en: "Best Java Agent. GenAI agent with wearables for personalized health and workout plans.",
    },
    href: linkedin,
    tags: ["Java", "AI agents", "Wearables"],
  },
  {
    id: "yapecillo",
    title: {
      es: "Yapecillo — Innovathon Social BCP 2024",
      en: "Yapecillo — BCP Social Innovathon 2024",
    },
    description: {
      es: "Primer puesto. Inclusión financiera para jóvenes peruanos con mejoras de seguridad y velocidad en Yape.",
      en: "First place. Financial inclusion for young Peruvians with security and speed improvements on Yape.",
    },
    href: linkedin,
    tags: ["FinTech", "CX", "Hackathon"],
  },
  {
    id: "hackaizi",
    title: {
      es: "HACKAIZI — IziPay Hackathon 2025",
      en: "HACKAIZI — IziPay Hackathon 2025",
    },
    description: {
      es: "Tercer puesto. BI para comercios locales: captación geoespacial, segmentación con IA y advisor GenAI.",
      en: "Third place. BI for local merchants: geospatial acquisition, AI segmentation, and a GenAI advisor.",
    },
    href: linkedin,
    tags: ["BI", "GenAI", "Geospatial"],
  },
  {
    id: "aprendo",
    title: {
      es: "Aprendo — IA Hackathon UCSUR 2024",
      en: "Aprendo — UCSUR AI Hackathon 2024",
    },
    description: {
      es: "Tercer puesto. Plataforma GenAI + IA predictiva para material didáctico y prevención de deserción. AWS.",
      en: "Third place. GenAI + predictive AI platform for teaching materials and dropout prevention. AWS.",
    },
    href: linkedin,
    tags: ["EdTech", "GenAI", "AWS"],
  },
  {
    id: "virtualsellers",
    title: {
      es: "VirtualSellers — Mistral AI LLM Hackathon 2024",
      en: "VirtualSellers — Mistral AI LLM Hackathon 2024",
    },
    description: {
      es: "Top-10 entre 150+ equipos de Latam y España. CRM GenAI para tickets de WhatsApp y correo. AWS.",
      en: "Top-10 among 150+ teams from LatAm and Spain. GenAI CRM for WhatsApp and email tickets. AWS.",
    },
    href: linkedin,
    tags: ["LLM", "CRM", "AWS"],
  },
  {
    id: "matchaskill",
    title: {
      es: "matchaskill — Reclutamiento AI-first para developers",
      en: "matchaskill — AI-first developer recruiting",
    },
    description: {
      es: "Un entrevistador con IA conversa sobre tu propio código y te conecta con los equipos correctos. Landing bilingüe en Astro 5 + React.",
      en: "An AI interviewer talks through your own code and matches you with the right teams. Bilingual landing in Astro 5 + React.",
    },
    href: "https://matchaskill-landing.vercel.app",
    tags: ["Astro", "GenAI", "Recruiting"],
  },
  {
    id: "dubivox",
    title: {
      es: "Dubivox — Transcripción de video y audio con IA",
      en: "Dubivox — AI video & audio transcription",
    },
    description: {
      es: "Extrae el audio de videos y genera transcripciones precisas con subtítulos SRT. Pipeline sobre AWS.",
      en: "Extracts audio from video and produces accurate transcripts with SRT subtitles. AWS pipeline.",
    },
    href: "https://dubivox.vercel.app",
    tags: ["GenAI", "AWS", "Speech-to-text"],
  },
  {
    id: "financia",
    title: {
      es: "FinancIA — Perplexity Sonar Hackathon 2025",
      en: "FinancIA — Perplexity Sonar Hackathon 2025",
    },
    description: {
      es: "Asistente de inversión inteligente con Perplexity Sonar: research financiero en tiempo real. React + FastAPI.",
      en: "Intelligent investment assistant powered by Perplexity Sonar: real-time financial research. React + FastAPI.",
    },
    href: "https://financia-pi.vercel.app",
    tags: ["GenAI", "FinTech", "Perplexity"],
  },
  {
    id: "cicibet",
    title: {
      es: "cicibet — Nano Banana Hackathon 2025",
      en: "cicibet — Nano Banana Hackathon 2025",
    },
    description: {
      es: "Moda infantil generada por IA: crea prendas, modelos y looks completos con análisis de tallas en segundos.",
      en: "AI-generated kids' fashion: create garments, models, and full looks with size analysis in seconds.",
    },
    href: "https://nano-banana-hackathon-chic-pic.vercel.app",
    tags: ["GenAI", "Image generation", "Gemini"],
  },
];
