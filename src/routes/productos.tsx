import { createFileRoute } from "@tanstack/react-router";
import {
  Cpu, Gauge, Network, Activity, Eye, AlertTriangle, Zap,
  MessageCircle, ArrowRight, CheckCircle2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { SectionTitle } from "@/components/site/SectionTitle";
import { PHONE_NUMBER } from "@/lib/site-data";
import { pushEvent } from "@/lib/analytics";
import { calendarPopupHandler } from "@/lib/calendar-popup";

const PATH = "/productos";
const TITLE = "Productos y Soluciones Industriales | Catálogo Faztred";
const DESCRIPTION =
  "Catálogo de equipamiento industrial: PLCs, HMIs, SCADA, variadores, servos, sensores, redes industriales, instrumentación, visión artificial y seguridad. Asesoramiento técnico y consulta por WhatsApp.";

interface ProductCategory {
  slug: string;
  icon: LucideIcon;
  title: string;
  description: string;
  products: string[];
  applications: string;
}

const categories: ProductCategory[] = [
  {
    slug: "automatizacion-y-control",
    icon: Cpu,
    title: "Automatización y Control",
    description:
      "Suministro de equipos para automatización industrial y control de procesos.",
    products: [
      "PLCs",
      "HMIs y Paneles Operador",
      "Sistemas SCADA",
      "Módulos de entradas y salidas remotas",
      "Gateways y conversores de protocolo",
      "Equipos IIoT e Industria 4.0",
      "PCs industriales",
      "Redes industriales",
    ],
    applications:
      "Aplicaciones en manufactura, logística, procesos continuos, tratamiento de agua, energía y edificios inteligentes.",
  },
  {
    slug: "variadores-y-control-de-movimiento",
    icon: Zap,
    title: "Variadores y Control de Movimiento",
    description:
      "Equipamiento para control de velocidad, posicionamiento y movimiento industrial.",
    products: [
      "Variadores de frecuencia",
      "Servodrives",
      "Servomotores",
      "Motores paso a paso",
      "Arrancadores suaves",
      "Encoders",
      "Controladores de movimiento",
    ],
    applications:
      "Soluciones para cintas transportadoras, extrusoras, bobinadoras, punzonadoras, líneas de producción y maquinaria especial.",
  },
  {
    slug: "sensores-e-instrumentacion",
    icon: Gauge,
    title: "Sensores e Instrumentación",
    description:
      "Equipamiento para medición y adquisición de datos en planta.",
    products: [
      "Sensores inductivos",
      "Sensores capacitivos",
      "Sensores fotoeléctricos",
      "Sensores ultrasónicos",
      "Encoders",
      "Sensores de temperatura",
      "Sensores de presión",
      "Sensores de nivel",
      "Sensores de caudal",
      "Instrumentación de proceso",
    ],
    applications:
      "Asistencia en selección, reemplazo y compatibilidad con instalaciones existentes.",
  },
  {
    slug: "redes-y-comunicaciones-industriales",
    icon: Network,
    title: "Redes y Comunicaciones Industriales",
    description:
      "Equipamiento para integración y conectividad industrial.",
    products: [
      "Switches industriales",
      "Conversores Ethernet / Serial",
      "Equipos Modbus, Profinet, Profibus y Ethernet/IP",
      "Gateways multiprotocolo",
      "Routers industriales",
      "Equipos para acceso remoto seguro",
    ],
    applications:
      "Implementación de soluciones para monitoreo remoto y soporte técnico a distancia.",
  },
  {
    slug: "medicion-diagnostico-y-mantenimiento-predictivo",
    icon: Activity,
    title: "Medición, Diagnóstico y Mantenimiento Predictivo",
    description:
      "Equipamiento para análisis y diagnóstico industrial.",
    products: [
      "Instrumentos de medición eléctrica",
      "Analizadores de redes",
      "Pinzas amperométricas",
      "Cámaras termográficas",
      "Equipos para análisis de vibraciones",
      "Instrumentos para puesta a tierra",
      "Equipos de calibración y verificación",
    ],
    applications:
      "Utilizados en programas de mantenimiento predictivo, auditorías técnicas y análisis de fallas.",
  },
  {
    slug: "vision-artificial-e-identificacion-industrial",
    icon: Eye,
    title: "Visión Artificial e Identificación Industrial",
    description:
      "Soluciones para inspección y trazabilidad de procesos.",
    products: [
      "Cámaras industriales",
      "Lectores de códigos de barras",
      "Lectores QR",
      "Sistemas RFID",
      "Sensores de visión",
      "Sistemas de inspección automática",
    ],
    applications:
      "Aplicaciones en control de calidad, clasificación, conteo y trazabilidad.",
  },
  {
    slug: "seguridad-y-senalizacion-industrial",
    icon: AlertTriangle,
    title: "Seguridad y Señalización Industrial",
    description:
      "Equipamiento para mejorar la seguridad operativa en planta.",
    products: [
      "Proyectores de señalización industrial",
      "Gobos personalizados",
      "Balizas luminosas",
      "Columnas de señalización",
      "Sensores de seguridad",
      "Cortinas ópticas",
      "Pulsadores de emergencia",
      "Sistemas de advertencia visual",
    ],
    applications:
      "Soluciones orientadas a la reducción de riesgos y mejora de la seguridad del personal.",
  },
];

function whatsappLink(message: string) {
  const phone = PHONE_NUMBER.replace(/[^\d]/g, "");
  return `https://api.whatsapp.com/send/?phone=${phone}&text=${encodeURIComponent(message)}`;
}

function categoryMessage(cat: ProductCategory) {
  return `Hola Faztred, me interesa la categoría "${cat.title}". Quisiera recibir asesoramiento técnico y cotización.`;
}

function productMessage(cat: ProductCategory, product: string) {
  return `Hola Faztred, me interesa el producto "${product}" (categoría: ${cat.title}). ¿Podrían enviarme información y cotización?`;
}

export const Route = createFileRoute("/productos")({
  component: ProductosPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "productos industriales, PLC, HMI, SCADA, variadores de frecuencia, servodrives, sensores industriales, instrumentación, redes industriales, visión artificial, RFID, señalización industrial, Faztred",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://faztred.com.ar/productos" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "https://faztred.com.ar/productos" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Productos y Soluciones Industriales",
          itemListElement: categories.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.title,
            description: c.description,
            url: `https://faztred.com.ar/productos#${c.slug}`,
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Inicio", item: "https://faztred.com.ar/" },
            { "@type": "ListItem", position: 2, name: "Productos", item: "https://faztred.com.ar/productos" },
          ],
        }),
      },
    ],
  }),
});

function ProductosPage() {
  return (
    <>
      <PageHero
        eyebrow="Catálogo"
        title="Productos y Soluciones Industriales"
        subtitle="Equipamiento industrial para automatización, control y mantenimiento. Marcas reconocidas a nivel nacional e internacional."
      />

      {/* Intro */}
      <section className="bg-[color:var(--surface-dark)] py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-white/85 space-y-5 leading-relaxed">
          <p>
            En <strong className="text-white">Faztred Soluciones</strong> complementamos
            nuestros servicios de ingeniería y automatización con el suministro de
            equipamiento industrial de marcas reconocidas a nivel nacional e internacional.
          </p>
          <p>
            Asesoramos a cada cliente en la selección de los equipos más adecuados para su
            aplicación, considerando aspectos técnicos, disponibilidad, compatibilidad,
            costos de implementación y soporte futuro.
          </p>
          <p>
            Trabajamos con una amplia variedad de productos para proyectos nuevos,
            ampliaciones, modernizaciones y mantenimiento industrial.
          </p>
        </div>
      </section>

      {/* Quick nav */}
      <section className="bg-background py-10 md:py-12 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-4">
            Categorías del catálogo
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <a
                key={c.slug}
                href={`#${c.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card hover:border-primary/40 hover:bg-primary/5 px-4 py-2 text-sm text-foreground transition-colors"
              >
                <c.icon className="h-4 w-4 text-primary" />
                {c.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-background py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-20">
          {categories.map((cat) => (
            <article
              key={cat.slug}
              id={cat.slug}
              className="scroll-mt-28 rounded-2xl border border-border bg-card p-6 md:p-10 shadow-sm"
            >
              <div className="flex items-start gap-4 md:gap-5">
                <span className="inline-flex h-12 w-12 md:h-14 md:w-14 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <cat.icon className="h-6 w-6 md:h-7 md:w-7" />
                </span>
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                    {cat.title}
                  </h2>
                  <p className="mt-2 text-base text-muted-foreground leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {cat.products.map((p) => (
                  <div
                    key={p}
                    className="group flex items-center justify-between gap-3 rounded-lg border border-border bg-background px-4 py-3 hover:border-primary/40 transition-colors"
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground truncate">{p}</span>
                    </div>
                    <a
                      href={whatsappLink(productMessage(cat, p))}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        pushEvent("whatsapp_click", { location: "productos_item", product: p })
                      }
                      aria-label={`Consultar por ${p} por WhatsApp`}
                      className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-[#25D366]/10 text-[#1da851] hover:bg-[#25D366] hover:text-white transition-colors flex-shrink-0"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </a>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-sm text-muted-foreground leading-relaxed italic">
                {cat.applications}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappLink(categoryMessage(cat))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    pushEvent("whatsapp_click", {
                      location: "productos_category",
                      category: cat.title,
                    })
                  }
                  className="cta-press inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white px-5 py-3 text-sm font-semibold rounded-md transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  Consultar por {cat.title}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Marcas */}
      <section className="bg-[color:var(--surface-dark)] py-20 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            dark
            eyebrow="Marcas"
            title="Soluciones adaptadas a cada proyecto"
            description="Trabajamos con múltiples fabricantes y proveedores nacionales e internacionales para ofrecer la solución más adecuada a cada necesidad. No estamos limitados a una única marca, lo que nos permite seleccionar la mejor alternativa técnica y económica para cada aplicación."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[color:var(--surface-darker)] py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionTitle
            dark
            eyebrow="Asesoramiento"
            title="¿Necesitás un equipo o una solución completa?"
            description="Nuestro equipo puede asesorarte tanto en la provisión de equipamiento como en el diseño, instalación, programación, puesta en marcha y mantenimiento de la solución completa."
            align="center"
          />
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={calendarPopupHandler("productos")}
              className="cta-press inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3.5 text-sm font-semibold rounded-md transition-colors"
            >
              Coordinar reunión <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href={whatsappLink(
                "Hola Faztred, quiero asesoramiento técnico sobre productos y soluciones industriales.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => pushEvent("whatsapp_click", { location: "productos_cta" })}
              className="cta-press inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white px-6 py-3.5 text-sm font-semibold rounded-md transition-colors"
            >
              <MessageCircle className="h-4 w-4" /> Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
