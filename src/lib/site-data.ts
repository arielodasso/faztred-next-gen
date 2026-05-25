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

export const BROCHURE_URL = "/docs/Brochure-Faztred-2025.pdf";

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
  | "Antiexplosivo"
  | "Señalización";

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
  /** Galería con imágenes reales. Si está presente, reemplaza a `images`. */
  gallery?: string[];
  /** Imagen de portada para la card. Si no está, usa la primera de gallery o placeholder. */
  cover?: string;
}

import tablero1 from "@/assets/projects/tableros/tablero-1.jpg";
import tablero2 from "@/assets/projects/tableros/tablero-2.jpg";
import tablero3 from "@/assets/projects/tableros/tablero-3.jpg";
import tablero4 from "@/assets/projects/tableros/tablero-4.jpg";
import tablero5 from "@/assets/projects/tableros/tablero-5.jpg";
import tablero6 from "@/assets/projects/tableros/tablero-6.jpg";
import tsa1 from "@/assets/projects/tableros/tsa-1.jpg";
import tsb1 from "@/assets/projects/tableros/tsb-1.jpg";
import tsb2 from "@/assets/projects/tableros/tsb-2.jpg";
import tsb3 from "@/assets/projects/tableros/tsb-3.jpg";
import revampingAntes1 from "@/assets/projects/tableros/revamping-antes-1.png";
import revampingDespues1 from "@/assets/projects/tableros/revamping-despues-1.png";
import revampingDespues2 from "@/assets/projects/tableros/revamping-despues-2.png";
import revampingAntes2 from "@/assets/projects/tableros/revamping-antes-2.png";
import revampingAntes3 from "@/assets/projects/tableros/revamping-antes-3.png";
import revampingDespues3 from "@/assets/projects/tableros/revamping-despues-3.png";
import revampingDespues4 from "@/assets/projects/tableros/revamping-despues-4.png";
import revampingAntes4 from "@/assets/projects/tableros/revamping-antes-4.png";
import revampingAntes5 from "@/assets/projects/tableros/revamping-antes-5.png";
import antiexLaser1 from "@/assets/projects/antiexplosivas/laser-1.jpg";
import antiexLaser2 from "@/assets/projects/antiexplosivas/laser-2.jpg";
import antiexLaser3 from "@/assets/projects/antiexplosivas/laser-3.jpg";
import antiexMontaje1 from "@/assets/projects/antiexplosivas/montaje-1.jpg";
import antiexMontaje2 from "@/assets/projects/antiexplosivas/montaje-2.jpg";
import antiexMontaje3 from "@/assets/projects/antiexplosivas/montaje-3.jpg";
import antiexMontaje4 from "@/assets/projects/antiexplosivas/montaje-4.jpg";
import antiexGevelux1 from "@/assets/projects/antiexplosivas/gevelux-1.jpg";
import antiexGevelux2 from "@/assets/projects/antiexplosivas/gevelux-2.jpg";
import antiexGevelux3 from "@/assets/projects/antiexplosivas/gevelux-3.jpg";
import antiexGevelux4 from "@/assets/projects/antiexplosivas/gevelux-4.jpg";
import antiexGevelux5 from "@/assets/projects/antiexplosivas/gevelux-5.jpg";
import antiexPlanta1 from "@/assets/projects/antiexplosivas/planta-1.jpg";
import antiexMontaje5 from "@/assets/projects/antiexplosivas/montaje-5.jpg";
import yamaha1 from "@/assets/projects/yamaha/yamaha-1.png";
import cerramiento1 from "@/assets/projects/cerramiento/cerramiento-1.png";
import revampingTablero1 from "@/assets/projects/revamping-tablero/tablero-1.png";
import flejadora1 from "@/assets/projects/flejadora/flejadora-1.png";
import bombeo1 from "@/assets/projects/bombeo/bombeo-1.png";
import senal1 from "@/assets/projects/senalizacion/senal-1.jpg";
import senal2 from "@/assets/projects/senalizacion/senal-2.jpg";
import senal3 from "@/assets/projects/senalizacion/senal-3.jpg";

export const serviceImages: Record<string, string> = {
  "automatizacion-industrial": bombeo1,
  "tableros-electricos": revampingDespues1,
  "industria-4-0": revampingTablero1,
  "mantenimiento-industrial": flejadora1,
  "instrumentacion-industrial": antiexMontaje3,
  "senalizacion-industrial": senal2,
  "sistemas-especiales": antiexGevelux1,
};

export const projects: Project[] = [
  {
    slug: "fabricacion-tableros-electricos",
    title: "Fabricación de tableros eléctricos",
    industry: "Industrial",
    category: "Tableros",
    problem:
      "Diseño, revamping y fabricación de tableros de control, potencia y PLC para distintas líneas productivas, incluyendo tableros de barreras de seguridad en planta.",
    solution: [
      "Relevamiento del estado inicial de tableros existentes y definición del revamping",
      "Ingeniería eléctrica, selección de componentes y rediseño del frente de mando",
      "Armado y cableado prolijo con identificación y trazabilidad",
      "Fabricación de tableros de control, potencia, PLC y barreras de seguridad (TSA / TSB)",
      "Pruebas en taller, puesta en marcha y entrega de documentación CAO",
    ],
    result:
      "Tableros entregados llave en mano, con cableado normalizado, frente de mando renovado, identificación completa y una mejora visible entre el estado original y el resultado final.",
    technologies: ["Siemens", "Allen Bradley", "Phoenix Contact", "Borneras", "Barreras de seguridad", "PLC", "HMI"],
    images: 0,
    cover: revampingDespues1,
    gallery: [
      revampingAntes1,
      revampingDespues1,
      revampingAntes2,
      revampingDespues3,
      revampingAntes3,
      revampingDespues4,
      revampingAntes4,
      revampingDespues2,
      revampingAntes5,
      tablero1,
      tablero4,
      tablero5,
      tablero6,
      tablero2,
      tablero3,
      tsa1,
      tsb1,
      tsb2,
      tsb3,
    ],
  },
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
    images: 0,
    cover: antiexGevelux1,
    gallery: [
      antiexGevelux1,
      antiexGevelux3,
      antiexGevelux2,
      antiexMontaje1,
      antiexMontaje2,
      antiexMontaje4,
      antiexMontaje3,
      antiexLaser1,
      antiexLaser3,
      antiexLaser2,
      antiexGevelux5,
      antiexGevelux4,
      antiexPlanta1,
      antiexMontaje5,
    ],
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
    images: 0,
    cover: cerramiento1,
    gallery: [cerramiento1],
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
    images: 0,
    cover: yamaha1,
    gallery: [yamaha1],
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
    images: 0,
    cover: revampingTablero1,
    gallery: [revampingTablero1],
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
    images: 0,
    cover: bombeo1,
    gallery: [bombeo1],
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
    images: 0,
    cover: flejadora1,
    gallery: [flejadora1],
  },
  {
    slug: "senalizacion-industrial",
    title: "Señalización industrial",
    industry: "Química",
    category: "Señalización",
    problem:
      "Implementación de señalización de seguridad en depósito de pinturas mediante proyección luminosa de cartelería.",
    solution: [
      "Relevamiento de zonas de circulación y puntos críticos",
      "Provisión e instalación de proyectores GOBO de señalización",
      "Configuración de pictogramas \"No pasar\" sobre piso",
      "Puesta en marcha y validación con personal de planta",
    ],
    result:
      "Depósito señalizado con cartelería luminosa proyectada, mejorando la visibilidad de zonas restringidas sin intervenir el piso.",
    technologies: ["Proyectores GOBO", "Señalización de seguridad", "Pictogramas industriales"],
    images: 0,
    cover: senal2,
    gallery: [senal2, senal1, senal3],
  },
];
