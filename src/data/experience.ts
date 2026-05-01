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
      es: "AI Engineer",
      en: "AI Engineer",
    },
    period: {
      es: "Set. 2025 — Presente",
      en: "Sep 2025 — Present",
    },
    bullets: {
      es: [
        "Optimicé pipeline de transcripción masiva de audio a ~122× RTF en AWS con WhisperX: diarización, filtrado de ruido y anonimización automática de datos sensibles.",
        "Diseñé ingesta de documentos complejos con Docling para RAG: extracción de tablas, imágenes y texto de escaneos en formatos listos para LLMs.",
        "CI/CD y segregación Dev/Staging/Prod en AWS para proyectos de IA.",
      ],
      en: [
        "Optimized mass audio transcription pipeline to ~122× RTF on AWS with WhisperX: diarization, noise filtering, and automatic PII anonymization.",
        "Designed complex document ingestion with Docling for RAG: table, image, and text extraction from scans into LLM-ready structures.",
        "CI/CD automation on AWS for AI workloads with Dev/Staging/Prod environment segregation.",
      ],
    },
  },
  {
    id: "pitec",
    company: "PI-TEC · Lima, Perú",
    title: {
      es: "AI Software Engineer",
      en: "AI Software Engineer",
    },
    period: {
      es: "Feb. 2024 — Set. 2025",
      en: "Feb 2024 — Sep 2025",
    },
    bullets: {
      es: [
        "Sistema multiagente con LangGraph y LLMs (OpenAI/Gemini) en AWS para convertir informes técnicos en resoluciones legales; redujo ~40% el tiempo operativo legal.",
        "Solución RPA en Azure con Tesseract + OpenAI para extraer texto, tablas e imágenes de PDFs; redujo carga manual de ~10 h a ~2 h.",
        "Visión computacional en AWS para inventario móvil: clasificación de características físicas; productividad de ~1.200 a ~2.200 artículos/semana.",
        "Pipeline de visión en GCP (Vision AI + Document AI) para digitalizar boletas con ~95% de precisión.",
        "Chatbot generativo en AWS Lambda entrenado con publicaciones del autor; disponibilidad 24/7.",
        "Scraper y pipeline en AWS para concursos SEACE con análisis vía OpenAI; eliminó revisión manual diaria.",
        "MLOps: transcripción con Whisper, ETL con Spark y Docker, limpieza con LLMs.",
        "Gestión del Product Backlog y entregas bajo Scrum para soluciones de IA.",
        "Ingeniería preventa: POCs y propuestas técnicas con clientes.",
      ],
      en: [
        "Multi-agent system with LangGraph + OpenAI/Gemini on AWS turning technical reports into legal resolutions; cut legal team time by ~40%.",
        "RPA solution on Azure with Tesseract + OpenAI for PDF extraction; reduced weekly manual work from ~10h to ~2h.",
        "Computer vision on AWS for mobile inventory: classify item traits from photos; weekly throughput from ~1,200 to ~2,200 items.",
        "GCP vision pipeline (Vision AI + Document AI) to digitize receipts at ~95% accuracy.",
        "Generative chatbot on AWS Lambda trained on author’s posts; 24/7 availability.",
        "AWS scraper + OpenAI pipeline for SEACE tenders; eliminated daily manual review.",
        "MLOps: Whisper transcription, Spark ETL, Docker, and LLM-based transcript cleanup.",
        "Backlog management and Scrum delivery for AI initiatives.",
        "Presales: POCs, technical proposals, and high-level solution architecture.",
      ],
    },
  },
  {
    id: "yape",
    company: "Yape · Lima, Perú",
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
        "SQL avanzado y dashboards de producto y CX para negocio.",
        "Seguimiento de Lending y Seguros; identificación de oportunidades de mejora en CX.",
        "Análisis para diagnóstico de problemas críticos de CX y recomendaciones para canales digitales.",
        "Automatizaciones con Python e IA; reportes de NPS para Perú y Bolivia con menos trabajo manual.",
        "Definición de prompts para el bot de WhatsApp con IA generativa: pruebas, afinación y validación.",
      ],
      en: [
        "Advanced SQL and dashboards for product and CX KPIs.",
        "Tracked Lending and Insurance performance and surfaced CX improvement opportunities.",
        "Analytics to diagnose critical CX issues and recommend digital channel changes.",
        "Python and AI automations, including NPS reporting for Peru and Bolivia.",
        "Prompt design for the generative AI WhatsApp bot: test scenarios, context tuning, validation.",
      ],
    },
  },
  {
    id: "labiar",
    company: "Laboratorio de Inteligencia Artificial y Robótica (LabIAR) · Lima, Perú",
    title: {
      es: "Miembro investigador",
      en: "Research member",
    },
    period: {
      es: "Ene. 2023 — Feb. 2024",
      en: "Jan 2023 — Feb 2024",
    },
    bullets: {
      es: [
        "Aplicaciones en Python y C++ para IA: control por gestos y voz de robots.",
        "Chatbot de asistente de salón para docentes con IA conversacional.",
        "Investigación con sensores LiDAR e IA para navegación autónoma en el robot Unitree Go1.",
        "Procesamiento de imágenes en tiempo real con YOLO v8 para reconocimiento de objetos en video de drones DJI.",
      ],
      en: [
        "Python and C++ applications for AI, including gesture and voice control of robots.",
        "Conversational AI classroom assistant chatbot for teachers.",
        "Research on LiDAR sensors and AI for autonomous navigation on the Unitree Go1 robot.",
        "Real-time image processing with YOLO v8 for object recognition on DJI drone feeds.",
      ],
    },
  },
];
