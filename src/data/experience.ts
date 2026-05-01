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
        "Optimicé el pipeline de procesamiento masivo de audio, logrando un factor de tiempo real (RTF) de ~122× para la transcripción de cientos de miles de audios diarios. Con WhisperX como proceso ETL en AWS integré diarización, filtrado de ruido/voces ajenas y manejo de silencios; además anonimización automática de datos sensibles en transcripciones para cumplimiento normativo.",
        "Diseñé ingesta y preprocesamiento de documentos complejos con Docling para optimizar RAG: extracción de tablas, imágenes y texto en escaneos, llevando datos no estructurados a formatos semánticos listos para LLMs.",
        "Automatización DevOps y CI/CD en AWS para proyectos de IA: segregación Dev/Staging/Prod, integración continua desde repositorios, despliegues más rápidos y mayor estabilidad operativa.",
      ],
      en: [
        "Optimized a mass audio processing pipeline to ~122× real-time factor (RTF) for transcribing hundreds of thousands of daily calls. Built an AWS ETL flow with WhisperX: diarization, noise/off-voice filtering, silence handling, and automatic sensitive-data anonymization in transcripts for regulatory compliance.",
        "Designed complex document ingestion and preprocessing with Docling for RAG: accurate extraction of tables, images, and text from scans into semantic structures ready for LLMs.",
        "Implemented DevOps best practices: CI/CD automation on AWS for AI workloads, environment segregation (Dev/Staging/Prod), and stable releases with shorter deployment cycles.",
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
        "Diseñé e implementé un sistema multiagente con IA generativa para convertir informes técnicos en resoluciones legales (requisitos, arquitectura). En AWS con LangGraph y LLMs de OpenAI y Gemini; redujo ~40% el tiempo operativo del equipo legal y agilizó la emisión semanal de resoluciones.",
        "Lideré una solución RPA para extraer texto, tablas e imágenes de PDFs (requisitos, arquitectura, coordinación). En Azure con OCR (Tesseract + Python) y OpenAI para semántica; bajó la carga semanal de ~10 h a ~2 h y redujo errores manuales.",
        "Sistema de visión para inventario móvil: identificación y clasificación de características físicas desde fotos. Backend en AWS (EC2) con modelo multimodal de OpenAI; productividad semanal de ~1.200 a ~2.200 artículos y menos errores de digitación.",
        "Visión para digitalizar boletas de compra (campos clave) en GCP (Vision AI + Document AI), ~95% de precisión e integración a sistemas contables sin digitación manual.",
        "Chatbot con IA generativa entrenado con eventos y publicaciones del autor, en AWS Lambda con OpenAI; disponibilidad 24/7 y datos para análisis posterior.",
        "Automatización de recolección y análisis de concursos públicos del SEACE: scraper y pipeline en AWS (BeautifulSoup, Selenium) con procesamiento vía OpenAI; eliminó revisión manual diaria y consolidó datos para el equipo comercial.",
        "Pipeline de MLOps para transcripción y análisis de audio: Whisper (Hugging Face), ETL con Apache Spark, Docker y preprocesamiento con LLMs para limpieza de transcripciones.",
        "Facilitación de reuniones y talleres con TI y Comercial; gestión del Product Backlog y entregas bajo Scrum en soluciones de IA.",
        "Ingeniería preventa en IA y automatización: POCs, propuestas técnicas con clientes y apoyo en arquitecturas de alto nivel hacia rol de arquitecto de soluciones.",
      ],
      en: [
        "Designed and built a multi-agent generative AI system turning technical reports into legal resolutions (requirements + architecture). Deployed on AWS with LangGraph and OpenAI/Gemini LLMs; cut legal team operational time by ~40% and sped up weekly resolution output.",
        "Led an RPA solution for PDF text, table, and image extraction (requirements, architecture, team coordination). On Azure with Tesseract + Python OCR and OpenAI for semantics; reduced weekly manual work from ~10h to ~2h with fewer human errors.",
        "Computer vision for a mobile inventory app: classify physical item traits from photos. Backend on AWS (EC2) with an OpenAI multimodal model; weekly throughput rose from ~1,200 to ~2,200 items with fewer typing errors.",
        "Vision pipeline to digitize purchase receipts on GCP (Vision AI + Document AI) at ~95% accuracy, feeding accounting systems without manual entry.",
        "Generative chatbot trained on the author’s events and social posts, on AWS Lambda with OpenAI; 24/7 availability and richer analytics downstream.",
        "Automated SEACE public tender ingestion and analysis: AWS scraper (BeautifulSoup, Selenium) plus OpenAI processing; removed daily manual review and centralized data for sales.",
        "MLOps for speech transcription and analysis: Whisper (Hugging Face), Apache Spark ETL, Docker, and LLM-based transcript cleanup.",
        "Facilitated workshops with IT and commercial stakeholders; owned backlog hygiene and Scrum delivery for AI initiatives.",
        "Presales for AI and automation: POCs, joint proposals with sales, and high-level solution architecture toward a solutions architect path.",
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
        "Apoyo en la traducción de requerimientos de negocio a SQL avanzado y construcción de dashboards e indicadores sobre producto y experiencia del cliente.",
        "Seguimiento del desempeño de productos de Lending y Seguros; identificación de oportunidades de mejora en CX junto al equipo.",
        "Iniciativas analíticas para diagnosticar problemas críticos de CX y recomendaciones para canales digitales y modelo de atención.",
        "Automatizaciones e iniciativas de mejora con Python e IA; incluye reportes de NPS para Yape en Perú y Bolivia con menos trabajo manual.",
        "Definición de prompts e instrucciones para el bot de WhatsApp con IA generativa: escenarios de prueba, afinación de contexto y validación con el equipo.",
      ],
      en: [
        "Helped translate business questions into advanced SQL and built dashboards and KPIs for product and customer experience.",
        "Tracked performance of lending and insurance products and spotted CX improvement opportunities with the team.",
        "Analytics initiatives to diagnose critical CX issues and recommend changes across digital channels and service models.",
        "Python and AI automations, including NPS reporting automation for Yape in Peru and Bolivia with less manual effort.",
        "Prompt and instruction design for the generative AI WhatsApp bot: test scenarios, context tuning, and result validation with the team.",
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
