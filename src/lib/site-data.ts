import {
  Cpu,
  Warehouse,
  CircuitBoard,
  RefreshCw,
  HardHat,
  Building2,
  Wrench,
  GraduationCap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=5491162083230&text=Hola+Faztred,+necesito+más+información.";

export const BROCHURE_URL =
  "http://faztred.com.ar/wp-content/uploads/2025/06/Brochure-Faztred-2025.pdf";

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const featuredServices: Service[] = [
  { icon: Cpu, title: "Automatización industrial", description: "Optimizamos procesos productivos integrando PLC, HMI y SCADA. Reducí tiempos muertos, mejorá la calidad y ganá trazabilidad real." },
  { icon: Warehouse, title: "Automatización de almacenes", description: "Automatizamos trazabilidad, intralogística y gestión de depósitos. Soluciones llave en mano desde el diseño hasta la puesta en marcha." },
  { icon: CircuitBoard, title: "Tableros eléctricos", description: "Diseñamos y armamos tableros normativos para control y potencia. Seguridad, orden y continuidad operativa sin sorpresas." },
  { icon: RefreshCw, title: "Migraciones y revamping", description: "Actualizamos y modernizamos sistemas antiguos o discontinuados. Migramos hardware y software adaptados a tu planta." },
  { icon: HardHat, title: "Ingeniería de proyectos", description: "Desde la ingeniería eléctrica hasta la ejecución final. Incluye selección de equipos, planos, cronograma y puesta en marcha." },
  { icon: Building2, title: "BMS (Building Management Systems)", description: "Automatización de edificios: climatización, iluminación, accesos y eficiencia energética." },
  { icon: Wrench, title: "Mantenimiento unificado", description: "Predictivo, preventivo y correctivo. Soporte técnico con o sin provisión de materiales, respuesta rápida ante fallas." },
  { icon: GraduationCap, title: "Capacitación técnica", description: "Formación in-plant para personal de mantenimiento o producción. Cursos prácticos con enfoque técnico real." },
];

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
  situation: string;
  tasks: string[];
  images: number;
}

export const projects: Project[] = [
  {
    slug: "instalaciones-antiexplosivas",
    title: "Instalaciones antiexplosivas",
    industry: "Química",
    category: "Antiexplosivo",
    situation: "Adecuación de instalación antiexplosiva en zonas clasificadas.",
    tasks: [
      "Montaje de nuevos gabinetes antideflagrantes",
      "Instalación de canalizaciones bajo norma ATEX",
      "Cableado y puesta en marcha del sistema de pesaje ATEX",
    ],
    images: 2,
  },
  {
    slug: "cerramiento-industrial",
    title: "Cerramiento industrial",
    industry: "Química",
    category: "Cerramiento",
    situation:
      "Provisión y montaje de cerramiento industrial para máquinas envolvedoras de pallets.",
    tasks: [
      "Diseño, provisión y montaje del cerramiento con mallas y postes metálicos",
      "Fabricación y montaje de seguridad electrónica por barreras infrarrojas",
      "Conexionado de interlock con máquinas envolvedoras",
      "Puesta en marcha y documentación CAO",
    ],
    images: 2,
  },
  {
    slug: "capacitaciones-yamaha",
    title: "Capacitaciones Yamaha Motor Argentina",
    industry: "Automotriz",
    category: "Capacitación",
    situation: "Capacitación presencial de electricidad industrial.",
    tasks: [
      "Carga horaria de 12 hs",
      "Capacitación presencial en planta del cliente",
      "Entrega de material y certificados",
    ],
    images: 2,
  },
  {
    slug: "revamping-tablero-control",
    title: "Revamping tablero de control",
    industry: "Química",
    category: "Revamping",
    situation: "Revamping del automatismo en agrupador de latas de pintura.",
    tasks: [
      "Reemplazo del gabinete completo de control",
      "Programación del automatismo",
      "Puesta en marcha",
      "Documentación CAO",
    ],
    images: 2,
  },
  {
    slug: "automatismo-bombeo-pigmentos",
    title: "Nuevo automatismo para sistema de bombeo",
    industry: "Química",
    category: "Automatización",
    situation:
      "Montaje y programación del nuevo automatismo para sistema de bombeo de pigmentos.",
    tasks: [
      "Migración del PLC Siemens a Allen Bradley",
      "Agregado de HMI Allen Bradley",
      "Normalización de puesta a tierra",
      "Puesta en marcha",
      "Documentación CAO",
    ],
    images: 3,
  },
  {
    slug: "revamping-flejadora",
    title: "Revamping en máquina flejadora",
    industry: "Química",
    category: "Revamping",
    situation: "Revamping del automatismo en máquina flejadora de chapa.",
    tasks: [
      "Reemplazo del sistema de control existente",
      "Programación y puesta a punto",
      "Documentación técnica final",
    ],
    images: 2,
  },
];
