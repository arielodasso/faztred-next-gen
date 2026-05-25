import {
  Cpu,
  CircuitBoard,
  Activity,
  Wrench,
  Gauge,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=5491162083230&text=Hola+Faztred,+necesito+más+información.";

export const BROCHURE_URL =
  "http://faztred.com.ar/wp-content/uploads/2025/06/Brochure-Faztred-2025.pdf";

export const PHONE_NUMBER = "+5491162083230";
export const PHONE_DISPLAY = "(+54) 9 11 6208-3230";
export const EMAIL = "info@faztred.com.ar";

// ────────────────────────────── Servicios ──────────────────────────────

export interface Service {
  slug: string;
  icon: LucideIcon;
  title: string;
  description: string;
  items: string[];
}

/** Las 7 categorías del brief. La Home muestra los 4 primeros como destacados. */
export const services: Service[] = [
  {
    slug: "automatizacion-industrial",
    icon: Cpu,
    title: "Automatización industrial",
    description:
      "Integramos procesos productivos con PLC, HMI y SCADA. Resultados medibles, trazabilidad real y menos paradas no planificadas.",
    items: [
      "Ingeniería de automatización",
      "Programación PLC y HMI",
      "Sistemas SCADA",
      "Integración industrial",
      "Migraciones y revamping",
      "Capacitaciones in-plant",
    ],
  },
  {
    slug: "tableros-electricos",
    icon: CircuitBoard,
    title: "Diseño y fabricación de tableros eléctricos",
    description:
      "Tableros de potencia, control y PLC bajo normativa. Diseño de ingeniería, fabricación, armado y montaje en planta.",
    items: [
      "Diseño de ingeniería eléctrica",
      "Fabricación de tableros",
      "Armado y montaje",
      "Tableros de potencia y control",
      "Tableros PLC",
      "Tableros para automatización industrial",
    ],
  },
  {
    slug: "industria-4-0",
    icon: Activity,
    title: "Industria 4.0 y adquisición de datos",
    description:
      "Convertimos los datos de planta en decisiones operativas con dashboards, monitoreo remoto y trazabilidad.",
    items: [
      "Captura de datos industriales",
      "Dashboards y visualización",
      "Integración con bases de datos",
      "Monitoreo remoto",
      "Reportes automáticos",
      "Trazabilidad de procesos",
    ],
  },
  {
    slug: "mantenimiento-industrial",
    icon: Wrench,
    title: "Mantenimiento industrial",
    description:
      "Prevención, predicción y respuesta rápida ante fallas. Soporte técnico con o sin provisión de materiales.",
    items: [
      "Mantenimiento preventivo",
      "Mantenimiento predictivo",
      "Diagnóstico de fallas",
      "Asistencia técnica",
      "Puesta en marcha",
      "Optimización de procesos",
    ],
  },
  {
    slug: "instrumentacion-industrial",
    icon: Gauge,
    title: "Instrumentación industrial",
    description:
      "Mediciones precisas, sensores calibrados y ajustes finos para que tu proceso responda como esperás.",
    items: [
      "Calibración y verificación",
      "Mediciones en campo",
      "Verificación de señales",
      "Diagnóstico de sensores",
      "Instrumentación de procesos",
      "Ajustes y configuración",
    ],
  },
  {
    slug: "senalizacion-industrial",
    icon: AlertTriangle,
    title: "Señalización industrial y seguridad visual",
    description:
      "Sistemas para ordenar la circulación, alertar maniobras y proteger personas en el piso de planta.",
    items: [
      "Señalización industrial",
      "Señalización peatonal industrial",
      "Alertas visuales para autoelevadores",
      "Sistemas de seguridad visual",
      "Señalización dinámica",
      "Soluciones especiales de seguridad",
    ],
  },
  {
    slug: "sistemas-especiales",
    icon: Sparkles,
    title: "Sistemas especiales",
    description:
      "Aplicaciones avanzadas y desarrollos a medida cuando el proyecto no entra en una caja.",
    items: [
      "Visión artificial",
      "RFID industrial",
      "Integraciones especiales",
      "Desarrollo de soluciones a medida",
      "Automatización personalizada",
    ],
  },
];

/** Subset usado en Home. */
export const featuredServices = services.slice(0, 4);

// ────────────────────────────── Proyectos ──────────────────────────────

export type ProjectCategory =
  | "Automatización"
  | "Tableros"
  | "Revamping"
  | "Capacitación"
  | "Cerramiento"
  | "Antiexplosivo";

export interface Project {
  slug: string;
  title: string;
  industry: string;
  category: ProjectCategory;
  /** Situación / desafío inicial. */
  problem: string;
  /** Tareas realizadas como parte de la solución. */
  solution: string[];
  /** Resultado obtenido en una línea. */
  result: string;
  /** Tecnologías / equipamiento empleados. */
  technologies: string[];
  /** Cantidad de imágenes de galería (placeholders por ahora). */
  images: number;
}

export const projects: Project[] = [
  {
    slug: "instalaciones-antiexplosivas",
    title: "Instalaciones antiexplosivas",
    industry: "Química",
    category: "Antiexplosivo",
    problem: "Adecuación de instalación antiexplosiva en zonas clasificadas.",
    solution: [
      "Montaje de nuevos gabinetes antideflagrantes",
      "Instalación de canalizaciones bajo norma ATEX",
      "Cableado y puesta en marcha del sistema de pesaje ATEX",
    ],
    result:
      "Zona clasificada operativa bajo norma ATEX, con sistema de pesaje validado y montaje libre de riesgos.",
    technologies: ["Gabinetes antideflagrantes", "Norma ATEX", "Sistema de pesaje ATEX"],
    images: 2,
  },
  {
    slug: "cerramiento-industrial",
    title: "Cerramiento industrial",
    industry: "Química",
    category: "Cerramiento",
    problem:
      "Provisión y montaje de cerramiento industrial para máquinas envolvedoras de pallets.",
    solution: [
      "Diseño, provisión y montaje del cerramiento con mallas y postes metálicos",
      "Fabricación y montaje de seguridad electrónica por barreras infrarrojas",
      "Conexionado de interlock con máquinas envolvedoras",
      "Puesta en marcha y documentación CAO",
    ],
    result:
      "Operación de envolvedoras protegida con seguridad electrónica e interlock, con documentación CAO entregada.",
    technologies: [
      "Mallas y postes metálicos",
      "Barreras infrarrojas",
      "Interlock electromecánico",
    ],
    images: 2,
  },
  {
    slug: "capacitaciones-yamaha",
    title: "Capacitaciones Yamaha Motor Argentina",
    industry: "Automotriz",
    category: "Capacitación",
    problem:
      "Capacitación presencial de electricidad industrial para personal de planta.",
    solution: [
      "Carga horaria de 12 hs",
      "Capacitación presencial en planta del cliente",
      "Entrega de material y certificados",
    ],
    result:
      "Equipo de planta capacitado y certificado en electricidad industrial, con material de consulta propio.",
    technologies: ["Electricidad industrial", "Material didáctico propio"],
    images: 2,
  },
  {
    slug: "revamping-tablero-control",
    title: "Revamping de tablero de control",
    industry: "Química",
    category: "Revamping",
    problem: "Revamping del automatismo en agrupador de latas de pintura.",
    solution: [
      "Reemplazo del gabinete completo de control",
      "Programación del automatismo",
      "Puesta en marcha",
      "Documentación CAO",
    ],
    result:
      "Línea de agrupado de pintura modernizada y operativa con tablero nuevo y documentación CAO completa.",
    technologies: ["PLC", "HMI", "Tablero de control"],
    images: 2,
  },
  {
    slug: "automatismo-bombeo-pigmentos",
    title: "Nuevo automatismo para sistema de bombeo",
    industry: "Química",
    category: "Automatización",
    problem:
      "Montaje y programación del nuevo automatismo para sistema de bombeo de pigmentos.",
    solution: [
      "Migración del PLC Siemens a Allen Bradley",
      "Agregado de HMI Allen Bradley",
      "Normalización de puesta a tierra",
      "Puesta en marcha",
      "Documentación CAO",
    ],
    result:
      "Sistema de bombeo migrado a Allen Bradley con HMI integrado, puesta a tierra normalizada y arranque sin paradas.",
    technologies: ["Siemens", "Allen Bradley", "HMI", "Puesta a tierra"],
    images: 3,
  },
  {
    slug: "revamping-flejadora",
    title: "Revamping en máquina flejadora",
    industry: "Química",
    category: "Revamping",
    problem: "Revamping del automatismo en máquina flejadora de chapa.",
    solution: [
      "Reemplazo del sistema de control existente",
      "Programación y puesta a punto",
      "Documentación técnica final",
    ],
    result:
      "Máquina flejadora operativa con sistema de control modernizado y documentación técnica final entregada.",
    technologies: ["PLC", "Tablero de control"],
    images: 2,
  },
];
