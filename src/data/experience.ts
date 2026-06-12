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
    id: "entel",
    company: "ENTEL · Lima, Perú",
    title: {
      es: "AI Engineer / SRE — Analytics Squad (AI-first)",
      en: "AI Engineer / SRE — Analytics Squad (AI-first)",
    },
    period: {
      es: "Set. 2025 — Presente",
      en: "Sep 2025 — Present",
    },
    bullets: {
      es: [
        "Clasificador GenAI end-to-end con embeddings y revisión multi-capa: +10K tickets/mes a 80%+ accuracy.",
        "Pipeline de transcripción masiva (WhisperX, ~120× RTF): ~100K audios/día, escalable a 500K+.",
        "Productivicé Insights y Reportería sobre deepgenai (pipelines GenAI desde YAML); impacto agregado ~USD 3M/año.",
        "Anonimización PII (Presidio, Ley N° 29733) y diseño del RAG corporativo sobre AWS Bedrock.",
        "Design Engineering del frontend interno (Next.js/TS) y estándares AI-first y SRE del squad (CI/CD, Terraform, Grafana).",
      ],
      en: [
        "End-to-end GenAI classifier with embeddings and multi-layer review: 10K+ tickets/month at 80%+ accuracy.",
        "Mass transcription pipeline (WhisperX, ~120× RTF): ~100K audios/day, scalable to 500K+.",
        "Shipped Insights and Reporting on deepgenai (YAML-driven GenAI pipelines); aggregate impact ~USD 3M/year.",
        "PII anonymization (Presidio, Peru's Law 29733) and corporate RAG design on AWS Bedrock.",
        "Design Engineering for the internal frontend (Next.js/TS) and the squad's AI-first and SRE standards (CI/CD, Terraform, Grafana).",
      ],
    },
  },
  {
    id: "pitec",
    company: "PI-TEC · Lima, Perú",
    title: {
      es: "AI Solutions Architect & AI Software Engineer",
      en: "AI Solutions Architect & AI Software Engineer",
    },
    period: {
      es: "Feb. 2024 — Set. 2025",
      en: "Feb 2024 — Sep 2025",
    },
    bullets: {
      es: [
        "~12 propuestas técnicas end-to-end como arquitecto, builder, preventa y PM de facto — multi-cloud (AWS, GCP, Azure).",
        "ATS AI-first para Atento (líder regional en BPO): entrevistas y scoring objetivo para 100+ candidatos/mes.",
        "Sistema multiagente para Osinergmin: informes técnicos → resoluciones legales, ~5K docs/año y -40% del tiempo del equipo legal.",
        "Visión + OCR para Matrix Consulting (PE, CL, CO, Miami): app móvil que auto-completa catálogos con +80% de precisión.",
        "Scraper inteligente + LLMs para SEACE: 40+ h/mes ahorradas al equipo comercial.",
        "Chatbot GenAI conversacional para un influencer reconocido, integrado con IG y Facebook.",
      ],
      en: [
        "~12 end-to-end technical proposals as architect, builder, presales and de facto PM — multi-cloud (AWS, GCP, Azure).",
        "AI-first ATS for Atento (regional BPO leader): automated interviews and objective scoring for 100+ candidates/month.",
        "Multi-agent system for Osinergmin: technical reports → legal resolutions, ~5K docs/year and -40% legal-team time.",
        "Vision + OCR for Matrix Consulting (PE, CL, CO, Miami): mobile app that auto-fills catalogs at 80%+ accuracy.",
        "Smart scraper + LLMs for SEACE: 40+ h/month saved for the sales team.",
        "Conversational GenAI chatbot for a well-known influencer, integrated with Instagram and Facebook.",
      ],
    },
  },
  {
    id: "yape",
    company: "Yape — Credicorp · Lima, Perú",
    title: {
      es: "Practicante — Analytics & Strategy CX",
      en: "Intern — Analytics & Strategy CX",
    },
    period: {
      es: "Jun. 2024 — Jun. 2025",
      en: "Jun 2024 — Jun 2025",
    },
    bullets: {
      es: [
        "SQL avanzado sobre la arquitectura data-first de Yape para preguntas complejas de gerencia (Lending, Seguros y productos transversales).",
        "Clasificador GenAI de comentarios NPS (Qualtrics, Perú y Bolivia): automatizó el reporte mensual a gerencia.",
        "Aporté al primer bot GenAI de atención al cliente por WhatsApp: casos iniciales y guardrails.",
        "Prestado recurrentemente al equipo de Analytics CX por desempeño técnico.",
      ],
      en: [
        "Advanced SQL over Yape's data-first stack to answer complex leadership questions (Lending, Insurance, cross-product).",
        "GenAI classifier for NPS comments (Qualtrics, Peru and Bolivia): automated the monthly leadership report.",
        "Contributed to the first GenAI customer-support bot on WhatsApp: initial use cases and guardrails.",
        "Lent recurrently to the Analytics CX team for technical performance.",
      ],
    },
  },
  {
    id: "labiar",
    company: "Laboratorio de Inteligencia Artificial y Robótica (LabIAR — UNI) · Lima, Perú",
    title: {
      es: "Investigador",
      en: "Researcher",
    },
    period: {
      es: "Ene. 2023 — Feb. 2024",
      en: "Jan 2023 — Feb 2024",
    },
    bullets: {
      es: [
        "LiDAR + IA para navegación autónoma del cuadrúpedo Unitree Go1 en entornos no controlados.",
        "Visión por computadora con YOLOv8 para reconocimiento en tiempo real desde drones DJI.",
        "Control por gestos y voz para robótica (Python/C++ sobre Linux).",
      ],
      en: [
        "LiDAR + AI for autonomous navigation of the Unitree Go1 quadruped in uncontrolled environments.",
        "Computer vision with YOLOv8 for real-time object recognition from DJI drones.",
        "Gesture and voice control for robotics (Python/C++ on Linux).",
      ],
    },
  },
];
